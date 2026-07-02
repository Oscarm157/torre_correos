"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { put, del } from "@vercel/blob";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  leads,
  leadComments,
  leadFiles,
  leadEvents,
  users,
  type LeadStatus,
  type LeadSource,
} from "@/lib/schema";
import { requireUser, requireAdmin, requireLeadAccess } from "@/lib/session";
import { isReadOnly } from "@/lib/permissions";
import { STATUS_LABELS, STATUS_ORDER } from "@/lib/crm-status";
import { safeParseForm } from "@/lib/validate";

const SOURCES: LeadSource[] = ["bot", "form", "manual"];
const MAX_FILE_BYTES = 10 * 1024 * 1024;

const profileSchema = z.object({
  name: z.string().trim().min(1),
});

const createLeadSchema = z
  .object({
    name: z.string().trim().default(""),
    email: z.string().trim().default(""),
    phone: z.string().trim().default(""),
  })
  .refine((d) => d.name !== "" && (d.email !== "" || d.phone !== ""));

// Calificación de prospecto inmobiliario (remapeada de ADAF, propuesta técnica
// pendiente de confirmar campos exactos con Oscar — ver plan de Fase 2).
const leadDetailsSchema = z.object({
  name: z.string().trim().default(""),
  email: z.string().trim().default(""),
  phone: z.string().trim().default(""),
  summary: z.string().trim().default(""),
  locale: z
    .string()
    .default("es")
    .transform((v) => (v === "en" ? "en" : "es")),
  source: z
    .string()
    .default("")
    .transform((v) => (SOURCES.includes(v as LeadSource) ? (v as LeadSource) : "manual")),
  interestType: z.string().trim().default(""),
  budget: z.string().trim().default(""),
  paymentMethod: z.string().trim().default(""),
  purpose: z.string().trim().default(""),
  timeline: z.string().trim().default(""),
  valueAmount: z
    .string()
    .default("")
    .transform((v) => v.replace(/\D/g, "")),
});

const commentSchema = z.object({
  body: z.string().trim().min(1),
});

const uploadFileSchema = z.object({
  file: z.instanceof(File),
});

async function logEvent(leadId: string, userId: string | null, kind: string, detail: string) {
  try {
    await db.insert(leadEvents).values({ leadId, userId, kind, detail });
  } catch {
    /* never block the action on logging */
  }
}

// ---- Perfil ----

export async function updateProfile(formData: FormData) {
  const me = await requireUser();
  const parsed = safeParseForm(profileSchema, formData);
  if (!parsed.ok) return;
  await db.update(users).set({ name: parsed.data.name }).where(eq(users.id, me.id));
  revalidatePath("/admin");
}

// ---- Leads ----

export async function createLead(formData: FormData) {
  const me = await requireUser();
  if (isReadOnly(me.role)) return; // viewer no crea leads
  const parsed = safeParseForm(createLeadSchema, formData);
  if (!parsed.ok) return;
  const { name, email, phone } = parsed.data;
  const rows = await db
    .insert(leads)
    .values({
      name,
      email: email || null,
      phone: phone || null,
      locale: "es",
      source: "manual",
      status: "new",
      // Se asigna al creador para que un agente conserve acceso al lead que
      // acaba de crear (los agentes solo ven leads asignados). Un admin puede
      // reasignarlo después.
      assignedTo: me.id,
    })
    .returning({ id: leads.id });
  await logEvent(rows[0].id, me.id, "created", "Lead creado manualmente");
  revalidatePath("/admin");
  redirect(`/admin/${rows[0].id}`);
}

const QUAL_KEYS = [
  "interestType",
  "budget",
  "paymentMethod",
  "purpose",
  "timeline",
] as const;

export async function updateLeadDetails(id: string, formData: FormData) {
  const { user: me } = await requireLeadAccess(id);
  const parsed = safeParseForm(leadDetailsSchema, formData);
  if (!parsed.ok) return;
  const { name, email, phone, summary, locale, source } = parsed.data;

  const qualification: Record<string, string> = {};
  for (const k of QUAL_KEYS) {
    const v = parsed.data[k];
    if (v) qualification[k] = v;
  }

  const valueAmount =
    parsed.data.valueAmount === "" ? null : parseInt(parsed.data.valueAmount, 10);

  await db
    .update(leads)
    .set({
      name: name || null,
      email: email || null,
      phone: phone || null,
      locale,
      source,
      summary: summary || null,
      qualification: Object.keys(qualification).length ? qualification : null,
      valueAmount,
      updatedAt: new Date(),
    })
    .where(eq(leads.id, id));
  await logEvent(id, me.id, "edit", "Detalles actualizados");
  revalidatePath(`/admin/${id}`);
  revalidatePath("/admin");
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const { user: me } = await requireLeadAccess(id);
  if (!STATUS_ORDER.includes(status)) return;
  const closedAt = status === "won" || status === "lost" ? new Date() : null;
  await db.update(leads).set({ status, closedAt, updatedAt: new Date() }).where(eq(leads.id, id));
  await logEvent(id, me.id, "status", `Estado cambiado a ${STATUS_LABELS[status]}`);
  revalidatePath(`/admin/${id}`);
  revalidatePath("/admin");
  revalidatePath("/admin/board");
}

export async function assignLead(id: string, userId: string | null) {
  const me = await requireAdmin();
  let label = "Sin asignar";
  let assignee: string | null = null;
  if (userId) {
    const u = await db
      .select({ name: users.name })
      .from(users)
      .where(and(eq(users.id, userId), eq(users.active, true)));
    if (!u[0]) return; // ignore unknown/inactive user
    assignee = userId;
    label = `Asignado a ${u[0].name}`;
  }
  await db.update(leads).set({ assignedTo: assignee, updatedAt: new Date() }).where(eq(leads.id, id));
  await logEvent(id, me.id, "assign", label);
  revalidatePath(`/admin/${id}`);
  revalidatePath("/admin");
}

export async function addLeadComment(id: string, formData: FormData) {
  const { user: me } = await requireLeadAccess(id);
  const parsed = safeParseForm(commentSchema, formData);
  if (!parsed.ok) return;
  await db.insert(leadComments).values({ leadId: id, userId: me.id, body: parsed.data.body });
  await logEvent(id, me.id, "note", "Nota agregada");
  revalidatePath(`/admin/${id}`);
}

export async function uploadLeadFile(id: string, formData: FormData) {
  const { user: me } = await requireLeadAccess(id);
  const parsed = safeParseForm(uploadFileSchema, formData);
  if (!parsed.ok) return;
  const file = parsed.data.file;
  if (file.size === 0) return;
  if (file.size > MAX_FILE_BYTES) throw new Error("El archivo supera 10MB");

  const blob = await put(`leads/${id}/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  await db.insert(leadFiles).values({
    leadId: id,
    name: file.name,
    url: blob.url,
    pathname: blob.pathname,
    contentType: file.type || null,
    size: file.size,
  });
  await logEvent(id, me.id, "file", `Archivo subido: ${file.name}`);
  revalidatePath(`/admin/${id}`);
}

export async function deleteLeadFile(fileId: string, leadId: string) {
  const { user: me } = await requireLeadAccess(leadId);
  const rows = await db
    .select()
    .from(leadFiles)
    .where(and(eq(leadFiles.id, fileId), eq(leadFiles.leadId, leadId)));
  const f = rows[0];
  if (f) {
    try {
      await del(f.url);
    } catch {
      /* blob may already be gone */
    }
    await db.delete(leadFiles).where(eq(leadFiles.id, fileId));
    await logEvent(leadId, me.id, "file", `Archivo eliminado: ${f.name}`);
  }
  revalidatePath(`/admin/${leadId}`);
}

export async function deleteLead(id: string) {
  await requireAdmin();
  // Se borran los blobs primero; los adjuntos/comentarios/eventos del lead
  // caen en cascada al borrar la fila.
  const files = await db.select({ url: leadFiles.url }).from(leadFiles).where(eq(leadFiles.leadId, id));
  for (const f of files) {
    try {
      await del(f.url);
    } catch {
      /* blob may already be gone */
    }
  }
  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath("/admin");
  revalidatePath("/admin/board");
  revalidatePath(`/admin/${id}`);
  redirect("/admin");
}

"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { and, eq, gte } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads, leadComments, leadEvents } from "@/lib/schema";
import { sendEmail } from "@/lib/email";

// TODO: mover a env/config cuando haya dominio propio (hoy alias de Vercel).
const SITE_URL = "https://torre-correos-tau.vercel.app";

// Rate limit por IP (best-effort, por instancia serverless) + dedup por email,
// mismo patrón que adaf-web/src/app/api/contacto/route.ts.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  if (recent.length === 0) hits.delete(ip);
  else hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

const schema = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  telefono: z.string().trim().max(40).optional().or(z.literal("")),
  mensaje: z.string().trim().max(4000).optional().or(z.literal("")),
});

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return { ok: false, error: "Demasiados intentos, intenta de nuevo en un minuto." };
  }

  const parsed = schema.safeParse({
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    telefono: formData.get("telefono"),
    mensaje: formData.get("mensaje"),
  });
  if (!parsed.success) {
    return { ok: false, error: "Revisa los datos del formulario." };
  }
  const { nombre, email, telefono, mensaje } = parsed.data;

  // Persistir el lead en el CRM es el registro durable: si Resend falla o
  // nadie revisa el correo, el lead no se pierde. Un fallo de DB no debe
  // tumbar la respuesta al usuario.
  try {
    const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000);
    const dup = await db
      .select({ id: leads.id })
      .from(leads)
      .where(and(eq(leads.email, email), gte(leads.createdAt, tenMinAgo)))
      .limit(1);
    if (dup.length === 0) {
      const [lead] = await db
        .insert(leads)
        .values({
          name: nombre,
          email,
          phone: telefono || null,
          source: "form",
          sourceUrl: `${SITE_URL}/#contacto`,
        })
        .returning({ id: leads.id });
      await db.insert(leadEvents).values({
        leadId: lead.id,
        kind: "created",
        detail: "Lead creado desde el formulario de contacto",
      });
      if (mensaje) {
        await db.insert(leadComments).values({ leadId: lead.id, body: mensaje });
      }
    }
  } catch (err) {
    console.error("[contacto] no se pudo guardar el lead", err);
  }

  const toEmail = process.env.LEAD_RECIPIENT;
  if (!toEmail) {
    console.warn("[contacto] LEAD_RECIPIENT no configurado, se omite el correo");
    return { ok: true };
  }

  const subject = `Nuevo contacto desde el sitio · ${nombre}`;
  const html = `
    <!doctype html>
    <html lang="es">
      <body style="font-family:Georgia,serif;color:#1a2744;background:#f5f3ef;padding:24px;">
        <div style="max-width:560px;margin:0 auto;background:#fff;padding:32px;border:1px solid #e2ded5;">
          <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9a7a48;margin:0 0 16px">
            Torre Correos · Sitio web · Nuevo mensaje
          </p>
          <h1 style="font-size:24px;color:#1a2744;margin:0 0 20px">${escapeHtml(nombre)}</h1>
          <table style="width:100%;font-size:14px;line-height:1.5">
            <tr><td style="color:#9a7a48;text-transform:uppercase;font-size:10px;letter-spacing:.18em;padding:6px 0">Teléfono</td><td>${escapeHtml(telefono || "—")}</td></tr>
            <tr><td style="color:#9a7a48;text-transform:uppercase;font-size:10px;letter-spacing:.18em;padding:6px 0">Correo</td><td>${escapeHtml(email)}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e2ded5;margin:24px 0">
          <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9a7a48;margin:0 0 8px">Mensaje</p>
          <p style="font-size:15px;line-height:1.6;color:#333333;white-space:pre-wrap">${escapeHtml(mensaje || "—")}</p>
        </div>
      </body>
    </html>
  `;

  try {
    await sendEmail({ to: toEmail, subject, html });
  } catch (err) {
    console.error("[contacto] no se pudo enviar el correo", err);
    // El lead ya quedó guardado en el CRM; no fallar la respuesta al usuario
    // solo porque el aviso por correo falló.
  }

  return { ok: true };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

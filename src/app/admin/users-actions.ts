"use server";

import { revalidatePath } from "next/cache";
import { and, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { users, type UserRole } from "@/lib/schema";
import { hashPassword } from "@/lib/auth";
import { requireAdmin } from "@/lib/session";
import { safeParseForm } from "@/lib/validate";

const ROLES: UserRole[] = ["admin", "agent", "viewer"];

const createUserSchema = z.object({
  name: z.string().trim().min(1, "Nombre y correo son obligatorios."),
  email: z.string().trim().min(1, "Nombre y correo son obligatorios.").toLowerCase(),
  role: z
    .string()
    .default("agent")
    .transform((v) => (ROLES.includes(v as UserRole) ? (v as UserRole) : "agent")),
  password: z.string().trim().default(""),
});

const CHARS = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function genTempPassword(len = 10): string {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let out = "";
  for (const b of bytes) out += CHARS[b % CHARS.length];
  return `${out}#7`;
}

export async function createUser(
  formData: FormData
): Promise<{ tempPassword?: string; error?: string }> {
  await requireAdmin();
  const parsed = safeParseForm(createUserSchema, formData);
  if (!parsed.ok) return { error: parsed.error };
  const { name, email, role, password } = parsed.data;

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
  if (existing.length > 0) return { error: "Ya existe un usuario con ese correo." };

  const tempPassword = password.length >= 8 ? password : genTempPassword();
  try {
    await db.insert(users).values({
      name,
      email,
      role,
      passwordHash: await hashPassword(tempPassword),
      mustChangePassword: true,
    });
  } catch {
    return { error: "A user with that email already exists." };
  }
  revalidatePath("/admin/users");
  return { tempPassword };
}

export async function updateUser(
  userId: string,
  data: { name: string; email: string; role: UserRole }
): Promise<{ error?: string }> {
  const me = await requireAdmin();
  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();
  if (!name || !email) return { error: "Nombre y correo son obligatorios." };
  if (!ROLES.includes(data.role)) return { error: "Rol inválido." };
  const role = data.role;

  if (userId === me.id && role !== "admin") {
    return { error: "No puedes quitarte tu propio rol de admin." };
  }

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.email, email), ne(users.id, userId)));
  if (existing.length > 0) return { error: "Ya existe un usuario con ese correo." };

  await db.update(users).set({ name, email, role }).where(eq(users.id, userId));
  revalidatePath("/admin/users");
  return {};
}

export async function updateUserRole(userId: string, role: UserRole) {
  const me = await requireAdmin();
  if (!ROLES.includes(role)) return;
  if (userId === me.id && role !== "admin") return; // no quitarte tu propio admin
  await db.update(users).set({ role }).where(eq(users.id, userId));
  revalidatePath("/admin/users");
}

export async function setUserActive(userId: string, active: boolean) {
  const me = await requireAdmin();
  if (userId === me.id) return; // cannot deactivate yourself
  await db.update(users).set({ active }).where(eq(users.id, userId));
  revalidatePath("/admin/users");
}

export async function resetUserPassword(
  userId: string
): Promise<{ tempPassword: string }> {
  await requireAdmin();
  const tempPassword = genTempPassword();
  await db
    .update(users)
    .set({ passwordHash: await hashPassword(tempPassword), mustChangePassword: true })
    .where(eq(users.id, userId));
  revalidatePath("/admin/users");
  return { tempPassword };
}

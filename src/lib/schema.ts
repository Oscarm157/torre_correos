import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";

export type UserRole = "admin" | "agent" | "viewer";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").$type<UserRole>().default("agent").notNull(),
  active: boolean("active").default(true).notNull(),
  mustChangePassword: boolean("must_change_password").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type User = typeof users.$inferSelect;

// `users` queda dormida (sin rutas /login ni /admin en Fase 1, landing pura).
// La reactiva Fase 2 cuando entre el CRM portado de ADAF.

// Leads del formulario de contacto público. Sin pipeline/CRM — eso llega en Fase 2.
export const contactLeads = pgTable("contact_leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type ContactLead = typeof contactLeads.$inferSelect;

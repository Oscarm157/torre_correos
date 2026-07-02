"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { initials, avatarClass } from "@/components/crm/avatar";

// Breadcrumb de sección derivado de la ruta: grupo (eyebrow) + página (serif).
// Mantiene el topbar informado sin duplicar el H1 grande de cada página.
type Crumb = { group: string; page: string };

const MAP: { test: (p: string) => boolean; crumb: Crumb }[] = [
  { test: (p) => p === "/admin/dashboard", crumb: { group: "Comercial", page: "Resumen" } },
  { test: (p) => p === "/admin/board", crumb: { group: "Comercial", page: "Pipeline" } },
  { test: (p) => p === "/admin/feedback", crumb: { group: "Contenido", page: "Comentarios" } },
  { test: (p) => p === "/admin/users", crumb: { group: "Cuenta", page: "Usuarios" } },
  { test: (p) => p === "/admin/profile", crumb: { group: "Cuenta", page: "Perfil" } },
  { test: (p) => /^\/admin\/[^/]+$/.test(p) && p !== "/admin", crumb: { group: "Comercial", page: "Detalle de lead" } },
];

function resolve(pathname: string): Crumb {
  return MAP.find((m) => m.test(pathname))?.crumb ?? { group: "Comercial", page: "Leads" };
}

const roleLabels: Record<string, string> = { admin: "Admin", agent: "Agente", viewer: "Lector" };

export function PanelTopbar({ user }: { user: { name: string; role: string } }) {
  const pathname = usePathname();
  const { group, page } = resolve(pathname);

  return (
    <header className="crm-topbar sticky top-0 z-10 backdrop-blur">
      <div className="flex h-14 items-center gap-3 px-3 sm:px-5">
        <SidebarTrigger className="-ml-1 text-[var(--crm-ink-mute)] hover:text-[var(--crm-ink)]" />
        <span className="h-5 w-px bg-[var(--crm-line-strong)]" />

        <div className="flex min-w-0 items-baseline gap-2">
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--crm-ink-faint)] sm:inline">
            {group}
          </span>
          <span className="hidden text-[var(--crm-line-strong)] sm:inline">/</span>
          <span className="truncate font-serif text-[15px] font-semibold tracking-[-0.01em] text-[var(--crm-ink)]">
            {page}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <span className="crm-tricolor-dots" aria-hidden>
            <span style={{ background: "var(--crm-brand-navy)" }} />
            <span style={{ background: "var(--crm-highlight)" }} />
            <span style={{ background: "var(--crm-olive)" }} />
          </span>
          <span className="mx-1 hidden h-5 w-px bg-[var(--crm-line-strong)] sm:block" />
          <div className="hidden text-right leading-tight sm:block">
            <p className="max-w-[160px] truncate text-[12.5px] font-semibold text-[var(--crm-ink)]">
              {user.name}
            </p>
            <p className="text-[10.5px] text-[var(--crm-ink-mute)]">{roleLabels[user.role] ?? user.role}</p>
          </div>
          <span
            className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${avatarClass(
              user.name
            )}`}
          >
            {initials(user.name)}
          </span>
        </div>
      </div>
    </header>
  );
}

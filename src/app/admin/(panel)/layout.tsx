import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { canManageUsers, canViewDashboard } from "@/lib/permissions";
import { logout } from "@/app/actions/auth";
import { AppSidebar } from "./AppSidebar";
import { PanelTopbar } from "./PanelTopbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
// Provider legacy para los tooltips de UserRowActions (se migra a shadcn en la 2ª tanda).
import { TooltipProvider } from "@/components/crm/ui/Tooltip";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const me = await getCurrentUser();
  if (!me) redirect("/login");
  if (me.mustChangePassword) redirect("/change-password");

  return (
    <TooltipProvider delayDuration={200}>
      <SidebarProvider>
        <AppSidebar
          user={{ name: me.name, role: me.role }}
          showUsers={canManageUsers(me.role)}
          showDashboard={canViewDashboard(me.role)}
          logoutAction={logout}
        />
        <SidebarInset>
          <PanelTopbar user={{ name: me.name, role: me.role }} />
          <main className="mx-auto w-full max-w-[1380px] px-4 py-7 sm:px-7 sm:py-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

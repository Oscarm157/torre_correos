import { requireUser } from "@/lib/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChangePasswordForm } from "./change-password-form";

export default async function ChangePasswordPage() {
  await requireUser();

  return (
    <main className="crm-root flex min-h-[100dvh] items-center justify-center bg-[var(--crm-bg)] px-4 py-12">
      <Card className="crm-card-raised w-full max-w-sm border-none">
        <CardHeader>
          <CardTitle className="crm-h1">Cambiar contraseña</CardTitle>
          <CardDescription>
            Define una contraseña nueva para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </main>
  );
}

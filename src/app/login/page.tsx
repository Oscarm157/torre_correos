import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const me = await getCurrentUser();
  if (me) redirect("/admin");

  return (
    <main className="crm-root flex min-h-[100dvh] items-center justify-center bg-[var(--crm-bg)] px-4 py-12">
      <Card className="crm-card-raised w-full max-w-sm border-none">
        <CardHeader>
          <CardTitle className="crm-h1">Iniciar sesión</CardTitle>
          <CardDescription>Entra con tu correo y contraseña.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}

import Image from "next/image";
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
    <main className="crm-root flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-[var(--crm-bg)] px-4 py-12">
      <Image
        src="/images/logos/Logo_Torre_Correos.jpg"
        alt="Torre Correos Community"
        width={64}
        height={64}
        priority
        className="size-12 rounded-md select-none"
      />
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

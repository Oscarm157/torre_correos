import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Hero from "./Hero";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Torre Correos Community, Tijuana, B.C.",
  description:
    "Una comunidad vibrante donde vivir, trabajar y convivir convergen en perfecta armonía.",
};

export default function HeroPilotPage() {
  return (
    <div className={`${display.variable} ${body.variable} font-body`}>
      <Hero />
      {/* Anclas placeholder: destinos de los CTA/nav durante el piloto. Las
          secciones reales se propagan en tareas posteriores. */}
      <section
        id="proyecto"
        className="flex min-h-[60vh] scroll-mt-16 items-center justify-center bg-[#f5f3ef] px-6 text-center sm:scroll-mt-20"
      >
        <p className="font-body text-sm tracking-[0.18em] text-[#9a7a48] uppercase">
          Sobre el Proyecto · sección pendiente
        </p>
      </section>
      <section
        id="agenda"
        className="flex min-h-[60vh] scroll-mt-16 items-center justify-center bg-[#1a2744] px-6 text-center sm:scroll-mt-20"
      >
        <p className="font-body text-sm tracking-[0.18em] text-[#d4b87a] uppercase">
          Agenda · sección pendiente
        </p>
      </section>
    </div>
  );
}

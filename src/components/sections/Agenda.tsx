"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";

/**
 * Agenda tu cita — familia de layout: banda CTA cinematográfica full-bleed
 * (rol Aker), imagen de calle oscurecida con overlay navy + contenido centrado.
 *
 * SIN Cal.com: el widget está roto en producción (404) y el link correcto llega
 * en otra tarea. Estado honesto: la CTA lleva a #contacto (no hay número de
 * WhatsApp confirmado en el repo). Se muestra la dirección real como referencia.
 * TODO: integrar Cal.com (o WhatsApp con número real) cuando Oscar entregue el link.
 */
export default function Agenda() {
  return (
    <section
      id="agenda"
      className="relative scroll-mt-16 overflow-hidden bg-[#0f1729] sm:scroll-mt-20"
    >
      <Image
        src="/images/gallery/torre_correos_ext_01.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#0f1729]/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-[#0f1729]/50 to-[#0f1729]/60" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-tight font-medium text-[#f5f3ef]">
            Visita Torre Correos
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-body text-base leading-relaxed text-[#f5f3ef]/80 sm:text-lg">
            Selecciona la fecha y hora que mejor te convenga para conocer
            personalmente el proyecto.
          </p>
          <p className="mt-6 font-body text-[0.8125rem] tracking-[0.14em] text-[#d4b87a] uppercase">
            Av. Negrete 2117, Zona Centro, Tijuana, B.C.
          </p>
          <div className="mt-9">
            <Button
              asChild
              className="h-12 rounded-none bg-[#b8965c] px-8 font-body text-sm font-semibold tracking-[0.08em] text-[#0f1729] uppercase transition-colors duration-200 hover:bg-[#d4b87a]"
            >
              <a href="#contacto">Quiero agendar</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

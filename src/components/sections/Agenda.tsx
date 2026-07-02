"use client";

import { useEffect } from "react";
import Image from "next/image";
import Cal, { getCalApi } from "@calcom/embed-react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";

const CAL_NAMESPACE = "cita-showroom";
const CAL_LINK = "oscar-arredondo-fs6wzu/cita-showroom";

const MAPS_LINK = "https://maps.app.goo.gl/NtT6mQSnUaLjRTPn9";

const ASESORAS = [
  {
    nombre: "Adriana Gaxiola",
    rol: "Líder de Proyecto Residencial Torre Correos Community",
    foto: "/images/team/adriana-gaxiola.webp",
  },
  {
    nombre: "Pavelly Mitre",
    rol: "Asesor Especializado Torre Correos Community",
    foto: "/images/team/pavelly-mitre.webp",
  },
];

/**
 * Agenda tu cita — familia de layout: banda CTA cinematográfica full-bleed
 * (rol Aker), imagen de calle oscurecida con overlay navy. En `lg:` el
 * contenido se parte en 2 columnas: copy/CTA a la izquierda, calendario de
 * Cal.com embebido a la derecha (namespace/calLink reales de Oscar).
 *
 * "Botón de ubicación" pedido en la retro (PDF pág. 5): abre el link real de
 * Google Maps (mismo que la sección Ubicación).
 */
export default function Agenda() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

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

      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <Reveal className="text-center lg:text-left">
          <span className="font-body text-[0.75rem] tracking-[0.24em] text-[#d4b87a] uppercase">
            Agenda tu Cita
          </span>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] leading-tight font-medium text-[#f5f3ef]">
            Visita nuestras oficinas
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-body text-base leading-relaxed text-[#f5f3ef]/80 sm:text-lg lg:mx-0">
            Selecciona la fecha y hora que mejor te convenga para conocer
            personalmente el proyecto.
          </p>
          <p className="mt-6 font-body text-[0.8125rem] tracking-[0.14em] text-[#d4b87a] uppercase">
            Av. Negrete 2117, Zona Centro, Tijuana, B.C.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Button
              asChild
              className="h-12 rounded-none bg-[#b8965c] px-8 font-body text-sm font-semibold tracking-[0.08em] text-[#0f1729] uppercase transition-colors duration-200 hover:bg-[#d4b87a]"
            >
              <a href="#contacto">Quiero agendar</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-none border-[#b8965c]/50 bg-transparent px-8 font-body text-sm font-semibold tracking-[0.08em] text-[#d4b87a] uppercase transition-colors duration-200 hover:border-[#d4b87a] hover:bg-[#b8965c]/10 hover:text-[#f5f3ef]"
            >
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
                <MapPin className="size-4" />
                Ver ubicación
              </a>
            </Button>
          </div>

          {/* Foto de asesoras pedida en la retro (PDF pág. 5): equipo real de
              Probien (probien.com.mx/agentes), no stock. */}
          <div className="mt-14 flex flex-col items-center justify-center gap-8 border-t border-[#f5f3ef]/10 pt-10 sm:flex-row sm:gap-12 lg:justify-start">
            {ASESORAS.map((a) => (
              <div key={a.nombre} className="flex items-center gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-[#b8965c]/40">
                  <Image src={a.foto} alt={a.nombre} fill sizes="3.5rem" className="object-cover" />
                </div>
                <div className="text-left">
                  <p className="font-display text-lg text-[#f5f3ef]">{a.nombre}</p>
                  <p className="font-body text-[0.75rem] leading-snug text-[#f5f3ef]/60">{a.rol}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="w-full">
          <div className="h-[520px] w-full overflow-hidden border border-[#f5f3ef]/15 bg-[#f5f3ef]/[0.03] sm:h-[560px]">
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

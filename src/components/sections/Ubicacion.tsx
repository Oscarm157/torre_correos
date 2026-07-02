"use client";

import { MapPin, ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * Ubicación — familia de layout: mapa como media con card flotante (rol Aker).
 * El mapa domina el ancho y una card navy translúcida se superpone con la
 * dirección real y el enlace real a Google Maps (ambos del brief del cliente).
 * Embed sin API key vía maps?q=...&output=embed. Banda clara (crema).
 */
const DIRECCION = "Av. Negrete 2117, Zona Centro, 22000 Tijuana, B.C.";
const MAPS_QUERY = encodeURIComponent(DIRECCION);
const MAPS_LINK = "https://maps.app.goo.gl/NtT6mQSnUaLjRTPn9";

export default function Ubicacion() {
  return (
    <section
      id="ubicacion"
      className="scroll-mt-16 bg-[#f5f3ef] py-20 sm:scroll-mt-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <span className="font-body text-[0.75rem] tracking-[0.24em] text-[#9a7a48] uppercase">
              Ubicación
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-medium text-[#1a2744]">
              En el corazón de Tijuana
            </h2>
          </div>
        </Reveal>

        <Reveal y={36} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#1a2744]/10 sm:aspect-[16/9]">
            <iframe
              title="Mapa de la ubicación de Torre Correos"
              src={`https://www.google.com/maps?q=${MAPS_QUERY}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale-[0.2]"
            />
          </div>

          {/* Card flotante con la dirección real. */}
          <div className="relative z-10 mx-auto -mt-16 w-[calc(100%-2rem)] max-w-md bg-[#0f1729] p-7 shadow-xl sm:absolute sm:bottom-8 sm:left-8 sm:mx-0 sm:-mt-0 sm:p-8">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-[#d4b87a]" />
              <div>
                <p className="font-display text-2xl leading-tight text-[#f5f3ef]">
                  Torre Correos
                </p>
                <p className="mt-2 font-body text-[0.9375rem] leading-relaxed text-[#f5f3ef]/75">
                  {DIRECCION}
                </p>
              </div>
            </div>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-[#b8965c]/50 pb-1 font-body text-[0.8125rem] font-semibold tracking-[0.1em] text-[#d4b87a] uppercase transition-colors duration-200 hover:border-[#d4b87a] hover:text-[#f5f3ef]"
            >
              Cómo llegar
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

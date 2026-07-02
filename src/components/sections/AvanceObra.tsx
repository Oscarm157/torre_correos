"use client";

import { Reveal } from "./reveal";

/**
 * Avance de Obra — placeholder honesto. No hay contenido real todavía (pendiente
 * de Oscar). Familia DISTINTA a Comunidad: bloque asimétrico alineado a la
 * izquierda sobre banda clara (crema), con numeral serif grande como ancla.
 * TODO: sustituir por la bitácora/seguimiento de obra real cuando llegue.
 */
export default function AvanceObra() {
  return (
    <section
      id="avance-de-obra"
      className="scroll-mt-16 bg-[#f5f3ef] py-24 sm:scroll-mt-20 sm:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <span
            aria-hidden
            className="font-display text-[clamp(4rem,12vw,9rem)] leading-none font-medium text-[#1a2744]/10"
          >
            0%
          </span>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal delay={0.08}>
            <span className="font-body text-[0.75rem] tracking-[0.24em] text-[#9a7a48] uppercase">
              En preparación
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-medium text-[#1a2744]">
              Avance de Obra
            </h2>
            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-[#666666]">
              Aquí publicaremos el seguimiento del avance de construcción de Torre
              Correos. La bitácora estará disponible en los próximos meses.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

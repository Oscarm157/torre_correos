"use client";

import { Reveal } from "./reveal";

/**
 * Comunidad — placeholder honesto. No hay contenido real todavía (pendiente de
 * Oscar). Familia: statement centrado sobre banda dark. Mantiene identidad de
 * marca sin inventar copy de marketing.
 * TODO: sustituir por el contenido real de Comunidad cuando llegue.
 */
export default function Comunidad() {
  return (
    <section
      id="comunidad"
      className="scroll-mt-16 bg-[#1a2744] py-24 sm:scroll-mt-20 sm:py-32"
    >
      <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="font-body text-[0.75rem] tracking-[0.24em] text-[#d4b87a] uppercase">
            Próximamente
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-medium text-[#f5f3ef]">
            Comunidad
          </h2>
          <span className="mx-auto mt-6 block h-px w-16 bg-[#b8965c]/50" />
          <p className="mt-6 font-body text-base leading-relaxed text-[#f5f3ef]/65">
            Estamos preparando esta sección. Muy pronto compartiremos aquí la vida
            de la comunidad de Torre Correos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

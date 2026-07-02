"use client";

import { Reveal } from "./reveal";

/**
 * Propuesta de valor — familia de layout: filas numeradas tipográficas (01–04).
 * NO es el grid de 4 cards idénticas del sitio viejo: cada valor es una fila
 * ancha con numeral serif oversized, título y descripción, separadas por
 * hairline dorado. Banda dark (navy) del ritmo dark/light.
 */
const VALORES = [
  {
    n: "01",
    titulo: "Diseño Atemporal",
    desc: "Residencias y oficinas con arquitectura que trasciende tendencias",
  },
  {
    n: "02",
    titulo: "Bienestar Integral",
    desc: "Servicios pensados para tu calidad de vida",
  },
  {
    n: "03",
    titulo: "Conectividad Estratégica",
    desc: "Ubicación privilegiada con acceso a los puntos clave de la ciudad. Ubicado en la Zona Platino, a 5 minutos de la Línea SENTRI de San Ysidro.",
  },
  {
    n: "04",
    titulo: "Comunidad Vibrante",
    desc: "Un ecosistema que fomenta conexiones auténticas",
  },
];

export default function PropuestaValor() {
  return (
    <section className="bg-[#1a2744] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="border-t border-[#b8965c]/25">
          {VALORES.map((v, i) => (
            <Reveal key={v.n} delay={i * 0.06}>
              <div className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-[#b8965c]/25 py-8 transition-colors duration-300 hover:bg-[#0f1729]/40 sm:gap-x-10 sm:py-10 lg:grid-cols-[6rem_1fr_1.2fr] lg:items-center lg:gap-x-12">
                <span className="font-display text-4xl font-medium text-[#b8965c]/70 transition-colors duration-300 group-hover:text-[#d4b87a] sm:text-5xl lg:text-6xl">
                  {v.n}
                </span>
                <h3 className="font-display text-[1.75rem] leading-tight font-medium text-[#f5f3ef] sm:text-4xl">
                  {v.titulo}
                </h3>
                <p className="col-span-2 mt-2 max-w-md font-body text-[0.9375rem] leading-relaxed text-[#f5f3ef]/70 sm:text-base lg:col-span-1 lg:mt-0">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

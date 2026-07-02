"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal, EASE } from "./reveal";

/**
 * Espacios — familia de layout: selector interactivo con cross-fade.
 * Reemplaza (no añade) las amenidades puntuales de rooftop del sitio viejo por
 * categorías de espacio: Residencias, Penthouses, Áreas de confort, Corporativos,
 * Comercio. La palabra "Amenidades" no aparece: es otra cosa. Imagen grande a la
 * izquierda + lista de categorías a la derecha;
 * al cambiar de categoría la imagen hace cross-fade (rol Aker). Banda dark.
 *
 * ASIGNACIÓN DE FOTOS: no hay render específico por categoría todavía. Se asignan
 * renders reales del proyecto de forma razonada. Marcadas como "genérica" las que
 * usan una foto de contexto y esperan render propio de Oscar:
 *  - Residencias: int_06 (interior residencial real) — buen calce.
 *  - Penthouses: int_02 (vestíbulo escultórico) — GENÉRICA, no hay render de penthouse.
 *  - Áreas de confort: int_04 (concierge lounge real) — buen calce.
 *  - Corporativos: int_01 (vestíbulo doble altura) — GENÉRICA, no hay render de oficina.
 *  - Comercio: ext_01 (arcada comercial a pie de calle) — buen calce.
 * Nota: se descartó amenidades-lifestyle.jpg (cancha de bochas) por ser el stock
 * flaggeado en DESIGN.md; int_04 es mejor calce y es render propio.
 */
const CATEGORIAS = [
  {
    id: "residencias",
    nombre: "Residencias",
    desc: "Espacios residenciales de atmósfera cálida y atemporal, pensados para la vida diaria.",
    src: "/images/gallery/torre_correos_int_06.webp",
    alt: "Interior residencial con cocina, sala y comedor abiertos y vista a la ciudad",
  },
  {
    id: "penthouses",
    nombre: "Penthouses",
    // Foto genérica: sin render específico de penthouse todavía.
    desc: "Las residencias en los niveles superiores de la torre.",
    src: "/images/gallery/torre_correos_int_02.webp",
    alt: "Vestíbulo con muro de casilleros postales y escalera helicoidal de acero inoxidable",
  },
  {
    id: "confort",
    nombre: "Áreas de confort",
    desc: "Espacios de descanso y convivencia con acabados cálidos de madera.",
    src: "/images/gallery/torre_correos_int_04.webp",
    alt: "Área de concierge con acabados cálidos de madera y mobiliario de descanso",
  },
  {
    id: "corporativos",
    nombre: "Corporativos",
    // Foto genérica: sin render de oficina todavía; el vestíbulo hace de contexto.
    desc: "Oficinas integradas dentro del desarrollo de usos mixtos.",
    src: "/images/gallery/torre_correos_int_01.webp",
    alt: "Vestíbulo de doble altura con escalera escultórica y techo artesonado de concreto",
  },
  {
    id: "comercio",
    nombre: "Comercio",
    desc: "Locales comerciales a pie de calle, junto al vestíbulo principal.",
    src: "/images/gallery/torre_correos_ext_01.webp",
    alt: "Planta baja comercial con arcada de concreto y locales a pie de calle",
  },
];

export default function Espacios() {
  const reduceMotion = useReducedMotion();
  const [activo, setActivo] = useState(0);
  const cat = CATEGORIAS[activo];

  return (
    <section
      id="espacios"
      className="scroll-mt-16 bg-[#0f1729] py-20 sm:scroll-mt-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="font-body text-[0.75rem] tracking-[0.24em] text-[#d4b87a] uppercase">
              Categorías del desarrollo
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-medium text-[#f5f3ef]">
              Espacios
            </h2>
          </div>
        </Reveal>

        <Reveal
          y={36}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
        >
          {/* Imagen grande con cross-fade */}
          <div className="relative order-1 aspect-[4/3] overflow-hidden bg-[#1a2744] lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]">
            <AnimatePresence mode="sync">
              <motion.div
                key={cat.id}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={cat.src}
                  alt={cat.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729]/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selector de categorías */}
          <div className="order-2 flex flex-col justify-center lg:col-span-5">
            <ul className="border-t border-[#b8965c]/20">
              {CATEGORIAS.map((c, i) => {
                const on = i === activo;
                return (
                  <li key={c.id} className="border-b border-[#b8965c]/20">
                    <button
                      type="button"
                      onClick={() => setActivo(i)}
                      aria-pressed={on}
                      className="group flex w-full items-baseline gap-4 py-5 text-left transition-colors duration-300"
                    >
                      <span
                        className={`font-body text-[0.75rem] tabular-nums transition-colors duration-300 ${
                          on ? "text-[#d4b87a]" : "text-[#f5f3ef]/40"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block font-display text-2xl font-medium transition-colors duration-300 sm:text-3xl ${
                            on
                              ? "text-[#f5f3ef]"
                              : "text-[#f5f3ef]/55 group-hover:text-[#f5f3ef]/85"
                          }`}
                        >
                          {c.nombre}
                        </span>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: EASE }}
                              className="block overflow-hidden"
                            >
                              <span className="block max-w-sm pt-2 font-body text-[0.9375rem] leading-relaxed text-[#f5f3ef]/70">
                                {c.desc}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

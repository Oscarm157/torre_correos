"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Reveal, EASE } from "./reveal";

/**
 * Galería — familia de layout: mosaico editorial en columnas (CSS `columns`,
 * NO css-grid con aspect-ratios mixtos: eso deja huecos cuando un ítem de la
 * fila queda más corto que su pareja — bug real que hubo aquí). El flujo por
 * columnas empaca cada foto justo debajo de la anterior sin importar su
 * altura, y el ritmo asimétrico lo dan los aspect-ratios variados, no el
 * grid. Solo renders reales del proyecto (sin stock: la foto de cancha de
 * bochas queda flaggeada en DESIGN.md, no se usa aquí). Banda clara (crema).
 */
const FOTOS = [
  {
    src: "/images/gallery/torre_correos_ext_04.webp",
    alt: "Torre Correos vista desde la calle, volumen escalonado con láminas perforadas de acero",
    caption: "Fachada principal",
    aspect: "aspect-[3/4]",
    sizes: "(max-width: 1024px) 100vw, 48vw",
  },
  {
    src: "/images/gallery/torre_correos_int_01.webp",
    alt: "Vestíbulo de doble altura con escalera escultórica y techo artesonado de concreto",
    caption: "Vestíbulo principal",
    aspect: "aspect-[16/11]",
    sizes: "(max-width: 1024px) 100vw, 48vw",
  },
  {
    src: "/images/gallery/torre_correos_int_06.webp",
    alt: "Interior residencial con cocina, sala y comedor abiertos y vista a la ciudad",
    caption: "Interior residencial",
    aspect: "aspect-[4/5]",
    sizes: "(max-width: 1024px) 100vw, 48vw",
  },
  {
    src: "/images/gallery/torre_correos_int_04.webp",
    alt: "Área de concierge con acabados cálidos de madera y mobiliario de descanso",
    caption: "Concierge",
    aspect: "aspect-[3/4]",
    sizes: "(max-width: 1024px) 100vw, 48vw",
  },
  {
    src: "/images/gallery/torre_correos_ext_01.webp",
    alt: "Planta baja comercial con arcada de concreto y locales a pie de calle",
    caption: "Comercio a pie de calle",
    aspect: "aspect-[3/2]",
    sizes: "(max-width: 1024px) 100vw, 48vw",
  },
  {
    src: "/images/gallery/torre_correos_int_02.webp",
    alt: "Vestíbulo con muro de casilleros postales y escalera helicoidal de acero inoxidable",
    caption: "Guiño postal en el vestíbulo",
    aspect: "aspect-[16/11]",
    sizes: "(max-width: 1024px) 100vw, 48vw",
  },
];

export default function Galeria() {
  const [abierta, setAbierta] = useState<number | null>(null);

  useEffect(() => {
    if (abierta === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierta(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierta]);

  return (
    <section
      id="galeria"
      className="scroll-mt-16 bg-[#f5f3ef] py-20 sm:scroll-mt-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="font-body text-[0.75rem] tracking-[0.24em] text-[#9a7a48] uppercase">
              Galería
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-medium text-[#1a2744]">
              Descubre cada espacio
            </h2>
          </div>
        </Reveal>

        <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3">
          {FOTOS.map((foto, i) => (
            <Reveal
              key={foto.src}
              delay={(i % 3) * 0.07}
              y={36}
              className="mb-3 block break-inside-avoid sm:mb-4"
            >
              <button
                type="button"
                onClick={() => setAbierta(i)}
                aria-label={`Ampliar: ${foto.caption}`}
                className="group relative block w-full cursor-zoom-in overflow-hidden bg-[#1a2744] focus:outline-none"
              >
                <figure className={`relative w-full ${foto.aspect}`}>
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes={foto.sizes}
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1729]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <figcaption className="pointer-events-none absolute bottom-0 left-0 translate-y-2 p-4 font-body text-[0.8125rem] tracking-[0.08em] text-[#f5f3ef] uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
                    {foto.caption}
                  </figcaption>
                </figure>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {abierta !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f1729]/95 p-4 sm:p-8"
            onClick={() => setAbierta(null)}
          >
            <button
              type="button"
              onClick={() => setAbierta(null)}
              aria-label="Cerrar"
              className="absolute top-5 right-5 flex size-10 items-center justify-center border border-[#f5f3ef]/20 text-[#f5f3ef] transition-colors duration-200 hover:border-[#d4b87a] hover:text-[#d4b87a]"
            >
              <X className="size-5" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={FOTOS[abierta].src}
                  alt={FOTOS[abierta].alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-center font-body text-[0.8125rem] tracking-[0.1em] text-[#f5f3ef]/70 uppercase">
                {FOTOS[abierta].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import Image from "next/image";
import { Reveal } from "./reveal";

/**
 * Galería — familia de layout: mosaico editorial asimétrico.
 * Tiles de distinto span y aspecto (no un grid uniforme): la torre en placa
 * vertical grande ancla el conjunto y el resto compone alrededor con ritmo
 * desigual. Solo renders reales del proyecto (sin stock: la foto de cancha de
 * bochas queda flaggeada en DESIGN.md, no se usa aquí).
 * Banda clara (crema) del ritmo dark/light.
 */
const FOTOS = [
  {
    src: "/images/gallery/torre_correos_ext_04.webp",
    alt: "Torre Correos vista desde la calle, volumen escalonado con láminas perforadas de acero",
    caption: "Fachada principal",
    cell: "lg:col-span-5 aspect-[3/4]",
    sizes: "(max-width: 1024px) 100vw, 40vw",
  },
  {
    src: "/images/gallery/torre_correos_int_01.webp",
    alt: "Vestíbulo de doble altura con escalera escultórica y techo artesonado de concreto",
    caption: "Vestíbulo principal",
    cell: "lg:col-span-7 aspect-[16/11]",
    sizes: "(max-width: 1024px) 100vw, 56vw",
  },
  {
    src: "/images/gallery/torre_correos_int_06.webp",
    alt: "Interior residencial con cocina, sala y comedor abiertos y vista a la ciudad",
    caption: "Interior residencial",
    cell: "lg:col-span-7 aspect-[16/10]",
    sizes: "(max-width: 1024px) 100vw, 56vw",
  },
  {
    src: "/images/gallery/torre_correos_int_04.webp",
    alt: "Área de concierge con acabados cálidos de madera y mobiliario de descanso",
    caption: "Concierge",
    cell: "lg:col-span-5 aspect-[4/5]",
    sizes: "(max-width: 1024px) 100vw, 40vw",
  },
  {
    src: "/images/gallery/torre_correos_ext_01.webp",
    alt: "Planta baja comercial con arcada de concreto y locales a pie de calle",
    caption: "Comercio a pie de calle",
    cell: "lg:col-span-6 aspect-[3/2]",
    sizes: "(max-width: 1024px) 100vw, 48vw",
  },
  {
    src: "/images/gallery/torre_correos_int_02.webp",
    alt: "Vestíbulo con muro de casilleros postales y escalera helicoidal de acero inoxidable",
    caption: "Guiño postal en el vestíbulo",
    cell: "lg:col-span-6 aspect-[3/2]",
    sizes: "(max-width: 1024px) 100vw, 48vw",
  },
];

export default function Galeria() {
  return (
    <section
      id="galeria"
      className="scroll-mt-16 bg-[#f5f3ef] py-20 sm:scroll-mt-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-medium text-[#1a2744]">
              Galería
            </h2>
            <span className="hidden font-body text-[0.75rem] tracking-[0.2em] text-[#9a7a48] uppercase sm:block">
              Renders del proyecto
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
          {FOTOS.map((foto, i) => (
            <Reveal
              key={foto.src}
              delay={(i % 2) * 0.08}
              y={36}
              className={foto.cell}
            >
              <figure className="group relative h-full w-full overflow-hidden bg-[#1a2744]">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

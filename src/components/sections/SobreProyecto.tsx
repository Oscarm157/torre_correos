"use client";

import Image from "next/image";
import { Reveal } from "./reveal";

/**
 * Sobre el Proyecto — familia de layout: editorial asimétrico.
 * Titular serif oversized + columna de cuerpo estrecha, con el alzado técnico
 * (dibujo de fachada real) como placa vertical que ancla la derecha.
 * Sin eyebrow "Sobre el Proyecto" (retirado por el cliente en la retro).
 * Fondo crema (banda clara del ritmo dark/light).
 */
export default function SobreProyecto() {
  return (
    <section
      id="proyecto"
      className="scroll-mt-16 bg-[#f5f3ef] py-20 sm:scroll-mt-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-x-12 gap-y-14 px-5 sm:px-8 lg:grid-cols-12">
        {/* Columna editorial */}
        <div className="lg:col-span-7 lg:pr-8">
          <Reveal>
            <h2 className="max-w-2xl font-display text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.01em] text-[#1a2744]">
              Más que un edificio, una nueva forma de vivir Tijuana.
            </h2>
          </Reveal>

          <div className="mt-9 max-w-xl space-y-5 font-body text-[1.0625rem] leading-relaxed text-[#333333]">
            <Reveal delay={0.05}>
              <p>
                Torre Correos Community integra residencias, oficinas y espacios
                comerciales en un solo lugar, acompañados de una cuidada selección
                de amenidades y servicios de bienestar.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>Un concepto pensado para que tu día a día fluya sin salir de casa.</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Ubicado junto al histórico edificio de correos de Tijuana, el
                proyecto establece un diálogo entre pasado y presente,
                reinterpretando el valor del lugar desde una visión contemporánea.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Aquí, la arquitectura no solo se construye: conecta, respeta y
                evoluciona la ciudad.
              </p>
            </Reveal>
          </div>

          {/* Detalle de materiales (copy real del brief), tratado como nota editorial. */}
          <Reveal delay={0.1}>
            <div className="mt-10 max-w-xl border-l-2 border-[#b8965c] pl-5">
              <p className="font-body text-[0.9375rem] leading-relaxed text-[#666666]">
                Fachadas de concreto en distintas texturas y láminas perforadas de
                acero inoxidable. Desde la calle, el tratamiento dimensional evoca
                de forma abstracta la estética de un sello postal.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Placa vertical: alzado técnico de fachada (dibujo real del proyecto). */}
        <div className="lg:col-span-5">
          <Reveal delay={0.12} y={36} className="lg:sticky lg:top-28">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden border border-[#1a2744]/10 bg-white lg:max-w-none">
              <Image
                src="/images/gallery/Torre+Correos+-+Facade.webp"
                alt="Alzado arquitectónico de Torre Correos: volumen escalonado con láminas perforadas de acero"
                fill
                sizes="(max-width: 1024px) 24rem, 40vw"
                className="object-contain p-6"
              />
            </div>
            <p className="mt-4 text-center font-body text-[0.75rem] tracking-[0.16em] text-[#9a7a48] uppercase lg:text-left">
              Alzado arquitectónico · Probien Bienes Exclusivos
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

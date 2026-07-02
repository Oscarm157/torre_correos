import { ScrollScrubHero } from "./scroll-scrub-hero";

// Experimento: hero con secuencia de 14 fotogramas dibujados en canvas,
// el avance del scroll controla el fotograma (falta frame_010 de la
// secuencia original de 15, pendiente de Oscar).
export default function Hero3Page() {
  return (
    <main>
      <ScrollScrubHero />
      <div className="flex h-[60vh] items-center justify-center bg-[var(--color-cream)] text-[var(--color-navy)]">
        <p className="text-sm text-[var(--color-navy)]/60">Resto de la página, sin construir todavía.</p>
      </div>
    </main>
  );
}

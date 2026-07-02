import Hero from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Anclas placeholder: destinos de los CTA/nav mientras se propagan las
          secciones reales (Sobre el Proyecto, Galería, Agenda, Amenidades,
          Ubicación, Contacto, Footer). */}
      <section
        id="proyecto"
        className="flex min-h-[60vh] scroll-mt-16 items-center justify-center bg-[#f5f3ef] px-6 text-center sm:scroll-mt-20"
      >
        <p className="font-body text-sm tracking-[0.18em] text-[#9a7a48] uppercase">
          Sobre el Proyecto · sección pendiente
        </p>
      </section>
      <section
        id="agenda"
        className="flex min-h-[60vh] scroll-mt-16 items-center justify-center bg-[#1a2744] px-6 text-center sm:scroll-mt-20"
      >
        <p className="font-body text-sm tracking-[0.18em] text-[#d4b87a] uppercase">
          Agenda · sección pendiente
        </p>
      </section>
    </main>
  );
}

import Image from "next/image";

/**
 * Footer — nav del sitio + tagline breve + dirección real + © con año dinámico.
 * Sin redes sociales (no existen confirmadas para el proyecto). Banda dark que
 * cierra el ritmo. Server component (sin interactividad).
 */
const NAV_LINKS = [
  { label: "Proyecto", href: "#proyecto" },
  { label: "Galería", href: "#galeria" },
  { label: "Tipologías", href: "#espacios" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Avance de Obra", href: "#avance-de-obra" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1729] pt-16 pb-8">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-[#f5f3ef]/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca + tagline */}
          <div>
            <div className="flex items-center gap-3">
              <span className="overflow-hidden rounded-md ring-1 ring-[#b8965c]/25">
                <Image
                  src="/images/logos/Logo_Torre_Correos.jpg"
                  alt="Torre Correos Community"
                  width={590}
                  height={590}
                  className="h-11 w-11 object-cover"
                />
              </span>
              <span className="font-display text-xl text-[#f5f3ef]">
                Torre Correos
              </span>
            </div>
            <p className="mt-5 max-w-xs font-body text-[0.9375rem] leading-relaxed text-[#f5f3ef]/60">
              Residencias, oficinas y comercio en un solo lugar, junto al
              histórico edificio de correos de Tijuana.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página">
            <p className="font-body text-[0.75rem] tracking-[0.18em] text-[#d4b87a] uppercase">
              Explora
            </p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-[0.9375rem] text-[#f5f3ef]/70 transition-colors duration-200 hover:text-[#d4b87a]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Dirección */}
          <div>
            <p className="font-body text-[0.75rem] tracking-[0.18em] text-[#d4b87a] uppercase">
              Ubicación
            </p>
            <address className="mt-4 font-body text-[0.9375rem] leading-relaxed text-[#f5f3ef]/70 not-italic">
              Av. Negrete 2117
              <br />
              Zona Centro, 22000
              <br />
              Tijuana, B.C.
            </address>
            <a
              href="#contacto"
              className="mt-5 inline-block border-b border-[#b8965c]/50 pb-1 font-body text-[0.8125rem] font-semibold tracking-[0.1em] text-[#d4b87a] uppercase transition-colors duration-200 hover:border-[#d4b87a] hover:text-[#f5f3ef]"
            >
              Contactar
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 sm:flex-row">
          <p className="font-body text-[0.8125rem] text-[#f5f3ef]/45">
            © {year} Torre Correos Community. Todos los derechos reservados.
          </p>
          <p className="font-body text-[0.8125rem] text-[#f5f3ef]/45">
            Probien Bienes Exclusivos
          </p>
        </div>
      </div>
    </footer>
  );
}

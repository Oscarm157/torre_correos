"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE = [0.165, 0.84, 0.44, 1] as const;

const NAV_LINKS = [
  { label: "Proyecto", href: "#proyecto" },
  { label: "Galería", href: "#galeria" },
  { label: "Tipologías", href: "#espacios" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Avance de Obra", href: "#avance-de-obra" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock de scroll + cierre con Escape + focus trap mientras el menú móvil está abierto.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const container = mobileMenuRef.current;
    const focusable = container?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusable?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Parallax leve del video de fondo (rol Aker), desactivado si reduce-motion.
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 32);
  });

  // Entrada escalonada del contenido del hero.
  const container: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? {}
        : { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };
  const item: Variants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <>
      {/* Navegación superpuesta sobre el hero (rol Aker/Aspelin Reitan). */}
      <motion.header
        aria-hidden={menuOpen}
        initial={reduceMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-[#b8965c]/15 bg-[#0f1729]/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* Scrim superior para legibilidad cuando la nav es translúcida. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0f1729]/70 to-transparent transition-opacity duration-300 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        />
        <nav className="relative mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-5 sm:h-20 sm:px-8">
          <a
            href="#"
            aria-label="Torre Correos, inicio"
            className="relative z-10 flex shrink-0 items-center"
          >
            <span className="overflow-hidden rounded-md ring-1 ring-[#b8965c]/25">
              <Image
                src="/images/logos/Logo_Torre_Correos.jpg"
                alt="Torre Correos Community"
                width={590}
                height={590}
                priority
                className="h-11 w-11 object-cover sm:h-12 sm:w-12"
              />
            </span>
          </a>

          {/* Links desktop */}
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative font-body text-[0.8rem] font-medium tracking-[0.08em] text-[#f5f3ef]/85 uppercase transition-colors duration-200 hover:text-[#d4b87a]"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#d4b87a] transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden h-9 rounded-none border border-[#b8965c]/50 bg-transparent px-5 font-body text-[0.78rem] font-semibold tracking-[0.1em] text-[#d4b87a] uppercase transition-colors duration-200 hover:border-[#d4b87a] hover:bg-[#b8965c]/10 hover:text-[#f5f3ef] lg:inline-flex"
            >
              <a href="#contacto">Contactar</a>
            </Button>
            <button
              type="button"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-md text-[#f5f3ef] transition-colors hover:text-[#d4b87a] lg:hidden"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#0f1729] lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5 sm:h-20 sm:px-8">
              <span className="overflow-hidden rounded-md ring-1 ring-[#b8965c]/25">
                <Image
                  src="/images/logos/Logo_Torre_Correos.jpg"
                  alt="Torre Correos Community"
                  width={590}
                  height={590}
                  className="h-11 w-11 object-cover"
                />
              </span>
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setMenuOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-md text-[#f5f3ef] transition-colors hover:text-[#d4b87a]"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pb-16">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.06 * i }}
                  className="border-b border-[#f5f3ef]/10 py-4 font-display text-3xl text-[#f5f3ef] transition-colors hover:text-[#d4b87a]"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="mt-8 inline-flex h-12 items-center justify-center border border-[#b8965c]/60 font-body text-sm font-semibold tracking-[0.12em] text-[#d4b87a] uppercase transition-colors hover:bg-[#b8965c]/10 hover:text-[#f5f3ef]"
              >
                Contactar
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero cinematográfico full-bleed */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0f1729]"
      >
        {/* Video de fondo con parallax leve */}
        <motion.div
          style={reduceMotion ? undefined : { y: bgY }}
          className="absolute inset-0 -z-0"
        >
          <div className="absolute inset-0 scale-110">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/gallery/torre_correos_ext_04-1024.webp"
            >
              <source src="/videos/Video_hero_correos.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Overlays navy de marca (nunca negro puro) para contraste editorial. */}
          <div className="absolute inset-0 bg-[#0f1729]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-[#0f1729]/35 to-[#0f1729]/25" />
        </motion.div>

        {/* Contenido */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-20 pt-32 sm:px-8 sm:pb-28 lg:pb-32"
        >
          <div className="max-w-3xl">
            <motion.div
              variants={item}
              className="flex items-center gap-3 text-[#d4b87a]"
            >
              <span className="h-px w-8 bg-[#b8965c]" />
              <span className="font-body text-xs font-semibold tracking-[0.28em] uppercase">
                Tijuana, B.C.
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 font-display text-[clamp(3.25rem,9vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.01em] text-[#f5f3ef]"
            >
              Literalmente
              <br />
              lo tiene todo.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-xl font-body text-base leading-relaxed text-[#f5f3ef]/80 sm:text-lg"
            >
              Una comunidad vibrante donde vivir, trabajar y convivir convergen
              en perfecta armonía.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Button
                asChild
                className="h-12 rounded-none bg-[#b8965c] px-8 font-body text-sm font-semibold tracking-[0.08em] text-[#0f1729] uppercase transition-colors duration-200 hover:bg-[#d4b87a]"
              >
                <a href="#agenda">Agenda tu cita</a>
              </Button>
              <Button
                asChild
                className="h-12 rounded-none border border-[#b8965c]/60 bg-transparent px-8 font-body text-sm font-semibold tracking-[0.08em] text-[#d4b87a] uppercase transition-colors duration-200 hover:border-[#d4b87a] hover:bg-[#b8965c]/10 hover:text-[#f5f3ef]"
              >
                <a href="#proyecto">Conoce más</a>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Indicador de scroll (respeta reduce-motion) */}
        <motion.a
          href="#proyecto"
          aria-label="Desplázate hacia abajo"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1 }}
          className="absolute bottom-8 right-5 z-10 hidden items-center gap-3 sm:right-8 md:flex"
        >
          <span className="font-body text-[0.7rem] font-medium tracking-[0.22em] text-[#f5f3ef]/60 uppercase">
            Scroll
          </span>
          <span className="relative block h-12 w-px overflow-hidden bg-[#f5f3ef]/25">
            {!reduceMotion && (
              <motion.span
                className="absolute inset-x-0 top-0 h-4 bg-[#d4b87a]"
                animate={{ y: [-16, 48] }}
                transition={{
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            )}
          </span>
        </motion.a>
      </section>
    </>
  );
}

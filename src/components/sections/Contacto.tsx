"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, EASE } from "./reveal";

/**
 * Contacto — familia de layout: split editorial (mensaje a la izquierda,
 * formulario a la derecha) sobre banda clara (crema), legible con max-width.
 *
 * Formulario UI-only con validación de cliente básica (required en nombre/email
 * + type=email). NO se conecta a la DB en esta tarea.
 * TODO: conectar a server action + tabla contact_leads (tarea aparte).
 */
const CAMPOS = "w-full rounded-none border border-[#1a2744]/20 bg-white px-4 py-3 font-body text-[0.9375rem] text-[#333333] placeholder:text-[#999999] transition-colors duration-200 focus:border-[#b8965c] focus:outline-none";

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: conectar a server action + tabla contact_leads (tarea aparte).
    setEnviado(true);
  }

  return (
    <section
      id="contacto"
      className="scroll-mt-16 bg-[#f5f3ef] py-20 sm:scroll-mt-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Mensaje */}
        <div className="lg:pt-4">
          <Reveal>
            <h2 className="max-w-md font-display text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.05] font-medium text-[#1a2744]">
              Comienza a vivir diferente.
            </h2>
            <p className="mt-6 max-w-md font-body text-[1.0625rem] leading-relaxed text-[#333333]">
              Agenda una visita a nuestro showroom y descubre en persona lo que
              Torre Correos tiene para ofrecerte.
            </p>
            <p className="mt-4 max-w-md font-body text-[1.0625rem] leading-relaxed text-[#333333]">
              Únete a nuestra comunidad y recibe más noticias.
            </p>
            <div className="mt-9 flex items-start gap-3 border-t border-[#1a2744]/10 pt-9">
              <MapPin className="mt-0.5 size-5 shrink-0 text-[#9a7a48]" />
              <p className="font-body text-[0.9375rem] text-[#666666]">
                Av. Negrete 2117, Zona Centro, Tijuana
              </p>
            </div>
          </Reveal>
        </div>

        {/* Formulario */}
        <Reveal delay={0.1} y={32}>
          <div className="relative border border-[#1a2744]/10 bg-[#fefdfb] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {enviado ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-[#4a7c59]/10 text-[#4a7c59]">
                    <Check className="size-7" />
                  </span>
                  <p className="mt-5 font-display text-2xl text-[#1a2744]">
                    Gracias por tu interés.
                  </p>
                  <p className="mt-2 max-w-xs font-body text-[0.9375rem] leading-relaxed text-[#666666]">
                    Nos pondremos en contacto contigo muy pronto.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={false}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="nombre"
                      className="mb-2 block font-body text-[0.75rem] font-semibold tracking-[0.12em] text-[#9a7a48] uppercase"
                    >
                      Nombre completo
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Tu nombre"
                      className={CAMPOS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-body text-[0.75rem] font-semibold tracking-[0.12em] text-[#9a7a48] uppercase"
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="tucorreo@ejemplo.com"
                      className={CAMPOS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telefono"
                      className="mb-2 block font-body text-[0.75rem] font-semibold tracking-[0.12em] text-[#9a7a48] uppercase"
                    >
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Tu teléfono"
                      className={CAMPOS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mensaje"
                      className="mb-2 block font-body text-[0.75rem] font-semibold tracking-[0.12em] text-[#9a7a48] uppercase"
                    >
                      Mensaje <span className="text-[#999999]">(opcional)</span>
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      placeholder="Cuéntanos qué te interesa"
                      className={`${CAMPOS} resize-none`}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-none bg-[#1a2744] px-8 font-body text-sm font-semibold tracking-[0.08em] text-[#f5f3ef] uppercase transition-colors duration-200 hover:bg-[#0f1729]"
                  >
                    Quiero más información
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

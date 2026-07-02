"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

// Vocabulario de motion compartido con el Hero (mismo easing de marca, rol Aker).
export const EASE = [0.165, 0.84, 0.44, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  /** Retraso extra para escalonar hermanos dentro de una misma sección. */
  delay?: number;
  /** Desplazamiento vertical inicial del reveal (px). */
  y?: number;
};

/**
 * Reveal por scroll reutilizado en todas las secciones: fade + translateY sutil,
 * dispara una sola vez al entrar en viewport. Respeta prefers-reduced-motion
 * (queda visible sin animación). Usa el easing de marca del Hero.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  transition,
  ...rest
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay, ...transition }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { CountUp } from "@/components/crm/dashboard/CountUp";
import type { DashboardMetrics } from "@/lib/crm-metrics";
import { MoneyCount } from "./MoneyCount";

// Jerarquía en dos pisos: arriba los conteos (lead-count como hero, en serif
// grande), abajo el dinero, que es lo que pesa, en tarjetas más anchas con el
// color de marca según el tipo (navy = pipeline abierto, vino = ganado).
const heroNum = "font-serif text-[46px] leading-[0.9] tracking-[-0.02em] tabular-nums";
const bigNum = "font-serif text-[34px] leading-none tracking-[-0.015em] tabular-nums";
const num = "font-semibold text-[30px] leading-none tracking-[-0.02em] tabular-nums";

type Tone = "navy" | "wine" | "olive" | "neutral";
const ACCENT: Record<Tone, string> = {
  navy: "var(--crm-brand-navy)",
  wine: "var(--crm-wine)",
  olive: "var(--crm-olive)",
  neutral: "var(--crm-line-strong)",
};

type Kpi = {
  key: string;
  label: string;
  value: number;
  display: "int" | "money" | "pct";
  empty: boolean;
  context: string;
  tone: Tone;
};

function Card({
  c,
  i,
  size,
  className = "",
  reduce,
}: {
  c: Kpi;
  i: number;
  size: string;
  className?: string;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`crm-card-raised relative flex flex-col overflow-hidden p-5 ${className}`}
    >
      {/* Acento superior codificado por color de marca: sella el dato a su tipo. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: ACCENT[c.tone] }}
      />
      <p className="text-[11.5px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--crm-ink-mute)" }}>
        {c.label}
      </p>

      <div className="mt-auto pt-5" style={{ color: "var(--crm-ink)" }}>
        {c.empty ? (
          <span className={size} style={{ color: "var(--crm-ink-faint)" }}>
            –
          </span>
        ) : c.display === "money" ? (
          <MoneyCount value={c.value} className={size} />
        ) : (
          <CountUp
            value={c.value}
            suffix={c.display === "pct" ? "%" : ""}
            duration={1}
            delay={0.1}
            className={size}
          />
        )}
      </div>

      {c.key === "conversion" && !c.empty ? (
        <div className="mt-3.5">
          <div className="h-1 w-full overflow-hidden rounded-full" style={{ background: "var(--crm-surface-3)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: ACCENT.olive,
                width: `${Math.min(100, Math.max(3, c.value))}%`,
                transformOrigin: "left center",
              }}
              initial={{ scaleX: reduce ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <p className="mt-2.5 text-[12px] leading-snug" style={{ color: "var(--crm-ink-mute)" }}>
            {c.context}
          </p>
        </div>
      ) : (
        <p className="mt-3.5 text-[12px] leading-snug" style={{ color: "var(--crm-ink-mute)" }}>
          {c.context}
        </p>
      )}
    </motion.div>
  );
}

export function KpiCards({ totals }: { totals: DashboardMetrics["totals"] }) {
  const reduce = useReducedMotion();
  const closed = totals.won + totals.lost;

  const leads: Kpi = {
    key: "leads",
    label: "Leads del periodo",
    value: totals.leads,
    display: "int",
    empty: totals.leads === 0,
    context: totals.leads === 0 ? "Sin datos en el periodo" : "Creados en el rango seleccionado",
    tone: "navy",
  };
  const conversion: Kpi = {
    key: "conversion",
    label: "Conversión",
    value: Math.round(totals.conversionRate * 100),
    display: "pct",
    empty: closed === 0,
    context: closed === 0 ? "Sin cierres aún" : `${totals.won} ganados de ${closed} cerrados`,
    tone: "olive",
  };
  const days: Kpi = {
    key: "days",
    label: "Días al cierre",
    value: totals.avgDaysToClose === null ? 0 : Math.round(totals.avgDaysToClose),
    display: "int",
    empty: totals.avgDaysToClose === null,
    context: totals.avgDaysToClose === null ? "Sin cierres en el periodo" : "Promedio de creación a cierre",
    tone: "neutral",
  };
  const pipeline: Kpi = {
    key: "pipeline",
    label: "Valor en pipeline",
    value: totals.pipelineValue,
    display: "money",
    empty: totals.pipelineValue === 0,
    context: totals.pipelineValue === 0 ? "Sin oportunidades abiertas" : "Etapas abiertas, snapshot actual",
    tone: "navy",
  };
  const won: Kpi = {
    key: "won",
    label: "Valor ganado",
    value: totals.wonValue,
    display: "money",
    empty: totals.wonValue === 0,
    context:
      totals.wonValue === 0
        ? "Sin cierres ganados"
        : `${totals.won} ${totals.won === 1 ? "trato ganado" : "tratos ganados"}`,
    tone: "wine",
  };

  return (
    <div className="space-y-4">
      {/* Piso 1: conteos. Hero de leads ancho + conversión + días. */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card c={leads} i={0} size={heroNum} reduce={reduce} className="min-h-[168px] lg:col-span-2" />
        <Card c={conversion} i={1} size={num} reduce={reduce} className="min-h-[168px]" />
        <Card c={days} i={2} size={num} reduce={reduce} className="min-h-[168px]" />
      </div>
      {/* Piso 2: dinero. Lo que pesa, tarjetas anchas con color de marca. */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card c={pipeline} i={3} size={bigNum} reduce={reduce} className="min-h-[132px]" />
        <Card c={won} i={4} size={bigNum} reduce={reduce} className="min-h-[132px]" />
      </div>
    </div>
  );
}

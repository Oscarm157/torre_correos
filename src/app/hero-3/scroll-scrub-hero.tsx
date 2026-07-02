"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 14;
const SCROLL_VH = 400; // alto del track de scroll, en viewport-heights
const framePath = (n: number) =>
  `/hero-3-frames/frame-${String(n).padStart(2, "0")}.webp`;

export function ScrollScrubHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loaded++;
        if (loaded === FRAME_COUNT && !cancelled) setReady(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index - 1];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // object-fit: cover
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useEffect(() => {
    if (!ready) return;
    drawFrame(1);

    if (reducedMotion) return; // sin scrub: se queda en el primer frame

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        const frame = Math.min(FRAME_COUNT, Math.max(1, Math.round(progress * (FRAME_COUNT - 1)) + 1));
        if (frame !== frameRef.current) {
          frameRef.current = frame;
          drawFrame(frame);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, reducedMotion]);

  return (
    <div ref={trackRef} style={{ height: `${SCROLL_VH}vh` }} className="relative">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[var(--color-navy-deep)]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,23,41,0.55) 0%, rgba(15,23,41,0.25) 35%, rgba(15,23,41,0.65) 100%)",
          }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <span className="mb-4 text-xs font-medium tracking-[0.2em] text-[var(--color-gold-light)] uppercase">
            Tijuana, B.C.
          </span>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.05] text-[var(--color-cream)] md:text-7xl">
            Literalmente lo tiene todo.
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base text-[var(--color-cream)]/80 md:text-lg">
            Una comunidad vibrante donde vivir, trabajar y convivir convergen en
            perfecta armonía.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#agenda"
              className="rounded-md bg-[var(--color-gold)] px-8 py-3 text-sm font-medium text-[var(--color-navy-deep)] transition-colors duration-300 hover:bg-[var(--color-gold-light)]"
            >
              Agenda tu cita
            </a>
            <a
              href="#proyecto"
              className="rounded-md border border-[var(--color-gold)]/40 px-8 py-3 text-sm font-medium text-[var(--color-cream)] transition-colors duration-300 hover:border-[var(--color-gold)]"
            >
              Conoce más
            </a>
          </div>
        </div>
        {!ready && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--color-navy-deep)] text-sm text-[var(--color-cream)]/60">
            Cargando…
          </div>
        )}
      </div>
    </div>
  );
}

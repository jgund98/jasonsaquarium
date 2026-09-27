"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/**
 * Wipe the algae off a real tank. The dirty image is a real photo with a
 * generated algae film; strokes reveal the clean photo underneath using
 * destination-out on a plain 2D canvas (works everywhere, no blend modes).
 * touch-action: pan-y so vertical swipes still scroll the page.
 */
export default function AlgaeWipe({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    const c = canvas.current;
    if (!el || !c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const img = new Image();
    img.src = "/images/wipe/dirty.jpg";
    let W = 0, H = 0, raf = 0, cleared = 0, samples = 0;
    let last: { x: number; y: number } | null = null;
    let down = false;

    const paint = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      cleared = 0;
      samples = 0;
      setPct(0);
    };
    const resize = () => {
      const r = el.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
      if (img.complete && img.naturalWidth) paint();
    };
    const start = async () => {
      try {
        await img.decode();
      } catch {}
      resize();
      requestAnimationFrame(() => {
        paint();
        setReady(true);
      });
    };
    start();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const local = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      return { x: (e.clientX - r.left) * dpr, y: (e.clientY - r.top) * dpr };
    };
    const stroke = (a: { x: number; y: number }, b: { x: number; y: number }) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = Math.max(40, W * 0.09) * dpr;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      // soft edge
      ctx.lineWidth = Math.max(60, W * 0.13) * dpr;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const step = 24;
        let clear = 0, total = 0;
        const d = ctx.getImageData(0, 0, c.width, c.height).data;
        for (let y = 0; y < c.height; y += step) {
          for (let x = 0; x < c.width; x += step) {
            total++;
            if (d[(y * c.width + x) * 4 + 3] < 40) clear++;
          }
        }
        cleared = clear;
        samples = total;
        setPct(Math.round((cleared / Math.max(1, samples)) * 100));
      });
    };
    const onDown = (e: PointerEvent) => {
      down = true;
      last = local(e);
      setTouched(true);
      stroke(last, last);
      measure();
    };
    const onMove = (e: PointerEvent) => {
      // mouse wipes on hover; touch wipes while dragging sideways
      if (e.pointerType !== "mouse" && !down) return;
      const p = local(e);
      if (!last) last = p;
      stroke(last, p);
      last = p;
      setTouched(true);
      measure();
    };
    const onUp = () => {
      down = false;
      last = null;
    };
    const onLeave = () => {
      last = null;
    };
    c.addEventListener("pointerdown", onDown, { passive: true });
    c.addEventListener("pointermove", onMove, { passive: true });
    c.addEventListener("pointerup", onUp, { passive: true });
    c.addEventListener("pointercancel", onUp, { passive: true });
    c.addEventListener("pointerleave", onLeave, { passive: true });

    const reset = () => paint();
    el.addEventListener("wipe-reset", reset);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      c.removeEventListener("pointerdown", onDown);
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerup", onUp);
      c.removeEventListener("pointercancel", onUp);
      c.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("wipe-reset", reset);
    };
  }, []);

  return (
    <div className={clsx("relative select-none", className)}>
      <div ref={wrap} className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-abyss ring-1 ring-[var(--line)] select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/wipe/clean.jpg" alt="A clean, well-kept reef aquarium with a blue tang over white sand" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <canvas
          ref={canvas}
          className={clsx("absolute inset-0 h-full w-full cursor-crosshair transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}
          style={{ touchAction: "pan-y" }}
          aria-label="Wipe the algae off the glass"
          role="img"
        />
        <div
          className={clsx(
            "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 transition-opacity duration-500 md:p-5",
            touched ? "opacity-0" : "opacity-100"
          )}
        >
          <p className="rounded-full bg-abyss/70 px-4 py-2 text-[0.85rem] font-bold text-white backdrop-blur">
            <span className="md:hidden">Swipe sideways to clean the glass</span>
            <span className="hidden md:inline">Move your cursor to clean the glass</span>
          </p>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-abyss shadow">
          {pct}% clean
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[0.88rem] text-ink-soft">
        <p>{pct >= 85 ? "That is what Jason leaves behind every visit." : pct > 0 ? "Keep going. The glass is the easy part; the water chemistry underneath is the job." : "Twelve weeks of nobody watching, in one photo."}</p>
        <button
          type="button"
          onClick={() => wrap.current?.dispatchEvent(new Event("wipe-reset"))}
          className="font-bold text-abyss underline-offset-4 hover:underline"
        >
          Let it grow back
        </button>
      </div>
    </div>
  );
}

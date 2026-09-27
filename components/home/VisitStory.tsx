"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Container, Reveal, SectionHead } from "@/components/Section";

/**
 * "What a visit looks like": a rack of real test tubes that fill with their
 * reagent color as you scroll, beside the checklist Jason runs on every tank.
 */

const steps = [
  { k: "Test", title: "The water tells the story first", body: "Salinity, pH, nitrate, phosphate, alkalinity and calcium on saltwater. Ammonia, nitrite, nitrate, pH and hardness on freshwater. Numbers before opinions." },
  { k: "Change", title: "Water change with water that matches", body: "Saltwater is mixed and brought to your tank's salinity and temperature ahead of time. Freshwater is conditioned. Nothing goes in that could shock the system." },
  { k: "Clean", title: "Glass and rock and substrate", body: "Front and side panels, the rockwork or wood, the sand or gravel. Filters and skimmers get cleaned on their own rotation so bacteria are never wiped out at once." },
  { k: "Check", title: "Every pump and light and heater", body: "Flow, temperature, lighting schedule, dosing and controllers. Anything wearing out gets flagged before it fails during a hot week in August." },
  { k: "Look", title: "Every fish before he leaves", body: "Eating, breathing, color, behavior. Coral extension. New algae. A tank is a hundred small signals and Jason reads them every visit." },
];

const tubes = [
  { name: "Salinity", value: "1.025", color: "#33d6f2", level: 0.7 },
  { name: "Alk", value: "8.5", color: "#8ff2ff", level: 0.62 },
  { name: "Ca", value: "430", color: "#7c5cff", level: 0.8 },
  { name: "NO3", value: "5", color: "#3fbf7e", level: 0.4 },
  { name: "PO4", value: "0.04", color: "#ffd23a", level: 0.33 },
  { name: "pH", value: "8.2", color: "#ff6a4d", level: 0.66 },
];

export default function VisitStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const k = (vh * 0.9 - r.top) / (r.height + vh * 0.3);
        setP(Math.max(0, Math.min(1, k)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const done = p > 0.9;

  return (
    <section className="relative bg-white py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="What a visit looks like"
          title="The same routine on every tank because it works"
          lede="No upsell and no mystery. This is what happens when Jason shows up, in the order it happens."
        />

        <div ref={ref} className="mt-12 grid items-start gap-10 md:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* test tube rack */}
          <div>
            <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-abyss p-6 text-white md:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(70% 50% at 50% 100%, rgba(51,214,242,0.25), transparent 70%)" }}
              />
              <div className="relative flex items-baseline justify-between">
                <p className="eyebrow text-aqua">Reef water test</p>
                <p className="text-[0.8rem] font-semibold text-white/60">{Math.round(p * 100)}% read</p>
              </div>

              <svg viewBox="0 0 360 220" className="relative mt-4 w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
                    <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.06" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0.28" />
                  </linearGradient>
                  <clipPath id="tubeclip">
                    <path d="M0 0h30v130a15 15 0 0 1-30 0z" />
                  </clipPath>
                </defs>
                {/* rack */}
                <rect x="10" y="160" width="340" height="14" rx="6" fill="#0a3b61" />
                <rect x="10" y="34" width="340" height="10" rx="5" fill="#0a3b61" />
                {tubes.map((t, i) => {
                  const x = 30 + i * 54;
                  const fill = Math.max(0, Math.min(1, (p * tubes.length - i) * 1.5));
                  const h = 130 * t.level * fill;
                  return (
                    <g key={t.name} transform={`translate(${x} 40)`}>
                      <g clipPath="url(#tubeclip)">
                        <rect x="0" y="0" width="30" height="145" fill="rgba(255,255,255,0.06)" />
                        <rect
                          x="0"
                          y={145 - h}
                          width="30"
                          height={h + 20}
                          fill={t.color}
                          style={{ transition: "y 0.5s var(--ease-water), height 0.5s var(--ease-water)" }}
                        />
                        {fill > 0.05 && (
                          <ellipse cx="15" cy={145 - h} rx="15" ry="3" fill="#ffffff" opacity="0.35" />
                        )}
                        <rect x="0" y="0" width="30" height="145" fill="url(#glass)" />
                      </g>
                      <path d="M0 0h30v130a15 15 0 0 1-30 0z" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
                      <rect x="-3" y="-4" width="36" height="8" rx="3" fill="rgba(255,255,255,0.6)" />
                      <text x="15" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff" opacity="0.9">
                        {t.name}
                      </text>
                      <text x="15" y="188" textAnchor="middle" fontSize="12" fontWeight="700" fill={fill > 0.6 ? t.color : "rgba(255,255,255,0.3)"}>
                        {fill > 0.6 ? t.value : "···"}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <p
                className={clsx(
                  "relative mt-4 rounded-2xl px-4 py-3 text-[0.9rem] font-semibold transition-all duration-700",
                  done ? "bg-kelp/20 text-[#8ff0bd]" : "bg-white/8 text-white/70"
                )}
              >
                {done ? "All parameters in range. Tank is stable." : "Reading the tank as you scroll."}
              </p>
            </Reveal>
          </div>

          <ol className="relative border-l border-[var(--line)] pl-8 md:pl-10">
            {steps.map((s, i) => (
              <Reveal key={s.k} as="li" delay={i * 60} className="relative pb-7 last:pb-0">
                <span className="absolute -left-8 top-[0.35rem] h-3 w-3 -translate-x-1/2 rounded-full bg-coral ring-4 ring-white md:-left-10" />
                <span className="eyebrow text-lagoon">{s.k}</span>
                <h3 className="font-display mt-1 text-[1.25rem] leading-tight text-abyss md:text-[1.45rem]">{s.title}</h3>
                <p className="mt-1.5 max-w-xl text-pretty text-[0.93rem] leading-relaxed text-ink-soft">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

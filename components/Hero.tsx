"use client";

import { preload } from "react-dom";
import { useRef } from "react";
import Link from "next/link";
import ReefCanvas from "./ReefCanvas";
import { site, serviceAreas } from "@/lib/site";
import { Stars } from "./Footer";
import { PhoneIcon } from "./Header";

export default function Hero() {
  preload("/images/hero/reef-backdrop-3.jpg", { as: "image", fetchPriority: "high" });
  const copyRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative isolate overflow-hidden bg-abyss text-white"
      style={{
        background:
          "linear-gradient(180deg, #06304f 0%, #04213a 38%, #041a2e 100%)",
      }}
    >
      {/* surface shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[38vh] opacity-70"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(51,214,242,0.35), rgba(51,214,242,0) 70%)",
        }}
      />
      {/* a real reef, dissolved into the water behind the vector scene */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[85%] md:w-[56%]"
        style={{
          backgroundImage: "url(/images/hero/reef-backdrop-3.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "65% 55%",
          opacity: 0.5,
          filter: "blur(7px) saturate(1.15)",
          transform: "scale(1.06)",
          WebkitMaskImage:
            "radial-gradient(70% 85% at 72% 58%, #000 18%, rgba(0,0,0,0.6) 48%, transparent 76%), linear-gradient(180deg, transparent 0%, #000 30%, #000 80%, transparent 100%)",
          maskImage:
            "radial-gradient(70% 85% at 72% 58%, #000 18%, rgba(0,0,0,0.6) 48%, transparent 76%), linear-gradient(180deg, transparent 0%, #000 30%, #000 80%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      />
      <div aria-hidden="true" className="caustics pointer-events-none absolute inset-0 opacity-80" />

      {/* the living reef */}
      <div className="absolute inset-0">
        <ReefCanvas avoid={copyRef} />
      </div>

      {/* readability scrim behind copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,33,58,0.55) 0%, rgba(4,33,58,0.25) 40%, rgba(4,33,58,0) 62%)",
        }}
      />

      <div className="container-x pointer-events-none relative z-10 [&_a]:pointer-events-auto">
        <div className="flex min-h-[100svh] flex-col justify-center pb-28 pt-[calc(72px+2rem)] md:pt-[calc(84px+2rem)] lg:pb-32">
          <div ref={copyRef} className="max-w-4xl">
          {/* headline */}
          <div className="pointer-events-none max-w-4xl">
            <p className="eyebrow mb-4 hidden flex-wrap items-center gap-x-3 gap-y-1 text-aqua sm:flex">
              <span className="rise-in">
                Palm Beach County&rsquo;s
                <br className="sm:hidden" /> best aquarium specialist
              </span>
              <span className="rise-in hidden h-1 w-1 rounded-full bg-aqua/70 sm:inline-block" />
              <span className="rise-in hidden sm:inline">Owner operated</span>
            </p>
            <div className="rise-in mb-5 inline-flex max-w-full sm:hidden items-center gap-2 rounded-full border border-white/15 bg-abyss/45 px-3 py-2 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm" style={{ animationDelay: "0ms" }}>
              <span>Reef</span>
              <span className="h-1 w-1 rounded-full bg-aqua/80" />
              <span>Saltwater</span>
              <span className="h-1 w-1 rounded-full bg-aqua/80" />
              <span>Freshwater</span>
              <span className="h-1 w-1 rounded-full bg-aqua/80" />
              <span>Ponds</span>
            </div>
            <h1 className="font-display text-[clamp(2.4rem,5.4vw,5rem)] leading-[1.04]">
              <span className="rise-in water-text block" style={{ animationDelay: "60ms" }}>
                A beautiful aquarium.
              </span>
              <span className="rise-in water-text-glow block" style={{ animationDelay: "180ms" }}>
                None of the upkeep.
              </span>
            </h1>
          </div>

          <div className="pointer-events-none mt-8 max-w-2xl rise-in [&_a]:pointer-events-auto" style={{ animationDelay: "380ms" }}>
            <p className="max-w-[34rem] text-pretty text-[1.05rem] leading-relaxed text-white/85 md:text-[1.15rem]">
              From routine maintenance to water testing and troubleshooting, Jason keeps your
              aquarium healthy and looking its best, across{" "}
              <strong className="font-bold text-white">Palm Beach County and north Broward</strong>.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
              <Link href="/contact" className="btn btn-coral px-3 sm:px-6">
                Get a Free Quote
              </Link>
              <a href={site.phoneHref} className="btn btn-foam px-3 sm:px-6">
                <PhoneIcon /> {site.phone}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9rem] text-white/80">
              <a
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 font-semibold text-white"
              >
                <Stars className="h-3.5" />
                {site.rating.value} stars on Google
              </a>
              <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
              <span>Call or text any time</span>
            </div>
            <div className="rise-in mt-5 hidden sm:inline-flex items-center gap-3 rounded-full border border-white/15 bg-abyss/45 px-4 py-2 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm" style={{ animationDelay: "520ms" }}>
              <span>Reef</span>
              <span className="h-1 w-1 rounded-full bg-aqua/80" />
              <span>Saltwater</span>
              <span className="h-1 w-1 rounded-full bg-aqua/80" />
              <span>Freshwater</span>
              <span className="h-1 w-1 rounded-full bg-aqua/80" />
              <span>Ponds</span>
            </div>
          </div>
          </div>
        </div>
      </div>

      <TownStrip />
    </section>
  );
}

function TownStrip() {
  const towns = serviceAreas.map((a) => a.name);
  const row = [...towns, ...towns];
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-abyss/40 py-3.5 backdrop-blur-sm">
      <div className="overflow-hidden" style={{ ["--marquee-dur" as string]: "70s" }}>
        <div className="marquee-track items-center gap-8 pl-8 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-white/70">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              {t}
              <span className="h-1 w-1 rounded-full bg-aqua/80" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

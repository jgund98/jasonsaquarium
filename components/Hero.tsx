"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ReefCanvas from "./ReefCanvas";
import { site, serviceAreas } from "@/lib/site";
import { Stars } from "./Footer";
import { PhoneIcon } from "./Header";

export default function Hero() {
  const copyRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative isolate overflow-hidden bg-abyss text-white"
      style={{
        background: "linear-gradient(180deg, #06304f 0%, #04213a 38%, #041a2e 100%)",
      }}
    >
      {/* surface shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[38vh] opacity-70"
        style={{
          background: "radial-gradient(60% 80% at 50% 0%, rgba(51,214,242,0.35), rgba(51,214,242,0) 70%)",
        }}
      />
      <div aria-hidden="true" className="caustics pointer-events-none absolute inset-0 opacity-80" />

      {/* the living reef: back layer behind everything, front layer over the copy and the block */}
      <div className="absolute inset-0">
        <ReefCanvas avoid={copyRef} />
      </div>

      {/* readability scrim behind copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(90deg, rgba(4,33,58,0.55) 0%, rgba(4,33,58,0.25) 40%, rgba(4,33,58,0) 62%)",
        }}
      />

      <div className="container-x pointer-events-none relative z-10 [&_a]:pointer-events-auto">
        <div className="grid min-h-[100svh] grid-cols-1 items-center gap-x-10 gap-y-7 pb-24 pt-[calc(72px+1.5rem)] md:pt-[calc(84px+2rem)] lg:grid-cols-[1.12fr_0.88fr] lg:gap-x-12 lg:pb-28 [grid-template-areas:'head'_'media'_'copy'] lg:[grid-template-areas:'head_media'_'copy_media']">
          {/* headline */}
          <div ref={copyRef} className="[grid-area:head] lg:self-end">
            <p className="eyebrow rise-in mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-aqua">
              <span>Palm Beach County</span>
              <span className="hidden h-1 w-1 rounded-full bg-aqua/70 sm:inline-block" />
              <span className="hidden sm:inline">Owner operated</span>
            </p>
            <h1 className="font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.04]">
              <span className="rise-in water-text block lg:whitespace-nowrap" style={{ animationDelay: "60ms" }}>
                A beautiful aquarium.
              </span>
              <span className="rise-in water-text-glow block lg:whitespace-nowrap" style={{ animationDelay: "180ms" }}>
                None of the upkeep.
              </span>
            </h1>
          </div>

          {/* the block: a real tank Jason services, set into the water */}
          <div className="[grid-area:media] lg:row-span-2 lg:self-center">
            <div className="rise-in relative mx-auto w-full max-w-[36rem] lg:max-w-none" style={{ animationDelay: "240ms" }}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] ring-1 ring-white/20 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.85)]">
                <Image
                  src="/images/hero/lobby-block-2.jpg"
                  alt="A wall-mounted saltwater reef aquarium with live coral and tangs in a Palm Beach County lobby, serviced by Jason's Aquarium Service"
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
                {/* glass edge light */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0) 55%, rgba(4,33,58,0.35) 100%)",
                  }}
                />
                <div className="absolute bottom-4 right-4 rounded-full bg-abyss/80 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white backdrop-blur md:bottom-5 md:right-5 md:text-[0.72rem]">
                  <span className="sm:hidden">Reef · Fresh · Ponds</span>
                  <span className="hidden sm:inline">Reef · Saltwater · Freshwater · Ponds</span>
                </div>
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-abyss md:left-5 md:top-5">
                  A client&rsquo;s tank
                </div>
              </div>
            </div>
          </div>

          {/* copy + ctas */}
          <div className="[grid-area:copy] max-w-xl lg:self-start">
            <p className="rise-in text-pretty text-[1.05rem] leading-relaxed text-white/85 md:text-[1.18rem]" style={{ animationDelay: "300ms" }}>
              From routine maintenance to water testing and troubleshooting, Jason keeps your
              aquarium healthy and looking its best, across Palm Beach County and north Broward.
            </p>
            <div className="rise-in mt-7 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ animationDelay: "380ms" }}>
              <a href={site.smsPhotoHref} className="btn btn-coral md:hidden">
                Text Jason a photo
              </a>
              <Link href="/contact" className="btn btn-coral hidden md:inline-flex">
                Get a Free Quote
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2.5 border-b-2 border-white/40 pb-1 text-[1.02rem] font-semibold text-white transition-colors hover:border-aqua hover:text-aqua"
              >
                <PhoneIcon /> Call or text {site.phone}
              </a>
            </div>
            <div className="rise-in mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.92rem] text-white/80" style={{ animationDelay: "460ms" }}>
              <a href={site.googleMapsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-semibold text-white">
                <Stars className="h-3.5" />
                {site.rating.value} on Google
              </a>
              <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
              <span>Jason answers his own phone</span>
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

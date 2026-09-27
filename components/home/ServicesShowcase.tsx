import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { services } from "@/lib/services";
import { Container, Reveal, SectionHead } from "@/components/Section";
import { FishBullet } from "@/components/Brand";

const accentBg = {
  lagoon: "bg-lagoon",
  coral: "bg-coral",
  kelp: "bg-kelp",
} as const;

export default function ServicesShowcase() {
  return (
    <section className="relative bg-sand py-20 md:py-28" id="services">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead
            eyebrow="What Jason does"
            title={
              <>
                Three things done properly for every tank
              </>
            }
            lede="Cleaning and maintenance is the backbone. Design and installation is where a room changes. Assessments are for when something is wrong and you want the truth."
          />
          <Reveal delay={120} className="shrink-0">
            <Link href="/services" className="btn btn-abyss">
              All services
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
          {services.slice(0, 3).map((s, i) => (
            <Reveal key={s.slug} delay={i * 110} as="article" className="group">
              <Link
                href={`/services/${s.slug}`}
                className={clsx(
                  "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_60px_-40px_rgba(4,33,58,0.45)] ring-1 ring-[var(--line)] transition-transform duration-500 ease-[var(--ease-water)] hover:-translate-y-1.5"
                )}
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-water)] group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-abyss/10 to-transparent"
                  />
                  <span
                    className={clsx(
                      "absolute left-5 top-5 rounded-full px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white",
                      accentBg[s.accent]
                    )}
                  >
                    {s.eyebrow}
                  </span>
                  <h3 className="font-display absolute bottom-5 left-5 right-5 text-balance text-[1.55rem] leading-[1.05] text-white">
                    {s.name}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-pretty text-[0.98rem] leading-relaxed text-ink-soft">{s.short}</p>
                  <ul className="mt-5 space-y-2 text-[0.9rem] text-ink">
                    {s.bullets.slice(0, 3).map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <FishBullet />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.9rem] font-bold text-abyss">
                    Learn more
                    <Arrow className="transition-transform duration-500 ease-[var(--ease-water)] group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={clsx("h-4 w-4", className)} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

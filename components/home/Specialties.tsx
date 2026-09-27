import Link from "next/link";
import Image from "next/image";
import { specialties } from "@/lib/services";
import { Bubbles, Container, Reveal, SectionHead } from "@/components/Section";
import { Arrow } from "./ServicesShowcase";
import { Watermark } from "@/components/Brand";

export default function Specialties() {
  return (
    <section className="relative isolate overflow-hidden bg-abyss py-20 text-white md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 80% 0%, rgba(18,166,201,0.35), transparent 60%), radial-gradient(50% 40% at 10% 100%, rgba(255,106,77,0.18), transparent 60%)",
        }}
      />
      {/* phones: the glow above meets flat navy as a hard line, so fade it in and mark the seam */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-abyss via-abyss/70 to-transparent md:hidden" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-aqua/60 to-transparent md:hidden" />
      <Bubbles count={16} />
      <Watermark />
      <Container className="relative">
        <SectionHead
          tone="dark"
          eyebrow="Every kind of water"
          title="Care for every kind of aquatic space"
          lede="Saltwater and reef systems are where the reviews pile up, but Jason services planted tanks, cichlid tanks, discus tanks, goldfish tanks and koi ponds with the same routine: test, clean, check, look at every fish."
        />

        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-3">
          {specialties.map((s, i) => (
            <Reveal key={s.slug} delay={i * 110} as="article" className="group">
              <Link
                href={`/aquariums/${s.slug}`}
                className="relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 sm:aspect-[3/4] lg:aspect-[4/5]"
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-water)] group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent opacity-95"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <h3 className="font-display text-[1.7rem] leading-[1.05]">{s.name}</h3>
                  <p className="mt-2 max-w-[28ch] text-pretty text-[0.95rem] text-white/75">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.85rem] font-bold text-aqua">
                    See how it&rsquo;s serviced
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

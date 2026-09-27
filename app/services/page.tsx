import type { Metadata } from "next";
import { clip } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { services, specialties } from "@/lib/services";
import { Container, Reveal, SectionHead } from "@/components/Section";
import CtaBand from "@/components/home/CtaBand";
import VisitStory from "@/components/home/VisitStory";
import { Arrow } from "@/components/home/ServicesShowcase";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Aquarium Services in Palm Beach County, FL",
  description: clip("Aquarium cleaning and maintenance, custom design and installation, and honest aquarium assessments for saltwater, reef, freshwater and pond systems across Palm Beach County and north Broward. Owner-operated by Jason."),
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }])} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]}
        eyebrow="Services"
        title="Aquarium services in Palm Beach County from one person who answers"
        lede="Cleaning and maintenance on a schedule. Design and installation done right the first time. Assessments when something is wrong. All of it by Jason himself, across Palm Beach County and the north Broward towns next door."
        image="/images/stock/reef-tangs.jpg"
        imageAlt="Two yellow tangs swimming over red and green coral in a reef aquarium"
      />

      <section className="bg-sand py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="The three core services" title="Pick the one that fits today" />
          <div className="mt-12 space-y-6 md:mt-16">
            {services.map((s, i) => (
              <Reveal key={s.slug} as="article" delay={i * 80}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-[var(--line)] transition-transform duration-500 ease-[var(--ease-water)] hover:-translate-y-1 md:grid-cols-[0.8fr_1.2fr]"
                >
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[18rem]">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-water)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-col p-7 md:p-10">
                    <p className="eyebrow text-lagoon">{s.eyebrow}</p>
                    <h2 className="font-display mt-3 text-[1.7rem] leading-tight text-abyss md:text-[2.1rem]">{s.name}</h2>
                    <p className="mt-3 max-w-2xl text-pretty text-[1rem] leading-relaxed text-ink-soft">{s.intro}</p>
                    <ul className="mt-5 grid gap-2 text-[0.92rem] text-ink sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-2 font-bold text-abyss">
                      About {s.name.toLowerCase()} <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-abyss py-20 text-white md:py-24">
        <Container>
          <SectionHead tone="dark" eyebrow="By type of system" title="Serviced by what lives in it" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {specialties.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link href={`/aquariums/${s.slug}`} className="group flex h-full flex-col rounded-[1.5rem] bg-white/5 p-6 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                  <h3 className="font-display text-[1.4rem] leading-tight">{s.name}</h3>
                  <p className="mt-2 text-pretty text-[0.95rem] text-white/70">{s.short}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.85rem] font-bold text-aqua">
                    See how it&rsquo;s serviced <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <VisitStory />
      <CtaBand />
    </>
  );
}

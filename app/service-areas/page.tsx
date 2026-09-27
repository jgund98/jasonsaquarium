import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Container, Reveal, SectionHead } from "@/components/Section";
import CtaBand from "@/components/home/CtaBand";
import { cities } from "@/lib/cities";
import { Arrow } from "@/components/home/ServicesShowcase";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Aquarium Service Areas: Palm Beach County and North Broward",
  description:
    "Jason's Aquarium Service covers Boca Raton, Delray Beach, Boynton Beach, Wellington, West Palm Beach, Jupiter and the north Broward towns of Parkland, Coral Springs, Deerfield Beach, Coconut Creek, Lighthouse Point and Pompano Beach.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  const pb = cities.filter((c) => c.county === "Palm Beach");
  const bw = cities.filter((c) => c.county === "Broward");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }])} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Service Areas", url: "/service-areas" }]}
        eyebrow="Service areas"
        title="Aquarium service areas from Jupiter to Pompano Beach"
        lede="Jason is based in west Boca Raton and runs grouped route days across Palm Beach County and the north Broward towns just over the line. Pick your town for what service looks like there."
        image="/images/work/lobby-reef-1200.jpg"
        imageAlt="A wall-mounted reef aquarium Jason services in Palm Beach County"
      />

      {[
        { title: "Palm Beach County", list: pb, blurb: "The core of the route, from the Boca country clubs up the coast to Jupiter and out west to Wellington." },
        { title: "North Broward", list: bw, blurb: "Closer to Jason than most of Palm Beach County. Parkland and Deerfield are a shorter drive than Delray." },
      ].map((grp, gi) => (
        <section key={grp.title} className={gi === 0 ? "bg-white py-20 md:py-24" : "bg-shell py-20 md:py-24"}>
          <Container>
            <SectionHead eyebrow={grp.title} title={grp.blurb} />
            <div className={`mt-10 grid gap-4 sm:grid-cols-2 ${gi === 0 ? "xl:grid-cols-4" : "xl:grid-cols-3"}`}>
              {grp.list.map((c, i) => (
                <Reveal key={c.slug} delay={(i % 3) * 70}>
                  <Link href={`/aquarium-service/${c.slug}`} className="group flex h-full flex-col rounded-[1.5rem] bg-white p-6 ring-1 ring-[var(--line)] transition-transform duration-500 ease-[var(--ease-water)] hover:-translate-y-1">
                    <h3 className="font-display text-[1.3rem] leading-tight text-abyss">{c.name}</h3>
                    <p className="mt-2 text-pretty text-[0.92rem] leading-relaxed text-ink-soft">{c.angle}</p>
                    <p className="mt-3 line-clamp-2 text-[0.82rem] text-ink-soft/80">{c.neighborhoods.slice(0, 4).join(" · ")}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[0.88rem] font-bold text-abyss">
                      Aquarium service in {c.name} <Arrow className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="relative bg-abyss">
        <div className="relative aspect-[16/9] w-full md:aspect-[21/7]">
          <Image src="/images/areas/boca-beach.jpg" alt="Boca Raton beach seen through palm fronds" fill sizes="100vw" className="object-cover object-[center_60%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <Container className="pb-8 md:pb-12">
              <p className="font-display max-w-2xl text-balance text-[1.5rem] leading-tight text-white md:text-[2.2rem]">
                Not on the list? Ask. If the fish need help, Jason drives.
              </p>
            </Container>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

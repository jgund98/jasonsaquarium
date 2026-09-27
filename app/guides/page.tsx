import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { Container, Reveal } from "@/components/Section";
import CtaBand from "@/components/home/CtaBand";
import { guides } from "@/lib/guides";
import { Arrow } from "@/components/home/ServicesShowcase";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Aquarium Guides for Palm Beach County Tank Owners",
  description:
    "Plain-English guides from Jason: what aquarium maintenance costs in Palm Beach County, hurricane prep for tanks, what Boca tap water does to a reef, why fish die and what to do, and how to choose a service.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Guides", url: "/guides" }])} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Guides", url: "/guides" }]}
        eyebrow="Guides"
        title="Aquarium guides for Palm Beach County tank owners"
        lede="Local, specific and written to be useful whether or not you ever hire anyone. Palm Beach County water, Palm Beach County storms, Palm Beach County prices."
        compact
      />
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => (
              <Reveal key={g.slug} as="article" delay={(i % 3) * 70}>
                <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-[var(--line)] transition-transform duration-500 ease-[var(--ease-water)] hover:-translate-y-1">
                  <div className="relative aspect-[16/10]">
                    <Image src={g.image} alt={g.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-lagoon">{g.minutes} minute read</p>
                    <h2 className="font-display mt-2 text-balance text-[1.35rem] leading-tight text-abyss">{g.title}</h2>
                    <p className="mt-2 line-clamp-3 text-pretty text-[0.93rem] leading-relaxed text-ink-soft">{g.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.88rem] font-bold text-abyss">
                      Read <Arrow className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand title="Reading about it is the slow way" body="Text Jason a photo of the tank. He will tell you what it needs." />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Container, Reveal } from "@/components/Section";
import CtaBand from "@/components/home/CtaBand";
import { Arrow } from "@/components/home/ServicesShowcase";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Aquarium Tools: Water Test Decoder, Schedule Planner, Hurricane Checklist",
  description:
    "Three free tools from Jason's Aquarium Service for Palm Beach County tank owners: decode your water test results in plain English, plan the right service schedule for your tank, and get your aquarium ready for a hurricane.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }])} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }]}
        eyebrow="Free tools"
        title="Useful whether or not you ever call"
        lede="Jason built these for his own clients. Nothing is gated, nothing is emailed, and every one of them ends with a way to send him what you found."
        compact
      />
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tools.map((t, i) => (
              <Reveal key={t.slug} delay={i * 80}>
                <Link href={`/tools/${t.slug}`} className="group flex h-full flex-col rounded-[1.75rem] bg-abyss p-7 text-white transition-transform duration-500 ease-[var(--ease-water)] hover:-translate-y-1">
                  <span className="self-start rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-aqua">{t.tag}</span>
                  <h2 className="font-display mt-5 text-[1.5rem] leading-tight">{t.name}</h2>
                  <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-white/75">{t.short}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.9rem] font-bold text-aqua">
                    Open the tool <Arrow className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

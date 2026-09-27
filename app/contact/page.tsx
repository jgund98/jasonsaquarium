import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { Container, Reveal } from "@/components/Section";
import { site } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";
import { Stars } from "@/components/Footer";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Get a Free Aquarium Service Quote in Palm Beach County",
  description:
    "Tell Jason about your tank and get a straight answer, usually the same day. Aquarium cleaning, installation and assessments across Palm Beach County and north Broward. Call or text (516) 528-7824.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Get a Quote", url: "/contact" }])} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Get a Quote", url: "/contact" }]}
        eyebrow="Get a quote"
        title="Tell Jason about your tank"
        lede="Three quick questions and a phone number. Jason reads every one himself and usually texts back the same day."
        compact
      />

      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid items-stretch gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <Reveal>
              <QuoteForm />
            </Reveal>
            <div className="flex flex-col gap-5">
              <Reveal delay={80} className="rounded-[1.75rem] bg-abyss p-7 text-white">
                <p className="eyebrow text-aqua">Faster</p>
                <p className="font-display mt-3 text-[1.5rem] leading-tight">Text a photo of the tank</p>
                <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-white/75">
                  A picture of the whole tank and one of the equipment is worth more than any form. Jason replies from his own phone.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a href={site.smsHref} className="btn btn-foam w-full">Text {site.phone}</a>
                  <a href={site.phoneHref} className="btn btn-glass w-full"><PhoneIcon /> Call now</a>
                </div>
              </Reveal>
              <Reveal delay={140} className="rounded-[1.5rem] bg-shell p-6 ring-1 ring-[var(--line)]">
                <p className="flex items-center gap-2 text-sm font-bold text-abyss">
                  <Stars className="h-3.5" /> {site.rating.value} stars on Google
                </p>
                <dl className="mt-4 space-y-3 text-[0.92rem]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-soft">Hours</dt>
                    <dd className="text-right font-semibold text-ink">Open 24 hours, 7 days</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-soft">Based in</dt>
                    <dd className="text-right font-semibold text-ink">West Boca Raton, FL</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-soft">Serving</dt>
                    <dd className="text-right font-semibold text-ink">Palm Beach County and north Broward</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-soft">Emergencies</dt>
                    <dd className="text-right font-semibold text-ink">Call, do not wait</dd>
                  </div>
                </dl>
              </Reveal>
              <Reveal delay={200} className="rounded-[1.5rem] bg-mist p-6 text-[0.9rem] leading-relaxed text-ink">
                Tank cracked or leaking right now? Turn off the lights, keep the pumps running if the water level allows it, and call. Jason has moved livestock into a new tank the same day more than once.
              </Reveal>
              <div className="relative min-h-[14rem] flex-1 overflow-hidden rounded-[1.5rem] ring-1 ring-[var(--line)] hidden lg:block">
                <Image src="/images/work/lobby-reef-1200.jpg" alt="A wall-mounted reef aquarium Jason services in Palm Beach County" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-deep py-12 text-white">
        <Container className="flex flex-col items-center gap-4 text-center">
          <p className="font-display text-[1.4rem] md:text-[1.8rem]">Prefer to just call</p>
          <a href={site.phoneHref} className="btn btn-foam !py-4 text-base"><PhoneIcon /> {site.phone}</a>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { clip } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Container, Reveal, SectionHead } from "@/components/Section";
import CtaBand from "@/components/home/CtaBand";
import { site } from "@/lib/site";
import { reviews } from "@/lib/reviews";
import { Stars } from "@/components/Footer";
import { PhoneIcon } from "@/components/Header";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { Callout, FishBullet, Watermark } from "@/components/Brand";
import { Bubbles } from "@/components/Section";

export const metadata: Metadata = {
  title: "About Jason: Palm Beach County Aquarium Technician",
  description: clip("Meet Jason, the owner and only technician at Jason's Aquarium Service. Years of hands-on reef, freshwater and pond care for clients across Palm Beach County, and he answers his own phone."),
  alternates: { canonical: "/about" },
};

/*
 * First person, written from what Jason's clients have said publicly and what
 * the business actually is. Nothing here is invented. Jason should read it and
 * make it his own before launch.
 */
export default function AboutPage() {
  const mentor = reviews.find((r) => r.name === "Michael Zapin")!;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "About Jason", url: "/about" }])} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "About Jason", url: "/about" }]}
        eyebrow="About Jason"
        title="The aquarium technician behind every visit"
        lede="No crew, no dispatcher, no sales desk. When you call Jason's Aquarium Service, Jason answers, and Jason is who shows up."
        image="/images/stock/blue-tang-sand.jpg"
        imageAlt="A blue tang over white sand in a clean reef aquarium"
      />

      <section className="bg-sand py-20 md:py-28">
        <Container>
          <div className="grid items-stretch gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal className="space-y-6 text-pretty text-[1.08rem] leading-relaxed text-ink">
              <p className="font-display text-[1.6rem] leading-tight text-abyss md:text-[2rem]">
                Hi, I&rsquo;m Jason. I take care of aquariums for a living and I have for a long time.
              </p>
              <p>
                This started the way most of my client relationships start: I was the guy at the
                fish store who would not stop talking about water chemistry. People asked if I could
                come look at their tank. Then they asked if I could keep coming. That turned into
                Jason&rsquo;s Aquarium Service, and I have been servicing tanks across Palm Beach
                County ever since.
              </p>
              <p>
                I do all of it myself. Reef tanks and fish-only saltwater systems, freshwater
                community tanks, planted aquascapes, discus and cichlid tanks, koi ponds and water
                gardens. Cleaning and maintenance on a schedule, new installations and upgrades, and
                honest assessments when something has gone wrong and you want to know why.
              </p>
              <p>
                What I care about most is that the animals are healthy and that you understand your
                own tank. I would rather teach you what the water is telling you than keep you in the
                dark. Some of my longest clients started as people I helped set up a first aquarium,
                and a few of them now text me their test results just to compare notes.
              </p>
              <p>
                If your tank cracks at nine at night, call me. If a pump dies the week before your
                family flies in, call me. I have moved fish into a new tank the same day the old one
                failed more than once, and I will tell you honestly what I can do and how fast.
              </p>
              <Callout tone="coral">
                <span className="font-display text-[1.2rem] leading-snug">Text me a photo of your tank. I will tell you what it needs.</span>
              </Callout>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={site.smsHref} className="btn btn-abyss">
                  Text Jason
                </a>
                <a href={site.phoneHref} className="btn btn-foam ring-1 ring-[var(--line)]">
                  <PhoneIcon /> {site.phone}
                </a>
              </div>
            </Reveal>

            <div className="flex flex-col gap-5">
              <Reveal delay={80} className="relative min-h-[18rem] flex-1 overflow-hidden rounded-[1.75rem] ring-1 ring-[var(--line)]">
                <Image
                  src="/images/work/lobby-reef.jpg"
                  alt="A wall-mounted reef aquarium Jason services in a Palm Beach County lobby"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[30%_center]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-[0.85rem] font-semibold text-white/90">
                  One of the tanks Jason keeps. A lobby reef in Palm Beach County.
                </p>
              </Reveal>
              <Reveal delay={140} className="rounded-[1.5rem] bg-abyss p-7 text-white">
                <Stars className="h-3.5" />
                <p className="font-display mt-4 text-balance text-[1.25rem] leading-snug">
                  &ldquo;{mentor.highlight}&rdquo;
                </p>
                <p className="mt-3 text-pretty text-[0.92rem] leading-relaxed text-white/70">
                  &ldquo;It&rsquo;s much more of a lifestyle for Jason than it is a hobby. Yes, Jason
                  sells fish, and all the things that go along with it, but you don&rsquo;t think of
                  Jason as a salesman.&rdquo;
                </p>
                <p className="mt-4 text-sm text-white/60">{mentor.name} · Google review</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-abyss py-20 text-white md:py-24">
        <Bubbles count={10} />
        <Watermark />
        <Container className="relative">
          <SectionHead tone="dark" eyebrow="Plainly" title="What you get and what you do not" />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "The same person every visit",
                b: "Jason knows your tank's history because he is the only one who has ever serviced it. Nothing gets lost between technicians.",
              },
              {
                t: "Honest recommendations",
                b: "Clients call him a mentor for a reason. If a tank needs fewer visits, he says so. If it needs a new pump, he says that too, before it fails.",
              },
              {
                t: "A phone that gets answered",
                b: "Calls and texts go to Jason, seven days a week, including the emergency ones. That is the whole company and that is the point.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 80} className="border-l-2 border-aqua/50 pl-5">
                <h3 className="font-display flex items-start gap-2 text-[1.35rem] leading-tight">
                  <FishBullet className="mt-1.5" />
                  {c.t}
                </h3>
                <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-white/75">{c.b}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-10 text-[0.9rem] text-white/60">
            {site.legalName}, formed 2021, serving all of Palm Beach County and north Broward.{" "}
            <Link href="/service-areas" className="font-semibold text-aqua underline-offset-4 hover:underline">
              See every area
            </Link>
            . {site.disambiguation}
          </Reveal>
        </Container>
      </section>

      <CtaBand title="Ask Jason anything about your tank" body="A photo and the tank size is enough to start. He answers his own texts." />
    </>
  );
}

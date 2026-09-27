import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Container, Reveal, SectionHead } from "@/components/Section";
import CtaBand from "@/components/home/CtaBand";
import { reviews } from "@/lib/reviews";
import { Stars } from "@/components/Footer";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { FishBullet } from "@/components/Brand";

export const metadata: Metadata = {
  title: "Our Work: Real Aquariums Serviced in Palm Beach County",
  description:
    "A wall-mounted lobby reef, a same-day tank replacement, a 55 to 75 gallon upgrade. Real aquariums and real stories from Jason's clients in Boca Raton, Delray Beach and across Palm Beach County.",
  alternates: { canonical: "/our-work" },
};

// Every story below is drawn from a public Google review. Nothing invented.
const stories = [
  {
    title: "The reef that lost its glass",
    kicker: "Emergency replacement",
    body: "A long-time reef client's tank glass broke without warning. Jason sourced a replacement, got the new system set up and moved the livestock across quickly enough that the owner called it seamless.",
    quote: "When my tank glass unexpectedly broke, I needed a replacement immediately, and he was there to help every step of the way.",
    who: "Christina Ross",
  },
  {
    title: "Fifty-five gallons to seventy-five in a day",
    kicker: "Tank upgrade",
    body: "An old 55 gallon with outdated substrate came out and a like-new 75 gallon went in, plumbed, aquascaped and stocked, in a single long day. The client's word for Jason afterward was sensei.",
    quote: "He spent nearly all day removing an old 55 gallon tank with antiquated substrate, replacing it with a pre-owned (like new) 75 gallon tank, with all the trimmings.",
    who: "Michael Zapin",
  },
  {
    title: "A reef built to thrive",
    kicker: "Design and stocking",
    body: "Jason helped a client establish a reef from scratch, chose the fish and coral for that specific system, and has serviced it on a schedule ever since. Years later the animals he picked are still there.",
    quote: "The selection of fish and coral created a beautiful tank and the species he helped me select have thrived.",
    who: "Jacob Fults",
  },
  {
    title: "From first tank to hobbyist",
    kicker: "Teaching",
    body: "Met at a local fish store, taught how to keep a tank, then serviced on a schedule. The tank looks perfect and the owner now understands why.",
    quote: "He got me into the fish hobby and taught me how to take care of my tank.",
    who: "Zachary Berwin",
  },
];

export default function OurWorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Our Work", url: "/our-work" }])} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Our Work", url: "/our-work" }]}
        eyebrow="Our work"
        title="Real tanks and the stories behind them"
        lede="Jason does not stage photos. What is here is a tank he services and the jobs his clients have described in their own public reviews."
        compact
        wave={false}
      />

      <section className="relative bg-abyss text-white">
        <Reveal y={0}>
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9]">
            <Image
              src="/images/work/lobby-reef.jpg"
              alt="Wall-mounted saltwater reef aquarium with live coral and tangs in the wood-paneled lobby of a Palm Beach County building, serviced by Jason's Aquarium Service"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[35%_center]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/10 to-transparent" />
          </div>
        </Reveal>
        <Container className="-mt-28 pb-16 md:-mt-40 md:pb-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <p className="eyebrow text-aqua">Lobby reef</p>
              <h2 className="font-display mt-3 text-balance text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.04]">
                Built into the wall and kept this clear
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-pretty text-[1.05rem] leading-relaxed text-white/80">
                A saltwater reef set into custom wood paneling, with live coral, a school of tangs and
                a clownfish pair, in a lobby that sees people all day. Weekly water changes, glass and
                rock cleaning, testing and equipment checks keep it looking like this.
              </p>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
            <Reveal className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] ring-1 ring-white/10">
              <Image src="/images/work/lobby-reef-1200.jpg" alt="Closer view of the coral and fish in the lobby reef aquarium" fill sizes="(min-width: 640px) 55vw, 100vw" className="object-cover object-[20%_center]" />
            </Reveal>
            <Reveal delay={80} className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] ring-1 ring-white/10 sm:aspect-auto">
              <Image src="/images/work/reef-display-2.jpg" alt="A mixed reef aquarium with colorful coral, a blue tang and a yellow tang" fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="Client stories" title="Jobs described by the people who paid for them" lede="Each of these comes from a public Google review. Quotes are exact." />
          <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {stories.map((s, i) => (
              <Reveal key={s.title} as="article" delay={Math.min(i, 2) * 70} className="grid gap-5 py-10 md:grid-cols-[0.38fr_0.62fr] md:gap-12">
                <div>
                  <p className="eyebrow flex items-center gap-2 text-lagoon"><FishBullet className="mt-0" />{s.kicker}</p>
                  <h3 className="font-display mt-3 text-balance text-[1.6rem] leading-tight text-abyss md:text-[2rem]">{s.title}</h3>
                </div>
                <div className={`border-l-4 pl-6 md:pl-8 ${i % 2 ? "border-aqua" : "border-coral"}`}>
                  <p className="text-pretty text-[1.02rem] leading-relaxed text-ink-soft">{s.body}</p>
                  <blockquote className="mt-5">
                    <p className="font-display text-pretty text-[1.15rem] leading-snug text-abyss md:text-[1.3rem]">&ldquo;{s.quote}&rdquo;</p>
                    <footer className="mt-2 flex items-center gap-2 text-[0.85rem] font-semibold text-ink-soft">
                      <Stars className="h-3" /> {s.who} · Google review
                    </footer>
                  </blockquote>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href="/reviews" className="btn btn-abyss">
              Read the reviews in full
            </Link>
          </Reveal>
        </Container>
      </section>

      <CtaBand title="Want your tank on this page" body="Send Jason a photo of what you have and what you want it to become. He will tell you what it takes." />
    </>
  );
}

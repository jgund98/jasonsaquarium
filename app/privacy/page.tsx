import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Container, Reveal } from "@/components/Section";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles what you send through this website: what is collected, where it goes and what is never done with it.`,
  alternates: { canonical: "/privacy" },
};

const sections: { h: string; p: React.ReactNode[] }[] = [
  {
    h: "What this site collects",
    p: [
      "Only what you type into the quote form: your first name, phone number, email if you give one, your town, and what you tell us about your tank. Nothing is collected until you press send.",
      "The free tools save your entries, such as water test numbers or checklist progress, in your own browser so they are there when you come back. That information stays on your device and is never sent to us unless you choose to text it to Jason.",
    ],
  },
  {
    h: "Where it goes",
    p: [
      `Quote requests are emailed straight to ${site.ownerFirst} so he can reply. They are used to answer your question, give you a price and schedule service. That is all.`,
      "The site is hosted on Vercel, which keeps standard server logs, such as IP address and pages requested, for security and reliability. Email delivery runs through Brevo.",
    ],
  },
  {
    h: "What is never done with it",
    p: [
      "Your information is not sold, rented or shared for marketing. There are no advertising trackers or analytics cookies on this site.",
    ],
  },
  {
    h: "Texts and calls",
    p: [
      `Tapping a call or text button opens your own phone app with ${site.phone}. Those messages go directly between you and ${site.ownerFirst}.`,
    ],
  },
  {
    h: "Questions or removal",
    p: [
      <>
        To ask what we have from you or to have it deleted, call or text {site.ownerFirst} at{" "}
        <a href={site.phoneHref} className="font-semibold text-abyss underline underline-offset-4">
          {site.phone}
        </a>{" "}
        or send a note through the{" "}
        <Link href="/contact#quote" className="font-semibold text-abyss underline underline-offset-4">
          quote form
        </Link>
        .
      </>,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Privacy", url: "/privacy" }])} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Privacy", url: "/privacy" }]}
        eyebrow="Privacy"
        title="Your information stays with Jason"
        lede={`Plain answers about what ${site.legalName} does with what you send through this site. Updated October 1, 2026.`}
        compact
        noCta
      />
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            {sections.map((s, i) => (
              <Reveal key={s.h} delay={Math.min(i, 2) * 50} className="mb-10">
                <h2 className="font-display text-[1.5rem] leading-tight text-abyss md:text-[1.8rem]">{s.h}</h2>
                {s.p.map((p, j) => (
                  <p key={j} className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

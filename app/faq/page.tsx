import type { Metadata } from "next";
import { clip } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { Container, Reveal } from "@/components/Section";
import FaqList from "@/components/Faq";
import CtaBand from "@/components/home/CtaBand";
import { faqGroups, allFaqs } from "@/lib/faqs";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";
import { FishBullet } from "@/components/Brand";
import Link from "next/link";
import { Arrow } from "@/components/home/ServicesShowcase";

export const metadata: Metadata = {
  title: "Aquarium Service FAQ: Cost, Frequency, Emergencies",
  description: clip("How much aquarium maintenance costs in Palm Beach County, how often a reef tank should be serviced, what a visit includes, what to do when a tank leaks or fish are dying, hurricane prep and more. Straight answers from Jason."),
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Questions", url: "/faq" }]), faqJsonLd(allFaqs)]} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Questions", url: "/faq" }]}
        eyebrow="Questions and answers"
        title="Aquarium service questions answered"
        lede="Cost, frequency, saltwater versus freshwater, emergencies, hurricanes, ponds, offices. If yours is missing, text Jason and it will probably end up here."
        compact
      />
      {faqGroups.map((g, i) => (
        <section key={g.title} className={i % 2 ? "bg-shell py-14 md:py-20" : "bg-white py-14 md:py-20"}>
          <Container>
            <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <h2 className="font-display flex items-start gap-3 text-[1.6rem] leading-tight text-abyss md:text-[2rem]">
                  <FishBullet className="mt-2 h-5 w-6" />
                  {g.title}
                </h2>
                <p className="mt-3 max-w-sm text-pretty text-[0.98rem] leading-relaxed text-ink-soft">{g.note}</p>
                <Link href={g.link.href} className="mt-4 inline-flex items-center gap-2 rounded-full bg-abyss px-4 py-2.5 text-[0.88rem] font-bold text-white hover:bg-deep">
                  {g.link.label} <Arrow />
                </Link>
              </div>
              <FaqList faqs={g.faqs} defaultOpen={i === 0 ? 0 : null} />
            </Reveal>
          </Container>
        </section>
      ))}
      <CtaBand title="Still have a question" body="Text it to Jason with a photo of the tank. He answers his own phone and does not mind the small ones." />
    </>
  );
}

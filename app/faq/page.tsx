import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Container, Reveal } from "@/components/Section";
import FaqList from "@/components/Faq";
import CtaBand from "@/components/home/CtaBand";
import { faqGroups, allFaqs } from "@/lib/faqs";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Aquarium Service Questions Answered: Cost, Frequency, Emergencies",
  description:
    "How much aquarium maintenance costs in Palm Beach County, how often a reef tank should be serviced, what a visit includes, what to do when a tank leaks or fish are dying, hurricane prep and more. Straight answers from Jason.",
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
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-4xl space-y-14">
            {faqGroups.map((g, i) => (
              <Reveal key={g.title} delay={Math.min(i, 2) * 60}>
                <h2 className="font-display text-[1.6rem] leading-tight text-abyss md:text-[2rem]">{g.title}</h2>
                <div className="mt-4">
                  <FaqList faqs={g.faqs} defaultOpen={i === 0 ? 0 : null} />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand title="Still have a question" body="Text it to Jason with a photo of the tank. He answers his own phone and does not mind the small ones." />
    </>
  );
}

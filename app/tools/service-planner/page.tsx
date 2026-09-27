import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SchedulePlanner from "@/components/tools/SchedulePlanner";
import { Container, Reveal } from "@/components/Section";
import FaqList from "@/components/Faq";
import CtaBand from "@/components/home/CtaBand";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

const faqs = [
  { q: "How often should a reef tank be professionally serviced?", a: "Weekly for most reefs with coral, bi-weekly for lightly stocked or very stable systems. Alkalinity and nutrient swings show up in days, so the gap between visits is what protects the coral." },
  { q: "How often should a freshwater aquarium be cleaned by a service?", a: "Every two to four weeks for most community tanks, closer to two for heavily stocked or planted tanks. Lightly stocked tanks with an owner who does small water changes can stretch to monthly." },
  { q: "How often does a koi pond need service in South Florida?", a: "Every two to three weeks from May through October when heat, sun and rain push the water around, and monthly in the cooler months. Filters and UV clarifiers need their own rotation." },
  { q: "Do I have to sign a contract for aquarium maintenance?", a: "No. Jason quotes a per-visit or monthly rhythm based on the tank and you can change it as the tank changes. Nobody is sold more visits than the tank needs." },
];

export const metadata: Metadata = {
  title: "Aquarium Service Schedule Planner: How Often Your Tank Needs a Visit",
  description:
    "Answer five questions about your saltwater, freshwater, planted or pond system and get the service rhythm Jason recommends, plus what each visit includes. Free planner from Jason's Aquarium Service, Palm Beach County.",
  alternates: { canonical: "/tools/service-planner" },
};

export default function PlannerPage() {
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Aquarium Service Schedule Planner",
    url: `${site.url}/tools/service-planner`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@id": `${site.url}/#business` },
  };
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Service Schedule Planner", url: "/tools/service-planner" }]), app, faqJsonLd(faqs)]} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Schedule Planner", url: "/tools/service-planner" }]}
        eyebrow="Free tool"
        title="How often does your tank actually need a visit"
        lede="Five taps. You get the rhythm Jason would put your tank on and what each visit should include. Text it to him for a price or keep it for yourself."
        compact
      />
      <section className="bg-shell py-14 md:py-20">
        <Container>
          <Reveal>
            <SchedulePlanner />
          </Reveal>
        </Container>
      </section>
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-lagoon">Frequency questions</p>
              <h2 className="font-display mt-3 text-balance text-[1.8rem] leading-tight text-abyss md:text-[2.3rem]">The honest answer is usually less than you fear</h2>
            </div>
            <Reveal delay={80}>
              <FaqList faqs={faqs} />
            </Reveal>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

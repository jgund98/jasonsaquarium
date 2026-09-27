import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TankCalculator from "@/components/tools/TankCalculator";
import { Container, Reveal } from "@/components/Section";
import FaqList from "@/components/Faq";
import CtaBand from "@/components/home/CtaBand";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

const faqs = [
  { q: "How do I calculate how many gallons my aquarium holds?", a: "Multiply the inside length, width and height in inches, then divide by 231. That is the empty volume. Real water volume is lower once you subtract the space above the waterline and the rock and sand, which is why the calculator asks for both." },
  { q: "How much water should I change and how often?", a: "Ten to twenty five percent is typical. Reef tanks usually get a smaller change more often; freshwater tanks a larger change less often. What matters most is doing it on a schedule with matched water." },
  { q: "How much salt do I need for a water change?", a: "To reach reef salinity of 1.026, plan on roughly 0.34 pounds of dry mix per US gallon, about 40 grams per liter or a generous half cup. The half-cup-per-gallon rule printed on most labels only mixes to about 1.022. Mix, heat and circulate before it goes in, and confirm with a refractometer." },
  { q: "Does tank size change what service costs?", a: "Yes. Larger tanks use more water per change and take longer, and reef tanks more than freshwater. Text Jason your gallons and a photo for an exact number." },
];

export const metadata: Metadata = {
  title: "Aquarium Volume and Water Change Calculator",
  description:
    "Enter your tank's inside dimensions to get real water volume in gallons and liters, how much water a 10 to 25 percent change is, and how much salt mix to weigh out at reef salinity. Free from Jason's Aquarium Service.",
  alternates: { canonical: "/tools/tank-volume" },
};

export default function TankVolumePage() {
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Aquarium Volume and Water Change Calculator",
    url: `${site.url}/tools/tank-volume`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@id": `${site.url}/#business` },
  };
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Tank Volume Calculator", url: "/tools/tank-volume" }]), app, faqJsonLd(faqs)]} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Tank Volume Calculator", url: "/tools/tank-volume" }]}
        eyebrow="Free tool"
        title="How many gallons is your tank really"
        lede="The number on the box is the empty box. This gives you the water that is actually in there, what a change is in gallons and liters, and how much salt to weigh out."
        compact
      />
      <section className="bg-shell py-14 md:py-20">
        <Container>
          <Reveal>
            <TankCalculator />
          </Reveal>
        </Container>
      </section>
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-lagoon">Volume questions</p>
              <h2 className="font-display mt-3 text-balance text-[1.8rem] leading-tight text-abyss md:text-[2.3rem]">The math behind the number</h2>
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

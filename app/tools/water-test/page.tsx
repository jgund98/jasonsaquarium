import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import WaterTestDecoder from "@/components/tools/WaterTestDecoder";
import { Container, Reveal } from "@/components/Section";
import FaqList from "@/components/Faq";
import CtaBand from "@/components/home/CtaBand";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

const faqs = [
  { q: "What should my reef tank parameters be?", a: "Salinity 1.024 to 1.026, temperature 76 to 80, pH 8.1 to 8.3, ammonia and nitrite zero, nitrate 2 to 10 ppm, phosphate 0.02 to 0.1 ppm, alkalinity 8 to 9.5 dKH, calcium 400 to 450 ppm, magnesium 1250 to 1400 ppm. Stability matters more than hitting an exact number." },
  { q: "What should freshwater aquarium parameters be?", a: "Temperature 74 to 80 for most tropical fish, pH 6.5 to 7.8 depending on species, ammonia and nitrite zero, nitrate under 20 ppm, GH 4 to 12 and KH 3 to 8 for most community tanks. Palm Beach County tap water is harder than that, which matters for soft-water fish." },
  { q: "My ammonia is above zero. What do I do?", a: "Stop feeding, do a water change with conditioned or prepared water today, and look for the cause: a dead fish, an overfed tank, a filter that stopped or was cleaned too aggressively. If it is above 0.5 ppm, call Jason before adding anything." },
  { q: "Why does my pH read low in a reef tank?", a: "Usually low alkalinity, or carbon dioxide building up in a closed air-conditioned house. Fix alkalinity first. Opening a window or running an airline outside often lifts pH on its own." },
  { q: "Can I text my test results to someone for help in Palm Beach County?", a: "Yes. The decoder above builds a text message with your numbers and sends it to Jason at Jason's Aquarium Service. He reads it himself and replies, usually the same day." },
];

export const metadata: Metadata = {
  title: "Aquarium Water Test Decoder: What Your Numbers Mean",
  description:
    "Enter your aquarium test results and get a plain-English read on salinity, pH, ammonia, nitrite, nitrate, phosphate, alkalinity, calcium and magnesium, with what to do next. Free from Jason's Aquarium Service in Palm Beach County.",
  alternates: { canonical: "/tools/water-test" },
};

export default function WaterTestPage() {
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Aquarium Water Test Decoder",
    url: `${site.url}/tools/water-test`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@id": `${site.url}/#business` },
    description: "Interprets saltwater and freshwater aquarium test results and suggests next steps.",
  };
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Water Test Decoder", url: "/tools/water-test" }]), app, faqJsonLd(faqs)]} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Water Test Decoder", url: "/tools/water-test" }]}
        eyebrow="Free tool"
        title="Decode your water test in plain English"
        lede="Type in what the kit says. Every number gets a read, the tank gets a verdict, and one tap sends it all to Jason if you want a second opinion."
        compact
      />
      <section className="bg-shell py-14 md:py-20">
        <Container>
          <Reveal>
            <WaterTestDecoder />
          </Reveal>
        </Container>
      </section>
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-lagoon">About the ranges</p>
              <h2 className="font-display mt-3 text-balance text-[1.8rem] leading-tight text-abyss md:text-[2.3rem]">Where these numbers come from</h2>
              <p className="mt-4 text-pretty text-[1rem] leading-relaxed text-ink-soft">
                The ranges are the ones Jason holds client tanks to across Palm Beach County. Test kits vary, and a single reading matters less than the trend, which is why scheduled testing beats a panic test. See the{" "}
                <Link href="/tools/service-planner" className="font-bold text-abyss underline-offset-4 hover:underline">schedule planner</Link> for how often your tank should be tested.
              </p>
            </div>
            <Reveal delay={80}>
              <FaqList faqs={faqs} />
            </Reveal>
          </div>
        </Container>
      </section>
      <CtaBand title="Numbers you do not like" body="Text them to Jason with a photo of the tank. He will tell you what is going on and what to do first." />
    </>
  );
}

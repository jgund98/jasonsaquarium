import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import HurricaneChecklist from "@/components/tools/HurricaneChecklist";
import { Container, Reveal } from "@/components/Section";
import CtaBand from "@/components/home/CtaBand";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Hurricane Checklist for Aquariums in Palm Beach County",
  description:
    "An interactive storm checklist for fish tank and reef owners in Palm Beach County: what to do the week before, 48 hours out, during a power outage and after. Saves progress on your phone. From Jason's Aquarium Service.",
  alternates: { canonical: "/tools/hurricane-checklist" },
};

export default function HurricanePage() {
  const howto = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to prepare an aquarium for a hurricane in South Florida",
    description: "Steps to keep fish and coral alive through a Palm Beach County storm and power outage.",
    supply: [{ "@type": "HowToSupply", name: "Battery-powered air pump" }, { "@type": "HowToSupply", name: "Prepared saltwater or conditioned freshwater" }],
    step: [
      { "@type": "HowToStep", name: "The week before", text: "Large water change, test battery air pumps, store prepared water, photograph equipment settings, label generator outlets, top off." },
      { "@type": "HowToStep", name: "48 hours out", text: "Stop or lighten feeding, clean mechanical media, lower the water level in rimless tanks, stage the air pump." },
      { "@type": "HowToStep", name: "During the outage", text: "Run the battery air pump, keep the room closed and the tank covered, do not feed, watch for gasping." },
      { "@type": "HowToStep", name: "After power returns", text: "Confirm pumps restarted, let temperature recover slowly, test ammonia and nitrite daily for three days, water change the next day." },
    ],
    totalTime: "P7D",
  };
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Hurricane Checklist", url: "/tools/hurricane-checklist" }]), howto]} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Hurricane Checklist", url: "/tools/hurricane-checklist" }]}
        eyebrow="Free tool · June through November"
        title="Get the tank ready before the cone shows up"
        lede="The same list Jason walks clients through every season. Check things off as you go, it saves on your phone, and you can text him from the bottom if you want help doing it."
        compact
      />
      <section className="bg-shell py-14 md:py-20">
        <Container>
          <Reveal>
            <HurricaneChecklist />
          </Reveal>
          <p className="mt-8 text-[0.9rem] text-ink-soft">
            Want the reasoning behind each step? Read the{" "}
            <Link href="/guides/hurricane-prep-for-aquariums-south-florida" className="font-bold text-abyss underline-offset-4 hover:underline">hurricane prep guide</Link>. For anything urgent, call {site.phone}.
          </p>
        </Container>
      </section>
      <CtaBand title="No generator and a reef you love" body="That is the conversation to have in May, not the night before landfall. Text Jason and he will tell you what your tank needs to ride it out." />
    </>
  );
}

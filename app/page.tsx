import Hero from "@/components/Hero";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import WhyHire from "@/components/home/WhyHire";
import Specialties from "@/components/home/Specialties";
import RealWork from "@/components/home/RealWork";
import VisitStory from "@/components/home/VisitStory";
import Reviews from "@/components/home/Reviews";
import FaqTeaser from "@/components/home/FaqTeaser";
import CtaBand from "@/components/home/CtaBand";
import { JsonLd, faqJsonLd } from "@/lib/schema";
import { homeFaqs } from "@/lib/faqs";
import { site } from "@/lib/site";

export const metadata = {
  title: { absolute: "Aquarium Service in Palm Beach County, FL | Jason's Aquarium" },
  alternates: { canonical: `${site.url}/` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <Hero />
      <ServicesShowcase />
      <WhyHire />
      <RealWork />
      <Specialties />
      <VisitStory />
      <Reviews />
      <FaqTeaser />
      <CtaBand />
    </>
  );
}

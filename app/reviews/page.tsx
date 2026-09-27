import type { Metadata } from "next";
import { clip } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import { Container, Reveal } from "@/components/Section";
import CtaBand from "@/components/home/CtaBand";
import { reviews } from "@/lib/reviews";
import { site } from "@/lib/site";
import { Stars } from "@/components/Footer";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { FishMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Aquarium Service Reviews in Palm Beach County",
  description: clip("Every public Google review of Jason's Aquarium Service, quoted in full. Reef tank rescues, tank upgrades, water chemistry help and years of scheduled maintenance in Boca Raton, Delray Beach and Palm Beach County."),
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Reviews", url: "/reviews" }])} />
      <PageHero
        crumbs={[{ name: "Home", url: "/" }, { name: "Reviews", url: "/reviews" }]}
        eyebrow="Reviews"
        title="Aquarium service reviews from Palm Beach County clients"
        lede={`${site.rating.value} stars on Google. The written reviews are below in full, exactly as posted. Nothing edited, nothing invented.`}
        compact
      />

      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {reviews.map((r, i) => (
              <Reveal key={r.name} as="article" delay={Math.min(i, 3) * 60} className="rounded-[1.75rem] bg-shell p-7 ring-1 ring-[var(--line)] md:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-abyss"><FishMark className="h-6 w-7" id={`rv-${i}`} /></span>
                    <div>
                      <p className="font-bold text-abyss">{r.name}</p>
                      <p className="text-[0.8rem] text-ink-soft">Google review · {r.when}</p>
                    </div>
                  </div>
                  <Stars className="h-4" />
                </div>
                <div className="mt-5 space-y-4 text-pretty text-[1.02rem] leading-relaxed text-ink">
                  {r.text.split("\n\n").map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {r.reply && (
                  <div className="mt-5 rounded-2xl bg-white p-5 ring-1 ring-[var(--line)]">
                    <p className="eyebrow text-lagoon">Jason replied</p>
                    <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-ink-soft">{r.reply}</p>
                  </div>
                )}
                <div className="mt-5 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-sea ring-1 ring-[var(--line)]">{t}</span>
                  ))}
                </div>
              </Reveal>
            ))}
            <Reveal className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a href={site.googleMapsUrl} target="_blank" rel="noopener" className="btn btn-abyss">See them on Google</a>
              <a href={site.googleReviewUrl} target="_blank" rel="noopener" className="btn btn-foam ring-1 ring-[var(--line)]">Write a review</a>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand title="Want the same thing said about your tank" body="Text Jason a photo and the tank size. That is how every one of these started." />
    </>
  );
}

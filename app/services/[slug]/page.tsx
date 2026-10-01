import type { Metadata } from "next";
import { clip } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { services, specialties, getService } from "@/lib/services";
import { site, areaNames } from "@/lib/site";
import { Container, Reveal, SectionHead } from "@/components/Section";
import FaqList from "@/components/Faq";
import CtaBand from "@/components/home/CtaBand";
import { Arrow } from "@/components/home/ServicesShowcase";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/schema";
import { featuredReviews } from "@/lib/reviews";
import { Stars } from "@/components/Footer";
import AlgaeWipe from "@/components/AlgaeWipe";
import RelatedGuides from "@/components/RelatedGuides";
import { BrandBand, Callout, FishBullet } from "@/components/Brand";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.name} in Palm Beach County, FL`,
    description: clip(`${s.short} ${s.name} for saltwater, reef, freshwater and pond systems in Boca Raton, Delray Beach, Boynton Beach and across Palm Beach County. Owner-operated by Jason.`),
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);
  const review = featuredReviews.find((r) => r.tags.some((t) => s.slug.includes("maintenance") ? t === "Maintenance" : s.slug.includes("design") ? t.includes("upgrade") || t.includes("Emergency") : t.includes("Troubleshooting"))) ?? featuredReviews[0];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: s.name, url: `/services/${s.slug}` },
          ]),
          serviceJsonLd({ name: s.name, description: s.intro, url: `${site.url}/services/${s.slug}`, serviceType: s.name }),
          faqJsonLd(s.faqs),
        ]}
      />
      <PageHero
        waveTo="var(--shell)"
        crumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: s.name, url: `/services/${s.slug}` },
        ]}
        eyebrow={s.eyebrow}
        title={s.headline}
        lede={s.intro}
        image={s.image}
        imageAlt={s.imageAlt}
      />

      {s.slug === "aquarium-cleaning-maintenance" && (
        <section className="bg-shell py-16 md:py-24">
          <Container>
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow text-lagoon">Try it</p>
                <h2 className="font-display mt-3 text-balance text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] text-abyss">Clean the glass yourself</h2>
                <p className="mt-3 text-pretty text-[1.02rem] leading-relaxed text-ink-soft">A real tank with three months of algae on the front panel. Wipe it and see what is underneath. Then imagine never having to.</p>
              </div>
            </div>
            <Reveal>
              <AlgaeWipe />
            </Reveal>
          </Container>
        </section>
      )}

      <section className="bg-sand py-20 md:py-28">
        <Container>
          <div className="grid items-stretch gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="font-display text-[1.8rem] leading-tight text-abyss md:text-[2.3rem]">What is included</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-[var(--line)]">
                      <FishBullet />
                      <span className="text-[0.95rem] leading-snug text-ink">{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={100} className="mt-10 space-y-6">
                <p className="font-display text-pretty text-[1.25rem] leading-snug text-abyss md:text-[1.45rem]">{s.body[0]}</p>
                {s.body[1] && <Callout eyebrow="Where the difference shows">{s.body[1]}</Callout>}
                {s.body.slice(2).map((p) => (
                  <p key={p.slice(0, 24)} className="text-pretty text-[1.05rem] leading-relaxed text-ink-soft">{p}</p>
                ))}
              </Reveal>
              <Reveal delay={140} className="mt-10 rounded-[1.5rem] bg-abyss p-7 text-white">
                <Stars className="h-3.5" />
                <p className="font-display mt-4 text-balance text-[1.25rem] leading-snug md:text-[1.45rem]">&ldquo;{review.highlight}&rdquo;</p>
                <p className="mt-4 text-sm text-white/60">
                  {review.name} · Google review · <Link href="/reviews" className="text-aqua hover:text-glow">read all</Link>
                </p>
              </Reveal>
            </div>

            <aside className="flex flex-col gap-6">
              <Reveal delay={80} className="rounded-[1.5rem] bg-white p-6 ring-1 ring-[var(--line)]">
                <p className="eyebrow text-lagoon">Get a straight answer</p>
                <p className="font-display mt-3 text-[1.35rem] leading-tight text-abyss">Text Jason the tank size and a photo</p>
                <p className="mt-2 text-[0.95rem] text-ink-soft">He usually replies the same day with what it needs and what it costs.</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a href={site.smsHref} className="btn btn-abyss w-full">Text {site.phone}</a>
                  <Link href="/contact#quote" className="btn btn-coral w-full">Request a Quote</Link>
                </div>
              </Reveal>
              <Reveal delay={120} className="rounded-[1.5rem] bg-mist p-6">
                <p className="eyebrow text-sea">Serving</p>
                <p className="mt-3 text-pretty text-[0.92rem] leading-relaxed text-ink">
                  {areaNames(12).join(", ")} and the rest of Palm Beach County and north Broward.{" "}
                  <Link href="/service-areas" className="font-bold text-abyss underline-offset-4 hover:underline">All areas</Link>
                </p>
              </Reveal>
              <Reveal delay={160} className="rounded-[1.5rem] bg-white p-6 ring-1 ring-[var(--line)]">
                <p className="eyebrow text-lagoon">Also from Jason</p>
                <ul className="mt-4 space-y-3">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/services/${o.slug}`} className="group flex items-center justify-between gap-3 font-semibold text-abyss">
                        {o.name}
                        <Arrow className="shrink-0 text-lagoon transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                  {specialties.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/aquariums/${o.slug}`} className="group flex items-center justify-between gap-3 font-semibold text-abyss">
                        {o.name}
                        <Arrow className="shrink-0 text-lagoon transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <div className="relative min-h-[14rem] flex-1 overflow-hidden rounded-[1.5rem] ring-1 ring-[var(--line)] hidden lg:block">
                <Image src="/images/stock/coral-macro.jpg" alt="Pink and teal hammer coral heads under reef lighting" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <BrandBand />

      <section className="bg-shell py-20 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHead eyebrow="Questions" title={`Common questions about ${s.name.toLowerCase()}`} />
              <RelatedGuides slug={s.slug} />
            </div>
            <Reveal delay={80}>
              <FaqList faqs={s.faqs} />
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { cities, getCity } from "@/lib/cities";
import { services, specialties } from "@/lib/services";
import { site } from "@/lib/site";
import { Container, Reveal, SectionHead } from "@/components/Section";
import FaqList from "@/components/Faq";
import CtaBand from "@/components/home/CtaBand";
import QuoteForm from "@/components/QuoteForm";
import { Arrow } from "@/components/home/ServicesShowcase";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";
import { featuredReviews } from "@/lib/reviews";
import { Stars } from "@/components/Footer";
import { BrandBand, Callout } from "@/components/Brand";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/aquarium-service/[city]">): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  return {
    title: `Aquarium Service in ${c.name}, FL`,
    description: cityMeta(c),
    alternates: { canonical: `/aquarium-service/${c.slug}` },
  };
}

// Tank photos matched to what dominates in each town. Never a stock house or
// skyline pretending to be the city.
function cityMeta(c: { name: string; angle: string }) {
  const angle = c.angle.charAt(0).toUpperCase() + c.angle.slice(1);
  return `Aquarium service in ${c.name}, FL: cleaning, maintenance, installation and assessments for reef, freshwater and pond systems. ${angle}. Call or text Jason at ${site.phone}.`;
}

function cityImage(angle: string): { src: string; alt: string } {
  const a = angle.toLowerCase();
  if (a.includes("pond")) return { src: "/images/stock/koi-garden.jpg", alt: "Koi in a garden pond framed by tropical foliage" };
  if (a.includes("office") || a.includes("lobby")) return { src: "/images/stock/office-tank.jpg", alt: "A planted aquarium on a cabinet in a clean office" };
  if (a.includes("family") || a.includes("first tank") || a.includes("beginner")) return { src: "/images/stock/planted-angelfish.jpg", alt: "Angelfish in a heavily planted freshwater aquarium" };
  if (a.includes("estate") || a.includes("designed") || a.includes("architect")) return { src: "/images/work/lobby-reef-1200.jpg", alt: "A wall-mounted reef aquarium Jason services in Palm Beach County" };
  return { src: "/images/stock/reef-tangs.jpg", alt: "Two yellow tangs over coral in a reef aquarium" };
}

export default async function CityPage({ params }: PageProps<"/aquarium-service/[city]">) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  const idx = cities.findIndex((x) => x.slug === c.slug);
  const image = cityImage(c.angle);
  const review = featuredReviews[idx % featuredReviews.length];
  const nearby = c.nearby.map(getCity).filter(Boolean);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/aquarium-service/${c.slug}#service`,
    name: `Aquarium service in ${c.name}, FL`,
    serviceType: "Aquarium cleaning, maintenance, installation and assessment",
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "City", name: `${c.name}, FL` },
    url: `${site.url}/aquarium-service/${c.slug}`,
    description: c.lead,
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Service Areas", url: "/service-areas" },
            { name: c.name, url: `/aquarium-service/${c.slug}` },
          ]),
          serviceSchema,
          faqJsonLd(c.faqs),
        ]}
      />
      <PageHero
        crumbs={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
          { name: c.name, url: `/aquarium-service/${c.slug}` },
        ]}
        eyebrow={`${c.county} County${c.drive === "home base" ? " · Home base" : ""}`}
        title={`Aquarium service in ${c.name}`}
        lede={c.lead}
        image={image.src}
        imageAlt={image.alt}
      />

      <section className="bg-white py-20 md:py-28">
        <Container>
          <div className="grid items-stretch gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <Reveal className="space-y-5 text-pretty text-[1.05rem] leading-relaxed text-ink">
                <h2 className="font-display text-[1.8rem] leading-tight text-abyss md:text-[2.3rem]">
                  What tanks look like in {c.name}
                </h2>
                {c.local.slice(0, -1).map((p) => (
                  <p key={p.slice(0, 30)} className="text-ink-soft">{p}</p>
                ))}
                <Callout eyebrow={`Good to know in ${c.name}`}>{c.local[c.local.length - 1]}</Callout>
              </Reveal>

              <Reveal delay={80} className="mt-10">
                <h3 className="eyebrow text-lagoon">Neighborhoods Jason services in {c.name}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.neighborhoods.map((n) => (
                    <li key={n} className="rounded-full bg-shell px-3.5 py-1.5 text-[0.88rem] font-semibold text-ink ring-1 ring-[var(--line)]">{n}</li>
                  ))}
                </ul>
                {c.landmarks && (
                  <p className="mt-4 text-[0.9rem] text-ink-soft">
                    Near {c.landmarks.join(", ")}. ZIP codes {c.zips.join(", ")}.
                  </p>
                )}
              </Reveal>

              <Reveal delay={120} className="mt-10">
                <h3 className="font-display text-[1.5rem] leading-tight text-abyss md:text-[1.8rem]">Services available in {c.name}</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[...services, ...specialties, { slug: "tools", name: "Free tools for your tank" }].map((s) => (
                    <Link
                      key={s.slug}
                      href={s.slug === "tools" ? "/tools" : "bullets" in s ? `/services/${s.slug}` : `/aquariums/${s.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-2xl bg-shell p-4 font-semibold text-abyss ring-1 ring-[var(--line)] hover:bg-mist"
                    >
                      {s.name}
                      <Arrow className="shrink-0 text-lagoon transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={160} className="mt-10 rounded-[1.5rem] bg-abyss p-7 text-white">
                <Stars className="h-3.5" />
                <p className="font-display mt-4 text-balance text-[1.25rem] leading-snug md:text-[1.45rem]">&ldquo;{review.highlight}&rdquo;</p>
                <p className="mt-4 text-sm text-white/60">{review.name} · Google review</p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-6">
              <Reveal delay={100}>
                <QuoteForm city={c.name} />
              </Reveal>
              <div className="relative min-h-[14rem] flex-1 overflow-hidden rounded-[1.5rem] ring-1 ring-[var(--line)] hidden lg:block">
                <Image src="/images/work/lobby-reef-1200.jpg" alt="A wall-mounted reef aquarium Jason services in Palm Beach County" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <BrandBand />

      <section className="bg-shell py-20 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHead eyebrow="Local questions" title={`Aquarium service questions from ${c.name}`} />
              {nearby.length > 0 && (
                <Reveal delay={100} className="mt-8">
                  <p className="eyebrow text-lagoon">Nearby</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {nearby.map((n) => (
                      <li key={n!.slug}>
                        <Link href={`/aquarium-service/${n!.slug}`} className="rounded-full bg-white px-3.5 py-1.5 text-[0.88rem] font-semibold text-abyss ring-1 ring-[var(--line)] hover:bg-mist">
                          {n!.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
            <Reveal delay={80}>
              <FaqList faqs={c.faqs} />
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand title={`Book aquarium service in ${c.name}`} body="Tank size and a photo is all Jason needs. He will tell you what it needs and when he can be there." />
    </>
  );
}

import type { Metadata } from "next";
import { clip } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { guides, getGuide } from "@/lib/guides";
import { site } from "@/lib/site";
import { Container, Reveal } from "@/components/Section";
import CtaBand from "@/components/home/CtaBand";
import { PhoneIcon } from "@/components/Header";
import { Arrow } from "@/components/home/ServicesShowcase";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { Callout } from "@/components/Brand";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: clip(g.description),
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: "article", publishedTime: g.date, images: [{ url: g.image }] },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const others = guides.filter((o) => o.slug !== g.slug).slice(0, 3);
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    datePublished: g.date,
    dateModified: g.date,
    image: `${site.url}${g.image}`,
    author: { "@type": "Person", name: "Jason", worksFor: { "@id": `${site.url}/#business` } },
    publisher: { "@id": `${site.url}/#business` },
    mainEntityOfPage: `${site.url}/guides/${g.slug}`,
    keywords: g.keywords.join(", "),
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Guides", url: "/guides" }, { name: g.title, url: `/guides/${g.slug}` }]), article]} />
      <article>
        <header className="relative isolate overflow-hidden bg-abyss text-white" style={{ background: "linear-gradient(180deg, #06304f 0%, #04213a 60%, #041a2e 100%)" }}>
          <div aria-hidden="true" className="caustics pointer-events-none absolute inset-0 opacity-70" />
          <Container className="relative pt-[calc(72px+2.5rem)] pb-12 md:pt-[calc(84px+3rem)] md:pb-16">
            <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[0.8rem] font-semibold text-white/60">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <Link href="/guides" className="hover:text-white">Guides</Link>
            </nav>
            <p className="eyebrow text-aqua">{g.minutes} minute read · {new Date(g.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            <h1 className="font-display mt-4 max-w-4xl text-balance text-[clamp(2rem,4.8vw,4rem)] leading-[1.04]">{g.title}</h1>
            <p className="mt-5 max-w-2xl text-pretty text-[1.05rem] leading-relaxed text-white/80 md:text-[1.15rem]">{g.description}</p>
          </Container>
        </header>

        <div className="bg-white">
          <Container className="relative -mt-0 pt-10 md:pt-14">
            <Reveal className="relative aspect-[16/8] overflow-hidden rounded-[1.75rem] ring-1 ring-[var(--line)]">
              <Image src={g.image} alt={g.imageAlt} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </Reveal>
          </Container>
          <Container className="grid items-stretch gap-12 py-14 lg:grid-cols-[1fr_20rem] lg:gap-16 md:py-20">
            <div className="max-w-3xl">
              {g.sections.map((s, i) => (
                <Reveal key={s.h} delay={Math.min(i, 2) * 50} className="mb-10">
                  {i === 2 && (
                    <Callout eyebrow="Try it on your tank" className="mb-10">
                      The free tools on this site do the math for you: decode a water test, size a water change, or plan a service schedule.{" "}
                      <Link href="/tools" className="font-bold text-abyss underline-offset-4 hover:underline">Open the tools</Link>
                    </Callout>
                  )}
                  <h2 className="font-display text-[1.5rem] leading-tight text-abyss md:text-[1.9rem]">{s.h}</h2>
                  {s.p.map((p) => (
                    <p key={p.slice(0, 30)} className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink-soft">{p}</p>
                  ))}
                </Reveal>
              ))}
              <Reveal className="rounded-[1.5rem] bg-mist p-6">
                <p className="eyebrow text-sea">The short version</p>
                <p className="font-display mt-2 text-balance text-[1.25rem] leading-snug text-abyss">{g.takeaway}</p>
              </Reveal>
            </div>
            <aside className="flex flex-col gap-5">
              <Reveal delay={80} className="rounded-[1.5rem] bg-abyss p-6 text-white">
                <p className="eyebrow text-aqua">Skip the reading</p>
                <p className="font-display mt-2 text-[1.3rem] leading-tight">Text Jason a photo of your tank</p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <a href={site.smsHref} className="btn btn-foam w-full">Text {site.phone}</a>
                  <a href={site.phoneHref} className="btn btn-glass w-full"><PhoneIcon /> Call</a>
                </div>
              </Reveal>
              <Reveal delay={120} className="rounded-[1.5rem] bg-shell p-6 ring-1 ring-[var(--line)]">
                <p className="eyebrow text-lagoon">More guides</p>
                <ul className="mt-3 space-y-3">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/guides/${o.slug}`} className="group flex items-start justify-between gap-3 text-[0.92rem] font-semibold text-abyss">
                        <span>{o.title}</span>
                        <Arrow className="mt-1 shrink-0 text-lagoon transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <div className="relative min-h-[14rem] flex-1 overflow-hidden rounded-[1.5rem] ring-1 ring-[var(--line)] hidden lg:block">
                <Image src="/images/stock/reef-tangs.jpg" alt="Two yellow tangs over coral in a reef aquarium" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </div>
            </aside>
          </Container>
        </div>
      </article>
      <CtaBand />
    </>
  );
}

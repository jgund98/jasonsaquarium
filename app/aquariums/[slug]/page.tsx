import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { services, specialties, getSpecialty } from "@/lib/services";
import { site } from "@/lib/site";
import { Container, Reveal, SectionHead } from "@/components/Section";
import FaqList from "@/components/Faq";
import CtaBand from "@/components/home/CtaBand";
import { Arrow } from "@/components/home/ServicesShowcase";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/schema";

const media: Record<string, { video: string; poster: string; gallery: { src: string; alt: string }[] }> = {
  "saltwater-reef-aquariums": {
    video: "/videos/reef-anemone.mp4",
    poster: "/videos/reef-anemone-poster.jpg",
    gallery: [
      { src: "/images/stock/coral-macro.jpg", alt: "Pink and teal hammer coral heads under reef lighting" },
      { src: "/images/stock/clownfish.jpg", alt: "Clownfish peeking out of an anemone" },
      { src: "/images/stock/brain-coral.jpg", alt: "Brain coral glowing under blue light" },
      { src: "/images/stock/mandarin.jpg", alt: "Mandarin dragonet close-up" },
    ],
  },
  "freshwater-planted-aquariums": {
    video: "/videos/planted.mp4",
    poster: "/videos/planted-poster.jpg",
    gallery: [
      { src: "/images/stock/tetras.jpg", alt: "Neon tetras over driftwood in a planted tank" },
      { src: "/images/stock/planted-angelfish.jpg", alt: "Angelfish in a heavily planted aquarium" },
      { src: "/images/stock/betta.jpg", alt: "Blue betta among aquarium plants" },
      { src: "/images/stock/nano-scape.jpg", alt: "Rimless nano aquascape under an LED lamp" },
    ],
  },
  "ponds-water-gardens": {
    video: "/videos/koi.mp4",
    poster: "/videos/koi-poster.jpg",
    gallery: [
      { src: "/images/stock/koi-garden.jpg", alt: "Koi in a tropical garden pond framed by foliage" },
      { src: "/images/stock/koi-group.jpg", alt: "Orange, white and black koi from above" },
      { src: "/images/specialties/pond.jpg", alt: "Koi under lily pads in a clear pond" },
    ],
  },
};

export function generateStaticParams() {
  return specialties.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/aquariums/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSpecialty(slug);
  if (!s) return {};
  return {
    title: `${s.name} Service in Palm Beach County, FL`,
    description: `${s.short} Cleaning, maintenance, setup and troubleshooting for ${s.name.toLowerCase()} in Boca Raton, Delray Beach, Boynton Beach and across Palm Beach County.`,
    alternates: { canonical: `/aquariums/${s.slug}` },
  };
}

export default async function SpecialtyPage({ params }: PageProps<"/aquariums/[slug]">) {
  const { slug } = await params;
  const s = getSpecialty(slug);
  if (!s) notFound();
  const m = media[s.slug];
  const others = specialties.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: s.name, url: `/aquariums/${s.slug}` },
          ]),
          serviceJsonLd({ name: `${s.name} service`, description: s.intro, url: `${site.url}/aquariums/${s.slug}`, serviceType: s.name }),
          faqJsonLd(s.faqs),
        ]}
      />
      <PageHero
        crumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: s.name, url: `/aquariums/${s.slug}` },
        ]}
        eyebrow="Specialty"
        title={s.headline}
        lede={s.intro}
        video={m.video}
        poster={m.poster}
      />

      <section className="bg-sand py-20 md:py-28">
        <Container>
          <div className="grid items-stretch gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal className="flex flex-col">
              <h2 className="font-display text-[1.8rem] leading-tight text-abyss md:text-[2.3rem]">What Jason handles</h2>
              <ul className="mt-6 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[1.02rem] text-ink">
                    <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-coral" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-5 text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
                {s.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {services.slice(0, 3).map((sv) => (
                  <Link key={sv.slug} href={`/services/${sv.slug}`} className="rounded-full bg-white px-4 py-2 text-[0.85rem] font-bold text-abyss ring-1 ring-[var(--line)] hover:bg-mist">
                    {sv.name}
                  </Link>
                ))}
              </div>
              <div className="mt-8 hidden flex-1 items-end lg:flex">
                <div className="w-full rounded-[1.5rem] bg-abyss p-6 text-white">
                  <p className="eyebrow text-aqua">Text a photo</p>
                  <p className="font-display mt-2 text-[1.3rem] leading-tight">Jason will tell you what your {s.name.toLowerCase()} needs</p>
                  <a href={site.smsPhotoHref} className="btn btn-coral mt-4 w-full">Text {site.phone}</a>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {m.gallery.slice(0, 3).map((g, i) => (
                <Reveal key={g.src} delay={i * 80} as="figure" className={i === 0 ? "col-span-2" : ""}>
                  <div className={`relative overflow-hidden rounded-[1.25rem] ring-1 ring-[var(--line)] ${i === 0 ? "aspect-[16/10]" : "aspect-square"}`}>
                    <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-shell py-20 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHead eyebrow="Questions" title={`About ${s.name.toLowerCase()}`} />
              <Reveal delay={100} className="mt-8 space-y-3">
                {others.map((o) => (
                  <Link key={o.slug} href={`/aquariums/${o.slug}`} className="group flex items-center justify-between gap-3 rounded-2xl bg-white p-4 ring-1 ring-[var(--line)] font-semibold text-abyss">
                    {o.name}
                    <Arrow className="text-lagoon transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </Reveal>
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

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Bubbles, Container } from "./Section";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";
import { Stars } from "./Footer";

export type Crumb = { name: string; url: string };

/**
 * Dark water page header used on every inner page. Optional photo or video on
 * the right, breadcrumb, eyebrow, H1, lede and the two CTAs.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  image,
  imageAlt,
  video,
  poster,
  compact = false,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  video?: string;
  poster?: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  const hasMedia = Boolean(image || video);
  return (
    <section
      className="relative isolate overflow-hidden bg-abyss text-white"
      style={{ background: "linear-gradient(180deg, #06304f 0%, #04213a 55%, #041a2e 100%)" }}
    >
      <div aria-hidden="true" className="caustics pointer-events-none absolute inset-0 opacity-70" />
      <Bubbles count={10} />
      <Container className="relative">
        <div
          className={clsx(
            "grid items-center gap-10 pt-[calc(72px+2.5rem)] md:pt-[calc(84px+3rem)]",
            compact ? "pb-14 md:pb-16" : "pb-16 md:pb-24",
            hasMedia && "lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
          )}
        >
          <div>
            {crumbs && (
              <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-[0.8rem] font-semibold text-white/60">
                {crumbs.map((c, i) => (
                  <span key={c.url} className="flex items-center gap-2">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-white/40" />}
                    {i < crumbs.length - 1 ? (
                      <Link href={c.url} className="hover:text-white">
                        {c.name}
                      </Link>
                    ) : (
                      <span className="text-white/85">{c.name}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
            {eyebrow && <p className="eyebrow mb-4 text-aqua">{eyebrow}</p>}
            <h1 className="font-display text-balance text-[clamp(2.2rem,5.2vw,4.4rem)] leading-[1.02]">{title}</h1>
            {lede && (
              <p className="mt-6 max-w-[38rem] text-pretty text-[1.05rem] leading-relaxed text-white/80 md:text-[1.15rem]">
                {lede}
              </p>
            )}
            {children}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn btn-coral">
                Get a Free Quote
              </Link>
              <a href={site.phoneHref} className="btn btn-foam">
                <PhoneIcon /> {site.phone}
              </a>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.88rem] text-white/70">
              <span className="inline-flex items-center gap-2 font-semibold text-white">
                <Stars className="h-3.5" /> {site.rating.value} stars on Google
              </span>
              <span>Call or text any time</span>
            </p>
          </div>

          {hasMedia && (
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 ring-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] lg:aspect-[5/4]">
                {video ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={poster}
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                ) : (
                  <Image src={image!} alt={imageAlt ?? ""} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.08) 100%)",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

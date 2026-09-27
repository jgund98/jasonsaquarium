import Link from "next/link";
import { featuredReviews } from "@/lib/reviews";
import { site } from "@/lib/site";
import { Bubbles, Container, Reveal, SectionHead } from "@/components/Section";
import { Stars } from "@/components/Footer";

/**
 * Editorial wall of quotes on deep water. No card grid: each quote is set at
 * its own size with the key phrase lit in aqua, names small, like a magazine
 * pull-quote spread. Every line is a verbatim public Google review.
 */
const sizes = [
  "text-[1.5rem] md:text-[1.9rem]",
  "text-[1.35rem] md:text-[1.6rem]",
  "text-[1.35rem] md:text-[1.6rem]",
  "text-[1.35rem] md:text-[1.6rem]",
  "text-[1.35rem] md:text-[1.6rem]",
  "text-[1.5rem] md:text-[1.9rem]",
];

export default function Reviews() {
  return (
    <section className="relative isolate overflow-hidden bg-abyss py-20 text-white md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 0% 100%, rgba(18,166,201,0.35), transparent 60%), radial-gradient(40% 40% at 100% 0%, rgba(255,106,77,0.2), transparent 60%)",
        }}
      />
      <Bubbles count={14} />
      <Container className="relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead
            tone="dark"
            eyebrow="In their words"
            title="Reviewed like a friend not a vendor"
            lede="Every line below is public on Google and quoted exactly as written. Nobody calls Jason a company. They call him the guy."
          />
          <Reveal delay={120} className="shrink-0">
            <a
              href={site.googleMapsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-abyss shadow-lg"
            >
              <Stars className="h-4" />
              <span className="text-sm font-bold">{site.rating.value} stars on Google</span>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {featuredReviews.slice(0, 6).map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 90} as="figure" className="relative flex flex-col pl-6">
              <span aria-hidden="true" className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[3px] rounded-full bg-gradient-to-b from-aqua to-coral/70" />
              <blockquote>
                <p className={`font-display text-balance leading-[1.12] ${sizes[i % sizes.length]}`}>
                  <span className="text-glow">&ldquo;</span>
                  {r.highlight}
                  <span className="text-glow">&rdquo;</span>
                </p>
                <p className="mt-4 line-clamp-3 text-pretty text-[0.92rem] leading-relaxed text-white/60">{r.excerpt ?? r.text}</p>
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-[0.85rem]">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[0.8rem] font-bold text-aqua">
                  {r.name.charAt(0)}
                </span>
                <span className="font-bold">{r.name}</span>
                <span className="text-white/50">Google · {r.when}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap items-center gap-4">
          <Link href="/reviews" className="btn btn-foam">
            Read every review in full
          </Link>
          <a href={site.googleReviewUrl} target="_blank" rel="noopener" className="text-sm font-semibold text-aqua hover:text-glow">
            Worked with Jason? Leave one on Google
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

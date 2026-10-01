import Link from "next/link";
import { Reveal } from "@/components/Section";
import { Arrow } from "@/components/home/ServicesShowcase";
import { guidesFor } from "@/lib/guides";

/** Short list of guides that go deeper on the page's topic. */
export default function RelatedGuides({ slug, className = "mt-8" }: { slug: string; className?: string }) {
  const list = guidesFor(slug);
  if (!list.length) return null;
  return (
    <Reveal delay={120} className={className}>
      <p className="eyebrow text-lagoon">Read more</p>
      <ul className="mt-3 space-y-3">
        {list.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="group flex items-center justify-between gap-3 rounded-2xl bg-white p-4 ring-1 ring-[var(--line)] font-semibold text-abyss"
            >
              <span>{g.title}</span>
              <Arrow className="shrink-0 text-lagoon transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

import Link from "next/link";
import { homeFaqs } from "@/lib/faqs";
import { Container, Reveal, SectionHead } from "@/components/Section";
import FaqList from "@/components/Faq";
import { Arrow } from "./ServicesShowcase";
import { guides } from "@/lib/guides";

export default function FaqTeaser() {
  return (
    <section className="relative bg-shell py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Straight answers"
              title="The questions everyone asks before they call"
              lede="Cost, frequency, what a visit includes, what to do when something goes wrong. If yours is not here, text Jason and ask."
            />
            <Reveal delay={120} className="mt-8">
              <Link href="/faq" className="btn btn-abyss">
                All questions and answers <Arrow />
              </Link>
            </Reveal>
            <Reveal delay={160} className="mt-10 border-t border-[var(--line)] pt-7">
              <p className="eyebrow text-lagoon">Longer answers</p>
              <ul className="mt-3 space-y-2.5">
                {guides.slice(0, 4).map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="group flex items-start justify-between gap-3 text-[0.95rem] font-semibold text-abyss">
                      <span>{g.title}</span>
                      <Arrow className="mt-1 shrink-0 text-lagoon transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/guides" className="mt-4 inline-flex items-center gap-2 text-[0.9rem] font-bold text-lagoon">All guides <Arrow /></Link>
            </Reveal>
          </div>
          <Reveal delay={80}>
            <FaqList faqs={homeFaqs} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

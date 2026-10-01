import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Container, Reveal } from "@/components/Section";
import { services } from "@/lib/services";
import { palmBeachTowns } from "@/lib/site";
import { Arrow } from "@/components/home/ServicesShowcase";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const linkClass = "inline-flex items-center gap-2 font-semibold text-deep underline-offset-4 hover:underline";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="That page swam off"
        lede="The link may be old or mistyped. Everything on the site is one tap away below."
        compact
      />
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-[1.6rem] leading-tight text-abyss">Services</h2>
              <ul className="mt-5 space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={linkClass}>
                      {s.name} <Arrow />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/tools" className={linkClass}>
                    Free aquarium tools <Arrow />
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className={linkClass}>
                    Guides <Arrow />
                  </Link>
                </li>
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-[1.6rem] leading-tight text-abyss">Palm Beach County towns</h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.95rem]">
                {palmBeachTowns.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/aquarium-service/${t.slug}`} className="text-ink-soft underline-offset-4 hover:text-abyss hover:underline">
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/service-areas" className={`${linkClass} mt-5`}>
                All service areas <Arrow />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14">
            <Link href="/contact#quote" className="btn btn-coral">
              Get a Free Quote
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

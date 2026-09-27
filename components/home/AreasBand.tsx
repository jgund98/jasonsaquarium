import Link from "next/link";
import Image from "next/image";
import { palmBeachTowns, browardTowns } from "@/lib/site";
import { Container, Reveal, SectionHead } from "@/components/Section";
import { Arrow } from "./ServicesShowcase";

function TownList({ towns }: { towns: readonly { name: string; slug: string; minutes: number }[] }) {
  return (
    <ul className="divide-y divide-[var(--line)]">
      {towns.map((t) => (
        <li key={t.slug}>
          <Link
            href={`/aquarium-service/${t.slug}`}
            className="group flex items-center justify-between gap-3 py-2 text-[0.95rem] font-semibold text-ink transition-colors hover:text-lagoon"
          >
            <span className="flex items-center gap-2.5">
              <span className={`h-1.5 w-1.5 rounded-full ${t.minutes === 0 ? "bg-coral" : "bg-lagoon/70"}`} />
              {t.name}
            </span>
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-soft/70 group-hover:text-lagoon">
              {t.minutes === 0 ? "Weekly route" : "Route day"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function AreasBand() {
  const pbLeft = palmBeachTowns.slice(0, Math.ceil(palmBeachTowns.length / 2));
  const pbRight = palmBeachTowns.slice(Math.ceil(palmBeachTowns.length / 2));
  return (
    <section className="relative bg-shell py-20 md:py-28">
      <Container>
        <div className="grid items-stretch gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] ring-1 ring-[var(--line)] lg:min-h-0">
            <Image
              src="/images/areas/boca-lake.jpg"
              alt="Royal palms and a lake under a big South Florida sky in Boca Raton"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
              <p className="eyebrow text-aqua">Palm Beach County and north Broward</p>
              <p className="font-display mt-2 text-balance text-[1.5rem] leading-tight md:text-[1.9rem]">
                Palm Beach County first and north Broward on the same route days
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col">
            <SectionHead
              eyebrow="Where Jason drives"
              title="Route days across the county so the schedule never slips"
              lede="Visits are grouped by area, which is how a one-person service stays on time."
            />
            <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-3">
              <Reveal delay={80} className="sm:col-span-2">
                <h3 className="eyebrow mb-2 text-lagoon">Palm Beach County</h3>
                <div className="grid gap-x-8 sm:grid-cols-2">
                  <TownList towns={pbLeft} />
                  <TownList towns={pbRight} />
                </div>
              </Reveal>
              <Reveal delay={160}>
                <h3 className="eyebrow mb-2 text-coral">North Broward</h3>
                <TownList towns={browardTowns} />
              </Reveal>
            </div>
            <Reveal delay={200} className="mt-auto flex flex-wrap gap-3 pt-8">
              <Link href="/service-areas" className="btn btn-abyss">
                Every area <Arrow />
              </Link>
              <Link href="/contact" className="btn btn-coral">
                Is my town covered
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

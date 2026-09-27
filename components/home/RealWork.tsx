import Image from "next/image";
import Link from "next/link";
import { Container, Reveal } from "@/components/Section";
import { Arrow } from "./ServicesShowcase";

/**
 * The one photo that says everything: a real reef Jason services, built into
 * the wall of a Palm Beach County lobby. Full-bleed, no card grid.
 */
export default function RealWork() {
  return (
    <section className="relative isolate overflow-hidden bg-abyss text-white">
      <Reveal className="relative" y={0}>
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9]">
          <Image
            src="/images/work/lobby-reef.jpg"
            alt="A wall-mounted saltwater reef aquarium with live coral and tangs, built into the wood paneling of a Palm Beach County lobby and serviced by Jason's Aquarium Service"
            fill
            sizes="100vw"
            className="object-cover object-[35%_center]"
            priority={false}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(4,33,58,0.1) 0%, rgba(4,33,58,0) 30%, rgba(4,33,58,0.7) 62%, rgba(4,33,58,0.97) 100%)",
            }}
          />
        </div>
      </Reveal>

      <Container className="relative -mt-36 pb-16 sm:-mt-44 md:pb-24 lg:-mt-48">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="eyebrow text-aqua">Real tank and real client</p>
            <h2 className="font-display mt-4 text-balance text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.04]">
              A reef built into a lobby wall and kept this clear
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-xl text-pretty text-[1.05rem] leading-relaxed text-white/90 md:text-[1.12rem]">
              This is one of the aquariums Jason services. Live coral, a school of tangs and a
              clownfish pair in a wall-mounted saltwater system that greets everyone who walks
              in. It looks like this because someone shows up every week and does the work.
            </p>
            <Link href="/our-work" className="mt-6 inline-flex items-center gap-2 font-bold text-aqua hover:text-glow">
              See the work and the stories behind it <Arrow />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

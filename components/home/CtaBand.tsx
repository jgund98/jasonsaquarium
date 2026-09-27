import Link from "next/link";
import { site } from "@/lib/site";
import { Bubbles, Container, Reveal } from "@/components/Section";
import { PhoneIcon } from "@/components/Header";
import { Watermark } from "@/components/Brand";

export default function CtaBand({
  title = "Tell Jason about your tank",
  body = "Size, saltwater or freshwater, what is bugging you. That is all he needs to give you a straight answer, usually the same day.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-deep py-20 text-white md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 15% 50%, rgba(51,214,242,0.28), transparent 60%), radial-gradient(40% 60% at 90% 20%, rgba(255,106,77,0.22), transparent 60%)",
        }}
      />
      <Bubbles count={12} />
      <Watermark className="-right-20 top-1/2 -translate-y-1/2" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <h2 className="font-display text-balance text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.04]">{title}</h2>
            <p className="mt-5 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-white/80 md:text-[1.12rem]">
              {body}
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <Link href="/contact" className="btn btn-coral !py-4 text-base">
              Get a Free Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-foam !py-4 text-base">
              <PhoneIcon /> {site.phone}
            </a>
            <a href={site.smsHref} className="btn btn-glass !py-4 text-base">
              Text a photo of your tank
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

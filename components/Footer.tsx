import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import { site, palmBeachTowns, browardTowns } from "@/lib/site";
import { services, specialties } from "@/lib/services";
import { PhoneIcon } from "./Header";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-abyss text-white pb-[calc(env(safe-area-inset-bottom)+5.5rem)] md:pb-0">
      <div className="wave-mask-bottom h-12 bg-deep md:h-16" aria-hidden="true" />
      <div className="container-x pt-10 pb-12 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/70 text-pretty">
              Mobile aquarium cleaning, design, installation and assessments for homes and
              businesses across Palm Beach County and north Broward. Owned and operated by{" "}
              {site.owner}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn btn-foam !py-3 !px-4 text-sm">
                <PhoneIcon /> {site.phone}
              </a>
              <a href={site.smsHref} className="btn btn-glass !py-3 !px-4 text-sm">
                Text Jason
              </a>
            </div>
            <p className="mt-5 text-sm text-white/55">{site.hours}</p>
            <a
              href={site.googleMapsUrl}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-aqua hover:text-glow"
            >
              <Stars /> {site.rating.value} stars on Google
            </a>
          </div>

          <div>
            <h3 className="eyebrow text-aqua">Services</h3>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/80 hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
              {specialties.map((s) => (
                <li key={s.slug}>
                  <Link href={`/aquariums/${s.slug}`} className="text-white/80 hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/faq" className="text-white/80 hover:text-white">
                  Questions & Answers
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-white/80 hover:text-white">
                  Free Tools
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-white/80 hover:text-white">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-aqua">Palm Beach County</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.9rem] sm:grid-cols-1">
              {palmBeachTowns.map((t) => (
                <li key={t.slug}>
                  <Link href={`/aquarium-service/${t.slug}`} className="text-white/80 hover:text-white">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-aqua">North Broward</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.9rem] sm:grid-cols-1">
              {browardTowns.map((t) => (
                <li key={t.slug}>
                  <Link href={`/aquarium-service/${t.slug}`} className="text-white/80 hover:text-white">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="eyebrow mt-8 text-aqua">Company</h3>
            <ul className="mt-5 space-y-2.5 text-[0.9rem]">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white">
                  About Jason
                </Link>
              </li>
              <li>
                <Link href="/our-work" className="text-white/80 hover:text-white">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-white/80 hover:text-white">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-4xl text-[0.85rem] leading-relaxed text-white/45 text-pretty">
          {site.disambiguation}{" "}
          Proudly serving aquarium owners in Boca Raton, Delray Beach, Boynton Beach, Highland
          Beach, Deerfield Beach, Parkland, Coral Springs, Wellington, West Palm Beach and the
          surrounding Palm Beach County and north Broward communities.
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--line-dark)] pt-6 text-[0.8rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <a
            href={site.epic.url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <span>Site by</span>
            <Image
              src="/brand/epic-logo-white.webp"
              alt="Epic Dev Solutions"
              width={96}
              height={24}
              className="h-5 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export function Stars({ className = "h-4" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[2px] text-[#f6b93b] ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-full w-auto" fill="currentColor">
          <path d="M10 1.6l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L10 15l-5.3 2.8 1.1-5.9L1.5 7.8l5.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

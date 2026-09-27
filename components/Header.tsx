"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Logo from "./Logo";
import { site } from "@/lib/site";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/our-work", label: "Our Work" },
  { href: "/about", label: "About Jason" },
  { href: "/reviews", label: "Reviews" },
  { href: "/tools", label: "Free Tools" },
  { href: "/service-areas", label: "Areas" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const light = !scrolled && !open;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        scrolled && !open
          ? "bg-white/92 backdrop-blur-md shadow-[0_1px_0_rgba(11,31,46,0.08)]"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
        <Logo tone={light ? "light" : "dark"} compact />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={clsx(
                  "relative text-[0.9rem] font-semibold tracking-wide transition-colors",
                  light ? "text-white/85 hover:text-white" : "text-ink-soft hover:text-abyss",
                  active && (light ? "text-white" : "text-abyss")
                )}
              >
                {n.label}
                <span
                  className={clsx(
                    "absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-coral transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={site.phoneHref}
            className={clsx(
              "btn hidden !py-3 !px-4 text-[0.9rem] sm:inline-flex",
              light ? "btn-foam" : "btn-abyss"
            )}
          >
            <PhoneIcon />
            {site.phone}
          </a>
          <Link href="/contact" className="btn btn-coral hidden !py-3 !px-4 text-[0.9rem] md:inline-flex">
            Get a Quote
          </Link>
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            className={clsx(
              "grid h-11 w-11 place-items-center rounded-full sm:hidden",
              light ? "bg-white text-abyss" : "bg-abyss text-white"
            )}
          >
            <PhoneIcon />
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={clsx(
              "grid h-11 w-11 place-items-center rounded-full lg:hidden",
              light ? "bg-white/15 text-white backdrop-blur" : "bg-mist text-abyss"
            )}
          >
            <span className="relative block h-[14px] w-5">
              <span
                className={clsx(
                  "absolute left-0 top-0 h-[2px] w-5 rounded bg-current transition-transform duration-300",
                  open && "translate-y-[6px] rotate-45"
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-[6px] h-[2px] w-5 rounded bg-current transition-opacity duration-200",
                  open && "opacity-0"
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 top-[12px] h-[2px] w-5 rounded bg-current transition-transform duration-300",
                  open && "-translate-y-[6px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "fixed inset-0 top-[72px] z-40 bg-white transition-[opacity,transform] duration-400 ease-[var(--ease-water)] lg:hidden",
          open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        )}
      >
        <div className="container-x flex h-full flex-col py-6">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
                className={clsx(
                  "font-display border-b border-[var(--line)] py-4 text-[1.9rem] leading-none text-abyss transition-[opacity,transform] duration-500",
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pb-8">
            <Link href="/contact" className="btn btn-coral w-full">
              Get a Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-abyss w-full">
              <PhoneIcon /> Call {site.phone}
            </a>
            <a href={site.smsHref} className="text-center text-sm font-semibold text-ink-soft">
              or text Jason directly
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={clsx("h-[18px] w-[18px]", className)} fill="none" aria-hidden="true">
      <path
        d="M6.6 3h3l1.6 4.2-2 1.3a12 12 0 0 0 6.3 6.3l1.3-2 4.2 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

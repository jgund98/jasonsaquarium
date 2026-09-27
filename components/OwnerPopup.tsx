"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { site } from "@/lib/site";
import { Stars } from "./Footer";
import { FishMark } from "./Logo";
import { PhoneIcon } from "./Header";

const KEY = "jas-owner-card";

/**
 * A quiet corner card, not a modal. Desktop only (phones have the dock).
 * Appears once per session after the visitor has scrolled past the hero or
 * spent a while on the page, never on reading or tool pages.
 */
export default function OwnerPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const quiet = pathname.startsWith("/contact") || pathname.startsWith("/guides") || pathname.startsWith("/tools");

  useEffect(() => {
    if (quiet) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen) return;
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setOpen(true);
      cleanup();
    };
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.2) fire();
    };
    const t = window.setTimeout(fire, 14000);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
    return cleanup;
  }, [pathname, quiet]);

  return (
    <div
      className={clsx(
        "fixed bottom-5 right-5 z-40 hidden w-[22rem] max-w-[calc(100vw-2.5rem)] transition-all duration-700 ease-[var(--ease-water)] md:block",
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
      role="complementary"
      aria-label="A note from Jason"
      aria-hidden={!open}
    >
      <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-5 text-ink shadow-[0_30px_60px_-20px_rgba(4,33,58,0.5)] ring-1 ring-[var(--line)]">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-mist text-abyss hover:bg-aqua/30"
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mist">
            <FishMark className="h-7 w-8" id="card" />
          </div>
          <div>
            <p className="font-display text-[1.15rem] leading-tight text-abyss">Hi, I&rsquo;m Jason.</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[0.8rem] text-ink-soft">
              <Stars className="h-3" /> {site.rating.value} stars on Google
            </p>
          </div>
        </div>
        <p className="mt-3 text-pretty text-[0.92rem] leading-relaxed text-ink-soft">
          Text me a photo of your tank and I will tell you what it needs. I answer my own phone.
        </p>
        <div className="mt-4 flex gap-2">
          <a href={site.phoneHref} className="btn btn-abyss flex-1 !px-3 !py-3 text-[0.85rem]">
            <PhoneIcon /> Call
          </a>
          <Link href="/contact#quote" className="btn btn-coral flex-1 !px-3 !py-3 text-[0.85rem]" onClick={() => setOpen(false)}>
            Get a quote
          </Link>
        </div>
      </div>
    </div>
  );
}

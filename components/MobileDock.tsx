"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";

export default function MobileDock() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={clsx(
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] transition-transform duration-500 ease-[var(--ease-water)] md:hidden",
        show ? "translate-y-0" : "translate-y-[120%]"
      )}
    >
      <div className="flex gap-2 rounded-full bg-abyss/95 p-2 shadow-[0_18px_40px_-16px_rgba(4,33,58,0.8)] backdrop-blur">
        <a href={site.phoneHref} className="btn btn-foam flex-1 !py-3.5 text-[0.9rem]">
          <PhoneIcon /> Call
        </a>
        <a href={site.smsHref} className="btn btn-glass flex-1 !py-3.5 text-[0.9rem]">
          Text
        </a>
        <Link href="/contact#quote" className="btn btn-coral flex-[1.4] !py-3.5 text-[0.9rem]">
          Get a Quote
        </Link>
      </div>
    </div>
  );
}

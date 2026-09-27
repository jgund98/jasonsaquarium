"use client";

import { useState } from "react";
import clsx from "clsx";
import type { Faq } from "@/lib/services";

export default function FaqList({
  faqs,
  tone = "light",
  defaultOpen = 0,
}: {
  faqs: Faq[];
  tone?: "light" | "dark";
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const dark = tone === "dark";
  return (
    <ul className={clsx("divide-y", dark ? "divide-white/10" : "divide-[var(--line)]")}>
      {faqs.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className={clsx(
                "flex w-full items-start justify-between gap-6 py-5 text-left transition-colors",
                dark ? "text-white" : "text-abyss"
              )}
            >
              <span className="text-pretty text-[1.05rem] font-bold leading-snug md:text-[1.12rem]">{f.q}</span>
              <span
                className={clsx(
                  "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-water)]",
                  dark ? "bg-white/10 text-aqua" : "bg-mist text-lagoon",
                  on && "rotate-45"
                )}
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-water)]"
              style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p
                  className={clsx(
                    "max-w-3xl pb-6 text-pretty text-[0.98rem] leading-relaxed",
                    dark ? "text-white/75" : "text-ink-soft"
                  )}
                >
                  {f.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

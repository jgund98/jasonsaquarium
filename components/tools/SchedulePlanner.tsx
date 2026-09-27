"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";

/**
 * Service Schedule Planner. Answer five questions about the tank, get the
 * visit rhythm Jason would recommend and what each visit should include.
 * No prices invented; the output is a plan you can text to Jason.
 */

type Opt<T extends string> = { k: T; label: string };

const waterOpts: Opt<"reef" | "fowlr" | "freshwater" | "planted" | "pond">[] = [
  { k: "reef", label: "Saltwater reef with coral" },
  { k: "fowlr", label: "Saltwater fish only" },
  { k: "freshwater", label: "Freshwater community" },
  { k: "planted", label: "Planted freshwater" },
  { k: "pond", label: "Pond or water garden" },
];
const sizeOpts: Opt<"s" | "m" | "l" | "xl">[] = [
  { k: "s", label: "Under 40 gal" },
  { k: "m", label: "40 to 120 gal" },
  { k: "l", label: "120 to 300 gal" },
  { k: "xl", label: "300 gal and up" },
];
const stockOpts: Opt<"light" | "normal" | "heavy">[] = [
  { k: "light", label: "Lightly stocked" },
  { k: "normal", label: "About average" },
  { k: "heavy", label: "Full house" },
];
const gearOpts: Opt<"basic" | "sump" | "auto">[] = [
  { k: "basic", label: "Hang-on filter or canister" },
  { k: "sump", label: "Sump with skimmer" },
  { k: "auto", label: "Sump plus dosing or controller" },
];
const ownerOpts: Opt<"hands" | "busy" | "away">[] = [
  { k: "hands", label: "I do some upkeep myself" },
  { k: "busy", label: "I just want it to look good" },
  { k: "away", label: "I travel or live here part-time" },
];

export default function SchedulePlanner() {
  const [water, setWater] = useState<(typeof waterOpts)[number]["k"] | null>(null);
  const [size, setSize] = useState<(typeof sizeOpts)[number]["k"] | null>(null);
  const [stock, setStock] = useState<(typeof stockOpts)[number]["k"] | null>(null);
  const [gear, setGear] = useState<(typeof gearOpts)[number]["k"] | null>(null);
  const [owner, setOwner] = useState<(typeof ownerOpts)[number]["k"] | null>(null);

  const plan = useMemo(() => {
    if (!water || !size || !stock || !gear || !owner) return null;
    // base cadence in days
    let days = water === "reef" ? 7 : water === "fowlr" ? 14 : water === "planted" ? 14 : water === "pond" ? 21 : 21;
    if (stock === "heavy") days = Math.max(7, days - 7);
    if (stock === "light" && water !== "reef") days += 7;
    if (owner === "hands" && water !== "reef") days += 7;
    if (owner === "away") days = Math.min(days, 14);
    if (size === "xl" && water === "reef") days = 7;
    const cadence = days <= 7 ? "Weekly" : days <= 14 ? "Every two weeks" : days <= 21 ? "Every three weeks" : "Monthly";

    const checks: string[] = [];
    if (water === "reef") checks.push("Salinity, alkalinity, calcium, magnesium, nitrate and phosphate written down every visit");
    else if (water === "fowlr") checks.push("Salinity, pH, ammonia, nitrite and nitrate every visit");
    else if (water === "pond") checks.push("Ammonia, nitrite, nitrate, pH and clarity, plus pump and UV checks");
    else checks.push("Ammonia, nitrite, nitrate, pH and hardness every visit");
    checks.push(water === "pond" ? "Debris removal, filter rinse and skimmer basket" : "Water change with matched, prepared water");
    checks.push(water === "pond" ? "Plant trimming and algae control" : "Glass, rock or wood, and substrate cleaning");
    if (gear !== "basic") checks.push("Skimmer cup, sump and return pump service on a rotation");
    if (gear === "auto") checks.push("Dosing calibration and controller review");
    if (water === "planted") checks.push("Trimming, fertilizer and CO2 check");
    checks.push("A look at every fish and coral before Jason leaves");
    if (owner === "away") checks.push("A text after each visit with anything you need to know");

    const why =
      water === "reef"
        ? "Coral reacts to alkalinity swings within days, so reefs are the one system where stretching visits costs real money."
        : water === "pond"
          ? "South Florida sun and rain push ponds around fast in summer. The rhythm tightens May through October."
          : stock === "heavy"
            ? "A full tank produces waste faster than the filter can keep up between long gaps."
            : "Freshwater is forgiving when the routine is steady and the tank is not overfed.";

    const summary = `${cadence.toLowerCase()} visits for a ${sizeOpts.find((s) => s.k === size)!.label.toLowerCase()} ${waterOpts.find((w) => w.k === water)!.label.toLowerCase()}`;
    return { cadence, checks, why, summary };
  }, [water, size, stock, gear, owner]);

  const smsBody = plan
    ? encodeURIComponent(`Hi Jason, your planner suggested ${plan.summary}. Can you give me a quote?`)
    : "";

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
      <div className="space-y-7 rounded-[1.75rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8">
        <Q label="What kind of system" opts={waterOpts} value={water} onChange={setWater} />
        <Q label="How big" opts={sizeOpts} value={size} onChange={setSize} />
        <Q label="How stocked" opts={stockOpts} value={stock} onChange={setStock} />
        <Q label="What is running it" opts={gearOpts} value={gear} onChange={setGear} />
        <Q label="And you" opts={ownerOpts} value={owner} onChange={setOwner} />
      </div>

      <div className="flex flex-col [&>div]:flex-1">
        {!plan ? (
          <div className="rounded-[1.75rem] bg-abyss p-8 text-white">
            <p className="eyebrow text-aqua">Your plan</p>
            <p className="font-display mt-3 text-[1.6rem] leading-tight">Answer the five questions and the plan builds itself</p>
            <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-white/75">
              This is the same logic Jason uses on a first visit. It does not sell you more visits than the tank needs.
            </p>
          </div>
        ) : (
          <div className="rounded-[1.75rem] bg-abyss p-7 text-white md:p-8">
            <p className="eyebrow text-aqua">Your plan</p>
            <p className="font-display mt-3 text-[2rem] leading-tight md:text-[2.4rem]">{plan.cadence}</p>
            <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-white/80">{plan.why}</p>
            <p className="eyebrow mt-6 text-aqua">Each visit</p>
            <ul className="mt-3 space-y-2.5">
              {plan.checks.map((c) => (
                <li key={c} className="flex gap-3 text-[0.95rem] leading-snug">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-aqua/20 text-aqua">
                    <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.6">
                      <path d="M4 10.5l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-2.5">
              <a href={`${site.smsHref}?&body=${smsBody}`} className="btn btn-coral w-full">
                Text this plan to Jason for a price
              </a>
              <Link href="/contact" className="btn btn-foam w-full">
                Or request a quote
              </Link>
              <a href={site.phoneHref} className="btn btn-glass w-full">
                <PhoneIcon /> {site.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Q<T extends string>({ label, opts, value, onChange }: { label: string; opts: Opt<T>[]; value: T | null; onChange: (v: T) => void }) {
  return (
    <div>
      <p className="text-[0.85rem] font-bold uppercase tracking-[0.16em] text-lagoon">{label}</p>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {opts.map((o) => (
          <button
            key={o.k}
            type="button"
            onClick={() => onChange(o.k)}
            aria-pressed={value === o.k}
            className={clsx(
              "rounded-2xl px-4 py-3 text-left text-[0.93rem] font-semibold leading-snug transition-all duration-300",
              value === o.k ? "bg-abyss text-white" : "bg-shell text-ink ring-1 ring-[var(--line)] hover:bg-mist"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

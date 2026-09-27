"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { site } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";

/**
 * Water Test Decoder. Enter what your test kit says, get a plain-English read
 * on each number, an overall verdict, and a one-tap text to Jason with the
 * results already typed out. No account, no email gate.
 */

type Water = "saltwater" | "freshwater";
type Level = "good" | "watch" | "bad";

type Param = {
  key: string;
  label: string;
  unit: string;
  hint: string;
  step?: number;
  read: (v: number) => { level: Level; note: string; action?: string };
  /** target ceiling used to size a water change */
  target?: number;
};

const SALT: Param[] = [
  {
    key: "salinity",
    label: "Salinity",
    unit: "sg",
    hint: "1.024 to 1.026",
    step: 0.001,
    read: (v) =>
      v < 1.02 || v > 1.03
        ? { level: "bad", note: "Far outside the range fish and coral tolerate.", action: "Adjust slowly over days, never in one shot. Call before doing anything drastic." }
        : v < 1.023 || v > 1.027
          ? { level: "watch", note: "Drifting. Coral gets stressed before fish do.", action: "Check your top-off and bring it back in small steps." }
          : { level: "good", note: "Right where a reef wants it." },
  },
  {
    key: "temp",
    label: "Temperature",
    unit: "°F",
    hint: "76 to 80",
    read: (v) =>
      v < 72 || v > 84
        ? { level: "bad", note: "Dangerous. Heater or chiller has likely failed.", action: "Fix the temperature first. Nothing else matters until it is stable." }
        : v < 75 || v > 81
          ? { level: "watch", note: "A little off. Summer heat in South Florida does this.", action: "Check the heater setting and room temperature." }
          : { level: "good", note: "Stable and comfortable." },
  },
  {
    key: "ph",
    label: "pH",
    unit: "",
    hint: "8.1 to 8.3",
    step: 0.1,
    read: (v) =>
      v < 7.7 || v > 8.5
        ? { level: "bad", note: "Well outside the marine range.", action: "Usually low alkalinity or CO2 in the house. Check alkalinity next." }
        : v < 8.0 || v > 8.4
          ? { level: "watch", note: "Slightly off. Often reads low in a closed-up air-conditioned home.", action: "Fine to watch. If alkalinity is also low, fix that." }
          : { level: "good", note: "Healthy marine pH." },
  },
  {
    key: "ammonia",
    label: "Ammonia",
    unit: "ppm",
    hint: "0",
    step: 0.05,
    read: (v) =>
      v >= 0.5
        ? { level: "bad", note: "Toxic. Fish are being hurt right now.", action: "Stop feeding, do a water change today, and call." }
        : v > 0
          ? { level: "watch", note: "Should be zero in an established tank.", action: "Skip a feeding, check for a dead fish or a stalled filter." }
          : { level: "good", note: "Zero. Filter is doing its job." },
  },
  {
    key: "nitrite",
    label: "Nitrite",
    unit: "ppm",
    hint: "0",
    step: 0.05,
    read: (v) =>
      v >= 0.5
        ? { level: "bad", note: "Toxic. Same urgency as ammonia.", action: "Water change today, stop feeding, call." }
        : v > 0
          ? { level: "watch", note: "Filter is catching up from something.", action: "Reduce feeding and retest in two days." }
          : { level: "good", note: "Zero. Good." },
  },
  {
    key: "nitrate",
    label: "Nitrate",
    unit: "ppm",
    hint: "2 to 10 for reef",
    target: 10,
    read: (v) =>
      v > 40
        ? { level: "bad", note: "High. Algae wins and coral browns out.", action: "A series of water changes and less food. Look at the filter socks and skimmer." }
        : v > 15
          ? { level: "watch", note: "Creeping up. Most reef problems start here.", action: "Water change and check feeding amounts." }
          : v === 0
            ? { level: "watch", note: "Zero can starve coral in a reef.", action: "Not urgent. Mention it to Jason." }
            : { level: "good", note: "Right in the healthy band." },
  },
  {
    key: "phosphate",
    label: "Phosphate",
    unit: "ppm",
    hint: "0.02 to 0.1",
    target: 0.1,
    step: 0.01,
    read: (v) =>
      v > 0.3
        ? { level: "bad", note: "High. Feeds algae and stalls coral growth.", action: "Check food and source water. GFO or a phosphate remover, carefully." }
        : v > 0.12
          ? { level: "watch", note: "A little high.", action: "Reduce feeding, check RO/DI water quality." }
          : { level: "good", note: "Where a reef wants it." },
  },
  {
    key: "alk",
    label: "Alkalinity",
    unit: "dKH",
    hint: "8 to 9.5",
    step: 0.1,
    read: (v) =>
      v < 6.5 || v > 12
        ? { level: "bad", note: "Way off. Coral tissue suffers fast when alkalinity swings.", action: "Correct slowly, no more than 1 dKH a day. Call if unsure." }
        : v < 7.5 || v > 10.5
          ? { level: "watch", note: "Drifting from the sweet spot.", action: "Adjust dosing or do a water change with a matched salt." }
          : { level: "good", note: "Stable alkalinity is the secret to good coral." },
  },
  {
    key: "calcium",
    label: "Calcium",
    unit: "ppm",
    hint: "400 to 450",
    read: (v) =>
      v < 340 || v > 520
        ? { level: "bad", note: "Out of range for stony coral.", action: "Check your salt mix and dosing. Correct gradually." }
        : v < 380 || v > 470
          ? { level: "watch", note: "Slightly off.", action: "Adjust dosing a little at a time." }
          : { level: "good", note: "Good for growth." },
  },
  {
    key: "magnesium",
    label: "Magnesium",
    unit: "ppm",
    hint: "1250 to 1400",
    read: (v) =>
      v < 1100 || v > 1600
        ? { level: "bad", note: "Out of range. Alkalinity and calcium will not hold until this is fixed.", action: "Raise or lower slowly with a magnesium supplement or water changes." }
        : v < 1220 || v > 1450
          ? { level: "watch", note: "A bit off.", action: "Bring it back over a week." }
          : { level: "good", note: "Holding the other two in balance." },
  },
];

const FRESH: Param[] = [
  {
    key: "temp",
    label: "Temperature",
    unit: "°F",
    hint: "74 to 80 for most tropical fish",
    read: (v) =>
      v < 68 || v > 86
        ? { level: "bad", note: "Dangerous for tropical fish.", action: "Check the heater or room temperature now." }
        : v < 73 || v > 82
          ? { level: "watch", note: "A little off for most tropical species.", action: "Adjust the heater a degree at a time." }
          : { level: "good", note: "Comfortable." },
  },
  {
    key: "ph",
    label: "pH",
    unit: "",
    hint: "6.5 to 7.8 for most tanks",
    step: 0.1,
    read: (v) =>
      v < 6.0 || v > 8.4
        ? { level: "bad", note: "Outside what most freshwater fish tolerate.", action: "Do not chase it with chemicals. Check KH and call." }
        : v < 6.4 || v > 8.0
          ? { level: "watch", note: "Fine for some species, not for others.", action: "Match fish to your water rather than fighting it." }
          : { level: "good", note: "Fine for a community tank." },
  },
  {
    key: "ammonia",
    label: "Ammonia",
    unit: "ppm",
    hint: "0",
    step: 0.05,
    read: (v) =>
      v >= 0.5
        ? { level: "bad", note: "Toxic. This is the most common reason fish die.", action: "Stop feeding, water change today, add a chloramine-safe conditioner, call." }
        : v > 0
          ? { level: "watch", note: "Should be zero.", action: "Skip a feeding, check the filter and look for a dead fish." }
          : { level: "good", note: "Zero. Filter is healthy." },
  },
  {
    key: "nitrite",
    label: "Nitrite",
    unit: "ppm",
    hint: "0",
    step: 0.05,
    read: (v) =>
      v >= 0.5
        ? { level: "bad", note: "Toxic.", action: "Water change today and stop feeding." }
        : v > 0
          ? { level: "watch", note: "Filter is recovering from something.", action: "Reduce feeding and retest in two days." }
          : { level: "good", note: "Zero. Good." },
  },
  {
    key: "nitrate",
    label: "Nitrate",
    unit: "ppm",
    hint: "under 20, under 30 if heavily planted",
    target: 20,
    read: (v) =>
      v > 60
        ? { level: "bad", note: "High. Stress, algae and disease follow.", action: "A few water changes over the week and less food." }
        : v > 25
          ? { level: "watch", note: "Creeping up.", action: "Water change and check how much you are feeding." }
          : { level: "good", note: "Healthy." },
  },
  {
    key: "gh",
    label: "General hardness",
    unit: "dGH",
    hint: "4 to 12 for most tanks",
    read: (v) =>
      v > 20
        ? { level: "watch", note: "Very hard. Normal for Palm Beach County tap water, tough on soft-water fish.", action: "Blend with RO water for discus, tetras and planted tanks." }
        : v < 3
          ? { level: "watch", note: "Very soft. Fine for some species, unstable pH for others.", action: "Mention it to Jason." }
          : { level: "good", note: "Workable for a community tank." },
  },
  {
    key: "kh",
    label: "Carbonate hardness",
    unit: "dKH",
    hint: "3 to 8",
    read: (v) =>
      v < 2
        ? { level: "watch", note: "Low. pH can crash overnight.", action: "A little crushed coral or a buffer, slowly." }
        : v > 12
          ? { level: "watch", note: "High, typical of local tap water.", action: "Only an issue for soft-water species." }
          : { level: "good", note: "pH will stay steady." },
  },
];

const STYLE: Record<Level, { chip: string; dot: string; word: string }> = {
  good: { chip: "bg-kelp/12 text-kelp ring-kelp/30", dot: "bg-kelp", word: "Good" },
  watch: { chip: "bg-[#fff3d6] text-[#9a6a00] ring-[#f2c14e]/60", dot: "bg-[#f2c14e]", word: "Watch" },
  bad: { chip: "bg-coral/12 text-coral-deep ring-coral/40", dot: "bg-coral", word: "Fix now" },
};

const KEY = "jas-water-test";

export default function WaterTestDecoder() {
  const [water, setWater] = useState<Water>("saltwater");
  const [vals, setVals] = useState<Record<string, string>>({});
  const params = water === "saltwater" ? SALT : FRESH;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as { water: Water; vals: Record<string, string> };
        if (s.water) setWater(s.water);
        if (s.vals) setVals(s.vals);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ water, vals }));
    } catch {}
  }, [water, vals]);

  const results = useMemo(() => {
    return params
      .map((p) => {
        const raw = vals[`${water}.${p.key}`];
        if (raw == null || raw === "") return null;
        const v = Number(raw);
        if (!Number.isFinite(v)) return null;
        return { p, v, ...p.read(v) };
      })
      .filter(Boolean) as { p: Param; v: number; level: Level; note: string; action?: string }[];
  }, [params, vals, water]);

  const counts = { bad: results.filter((r) => r.level === "bad").length, watch: results.filter((r) => r.level === "watch").length, good: results.filter((r) => r.level === "good").length };
  const verdict =
    results.length === 0
      ? null
      : counts.bad > 0
        ? { level: "bad" as Level, title: "Something needs fixing today", body: "At least one number is in the danger zone. Do the action listed, and call or text Jason with these results before adding anything else to the tank." }
        : counts.watch > 0
          ? { level: "watch" as Level, title: "Stable but drifting", body: "Nothing is on fire. A couple of numbers are heading the wrong way, which is exactly what a scheduled visit catches before it costs you fish." }
          : { level: "good" as Level, title: "Your tank is in good shape", body: "Every number you entered is where it should be. Keep the routine that got you here." };

  const smsBody = useMemo(() => {
    const lines = results.map((r) => `${r.p.label}: ${r.v}${r.p.unit ? " " + r.p.unit : ""} (${STYLE[r.level].word})`);
    const head = `Hi Jason, here are my ${water} test results from your site:`;
    return encodeURIComponent([head, ...lines, "Can you take a look?"].join("\n"));
  }, [results, water]);

  const set = (k: string, v: string) => setVals((s) => ({ ...s, [`${water}.${k}`]: v }));
  const clear = () => setVals({});

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
      <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full bg-shell p-1 ring-1 ring-[var(--line)]">
            {(["saltwater", "freshwater"] as Water[]).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWater(w)}
                className={clsx("rounded-full px-4 py-2 text-[0.9rem] font-bold capitalize transition-colors", water === w ? "bg-abyss text-white" : "text-ink-soft hover:text-abyss")}
              >
                {w}
              </button>
            ))}
          </div>
          <button type="button" onClick={clear} className="text-[0.85rem] font-semibold text-ink-soft underline-offset-4 hover:underline">
            Clear
          </button>
        </div>
        <p className="mt-4 text-[0.92rem] text-ink-soft">Enter whatever your kit gave you. Leave the rest blank.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {params.map((p) => {
            const v = vals[`${water}.${p.key}`] ?? "";
            const r = v !== "" && Number.isFinite(Number(v)) ? p.read(Number(v)) : null;
            return (
              <label key={p.key} className="block">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-[0.85rem] font-bold text-abyss">{p.label}</span>
                  <span className="text-[0.72rem] text-ink-soft">{p.hint}</span>
                </span>
                <span className="relative mt-1.5 block">
                  <input
                    type="number"
                    inputMode="decimal"
                    step={p.step ?? 1}
                    value={v}
                    onChange={(e) => set(p.key, e.target.value)}
                    className={clsx(
                      "w-full rounded-2xl border bg-shell px-4 py-3 pr-14 text-[1rem] text-ink outline-none transition focus:bg-white",
                      r ? (r.level === "bad" ? "border-coral" : r.level === "watch" ? "border-[#f2c14e]" : "border-kelp") : "border-[var(--line)] focus:border-lagoon"
                    )}
                    placeholder="—"
                  />
                  {p.unit && <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.8rem] font-semibold text-ink-soft">{p.unit}</span>}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        {!verdict ? (
          <div className="rounded-[1.75rem] bg-abyss p-8 text-white">
            <p className="eyebrow text-aqua">Your read</p>
            <p className="font-display mt-3 text-[1.6rem] leading-tight">Type a number and the read appears here</p>
            <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-white/75">
              Ranges are the ones Jason uses on client tanks in Palm Beach County. They are a guide, not a diagnosis. When in doubt, text him the results.
            </p>
          </div>
        ) : (
          <div className={clsx("rounded-[1.75rem] p-7 text-white md:p-8", verdict.level === "bad" ? "bg-[#4a1a12]" : verdict.level === "watch" ? "bg-[#3f3308]" : "bg-abyss")}>
            <p className="eyebrow text-aqua">Your read</p>
            <p className="font-display mt-3 text-[1.6rem] leading-tight md:text-[1.9rem]">{verdict.title}</p>
            <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-white/80">{verdict.body}</p>
            <ul className="mt-6 space-y-3">
              {results.map((r) => (
                <li key={r.p.key} className="rounded-2xl bg-white/8 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold">{r.p.label}</span>
                    <span className={clsx("inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.12em] ring-1", STYLE[r.level].chip)}>
                      <span className={clsx("h-1.5 w-1.5 rounded-full", STYLE[r.level].dot)} />
                      {STYLE[r.level].word}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[0.9rem] text-white/85">{r.note}</p>
                  {r.action && <p className="mt-1 text-[0.88rem] text-aqua">{r.action}</p>}
                  {r.p.target != null && r.v > r.p.target && (
                    <p className="mt-1 text-[0.85rem] text-white/70">
                      {(() => {
                        const pct = Math.min(50, Math.ceil((1 - r.p.target / r.v) * 100));
                        return pct >= 50
                          ? `Even a 50% change only gets this to ${(r.v * 0.5).toFixed(r.p.step && r.p.step < 1 ? 2 : 0)} ${r.p.unit}. Do it in two or three rounds over a week.`
                          : `A ${pct}% water change brings this to about ${r.p.target} ${r.p.unit}.`;
                      })()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2.5">
              <a href={`${site.smsHref}?&body=${smsBody}`} className="btn btn-coral w-full">
                Text these results to Jason
              </a>
              <a href={site.phoneHref} className="btn btn-foam w-full">
                <PhoneIcon /> {site.phone}
              </a>
            </div>
            <p className="mt-4 text-[0.8rem] text-white/55">Results stay on this device only. Nothing is sent until you tap the text button.</p>
          </div>
        )}
      </div>
    </div>
  );
}

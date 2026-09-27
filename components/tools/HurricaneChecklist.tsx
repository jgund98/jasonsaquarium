"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { site } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";

/**
 * Palm Beach County hurricane checklist for aquarium owners. Progress saves on
 * this device. Printable. Ends with a text to Jason to prep the tank.
 */

const phases = [
  {
    title: "The week before",
    items: [
      "Do a larger than normal water change so the tank starts the storm clean",
      "Buy or test a battery-powered air pump, ideally two, with fresh batteries",
      "Mix and store extra saltwater or conditioned freshwater in sealed containers",
      "Photograph your equipment and settings so you can restore them later",
      "If you have a generator, label which outlets run the return pump and heater",
      "Top off evaporation and check that the auto top-off reservoir is full",
    ],
  },
  {
    title: "48 hours out",
    items: [
      "Stop feeding, or feed very lightly, so there is less waste to break down",
      "Move the tank away from windows if it is small enough to move safely",
      "Clean filter socks, skimmer cup and mechanical media so nothing rots in the dark",
      "Lower the water level an inch in rimless tanks to keep sloshing inside the glass",
      "Set the air pump and airline where you can reach them without light",
    ],
  },
  {
    title: "During the outage",
    items: [
      "Run the battery air pump, one airstone per 50 gallons or so",
      "Keep the room closed, blinds down, and cover the tank with a towel to slow heat gain",
      "Do not feed and do not open the tank more than you need to",
      "Every few hours, gently stir the surface or swap in a little prepared water at the same temperature",
      "Watch for gasping at the surface or a cloudy haze; both mean oxygen is running low",
    ],
  },
  {
    title: "When the power comes back",
    items: [
      "Confirm every pump restarted and nothing lost prime or is running dry",
      "Check the temperature and let the heater or chiller catch up slowly",
      "Test ammonia and nitrite daily for three days while the filter bacteria recover",
      "Do a water change the next day, then resume light feeding",
      "Text Jason a photo and your test numbers if anything looks off",
    ],
  },
];

const KEY = "jas-hurricane";

export default function HurricaneChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(done));
    } catch {}
  }, [done]);

  const total = phases.reduce((n, p) => n + p.items.length, 0);
  const count = Object.values(done).filter(Boolean).length;
  const pct = Math.round((count / total) * 100);
  const smsBody = useMemo(
    () => encodeURIComponent(`Hi Jason, a storm is coming and I would like help getting my tank ready. I have done ${count} of ${total} items on your checklist.`),
    [count, total]
  );

  return (
    <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
      <div className="space-y-6">
        {phases.map((ph) => (
          <section key={ph.title} className="rounded-[1.75rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8">
            <h2 className="font-display text-[1.4rem] leading-tight text-abyss md:text-[1.7rem]">{ph.title}</h2>
            <ul className="mt-4 space-y-2">
              {ph.items.map((it) => {
                const k = `${ph.title}::${it}`;
                const on = !!done[k];
                return (
                  <li key={k}>
                    <label className={clsx("flex cursor-pointer items-start gap-3 rounded-2xl p-3 transition-colors", on ? "bg-kelp/8" : "hover:bg-shell")}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={(e) => setDone((d) => ({ ...d, [k]: e.target.checked }))}
                        className="mt-1 h-5 w-5 shrink-0 accent-[#2f9e6a]"
                      />
                      <span className={clsx("text-[0.98rem] leading-snug", on ? "text-ink-soft line-through decoration-kelp/60" : "text-ink")}>{it}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <aside className="flex flex-col gap-5">
        <div className="rounded-[1.75rem] bg-abyss p-7 text-white">
          <p className="eyebrow text-aqua">Progress</p>
          <p className="font-display mt-2 text-[2.4rem] leading-none">{pct}%</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-aqua transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-3 text-[0.85rem] text-white/65">
            {count} of {total} done. Saved on this device.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <a href={`${site.smsHref}?&body=${smsBody}`} className="btn btn-coral w-full">
              Ask Jason to prep my tank
            </a>
            <a href={site.phoneHref} className="btn btn-foam w-full">
              <PhoneIcon /> {site.phone}
            </a>
            <button type="button" onClick={() => window.print()} className="btn btn-glass w-full">
              Print this list
            </button>
          </div>
        </div>
        <div className="mt-auto rounded-[1.5rem] bg-mist p-5 text-[0.9rem] leading-relaxed text-ink">
          Heavily stocked reefs have hours, not days, without power. If you have coral you care about and no generator, the time to talk to Jason is before the cone appears.
        </div>
      </aside>
    </div>
  );
}

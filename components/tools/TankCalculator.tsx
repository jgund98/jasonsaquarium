"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { site } from "@/lib/site";

/**
 * Tank volume and water change calculator. Inside dimensions to gallons and
 * liters, minus displacement, then how much water a change is and how much
 * salt mix to weigh out at reef salinity.
 */

type Shape = "rect" | "cube" | "cylinder" | "bowfront";

export default function TankCalculator() {
  const [shape, setShape] = useState<Shape>("rect");
  const [L, setL] = useState("48");
  const [W, setW] = useState("18");
  const [H, setH] = useState("21");
  const [bow, setBow] = useState("4");
  const [fill, setFill] = useState("95");
  const [rock, setRock] = useState("10");
  const [change, setChange] = useState("20");
  const [salt, setSalt] = useState(true);

  const out = useMemo(() => {
    const l = Number(L), w = Number(W), h = Number(H), b = Number(bow);
    if (![l, w, h].every((v) => Number.isFinite(v) && v > 0)) return null;
    let cubicIn = 0;
    if (shape === "rect" || shape === "cube") cubicIn = l * w * h;
    else if (shape === "cylinder") cubicIn = Math.PI * (l / 2) ** 2 * h; // l = diameter
    else if (shape === "bowfront") cubicIn = (l * w + (2 / 3) * l * b) * h;
    const gross = cubicIn / 231; // US gallons
    const fillK = Math.max(0.5, Math.min(1, Number(fill) / 100 || 0.95));
    const rockK = Math.max(0, Math.min(0.5, Number(rock) / 100 || 0));
    const net = gross * fillK * (1 - rockK);
    const liters = net * 3.78541;
    const changeK = Math.max(0.05, Math.min(1, Number(change) / 100 || 0.2));
    const changeGal = net * changeK;
    const changeL = changeGal * 3.78541;
    // reef salinity 35 ppt: about 35 g salt per liter, roughly 0.29 lb per US gallon
    const saltLb = changeGal * 0.29;
    const saltCups = changeGal * 0.5; // the common label rule of thumb
    return { gross, net, liters, changeGal, changeL, saltLb, saltCups };
  }, [shape, L, W, H, bow, fill, rock, change]);

  const smsBody = out
    ? encodeURIComponent(`Hi Jason, my tank is about ${out.net.toFixed(0)} gallons (${shape}, ${L}x${W}x${H} in). Can you quote me for service?`)
    : "";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
      <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8">
        <p className="text-[0.85rem] font-bold uppercase tracking-[0.16em] text-lagoon">Shape</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {([
            ["rect", "Rectangle"],
            ["cube", "Cube"],
            ["bowfront", "Bow front"],
            ["cylinder", "Cylinder"],
          ] as [Shape, string][]).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setShape(k)}
              aria-pressed={shape === k}
              className={clsx("rounded-2xl px-3 py-3 text-[0.9rem] font-semibold transition-colors", shape === k ? "bg-abyss text-white" : "bg-shell text-ink ring-1 ring-[var(--line)] hover:bg-mist")}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="mt-6 text-[0.85rem] font-bold uppercase tracking-[0.16em] text-lagoon">Inside measurements in inches</p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <Field label={shape === "cylinder" ? "Diameter" : "Length"} value={L} onChange={setL} />
          {shape !== "cylinder" && <Field label="Width" value={W} onChange={setW} />}
          <Field label="Height" value={H} onChange={setH} />
          {shape === "bowfront" && <Field label="Bow depth" value={bow} onChange={setBow} />}
        </div>

        <p className="mt-6 text-[0.85rem] font-bold uppercase tracking-[0.16em] text-lagoon">Real-world adjustments</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Field label="Filled to (%)" value={fill} onChange={setFill} hint="Most tanks run 90 to 95" />
          <Field label="Rock and sand (%)" value={rock} onChange={setRock} hint="Reefs 10 to 20" />
        </div>

        <p className="mt-6 text-[0.85rem] font-bold uppercase tracking-[0.16em] text-lagoon">Water change</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:items-end">
          <Field label="Change (%)" value={change} onChange={setChange} hint="10 to 25 is typical" />
          <label className="flex items-center gap-3 rounded-2xl bg-shell px-4 py-3 ring-1 ring-[var(--line)]">
            <input type="checkbox" checked={salt} onChange={(e) => setSalt(e.target.checked)} className="h-5 w-5 accent-[#12a6c9]" />
            <span className="text-[0.92rem] font-semibold text-ink">Saltwater tank</span>
          </label>
        </div>
      </div>

      <div>
        <div className="rounded-[1.75rem] bg-abyss p-7 text-white md:p-8">
          <p className="eyebrow text-aqua">Your tank</p>
          {!out ? (
            <p className="font-display mt-3 text-[1.6rem] leading-tight">Enter the inside dimensions</p>
          ) : (
            <>
              <p className="font-display mt-3 text-[2.6rem] leading-none md:text-[3.2rem]">
                {out.net.toFixed(0)} <span className="text-[1.4rem] text-white/70">gallons of water</span>
              </p>
              <p className="mt-2 text-[0.92rem] text-white/70">
                {out.liters.toFixed(0)} liters. Empty box volume {out.gross.toFixed(0)} gallons before fill level and rock.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Stat label={`${change}% water change`} value={`${out.changeGal.toFixed(1)} gal`} sub={`${out.changeL.toFixed(0)} liters to mix or condition`} />
                {salt ? (
                  <Stat label="Salt mix for that change" value={`${out.saltLb.toFixed(1)} lb`} sub={`about ${out.saltCups.toFixed(1)} cups at reef salinity. Check your salt's label and a refractometer.`} />
                ) : (
                  <Stat label="Conditioner" value="Dose for the change volume" sub="Palm Beach County water is chloramine treated, so use a conditioner that handles chloramine, not just chlorine." />
                )}
              </div>
              <p className="mt-5 text-pretty text-[0.9rem] leading-relaxed text-white/70">
                Bigger tanks are more stable and cost more per change. Both matter when you decide how often to service it.
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <a href={`${site.smsHref.split("?")[0]}?&body=${smsBody}`} className="btn btn-coral w-full">
                  Text Jason this tank size for a quote
                </a>
                <a href={site.phoneHref} className="btn btn-foam w-full">
                  Call {site.phone}
                </a>
              </div>
            </>
          )}
        </div>
        <div className="mt-5 rounded-[1.5rem] bg-mist p-5 text-[0.9rem] leading-relaxed text-ink">Measure inside the glass, not the outside of the frame, and use the real water line. Rock, sand and a sump all change the true volume, which is why two tanks sold as the same size can need very different water changes.</div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <label className="block">
      <span className="text-[0.85rem] font-bold text-abyss">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-2xl border border-[var(--line)] bg-shell px-4 py-3 text-[1rem] text-ink outline-none transition focus:border-lagoon focus:bg-white"
      />
      {hint && <span className="mt-1 block text-[0.75rem] text-ink-soft">{hint}</span>}
    </label>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-white/8 p-4">
      <p className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-aqua">{label}</p>
      <p className="font-display mt-1 text-[1.5rem] leading-tight">{value}</p>
      <p className="mt-1 text-[0.82rem] leading-snug text-white/65">{sub}</p>
    </div>
  );
}

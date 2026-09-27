"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Header";

/**
 * Three quick steps, nothing to bounce on.
 *  1. What kind of tank (prefilled to saltwater/reef, Jason's #1)
 *  2. What it needs (tap chips)
 *  3. Where to send the answer ("first name is fine")
 */

const tankTypes = [
  { k: "reef", label: "Saltwater or reef" },
  { k: "freshwater", label: "Freshwater" },
  { k: "planted", label: "Planted" },
  { k: "pond", label: "Pond" },
  { k: "new", label: "No tank yet" },
  { k: "unsure", label: "Not sure" },
];

const sizes = ["Under 30 gal", "30 to 75 gal", "75 to 150 gal", "150 to 300 gal", "300+ gal", "Pond"];

const needs = [
  "Regular cleaning and maintenance",
  "One-time cleaning",
  "New tank design and install",
  "Tank upgrade or replacement",
  "Something is wrong with my tank",
  "Fish or coral selection",
  "Pond service",
  "Office or lobby tank",
  "Emergency",
];

const where = ["Home", "Office or business", "Condo or high-rise", "Other"];

export default function QuoteForm({ defaultNeed, city }: { defaultNeed?: string; city?: string }) {
  const [step, setStep] = useState(0);
  const [tank, setTank] = useState("");
  const [size, setSize] = useState("");
  const [need, setNeed] = useState<string[]>(defaultNeed ? [defaultNeed] : []);
  const [place, setPlace] = useState("Home");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState(city ?? "");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [hp, setHp] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [done]);

  const go = (n: number) => {
    setStep(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggle = (v: string) => setNeed((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const submit = async () => {
    if (hp) return;
    if (!name.trim() || !phone.trim()) {
      setErr("A first name and a phone number are all Jason needs.");
      return;
    }
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "quote",
          name,
          phone,
          email: email || undefined,
          message: notes || undefined,
          fields: {
            "Tank type": tankTypes.find((t) => t.k === tank)?.label ?? tank,
            "Tank size": size || "Not given",
            "Needs": need.join(", ") || "Not given",
            "Location type": place,
            "City": town || "Not given",
          },
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error("bad");
      setDone(true);
    } catch {
      setErr(`Something went wrong sending this. Call or text Jason directly at ${site.phone}.`);
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div ref={doneRef} className="rounded-[1.75rem] bg-abyss p-8 text-center text-white md:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-kelp/25 text-[#8ff0bd]">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.6">
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display mt-6 text-balance text-[1.8rem] leading-tight md:text-[2.2rem]">
          Got it {name.trim().split(" ")[0]}. Jason will text you back.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-pretty text-[1.02rem] leading-relaxed text-white/80">
          Usually the same day. If it cannot wait, the fast lane is his cell.
        </p>
        <a href={site.phoneHref} className="btn btn-foam mt-7">
          <PhoneIcon /> {site.phone}
        </a>
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-28 rounded-[1.75rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-9">
      {/* progress */}
      <ol className="flex items-center gap-2" aria-label="Progress">
        {["Your tank", "What it needs", "Where to reach you"].map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              className={clsx(
                "h-1.5 flex-1 rounded-full transition-colors duration-500",
                i <= step ? "bg-lagoon" : "bg-mist"
              )}
            />
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-lagoon">
        Step {step + 1} of 3
      </p>

      {step === 0 && (
        <div className="mt-4">
          <h3 className="font-display text-[1.6rem] leading-tight text-abyss md:text-[1.9rem]">What kind of tank are we talking about</h3>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {tankTypes.map((t) => (
              <Chip key={t.k} on={tank === t.k} onClick={() => setTank(t.k)}>
                {t.label}
              </Chip>
            ))}
          </div>
          <p className="mt-6 text-[0.85rem] font-bold uppercase tracking-[0.16em] text-ink-soft">Roughly how big</p>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {sizes.map((s) => (
              <Chip key={s} on={size === s} onClick={() => setSize(size === s ? "" : s)}>
                {s}
              </Chip>
            ))}
          </div>
          <div className="mt-7 flex justify-end">
            <button type="button" onClick={() => go(1)} disabled={!tank} className="btn btn-abyss disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-4">
          <h3 className="font-display text-[1.6rem] leading-tight text-abyss md:text-[1.9rem]">What does it need</h3>
          <p className="mt-1 text-[0.95rem] text-ink-soft">Tap everything that applies.</p>
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {needs.map((n) => (
              <Chip key={n} on={need.includes(n)} onClick={() => toggle(n)}>
                {n}
              </Chip>
            ))}
          </div>
          {need.includes("Emergency") && (
            <div className="mt-5 rounded-2xl bg-coral/10 p-4 text-[0.95rem] text-ink">
              <p className="font-bold text-coral-deep">If this is happening right now, do not wait on a form.</p>
              <a href={site.phoneHref} className="btn btn-coral mt-3 w-full sm:w-auto">Call Jason now {site.phone}</a>
            </div>
          )}
          <p className="mt-6 text-[0.85rem] font-bold uppercase tracking-[0.16em] text-ink-soft">Where is the tank</p>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {where.map((w) => (
              <Chip key={w} on={place === w} onClick={() => setPlace(w)}>
                {w}
              </Chip>
            ))}
          </div>
          <div className="mt-7 flex justify-between">
            <button type="button" onClick={() => go(0)} className="btn btn-foam ring-1 ring-[var(--line)]">
              Back
            </button>
            <button type="button" onClick={() => go(2)} className="btn btn-abyss">
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <h3 className="font-display text-[1.6rem] leading-tight text-abyss md:text-[1.9rem]">Where should Jason send the answer</h3>
          <p className="mt-1 text-[0.95rem] text-ink-soft">First name is fine.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field label="First name" value={name} onChange={setName} autoComplete="given-name" required />
            <Field label="Phone" value={phone} onChange={setPhone} type="tel" autoComplete="tel" required />
            <Field label="Email (optional)" value={email} onChange={setEmail} type="email" autoComplete="email" />
            <Field label="City or town" value={town} onChange={setTown} autoComplete="address-level2" />
          </div>
          <label className="mt-3 block">
            <span className="text-[0.85rem] font-bold text-abyss">Anything else Jason should know (optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1.5 w-full rounded-2xl border border-[var(--line)] bg-shell px-4 py-3 text-[0.98rem] text-ink outline-none transition focus:border-lagoon focus:bg-white"
              placeholder="Cloudy water for two weeks, tank in the living room, dog is friendly."
            />
          </label>
          <input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" name="company_website" aria-hidden="true" />
          {err && <p className="mt-3 rounded-2xl bg-coral/10 px-4 py-3 text-[0.92rem] font-semibold text-coral-deep">{err}</p>}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => go(1)} className="btn btn-foam ring-1 ring-[var(--line)]">
              Back
            </button>
            <button type="submit" disabled={busy} className="btn btn-coral disabled:opacity-60">
              {busy ? "Sending" : "Send to Jason"}
            </button>
          </div>
          <p className="mt-4 text-center text-[0.85rem] text-ink-soft sm:text-right">
            Or skip the form and{" "}
            <a href={site.smsHref} className="font-bold text-abyss underline-offset-4 hover:underline">
              text {site.phone}
            </a>
          </p>
        </form>
      )}
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={clsx(
        "rounded-2xl px-4 py-3.5 text-left text-[0.95rem] font-semibold leading-snug transition-all duration-300",
        on ? "bg-abyss text-white shadow-[0_12px_30px_-14px_rgba(4,33,58,0.7)]" : "bg-shell text-ink ring-1 ring-[var(--line)] hover:bg-mist"
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.85rem] font-bold text-abyss">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="mt-1.5 w-full rounded-2xl border border-[var(--line)] bg-shell px-4 py-3 text-[0.98rem] text-ink outline-none transition focus:border-lagoon focus:bg-white"
      />
    </label>
  );
}

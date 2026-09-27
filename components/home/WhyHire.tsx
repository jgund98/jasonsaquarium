"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, Reveal, SectionHead } from "@/components/Section";
import { site } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";
import { FishBullet } from "@/components/Brand";

/**
 * "Twelve weeks without a visit." Drag the slider and watch the same tank age
 * two ways: left alone, and on Jason's schedule. Full width, no columns to
 * fall out of balance.
 */

function mix(a: string, b: string, t: number) {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
}

function Tank({ t, label, good }: { t: number; label: string; good: boolean }) {
  const k = good ? 0 : t;
  const water = mix("#1fb3e0", "#5f7f2e", k);
  const deep = mix("#0f5f8f", "#3d5220", k);
  const fishA = 1 - k * 0.75;
  const coral = mix("#ff6a4d", "#7a6a55", k);
  const coral2 = mix("#c084fc", "#6b6b5a", k);
  return (
    <div className="relative">
      <svg viewBox="0 0 320 200" className="w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`w-${good}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={water} />
            <stop offset="1" stopColor={deep} />
          </linearGradient>
        </defs>
        <rect x="18" y="176" width="284" height="14" rx="4" fill="#1a1210" />
        <rect x="22" y="24" width="276" height="152" rx="6" fill={`url(#w-${good})`} style={{ transition: "fill 0.4s" }} />
        <path d="M22 158 Q100 148 160 156 T298 154 V176 H22 Z" fill={mix("#e7d9b8", "#8d8a5e", k)} />
        <ellipse cx="90" cy="156" rx="40" ry="16" fill={mix("#3a5a80", "#4a4a3a", k)} />
        <ellipse cx="230" cy="158" rx="46" ry="18" fill={mix("#2f4f75", "#454537", k)} />
        <g stroke={coral} strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M84 146 v-30 M84 126 l-12 -14 M84 132 l12 -16 M72 112 l-6 -10 M96 116 l8 -12" />
        </g>
        <g stroke={coral2} strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M236 148 v-24 M236 134 l-10 -12 M236 138 l12 -14" />
        </g>
        <g opacity={fishA} style={{ transition: "opacity 0.4s" }}>
          <path d="M150 80 c12 -14 32 -14 44 0 c-12 14 -32 14 -44 0z" fill="#ffd23a" />
          <path d="M194 80 l14 -9 l-3 9 l3 9z" fill="#ffe680" />
          <circle cx="160" cy="78" r="2" fill="#04213a" />
          <path d="M120 118 c8 -9 22 -9 30 0 c-8 9 -22 9 -30 0z" fill="#2f7dff" />
          <path d="M150 118 l10 -6 l-2 6 l2 6z" fill="#ffd23a" />
          <path d="M210 100 c8 -9 22 -9 30 0 c-8 9 -22 9 -30 0z" fill="#ff7a2a" />
          <path d="M240 100 l10 -6 l-2 6 l2 6z" fill="#ff9a4a" />
        </g>
        <g opacity={k * 0.85} style={{ transition: "opacity 0.4s" }}>
          <ellipse cx="60" cy="60" rx="34" ry="22" fill="#5b7a2a" opacity="0.55" />
          <ellipse cx="250" cy="52" rx="42" ry="20" fill="#4f6d24" opacity="0.5" />
          <ellipse cx="150" cy="140" rx="60" ry="14" fill="#5b7a2a" opacity="0.4" />
          <rect x="22" y="24" width="276" height="152" rx="6" fill="#3f5a1c" opacity={k * 0.25} />
        </g>
        <rect x="22" y="24" width="276" height="152" rx="6" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
        <path d="M30 32 l40 0" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />
        <rect x="18" y="8" width="284" height="12" rx="6" fill="#0a3b61" />
        <rect x="30" y="12" width="260" height="4" rx="2" fill={good ? "#8ff2ff" : mix("#8ff2ff", "#3a6a5a", k)} />
      </svg>
      <div className="mt-2 flex items-center justify-between gap-3 text-[0.85rem]">
        <span className="font-bold text-abyss">{label}</span>
        <span className={good ? "font-semibold text-kelp" : k > 0.66 ? "font-semibold text-coral-deep" : k > 0.33 ? "font-semibold text-[#9a6a00]" : "font-semibold text-kelp"}>
          {good ? "Clear and stable" : k > 0.66 ? "Coral browning and fish stressed" : k > 0.33 ? "Algae taking hold" : "Looks fine so far"}
        </span>
      </div>
    </div>
  );
}

const points = [
  ["Tanks fail slowly and then all at once.", "Nitrate creeps, alkalinity drifts, a pump gets a little louder. Nobody notices for a month, then the coral browns out or the fish start dying. A weekly set of test results is the only early warning there is."],
  ["The animals are worth more than the service.", "A stocked reef holds hundreds to thousands of dollars of coral and fish. One missed problem can cost more than a year of visits, and the animals cannot be replaced by a refund."],
  ["You bought the tank to enjoy it.", "Not to haul buckets on Sunday. A scheduled visit gives you the tank you pictured when you bought it, every week."],
  ["Guessing is the expensive part.", "The internet has ten answers for every cloudy tank and nine are wrong for yours. Jason has seen the problem before, on a tank like yours, in the same water."],
];

const fits = [
  "You own a saltwater or reef tank and the chemistry makes you nervous",
  "You travel or live here part of the year",
  "You have a tank in an office, lobby or waiting room",
  "You inherited a tank with the house",
  "You love the hobby and want a pro on the chores",
];

export default function WhyHire() {
  const [week, setWeek] = useState(6);
  const t = week / 12;
  return (
    <section className="relative bg-white py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Still doing it yourself"
          title="Twelve weeks is all it takes"
          lede="Drag the weeks. This is the same tank two ways: left alone between the weekends you had time, and on a schedule with someone reading the water."
        />

        <Reveal className="mt-12 rounded-[1.75rem] bg-shell p-5 ring-1 ring-[var(--line)] md:mt-14 md:p-8">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <Tank t={t} label="Nobody watching" good={false} />
            <Tank t={t} label="On Jason's schedule" good />
          </div>
          <div className="mt-6 md:mx-auto md:max-w-3xl">
            <div className="flex items-center justify-between text-[0.8rem] font-bold uppercase tracking-[0.16em] text-ink-soft">
              <span>Week 0</span>
              <span className="rounded-full bg-abyss px-3 py-1 text-white">Week {week}</span>
              <span>Week 12</span>
            </div>
            <input
              type="range"
              min={0}
              max={12}
              value={week}
              onChange={(e) => setWeek(Number(e.target.value))}
              aria-label="Weeks without service"
              className="mt-3 w-full accent-[#ff6a4d]"
            />
            <p className="mt-3 text-center text-[0.92rem] leading-relaxed text-ink-soft">
              {week < 3 && "Nothing looks wrong yet. This is when problems start."}
              {week >= 3 && week < 7 && "Nitrate and phosphate are up. Algae has a foothold on the glass and rock."}
              {week >= 7 && week < 10 && "Coral is losing color. Fish are breathing harder than they should."}
              {week >= 10 && "This is the tank people call about. It is fixable, but it did not have to happen."}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <Reveal delay={60} className="space-y-5">
            {points.map(([lead, body]) => (
              <p key={lead} className="text-pretty text-[1.02rem] leading-relaxed text-ink-soft">
                <span className="font-bold text-abyss">{lead}</span> {body}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120} className="flex flex-col">
            <p className="eyebrow text-lagoon">This is for you if</p>
            <ul className="mt-3 space-y-2 text-[0.98rem] text-ink">
              {fits.map((f) => (
                <li key={f} className="flex gap-3">
                  <FishBullet />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-pretty text-[0.95rem] leading-relaxed text-ink-soft">
              One visit tells you where your tank actually stands. No contract, no minimum, and Jason will say so if it needs less than you think.
            </p>
            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <Link href="/contact" className="btn btn-coral">
                Book a first visit
              </Link>
              <a href={site.phoneHref} className="btn btn-abyss">
                <PhoneIcon /> {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

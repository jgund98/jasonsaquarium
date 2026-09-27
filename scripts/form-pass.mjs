import fs from "node:fs";
let s = fs.readFileSync("components/QuoteForm.tsx", "utf8");
const o = s;

// icons + tank scale helpers
s = s.replace(
  `const tankTypes = [`,
  `const ICONS: Record<string, React.ReactNode> = {
  reef: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 21v-9M12 12l-4-5M12 12l4-6M8 7l-2-2M16 6l3-2M12 21c-4 0-7-1-7-1M12 21c4 0 7-1 7-1" />
    </svg>
  ),
  freshwater: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12c3-5 10-5 14 0-4 5-11 5-14 0z" /><path d="M17 12l4-3-1 3 1 3z" /><circle cx="7" cy="11" r="0.8" fill="currentColor" />
    </svg>
  ),
  planted: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21V9M12 13c-4 0-7-3-7-8 5 0 7 3 7 8zM12 11c4 0 7-3 7-8-5 0-7 3-7 8z" />
    </svg>
  ),
  pond: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="14" rx="9" ry="5" /><path d="M12 9a4 4 0 0 1 4 4l-4 1-4-1a4 4 0 0 1 4-4z" /><path d="M6 4c2 1 2 3 0 4M18 4c-2 1-2 3 0 4" />
    </svg>
  ),
  new: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="7" width="18" height="12" rx="2" /><path d="M12 10v6M9 13h6" />
    </svg>
  ),
  unsure: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5M12 17h.01" />
    </svg>
  ),
};

function TankScale({ i, on }: { i: number; on: boolean }) {
  if (i === 5) {
    return (
      <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
        <ellipse cx="32" cy="26" rx="26" ry="9" fill={on ? "#33d6f2" : "#cfe9f0"} stroke={on ? "#04213a" : "#8fb3c0"} strokeWidth="2" />
        <path d="M22 24c2-6 8-8 12-5-3 1-4 3-4 6z" fill={on ? "#2f9e6a" : "#9cc9b3"} />
      </svg>
    );
  }
  const w = 22 + i * 8;
  const h = 14 + i * 5;
  return (
    <svg viewBox="0 0 64 40" className="h-10 w-16" aria-hidden="true">
      <rect x={32 - w / 2} y={36 - h} width={w} height={h} rx="2" fill={on ? "#33d6f2" : "#cfe9f0"} stroke={on ? "#04213a" : "#8fb3c0"} strokeWidth="2" />
      <rect x={32 - w / 2} y={36 - h - 3} width={w} height="3" rx="1" fill={on ? "#04213a" : "#8fb3c0"} />
      <rect x={32 - w / 2 + 3} y={36 - h + 3} width={Math.max(4, w * 0.25)} height="2" rx="1" fill="#fff" opacity="0.6" />
    </svg>
  );
}

const tankTypes = [`
);

// progress: three fish
s = s.replace(
  `      <ol className="flex items-center gap-2" aria-label="Progress">
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
      </p>`,
  `      <ol className="flex items-center" aria-label="Progress">
        {["Your tank", "What it needs", "Where to reach you"].map((label, i) => (
          <li key={label} className="flex flex-1 items-center">
            <span className={clsx("flex items-center gap-2 transition-opacity duration-500", i <= step ? "opacity-100" : "opacity-35")}>
              <span className="grid h-8 w-9 place-items-center">
                <FishMark className={clsx("h-6 w-7 transition-transform duration-500", i === step && "scale-110")} id={\`step\${i}\`} />
              </span>
              <span className="hidden text-[0.72rem] font-bold uppercase tracking-[0.16em] text-abyss sm:inline">{label}</span>
            </span>
            {i < 2 && <span className={clsx("mx-3 h-[2px] flex-1 rounded-full transition-colors duration-500", i < step ? "bg-lagoon" : "bg-mist")} />}
          </li>
        ))}
      </ol>`
);

// tank type chips with icons
s = s.replace(
  `          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {tankTypes.map((t) => (
              <Chip key={t.k} on={tank === t.k} onClick={() => setTank(t.k)}>
                {t.label}
              </Chip>
            ))}
          </div>`,
  `          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {tankTypes.map((t) => (
              <button
                key={t.k}
                type="button"
                onClick={() => setTank(t.k)}
                aria-pressed={tank === t.k}
                className={clsx(
                  "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-[0.95rem] font-semibold leading-snug transition-all duration-300",
                  tank === t.k ? "bg-abyss text-white shadow-[0_12px_30px_-14px_rgba(4,33,58,0.7)]" : "bg-shell text-ink ring-1 ring-[var(--line)] hover:bg-mist"
                )}
              >
                <span className={clsx("shrink-0", tank === t.k ? "text-aqua" : "text-lagoon")}>{ICONS[t.k]}</span>
                {t.label}
              </button>
            ))}
          </div>`
);

// size scale
s = s.replace(
  `          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {sizes.map((s) => (
              <Chip key={s} on={size === s} onClick={() => setSize(size === s ? "" : s)}>
                {s}
              </Chip>
            ))}
          </div>`,
  `          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {sizes.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(size === s ? "" : s)}
                aria-pressed={size === s}
                className={clsx(
                  "flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-center text-[0.8rem] font-semibold leading-tight transition-all duration-300",
                  size === s ? "bg-abyss text-white" : "bg-shell text-ink ring-1 ring-[var(--line)] hover:bg-mist"
                )}
              >
                <TankScale i={i} on={size === s} />
                {s}
              </button>
            ))}
          </div>`
);

s = s.replace(`import { PhoneIcon } from "./Header";`, `import { PhoneIcon } from "./Header";\nimport { FishMark } from "./Logo";`);

if (s === o) console.log("NOCHANGE");
fs.writeFileSync("components/QuoteForm.tsx", s);
console.log("form pass done", s.includes("TankScale") && s.includes("ICONS[t.k]") && s.includes("step${i}"));

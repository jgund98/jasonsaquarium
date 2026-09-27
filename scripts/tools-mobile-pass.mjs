import fs from "node:fs";
const rw = (f, pairs) => {
  let s = fs.readFileSync(f, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) {
      console.log("MISS", f, JSON.stringify(a.slice(0, 60)));
      continue;
    }
    s = s.replace(a, b);
  }
  fs.writeFileSync(f, s);
};

// Shared: a floating pill on phones that jumps to the result panel
const PILL = (label) => `        <a
          href="#tool-result"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("tool-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+5.2rem)] left-1/2 z-30 -translate-x-1/2 rounded-full bg-coral px-5 py-3 text-[0.9rem] font-bold text-white shadow-[0_18px_40px_-14px_rgba(255,106,77,0.8)] lg:hidden"
        >
          ${label}
        </a>`;

// ---------- SchedulePlanner ----------
rw("components/tools/SchedulePlanner.tsx", [
  [`import { useMemo, useState } from "react";`, `import { useEffect, useMemo, useRef, useState } from "react";`],
  [
    `  const smsBody = plan\n    ? encodeURIComponent(`,
    `  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (plan && window.matchMedia("(max-width: 1023px)").matches) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // only when the plan first appears
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan !== null]);

  const smsBody = plan\n    ? encodeURIComponent(`,
  ],
  [
    `      <div className="space-y-7 rounded-[1.75rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8">`,
    `      <div className="grid gap-7 rounded-[1.75rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8 lg:grid-cols-2 lg:gap-x-8">`,
  ],
  [`      <div>\n        {!plan ? (`, `      <div ref={resultRef} id="tool-result" className="scroll-mt-28">\n        {!plan ? (`],
]);

// ---------- WaterTestDecoder ----------
rw("components/tools/WaterTestDecoder.tsx", [
  [`      <div>\n        {!verdict ? (`, `      <div id="tool-result" className="scroll-mt-28">\n        {results.length > 0 && !scrolledOnce && (\n${PILL("See your read")}\n        )}\n        {!verdict ? (`],
  [`  const [vals, setVals] = useState<Record<string, string>>({});`, `  const [vals, setVals] = useState<Record<string, string>>({});\n  const [scrolledOnce, setScrolledOnce] = useState(false);\n  useEffect(() => {\n    const el = document.getElementById("tool-result");\n    if (!el) return;\n    const io = new IntersectionObserver((e) => { if (e[0]?.isIntersecting) setScrolledOnce(true); else setScrolledOnce(false); }, { threshold: 0.2 });\n    io.observe(el);\n    return () => io.disconnect();\n  }, []);`],
]);

// ---------- TankCalculator ----------
rw("components/tools/TankCalculator.tsx", [
  [`import { useMemo, useState } from "react";`, `import { useEffect, useMemo, useState } from "react";`],
  [`  const [salt, setSalt] = useState(true);`, `  const [salt, setSalt] = useState(true);\n  const [inView, setInView] = useState(false);\n  useEffect(() => {\n    const el = document.getElementById("tool-result");\n    if (!el) return;\n    const io = new IntersectionObserver((e) => setInView(!!e[0]?.isIntersecting), { threshold: 0.2 });\n    io.observe(el);\n    return () => io.disconnect();\n  }, []);`],
  [`      <div>\n        <div className="rounded-[1.75rem] bg-abyss p-7 text-white md:p-8">\n          <p className="eyebrow text-aqua">Your tank</p>`, `      <div id="tool-result" className="scroll-mt-28">\n        {out && !inView && (\n${PILL("See your tank size")}\n        )}\n        <div className="rounded-[1.75rem] bg-abyss p-7 text-white md:p-8">\n          <p className="eyebrow text-aqua">Your tank</p>`],
  [
    `      <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8">\n        <p className="text-[0.85rem] font-bold uppercase tracking-[0.16em] text-lagoon">Shape</p>`,
    `      <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-[var(--line)] md:p-8">\n        <p className="text-[0.85rem] font-bold uppercase tracking-[0.16em] text-lagoon">Shape</p>`,
  ],
]);
console.log("tools mobile pass done");

import clsx from "clsx";
import { FishMark } from "./Logo";

/** Tiny brand fish used as a list bullet. */
export function FishBullet({ className }: { className?: string }) {
  return (
    <span className={clsx("mt-[3px] inline-block h-4 w-[18px] shrink-0", className)} aria-hidden="true">
      <FishMark className="h-full w-full" id="bullet" />
    </span>
  );
}

export function FishList({
  items,
  tone = "light",
  className,
  size = "md",
}: {
  items: readonly string[];
  tone?: "light" | "dark";
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <ul className={clsx("space-y-2.5", className)}>
      {items.map((it) => (
        <li key={it} className={clsx("flex gap-3 leading-snug", size === "sm" ? "text-[0.92rem]" : "text-[0.98rem]", tone === "dark" ? "text-white/90" : "text-ink")}>
          <FishBullet />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** A tinted note that breaks up a run of paragraphs. */
export function Callout({
  eyebrow,
  children,
  tone = "mist",
  className,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  tone?: "mist" | "abyss" | "coral";
  className?: string;
}) {
  const styles = {
    mist: "bg-mist text-ink ring-1 ring-lagoon/20",
    abyss: "bg-abyss text-white",
    coral: "bg-coral text-white",
  }[tone];
  const eye = { mist: "text-sea", abyss: "text-aqua", coral: "text-white/85" }[tone];
  return (
    <div className={clsx("relative overflow-hidden rounded-[1.5rem] p-6 md:p-7", styles, className)}>
      <FishMark className="pointer-events-none absolute -right-4 -top-3 h-24 w-28 opacity-[0.12]" id={`co-${tone}`} />
      {eyebrow && <p className={clsx("eyebrow mb-2", eye)}>{eyebrow}</p>}
      <div className="relative text-pretty text-[1rem] leading-relaxed">{children}</div>
    </div>
  );
}

/** Large faint brand fish for the corner of a dark section. */
export function Watermark({ className }: { className?: string }) {
  return (
    <FishMark
      className={clsx("pointer-events-none absolute -right-16 top-10 h-[22rem] w-[26rem] opacity-[0.06] md:-right-10", className)}
      id="wm-bg"
    />
  );
}

/** Scrolling brand strip: what Jason services, separated by the mark. */
const words = ["Reef tanks", "Saltwater", "Freshwater", "Planted tanks", "Koi ponds", "Cleaning", "Installation", "Assessments", "Emergencies", "Palm Beach County"];
export function BrandBand({ tone = "light" }: { tone?: "light" | "dark" }) {
  const row = [...words, ...words];
  return (
    <div className={clsx("overflow-hidden border-y py-4", tone === "dark" ? "border-white/10 bg-abyss text-white" : "border-[var(--line)] bg-shell text-abyss")} style={{ ["--marquee-dur" as string]: "60s" }}>
      <div className="marquee-track items-center gap-6 pl-6 text-[0.8rem] font-bold uppercase tracking-[0.2em]">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap">
            {w}
            <FishMark className="h-4 w-[18px]" id={`bb${i}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

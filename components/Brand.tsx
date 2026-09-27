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

/** Outline-only fish for decorative corners: reads as a fish at any opacity. */
export function FishOutline({ className, stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 44 40" className={className} aria-hidden="true" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M3 20.5 C9.5 9.5 23.5 9.5 31.5 20.5 C23.5 31.5 9.5 31.5 3 20.5 Z" />
      <path d="M30.5 20.5 L39 13.5 L36.8 20.5 L39 27.5 Z" />
      <path d="M12 14.5 C16 11 22 11 26 14.5" />
      <circle cx="10.5" cy="18.6" r="1.6" fill={stroke} stroke="none" />
      <circle cx="36" cy="7.5" r="2.1" />
      <circle cx="40.5" cy="3.4" r="1.2" />
    </svg>
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
    <div className={clsx("relative overflow-hidden rounded-[1.5rem] border-l-4 p-6 md:p-7", tone === "mist" ? "border-coral" : "border-aqua", styles, className)}>
      {eyebrow && <p className={clsx("eyebrow mb-2", eye)}>{eyebrow}</p>}
      <div className="relative text-pretty text-[1rem] leading-relaxed">{children}</div>
    </div>
  );
}

/** Large faint brand fish for the corner of a dark section. */
export function Watermark({ className }: { className?: string }) {
  void className;
  return null;
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

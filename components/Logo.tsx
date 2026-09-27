import Link from "next/link";
import clsx from "clsx";

export function FishMark({ className, id = "fm" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 44 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#33d6f2" />
          <stop offset="1" stopColor="#0f5f8f" />
        </linearGradient>
      </defs>
      <path d="M3 20.5 C9.5 9.5 23.5 9.5 31.5 20.5 C23.5 31.5 9.5 31.5 3 20.5 Z" fill={`url(#${id}-body)`} />
      <path d="M30.5 20.5 L39 13.5 L36.8 20.5 L39 27.5 Z" fill="#ff6a4d" />
      <circle cx="10.5" cy="18.6" r="1.9" fill="#04213a" />
      <circle cx="11.1" cy="18" r="0.6" fill="#fff" />
      <circle cx="36" cy="7.5" r="2.1" fill="none" stroke="#33d6f2" strokeWidth="1.4" />
      <circle cx="40.5" cy="3.4" r="1.2" fill="none" stroke="#33d6f2" strokeWidth="1.2" />
    </svg>
  );
}

export default function Logo({
  tone = "dark",
  className,
  compact = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  compact?: boolean;
}) {
  const ink = tone === "light" ? "text-white" : "text-abyss";
  return (
    <Link
      href="/"
      aria-label="Jason's Aquarium Service, home"
      className={clsx("inline-flex items-center gap-2.5 select-none", className)}
    >
      <FishMark className={clsx("shrink-0", compact ? "h-7 w-8 sm:h-9 sm:w-10" : "h-11 w-12")} id={tone} />
      <span
        className={clsx(
          "font-logo whitespace-nowrap leading-none",
          ink,
          compact ? "text-[1.05rem] sm:text-[1.42rem]" : "text-[1.3rem] sm:text-[1.7rem]"
        )}
      >
        Jason&rsquo;s Aquarium Service
      </span>
    </Link>
  );
}

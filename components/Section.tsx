"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import clsx from "clsx";

/** Scroll reveal with plain CSS transitions (GPU only, reduced-motion aware). */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  y = 24,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "figure" | "span";
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setOn(true);
            if (once) io.disconnect();
          } else if (!once) setOn(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  const Comp = Tag as unknown as "div";
  return (
    <Comp
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={clsx("will-change-[transform,opacity]", className)}
      style={
        {
          transition: `opacity 0.9s var(--ease-water) ${delay}ms, transform 0.9s var(--ease-water) ${delay}ms`,
          opacity: on ? 1 : 0,
          transform: on ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
        } as CSSProperties
      }
    >
      {children}
    </Comp>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal className={clsx(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && (
        <p className={clsx("eyebrow mb-4", dark ? "text-aqua" : "text-lagoon")}>{eyebrow}</p>
      )}
      <h2
        className={clsx(
          "font-display text-balance text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.04]",
          dark ? "text-white" : "text-abyss"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={clsx(
            "mt-5 text-pretty text-[1.05rem] leading-relaxed md:text-[1.12rem]",
            dark ? "text-white/75" : "text-ink-soft"
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}

/** Rising bubbles for dark sections. Pure CSS, GPU transforms only. */
export function Bubbles({ count = 14, className }: { count?: number; className?: string }) {
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <div aria-hidden="true" className={clsx("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {items.map((i) => {
        const left = (i * 37) % 100;
        const size = 4 + ((i * 7) % 9);
        const dur = 14 + ((i * 5) % 12);
        const delay = -((i * 3.7) % dur);
        const dx = ((i % 3) - 1) * 40;
        return (
          <span
            key={i}
            className="absolute bottom-[-20px] rounded-full border border-white/25"
            style={
              {
                left: `${left}%`,
                width: size,
                height: size,
                animation: `rise ${dur}s linear ${delay}s infinite`,
                ["--dx" as string]: `${dx}px`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

/** Wave edge between sections. `from` is the color of the section above. */
export function Wave({
  from,
  to,
  flip = false,
  className,
}: {
  from: string;
  to: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={clsx("relative h-14 w-full overflow-hidden md:h-20", className)}
      style={{ background: to }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={clsx("absolute inset-0 h-full w-full", flip && "rotate-180")}
      >
        <path
          d="M0 0h1440v34c-120 26-240 42-360 42S840 60 720 44 480 20 360 24 120 56 0 40z"
          fill={from}
        />
      </svg>
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("container-x", className)}>{children}</div>;
}

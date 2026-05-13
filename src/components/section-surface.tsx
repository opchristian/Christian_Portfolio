"use client";

import type { ReactNode } from "react";

type SectionSurfaceProps = {
  children: ReactNode;
  className?: string;
  /** Richer backdrop on Home (gradient, radial glow, grain); default keeps sections polished but lighter. */
  variant?: "default" | "hero";
};

/** Shared full-bleed background, optional grid texture, and soft emerald accents. */
export function SectionSurface({
  children,
  className = "",
  variant = "default",
}: SectionSurfaceProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={`relative flex h-full min-h-0 flex-col overflow-hidden bg-surface ${className}`}
    >
      {isHero ? (
        <>
          <div
            className="hero-lr-gradient pointer-events-none absolute inset-0"
            aria-hidden
          />
          <div
            className="hero-radial-glow pointer-events-none absolute inset-0"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-[0.5]"
            aria-hidden
          />
          <div className="hero-noise pointer-events-none absolute inset-0" aria-hidden />
          <div
            className="pointer-events-none absolute -right-40 top-12 h-[22rem] w-[22rem] rounded-full bg-emerald-500/[0.055] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-32 bottom-16 h-[18rem] w-[18rem] rounded-full bg-emerald-600/[0.045] blur-3xl"
            aria-hidden
          />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.26]" />
          <div className="pointer-events-none absolute -right-32 top-24 h-80 w-80 rounded-full bg-emerald-500/[0.085] blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-32 h-72 w-72 rounded-full bg-emerald-700/[0.075] blur-3xl" />
        </>
      )}

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

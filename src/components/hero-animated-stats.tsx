"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { heroStats } from "@/data/site";

const STAGGER_S = 0.11;

function durationForTarget(target: number) {
  return Math.min(2.15, 0.75 + target / 320);
}

type StatRowProps = {
  target: number;
  lines: readonly [string, string];
  active: boolean;
  delayIndex: number;
};

function StatRow({ target, lines, active, delayIndex }: StatRowProps) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const ctrlRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (!active) return;
    ctrlRef.current?.stop();

    if (reduceMotion) {
      setDisplay(target);
      return;
    }

    setDisplay(0);
    const delayMs = delayIndex * STAGGER_S * 1000;
    const tid = window.setTimeout(() => {
      ctrlRef.current = animate(0, target, {
        duration: durationForTarget(target),
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
    }, delayMs);

    return () => {
      window.clearTimeout(tid);
      ctrlRef.current?.stop();
      ctrlRef.current = null;
    };
  }, [active, target, delayIndex, reduceMotion]);

  const ariaLabel = `${display} ${lines[0]} ${lines[1]}`;

  return (
    <div
      className="flex min-w-0 items-center gap-3 sm:gap-4"
      role="group"
      aria-label={ariaLabel}
    >
      <span className="shrink-0 font-mono text-4xl font-bold tabular-nums leading-none text-white sm:text-5xl lg:text-6xl">
        {display}
      </span>
      <span className="min-w-0 font-mono text-sm leading-tight text-white/70 sm:text-base lg:text-lg">
        {lines[0]}
        <br />
        {lines[1]}
      </span>
    </div>
  );
}

export function HeroAnimatedStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <div
      ref={containerRef}
      className="mt-4 grid w-full shrink-0 grid-cols-2 gap-x-4 gap-y-8 border-t border-white/10 pt-6 sm:mt-6 sm:gap-x-6 sm:pt-7 md:grid-cols-4 md:gap-x-8 md:gap-y-0 md:pt-8 lg:mt-8 lg:pt-8"
      aria-label="Highlights"
    >
      {heroStats.map((stat, index) => (
        <StatRow
          key={`${stat.value}-${stat.lines[0]}`}
          target={stat.value}
          lines={stat.lines}
          active={inView}
          delayIndex={index}
        />
      ))}
    </div>
  );
}

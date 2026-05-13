"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { ProjectPreview } from "@/components/project-preview";
import { SectionSurface } from "@/components/section-surface";
import type { ProjectResolved } from "@/data/projects";

/** Matches Home hero CTAs (`hero.tsx` `btnBase`). */
const outlineBtn =
  "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-mono text-xs font-semibold tracking-wide text-white transition hover:border-emerald-400/50 hover:bg-white/10 sm:px-6 sm:text-sm";

const carouselControlBtn =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-emerald-400/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 sm:h-11 sm:w-11";

const slideVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -32 : 32,
  }),
};

function ProjectSlideText({
  project,
  total,
}: {
  project: ProjectResolved;
  total: number;
}) {
  return (
    <div className="flex min-h-0 flex-col justify-center gap-3 overflow-hidden sm:gap-4">
      <div className="flex shrink-0 items-end gap-2 sm:gap-3">
        <span className="font-mono text-5xl font-bold tabular-nums leading-none tracking-tight text-emerald-400 sm:text-6xl lg:text-7xl">
          {project.number}
        </span>
        <span className="pb-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/50 sm:text-sm">
          / {String(total).padStart(2, "0")}
        </span>
      </div>
      <h3 className="shrink-0 font-mono text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
        {project.title}
      </h3>
      <p className="line-clamp-3 min-h-0 font-mono text-base font-normal leading-relaxed tracking-wide text-white/60 sm:line-clamp-4 sm:text-lg lg:text-xl">
        {project.description}
      </p>
      <div className="min-h-0 shrink-0">
        <p className="font-mono text-sm font-medium uppercase tracking-widest text-white/50">
          Tech stack
        </p>
        <ul className="mt-2 flex max-h-[3.25rem] flex-wrap gap-2 overflow-hidden sm:max-h-14">
          {project.tech.map((t) => (
            <li
              key={t}
              className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-400 sm:text-xs"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3 pt-1">
        <Link
          href={project.liveUrl}
          className={outlineBtn}
          {...(project.liveUrl.startsWith("http")
            ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
            : {})}
        >
          <ExternalLink className="h-4 w-4 shrink-0 text-emerald-400" />
          Live demo
        </Link>
        <Link
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={outlineBtn}
        >
          <Github className="h-4 w-4 shrink-0 text-emerald-400" />
          GitHub
        </Link>
      </div>
    </div>
  );
}

export function ProjectsSection({
  projects,
}: {
  projects: ProjectResolved[];
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = projects.length;
  const project = total > 0 ? projects[index] : null;

  const go = useCallback(
    (delta: number) => {
      if (total <= 0) return;
      setDirection(delta);
      setIndex((i) => {
        const n = i + delta;
        return ((n % total) + total) % total;
      });
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: "easeOut" as const };

  return (
    <SectionSurface>
      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col overflow-hidden px-4 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-8 lg:px-8 lg:pb-8 lg:pt-10">
        <div className="grid min-h-0 min-w-0 flex-1 grid-cols-1 gap-6 overflow-hidden lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left: section header + sliding copy (matches Home left column rhythm) */}
          <div className="flex min-h-0 min-w-0 max-w-2xl flex-col gap-4 overflow-hidden sm:gap-5">
            <header className="shrink-0">
              <p className="font-mono text-xl font-medium uppercase tracking-[0.3em] text-emerald-400 md:text-2xl">
                Selected work
              </p>
              <h2 className="mt-3 font-mono text-5xl font-bold leading-tight tracking-tight text-white md:mt-4 md:text-6xl lg:text-7xl">
                Projects
              </h2>
            </header>

            <div className="relative min-h-0 flex-1 overflow-hidden lg:min-h-[12rem]">
              {project ? (
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={project.number}
                    role="group"
                    aria-label={`${project.number} ${project.title}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={transition}
                    className="absolute inset-0 flex min-h-0 flex-col overflow-hidden"
                  >
                    <ProjectSlideText project={project} total={total} />
                  </motion.div>
                </AnimatePresence>
              ) : null}
            </div>
          </div>

          {/* Right: preview card (always right on lg; stacks below on mobile) */}
          <div className="relative min-h-0 min-h-[12rem] w-full overflow-hidden sm:min-h-[14rem] lg:min-h-0">
            {project ? (
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={project.number}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transition}
                  className="absolute inset-0 flex min-h-0 flex-col"
                >
                  <div className="relative h-full min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/15 bg-zinc-900/50 shadow-[0_0_60px_-28px_rgba(34,197,94,0.35)]">
                    <div className="absolute inset-0 min-h-0">
                      <ProjectPreview
                        project={project}
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </div>

        <nav
          className="relative z-20 mt-4 flex w-full shrink-0 items-center justify-center gap-3 sm:mt-5 sm:gap-4"
          aria-label="Project slides"
        >
          <button
            type="button"
            onClick={() => go(-1)}
            className={carouselControlBtn}
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center justify-center gap-2 px-2">
            {projects.map((p, i) => (
              <button
                key={p.number}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className="group flex h-10 shrink-0 items-center justify-center px-0.5 sm:h-11"
                aria-label={`Go to project ${p.number}`}
                aria-current={i === index ? "true" : undefined}
              >
                <span
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.45)] sm:w-9"
                      : "w-2 bg-zinc-600 group-hover:bg-zinc-400"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            className={carouselControlBtn}
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </SectionSurface>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, FileDown } from "lucide-react";
import { site } from "@/data/site";
import { HeroAnimatedStats } from "@/components/hero-animated-stats";
import { SectionSurface } from "@/components/section-surface";

const btnBase =
  "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-mono text-xs font-semibold tracking-wide text-white transition hover:border-emerald-400/50 hover:bg-white/10 sm:px-6 sm:text-sm";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <SectionSurface variant="hero">
      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col px-4 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-8 lg:px-8 lg:pb-8 lg:pt-10">
        <div className="grid min-h-0 min-w-0 flex-1 grid-cols-1 content-center items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="min-w-0 max-w-2xl">
            <p className="font-mono text-xl font-medium tracking-wide text-zinc-400 md:text-2xl">
              {site.role}
            </p>

            <h1 className="mt-5 font-mono text-6xl font-bold leading-[0.95] tracking-tight text-white md:mt-6 md:text-7xl lg:mt-7 lg:text-8xl">
              <span className="block">{site.heroHeadingLead}</span>
              <span className="block text-emerald-400">{site.heroHeadingName}</span>
            </h1>

            <p className="mt-5 max-w-2xl font-mono text-lg leading-relaxed tracking-wide text-zinc-400 md:mt-6 md:text-xl">
              {site.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              {site.resumeUnderConstruction ? (
                <button
                  type="button"
                  disabled
                  className={`${btnBase} cursor-not-allowed opacity-60 disabled:pointer-events-none`}
                  aria-label="Resume under construction"
                >
                  <FileDown className="h-4 w-4 shrink-0 text-emerald-400" />
                  Resume · Under construction
                </button>
              ) : (
                <Link
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnBase}
                >
                  <FileDown className="h-4 w-4 shrink-0 text-emerald-400" />
                  Resume
                </Link>
              )}
              <Link
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btnBase}
              >
                <Github className="h-4 w-4 shrink-0 text-emerald-400" />
                GitHub
              </Link>
              <Link
                href={site.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btnBase}
              >
                <Linkedin className="h-4 w-4 shrink-0 text-emerald-400" />
                LinkedIn
              </Link>
            </div>
          </div>

          <div className="flex min-h-0 justify-center overflow-visible lg:justify-end lg:pr-2">
            <div className="relative aspect-square w-[min(78vw,17.5rem)] overflow-visible sm:w-72 md:w-80 lg:h-[26.25rem] lg:w-[26.25rem] lg:max-w-none xl:h-[30rem] xl:w-[30rem] 2xl:h-[32.5rem] 2xl:w-[32.5rem]">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/[0.065] blur-[64px]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-3 z-[1] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgb(46_47_54)_0%,rgb(32_33_38)_38%,rgb(24_25_29)_68%,rgb(19_20_24)_100%)] shadow-[inset_0_0_72px_rgba(0,0,0,0.38)] sm:inset-3.5 lg:inset-4"
              />
              <div className="absolute inset-3 z-[2] sm:inset-3.5 lg:inset-4">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-[#1c1d22] shadow-[0_16px_48px_-16px_rgba(0,0,0,0.5),0_8px_28px_-14px_rgba(34,197,94,0.06)] ring-1 ring-inset ring-white/[0.05]">
                  <Image
                    src="/profile_pic.jpg"
                    alt="Christian profile photo"
                    fill
                    className="rounded-full object-cover object-center"
                    sizes="(max-width: 1024px) 78vw, 30rem"
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_48%,transparent_35%,transparent_58%,rgba(10,11,14,0.22)_100%)]"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-black/[0.12]"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_88px_rgba(0,0,0,0.14)]"
                    aria-hidden
                  />
                </div>
              </div>
              <motion.div
                aria-hidden
                style={{ transformOrigin: "50% 50%" }}
                className="pointer-events-none absolute inset-0 z-[3] rounded-full border border-dashed border-emerald-400/80 shadow-[0_0_48px_-20px_rgba(52,211,153,0.26)]"
                animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 22,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
              />
            </div>
          </div>
        </div>

        <HeroAnimatedStats />
      </div>
    </SectionSurface>
  );
}

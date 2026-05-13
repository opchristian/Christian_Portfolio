"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Navbar, type ActiveSection } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import type { ProjectResolved } from "@/data/projects";

export function PortfolioView({
  projects,
}: {
  projects: ProjectResolved[];
}) {
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: "easeInOut" as const };

  return (
    <div className="relative h-screen max-h-[100dvh] overflow-hidden bg-surface">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="box-border flex h-full min-h-0 flex-col overflow-hidden pt-16">
        <div
          className="relative min-h-0 flex-1 overflow-hidden [perspective:1400px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {activeSection === "home" ? (
              <motion.section
                key="home"
                aria-label="Home"
                className="absolute inset-0 flex min-h-0 flex-col overflow-hidden"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 80, rotateX: 8 }
                }
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -80, rotateX: -8 }
                }
                transition={transition}
                style={{
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <Hero />
              </motion.section>
            ) : null}
            {activeSection === "projects" ? (
              <motion.section
                key="projects"
                aria-label="Projects"
                className="absolute inset-0 flex min-h-0 flex-col overflow-hidden"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 80, rotateX: 8 }
                }
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -80, rotateX: -8 }
                }
                transition={transition}
                style={{
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <ProjectsSection projects={projects} />
              </motion.section>
            ) : null}
            {activeSection === "contact" ? (
              <motion.section
                key="contact"
                aria-label="Contact"
                className="absolute inset-0 flex min-h-0 flex-col overflow-hidden"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 80, rotateX: 8 }
                }
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -80, rotateX: -8 }
                }
                transition={transition}
                style={{
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <ContactSection />
              </motion.section>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/site";

export type ActiveSection = "home" | "projects" | "contact";

type NavbarProps = {
  activeSection: ActiveSection;
  /** Updates which full-screen section is shown — no hash links or scroll. */
  setActiveSection: (section: ActiveSection) => void;
};

const textNavClass = (active: boolean) =>
  `border-b-2 pb-1 font-mono text-sm font-medium tracking-wide transition ${
    active
      ? "border-accent text-accent"
      : "border-transparent text-zinc-300 hover:text-white"
  }`;

export function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [open, setOpen] = useState(false);

  function go(section: ActiveSection) {
    setActiveSection(section);
    setOpen(false);
  }

  const reachOutPillClass =
    "rounded-full bg-accent px-4 py-2 font-mono text-sm font-semibold tracking-wide text-zinc-950 shadow-[0_0_20px_-4px_rgba(34,197,94,0.5)] transition hover:bg-accent-bright hover:shadow-[0_0_24px_-4px_rgba(74,222,128,0.55)]";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1f2023]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => go("home")}
          className="font-mono text-lg font-semibold tracking-tight text-white"
        >
          {site.name}
          <span className="text-accent">.</span>
        </button>

        <nav
          className="hidden flex-wrap items-center gap-x-5 gap-y-1 md:flex xl:gap-x-7"
          aria-label="Primary"
        >
          <button
            type="button"
            onClick={() => go("home")}
            aria-current={activeSection === "home" ? "page" : undefined}
            className={textNavClass(activeSection === "home")}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => go("projects")}
            aria-current={activeSection === "projects" ? "page" : undefined}
            className={textNavClass(activeSection === "projects")}
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => go("contact")}
            aria-current={activeSection === "contact" ? "page" : undefined}
            className={textNavClass(activeSection === "contact")}
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => go("contact")}
            className={reachOutPillClass}
          >
            Reach Out
          </button>
        </nav>

        <button
          type="button"
          className="inline-flex rounded-lg border border-white/10 p-2 text-zinc-200 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#1f2023]/98 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => go("home")}
              aria-current={activeSection === "home" ? "page" : undefined}
              className={`rounded-lg py-2.5 text-left font-mono text-sm font-medium tracking-wide ${
                activeSection === "home"
                  ? "text-accent underline decoration-accent underline-offset-4"
                  : "text-zinc-200"
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => go("projects")}
              aria-current={activeSection === "projects" ? "page" : undefined}
              className={`rounded-lg py-2.5 text-left font-mono text-sm font-medium tracking-wide ${
                activeSection === "projects"
                  ? "text-accent underline decoration-accent underline-offset-4"
                  : "text-zinc-200"
              }`}
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => go("contact")}
              aria-current={activeSection === "contact" ? "page" : undefined}
              className={`rounded-lg py-2.5 text-left font-mono text-sm font-medium tracking-wide ${
                activeSection === "contact"
                  ? "text-accent underline decoration-accent underline-offset-4"
                  : "text-zinc-200"
              }`}
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => go("contact")}
              className={`mt-2 w-full ${reachOutPillClass} py-3`}
            >
              Reach Out
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

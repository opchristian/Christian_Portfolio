"use client";

import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown, Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/data/site";
import { SectionSurface } from "@/components/section-surface";

const outlineBtn =
  "inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-xs font-semibold tracking-wide text-white transition hover:border-emerald-400/50 hover:bg-white/10 sm:w-auto sm:px-7 sm:text-sm";

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 font-mono text-sm text-white outline-none transition duration-200 ease-out placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 sm:px-3.5 sm:text-base";

const labelClass =
  "mb-1 block font-mono text-xs font-medium uppercase tracking-widest text-white/50";

const SUBJECT_OPTIONS = [
  "Web Development",
  "AI / ML",
  "ML / Data Science",
  "DSA",
] as const;

function SubjectSelect({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const triggerClass = [
    fieldClass,
    "flex cursor-pointer items-center justify-between gap-2 text-left",
    open ? "border-emerald-400 ring-2 ring-emerald-400/30" : "",
  ].join(" ");

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} required />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="contact-subject-listbox"
        onClick={() => setOpen((o) => !o)}
        className={triggerClass}
      >
        <span className={value ? "text-white" : "text-zinc-500"}>
          {value || "Select a Subject"}
        </span>
        <ChevronDown
          strokeWidth={2}
          className={`h-4 w-4 shrink-0 text-zinc-400 transition duration-200 ${
            open ? "rotate-180 text-emerald-400" : ""
          }`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          id="contact-subject-listbox"
          role="listbox"
          aria-label="Subject"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-emerald-400/40 bg-surface py-1 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.85)] ring-2 ring-emerald-400/25"
        >
          {SUBJECT_OPTIONS.map((opt) => {
            const selected = value === opt;
            return (
              <li key={opt} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`w-full px-3 py-2.5 text-left font-mono text-sm transition duration-150 ${
                    selected
                      ? "bg-emerald-500/25 font-medium text-emerald-300"
                      : "text-zinc-200 hover:bg-emerald-500/20 hover:text-emerald-300"
                  }`}
                  onClick={() => {
                    setValue(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center text-emerald-400">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-white/50">
          {label}
        </p>
        <p className="mt-0.5 break-words font-mono text-sm text-white sm:text-base">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition hover:opacity-90">
        {content}
      </a>
    );
  }
  return content;
}

export function ContactSection() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const first = String(form.get("firstname") ?? "").trim();
    const last = String(form.get("lastname") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const subject = String(form.get("subject") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const body = [
      `Name: ${first} ${last}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject || "Portfolio inquiry")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <SectionSurface>
      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col overflow-hidden px-4 pb-4 pt-6 sm:px-6 sm:pb-5 sm:pt-8 lg:px-8 lg:pb-6 lg:pt-10">
        <div className="grid min-h-0 min-w-0 flex-1 grid-cols-1 content-center items-center gap-8 overflow-visible lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div className="flex min-h-0 min-w-0 flex-col justify-center overflow-visible">
            <h2 className="font-mono text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let&apos;s work together
            </h2>
            <p className="mt-3 font-mono text-base text-white/60 sm:mt-4 sm:text-lg">
              Feel free to shoot me an email.
            </p>

            <form
              onSubmit={onSubmit}
              className="mt-5 grid max-h-full min-h-0 grid-cols-1 gap-2 overflow-visible sm:mt-6 sm:gap-2.5"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                <label className="block min-w-0">
                  <span className={labelClass}>Firstname</span>
                  <input
                    required
                    name="firstname"
                    autoComplete="given-name"
                    className={fieldClass}
                  />
                </label>
                <label className="block min-w-0">
                  <span className={labelClass}>Lastname</span>
                  <input
                    required
                    name="lastname"
                    autoComplete="family-name"
                    className={fieldClass}
                  />
                </label>
              </div>
              <label className="block">
                <span className={labelClass}>Email address</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  className={fieldClass}
                />
              </label>
              <div className="block">
                <span className={labelClass}>Select a Subject</span>
                <SubjectSelect name="subject" />
              </div>
              <label className="block min-h-0">
                <span className="sr-only">Message</span>
                <textarea
                  required
                  name="message"
                  rows={2}
                  className={`${fieldClass} max-h-[4.5rem] resize-none sm:max-h-[5.25rem]`}
                  placeholder="Type your message here."
                  aria-label="Type your message here"
                />
              </label>
              <div className="pt-1">
                <button type="submit" className={outlineBtn}>
                  <Send className="h-4 w-4 shrink-0 text-emerald-400" />
                  Send message
                </button>
              </div>
            </form>
          </div>

          <div className="flex min-h-0 flex-col justify-center gap-6 overflow-hidden lg:gap-8">
            <InfoRow
              icon={<Phone className="h-5 w-5" strokeWidth={1.75} />}
              label="Phone"
              value={site.contactPhoneDisplay}
            />
            <InfoRow
              icon={<Mail className="h-5 w-5" strokeWidth={1.75} />}
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <InfoRow
              icon={<MapPin className="h-5 w-5" strokeWidth={1.75} />}
              label="Address"
              value={site.location}
            />
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}

export const site = {
  name: "Christian",
  role: "Software Engineer",
  /** Full line for metadata / accessibility fallbacks */
  heroTitle: "Hi! I'm Christian",
  /** Split hero heading: lead stays white, name uses accent green */
  heroHeadingLead: "Hi! I'm",
  heroHeadingName: "Christian",
  heroSubtitle:
    "I am a Sophomore at Colby College studying Computer Science, Math, and AI.",
  email: "opokudwamenachristian@gmail.com",
  location: "Waterville, Maine",
  /** Shown on Contact; replace with a real number when ready. */
  contactPhoneDisplay: "(+1) --- --- ----",
  /** Drop `public/resume.pdf` in place, then set `resumeUnderConstruction` false and this to `/resume.pdf`. */
  resumeUrl: "#",
  /** Hero Resume button: disabled until a PDF URL is ready. */
  resumeUnderConstruction: true,
  githubUrl: "https://github.com/opchristian",
  linkedinUrl: "https://www.linkedin.com/in/christian-dwamenah-opoku-8182a1248",
};

export type HeroStat = {
  value: number;
  /** Two lines beside the number (reference layout). */
  lines: readonly [string, string];
};

/** Hero count-up metrics — edit copy and targets here. */
export const heroStats: readonly HeroStat[] = [
  { value: 2, lines: ["Years of", "experience"] },
  { value: 16, lines: ["Projects completed", "and counting"] },
  { value: 6, lines: ["Technologies", "mastered"] },
  { value: 500, lines: ["Code", "commits"] },
] as const;

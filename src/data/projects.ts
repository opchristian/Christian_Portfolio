export type ProjectPlaceholderId =
  | "campusconnect"
  | "inboxiq"
  | "mazegrid"
  | "sudoku";

export type Project = {
  number: string;
  title: string;
  description: string;
  tech: string[];
  /** Path under `public/`, e.g. `/projects/campusconnect.png` — shown only if the file exists (otherwise the SVG placeholder). */
  image: string;
  placeholderId: ProjectPlaceholderId;
  liveUrl: string;
  githubUrl: string;
};

export type ProjectResolved = Project & {
  imageSrc: string | null;
  /** Present when `imageSrc` is set; changes when the file on disk is replaced (cache bust). */
  imageCacheKey: number | null;
};

/**
 * Edit links, images, and copy here.
 * Set `image` to the file you add under `public/projects/`. If the file is missing, a designed placeholder is shown.
 */
export const projects: Project[] = [
  {
    number: "01",
    title: "CampusConnect",
    description:
      "A student-first campus marketplace that helps students find trusted, affordable peer services and academic essentials like textbooks and calculators in one organized platform.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Vercel"],
    image: "/projects/campusconnect.png",
    placeholderId: "campusconnect",
    liveUrl: "https://campusconnectme.vercel.app/",
    githubUrl: "https://github.com/opchristian/CampusConnect",
  },
  {
    number: "02",
    title: "InboxIQ",
    description:
      "An AI-powered email assistant that helps users connect Gmail, classify emails, summarize messages, and organize inbox content into clear categories.",
    tech: ["Python", "Flask", "Gmail API", "OpenAI API", "Render"],
    image: "/projects/inboxiq.png",
    placeholderId: "inboxiq",
    liveUrl: "https://inboxiq-8egt.onrender.com/",
    githubUrl: "https://github.com/opchristian/InboxIQ",
  },
  {
    number: "03",
    title: "MazeGrid Project",
    description:
      "A Java maze path-finding GUI that visualizes how a path is found between two selected points on a grid.",
    tech: ["Java", "Swing", "Graph Search"],
    image: "/projects/mazegrid.png",
    placeholderId: "mazegrid",
    liveUrl: "#",
    githubUrl: "https://github.com/opchristian/MazeGrid_Project",
  },
  {
    number: "04",
    title: "Sudoku Project",
    description:
      "A Java Sudoku game and solver that validates puzzle rules, manages board state, and supports solving logic.",
    tech: ["Java", "OOP", "Backtracking"],
    image: "/projects/sudoku.png",
    placeholderId: "sudoku",
    liveUrl: "#",
    githubUrl: "https://github.com/opchristian/Sudoku_Game",
  },
];

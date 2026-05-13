import "server-only";
import fs from "fs";
import path from "path";
import { projects, type ProjectResolved } from "@/data/projects";

export function resolveProjectImages(): ProjectResolved[] {
  return projects.map((p) => {
    const rel = p.image.replace(/^\//, "");
    if (!rel || rel.includes("..")) {
      return { ...p, imageSrc: null, imageCacheKey: null };
    }
    const full = path.join(process.cwd(), "public", rel);
    if (!fs.existsSync(full)) {
      return { ...p, imageSrc: null, imageCacheKey: null };
    }
    const mtimeMs = fs.statSync(full).mtimeMs;
    return {
      ...p,
      imageSrc: p.image,
      imageCacheKey: Math.floor(mtimeMs),
    };
  });
}

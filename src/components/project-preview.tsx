"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import { useState } from "react";
import type { ProjectPlaceholderId, ProjectResolved } from "@/data/projects";
import {
  CampusConnectPlaceholder,
  InboxIQPlaceholder,
  MazeGridPlaceholder,
  SudokuPlaceholder,
} from "@/components/project-preview-placeholders";

const PLACEHOLDERS: Record<ProjectPlaceholderId, ComponentType> = {
  campusconnect: CampusConnectPlaceholder,
  inboxiq: InboxIQPlaceholder,
  mazegrid: MazeGridPlaceholder,
  sudoku: SudokuPlaceholder,
};

export function ProjectPreview({
  project,
  priority,
}: {
  project: ProjectResolved;
  priority?: boolean;
}) {
  const [loadFailed, setLoadFailed] = useState(false);
  const showImage = Boolean(project.imageSrc && !loadFailed);
  const Placeholder = PLACEHOLDERS[project.placeholderId];
  const imageSrc =
    project.imageSrc && project.imageCacheKey != null
      ? `${project.imageSrc}?v=${project.imageCacheKey}`
      : project.imageSrc;

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden rounded-2xl bg-zinc-950">
      {showImage ? (
        <Image
          src={imageSrc!}
          alt={`${project.title} preview`}
          fill
          className="rounded-2xl object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
          unoptimized
          onError={() => setLoadFailed(true)}
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

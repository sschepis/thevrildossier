/**
 * Chapter registry — now auto-generated from markdown frontmatter.
 * 
 * This file is a backward-compatible wrapper around content-loader.ts.
 * All existing imports (getChapter, getNextChapter, etc.) continue to work.
 * 
 * To add a chapter: just create a .md file with YAML frontmatter in
 * src/content/chapters/ — no changes to this file needed.
 */

import {
  loadAllChapters,
  loadChapter,
  type ChapterData,
} from "./content-loader";

// Re-export the Chapter interface (backward compatible)
export interface Chapter {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  part: number;
  partTitle: string;
  file: string;
  epigraph?: string;
  estimatedReadingTime?: number;
  tags?: string[];
}

// Parts definition — still static since it's structural, not per-file
export const parts = [
  { number: 0, title: "Frontmatter" },
  { number: 1, title: "The Premise and the Witness" },
  { number: 2, title: "The Infrastructure" },
  { number: 3, title: "The Operations" },
  { number: 4, title: "The Historical Framework" },
  { number: 5, title: "The Connections" },
  { number: 6, title: "Synthesis and Implications" },
  { number: 7, title: "The Divine Defense and Ancient War" },
  { number: 8, title: "The Science Network" },
  { number: 9, title: "The Deeper Reality" },
  { number: 10, title: "Appendices" },
  { number: 11, title: "Appendices" },
];

function toChapter(data: ChapterData): Chapter {
  return {
    number: data.number,
    slug: data.slug,
    title: data.title,
    subtitle: data.subtitle,
    part: data.part,
    partTitle: data.partTitle,
    file: data.file,
    epigraph: data.epigraph,
    tags: data.tags,
  };
}

// Auto-discovered chapters from frontmatter
export const chapters: Chapter[] = loadAllChapters().map(toChapter);

export function getChapter(slug: string): Chapter | undefined {
  const data = loadChapter(slug);
  return data ? toChapter(data) : undefined;
}

export function getNextChapter(slug: string): Chapter | undefined {
  const idx = chapters.findIndex((c) => c.slug === slug);
  if (idx === -1 || idx === chapters.length - 1) return undefined;
  return chapters[idx + 1];
}

export function getPrevChapter(slug: string): Chapter | undefined {
  const idx = chapters.findIndex((c) => c.slug === slug);
  if (idx <= 0) return undefined;
  return chapters[idx - 1];
}

export function getAvailableChapters(): Chapter[] {
  return chapters.filter((c) => c.file !== "");
}

export function getChaptersByPart(): {
  part: (typeof parts)[number];
  chapters: Chapter[];
}[] {
  return parts
    .filter((p) => p.number > 0)
    .map((part) => ({
      part,
      chapters: chapters.filter((c) => c.part === part.number),
    }));
}

/**
 * Content Loader — Auto-discovers markdown files and parses YAML frontmatter.
 * 
 * This replaces the hardcoded chapter array. To add a chapter:
 * 1. Create a .md file in src/content/chapters/
 * 2. Add YAML frontmatter with required fields (number, slug, title, subtitle, part, partTitle)
 * 3. The file is auto-discovered at build time.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src", "content", "chapters");

export interface ChapterFrontmatter {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  part: number;
  partTitle: string;
  epigraph?: string;
  tags?: string[];
  estimatedReadingTime?: number;
}

export interface ChapterData extends ChapterFrontmatter {
  file: string;
  content: string;
}

/**
 * Cache to avoid re-reading files on every call during the same build.
 */
let _cache: ChapterData[] | null = null;

/**
 * Load all chapter files from the content directory.
 * Parses YAML frontmatter and returns sorted chapter data.
 */
export function loadAllChapters(): ChapterData[] {
  // In development, bypass the cache so markdown edits are picked up without restart
  if (_cache && process.env.NODE_ENV !== "development") return _cache;

  const files = fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"))
    .sort(); // alphabetical sort ensures stable ordering

  const chapters: ChapterData[] = [];
  const errors: string[] = [];

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    // Validate required fields
    const required = ["number", "slug", "title", "subtitle", "part", "partTitle"];
    const missing = required.filter((field) => data[field] === undefined);

    if (missing.length > 0) {
      errors.push(`${file}: missing frontmatter fields: ${missing.join(", ")}`);
      continue;
    }

    chapters.push({
      number: data.number,
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      part: data.part,
      partTitle: data.partTitle,
      epigraph: data.epigraph || undefined,
      tags: data.tags || [],
      file,
      content,
    });
  }

  if (errors.length > 0) {
    console.warn("⚠ Content loader warnings:");
    errors.forEach((e) => console.warn(`  ${e}`));
  }

  // Sort by number (0, 1, 2, ..., 21, 100, 101, ...)
  chapters.sort((a, b) => a.number - b.number);

  _cache = chapters;
  return chapters;
}

/**
 * Get a single chapter by slug.
 */
export function loadChapter(slug: string): ChapterData | undefined {
  return loadAllChapters().find((c) => c.slug === slug);
}

/**
 * Get the raw markdown content of a chapter (without frontmatter).
 */
export function getChapterRawContent(slug: string): string {
  const chapter = loadChapter(slug);
  return chapter?.content || "";
}

/**
 * Get all unique tags across all chapters, sorted alphabetically.
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const ch of loadAllChapters()) {
    for (const tag of ch.tags || []) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

/**
 * Get chapters that share at least one tag with the given chapter.
 * Returns up to `limit` related chapters, excluding the source chapter.
 */
export function getRelatedChapters(slug: string, limit = 4): ChapterData[] {
  const source = loadChapter(slug);
  if (!source || !source.tags || source.tags.length === 0) return [];

  const sourceTags = new Set(source.tags);
  const all = loadAllChapters().filter((c) => c.slug !== slug);

  // Score by number of shared tags
  const scored = all
    .map((ch) => ({
      chapter: ch,
      score: (ch.tags || []).filter((t) => sourceTags.has(t)).length,
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.chapter);
}

/**
 * Get chapters filtered by tag.
 */
export function getChaptersByTag(tag: string): ChapterData[] {
  return loadAllChapters().filter((ch) => (ch.tags || []).includes(tag));
}

/**
 * Validate content directory for common issues.
 * Returns an array of error/warning messages.
 */
export function validateContent(): string[] {
  const chapters = loadAllChapters();
  const issues: string[] = [];

  // Check for duplicate slugs
  const slugs = new Map<string, string>();
  for (const ch of chapters) {
    if (slugs.has(ch.slug)) {
      issues.push(`Duplicate slug "${ch.slug}" in ${ch.file} and ${slugs.get(ch.slug)}`);
    }
    slugs.set(ch.slug, ch.file);
  }

  // Check for duplicate numbers
  const numbers = new Map<number, string>();
  for (const ch of chapters) {
    if (numbers.has(ch.number)) {
      issues.push(`Duplicate number ${ch.number} in ${ch.file} and ${numbers.get(ch.number)}`);
    }
    numbers.set(ch.number, ch.file);
  }

  // Check for chapters without tags
  for (const ch of chapters) {
    if (!ch.tags || ch.tags.length === 0) {
      issues.push(`${ch.file} has no tags`);
    }
  }

  return issues;
}

/**
 * Clear the cache (useful for development/testing).
 */
export function clearContentCache(): void {
  _cache = null;
}

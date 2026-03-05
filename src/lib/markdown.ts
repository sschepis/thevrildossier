import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

const contentDir = path.join(process.cwd(), "src", "content", "chapters");

/**
 * Sanitization schema — extends the default GitHub-style schema to allow
 * headings with id attributes (needed for table-of-contents linking via rehype-slug)
 * while blocking scripts, iframes, and event-handler attributes.
 */
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    // Allow id on all elements (rehype-slug adds ids to headings)
    "*": [...(defaultSchema.attributes?.["*"] || []), "id", "className"],
  },
};

/**
 * Get the raw markdown content of a chapter file (with frontmatter stripped).
 */
export async function getChapterContent(filename: string): Promise<string> {
  const filePath = path.resolve(contentDir, filename);
  // Guard against path traversal — resolved path must stay within contentDir
  if (!filePath.startsWith(contentDir + path.sep) && filePath !== contentDir) {
    return "";
  }
  if (!fs.existsSync(filePath)) {
    return "";
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return content;
}

/**
 * Get the rendered HTML of a chapter file.
 */
export async function getChapterHtml(filename: string): Promise<string> {
  const raw = await getChapterContent(filename);
  if (!raw) return "";

  // Pipeline order matters for security:
  // 1. remarkRehype with allowDangerousHtml passes raw HTML through (needed for rehypeRaw)
  // 2. rehypeRaw parses raw HTML into the AST
  // 3. rehypeSlug adds id attributes to headings (runs before sanitize so its output is checked)
  // 4. rehypeSanitize strips dangerous elements/attributes — this MUST run last before stringify
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(raw);

  return String(result);
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Extract table of contents from rendered HTML.
 */
export function extractToc(html: string): TocItem[] {
  const headingRegex = /<h([2-3])\s+id="([^"]*)"[^>]*>(.*?)<\/h[2-3]>/gi;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const text = match[3].replace(/<[^>]*>/g, "").trim();
    toc.push({
      level: parseInt(match[1]),
      id: match[2],
      text,
    });
  }

  return toc;
}

/**
 * Estimate reading time based on word count (~230 wpm).
 */
export function estimateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 230);
}

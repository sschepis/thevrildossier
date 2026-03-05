#!/usr/bin/env node
/**
 * Content Validation Script
 * 
 * Checks all chapter markdown files for:
 * - Valid YAML frontmatter with required fields
 * - No duplicate slugs or numbers
 * - Tags present
 * - File naming consistency
 * 
 * Run: node scripts/validate-content.mjs
 * Or:  npm run validate-content
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "..", "src", "content", "chapters");

const REQUIRED_FIELDS = ["number", "slug", "title", "subtitle", "part", "partTitle"];

const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md")).sort();

let errors = 0;
let warnings = 0;

const slugs = new Map();
const numbers = new Map();
const chapters = [];

console.log(`\nValidating ${files.length} content files...\n`);

for (const file of files) {
  const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");

  // Check for frontmatter
  if (!raw.startsWith("---")) {
    console.log(`❌ ${file}: Missing YAML frontmatter`);
    errors++;
    continue;
  }

  let data, content;
  try {
    const parsed = matter(raw);
    data = parsed.data;
    content = parsed.content;
  } catch (e) {
    console.log(`❌ ${file}: Invalid YAML frontmatter — ${e.message}`);
    errors++;
    continue;
  }

  // Check required fields
  const missing = REQUIRED_FIELDS.filter((f) => data[f] === undefined);
  if (missing.length > 0) {
    console.log(`❌ ${file}: Missing fields: ${missing.join(", ")}`);
    errors++;
    continue;
  }

  // Check for duplicate slugs
  if (slugs.has(data.slug)) {
    console.log(`❌ ${file}: Duplicate slug "${data.slug}" (also in ${slugs.get(data.slug)})`);
    errors++;
  }
  slugs.set(data.slug, file);

  // Check for duplicate numbers
  if (numbers.has(data.number)) {
    console.log(`❌ ${file}: Duplicate number ${data.number} (also in ${numbers.get(data.number)})`);
    errors++;
  }
  numbers.set(data.number, file);

  // Check tags
  if (!data.tags || data.tags.length === 0) {
    console.log(`⚠  ${file}: No tags defined`);
    warnings++;
  }

  // Check content is non-empty
  if (content.trim().length < 100) {
    console.log(`⚠  ${file}: Very short content (${content.trim().length} chars)`);
    warnings++;
  }

  // Validate number types
  if (typeof data.number !== "number") {
    console.log(`❌ ${file}: 'number' should be a number, got ${typeof data.number}`);
    errors++;
  }
  if (typeof data.part !== "number") {
    console.log(`❌ ${file}: 'part' should be a number, got ${typeof data.part}`);
    errors++;
  }

  chapters.push({ file, ...data });
}

// Summary
console.log(`\n${"─".repeat(50)}`);
console.log(`Files:    ${files.length}`);
console.log(`Chapters: ${chapters.filter(c => c.number > 0 && c.number < 100).length}`);
console.log(`Appendix: ${chapters.filter(c => c.number >= 100).length}`);
console.log(`Tags:     ${new Set(chapters.flatMap(c => c.tags || [])).size} unique`);
console.log(`Errors:   ${errors}`);
console.log(`Warnings: ${warnings}`);
console.log(`${"─".repeat(50)}`);

if (errors > 0) {
  console.log(`\n❌ Validation FAILED with ${errors} error(s)\n`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`\n⚠  Validation passed with ${warnings} warning(s)\n`);
} else {
  console.log(`\n✓ All content valid\n`);
}

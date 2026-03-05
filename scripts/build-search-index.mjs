#!/usr/bin/env node
/**
 * Build Search Index
 * 
 * Reads all chapter markdown files, strips formatting, and creates a JSON
 * search index that the client-side search page loads.
 * 
 * Run: node scripts/build-search-index.mjs
 * Add to package.json build script: "prebuild": "node scripts/build-search-index.mjs"
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "..", "src", "content", "chapters");
const outputPath = path.join(__dirname, "..", "public", "search-index.json");

/**
 * Strip markdown formatting to plain text.
 */
function stripMarkdown(md) {
  return md
    // Remove headers markers but keep text
    .replace(/^#{1,6}\s+/gm, "")
    // Remove bold/italic
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1")
    .replace(/_{1,3}([^_]+)_{1,3}/g, "$1")
    // Remove links, keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    // Remove inline code
    .replace(/`([^`]+)`/g, "$1")
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove horizontal rules
    .replace(/^---+$/gm, "")
    // Remove blockquotes markers
    .replace(/^>\s+/gm, "")
    // Remove HTML tags
    .replace(/<[^>]+>/g, "")
    // Collapse multiple newlines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Split text into overlapping chunks of ~300 words for search excerpts.
 */
function chunkText(text, chunkSize = 300, overlap = 50) {
  const words = text.split(/\s+/);
  const chunks = [];
  
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    if (chunk.trim().length > 0) {
      chunks.push(chunk);
    }
  }
  
  return chunks;
}

/**
 * Format chapter number for display.
 */
function formatNumber(num) {
  if (num === 0) return "Frontmatter";
  if (num >= 100) return `Appendix ${String.fromCharCode(65 + (num - 100))}`;
  return `Chapter ${num}`;
}

// Main
const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md")).sort();

const index = [];
let totalChunks = 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
  const { data, content } = matter(raw);

  if (!data.slug || !data.title) {
    console.log(`⚠ Skipping ${file} — missing slug or title`);
    continue;
  }

  const plainText = stripMarkdown(content);
  const chunks = chunkText(plainText);

  for (let i = 0; i < chunks.length; i++) {
    index.push({
      id: `${data.slug}-${i}`,
      slug: data.slug,
      title: data.title,
      label: formatNumber(data.number),
      partTitle: data.partTitle,
      tags: data.tags || [],
      text: chunks[i],
      chunkIndex: i,
    });
    totalChunks++;
  }
}

// Write the index
fs.writeFileSync(outputPath, JSON.stringify(index), "utf-8");

const sizeKB = (fs.statSync(outputPath).size / 1024).toFixed(1);
console.log(`✓ Search index built: ${totalChunks} chunks from ${files.length} files (${sizeKB} KB)`);

#!/usr/bin/env node

/**
 * Generate audiobook MP3s from chapter markdown files using ElevenLabs TTS API.
 *
 * Usage:
 *   node scripts/generate-audiobook.mjs
 *   node scripts/generate-audiobook.mjs --chapter 01_the_man_who_remembered
 *
 * Environment:
 *   ELEVENLABS_API_KEY - Your ElevenLabs API key
 *   ELEVENLABS_VOICE_ID - The voice ID to use
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "src", "content", "chapters");
const OUTPUT_DIR = path.join(ROOT, "public", "audio");

// Configuration
const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error(
    "Error: ELEVENLABS_API_KEY environment variable is required.\n" +
      "Set it before running: export ELEVENLABS_API_KEY=your_key_here"
  );
  process.exit(1);
}
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "wlJSsyC9mtUc5ymjjeIT";
const MODEL_ID = "eleven_multilingual_v2";

/**
 * Auto-discover file→slug mappings from YAML frontmatter.
 * No more hardcoded map — new chapters are picked up automatically.
 */
function discoverChapters() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md")).sort();
  const mapping = {};

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);

    if (!data.slug) {
      console.log(`⚠ ${file}: no slug in frontmatter, skipping.`);
      continue;
    }

    mapping[file] = data.slug;
  }

  return mapping;
}

const FILE_TO_SLUG = discoverChapters();

/**
 * Strip markdown formatting to produce clean text for TTS.
 */
function stripMarkdown(md) {
  let text = md;
  // Remove YAML frontmatter
  text = text.replace(/^---[\s\S]*?---\n*/m, "");
  // Remove HTML tags
  text = text.replace(/<[^>]*>/g, "");
  // Convert headers to natural breaks
  text = text.replace(/^#{1,6}\s+(.+)$/gm, "\n$1.\n");
  // Remove horizontal rules
  text = text.replace(/^---+$/gm, "\n");
  // Remove bold/italic markers
  text = text.replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1");
  text = text.replace(/_{1,3}([^_]+)_{1,3}/g, "$1");
  // Remove links but keep text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Remove images
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "");
  // Remove blockquote markers
  text = text.replace(/^>\s+/gm, "");
  // Remove list markers
  text = text.replace(/^[\s]*[-*+]\s+/gm, "");
  text = text.replace(/^[\s]*\d+\.\s+/gm, "");
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/`([^`]+)`/g, "$1");
  // Remove table formatting
  text = text.replace(/\|/g, " ");
  text = text.replace(/^[\s]*[-:]+[\s]*$/gm, "");
  // Clean up whitespace
  text = text.replace(/\n{3,}/g, "\n\n");
  text = text.trim();
  return text;
}

/**
 * Split text into chunks under maxChars (ElevenLabs has a limit per request).
 * Split on paragraph boundaries.
 */
function chunkText(text, maxChars = 4500) {
  const paragraphs = text.split(/\n\n+/);
  const chunks = [];
  let current = "";

  for (const para of paragraphs) {
    if ((current + "\n\n" + para).length > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = para;
    } else {
      current = current ? current + "\n\n" + para : para;
    }
  }
  if (current.trim()) {
    chunks.push(current.trim());
  }
  return chunks;
}

/**
 * Call ElevenLabs TTS API and return audio buffer.
 */
async function synthesize(text) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": API_KEY,
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.65,
        similarity_boost: 0.75,
        style: 0.3,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `ElevenLabs API error ${response.status}: ${errorText}`
    );
  }

  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer);
}

/**
 * Concatenate multiple MP3 buffers (simple concatenation works for same-settings MP3s).
 */
function concatenateBuffers(buffers) {
  const totalLength = buffers.reduce((sum, b) => sum + b.length, 0);
  const result = Buffer.alloc(totalLength);
  let offset = 0;
  for (const buf of buffers) {
    buf.copy(result, offset);
    offset += buf.length;
  }
  return result;
}

/**
 * Process a single chapter file.
 */
async function processChapter(filename) {
  const slug = FILE_TO_SLUG[filename];
  if (!slug) {
    console.log(`⚠ No slug mapping for ${filename}, skipping.`);
    return;
  }

  const outputPath = path.join(OUTPUT_DIR, `${slug}.mp3`);

  // Skip if already generated
  if (fs.existsSync(outputPath)) {
    console.log(`✓ ${slug}.mp3 already exists, skipping.`);
    return;
  }

  const filePath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ ${filename} not found in content dir, skipping.`);
    return;
  }

  console.log(`\n🎙 Processing: ${filename} → ${slug}.mp3`);

  const raw = fs.readFileSync(filePath, "utf-8");
  const cleanText = stripMarkdown(raw);
  const chunks = chunkText(cleanText);

  console.log(
    `  ${cleanText.length} chars → ${chunks.length} chunks`
  );

  const audioBuffers = [];

  const MAX_RETRIES = 5;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    let retries = 0;
    
    console.log(
      `  Synthesizing chunk ${i + 1}/${chunks.length} (${chunk.length} chars)...`
    );

    while (true) {
      try {
        const audio = await synthesize(chunk);
        audioBuffers.push(audio);
        console.log(`  ✓ Chunk ${i + 1} done (${audio.length} bytes)`);

        // Rate limiting: wait 500ms between requests
        if (i < chunks.length - 1) {
          await new Promise((r) => setTimeout(r, 500));
        }
        break; // Success — move to next chunk
      } catch (err) {
        console.error(`  ✗ Chunk ${i + 1} failed:`, err.message);
        // On rate limit, wait and retry (up to MAX_RETRIES)
        if (
          (err.message.includes("429") || err.message.includes("rate")) &&
          retries < MAX_RETRIES
        ) {
          retries++;
          console.log(
            `  ⏳ Rate limited, waiting 30s... (retry ${retries}/${MAX_RETRIES})`
          );
          await new Promise((r) => setTimeout(r, 30000));
        } else if (retries >= MAX_RETRIES) {
          throw new Error(
            `Max retries (${MAX_RETRIES}) exceeded for chunk ${i + 1}. Last error: ${err.message}`
          );
        } else {
          throw err;
        }
      }
    }
  }

  const combined = concatenateBuffers(audioBuffers);
  fs.writeFileSync(outputPath, combined);
  console.log(
    `✅ Saved: ${outputPath} (${(combined.length / 1024 / 1024).toFixed(1)} MB)`
  );
}

/**
 * Main
 */
async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const args = process.argv.slice(2);
  const chapterFlag = args.indexOf("--chapter");

  if (chapterFlag !== -1 && args[chapterFlag + 1]) {
    // Process specific chapter
    const target = args[chapterFlag + 1];
    const filename = target.endsWith(".md") ? target : `${target}.md`;
    await processChapter(filename);
  } else {
    // Process all chapters
    const files = Object.keys(FILE_TO_SLUG);
    console.log(`\n📚 Generating audiobook for ${files.length} chapters\n`);
    console.log(`   Voice ID: ${VOICE_ID}`);
    console.log(`   Model: ${MODEL_ID}`);
    console.log(`   Output: ${OUTPUT_DIR}\n`);

    for (const file of files) {
      await processChapter(file);
    }

    console.log("\n🎉 Audiobook generation complete!\n");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

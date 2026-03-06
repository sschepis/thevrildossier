#!/usr/bin/env node
/**
 * Build Audio Manifest
 *
 * Scans public/audio/ for .mp3 files and writes a JSON manifest
 * so the AudioBookPlayer can load availability in a single request
 * instead of firing N parallel HEAD requests.
 *
 * Run: node scripts/build-audio-manifest.mjs
 * Added to prebuild alongside build-search-index.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const audioDir = path.join(__dirname, "..", "public", "audio");
const outputPath = path.join(__dirname, "..", "public", "audio-manifest.json");

let slugs = [];

if (fs.existsSync(audioDir)) {
  slugs = fs
    .readdirSync(audioDir)
    .filter((f) => f.endsWith(".mp3"))
    .map((f) => f.replace(/\.mp3$/, ""))
    .sort();
}

fs.writeFileSync(outputPath, JSON.stringify(slugs), "utf-8");

console.log(
  `✓ Audio manifest built: ${slugs.length} tracks (${(
    fs.statSync(outputPath).size / 1024
  ).toFixed(1)} KB)`
);

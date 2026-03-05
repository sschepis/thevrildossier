# The Vril Dossier — Website

A Next.js website publishing *The Vril Dossier* as a free ebook and audiobook. Features chapter-by-chapter reading, full-text search, audiobook playback, and downloadable formats.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, static generation) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-based config) |
| Content | Markdown with YAML frontmatter, auto-discovered at build time |
| Search | Client-side full-text search (build-time JSON index) |
| Audio | [ElevenLabs TTS](https://elevenlabs.io/) (eleven_multilingual_v2) |
| Fonts | Source Serif 4, Inter, JetBrains Mono |
| Node | v22+ (managed via nvm) |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (auto-generates search index)
npm run build

# Start production server
npm start
```

The dev server runs at `http://localhost:3000` by default.

## Project Structure

```
vril-website/
├── public/
│   ├── audio/                    # Generated MP3 audiobook files
│   ├── downloads/                # Downloadable PDF
│   ├── search-index.json         # Build-time search index (auto-generated)
│   └── robots.txt
├── scripts/
│   ├── add-frontmatter.mjs       # One-time: add YAML frontmatter to .md files
│   ├── build-search-index.mjs    # Build-time: generate search index JSON
│   ├── generate-audiobook.mjs    # Generate audio via ElevenLabs API
│   └── validate-content.mjs      # Validate content integrity
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page (hero, Epstein feature, TOC)
│   │   ├── layout.tsx            # Root layout (nav, footer, SEO)
│   │   ├── globals.css           # Dark theme, prose styling
│   │   ├── sitemap.ts            # Dynamic sitemap generation
│   │   ├── read/
│   │   │   ├── page.tsx          # Chapter index
│   │   │   └── [slug]/page.tsx   # Chapter reader (static generation)
│   │   ├── search/page.tsx       # Full-text search page
│   │   ├── listen/page.tsx       # Audiobook player page
│   │   ├── download/page.tsx     # Download page
│   │   ├── evidence/page.tsx     # Evidence hub
│   │   └── about/page.tsx        # About page
│   ├── components/
│   │   ├── AudioBookPlayer.tsx   # Full audiobook player with playlist
│   │   ├── AudioPlayerInline.tsx  # Inline play button per chapter
│   │   ├── ChapterSidebar.tsx    # Table of contents with scroll-spy
│   │   ├── ReadingProgress.tsx   # Reading progress bar
│   │   └── RelatedChapters.tsx   # Tag-based related chapters
│   ├── content/
│   │   └── chapters/             # All markdown content files (29 files)
│   └── lib/
│       ├── content-loader.ts     # Auto-discovers & parses frontmatter
│       ├── chapters.ts           # Chapter registry (wraps content-loader)
│       └── markdown.ts           # Markdown → HTML pipeline
└── package.json
```

## Content System

### How Content Works

Content lives in `src/content/chapters/` as Markdown files with YAML frontmatter. The system auto-discovers all `.md` files at build time — **no TypeScript changes required** to add new content.

### Frontmatter Schema

Every `.md` file must include this frontmatter:

```yaml
---
number: 15                                    # Sort order (0=frontmatter, 1-99=chapters, 100+=appendices)
slug: "epstein-network"                       # URL slug (/read/epstein-network)
title: "The Epstein Network as Vril Logistics" # Display title
subtitle: "Chapter 15"                        # Subtitle text
part: 5                                       # Part number (1-7)
partTitle: "The Connections"                   # Part title
epigraph: "Quote text here."                  # Optional opening quote
tags:                                         # Topic tags for search & related chapters
  - "epstein"
  - "trafficking"
  - "intelligence"
---
```

**Required fields:** `number`, `slug`, `title`, `subtitle`, `part`, `partTitle`
**Optional fields:** `epigraph`, `tags`

### Numbering Convention

| Range | Type | Display |
|-------|------|---------|
| 0 | Frontmatter | "Frontmatter" |
| 1–99 | Chapters | "Chapter N" |
| 100+ | Appendices | "Appendix A", "Appendix B", etc. (100=A, 101=B, ...) |

### Adding a New Chapter

1. Create `src/content/chapters/NN_slug_name.md` with frontmatter
2. Write your content below the `---` closing fence
3. Validate: `npm run validate-content`
4. Rebuild search index: `node scripts/build-search-index.mjs`
5. Done — the chapter appears automatically in navigation, search, and related chapters

### Adding a New Appendix

Same as above, but use `number: 107` (or next available) and set `part: 7`.

## Search

Full-text search is built at build time and runs client-side:

1. `scripts/build-search-index.mjs` reads all chapters, strips Markdown, chunks text (~300 words per chunk), and writes `public/search-index.json`
2. The `/search` page loads this JSON on mount and performs instant local search
3. Results show highlighted excerpts, matching tags, and links to chapters
4. Search index is auto-regenerated on `npm run build` (via the `prebuild` script)

**To manually rebuild:** `node scripts/build-search-index.mjs`

Current index: 260 chunks from 29 files (~551 KB)

## Audiobook

Audio is generated via the ElevenLabs TTS API:

```bash
# Generate a single chapter
node scripts/generate-audiobook.mjs --chapter 15_epstein_network.md

# Generate all chapters
node scripts/generate-audiobook.mjs --all
```

**Requirements:**
- Set `ELEVENLABS_API_KEY` environment variable (or edit the script)
- Audio files are saved to `public/audio/{slug}.mp3`

Currently generated: Chapters 0–9 (frontmatter + first 9 chapters)

## Scripts Reference

| Script | Command | Purpose |
|--------|---------|---------|
| Dev server | `npm run dev` | Start development server |
| Build | `npm run build` | Production build (auto-runs prebuild) |
| Validate | `npm run validate-content` | Check frontmatter integrity |
| Search index | `node scripts/build-search-index.mjs` | Rebuild search index |
| Audio | `node scripts/generate-audiobook.mjs` | Generate TTS audio |
| Frontmatter | `node scripts/add-frontmatter.mjs` | One-time: add frontmatter to files |

## Design System

### Colors

| Name | Value | Usage |
|------|-------|-------|
| Background | `#0a0a0a` | Page background |
| Card | `#141414` | Card/panel background |
| Gold | `#c9a84c` | Accent, links, headings |
| Border | `#262626` | Borders, dividers |
| Foreground | `#e5e5e5` | Body text |
| Muted | `#737373` | Secondary text |

### Typography

- **Body:** Source Serif 4 (serif) — long-form reading
- **UI:** Inter (sans-serif) — navigation, buttons, labels
- **Code/Labels:** JetBrains Mono (monospace) — chapter numbers, tags

## Book Structure

The book consists of 21 chapters across 6 parts, plus 7 appendices:

| Part | Title | Chapters |
|------|-------|----------|
| 1 | The Premise and the Witness | 1–3 |
| 2 | The Infrastructure | 4–6 |
| 3 | The Operations | 7–10 |
| 4 | The Historical Framework | 11–14 |
| 5 | The Connections | 15–18 |
| 6 | Synthesis and Implications | 19–21 |
| 7 | Appendices | A–G |

## Deployment

The site is designed for static deployment on Vercel, Netlify, or any static host:

```bash
npm run build    # Generates .next/ output
npm start        # Serves production build locally
```

For static export, add `output: 'export'` to `next.config.ts`.

## License

Content is presented for informational and research purposes. No unverified claim is presented as proven fact.

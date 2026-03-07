"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

interface SearchChunk {
  id: string;
  slug: string;
  title: string;
  label: string;
  partTitle: string;
  tags: string[];
  text: string;
  chunkIndex: number;
}

interface SearchResult {
  chunk: SearchChunk;
  excerpt: string;
  score: number;
}

/**
 * Escape HTML entities to prevent XSS when using dangerouslySetInnerHTML.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Highlights search terms in text with <mark> tags.
 * HTML-escapes the text first to prevent injection via search index content.
 */
function highlightTerms(text: string, terms: string[]): string {
  const safe = escapeHtml(text);
  if (terms.length === 0) return safe;
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  return safe.replace(regex, "<mark>$1</mark>");
}

/**
 * Extract the best excerpt around the first match.
 */
function extractExcerpt(
  text: string,
  terms: string[],
  contextLen = 200
): string {
  if (terms.length === 0) return text.slice(0, contextLen * 2) + "…";

  // Find the first occurrence of any term
  const lowerText = text.toLowerCase();
  let bestIdx = -1;
  for (const term of terms) {
    const idx = lowerText.indexOf(term.toLowerCase());
    if (idx !== -1 && (bestIdx === -1 || idx < bestIdx)) {
      bestIdx = idx;
    }
  }

  if (bestIdx === -1) {
    return text.slice(0, contextLen * 2) + "…";
  }

  const start = Math.max(0, bestIdx - contextLen);
  const end = Math.min(text.length, bestIdx + contextLen);
  let excerpt = text.slice(start, end);

  if (start > 0) excerpt = "…" + excerpt;
  if (end < text.length) excerpt = excerpt + "…";

  return excerpt;
}

/**
 * Score a chunk against search terms.
 * Higher = better match.
 */
function scoreChunk(chunk: SearchChunk, terms: string[]): number {
  let score = 0;
  const lowerText = chunk.text.toLowerCase();
  const lowerTitle = chunk.title.toLowerCase();

  for (const term of terms) {
    const lt = term.toLowerCase();

    // Title match is worth more
    if (lowerTitle.includes(lt)) score += 10;

    // Tag match
    if (chunk.tags.some((t) => t.includes(lt))) score += 5;

    // Count text occurrences
    let idx = 0;
    let count = 0;
    while ((idx = lowerText.indexOf(lt, idx)) !== -1) {
      count++;
      idx += lt.length;
    }
    score += count;
  }

  return score;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const indexRef = useRef<SearchChunk[]>([]);
  const indexLoadedRef = useRef(false);
  const pendingLoadRef = useRef<Promise<SearchChunk[]> | null>(null);

  /**
   * Lazy-load the search index on demand (called from doSearch).
   * Uses a shared promise ref so concurrent callers wait for the in-flight
   * load instead of silently dropping the search.
   */
  const ensureIndex = useCallback(async (): Promise<SearchChunk[]> => {
    if (indexLoadedRef.current) return indexRef.current;
    if (pendingLoadRef.current) return pendingLoadRef.current;

    setLoading(true);
    pendingLoadRef.current = fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: SearchChunk[]) => {
        indexRef.current = data;
        indexLoadedRef.current = true;
        setLoading(false);
        return data;
      })
      .catch(() => {
        setLoading(false);
        pendingLoadRef.current = null;
        return [] as SearchChunk[];
      });

    return pendingLoadRef.current;
  }, []);

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Perform search (async to support lazy-loading)
  const doSearch = useCallback(
    async (q: string) => {
      if (q.trim().length < 2) {
        setResults([]);
        setSearched(false);
        return;
      }
      setSearched(true);

      const terms = q
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter((t) => t.length >= 2);

      if (terms.length === 0) {
        setResults([]);
        return;
      }

      // Ensure the index is loaded before searching
      const chunks = await ensureIndex();
      if (chunks.length === 0) return;

      // Score all chunks
      const scored: SearchResult[] = [];
      for (const chunk of chunks) {
        const score = scoreChunk(chunk, terms);
        if (score > 0) {
          scored.push({
            chunk,
            excerpt: extractExcerpt(chunk.text, terms),
            score,
          });
        }
      }

      // Sort by score descending, dedupe by slug (show best chunk per chapter)
      scored.sort((a, b) => b.score - a.score);

      // Group by slug and take the best chunk per chapter
      const seen = new Map<string, SearchResult>();
      for (const result of scored) {
        const existing = seen.get(result.chunk.slug);
        if (!existing || result.score > existing.score) {
          seen.set(result.chunk.slug, result);
        }
      }

      // Convert back to array, sorted by score
      const deduped = Array.from(seen.values()).sort(
        (a, b) => b.score - a.score
      );

      setResults(deduped);
    },
    [ensureIndex]
  );

  // Debounced search on query change
  useEffect(() => {
    const timer = setTimeout(() => { doSearch(query); }, 200);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  // Get all unique tags from results for tag display
  const resultTags = new Set<string>();
  results.forEach((r) => r.chunk.tags.forEach((t) => resultTags.add(t)));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Search</h1>
      <p className="text-muted-foreground mb-8 font-serif">
        Search across all chapters and appendices of The Vril Dossier.
      </p>

      {/* Search Input */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={loading ? "Loading search index…" : "Search for topics, names, places…"}
          disabled={loading}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 text-lg transition-colors disabled:opacity-50"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setSearched(false);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Quick Tags */}
      {!searched && (
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-3">Popular topics:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "epstein",
              "cloning",
              "vril",
              "mkultra",
              "underground",
              "stargate",
              "disclosure",
              "uap",
              "marshall",
              "tartaria",
              "orphan trains",
              "black eye",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1.5 text-sm bg-card border border-border rounded-full text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {searched && query.trim().length >= 2 && (
        <div className="mb-4 text-sm text-muted-foreground">
          {results.length === 0 ? (
            <p>No results found for &ldquo;{query}&rdquo;</p>
          ) : (
            <p>
              Found {results.length} chapter{results.length !== 1 ? "s" : ""}{" "}
              matching &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {results.map((result) => {
          const terms = query
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .filter((t) => t.length >= 2);

          return (
            <Link
              key={result.chunk.id}
              href={`/read/${result.chunk.slug}`}
              className="block rounded-lg border border-border hover:border-gold/40 hover:bg-card/80 p-5 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-gold font-mono text-sm font-bold">
                    {result.chunk.label}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-gold transition-colors">
                    {result.chunk.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {result.chunk.partTitle}
                  </p>
                  <p
                    className="text-sm text-muted-foreground font-serif leading-relaxed [&_mark]:bg-gold/30 [&_mark]:text-foreground [&_mark]:px-0.5 [&_mark]:rounded"
                    dangerouslySetInnerHTML={{
                      __html: highlightTerms(result.excerpt, terms),
                    }}
                  />
                  {result.chunk.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {result.chunk.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2 py-0.5 rounded-full border ${
                            terms.some((t) => tag.includes(t))
                              ? "border-gold/40 text-gold bg-gold/10"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 text-gold/40 group-hover:text-gold transition-colors mt-1">
                  →
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* No results suggestions */}
      {searched && results.length === 0 && query.trim().length >= 2 && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">Try a different search term, or browse:</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/read"
              className="px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:border-gold/40 transition-colors"
            >
              All Chapters
            </Link>
            <Link
              href="/evidence"
              className="px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:border-gold/40 transition-colors"
            >
              Evidence Hub
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

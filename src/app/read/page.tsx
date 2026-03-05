import Link from "next/link";
import type { Metadata } from "next";
import { getChaptersByPart } from "@/lib/chapters";

function formatChapterNumber(num: number): string {
  if (num >= 100) {
    return String.fromCharCode(65 + (num - 100)); // 100=A, 101=B, etc.
  }
  return num.toString().padStart(2, "0");
}

export const metadata: Metadata = {
  title: "Read — The Vril Dossier",
  description: "Read The Vril Dossier online, chapter by chapter. Free.",
};

export default function ReadIndexPage() {
  const chaptersByPart = getChaptersByPart();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Read Online</h1>
      <p className="text-muted-foreground mb-12 font-serif">
        The complete text of The Vril Dossier. Click any available chapter to begin reading.
      </p>

      <div className="space-y-12">
        {chaptersByPart.map(({ part, chapters }) => (
          <section key={part.number}>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gold font-mono text-sm font-bold">
                PART {part.number}
              </span>
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-sm">
                {part.title}
              </span>
            </div>

            <div className="space-y-3">
              {chapters.map((ch) => {
                const isAvailable = ch.file !== "";
                return (
                  <div
                    key={ch.slug}
                    className={`rounded-lg border transition-all ${
                      isAvailable
                        ? "border-border hover:border-gold/40 hover:bg-card"
                        : "border-border/40 opacity-40"
                    }`}
                  >
                    {isAvailable ? (
                      <Link
                        href={`/read/${ch.slug}`}
                        className="flex items-start gap-4 p-5"
                      >
                        <span className="text-gold font-mono text-lg font-bold mt-0.5">
                          {formatChapterNumber(ch.number)}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg mb-1">
                            {ch.title}
                          </h3>
                          {ch.epigraph && (
                            <p className="text-muted-foreground text-sm italic font-serif line-clamp-2">
                              {ch.epigraph}
                            </p>
                          )}
                        </div>
                        <span className="text-gold/60 text-sm mt-1">→</span>
                      </Link>
                    ) : (
                      <div className="flex items-start gap-4 p-5">
                        <span className="text-muted font-mono text-lg font-bold mt-0.5">
                          {formatChapterNumber(ch.number)}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-muted-foreground font-semibold text-lg mb-1">
                            {ch.title}
                          </h3>
                          <p className="text-muted text-sm font-mono">
                            Coming soon
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Start Reading CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/read/frontmatter"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-background font-semibold rounded-lg hover:bg-gold-dim transition-colors"
        >
          Start from the Beginning →
        </Link>
      </div>
    </div>
  );
}

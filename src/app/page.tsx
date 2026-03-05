import Link from "next/link";
import { chapters, getChaptersByPart, getAvailableChapters } from "@/lib/chapters";

export default function HomePage() {
  const chaptersByPart = getChaptersByPart();
  const availableCount = getAvailableChapters().length;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center relative">
          <p className="text-gold/60 text-sm font-mono uppercase tracking-[0.3em] mb-6">
            A Comprehensive Investigation
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight mb-4">
            THE VRIL
            <br />
            <span className="text-gold">DOSSIER</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-4 font-serif italic">
            The Marshall Testimony and the Subterranean Hypothesis
          </p>
          <div className="w-16 h-px bg-gold mx-auto my-8" />
          <blockquote className="text-muted-foreground italic text-base max-w-lg mx-auto mb-12 font-serif">
            &ldquo;They laughed at me when I said I just want to tell the world
            about this. They said nobody&apos;s ever going to believe me. You
            won&apos;t put it together in an eloquent way.&rdquo;
            <footer className="mt-2 text-sm text-muted not-italic">
              — Donald Marshall
            </footer>
          </blockquote>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/read/frontmatter"
              className="inline-flex items-center justify-center px-8 py-3 bg-gold text-background font-semibold rounded-lg hover:bg-gold-dim transition-colors"
            >
              Read Now
            </Link>
            <Link
              href="/listen"
              className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-colors"
            >
              🎧 Listen
            </Link>
            <Link
              href="/download"
              className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-colors"
            >
              📥 Download
            </Link>
          </div>
        </div>
      </section>

      {/* Featured: The Epstein Files */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-red-950/40 via-card to-card border border-red-900/50 rounded-xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-900/50">
                Featured Investigation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The Epstein Files
            </h2>
            <p className="text-muted-foreground text-lg font-serif mb-6 max-w-2xl">
              Flight logs. Property records. Underground construction. Doors without interior handles. 
              Intelligence connections. A trafficking network that served a purpose no one has been willing to name.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-background/40 rounded-lg p-4 border border-border/50">
                <div className="text-gold font-mono text-2xl font-bold mb-1">Ch. 15</div>
                <div className="text-sm text-muted-foreground">The Epstein Network as Vril Logistics</div>
                <p className="text-xs text-muted-foreground/70 mt-2">Zorro Ranch. Little St. James. The temple. The tunnels. What the infrastructure was actually for.</p>
              </div>
              <div className="bg-background/40 rounded-lg p-4 border border-border/50">
                <div className="text-gold font-mono text-2xl font-bold mb-1">App. C</div>
                <div className="text-sm text-muted-foreground">Flight Logs &amp; Property Analysis</div>
                <p className="text-xs text-muted-foreground/70 mt-2">Documented connections to intelligence, science, and political establishments. The full dossier.</p>
              </div>
              <div className="bg-background/40 rounded-lg p-4 border border-border/50">
                <div className="text-gold font-mono text-2xl font-bold mb-1">Ch. 18</div>
                <div className="text-sm text-muted-foreground">UAP Disclosure &amp; Non-Human Intelligence</div>
                <p className="text-xs text-muted-foreground/70 mt-2">Congressional hearings. Whistleblower testimony. Why they stopped saying &ldquo;alien&rdquo; and started saying &ldquo;NHI.&rdquo;</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/read/epstein-network"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-800/80 text-white font-semibold rounded-lg hover:bg-red-700/80 transition-colors border border-red-700/50"
              >
                Read the Epstein Chapter →
              </Link>
              <Link
                href="/read/appendix-c-epstein-network"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-colors"
              >
                View the Full Appendix
              </Link>
              <Link
                href="/read/the-disclosure-parallel"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-colors"
              >
                UAP Disclosure Connection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What This Book Is */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-card border border-border rounded-xl p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            What This Book Is
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed font-serif">
            <p>
              This book presents the testimony of Donald Marshall alongside
              verifiable public records, peer-reviewed science, court documents,
              declassified intelligence files, and mainstream investigative
              journalism.
            </p>
            <p>The reader is invited to evaluate three things:</p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>The internal consistency of the testimony itself</li>
              <li>
                The degree to which verifiable evidence aligns with the claims
              </li>
              <li>
                The epistemological challenge of investigating a system that, by
                its own description, is designed to be invisible
              </li>
            </ol>
            <p>
              <strong className="text-gold">21 chapters</strong> &middot;{" "}
              <strong className="text-gold">7 appendices</strong> &middot;{" "}
              <strong className="text-gold">{availableCount} chapters available now</strong>
              &middot; Free to read, listen, and download.
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">
          Table of Contents
        </h2>
        <div className="space-y-8">
          {chaptersByPart.map(({ part, chapters: partChapters }) => (
            <div key={part.number}>
              <h3 className="text-gold text-sm font-mono uppercase tracking-wider mb-4">
                Part {part.number} — {part.title}
              </h3>
              <div className="space-y-2">
                {partChapters.map((ch) => {
                  const isAvailable = ch.file !== "";
                  return (
                    <div
                      key={ch.slug}
                      className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                        isAvailable
                          ? "border-border hover:border-gold/30 hover:bg-card cursor-pointer"
                          : "border-border/50 opacity-50"
                      }`}
                    >
                      <span className="text-gold font-mono text-sm w-8">
                        {ch.number >= 100 ? String.fromCharCode(65 + (ch.number - 100)) : ch.number.toString().padStart(2, "0")}
                      </span>
                      {isAvailable ? (
                        <Link
                          href={`/read/${ch.slug}`}
                          className="flex-1 text-foreground hover:text-gold transition-colors"
                        >
                          {ch.title}
                        </Link>
                      ) : (
                        <span className="flex-1 text-muted-foreground">
                          {ch.title}
                        </span>
                      )}
                      {isAvailable ? (
                        <span className="text-xs text-gold/60 font-mono">
                          AVAILABLE
                        </span>
                      ) : (
                        <span className="text-xs text-muted font-mono">
                          COMING SOON
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence Hub Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-4">
          The Evidence
        </h2>
        <p className="text-muted-foreground mb-8 font-serif">
          Every cross-reference in this book links to primary sources. Evaluate
          the claims yourself.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Geology",
              desc: "Peer-reviewed geological data from New Mexico basins",
              icon: "🌋",
            },
            {
              title: "The Black Eye Club",
              desc: "Photographic catalog with dates and official explanations",
              icon: "👁",
            },
            {
              title: "Epstein Network",
              desc: "Flight logs, properties, and documented connections",
              icon: "🕸",
            },
            {
              title: "MKUltra",
              desc: "Declassified CIA documents and subproject summaries",
              icon: "🧠",
            },
            {
              title: "Cultural Encoding",
              desc: "Films, songs, and media with thematic parallels",
              icon: "🎬",
            },
            {
              title: "Orphan Trains",
              desc: "Historical records of child transport programs",
              icon: "🚂",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href="/evidence"
              className="bg-card border border-border rounded-lg p-6 hover:border-gold/30 hover:bg-card-hover transition-colors group"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border border-border-light rounded-lg p-6 bg-card/50">
          <p className="text-muted-foreground text-xs leading-relaxed font-mono">
            <span className="text-gold">DISCLAIMER:</span> No claim in this
            book is presented as proven fact unless independently verified. Where
            verification is impossible, the text states this explicitly. The
            documented facts alone—Jeffrey Epstein&apos;s network, MKUltra&apos;s
            verified programs, elite impunity, unexplained disappearances,
            geological anomalies, architectural mysteries—are sufficient to
            warrant serious investigation regardless of one&apos;s position on the
            Vril hypothesis itself.
          </p>
        </div>
      </section>
    </div>
  );
}

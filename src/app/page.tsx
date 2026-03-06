import Link from "next/link";
import { chapters, getChaptersByPart, getAvailableChapters } from "@/lib/chapters";

export default function HomePage() {
  const chaptersByPart = getChaptersByPart();
  const availableCount = getAvailableChapters().length;
  const chapterCount = chapters.filter((c) => c.number > 0 && c.number < 100).length;
  const appendixCount = chapters.filter((c) => c.number >= 100).length;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 text-center relative">
          <p className="text-gold/60 text-sm font-mono uppercase tracking-[0.3em] mb-6">
            Testimony · Documents · Science · Cosmology
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight mb-6">
            THE VRIL
            <br />
            <span className="text-gold">DOSSIER</span>
          </h1>

          {/* The Hook — expanded thesis reflecting full scope */}
          <p className="text-foreground text-xl sm:text-2xl max-w-3xl mx-auto mb-4 leading-snug font-semibold">
            3.5&nbsp;million pages of Epstein files. Plasma physics. Biblical cosmology.
            Birth rate collapse. Consciousness itself.
          </p>
          <p className="text-gold text-lg sm:text-xl max-w-2xl mx-auto mb-4 font-serif italic">
            What if the conspiracy, the science, and the ancient texts are describing the same thing?
          </p>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
            This investigation cross-references whistleblower testimony with the
            2026 DOJ Epstein release, declassified CIA files, peer-reviewed geology,
            electromagnetic field theory, Islamic and Christian eschatology, and the
            cosmological structure of consciousness — presenting a single, falsifiable
            hypothesis with its evidence, its gaps, and its falsification criteria.
          </p>

          {/* Source strip — expanded to reflect new material */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
            {[
              { label: "DOJ Epstein Files", sub: "3.5M pages (2026)" },
              { label: "CIA Archives", sub: "MKUltra declassified" },
              { label: "Geology & Physics", sub: "Peer-reviewed" },
              { label: "Congress", sub: "UAP/NHI hearings" },
              { label: "Court Records", sub: "Sealed & unsealed" },
              { label: "Patent Filings", sub: "Church · Lieber · MIT" },
              { label: "Islamic Cosmology", sub: "Djinn / plasma" },
              { label: "Demographics", sub: "Global fertility data" },
            ].map((s) => (
              <div key={s.label} className="bg-card/60 border border-border/50 rounded-lg px-3 py-2">
                <div className="text-foreground text-sm font-semibold">{s.label}</div>
                <div className="text-muted text-xs font-mono">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/read/frontmatter"
              className="inline-flex items-center justify-center px-8 py-3 bg-gold text-background font-semibold rounded-lg hover:bg-gold-dim transition-colors text-lg"
            >
              Start Reading — Free
            </Link>
            <Link
              href="/download"
              className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-colors"
            >
              📥 Download PDF
            </Link>
            <Link
              href="/listen"
              className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-colors"
            >
              🎧 Listen
            </Link>
          </div>

          <blockquote className="text-muted-foreground italic text-base max-w-lg mx-auto font-serif border-l-2 border-gold/30 pl-4 text-left">
            &ldquo;They laughed at me when I said I just want to tell the world
            about this. They said nobody&apos;s ever going to believe me.&rdquo;
            <footer className="mt-2 text-sm text-muted not-italic">
              — Donald Marshall
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Featured: The 2026 Epstein Files */}
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
              The 2026 Epstein Files
            </h2>
            <p className="text-muted-foreground text-lg font-serif mb-6 max-w-2xl">
              On January 30, 2026, the DOJ released 3.5&nbsp;million pages of Epstein records.
              Independent researchers indexed 524&nbsp;entities and 2,096&nbsp;relationships.
              The science network behind the trafficking — George Church, Charles Lieber,
              Marvin Minsky — reveals a requirements document for consciousness transfer technology.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-background/40 rounded-lg p-4 border border-border/50">
                <div className="text-gold font-mono text-2xl font-bold mb-1">Ch. 27</div>
                <div className="text-sm text-muted-foreground">The Science Network</div>
                <p className="text-xs text-muted-foreground/70 mt-2">What 3.5M pages reveal: genetics, neural lace, whole brain emulation, and the seven research domains.</p>
              </div>
              <div className="bg-background/40 rounded-lg p-4 border border-border/50">
                <div className="text-gold font-mono text-2xl font-bold mb-1">Ch. 15</div>
                <div className="text-sm text-muted-foreground">Epstein as Vril Logistics</div>
                <p className="text-xs text-muted-foreground/70 mt-2">Zorro Ranch. Little St. James. The temple. The tunnels. What the infrastructure was actually for.</p>
              </div>
              <div className="bg-background/40 rounded-lg p-4 border border-border/50">
                <div className="text-gold font-mono text-2xl font-bold mb-1">Ch. 28</div>
                <div className="text-sm text-muted-foreground">The Research Program</div>
                <p className="text-xs text-muted-foreground/70 mt-2">Testable claims, convergent evidence, and the path to resolution. How to verify the hypothesis.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/read/the-science-network"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-800/80 text-white font-semibold rounded-lg hover:bg-red-700/80 transition-colors border border-red-700/50"
              >
                Read the Science Network →
              </Link>
              <Link
                href="/read/epstein-network"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-colors"
              >
                The Original Epstein Chapter
              </Link>
              <Link
                href="/read/the-research-program"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-card transition-colors"
              >
                The Research Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Deeper Reality — new section for Parts VII–IX */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Smokeless Fire / Plasma */}
          <div className="bg-gradient-to-br from-blue-950/30 via-card to-card border border-blue-900/40 rounded-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue bg-blue/10 px-3 py-1 rounded-full border border-blue/20">
                The Deeper Reality
              </span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">
                Smokeless Fire
              </h3>
              <p className="text-muted-foreground text-sm font-serif mb-4">
                The Quran describes djinn as created from &ldquo;smokeless fire&rdquo; —
                a precise description of plasma. Plasma physics, electromagnetic consciousness
                theory, and Islamic cosmology converge on the same entity.
              </p>
              <Link
                href="/read/the-smokeless-fire"
                className="inline-flex items-center gap-2 text-sm text-blue hover:text-gold transition-colors font-semibold"
              >
                Ch. 29 — Djinn, Plasma, and the EM Parasite →
              </Link>
            </div>
          </div>

          {/* Cosmological Foundation */}
          <div className="bg-gradient-to-br from-gold/5 via-card to-card border border-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                Cosmology
              </span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">
                Consciousness Is All That There Is
              </h3>
              <p className="text-muted-foreground text-sm font-serif mb-4">
                The entire framework — parasitism, defense, the coherent integral —
                only makes sense against the actual structure of reality. Not political.
                Not biological. Cosmological.
              </p>
              <Link
                href="/read/the-cosmological-foundation"
                className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-dim transition-colors font-semibold"
              >
                Ch. 26 — The Cosmological Foundation →
              </Link>
            </div>
          </div>

          {/* Birth Rate Collapse */}
          <div className="bg-gradient-to-br from-red-950/20 via-card to-card border border-red-900/30 rounded-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="relative">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-red-400 bg-red-950/40 px-3 py-1 rounded-full border border-red-900/30">
                The Endgame
              </span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">
                The Industrial Invasion
              </h3>
              <p className="text-muted-foreground text-sm font-serif mb-4">
                Every industrialized nation is below replacement fertility. South Korea: 0.72.
                If a parasitic intelligence wanted to replace natural human reproduction
                with manufactured bodies it controls — this is exactly what the data would look like.
              </p>
              <Link
                href="/read/the-industrial-invasion"
                className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-gold transition-colors font-semibold"
              >
                Ch. 32 — Birth Rate Collapse and the Endgame →
              </Link>
            </div>
          </div>

          {/* UAP Disclosure */}
          <div className="bg-gradient-to-br from-emerald-950/20 via-card to-card border border-emerald-900/30 rounded-xl p-6 sm:p-8 relative overflow-hidden">
            <div className="relative">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/30">
                Disclosure
              </span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3">
                Non-Human Intelligence
              </h3>
              <p className="text-muted-foreground text-sm font-serif mb-4">
                Congressional UAP hearings. Whistleblower testimony under oath.
                Why they stopped saying &ldquo;alien&rdquo; and started saying &ldquo;NHI.&rdquo;
                The ultraterrestrial hypothesis.
              </p>
              <Link
                href="/read/the-disclosure-parallel"
                className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-gold transition-colors font-semibold"
              >
                Ch. 18 — UAP Disclosure and the Parallel →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What This Book Is */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-card border border-border rounded-xl p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            A Synthesis, Not a Manifesto
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed font-serif">
            <p>
              This book does not ask you to believe. It collects testimony from
              multiple independent whistleblowers, then cross-references every
              verifiable claim against the public record: the 2026 DOJ Epstein file
              release, declassified CIA archives, peer-reviewed geological surveys,
              electromagnetic field research, patent filings from Epstein-funded
              scientists, congressional UAP hearings, sealed and unsealed court
              documents, Islamic and Christian eschatology, global demographic data,
              and mainstream investigative journalism.
            </p>
            <p>
              The result is a single, structured hypothesis — presented with its
              evidence, its gaps, and its falsification criteria. The reader
              evaluates:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>Whether the sources converge or contradict</li>
              <li>
                Where documented evidence aligns with the unverifiable claims
              </li>
              <li>
                What it means when Epstein&apos;s science network, MKUltra,
                UAP disclosure, plasma physics, Biblical cosmology, and global
                birth rate collapse all point to the same infrastructure
              </li>
            </ol>
            <p>
              <strong className="text-gold">{chapterCount} chapters</strong> &middot;{" "}
              <strong className="text-gold">{appendixCount} appendices</strong> &middot;{" "}
              <strong className="text-gold">{availableCount} available now</strong>
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

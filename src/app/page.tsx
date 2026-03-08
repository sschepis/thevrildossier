import Link from "next/link";
import { chapters, getAvailableChapters } from "@/lib/chapters";

export default function HomePage() {
  const availableCount = getAvailableChapters().length;
  const chapterCount = chapters.filter((c) => c.number > 0 && c.number < 100).length;
  const appendixCount = chapters.filter((c) => c.number >= 100).length;

  return (
    <div>
      {/* ─── Hero ─── */}
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

          <p className="text-foreground text-xl sm:text-2xl max-w-3xl mx-auto mb-4 leading-snug font-semibold">
            Five independent witnesses. Four decades. Zero contact between them.
          </p>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-serif leading-relaxed">
            They describe the same entity, the same infrastructure, and the same
            method of control — and the 2026 Epstein files just corroborated the
            science network behind it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </div>
      </section>

      {/* ─── Three Doors ─── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Door 1 — Epstein Science */}
          <Link
            href="/read/the-science-network"
            className="group bg-gradient-to-br from-red-950/40 via-card to-card border border-red-900/40 rounded-xl p-6 sm:p-8 relative overflow-hidden hover:border-red-700/60 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-900/50">
                Ch. 27
              </span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3 group-hover:text-gold transition-colors">
                Why did Epstein fund consciousness transfer research?
              </h3>
              <p className="text-muted-foreground text-sm font-serif mb-4">
                3.5&nbsp;million pages. George Church. Charles Lieber. Marvin Minsky.
                The DOJ release reveals seven research domains — all converging
                on the same technology.
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-red-400 group-hover:text-gold transition-colors font-semibold">
                The Science Network →
              </span>
            </div>
          </Link>

          {/* Door 2 — Smokeless Fire */}
          <Link
            href="/read/the-smokeless-fire"
            className="group bg-gradient-to-br from-blue-950/30 via-card to-card border border-blue-900/40 rounded-xl p-6 sm:p-8 relative overflow-hidden hover:border-blue-700/60 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue bg-blue/10 px-3 py-1 rounded-full border border-blue/20">
                Ch. 29
              </span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3 group-hover:text-gold transition-colors">
                The Quran describes them as &ldquo;smokeless fire.&rdquo; Plasma
                physicists describe the same thing.
              </h3>
              <p className="text-muted-foreground text-sm font-serif mb-4">
                Islamic cosmology, electromagnetic consciousness theory, and
                peer-reviewed plasma physics converge on a single entity class.
                Coincidence — or observation?
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-blue group-hover:text-gold transition-colors font-semibold">
                The Smokeless Fire →
              </span>
            </div>
          </Link>

          {/* Door 3 — Industrial Invasion */}
          <Link
            href="/read/the-industrial-invasion"
            className="group bg-gradient-to-br from-gold/5 via-card to-card border border-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden hover:border-gold/40 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                Ch. 32
              </span>
              <h3 className="text-xl font-bold text-white mt-4 mb-3 group-hover:text-gold transition-colors">
                Every industrialized nation is below replacement fertility. What
                if that&apos;s not an accident?
              </h3>
              <p className="text-muted-foreground text-sm font-serif mb-4">
                South Korea: 0.72. Japan: 1.20. EU average: 1.46. If a parasitic
                intelligence needed manufactured bodies it controls, this is
                exactly what the data would look like.
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-gold group-hover:text-gold-dim transition-colors font-semibold">
                The Industrial Invasion →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── The Convergence ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Five Sources. One Pattern.
          </h2>
          <p className="text-muted-foreground text-lg font-serif max-w-2xl mx-auto">
            Independent witnesses who never met each other, spanning four
            decades and five cultural contexts, describe the same phenomenon
            with the same operational details.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {[
            {
              name: "Phil Schneider",
              context: "Military engineer",
              year: "1995",
              detail: "Underground bases, NHI contact",
            },
            {
              name: "Islamic Tradition",
              context: "1,400 years of cosmology",
              year: "632+",
              detail: "Djinn: smokeless fire entities",
            },
            {
              name: "WingMakers",
              context: "Anonymous disclosure",
              year: "1998",
              detail: "Consciousness harvesting",
            },
            {
              name: "David Grusch",
              context: "USAF intelligence",
              year: "2023",
              detail: "NHI, crash retrieval",
            },
            {
              name: "Epstein Files",
              context: "DOJ release",
              year: "2026",
              detail: "Science network funding",
            },
          ].map((source) => (
            <div
              key={source.name}
              className="bg-card border border-border rounded-lg p-4 text-center hover:border-gold/30 transition-colors"
            >
              <div className="text-gold font-mono text-xs mb-2">
                {source.year}
              </div>
              <div className="text-white text-sm font-semibold mb-1">
                {source.name}
              </div>
              <div className="text-muted-foreground text-xs font-serif">
                {source.context}
              </div>
              <div className="mt-2 pt-2 border-t border-border/50 text-muted text-xs">
                {source.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Convergence arrow */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 text-gold/60 text-sm font-mono">
            <span className="h-px w-12 bg-gold/30" />
            CONVERGE
            <span className="h-px w-12 bg-gold/30" />
          </div>
        </div>

        <div className="bg-card border border-gold/30 rounded-xl p-6 sm:p-8 text-center">
          <p className="text-gold text-lg font-serif italic mb-3">
            Same entity. Same infrastructure. Same method of control.
          </p>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-4">
            This book traces the convergence across every domain — testimony,
            science, cosmology, demographics, and declassified records — and
            presents one falsifiable hypothesis.
          </p>
          <Link
            href="/read/the-man-who-remembered"
            className="inline-flex items-center justify-center px-6 py-2 bg-gold/10 text-gold font-semibold rounded-lg hover:bg-gold/20 transition-colors border border-gold/30 text-sm"
          >
            Begin with Chapter 1 — The Pattern Before the Witness →
          </Link>
        </div>
      </section>

      {/* ─── Methodology Strip ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-card border border-border rounded-xl p-6 sm:p-8">
          <div>
            <h2 className="text-lg font-bold text-white mb-2">
              A Synthesis, Not a Manifesto
            </h2>
            <p className="text-muted-foreground text-sm font-serif max-w-lg">
              Every claim is cross-referenced against primary sources.
              Falsification criteria are stated explicitly. The reader evaluates
              — the book does not ask you to believe.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-center">
              <div className="text-gold font-mono text-2xl font-bold">
                {chapterCount}
              </div>
              <div className="text-muted text-xs">chapters</div>
            </div>
            <div className="text-center">
              <div className="text-gold font-mono text-2xl font-bold">
                {appendixCount}
              </div>
              <div className="text-muted text-xs">appendices</div>
            </div>
            <div className="text-center">
              <div className="text-gold font-mono text-2xl font-bold">
                {availableCount}
              </div>
              <div className="text-muted text-xs">available</div>
            </div>
            <Link
              href="/read"
              className="inline-flex items-center justify-center px-5 py-2 bg-gold text-background font-semibold rounded-lg hover:bg-gold-dim transition-colors text-sm whitespace-nowrap"
            >
              Full Contents →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Evidence Strip ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">The Evidence</h2>
          <Link
            href="/evidence"
            className="text-sm text-gold hover:text-gold-dim transition-colors font-semibold"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              title: "Geology",
              desc: "Peer-reviewed basin surveys",
              icon: "🌋",
            },
            {
              title: "Black Eye Club",
              desc: "Photographic catalog",
              icon: "👁",
            },
            {
              title: "Epstein Network",
              desc: "Flight logs & connections",
              icon: "🕸",
            },
            {
              title: "MKUltra",
              desc: "Declassified CIA docs",
              icon: "🧠",
            },
            {
              title: "Cultural Encoding",
              desc: "Films, songs, media",
              icon: "🎬",
            },
            {
              title: "Orphan Trains",
              desc: "Historical records",
              icon: "🚂",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href="/evidence"
              className="bg-card border border-border rounded-lg p-4 hover:border-gold/30 hover:bg-card-hover transition-colors group text-center"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white text-sm font-semibold mb-1 group-hover:text-gold transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-xs">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Disclaimer ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <p className="text-muted text-xs text-center font-mono leading-relaxed max-w-2xl mx-auto">
          <span className="text-gold">DISCLAIMER:</span> No claim is presented
          as proven fact unless independently verified. Where verification is
          impossible, the text states this explicitly. The documented facts
          alone warrant serious investigation regardless of one&apos;s position
          on the Vril hypothesis itself.
        </p>
      </section>
    </div>
  );
}

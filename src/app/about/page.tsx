import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — The Vril Dossier",
  description:
    "About The Vril Dossier: the electromagnetic ecology hypothesis, convergence methodology, and how to read this investigation.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">About This Book</h1>

      <div className="prose">
        <h2>What This Book Is</h2>
        <p>
          <em>The Vril Dossier</em> is a comprehensive investigation built on
          a single scientific hypothesis: Earth&apos;s electromagnetic resonance
          cavity — the Schumann-bounded shell between surface and ionosphere —
          hosts a coherent electromagnetic ecology. The book synthesizes
          peer-reviewed plasma physics, consciousness research, geomagnetic data,
          declassified intelligence files, court documents, and convergent
          testimony to construct and test this model.
        </p>
        <p>
          No claim is presented as proven fact unless independently verified.
          Where verification is impossible, the text states this explicitly.
        </p>

        <h2>Methodology: Convergence Science</h2>
        <p>The investigation rests on three peer-reviewed scientific pillars:</p>
        <ol>
          <li>
            <strong>Tsytovich (2007)</strong> — Plasma self-organization: inorganic
            dust-plasma structures spontaneously develop metabolism, reproduction,
            and information storage
          </li>
          <li>
            <strong>Persinger (2014)</strong> — Geomagnetic consciousness coupling:
            the Schumann resonance band correlates with human brain-state
            modulation and anomalous cognition
          </li>
          <li>
            <strong>McFadden (2020)</strong> — CEMI theory: consciousness is
            identical to the brain&apos;s endogenous electromagnetic field,
            meaning any sufficiently coherent EM field is a candidate substrate
            for awareness
          </li>
        </ol>
        <p>
          Seven independent lines of evidence — plasma physics, electromagnetic
          consciousness, geomagnetic anomaly data, ancient cosmological texts,
          whistleblower testimony, demographic patterns, and declassified
          records — are cross-referenced against primary sources and collected
          in the <Link href="/evidence">Evidence Hub</Link> with direct links
          to primary materials.
        </p>

        <h2>Structure</h2>
        <p>The book is organized into ten parts:</p>
        <ul>
          <li>
            <strong>Part I: The Premise and the Witness</strong> — Donald
            Marshall&apos;s testimony, the EM entity taxonomy, and the
            field-coherence parasitization mechanism
          </li>
          <li>
            <strong>Part II: The Infrastructure</strong> — Cloning technology,
            facility architecture, and the geological foundation
          </li>
          <li>
            <strong>Part III: The Operations</strong> — MKUltra, the celebrity
            machine, elite gatherings, and remote assassination
          </li>
          <li>
            <strong>Part IV: The Historical Framework</strong> — The Tartarian
            Reset, orphan trains, eschatology, and the scapegoat mechanism
          </li>
          <li>
            <strong>Part V: The Connections</strong> — The Epstein network,
            cultural encoding, and the detection problem
          </li>
          <li>
            <strong>Part VI: Synthesis and Implications</strong> — The unified
            map, epistemological questions, and final implications
          </li>
          <li>
            <strong>Part VII: The Divine Defense and Ancient War</strong> — The
            divine shield, the Amun Protocol, Atlantis, the Vatican connection,
            and the cosmological foundation
          </li>
          <li>
            <strong>Part VIII: The Science Network</strong> — The 2026 Epstein
            DOJ files, the science network behind the trafficking, and the
            research program
          </li>
          <li>
            <strong>Part IX: The Electromagnetic Ecology</strong> — Smokeless
            fire as plasma description, the container problem, the resonance
            space, the industrial invasion, and the Great Year
          </li>
          <li>
            <strong>Part X: Appendices</strong> — Geological survey data,
            the Black Eye Club, Epstein network maps, cultural encoding
            timeline, MKUltra subprojects, orphan train records, Marshall
            testimony extracts, glossary, and additional reference material
          </li>
        </ul>

        <h2>How to Read</h2>
        <p>
          You can <Link href="/read">read online</Link> chapter by chapter or{" "}
          <Link href="/download">download</Link> in EPUB, PDF, or MOBI format.
          All formats are free. An audiobook is coming soon.
        </p>

        <h2>Disclaimer</h2>
        <p>
          The documented facts alone — Jeffrey Epstein&apos;s science network,
          MKUltra&apos;s verified programs, peer-reviewed plasma self-organization,
          Schumann resonance anomalies, geological cavities, and demographic
          collapse patterns — are sufficient to warrant serious investigation
          regardless of one&apos;s position on the electromagnetic ecology
          hypothesis itself.
        </p>
        <p>
          Some of what follows will be familiar to researchers in this space.
          Some will be new. Some will be deeply uncomfortable—not because it is
          implausible, but because of what it implies if true.
        </p>

        <hr />

        <blockquote>
          <p>
            &ldquo;They laughed at me when I said I just want to tell the world
            about this. They said nobody&apos;s ever going to believe me. You
            won&apos;t put it together in an eloquent way.&rdquo;
          </p>
          <p>— Donald Marshall</p>
        </blockquote>
      </div>
    </div>
  );
}

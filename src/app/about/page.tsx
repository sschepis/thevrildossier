import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — The Vril Dossier",
  description:
    "About The Vril Dossier: methodology, sources, and how to read this investigation.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">About This Book</h1>

      <div className="prose">
        <h2>What This Book Is</h2>
        <p>
          <em>The Vril Dossier</em> is a comprehensive investigation that
          presents the testimony of Donald Marshall alongside verifiable public
          records, peer-reviewed science, court documents, declassified
          intelligence files, and mainstream investigative journalism.
        </p>
        <p>
          No claim is presented as proven fact unless independently verified.
          Where verification is impossible, the text states this explicitly.
        </p>

        <h2>Methodology</h2>
        <p>The reader is invited to evaluate three things:</p>
        <ol>
          <li>The internal consistency of the testimony itself</li>
          <li>
            The degree to which verifiable evidence aligns with the claims
          </li>
          <li>
            The epistemological challenge of investigating a system that, by its
            own description, is designed to be invisible
          </li>
        </ol>
        <p>
          Each chapter cross-references specific claims against independently
          verifiable sources. These cross-references are collected in the{" "}
          <Link href="/evidence">Evidence Hub</Link> with direct links to
          primary materials.
        </p>

        <h2>Structure</h2>
        <p>The book is organized into seven parts:</p>
        <ul>
          <li>
            <strong>Part I: The Premise and the Witness</strong> — Donald
            Marshall&apos;s testimony, the Vril species taxonomy, and the droning
            mechanism
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
        </ul>

        <h2>How to Read</h2>
        <p>
          You can <Link href="/read">read online</Link> chapter by chapter,{" "}
          <Link href="/listen">listen to the audiobook</Link>, or{" "}
          <Link href="/download">download</Link> in EPUB, PDF, or MOBI format.
          All formats are free.
        </p>

        <h2>Disclaimer</h2>
        <p>
          The documented facts alone—Jeffrey Epstein&apos;s network, MKUltra&apos;s
          verified programs, elite impunity, unexplained disappearances,
          geological anomalies, architectural mysteries—are sufficient to warrant
          serious investigation regardless of one&apos;s position on the Vril
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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evidence Hub — The Vril Dossier",
  description:
    "Primary sources, peer-reviewed research, court documents, and declassified intelligence files referenced in The Vril Dossier.",
};

const sections = [
  {
    slug: "geology",
    title: "Geological Survey Data",
    icon: "🌋",
    description:
      "Peer-reviewed geological data from New Mexico basins. Methane concentrations, thermal anomalies, and sulfur systems documented by the EPA, OSTI, and academic institutions.",
    sources: [
      {
        title: "Subsurface Methane - New Mexico (Dunn Hydrology)",
        url: "https://www.dunnhydrogeo.com/home/subsurface-methane---new-mexico-nt",
      },
      {
        title: "Raton Basin Coalbed Methane (NMT)",
        url: "https://geoinfo.nmt.edu/publications/periodicals/nmg/25/n4/nmg_v25_n4_p95.pdf",
      },
      {
        title: "Subsurface Environmental Assessment (EPA)",
        url: "https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=9101DLKQ.TXT",
      },
      {
        title: "Valles Caldera Geophysical Data (OSTI)",
        url: "https://www.osti.gov/servlets/purl/6564207",
      },
      {
        title: "Laramide Orogeny in New Mexico (ResearchGate)",
        url: "https://www.researchgate.net/publication/291806142_Laramide_orogeny_in_central_and_northern_New_Mexico_and_southern_Colorado",
      },
    ],
    chapters: [6],
  },
  {
    slug: "black-eye-club",
    title: "The Black Eye Club",
    icon: "👁",
    description:
      "Documented cases of high-profile figures appearing with unexplained periorbital bruising, with dates, official explanations, and photographic evidence from public media.",
    sources: [
      {
        title: "PolitiFact Fact-Check (Aug 2023)",
        url: "https://www.politifact.com/factchecks/2023/aug/10/facebook-posts/are-black-eyes-on-newsmakers-evidence-theyre-in-th/",
      },
    ],
    chapters: [3],
  },
  {
    slug: "epstein-network",
    title: "The Epstein Network",
    icon: "🕸",
    description:
      "Flight logs, property analysis, and documented connections of Jeffrey Epstein's network, drawn from court records and investigative journalism.",
    sources: [
      {
        title: "Zorro Ranch Investigation (The Sun, 2019)",
        url: "https://www.the-sun.com/news/171241/jeffrey-epstein-zorro-ranch-temple-blue-dome-hidden-tunnels/",
      },
      {
        title: "Inside Zorro Ranch (The Daily Beast, 2019)",
        url: "https://www.thedailybeast.com/jeffrey-epstein-zorro-ranch-inside-the-pedophile-billionaires-new-mexico-estate",
      },
      {
        title: "Zorro Ranch Photos (Business Insider, 2019)",
        url: "https://www.insider.com/jeffrey-epstein-zorro-ranch-new-mexico-house-photos-2019-8",
      },
    ],
    chapters: [5, 15],
  },
  {
    slug: "mkultra",
    title: "MKUltra Declassified",
    icon: "🧠",
    description:
      "Declassified CIA documents, Church Committee testimony, and academic research on the MKUltra mind control program and its 149 subprojects.",
    sources: [
      {
        title: "CIA FOIA MKUltra Collection",
        url: "https://www.cia.gov/readingroom/collection/mkultra",
      },
      {
        title: "Church Committee Reports (Senate.gov)",
        url: "https://www.intelligence.senate.gov/resources/intelligence-related-commissions",
      },
    ],
    chapters: [1, 7],
  },
  {
    slug: "cultural-encoding",
    title: "Cultural Encoding Timeline",
    icon: "🎬",
    description:
      "Films, television shows, music videos, and cultural products referenced in Marshall's testimony, with release dates and thematic parallels.",
    sources: [],
    chapters: [4, 8, 16],
  },
  {
    slug: "orphan-trains",
    title: "Orphan Train Records",
    icon: "🚂",
    description:
      "Historical records of the Children's Aid Society child transport programs (1854–1929), documented by the Orphan Train Heritage Society of America.",
    sources: [],
    chapters: [12],
  },
  {
    slug: "bloodlines",
    title: "Bloodlines of the Illuminati",
    icon: "📜",
    description:
      "Fritz Springmeier's work, notably recovered from the Abbottabad compound (CIA declassified, 2017).",
    sources: [
      {
        title: "Bloodlines of Illuminati — CIA Abbottabad Files",
        url: "https://www.cia.gov/library/abbottabad-compound/FC/FC2F5371043C48FDD95AEDE7B8A49624_Springmeier.-.Bloodlines.of.the.Illuminati.R.pdf",
      },
    ],
    chapters: [13],
  },
  {
    slug: "marshall-testimony",
    title: "The Marshall Testimony",
    icon: "🎤",
    description:
      "The primary source material: Donald Marshall's own words, as documented and published through the Donald Marshall Revolution.",
    sources: [
      {
        title: "Donald Marshall Revolution",
        url: "https://donaldmarshallrevolution.com/",
      },
    ],
    chapters: [1, 2, 3, 4, 5],
  },
];

export default function EvidencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Evidence Hub</h1>
      <p className="text-muted-foreground mb-4 font-serif max-w-3xl">
        Every cross-reference in The Vril Dossier is grounded in publicly
        available sources. This page collects the primary materials so you can
        evaluate the claims yourself.
      </p>
      <p className="text-muted text-sm mb-12 font-mono">
        Sources include: peer-reviewed science, court records, declassified
        intelligence files, and mainstream investigative journalism.
      </p>

      <div className="space-y-8">
        {sections.map((section) => (
          <div
            key={section.slug}
            id={section.slug}
            className="bg-card border border-border rounded-xl p-6 sm:p-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">{section.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-sm mt-1 font-serif">
                  {section.description}
                </p>
              </div>
            </div>

            {section.sources.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-muted mb-3">
                  Primary Sources
                </h4>
                <div className="space-y-2">
                  {section.sources.map((src) => (
                    <a
                      key={src.url}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue hover:text-gold transition-colors"
                    >
                      <span className="text-muted">🔗</span>
                      {src.title}
                      <span className="text-muted text-xs">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {section.chapters.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs text-muted font-mono">
                  Referenced in:{" "}
                  {section.chapters
                    .map((n) => `Chapter ${n}`)
                    .join(", ")}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

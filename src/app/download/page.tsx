import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Download — The Vril Dossier",
  description:
    "Download The Vril Dossier in EPUB, PDF, or MOBI format. Free.",
};

export default function DownloadPage() {
  const formats = [
    {
      name: "PDF",
      icon: "📄",
      desc: "Best for desktop reading and printing. Formatted via LaTeX.",
      file: "/downloads/the_vril_dossier.pdf",
      size: "~350 KB",
      available: true,
    },
    {
      name: "EPUB",
      icon: "📱",
      desc: "For Apple Books, Kobo, and most e-readers.",
      file: "/downloads/the_vril_dossier.epub",
      size: "Coming soon",
      available: false,
    },
    {
      name: "MOBI",
      icon: "📖",
      desc: "For Kindle devices.",
      file: "/downloads/the_vril_dossier.mobi",
      size: "Coming soon",
      available: false,
    },
    {
      name: "Audiobook (ZIP)",
      icon: "🎧",
      desc: "All chapter MP3s in a single download.",
      file: "/downloads/the_vril_dossier_audio.zip",
      size: "Coming soon",
      available: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Download</h1>
      <p className="text-muted-foreground mb-12 font-serif">
        The Vril Dossier is free to download in multiple formats. No sign-up
        required.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {formats.map((fmt) => (
          <div
            key={fmt.name}
            className={`bg-card border border-border rounded-xl p-6 ${
              fmt.available
                ? "hover:border-gold/30 transition-colors"
                : "opacity-50"
            }`}
          >
            <div className="text-4xl mb-4">{fmt.icon}</div>
            <h3 className="text-white font-bold text-lg mb-1">{fmt.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{fmt.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted font-mono">{fmt.size}</span>
              {fmt.available ? (
                <a
                  href={fmt.file}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-background text-sm font-semibold rounded-lg hover:bg-gold-dim transition-colors"
                >
                  📥 Download
                </a>
              ) : (
                <span className="text-xs text-muted font-mono">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-card border border-border rounded-lg p-6">
        <h3 className="text-white font-semibold mb-3">
          Prefer to read online?
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          You can read the entire book in your browser with our chapter-by-chapter
          reader, complete with table of contents and reading progress.
        </p>
        <Link
          href="/read"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-foreground hover:border-gold/30 transition-colors"
        >
          📖 Read Online →
        </Link>
      </div>
    </div>
  );
}

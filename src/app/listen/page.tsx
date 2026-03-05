import type { Metadata } from "next";
import { getAvailableChapters } from "@/lib/chapters";
import AudioBookPlayer from "@/components/AudioBookPlayer";

export const metadata: Metadata = {
  title: "Listen — The Vril Dossier Audiobook",
  description:
    "Listen to The Vril Dossier as a free audiobook. AI-narrated chapter-by-chapter.",
};

export default function ListenPage() {
  const availableChapters = getAvailableChapters();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Audiobook</h1>
      <p className="text-muted-foreground mb-8 font-serif">
        Listen to The Vril Dossier narrated chapter by chapter. Free to stream
        and download.
      </p>

      <AudioBookPlayer chapters={availableChapters} />

      <div className="mt-12 bg-card border border-border rounded-lg p-6">
        <h3 className="text-white font-semibold mb-3">Subscribe via Podcast</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Podcast RSS feed coming soon. You&apos;ll be able to listen in your
          favorite podcast app.
        </p>
        <div className="flex gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-card-hover border border-border rounded-lg text-sm text-muted-foreground opacity-50 cursor-not-allowed">
            📡 RSS Feed — Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}

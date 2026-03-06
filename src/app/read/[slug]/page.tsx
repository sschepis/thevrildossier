import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getChapter,
  getNextChapter,
  getPrevChapter,
  chapters,
} from "@/lib/chapters";
import { loadChapter } from "@/lib/content-loader";
import {
  renderMarkdownToHtml,
  extractToc,
  estimateReadingTime,
} from "@/lib/markdown";
import ReadingProgress from "@/components/ReadingProgress";
import ChapterSidebar from "@/components/ChapterSidebar";
import AudioPlayerInline from "@/components/AudioPlayerInline";
import RelatedChapters from "@/components/RelatedChapters";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return chapters
    .filter((c) => c.file !== "")
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return { title: "Not Found" };
  return {
    title: `${chapter.title} — The Vril Dossier`,
    description: chapter.epigraph || `Chapter ${chapter.number} of The Vril Dossier`,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter || chapter.file === "") {
    notFound();
  }

  // Load content once from the cached content-loader (avoids double file read)
  const chapterData = loadChapter(slug);
  const rawContent = chapterData?.content || "";
  const html = await renderMarkdownToHtml(rawContent);
  const toc = extractToc(html);
  const readingTime = estimateReadingTime(rawContent);
  const prev = getPrevChapter(slug);
  const next = getNextChapter(slug);
  const nextAvailable = next && next.file !== "" ? next : undefined;

  return (
    <>
      <ReadingProgress />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chapter Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <Link href="/read" className="hover:text-foreground transition-colors">
              ← All Chapters
            </Link>
            <span className="text-border">|</span>
            <span className="text-gold/60 font-mono text-xs uppercase tracking-wider">
              Part {chapter.part} — {chapter.partTitle}
            </span>
          </div>

          {chapter.number > 0 && chapter.number < 100 && (
            <p className="text-muted font-mono text-sm mb-2">
              Chapter {chapter.number}
            </p>
          )}
          {chapter.number >= 100 && (
            <p className="text-muted font-mono text-sm mb-2">
              Appendix {String.fromCharCode(65 + (chapter.number - 100))}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {chapter.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{readingTime} min read</span>
            <span className="text-border">·</span>
            <AudioPlayerInline slug={slug} />
          </div>

          {chapter.epigraph && (
            <div className="epigraph mt-6">
              <p>{chapter.epigraph}</p>
            </div>
          )}
        </div>

        {/* Content with Sidebar */}
        <div className="flex gap-12 justify-center">
          <article
            className="prose flex-1 max-w-3xl"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <ChapterSidebar toc={toc} />
        </div>

        {/* Related Chapters */}
        <RelatedChapters slug={slug} />

        {/* Chapter Navigation */}
        <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-border">
          <div className="flex justify-between items-center">
            {prev && prev.file !== "" ? (
              <Link
                href={`/read/${prev.slug}`}
                className="group flex flex-col"
              >
                <span className="text-xs text-muted-foreground group-hover:text-gold transition-colors">
                  ← Previous
                </span>
                <span className="text-foreground group-hover:text-gold transition-colors font-medium">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextAvailable ? (
              <Link
                href={`/read/${nextAvailable.slug}`}
                className="group flex flex-col text-right"
              >
                <span className="text-xs text-muted-foreground group-hover:text-gold transition-colors">
                  Next →
                </span>
                <span className="text-foreground group-hover:text-gold transition-colors font-medium">
                  {nextAvailable.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import { getRelatedChapters, type ChapterData } from "@/lib/content-loader";

interface RelatedChaptersProps {
  slug: string;
}

function formatLabel(num: number): string {
  if (num === 0) return "Frontmatter";
  if (num >= 100) return `App. ${String.fromCharCode(65 + (num - 100))}`;
  return `Ch. ${num}`;
}

export default function RelatedChapters({ slug }: RelatedChaptersProps) {
  const related = getRelatedChapters(slug, 4);

  if (related.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
      <h3 className="text-sm font-mono text-gold/60 uppercase tracking-wider mb-4">
        Related Chapters
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((ch: ChapterData) => (
          <Link
            key={ch.slug}
            href={`/read/${ch.slug}`}
            className="group flex items-start gap-3 p-4 rounded-lg border border-border hover:border-gold/40 hover:bg-card transition-all"
          >
            <span className="text-gold font-mono text-sm font-bold mt-0.5 flex-shrink-0">
              {formatLabel(ch.number)}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-semibold group-hover:text-gold transition-colors truncate">
                {ch.title}
              </h4>
              {ch.tags && ch.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {ch.tags.filter(t => t !== "appendix").slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="text-gold/40 group-hover:text-gold transition-colors mt-0.5">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

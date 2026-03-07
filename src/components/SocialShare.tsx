"use client";

interface SocialShareProps {
  title: string;
  /** Full URL path, e.g. "/read/the-science-network" */
  path: string;
}

const BASE_URL = "https://thevrildossier.com";

export default function SocialShare({ title, path }: SocialShareProps) {
  const url = `${BASE_URL}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} — The Vril Dossier`);

  const links = [
    {
      label: "𝕏",
      title: "Share on X (Twitter)",
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      label: "FB",
      title: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Reddit",
      title: "Share on Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      label: "✉️",
      title: "Share via Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
        Share
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={link.title}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors text-xs font-semibold"
        >
          {link.label}
        </a>
      ))}
      <button
        onClick={handleCopyLink}
        title="Copy link"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors text-xs"
      >
        🔗
      </button>
    </div>
  );
}

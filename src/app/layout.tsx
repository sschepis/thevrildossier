import type { Metadata } from "next";
import Link from "next/link";
import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thevrildossier.com"),
  title: {
    default: "The Vril Dossier",
    template: "%s | The Vril Dossier",
  },
  description:
    "A comprehensive investigation synthesizing the 2026 Epstein DOJ files, MKUltra archives, plasma physics, Biblical cosmology, and consciousness research into a single falsifiable hypothesis. Free ebook and audiobook.",
  keywords: [
    "Vril Dossier",
    "Donald Marshall",
    "Epstein files 2026",
    "DOJ release",
    "consciousness",
    "plasma physics",
    "djinn",
    "MKUltra",
    "UAP disclosure",
    "non-human intelligence",
    "George Church",
    "Charles Lieber",
    "subterranean hypothesis",
    "birth rate collapse",
    "ebook",
    "audiobook",
  ],
  authors: [{ name: "The Vril Dossier Team" }],
  creator: "The Vril Dossier Team",
  publisher: "The Vril Dossier Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "The Vril Dossier",
    description:
      "A Comprehensive Investigation into the Marshall Testimony and the Subterranean Hypothesis",
    type: "website",
    siteName: "The Vril Dossier",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Vril Dossier Cover Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Vril Dossier",
    description:
      "A Comprehensive Investigation into the Marshall Testimony and the Subterranean Hypothesis",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${sourceSerif.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-background text-foreground`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

function Navigation() {
  return (
    <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-gold font-bold text-lg tracking-tight">
              THE VRIL DOSSIER
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/read"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Read
            </Link>
            <Link
              href="/listen"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Listen
            </Link>
            <Link
              href="/download"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Download
            </Link>
            <Link
              href="/evidence"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Evidence
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/search"
              className="text-muted-foreground hover:text-gold transition-colors"
              title="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </Link>
          </div>
          <div className="md:hidden">
            <MobileMenuButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenuButton() {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer p-2 text-muted-foreground hover:text-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </summary>
      <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-xl py-2 z-50">
        <Link href="/read" className="block px-4 py-2 text-sm hover:bg-card-hover">
          Read
        </Link>
        <Link href="/listen" className="block px-4 py-2 text-sm hover:bg-card-hover">
          Listen
        </Link>
        <Link href="/download" className="block px-4 py-2 text-sm hover:bg-card-hover">
          Download
        </Link>
        <Link href="/evidence" className="block px-4 py-2 text-sm hover:bg-card-hover">
          Evidence
        </Link>
        <Link href="/about" className="block px-4 py-2 text-sm hover:bg-card-hover">
          About
        </Link>
        <Link href="/search" className="block px-4 py-2 text-sm hover:bg-card-hover">
          🔍 Search
        </Link>
      </div>
    </details>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gold font-bold text-sm tracking-wide uppercase mb-3">
              The Vril Dossier
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A comprehensive investigation into the Marshall testimony and the
              subterranean hypothesis. Free to read, listen, and download.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Navigate</h3>
            <div className="flex flex-col gap-2">
              <Link href="/read" className="text-muted-foreground text-sm hover:text-foreground">
                Read Online
              </Link>
              <Link href="/listen" className="text-muted-foreground text-sm hover:text-foreground">
                Audiobook
              </Link>
              <Link href="/download" className="text-muted-foreground text-sm hover:text-foreground">
                Download
              </Link>
              <Link href="/evidence" className="text-muted-foreground text-sm hover:text-foreground">
                Evidence Hub
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Legal</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              This book presents testimony alongside verifiable public records,
              peer-reviewed science, court documents, and declassified
              intelligence files. No unverified claim is presented as proven
              fact. Presented for informational and research purposes.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted text-xs">
            &ldquo;They said nobody&apos;s ever going to believe me.&rdquo; — Donald
            Marshall
          </p>
        </div>
      </div>
    </footer>
  );
}

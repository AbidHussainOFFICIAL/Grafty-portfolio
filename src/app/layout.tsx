import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight } from "next/font/google";
import { IntroProvider } from "@/components/layout/Intro";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.brand,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // The share image comes from app/opengraph-image.png, which Next.js wires up automatically.
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.brand,
    locale: "en_US",
    title: site.title,
    description: site.shareDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shareDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#c5cdd6",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before the first paint: decides whether the first-visit loader shows. It does on a first
 * visit (nothing in localStorage yet) or with ?intro in the URL, never with reduced motion.
 * Keep the storage key in step with INTRO_STORAGE_KEY in components/layout/Intro.tsx.
 */
const introScript = `try{var d=document.documentElement;if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&(/[?&]intro(=|&|$)/.test(location.search)||!localStorage.getItem("grafty-intro-seen")))d.dataset.intro="show"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${interTight.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd />
        <ScrollProgress />
        <SmoothScroll />
        <IntroProvider>{children}</IntroProvider>
      </body>
    </html>
  );
}

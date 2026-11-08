import type { Metadata } from "next";
import { site } from "@/data/content";

interface PageMetadataInput {
  /** Becomes "<title> | Jessy Linda" through the root layout's template. */
  title: string;
  description?: string;
  /** The page's own address, e.g. "/work". It is also its canonical link. */
  path: string;
  /** False for pages that should stay out of search results. */
  indexable?: boolean;
}

/**
 * Metadata for an inner page. Every page needs its own canonical address, title and share card;
 * without them it would inherit the Home page's.
 */
export function pageMetadata({ title, description, path, indexable = true }: PageMetadataInput): Metadata {
  const shareTitle = `${title} | ${site.name}`;
  return {
    title,
    ...(description && { description }),
    robots: { index: indexable, follow: true },
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.brand,
      locale: "en_US",
      title: shareTitle,
      ...(description && { description }),
    },
    twitter: { card: "summary_large_image", title: shareTitle, ...(description && { description }) },
  };
}

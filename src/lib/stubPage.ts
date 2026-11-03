import type { Metadata } from "next";
import { pageMetadata } from "./pageMetadata";

/** Metadata for a "coming soon" page: not indexed, with its own canonical address. */
export function stubMetadata(title: string, path: string): Metadata {
  return pageMetadata({ title, path, indexable: false });
}

import type { MetadataRoute } from "next";
import { routes, site } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}${routes.work}`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}

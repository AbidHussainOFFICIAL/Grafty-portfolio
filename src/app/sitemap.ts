import type { MetadataRoute } from "next";
import { caseStudiesPublished, projects, routes, site } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}${routes.work}`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...(caseStudiesPublished
      ? projects.map((project) => ({
          url: `${site.url}${routes.work}/${project.id}`,
          lastModified,
          changeFrequency: "yearly" as const,
          priority: 0.6,
        }))
      : []),
  ];
}

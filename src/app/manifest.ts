import type { MetadataRoute } from "next";
import { site } from "@/data/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brand,
    short_name: site.brand,
    description: site.shareDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#c5cdd6",
    theme_color: "#c5cdd6",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

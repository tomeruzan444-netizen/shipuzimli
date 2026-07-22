import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllPages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/${encodeURIComponent("contact")}`, lastModified: now, priority: 0.8 },
    ...getAllPages().map((p) => ({
      url: `${site.url}/${encodeURIComponent(p.slug)}`,
      lastModified: now,
      priority: p.kind === "services" ? 0.9 : 0.5,
    })),
  ];
}

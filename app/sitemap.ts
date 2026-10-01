import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services, specialties } from "@/lib/services";
import { cities } from "@/lib/cities";
import { guides } from "@/lib/guides";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-09-27");
  const u = (p: string) => `${site.url}${p}`;
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1, images: [u("/og.jpg"), u("/images/work/lobby-reef-1200.jpg"), u("/images/work/reef-display.jpg")] },
    { url: u("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: u(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...specialties.map((s) => ({ url: u(`/aquariums/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: u("/service-areas"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...cities.map((c) => ({ url: u(`/aquarium-service/${c.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: u("/our-work"), lastModified: now, changeFrequency: "monthly", priority: 0.7, images: [u("/images/work/lobby-reef.jpg"), u("/images/work/reef-display.jpg")] },
    { url: u("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: u("/reviews"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: u("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: u("/guides"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...guides.map((g) => ({ url: u(`/guides/${g.slug}`), lastModified: new Date(g.date), changeFrequency: "yearly" as const, priority: 0.6 })),
    { url: u("/tools"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...tools.map((t) => ({ url: u(`/tools/${t.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: u("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];
}

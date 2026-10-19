import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { projectSlugsQuery, noteSlugsQuery } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aadi.dev";

  let projectSlugs: { slug: string }[] = [];
  let noteSlugs: { slug: string }[] = [];

  try {
    projectSlugs = await sanityFetch<{ slug: string }[]>({
      query: projectSlugsQuery,
      tags: ["projects"],
    });
  } catch (e) {
    console.error("Failed to fetch project slugs for sitemap:", e);
  }

  try {
    noteSlugs = await sanityFetch<{ slug: string }[]>({
      query: noteSlugsQuery,
      tags: ["notes"],
    });
  } catch (e) {
    console.error("Failed to fetch note slugs for sitemap:", e);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((p) => ({
    url: `${siteUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const noteRoutes: MetadataRoute.Sitemap = noteSlugs.map((n) => ({
    url: `${siteUrl}/notes/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...noteRoutes];
}

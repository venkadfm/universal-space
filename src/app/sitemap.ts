import type { MetadataRoute } from "next";
import { getAllArticles, getArticleDate } from "@/lib/articles";

function getLastModified(date: string) {
  return getArticleDate(date) ?? new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://venveel.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wealth`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = getAllArticles()
    .filter((article) => article.slug && !article.slug.startsWith("_"))
    .map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: getLastModified(article.date),
      changeFrequency: "weekly",
      priority: article.featured ? 0.9 : 0.7,
    }));

  return [...staticPages, ...articlePages];
}

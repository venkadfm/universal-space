import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");
const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export interface ArticleMeta {
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  featured?: boolean;
  slug: string;
  readTime?: string;
  tags?: string[];
}

function isRecord(data: unknown): data is Record<string, unknown> {
  return typeof data === "object" && data !== null;
}

function isArticleMeta(data: unknown): data is ArticleMeta {
  if (!isRecord(data)) {
    return false;
  }

  return (
    typeof data.title === "string" &&
    typeof data.description === "string" &&
    typeof data.category === "string" &&
    typeof data.author === "string" &&
    typeof data.date === "string" &&
    typeof data.slug === "string"
  );
}

function parseArticleMeta(file: string, data: unknown): ArticleMeta {
  if (!isArticleMeta(data)) {
    throw new Error(`Invalid article frontmatter in content/${file}`);
  }

  return {
    ...data,
    featured: Boolean(data.featured),
    readTime: typeof data.readTime === "string" ? data.readTime : undefined,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : undefined,
  };
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"));

  const articles = files.map((file) => {
    const fullPath = path.join(contentDirectory, file);
    const source = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(source);

    return parseArticleMeta(file, data);
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
export function getArticleBySlug(slug: string) {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  return {
    meta: parseArticleMeta(`${slug}.mdx`, data),
    content,
  };
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getArticleDate(date: string): Date | null {
  const monthYear = date.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);

  if (monthYear) {
    const monthIndex = monthNames.indexOf(monthYear[1].toLowerCase());
    const year = Number(monthYear[2]);

    if (monthIndex >= 0 && Number.isInteger(year)) {
      return new Date(Date.UTC(year, monthIndex, 1));
    }
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

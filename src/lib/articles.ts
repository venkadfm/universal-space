import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface ArticleMeta {
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  featured?: boolean;
  slug: string;
}

export function getAllArticles(): ArticleMeta[] {
  const files = fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".mdx"));

  const articles = files.map((file) => {
    const fullPath = path.join(contentDirectory, file);
    const source = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(source);

    return data as ArticleMeta;
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
    meta: data as ArticleMeta,
    content,
  };
}
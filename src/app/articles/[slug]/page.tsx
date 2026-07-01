import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <span className="text-blue-600 font-semibold">
        {article.meta.category}
      </span>

      <h1 className="text-5xl font-bold mt-4 mb-6">
        {article.meta.title}
      </h1>

      <p className="text-xl text-gray-600 leading-8">
        {article.meta.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
        <span>📅 {article.meta.date}</span>
        <span>•</span>
        <span>✍️ {article.meta.author}</span>
      </div>

      <article className="prose prose-lg max-w-none mt-12 whitespace-pre-line">
        {article.content}
      </article>
    </main>
  );
}
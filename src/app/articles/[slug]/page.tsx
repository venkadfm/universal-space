import { notFound } from "next/navigation";
import { articles } from "@/data/articles";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = articles.find((item) => {
    return item.link === `/articles/${slug}`;
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">

      <span className="text-blue-600 font-semibold">
        {article.category}
      </span>

      <h1 className="text-5xl font-bold mt-4 mb-8">
        {article.title}
      </h1>

      <p className="text-xl text-gray-600 leading-8">
        {article.description}
      </p>

      <div className="mt-12 rounded-2xl bg-slate-100 p-8">
        <p className="font-semibold mb-3">
          🚧 This is the beginning of your article.
        </p>

        <p className="text-gray-600">
          Later we'll replace this with full article content written in Markdown.
        </p>
      </div>

    </main>
  );
}
import type { ArticleMeta } from "@/lib/articles";
import ArticleCard from "./Articlecard";

type ArticleListSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  articles: ArticleMeta[];
  emptyText?: string;
};

export default function ArticleListSection({
  eyebrow,
  title,
  description,
  articles,
  emptyText = "New articles will appear here soon.",
}: ArticleListSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-8">
        <p className="section-eyebrow mb-3">{eyebrow}</p>
        <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              category={article.category}
              title={article.title}
              description={article.description}
              readTime={article.readTime}
              link={`/articles/${article.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="premium-surface rounded-2xl p-8 text-slate-600">
          {emptyText}
        </div>
      )}
    </section>
  );
}

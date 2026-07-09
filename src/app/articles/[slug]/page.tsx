import AffiliateCTA from "@/components/article/AffiliateCTA";
import ProductCard from "@/components/article/ProductCard";
import remarkGfm from "remark-gfm";
import {
  RecommendationBox,
  ProTip,
  WarningBox,
} from "@/components/article/ArticleCallouts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug, getArticleDate } from "@/lib/articles";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const mdxComponents = {
  RecommendationBox,
  ProTip,
  WarningBox,
  ProductCard,
  AffiliateCTA,

  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-8 text-3xl font-extrabold tracking-tight text-slate-950"
      {...props}
    />
  ),

  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-8 border-t border-slate-200 pt-6 text-2xl font-bold tracking-tight text-slate-950"
      {...props}
    />
  ),

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-6 text-xl font-bold tracking-tight text-slate-900"
      {...props}
    />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-3 text-base leading-7 text-slate-700" {...props} />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mt-3 space-y-2 pl-6 text-base leading-7 text-slate-700"
      {...props}
    />
  ),

  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="list-disc" {...props} />
  ),

  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-5 rounded-2xl border border-blue-200 bg-blue-50/80 p-5 text-base font-medium leading-7 text-slate-800"
      {...props}
    />
  ),

  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-5 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table
        className="w-full border-collapse bg-white text-left text-sm"
        {...props}
      />
    </div>
  ),

  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-slate-200 bg-slate-100 px-4 py-3 font-bold text-slate-900"
      {...props}
    />
  ),

  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border-b border-slate-100 px-4 py-3 text-slate-700"
      {...props}
    />
  ),

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-semibold text-blue-700 underline-offset-4 hover:underline"
      {...props}
    />
  ),
};

function extractFaqItems(content: string) {
  const faqSection = content.split(/^## Frequently Asked Questions\s*$/m)[1];

  if (!faqSection) {
    return [];
  }

  const beforeNextSection = faqSection.split(/^## /m)[0];
  const matches = [...beforeNextSection.matchAll(/^### (.+)\n+([\s\S]*?)(?=^### |\s*$)/gm)];

  return matches
    .map((match) => {
      const question = match[1].trim();
      const answer = match[2]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();

      return question && answer ? { question, answer } : null;
    })
    .filter((item): item is { question: string; answer: string } => Boolean(item));
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }
  const articleDate = getArticleDate(article.meta.date);
  const articleDateIso = articleDate?.toISOString();

  return {
    title: article.meta.title,
    description: article.meta.description,
    keywords: article.meta.tags,
    alternates: {
      canonical: `/articles/${article.meta.slug}`,
    },
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: "article",
      url: `/articles/${article.meta.slug}`,
      authors: [article.meta.author],
      publishedTime: articleDateIso,
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta.title,
      description: article.meta.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `https://venveel.com/articles/${article.meta.slug}`;
  const articleDateIso = getArticleDate(article.meta.date)?.toISOString();
  const articles = getAllArticles().filter(
    (item) => item.slug && !item.slug.startsWith("_")
  );
  const currentIndex = articles.findIndex((item) => item.slug === slug);
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < articles.length - 1
      ? articles[currentIndex + 1]
      : null;
  const relatedArticles = articles
    .filter(
      (item) =>
        item.slug !== article.meta.slug &&
        (item.category === article.meta.category ||
          item.tags?.some((tag) => article.meta.tags?.includes(tag)))
    )
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.meta.title,
    description: article.meta.description,
    author: {
      "@type": "Organization",
      name: article.meta.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Venveel",
      url: "https://venveel.com",
    },
    datePublished: articleDateIso,
    dateModified: articleDateIso,
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    articleSection: article.meta.category,
    keywords: article.meta.tags?.join(", "),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://venveel.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.meta.category,
          item:
            article.meta.category === "Buying Guides"
              ? "https://venveel.com/buying-guides"
              : article.meta.category === "Wealth"
                ? "https://venveel.com/wealth"
                : "https://venveel.com/ai",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.meta.title,
        item: articleUrl,
      },
    ],
  };
  const faqItems = extractFaqItems(article.content);
  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <main className="min-h-screen px-5 py-10 md:px-6 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article className="premium-surface mx-auto max-w-5xl rounded-3xl p-7 md:p-10">
        <header className="mb-7 border-b border-slate-200 pb-7">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
            {article.meta.category}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">
            {article.meta.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-7 text-slate-600">
            {article.meta.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>{article.meta.date}</span>
            <span>•</span>
            <span>{article.meta.author}</span>
            {article.meta.readTime && (
              <>
                <span>•</span>
                <span>{article.meta.readTime}</span>
              </>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-4xl">
          <MDXRemote
            source={article.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                format: "mdx",
              },
            }}
          />

          {(relatedArticles.length > 0 || previousArticle || nextArticle) && (
            <footer className="mt-12 border-t border-slate-200 pt-8">
              {relatedArticles.length > 0 && (
                <section>
                  <p className="section-eyebrow mb-3">Keep reading</p>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                    Related Articles
                  </h2>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.slug}
                        href={`/articles/${relatedArticle.slug}`}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                      >
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                          {relatedArticle.category}
                        </span>
                        <h3 className="mt-3 text-base font-bold leading-6 text-slate-950">
                          {relatedArticle.title}
                        </h3>
                        {relatedArticle.readTime && (
                          <p className="mt-3 text-sm text-slate-500">
                            {relatedArticle.readTime}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {(previousArticle || nextArticle) && (
                <nav className="mt-8 grid gap-4 md:grid-cols-2">
                  {previousArticle ? (
                    <Link
                      href={`/articles/${previousArticle.slug}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm"
                    >
                      <span className="text-sm font-semibold text-slate-500">
                        Previous
                      </span>
                      <p className="mt-2 font-bold text-slate-950">
                        {previousArticle.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextArticle && (
                    <Link
                      href={`/articles/${nextArticle.slug}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:bg-white hover:shadow-sm md:text-right"
                    >
                      <span className="text-sm font-semibold text-slate-500">
                        Next
                      </span>
                      <p className="mt-2 font-bold text-slate-950">
                        {nextArticle.title}
                      </p>
                    </Link>
                  )}
                </nav>
              )}
            </footer>
          )}
        </div>
      </article>
    </main>
  );
}

import AffiliateCTA from "@/components/article/AffiliateCTA";
import AffiliateNotice from "@/components/article/AffiliateNotice";
import EmailSignup from "@/app/components/EmailSignup";
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
import { ArrowLeft, ArrowRight, Clock, Sparkles } from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type HowToStepJsonLd = {
  "@type": "HowToStep";
  position: number;
  name: string;
  text: string;
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
      className="my-5 rounded-2xl border border-sky-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_70%,#fff7ed_100%)] p-5 text-base font-medium leading-7 text-slate-800"
      {...props}
    />
  ),

  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-5 overflow-x-auto rounded-2xl border border-sky-100 shadow-[0_12px_30px_rgba(14,165,233,0.10)]">
      <table
        className="w-full border-collapse bg-white text-left text-sm"
        {...props}
      />
    </div>
  ),

  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-sky-100 bg-[linear-gradient(135deg,#eff6ff_0%,#fff7ed_100%)] px-4 py-3 font-bold text-slate-950"
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
      className="font-semibold text-sky-700 underline-offset-4 hover:text-orange-700 hover:underline"
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

function stripMdxToText(content: string) {
  return content
    .replace(/\|/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[#*_`>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHowToSteps(content: string) {
  const matches = [
    ...content.matchAll(/^## Screen\s+\d+:\s+(.+)\n+([\s\S]*?)(?=^## Screen\s+\d+:|^## After Filing|^## Frequently Asked Questions|\s*$)/gm),
  ];

  return matches
    .map((match, index) => {
      const name = match[1].trim();
      const text = stripMdxToText(match[2]).slice(0, 500);

      return name && text
        ? {
            "@type": "HowToStep",
            position: index + 1,
            name,
            text,
          }
        : null;
    })
    .filter((item): item is HowToStepJsonLd => Boolean(item));
}

function getCategoryStyle(category: string) {
  if (category === "Buying Guides") {
    return {
      badge: "border-orange-200 bg-orange-50 text-orange-800",
      hero:
        "bg-[radial-gradient(circle_at_12%_12%,rgba(249,115,22,0.24),transparent_24rem),radial-gradient(circle_at_88%_8%,rgba(56,189,248,0.18),transparent_22rem),radial-gradient(circle_at_58%_90%,rgba(15,23,42,0.08),transparent_22rem),linear-gradient(135deg,#fff7ed_0%,#ffffff_48%,#eff6ff_100%)]",
      text: "text-orange-700",
    };
  }

  if (category === "Wealth") {
    return {
      badge: "border-sky-200 bg-sky-50 text-sky-800",
      hero:
        "bg-[radial-gradient(circle_at_12%_12%,rgba(56,189,248,0.22),transparent_24rem),radial-gradient(circle_at_88%_8%,rgba(249,115,22,0.14),transparent_22rem),radial-gradient(circle_at_52%_88%,rgba(15,23,42,0.08),transparent_22rem),linear-gradient(135deg,#eff6ff_0%,#ffffff_48%,#fff7ed_100%)]",
      text: "text-sky-700",
    };
  }

  return {
    badge: "border-sky-200 bg-sky-50 text-sky-800",
    hero:
      "bg-[radial-gradient(circle_at_12%_12%,rgba(56,189,248,0.24),transparent_24rem),radial-gradient(circle_at_88%_8%,rgba(249,115,22,0.16),transparent_22rem),radial-gradient(circle_at_52%_88%,rgba(15,23,42,0.08),transparent_22rem),linear-gradient(135deg,#eff6ff_0%,#ffffff_48%,#fff7ed_100%)]",
    text: "text-sky-700",
  };
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

  const articleUrl = `https://www.venveel.com/articles/${article.meta.slug}`;
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
  const categoryStyle = getCategoryStyle(article.meta.category);

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
      url: "https://www.venveel.com",
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
        item: "https://www.venveel.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.meta.category,
          item:
            article.meta.category === "Buying Guides"
              ? "https://www.venveel.com/buying-guides"
              : article.meta.category === "Wealth"
                ? "https://www.venveel.com/wealth"
                : "https://www.venveel.com/ai",
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
  const howToSteps =
    article.meta.slug === "how-to-file-new-tax-regime-itr-india"
      ? extractHowToSteps(article.content)
      : [];
  const howToJsonLd =
    howToSteps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: article.meta.title,
          description: article.meta.description,
          totalTime: "PT45M",
          step: howToSteps,
        }
      : null;

  return (
    <main className="min-h-screen px-5 py-8 md:px-6 md:py-12">
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
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
      <article className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
        <header className={`${categoryStyle.hero} border-b border-slate-200 p-7 md:p-10`}>
          <Link
            href={
              article.meta.category === "Buying Guides"
                ? "/buying-guides"
                : article.meta.category === "Wealth"
                  ? "/wealth"
                  : "/ai"
            }
            className={`inline-flex items-center gap-2 text-sm font-bold ${categoryStyle.text} transition hover:text-slate-950`}
          >
            <ArrowLeft className="size-4" />
            Back to {article.meta.category}
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <span className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${categoryStyle.badge}`}>
                {article.meta.category}
              </span>

              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
                {article.meta.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
                {article.meta.description}
              </p>
            </div>

            <aside className="rounded-2xl border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-950">
                <Sparkles className={`size-4 ${categoryStyle.text}`} />
                Guide snapshot
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                  <span>Updated</span>
                  <strong className="text-slate-950">{article.meta.date}</strong>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                  <span>Author</span>
                  <strong className="text-slate-950">{article.meta.author}</strong>
                </div>
                {article.meta.readTime && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-4" />
                      Read time
                    </span>
                    <strong className="text-slate-950">
                      {article.meta.readTime}
                    </strong>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-7 py-8 md:px-10 md:py-10">
          {["AI Tools", "Buying Guides", "Reviews"].includes(
            article.meta.category
          ) && <AffiliateNotice />}

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
              <section className="mb-8">
                <EmailSignup
                  compact
                  title="Get more guides like this"
                  description="Join Venveel updates for tax tools, personal finance guides, AI comparisons, and buying advice."
                  source={`Article: ${article.meta.slug}`}
                />
              </section>

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
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
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
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                        <ArrowLeft className="size-4" />
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
                      <span className="inline-flex items-center justify-end gap-2 text-sm font-semibold text-slate-500">
                        Next
                        <ArrowRight className="size-4" />
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

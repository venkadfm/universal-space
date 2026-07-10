import { getAllArticles } from "@/lib/articles";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  FileText,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import SearchBar from "./components/SearchBar";
import CategoryCard from "./components/CategoryCard";
import ArticleCard from "./components/Articlecard";
import EmailSignup from "./components/EmailSignup";
import { mainCategories } from "@/lib/site-categories";

const taxHubLinks = [
  {
    title: "Tax Calculator",
    description: "Know your exact tax amount before filing your ITR.",
    href: "/wealth#indian-tax-calculator",
    label: "Use tool",
  },
  {
    title: "New vs Old Regime",
    description: "See who should use new regime and when old regime still wins.",
    href: "/articles/new-vs-old-tax-regime-india",
    label: "Read guide",
  },
  {
    title: "New Regime Filing Steps",
    description: "Follow the key portal screens before submitting your ITR.",
    href: "/articles/how-to-file-new-tax-regime-itr-india",
    label: "Follow steps",
  },
  {
    title: "Calculator Input Guide",
    description: "Know exactly where each salary, HRA, AIS, deduction and TDS value comes from.",
    href: "/articles/how-to-use-indian-tax-calculator",
    label: "Fill inputs",
  },
];

const highIntentSlugs = [
  "best-ai-tools-for-professionals-2026",
  "chatgpt-vs-claude-vs-gemini-advanced-2026",
  "best-ai-phones-to-buy-2026",
  "best-smartphones-2026",
  "best-productivity-apps-for-professionals-2026",
  "best-ai-laptops-for-work-productivity-2026",
];

export default function Home() {
  const articles = getAllArticles().filter(
    (article) => article.slug && !article.slug.startsWith("_")
  );

  const highIntentArticles = highIntentSlugs
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is NonNullable<typeof article> =>
      Boolean(article)
    );
  const leadArticle = highIntentArticles[0] ?? articles[0];
  const secondaryFeaturedArticles = highIntentArticles.slice(1, 4);

  const latestArticles = articles
    .filter((article) => !article.featured)
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-12 pt-12 md:px-6 md:pb-18 md:pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(14,165,233,0.18),transparent_27rem),radial-gradient(circle_at_88%_8%,rgba(244,114,182,0.16),transparent_25rem),radial-gradient(circle_at_62%_70%,rgba(249,115,22,0.10),transparent_28rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_58%,#ecfeff_100%)]" />

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex rounded-full border border-cyan-200/70 bg-white/85 px-4 py-2 text-xs font-semibold text-cyan-800 shadow-sm backdrop-blur md:text-sm">
              AI tools, buying guides, money decisions, and useful calculators
            </div>

            <h1 className="mx-auto max-w-5xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-7xl lg:mx-0">
              Choose better tools, products, and money moves.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg md:mt-7 md:text-xl md:leading-9 lg:mx-0">
              Venveel helps professionals compare AI tools, buy tech with fewer
              regrets, and handle practical finance tasks without getting lost in
              noisy advice.
            </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:mt-10 lg:justify-start">
            <Link
              href="/articles/best-ai-tools-for-professionals-2026"
              className="brand-button inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold"
            >
              <Sparkles className="size-5" />
              Best AI tools
            </Link>

            <Link
              href="/buying-guides"
              className="brand-button-secondary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold"
            >
              <ShoppingBag className="size-5" />
              Buying guides
            </Link>

            <Link
              href="/wealth#indian-tax-calculator"
              className="brand-button-secondary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold"
            >
              <Calculator className="size-5" />
              Tax calculator
            </Link>
          </div>

          <div className="mx-auto mt-8 max-w-3xl md:mt-10 lg:mx-0">
            <SearchBar articles={articles} />
          </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur">
            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                    High-intent guide
                  </p>
                  <h2 className="mt-3 text-2xl font-black leading-tight md:text-4xl">
                    {leadArticle?.title ?? "Start with practical guides"}
                  </h2>
                </div>
                <TrendingUp className="size-8 shrink-0 text-pink-300" />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">
                {leadArticle?.description ??
                  "Compare the tools and products readers are most likely to search for before buying."}
              </p>
              {leadArticle && (
                <Link
                  href={`/articles/${leadArticle.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
                >
                  Read the guide
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </div>

            <div className="grid gap-3 p-3">
              {secondaryFeaturedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
                    {article.category}
                  </p>
                  <p className="mt-2 font-bold leading-snug text-slate-950">
                    {article.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evergreen Paths */}
      <section className="mx-auto max-w-6xl px-5 pb-6 md:px-6 md:pb-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/ai"
            className="group rounded-3xl border border-cyan-200 bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_76%)] p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] md:p-7"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                  AI tools
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                  Pick the right AI stack
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 md:text-base">
                  Compare AI subscriptions and workflows before you pay.
                </p>
              </div>
              <ArrowRight className="mt-1 size-5 text-cyan-500 transition group-hover:translate-x-1 group-hover:text-cyan-700" />
            </div>
          </Link>

          <Link
            href="/buying-guides"
            className="group rounded-3xl border border-orange-200 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_76%)] p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] md:p-7"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
                  Buying guides
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                  Buy with fewer regrets
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 md:text-base">
                  Use practical product guides built around real tradeoffs.
                </p>
              </div>
              <ArrowRight className="mt-1 size-5 text-orange-500 transition group-hover:translate-x-1 group-hover:text-orange-700" />
            </div>
          </Link>
        </div>
      </section>

      {/* Tax Season Hub */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
        <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_48%,#eff6ff_74%,#fdf2f8_100%)] shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-6 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1 text-sm font-bold text-blue-800 shadow-sm">
                <Calculator className="size-4" />
                Tax season
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
                File with fewer surprises.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                Compare new and old tax regime, understand every input, and
                avoid missing AIS, Form 16, TDS, HRA or deduction details.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/wealth#indian-tax-calculator"
                  className="brand-button inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
                >
                  Open tax calculator
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  href="/articles/how-to-use-indian-tax-calculator"
                  className="brand-button-secondary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
                >
                  Input guide
                </Link>
              </div>
            </div>

            <div className="grid gap-4 border-t border-blue-100 bg-white/70 p-6 md:p-8 lg:border-l lg:border-t-0">
              {taxHubLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                        <FileText className="size-4" />
                        {item.label}
                      </div>
                      <h3 className="mt-3 text-xl font-black text-slate-950">
                        {item.title}
                      </h3>
                    </div>
                    <ArrowRight className="mt-1 size-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-700" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-20">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-eyebrow mb-3">Editor&apos;s picks</p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Start with these guides
            </h2>
            <p className="mt-3 max-w-2xl text-gray-600 md:mt-4">
              Our most useful reads for AI tools, buying decisions, wealth, and
              resources.
            </p>
          </div>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 font-semibold text-blue-700 transition hover:text-slate-950"
          >
            Browse learning paths
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {leadArticle ? (
            <Link href={`/articles/${leadArticle.slug}`} className="group block">
              <article className="premium-card premium-card-hover h-full overflow-hidden rounded-3xl">
                <div className="bg-slate-950 p-7 text-white md:p-9">
                  <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-blue-100">
                    {leadArticle.category}
                  </div>
                  <h3 className="mt-5 max-w-2xl text-3xl font-black leading-tight md:text-5xl">
                    {leadArticle.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                    {leadArticle.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 p-7 md:p-8">
                  <span className="text-sm font-semibold text-slate-500">
                    {leadArticle.readTime ?? "5 min read"}
                  </span>
                  <span className="inline-flex items-center gap-2 font-bold text-blue-700 transition group-hover:translate-x-1">
                    Read guide
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </article>
            </Link>
          ) : (
            <div className="premium-card rounded-3xl p-8 text-slate-600">
              Featured articles will appear here soon.
            </div>
          )}

          <div className="grid gap-6">
            {secondaryFeaturedArticles.map((article) => (
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
        </div>
      </section>

      {/* Categories */}
      <section className="color-band py-14 backdrop-blur md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-8 text-center md:mb-12">
            <p className="section-eyebrow mb-3">Start here</p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Explore Categories
            </h2>
            <p className="mt-3 text-gray-600 md:mt-4">
              Choose the area you want to improve first.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
            {mainCategories.map((category) => (
              <CategoryCard
                key={category.href}
                icon={category.icon}
                title={category.label}
                description={category.description}
                link={category.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-20">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-eyebrow mb-3">New notes</p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Latest Articles
            </h2>
            <p className="mt-3 text-gray-600 md:mt-4">
              Fresh insights from Venveel.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
            <Search className="size-4 text-blue-700" />
            Search above to find a specific guide
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {latestArticles.map((article) => (
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
      </section>

      {/* Resources Preview */}
      <section className="bg-[radial-gradient(circle_at_15%_0%,rgba(14,165,233,0.34),transparent_24rem),radial-gradient(circle_at_84%_12%,rgba(244,114,182,0.28),transparent_24rem),linear-gradient(135deg,#020617_0%,#13223a_52%,#083344_100%)] px-5 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Resources for Smarter Decisions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Find curated tools, reading, downloads, and practical references
            for AI, buying decisions, and wealth.
          </p>

          <div className="mt-8 md:mt-10">
            <Link
              href="/resources"
              className="inline-block w-full rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50 sm:w-auto"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-slate-200/80 bg-white/75 px-5 py-14 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="section-eyebrow mb-3">Why trust Venveel</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Practical advice, written for real decisions.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Venveel focuses on clear recommendations, visible tradeoffs, and
              plain-English explanations so readers can act with confidence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/editorial-policy"
              className="premium-card premium-card-hover rounded-2xl p-5"
            >
              <p className="font-bold text-slate-950">Editorial policy</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                How content is researched, written, and updated.
              </p>
            </Link>

            <Link
              href="/review-methodology"
              className="premium-card premium-card-hover rounded-2xl p-5"
            >
              <p className="font-bold text-slate-950">Review method</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The criteria used for products, tools, and guides.
              </p>
            </Link>

            <Link
              href="/affiliate-disclosure"
              className="premium-card premium-card-hover rounded-2xl p-5"
            >
              <p className="font-bold text-slate-950">Reader promise</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clear context on recommendations and product links.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-5 py-14 text-center md:px-6 md:py-24">
        <EmailSignup
          title="Get Venveel updates before everyone else"
          description="Join for tax-season tools, personal finance guides, AI tool comparisons, and practical buying advice."
          source="Homepage newsletter"
        />
      </section>

    </main>
  );
}

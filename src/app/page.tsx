import { getAllArticles } from "@/lib/articles";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  FileText,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import SearchBar from "./components/SearchBar";
import CategoryCard from "./components/CategoryCard";
import ArticleCard from "./components/Articlecard";
import { mainCategories } from "@/lib/site-categories";

const decisionPillars = [
  {
    title: "Compare old vs new regime",
    description: "Enter salary, HRA, deductions and TDS once before filing.",
  },
  {
    title: "Follow portal steps",
    description: "Move through Income Tax portal screens without guessing.",
  },
  {
    title: "Find every input",
    description: "Know where Form 16, AIS, 26AS and broker reports fit.",
  },
];

const taxHubLinks = [
  {
    title: "Indian Tax Calculator",
    description: "Compare old and new regime with salary, HRA, house property, deductions and TDS.",
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

export default function Home() {
  const articles = getAllArticles().filter(
    (article) => article.slug && !article.slug.startsWith("_")
  );

  const featuredArticles = articles.filter((article) => article.featured);
  const leadArticle = featuredArticles[0];
  const secondaryFeaturedArticles = featuredArticles.slice(1, 3);

  const latestArticles = articles
    .filter((article) => !article.featured)
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-14 pt-14 text-center md:px-6 md:pb-20 md:pt-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.16),transparent_28rem),radial-gradient(circle_at_84%_14%,rgba(20,184,166,0.13),transparent_26rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_58%,#eef6ff_100%)]" />

        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-200/70 bg-white/80 px-4 py-2 text-xs font-semibold text-blue-800 shadow-sm backdrop-blur md:text-sm">
            Tax season spotlight + everyday decision guides
          </div>

          <h1 className="mx-auto max-w-5xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
            Make better decisions on tax, AI tools, and what to buy next.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg md:mt-7 md:text-2xl md:leading-9">
            Venveel brings practical calculators and guides for money, AI, and
            buying decisions. Right now, the Indian tax hub is highlighted for
            filing season.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:mt-10">
            <Link
              href="/wealth#indian-tax-calculator"
              className="brand-button inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold"
            >
              <Calculator className="size-5" />
              Calculate tax
            </Link>

            <Link
              href="/articles/how-to-file-new-tax-regime-itr-india"
              className="brand-button-secondary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold"
            >
              <FileText className="size-5" />
              New tax filing guide
            </Link>

            <Link
              href="/buying-guides"
              className="brand-button-secondary inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold"
            >
              <ShoppingBag className="size-5" />
              Buying guides
            </Link>
          </div>

          <div className="mx-auto mt-8 max-w-3xl md:mt-10">
            <SearchBar articles={articles} />
          </div>

          <div className="premium-surface mt-12 overflow-hidden rounded-3xl text-left md:mt-16">
            <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 md:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-bold text-teal-800">
                  <Sparkles className="size-4" />
                  Tax spotlight
                </div>

                <h2 className="mt-5 max-w-xl text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
                  A practical filing-season checklist before you submit.
                </h2>

                <div className="mt-6 grid gap-4">
                  {decisionPillars.map((pillar) => (
                    <div
                      key={pillar.title}
                      className="flex gap-4 border-t border-slate-200 pt-4 first:border-t-0 first:pt-0"
                    >
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-blue-700" />
                      <div>
                        <p className="font-bold text-slate-950">
                          {pillar.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 bg-slate-950 p-6 text-white md:border-l md:border-t-0 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
                      Most useful right now
                    </p>
                    <h3 className="mt-2 text-2xl font-black">
                      Indian Tax Calculator
                    </h3>
                  </div>
                  <TrendingUp className="size-8 text-teal-300" />
                </div>

                <div className="mt-7 grid gap-3">
                  {taxHubLinks.slice(0, 3).map((article) => (
                    <Link
                      key={article.href}
                      href={article.href}
                      className="rounded-2xl border border-white/10 bg-white/8 p-4 transition hover:bg-white/12"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                        {article.label}
                      </p>
                      <p className="mt-2 line-clamp-2 font-bold leading-snug text-white">
                        {article.title}
                      </p>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/wealth#indian-tax-calculator"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  Open calculator
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evergreen Paths */}
      <section className="mx-auto max-w-6xl px-5 pb-6 md:px-6 md:pb-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/ai"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] md:p-7"
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
              <ArrowRight className="mt-1 size-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
            </div>
          </Link>

          <Link
            href="/buying-guides"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] md:p-7"
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
              <ArrowRight className="mt-1 size-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
            </div>
          </Link>
        </div>
      </section>

      {/* Tax Season Hub */}
      <section className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
        <div className="overflow-hidden rounded-3xl border border-blue-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_54%,#ecfeff_100%)] shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
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
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-blue-700">
                        <FileText className="size-4" />
                        {item.label}
                      </div>
                      <h3 className="mt-3 text-xl font-black text-slate-950">
                        {item.title}
                      </h3>
                    </div>
                    <ArrowRight className="mt-1 size-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
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
      <section className="border-y border-slate-200/80 bg-white/70 py-14 backdrop-blur md:py-20">
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
      <section className="bg-[linear-gradient(135deg,#020617_0%,#0f172a_58%,#0b3b4a_100%)] px-5 py-16 text-white md:py-24">
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
              <p className="font-bold text-slate-950">Disclosure</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clear context for affiliate links and partnerships.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-5 py-14 text-center md:px-6 md:py-24">
        <div className="premium-surface mx-auto max-w-3xl rounded-3xl p-6 md:p-10">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Get Venveel Updates
          </h2>

          <p className="mt-4 text-gray-600">
            The email list is being set up. For now, send a quick note and we
            will add you when updates go live.
          </p>

          <Link
            href="mailto:hello.venveel@gmail.com?subject=Add%20me%20to%20Venveel%20updates"
            className="brand-button mt-8 inline-flex rounded-xl px-6 py-3 font-semibold"
          >
            Request Updates
          </Link>
        </div>
      </section>

    </main>
  );
}

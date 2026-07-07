import { getAllArticles } from "@/lib/articles";
import Link from "next/link";
import SearchBar from "./components/SearchBar";
import CategoryCard from "./components/CategoryCard";
import ArticleCard from "./components/Articlecard";

export default function Home() {
  const articles = getAllArticles().filter(
    (article) => article.slug && !article.slug.startsWith("_")
  );

  const featuredArticles = articles.filter((article) => article.featured);

  const latestArticles = articles
    .filter((article) => !article.featured)
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-16 text-center md:px-6 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.15),transparent_30rem),radial-gradient(circle_at_80%_0%,rgba(20,184,166,0.10),transparent_28rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_54%,#f8fafc_100%)]" />

        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-200/70 bg-white/80 px-4 py-2 text-xs font-semibold text-blue-800 shadow-sm backdrop-blur md:text-sm">
            AI, tech reviews, buying guides, and wealth
          </div>

          <h1 className="mx-auto max-w-5xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
            Smarter Technology Decisions for Busy Professionals
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg md:mt-7 md:text-2xl md:leading-9">
            Venveel helps you cut through the noise with trusted AI tools,
            practical technology reviews, buying guides, and investing insights.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:mt-10">
            <Link
              href="/ai"
              className="brand-button rounded-xl px-8 py-4 text-base font-semibold"
            >
              Explore AI Tools
            </Link>

            <Link
              href="/articles/best-smartphones-2026"
              className="brand-button-secondary rounded-xl px-8 py-4 text-base font-semibold"
            >
              Latest Buying Guide
            </Link>
          </div>

          <div className="mx-auto mt-10 max-w-3xl md:mt-14">
            <SearchBar articles={articles} />
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 text-left sm:grid-cols-2 md:grid-cols-4">
            <div className="premium-card rounded-2xl p-5">
              <p className="text-2xl">AI</p>
              <p className="mt-3 font-bold text-slate-900">AI Tools</p>
              <p className="mt-1 text-sm text-slate-500">
                Find tools worth paying for.
              </p>
            </div>

            <div className="premium-card rounded-2xl p-5">
              <p className="text-2xl">01</p>
              <p className="mt-3 font-bold text-slate-900">Buying Guides</p>
              <p className="mt-1 text-sm text-slate-500">
                Choose products with confidence.
              </p>
            </div>

            <div className="premium-card rounded-2xl p-5">
              <p className="text-2xl">RX</p>
              <p className="mt-3 font-bold text-slate-900">Tech Reviews</p>
              <p className="mt-1 text-sm text-slate-500">
                Understand what actually matters.
              </p>
            </div>

            <div className="premium-card rounded-2xl p-5">
              <p className="text-2xl">₹</p>
              <p className="mt-3 font-bold text-slate-900">Wealth</p>
              <p className="mt-1 text-sm text-slate-500">
                Smarter money decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-24">
        <div className="mb-8 text-center md:mb-12">
          <p className="section-eyebrow mb-3">Editor&apos;s picks</p>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Featured Guides
          </h2>
          <p className="mt-3 text-gray-600 md:mt-4">
            Start with our most useful guides for AI, technology, and smarter buying decisions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {featuredArticles.length > 0 ? (
            featuredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                category={article.category}
                title={article.title}
                description={article.description}
                readTime={article.readTime}
                link={`/articles/${article.slug}`}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">
              Featured articles will appear here soon.
            </p>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-slate-200/80 bg-white/70 py-14 backdrop-blur md:py-24">
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
            <CategoryCard
              emoji="🤖"
              title="AI"
              description="AI tools, prompts and automation guides."
              link="/ai"
            />

            <CategoryCard
              emoji="📱"
              title="Buying Guides"
              description="Phones, laptops, accessories and product recommendations."
              link="/buying-guides"
            />

            <CategoryCard
              emoji="💰"
              title="Wealth"
              description="Investing, financial freedom and money management."
              link="/wealth"
            />

            <CategoryCard
              emoji="🛒"
              title="Marketplace"
              description="Templates, scripts and digital products."
              link="/marketplace"
            />
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-24">
        <div className="mb-8 text-center md:mb-12">
          <p className="section-eyebrow mb-3">New notes</p>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-3 text-gray-600 md:mt-4">
            Fresh insights from Venveel.
          </p>
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

      {/* Tools Preview */}
      <section className="bg-[linear-gradient(135deg,#020617_0%,#0f172a_58%,#0b3b4a_100%)] px-5 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Free Tools for Smarter Decisions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Use calculators and AI-powered tools to plan money, improve
            productivity, and make better decisions.
          </p>

          <div className="mt-8 md:mt-10">
            <Link
              href="/tools"
              className="inline-block w-full rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50 sm:w-auto"
            >
              Explore Tools
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
            href="mailto:venveel.contact@gmail.com?subject=Add%20me%20to%20Venveel%20updates"
            className="brand-button mt-8 inline-flex rounded-xl px-6 py-3 font-semibold"
          >
            Request Updates
          </Link>
        </div>
      </section>

    </main>
  );
}

import { getAllArticles } from "@/lib/articles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-16 text-center md:px-6 md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-slate-50" />

        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm md:text-sm">
            AI • Tech Reviews • Buying Guides • Wealth
          </div>

          <h1 className="mx-auto max-w-5xl bg-gradient-to-r from-slate-950 via-blue-700 to-indigo-600 bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent sm:text-5xl md:text-7xl">
            Smarter Technology Decisions for Busy Professionals
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg md:mt-7 md:text-2xl md:leading-9">
            Venveel helps you cut through the noise with trusted AI tools,
            practical technology reviews, buying guides, and investing insights.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:mt-10">
            <a
              href="/ai"
              className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-blue-700"
            >
              Explore AI Tools
            </a>

            <a
              href="/articles/best-smartphones-2026"
              className="rounded-xl border-2 border-blue-600 bg-white px-8 py-4 text-base font-semibold text-blue-600 transition hover:scale-105 hover:bg-blue-50"
            >
              Latest Buying Guide
            </a>
          </div>

          <div className="mx-auto mt-10 max-w-3xl md:mt-14">
            <SearchBar />
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 text-left sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-2xl">🤖</p>
              <p className="mt-3 font-bold text-slate-900">AI Tools</p>
              <p className="mt-1 text-sm text-slate-500">
                Find tools worth paying for.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-2xl">📱</p>
              <p className="mt-3 font-bold text-slate-900">Buying Guides</p>
              <p className="mt-1 text-sm text-slate-500">
                Choose products with confidence.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-2xl">💻</p>
              <p className="mt-3 font-bold text-slate-900">Tech Reviews</p>
              <p className="mt-1 text-sm text-slate-500">
                Understand what actually matters.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-2xl">📈</p>
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
      <section className="bg-white py-14 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-8 text-center md:mb-12">
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
              link="/articles/best-smartphones-2026"
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
              link={`/articles/${article.slug}`}
            />
          ))}
        </div>
      </section>

      {/* Tools Preview */}
      <section className="bg-slate-900 px-5 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Free Tools for Smarter Decisions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Use calculators and AI-powered tools to plan money, improve
            productivity, and make better decisions.
          </p>

          <div className="mt-8 md:mt-10">
            <a
              href="/tools"
              className="inline-block w-full rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:scale-105 sm:w-auto"
            >
              Explore Tools
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-5 py-14 text-center md:px-6 md:py-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Join Venveel
          </h2>

          <p className="mt-4 text-gray-600">
            Get practical insights on AI, technology, buying guides, and wealth.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border px-5 py-3 sm:w-80"
            />

            <button className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
import { Button } from "@/components/ui/button";
import { getAllArticles } from "@/lib/articles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import CategoryCard from "./components/CategoryCard";
import ArticleCard from "./components/Articlecard";

export default function Home() {
  const articles = getAllArticles();
  const featuredArticles = articles.filter((article) => article.featured);
  const latestArticles = articles.slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-28 text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-slate-50 to-slate-50" />

        <div className="mx-auto max-w-6xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            AI • Wealth • Business • Tools
          </div>

          <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-7xl">
            Build <span className="text-blue-600">Wealth.</span>
            <br />
            Master <span className="text-blue-600">AI.</span>
            <br />
            Grow <span className="text-blue-600">Faster.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-600 md:text-2xl">
            Practical guides, AI tools, investing insights and business ideas
            designed to help ambitious professionals save time, build skills,
            and create long-term wealth.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Button
              size="lg"
              className="rounded-xl px-8 py-7 text-lg font-semibold shadow-lg transition-all hover:scale-105"
            >
              Explore Articles
            </Button>

            <a
              href="/marketplace"
              className="rounded-xl border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition hover:scale-105 hover:bg-blue-50"
            >
              Marketplace
            </a>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Value Cards */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-4 text-4xl">🤖</div>
            <h3 className="text-xl font-bold text-slate-900">
              Practical AI Guides
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              Learn tools and workflows that save time and improve productivity.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-4 text-4xl">💰</div>
            <h3 className="text-xl font-bold text-slate-900">
              Wealth Building
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              Understand investing, money habits and long-term financial growth.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-4 text-4xl">🚀</div>
            <h3 className="text-xl font-bold text-slate-900">
              Online Business
            </h3>
            <p className="mt-3 leading-7 text-gray-600">
              Explore side hustles, digital products and AI-powered income ideas.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Featured Guides
          </h2>
          <p className="mt-4 text-gray-600">
            Start with our most useful guides for AI, wealth and growth.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
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
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Explore Categories
            </h2>
            <p className="mt-4 text-gray-600">
              Choose the area you want to improve first.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <CategoryCard
              emoji="🤖"
              title="AI"
              description="AI tools, prompts and automation guides."
              link="/ai"
            />

            <CategoryCard
              emoji="💰"
              title="Wealth"
              description="Investing, financial freedom and money management."
              link="/wealth"
            />

            <CategoryCard
              emoji="🚀"
              title="Business"
              description="Side hustles and online business ideas."
              link="/business"
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
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Latest Articles
          </h2>
          <p className="mt-4 text-gray-600">
            Fresh insights from Universal Space.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
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
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Free Tools for Smarter Decisions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Use calculators and AI-powered tools to plan money, improve
            productivity and make better decisions.
          </p>

          <div className="mt-10">
            <a
              href="/tools"
              className="inline-block rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:scale-105"
            >
              Explore Tools
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h2 className="text-4xl font-bold text-slate-900">
            Join Universal Space
          </h2>

          <p className="mt-4 text-gray-600">
            Get practical insights on AI, wealth, business and technology.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-xl border px-5 py-3 sm:w-80"
            />

            <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
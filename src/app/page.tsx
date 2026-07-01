import SearchBar from "./components/SearchBar";
import CategoryCard from "./components/CategoryCard";
import Footer from "./components/Footer";
import { getAllArticles } from "@/lib/articles";
import Navbar from "./components/Navbar";
import ArticleCard from "./components/Articlecard";

export default function Home() {
    const articles = getAllArticles();
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto text-center py-28 px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
          Universal Space
        </h1>

        <div className="mt-8">
          <p className="text-3xl font-semibold text-blue-600">
            Your Space for AI, Wealth & Growth.
          </p>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Helping busy professionals leverage Artificial Intelligence,
            investing, technology and online business ideas to build
            long-term wealth and financial freedom.
          </p>
        </div>

        <div className="flex justify-center gap-5 mt-10">

  <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition duration-300 shadow-xl hover:scale-105">
    Explore Articles
  </button>

  <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition duration-300 hover:scale-105">
    Marketplace
  </button>

</div>

<div className="flex justify-center gap-12 mt-16 text-center">

  <div>
    <h3 className="text-4xl font-bold text-blue-600">
      100+
    </h3>

    <p className="text-gray-600">
      Future Articles
    </p>
  </div>

  <div>
    <h3 className="text-4xl font-bold text-blue-600">
      20+
    </h3>

    <p className="text-gray-600">
      Free Tools
    </p>
  </div>

  <div>
    <h3 className="text-4xl font-bold text-blue-600">
      50+
    </h3>

    <p className="text-gray-600">
      Digital Products
    </p>
  </div>

</div>
      </section>
      {/* Featured Categories */}

<section className="max-w-6xl mx-auto px-6 py-20">
  <div className="mt-8 mb-16">
  <SearchBar />
</div>

  <h2 className="text-4xl font-bold text-center mb-3">
    Explore Categories
  </h2>

  <p className="text-center text-gray-600 mb-12">
    Everything you need to grow your career, wealth and business.
  </p>

  <div className="grid md:grid-cols-4 gap-8">

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

</section>

    {/* Featured Articles */}

<section className="max-w-6xl mx-auto px-6 pb-24">

  <h2 className="text-4xl font-bold text-center mb-3">
    Featured Articles
  </h2>

  <p className="text-center text-gray-600 mb-12">
    Start with our most popular guides.
  </p>

  <div className="grid md:grid-cols-3 gap-8">

    <ArticleCard
  category="Artificial Intelligence"
  title="10 AI Tools Every Professional Should Know"
  description="Discover AI tools that save time, improve productivity and help you work smarter."
  link="/articles/ai-tools-2026"
/>

   <ArticleCard
  category="Wealth"
  title="The Simple Path to Building Long-Term Wealth"
  description="Learn investing principles, financial planning and wealth creation."
  link="/wealth"
/>

    <ArticleCard
  category="Business"
  title="Build Your First AI Side Hustle"
  description="A practical roadmap for starting an online business with AI."
  link="/business"
/>

  </div>

</section>

{/* Latest Articles */}

<section className="max-w-6xl mx-auto px-6 pb-24">

  <h2 className="text-4xl font-bold text-center mb-3">
    Latest Articles
  </h2>

  <p className="text-center text-gray-600 mb-12">
    Fresh insights from Universal Space.
  </p>

  <div className="grid md:grid-cols-3 gap-8">

    {articles.slice().reverse().map((article) => (
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

{/* Explore Topics */}

<section className="bg-white py-24">

  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-14">
      Explore Topics
    </h2>

    <div className="grid md:grid-cols-4 gap-6">

      <div className="bg-slate-50 rounded-2xl p-8 text-center shadow">
        🤖
        <h3 className="text-xl font-semibold mt-4">AI</h3>
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 text-center shadow">
        💰
        <h3 className="text-xl font-semibold mt-4">Wealth</h3>
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 text-center shadow">
        🚀
        <h3 className="text-xl font-semibold mt-4">Business</h3>
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 text-center shadow">
        ⭐
        <h3 className="text-xl font-semibold mt-4">Reviews</h3>
      </div>

    </div>

  </div>

</section>

      {/* Why Universal Space */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Why Universal Space?
          </h2>

          <p className="text-xl text-gray-600 leading-8">
            The internet is full of information, but not all of it is useful.
            Universal Space brings together practical knowledge, trusted
            reviews, and powerful tools to help you make smarter decisions
            about your career, money, technology, and future.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold">
          Join Universal Space
        </h2>

        <p className="text-gray-600 mt-4">
          Get practical insights on AI, wealth, business and technology.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border rounded-xl px-5 py-3 w-80"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
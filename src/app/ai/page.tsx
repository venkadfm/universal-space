import type { Metadata } from "next";
import ArticleListSection from "../components/ArticleListSection";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "AI Tools and Guides",
  description:
    "Practical AI guides, AI tool comparisons, and subscription advice for busy professionals.",
};

export default function AIPage() {
  const aiArticles = getArticlesByCategory("AI Tools");

  return (
    <main className="min-h-screen">

      <section className="max-w-6xl mx-auto py-24 px-6">

        <h1 className="text-5xl font-bold mb-8">
          AI Tools
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          Discover practical AI tools, tutorials, automation ideas and
          productivity hacks that save time and help you work smarter.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              AI Tools
            </h2>

            <p className="text-gray-600">
              Reviews of the best AI tools for professionals.
            </p>
          </div>

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Automation
            </h2>

            <p className="text-gray-600">
              Learn how to automate repetitive work using AI.
            </p>
          </div>

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Tutorials
            </h2>

            <p className="text-gray-600">
              Step-by-step AI guides for beginners and professionals.
            </p>
          </div>

        </div>

      </section>

      <ArticleListSection
        eyebrow="AI articles"
        title="Latest AI Guides"
        description="Read practical AI tool guides and comparisons connected directly from the AI section."
        articles={aiArticles}
      />

    </main>
  );
}

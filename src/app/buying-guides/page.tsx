import type { Metadata } from "next";
import ArticleListSection from "../components/ArticleListSection";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Buying Guides",
  description:
    "Practical product buying guides, comparisons, and decision advice for busy professionals.",
  alternates: {
    canonical: "/buying-guides",
  },
};

export default function BuyingGuidesPage() {
  const buyingGuides = getArticlesByCategory("Buying Guides");

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <p className="section-eyebrow mb-4">Buying guides</p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
          Clear product advice before you spend.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
          Compare phones, software, accessories, and productivity tools with
          practical recommendations written for people who want a confident
          decision without reading ten different tabs.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="premium-card rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-950">Best for</h2>
            <p className="mt-3 text-slate-600">
              Quick recommendations by budget, use case, and buyer type.
            </p>
          </div>

          <div className="premium-card rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-950">Compare</h2>
            <p className="mt-3 text-slate-600">
              Decision tables that make tradeoffs easier to understand.
            </p>
          </div>

          <div className="premium-card rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-950">Buy smarter</h2>
            <p className="mt-3 text-slate-600">
              Practical caveats, upgrade advice, and who should skip.
            </p>
          </div>
        </div>
      </section>

      <ArticleListSection
        eyebrow="Latest guides"
        title="Product Buying Guides"
        description="Start with the latest practical buying guides connected from this section."
        articles={buyingGuides}
      />
    </main>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wealth and Investing",
  description:
    "Practical personal finance, investing, and wealth-building guides for busy professionals.",
};

export default function WealthPage() {
  return (
    <main className="min-h-screen">

      <section className="max-w-6xl mx-auto py-24 px-6">

        <h1 className="text-5xl font-bold mb-8">
          Wealth & Investing
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          Learn how to build long-term wealth through investing,
          personal finance, tax planning and financial discipline.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Stock Market
            </h2>

            <p className="text-gray-600">
              Investment ideas, company analysis and market insights.
            </p>
          </div>

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Personal Finance
            </h2>

            <p className="text-gray-600">
              Budgeting, saving and smart money management.
            </p>
          </div>

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Financial Freedom
            </h2>

            <p className="text-gray-600">
              Build assets and create multiple income streams.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}

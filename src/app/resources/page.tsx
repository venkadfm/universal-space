import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Curated resources, tools, books, websites, and downloads for AI, wealth, business, and productivity.",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto py-24 px-6">

        <h1 className="text-5xl font-bold mb-8">
          Resources
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          A curated collection of the best books, websites, AI tools,
          software and learning resources.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Books
            </h2>

            <p className="text-gray-600">
              Recommended reading for wealth, AI and business.
            </p>
          </div>

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Websites
            </h2>

            <p className="text-gray-600">
              Useful websites and communities for continuous learning.
            </p>
          </div>

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Downloads
            </h2>

            <p className="text-gray-600">
              Free templates, checklists and productivity tools.
            </p>
          </div>

        </div>

      </section>
    </main>
  );
}

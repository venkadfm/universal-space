import Link from "next/link";
import type { Metadata } from "next";
import { mainCategories } from "@/lib/site-categories";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Explore Venveel guides for AI tools, buying guides, wealth, and resources.",
};

export default function LearnPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">

      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Learn
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore practical knowledge that helps you simplify AI tools,
          buying decisions, wealth, and resources.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {mainCategories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4">{category.icon}</div>

            <h2 className="text-2xl font-bold mb-3">
              {category.label}
            </h2>

            <p className="text-gray-600 leading-7">
              {category.description}
            </p>

            <div className="mt-6 text-blue-600 font-semibold">
              Explore →
            </div>

          </Link>
        ))}

      </div>

    </main>
  );
}

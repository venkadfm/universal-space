"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ArticleMeta } from "@/lib/articles";

type SearchBarProps = {
  articles: ArticleMeta[];
};

export default function SearchBar({ articles }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery.length < 2) {
      return [];
    }

    return articles
      .filter((article) =>
        [article.title, article.description, article.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      )
      .slice(0, 5);
  }, [articles, query]);

  return (
    <div className="relative mx-auto max-w-3xl">

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search articles, AI tools, investing, business..."
        className="w-full rounded-2xl border border-slate-300 bg-white/95 px-6 py-4 text-base shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 md:text-lg"
      />

      {matches.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-[0_22px_55px_rgba(15,23,42,0.14)]">
          {matches.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block border-b border-slate-100 px-5 py-4 last:border-b-0 hover:bg-slate-50"
            >
              <span className="block text-xs font-bold uppercase tracking-wide text-blue-600">
                {article.category}
              </span>
              <span className="mt-1 block font-semibold text-slate-950">
                {article.title}
              </span>
              <span className="mt-1 block text-sm text-slate-500">
                {article.description}
              </span>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}

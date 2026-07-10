import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ArticleCardProps = {
  title: string;
  description: string;
  category: string;
  link: string;
  readTime?: string;
};

export default function ArticleCard({
  title,
  description,
  category,
  link,
  readTime = "5 min read",
}: ArticleCardProps) {
  const categoryAccent =
    category === "Buying Guides"
      ? "from-orange-100 via-amber-50 to-white text-orange-700 border-orange-200"
      : category === "Wealth"
        ? "from-emerald-100 via-teal-50 to-white text-emerald-700 border-emerald-200"
        : "from-cyan-100 via-sky-50 to-white text-cyan-700 border-cyan-200";
  const topBar =
    category === "Buying Guides"
      ? "from-orange-400 via-pink-400 to-amber-300"
      : category === "Wealth"
        ? "from-emerald-400 via-teal-400 to-cyan-300"
        : "from-cyan-400 via-blue-500 to-violet-400";

  return (
    <Link href={link} className="group block">
      <article className="premium-card premium-card-hover h-full overflow-hidden rounded-2xl">
        <div className={`h-2.5 bg-gradient-to-r ${topBar}`} />
        <div className="p-6 md:p-7">

        {/* Category Badge */}
        <div className={`inline-flex rounded-full border bg-gradient-to-r px-3 py-1 text-sm font-semibold ${categoryAccent}`}>
          {category}
        </div>

        {/* Title */}
        <h3 className="mt-5 text-xl font-black leading-tight text-slate-950 transition-colors group-hover:text-cyan-700 md:text-2xl">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">

          <span className="text-sm text-gray-500">
            {readTime}
          </span>

          <span className="inline-flex items-center gap-2 font-semibold text-cyan-700 transition-transform group-hover:translate-x-1">
            Read <ArrowRight className="size-4" />
          </span>

        </div>
        </div>

      </article>
    </Link>
  );
}

import Link from "next/link";

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
  return (
    <Link href={link} className="group block">
      <article className="premium-card premium-card-hover h-full rounded-2xl p-7">

        {/* Category Badge */}
        <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
          {category}
        </div>

        {/* Title */}
        <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-950 transition-colors group-hover:text-blue-700">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-gray-600 leading-7">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">

          <span className="text-sm text-gray-500">
            {readTime}
          </span>

          <span className="font-semibold text-blue-700 transition-transform group-hover:translate-x-1">
            Read →
          </span>

        </div>

      </article>
    </Link>
  );
}

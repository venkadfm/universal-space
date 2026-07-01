import Link from "next/link";

type ArticleCardProps = {
  title: string;
  description: string;
  category: string;
  link: string;
};

export default function ArticleCard({
  title,
  description,
  category,
  link,
}: ArticleCardProps) {
  return (
    <Link href={link} className="group block">
      <article className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl">

        {/* Category Badge */}
        <div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          {category}
        </div>

        {/* Title */}
        <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-gray-600 leading-7">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">

          <span className="text-sm text-gray-500">
            5 min read
          </span>

          <span className="font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
            Read →
          </span>

        </div>

      </article>
    </Link>
  );
}
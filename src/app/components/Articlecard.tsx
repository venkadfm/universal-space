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
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">

      <span className="text-sm font-semibold text-blue-600">
        {category}
      </span>

      <h3 className="text-2xl font-bold mt-3 mb-4">
        {title}
      </h3>

      <p className="text-gray-600 leading-7">
        {description}
      </p>

      <Link
        href={link}
        className="inline-block mt-6 text-blue-600 font-semibold hover:underline"
      >
        Read Article →
      </Link>

    </div>
  );
}
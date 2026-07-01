import Link from "next/link";

type CategoryCardProps = {
  emoji: string;
  title: string;
  description: string;
  link: string;
};

export default function CategoryCard({
  emoji,
  title,
  description,
  link,
}: CategoryCardProps) {
  return (
    <Link
      href={link}
      className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition block"
    >
      <div className="text-5xl">{emoji}</div>

      <h3 className="text-2xl font-bold mt-5">
        {title}
      </h3>

      <p className="text-gray-600 mt-4 leading-7">
        {description}
      </p>
    </Link>
  );
}
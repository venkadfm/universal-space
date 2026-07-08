import Link from "next/link";

type CategoryCardProps = {
  icon: string;
  title: string;
  description: string;
  link: string;
};

export default function CategoryCard({
  icon,
  title,
  description,
  link,
}: CategoryCardProps) {
  return (
    <Link
      href={link}
      className="premium-card premium-card-hover block rounded-2xl p-8"
    >
      <div className="grid size-12 place-items-center rounded-xl bg-slate-950 text-lg font-black text-white shadow-sm">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mt-5">
        {title}
      </h3>

      <p className="text-gray-600 mt-4 leading-7">
        {description}
      </p>
    </Link>
  );
}

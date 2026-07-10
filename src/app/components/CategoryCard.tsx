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
  const accent =
    title === "AI"
      ? {
          border: "hover:border-sky-200",
          icon: "bg-[linear-gradient(135deg,#38bdf8,#0f172a)]",
          glow: "bg-sky-400/15",
        }
      : title === "Wealth"
        ? {
            border: "hover:border-sky-200",
            icon: "bg-[linear-gradient(135deg,#0284c7,#0f172a)]",
            glow: "bg-sky-400/15",
          }
        : title === "Business"
          ? {
              border: "hover:border-orange-200",
              icon: "bg-[linear-gradient(135deg,#0f172a,#f97316)]",
              glow: "bg-orange-400/15",
            }
          : {
              border: "hover:border-orange-200",
              icon: "bg-[linear-gradient(135deg,#f97316,#0f172a)]",
              glow: "bg-orange-400/15",
            };

  return (
    <Link
      href={link}
      className={`premium-card premium-card-hover relative block overflow-hidden rounded-2xl p-8 ${accent.border}`}
    >
      <div className={`absolute -right-10 -top-10 size-32 rounded-full ${accent.glow}`} />
      <div className={`grid size-12 place-items-center rounded-xl ${accent.icon} text-lg font-black text-white shadow-sm`}>
        {icon}
      </div>

      <h3 className="mt-5 text-2xl font-bold text-slate-950">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>
    </Link>
  );
}

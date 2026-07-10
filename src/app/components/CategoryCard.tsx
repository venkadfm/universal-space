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
          border: "hover:border-cyan-200",
          icon: "bg-[linear-gradient(135deg,#0891b2,#2563eb)]",
          glow: "bg-cyan-400/15",
        }
      : title === "Wealth"
        ? {
            border: "hover:border-emerald-200",
            icon: "bg-[linear-gradient(135deg,#059669,#84cc16)]",
            glow: "bg-emerald-400/15",
          }
        : title === "Business"
          ? {
              border: "hover:border-pink-200",
              icon: "bg-[linear-gradient(135deg,#db2777,#f97316)]",
              glow: "bg-pink-400/15",
            }
          : {
              border: "hover:border-orange-200",
              icon: "bg-[linear-gradient(135deg,#ea580c,#facc15)]",
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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Upcoming Venveel digital products, templates, scripts, and practical toolkits.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function MarketplacePage() {
  return (
    <main className="min-h-screen">

      <section className="max-w-6xl mx-auto py-20 px-6">

        <h1 className="text-5xl font-extrabold text-center">
          Venveel Marketplace
        </h1>

        <p className="text-xl text-gray-600 text-center mt-6 max-w-3xl mx-auto">
          Practical digital products designed to help professionals
          save time, build wealth and create additional income.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <ProductCard
            emoji="🤖"
            title="AI Prompt Library"
            description="500+ professional AI prompts for work, business and productivity."
            status="Coming Soon"
          />

          <ProductCard
            emoji="💻"
            title="Python Automation Scripts"
            description="Ready-to-use Python scripts to automate repetitive tasks."
            status="Coming Soon"
          />

          <ProductCard
            emoji="📈"
            title="Investment Toolkit"
            description="Excel templates, calculators and portfolio trackers."
            status="Coming Soon"
          />

          <ProductCard
            emoji="📝"
            title="Resume & Career Kit"
            description="Professional resume templates and interview resources."
            status="Coming Soon"
          />

          <ProductCard
            emoji="📒"
            title="Notion Productivity Pack"
            description="Templates for task management, goals and personal planning."
            status="Coming Soon"
          />

          <ProductCard
            emoji="🎓"
            title="Mini Courses"
            description="Short practical courses on AI, investing and online business."
            status="Coming Soon"
          />

        </div>

      </section>

    </main>
  );
}

type ProductCardProps = {
  emoji: string;
  title: string;
  description: string;
  status: string;
};

function ProductCard({
  emoji,
  title,
  description,
  status,
}: ProductCardProps) {
  return (
    <div className="premium-card premium-card-hover rounded-2xl p-8">

      <div className="text-5xl">
        {emoji}
      </div>

      <h2 className="text-2xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-gray-600 mt-4 leading-7">
        {description}
      </p>

      <span className="mt-8 inline-block rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
        {status}
      </span>

    </div>
  );
}

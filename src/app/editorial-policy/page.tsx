import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Venveel researches, writes, reviews, and updates practical technology content.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:px-6 md:py-24">
      <article className="premium-surface mx-auto max-w-3xl rounded-3xl p-7 md:p-10">
        <p className="section-eyebrow mb-4">Trust</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Editorial Policy
        </h1>

        <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
          <p>
            Venveel publishes practical guides for busy professionals who want
            clear technology decisions without hype. Our goal is to explain what
            matters, who a product or tool is best for, and where the tradeoffs
            are.
          </p>

          <h2 className="text-2xl font-bold text-slate-950">How we write</h2>
          <p>
            We prioritize usefulness, accuracy, and plain language. Articles are
            structured around real buyer questions, practical workflows, and
            decision criteria instead of promotional claims.
          </p>

          <h2 className="text-2xl font-bold text-slate-950">Updates</h2>
          <p>
            Technology changes quickly, so key articles may be reviewed and
            updated when pricing, product capabilities, availability, or buyer
            advice changes.
          </p>

          <h2 className="text-2xl font-bold text-slate-950">Independence</h2>
          <p>
            Recommendations are based on practical value for readers. Sponsored
            placements, if introduced in the future, will be clearly disclosed.
          </p>
        </div>
      </article>
    </main>
  );
}

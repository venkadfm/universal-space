import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Methodology",
  description:
    "The criteria Venveel uses when reviewing technology products, AI tools, and buying guides.",
  alternates: {
    canonical: "/review-methodology",
  },
};

export default function ReviewMethodologyPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:px-6 md:py-24">
      <article className="premium-surface mx-auto max-w-3xl rounded-3xl p-7 md:p-10">
        <p className="section-eyebrow mb-4">Review process</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Review Methodology
        </h1>

        <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
          <p>
            Venveel reviews tools and products by focusing on the decision a
            reader is trying to make: what to buy, what to skip, and what is
            worth paying for.
          </p>

          <h2 className="text-2xl font-bold text-slate-950">Core criteria</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Practical usefulness for professionals and everyday buyers.</li>
            <li>Value for money compared with alternatives.</li>
            <li>Ease of use, setup time, and learning curve.</li>
            <li>Important tradeoffs, limits, and reasons to skip.</li>
            <li>Long-term usefulness instead of short-term hype.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-950">Transparency</h2>
          <p>
            When an article contains affiliate links or commercial relationships,
            the page will disclose that clearly so readers can judge the
            recommendation with context.
          </p>
        </div>
      </article>
    </main>
  );
}

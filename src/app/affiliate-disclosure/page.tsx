import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How Venveel may use affiliate links while keeping recommendations practical and reader-first.",
  alternates: {
    canonical: "/affiliate-disclosure",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen px-5 py-16 md:px-6 md:py-24">
      <article className="premium-surface mx-auto max-w-3xl rounded-3xl p-7 md:p-10">
        <p className="section-eyebrow mb-4">Disclosure</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Affiliate Disclosure
        </h1>

        <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
          <p>
            Some Venveel articles may include affiliate links. If you buy
            through those links, Venveel may earn a commission at no extra cost
            to you.
          </p>

          <p>
            Affiliate relationships do not control our recommendations. Our
            priority is to explain what is useful, what is worth paying for, and
            who should avoid a product or service.
          </p>

          <p>
            We aim to mark commercial relationships clearly wherever they are
            relevant to the reader&apos;s decision.
          </p>
        </div>
      </article>
    </main>
  );
}

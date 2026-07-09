import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Venveel privacy policy for website visitors.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:px-6 md:py-24">
      <article className="premium-surface mx-auto max-w-3xl rounded-3xl p-7 md:p-10">
        <p className="section-eyebrow mb-4">Legal</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Privacy Policy
        </h1>

        <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
          <p>
            Venveel respects visitor privacy. This website may collect basic
            analytics information to understand traffic, improve content, and
            maintain site performance.
          </p>

          <h2 className="text-2xl font-bold text-slate-950">
            Information we may collect
          </h2>
          <p>
            We may collect non-sensitive usage data such as page views, device
            type, browser, referring pages, and approximate location through
            analytics tools.
          </p>

          <h2 className="text-2xl font-bold text-slate-950">Contact</h2>
          <p>
            For privacy questions, contact us at hello.venveel@gmail.com.
          </p>
        </div>
      </article>
    </main>
  );
}

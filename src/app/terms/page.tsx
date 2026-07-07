import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the Venveel website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:px-6 md:py-24">
      <article className="premium-surface mx-auto max-w-3xl rounded-3xl p-7 md:p-10">
        <p className="section-eyebrow mb-4">Legal</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Terms of Service
        </h1>

        <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
          <p>
            By using Venveel, you agree to use the website for lawful purposes
            and understand that content is provided for general informational
            and educational use.
          </p>

          <h2 className="text-2xl font-bold text-slate-950">
            No professional advice
          </h2>
          <p>
            Venveel articles are not financial, legal, medical, or professional
            advice. Always make decisions based on your own needs and, when
            necessary, consult a qualified professional.
          </p>

          <h2 className="text-2xl font-bold text-slate-950">Changes</h2>
          <p>
            These terms may be updated as the website grows. Continued use of
            the website means you accept the latest version.
          </p>
        </div>
      </article>
    </main>
  );
}

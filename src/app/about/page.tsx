export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="mb-8 text-5xl font-bold text-slate-950">
        About Venveel
      </h1>

      <div className="space-y-8 text-lg leading-8 text-slate-700">
        <p>
          <strong>Venveel</strong> helps busy professionals make smarter
          technology decisions through trusted AI guides, practical buying
          guides, technology reviews, and investing insights.
        </p>

        <p>
          In a fast-changing world, the challenge is not finding information.
          The challenge is knowing what matters, what to ignore, and what is
          actually worth your time and money.
        </p>

        <div className="rounded-2xl border-l-4 border-blue-600 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-blue-700">
            Our mission is simple: make complex decisions easier.
          </h2>
        </div>

        <p>
          Venveel is built for professionals who want clear, practical advice on
          AI tools, technology products, productivity, investing, and digital
          business without unnecessary hype.
        </p>

        <h2 className="pt-6 text-3xl font-bold text-slate-950">
          What You&apos;ll Find Here
        </h2>

        <ul className="list-disc space-y-3 pl-6">
          <li>🤖 Practical AI tool guides and comparisons</li>
          <li>📱 Technology reviews and buying guides</li>
          <li>💰 Investing and wealth-building insights</li>
          <li>🚀 Online business and side hustle ideas</li>
          <li>🛠️ Useful tools, calculators, and productivity resources</li>
        </ul>

        <h2 className="pt-6 text-3xl font-bold text-slate-950">
          Our Principles
        </h2>

        <ul className="list-disc space-y-3 pl-6">
          <li>Be practical, not theoretical.</li>
          <li>Recommend only what is genuinely useful.</li>
          <li>Explain clearly without jargon.</li>
          <li>Help readers save time, money, and effort.</li>
        </ul>

        <div className="mt-12 rounded-3xl bg-slate-900 p-8 text-white">
          <h2 className="mb-4 text-3xl font-bold">Why Venveel Exists</h2>

          <p className="text-xl font-medium leading-8 text-slate-200">
            To help busy professionals cut through noise, understand technology,
            and make better decisions with confidence.
          </p>
        </div>
      </div>
    </main>
  );
}
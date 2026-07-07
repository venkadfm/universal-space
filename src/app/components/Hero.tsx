export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center md:py-36">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-slate-50" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
          AI • Tech Reviews • Buying Guides • Wealth
        </div>

        <h1 className="mx-auto max-w-5xl bg-gradient-to-r from-slate-950 via-blue-700 to-indigo-600 bg-clip-text text-5xl font-black leading-tight tracking-tight text-transparent md:text-7xl">
          Smarter Technology Decisions for Busy Professionals
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-2xl md:leading-9">
          Venveel helps you cut through the noise with trusted AI tools,
          practical technology reviews, buying guides, and investing insights.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/ai"
            className="rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:scale-105"
          >
            Explore AI Tools
          </a>

          <a
            href="/articles/best-smartphones-2026"
            className="rounded-xl border-2 border-blue-600 bg-white px-8 py-4 text-base font-semibold text-blue-600 transition hover:bg-blue-50 hover:scale-105"
          >
            Latest Buying Guide
          </a>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 text-left sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl">🤖</p>
            <p className="mt-3 font-bold text-slate-900">AI Tools</p>
            <p className="mt-1 text-sm text-slate-500">Find tools worth paying for.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl">📱</p>
            <p className="mt-3 font-bold text-slate-900">Buying Guides</p>
            <p className="mt-1 text-sm text-slate-500">Choose products with confidence.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl">💻</p>
            <p className="mt-3 font-bold text-slate-900">Tech Reviews</p>
            <p className="mt-1 text-sm text-slate-500">Understand what actually matters.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-2xl">📈</p>
            <p className="mt-3 font-bold text-slate-900">Wealth</p>
            <p className="mt-1 text-sm text-slate-500">Smarter money decisions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
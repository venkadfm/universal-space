import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center md:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.15),transparent_30rem),radial-gradient(circle_at_80%_0%,rgba(20,184,166,0.10),transparent_28rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_54%,#f8fafc_100%)]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-6 inline-flex rounded-full border border-blue-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm backdrop-blur">
          AI, tech reviews, buying guides, and wealth
        </div>

        <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight tracking-tight text-slate-950 md:text-7xl">
          Smarter Technology Decisions for Busy Professionals
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-2xl md:leading-9">
          Venveel helps you cut through the noise with trusted AI tools,
          practical technology reviews, buying guides, and investing insights.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/ai"
            className="brand-button rounded-xl px-8 py-4 text-base font-semibold"
          >
            Explore AI Tools
          </Link>

          <Link
            href="/articles/best-smartphones-2026"
            className="brand-button-secondary rounded-xl px-8 py-4 text-base font-semibold"
          >
            Latest Buying Guide
          </Link>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 text-left sm:grid-cols-2 md:grid-cols-4">
          <div className="premium-card rounded-2xl p-5">
            <p className="text-2xl">AI</p>
            <p className="mt-3 font-bold text-slate-900">AI Tools</p>
            <p className="mt-1 text-sm text-slate-500">Find tools worth paying for.</p>
          </div>

          <div className="premium-card rounded-2xl p-5">
            <p className="text-2xl">01</p>
            <p className="mt-3 font-bold text-slate-900">Buying Guides</p>
            <p className="mt-1 text-sm text-slate-500">Choose products with confidence.</p>
          </div>

          <div className="premium-card rounded-2xl p-5">
            <p className="text-2xl">RX</p>
            <p className="mt-3 font-bold text-slate-900">Tech Reviews</p>
            <p className="mt-1 text-sm text-slate-500">Understand what actually matters.</p>
          </div>

          <div className="premium-card rounded-2xl p-5">
            <p className="text-2xl">₹</p>
            <p className="mt-3 font-bold text-slate-900">Wealth</p>
            <p className="mt-1 text-sm text-slate-500">Smarter money decisions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

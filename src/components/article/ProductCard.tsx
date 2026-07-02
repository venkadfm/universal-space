type ProductCardProps = {
  name: string;
  image: string;
  score: string;
  category: string;
  price: string;
  buyIf: string;
skipIf: string;
  verdict: string;
};

export default function ProductCard({
  name,
  image,
  score,
  category,
  price,
  buyIf,
  skipIf,
  verdict,
}: ProductCardProps) {
  return (
    <section className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">

      {/* Header */}
      <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr]">

        <div className="flex justify-center">
          <img
            src={image}
            alt={name}
            className="h-64 w-full object-contain"
          />
        </div>

        <div>

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                {name}
              </h2>

              <p className="mt-1 text-slate-500">
                {category}
              </p>
            </div>

            <div className="rounded-full bg-blue-600 px-5 py-2 font-bold text-white">
              ⭐ {score}
            </div>

          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5">

            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Approx. Price
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {price}
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="grid gap-6 border-t border-slate-200 p-6 md:grid-cols-3">

        <div>

          <h3 className="font-bold text-green-700">
            ✅ Buy If
          </h3>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
  {buyIf.split("|").map((item, index) => (
  <li key={`${name}-buy-${index}`}>• {item.trim()}</li>
))}
</ul>

        </div>

        <div>

          <h3 className="font-bold text-red-700">
            ❌ Skip If
          </h3>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
  {skipIf.split("|").map((item, index) => (
  <li key={`${name}-skip-${index}`}>• {item.trim()}</li>
))}
</ul>

        </div>

        <div>

          <div className="rounded-2xl bg-blue-50 p-5">

            <h3 className="font-bold text-blue-700">
              ⭐ Our Verdict
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-700">
              {verdict}
            </p>

            <a
              href="#"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              See Today's Best Price →
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}
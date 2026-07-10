import Image from "next/image";

type ProductCardProps = {
  name: string;
  image: string;
  score: string;
  category: string;
  price: string;
  buyIf: string;
  skipIf: string;
  verdict: string;
  dealUrl?: string;
  dealText?: string;
  secondaryDealUrl?: string;
  secondaryDealText?: string;
  imageCredit?: string;
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
  dealUrl = "/resources",
  dealText = "See Today's Best Price",
  secondaryDealUrl,
  secondaryDealText = "Official Site",
  imageCredit,
}: ProductCardProps) {
  const isExternalDeal = dealUrl.startsWith("http");
  const isExternalSecondaryDeal = secondaryDealUrl?.startsWith("http");

  return (
    <section className="my-8 overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="h-2.5 rainbow-rule" />

      {/* Header */}
      <div className="grid gap-6 bg-[radial-gradient(circle_at_12%_18%,rgba(56,189,248,0.22),transparent_18rem),radial-gradient(circle_at_90%_10%,rgba(249,115,22,0.16),transparent_18rem),linear-gradient(135deg,#f8fafc_0%,#eff6ff_46%,#fff7ed_100%)] p-6 md:grid-cols-[220px_1fr]">

        <div className="flex justify-center">
          <Image
            src={image}
            alt={name}
            width={360}
            height={360}
            className="h-64 w-full object-contain"
          />
          {imageCredit && (
            <p className="sr-only">
              {imageCredit}
            </p>
          )}
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

            <div className="rounded-full bg-[linear-gradient(135deg,#020617,#0369a1,#ea580c)] px-5 py-2 font-bold text-white shadow-sm">
              {score}
            </div>

          </div>

          <div className="mt-6 rounded-2xl border border-white/80 bg-white/75 p-5 shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Approx. Price
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-950">
              {price}
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="grid gap-6 border-t border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 md:grid-cols-3">

        <div>

          <h3 className="font-bold text-emerald-700">
            Buy If
          </h3>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
  {buyIf.split("|").map((item, index) => (
  <li key={`${name}-buy-${index}`}>• {item.trim()}</li>
))}
</ul>

        </div>

        <div>

          <h3 className="font-bold text-rose-700">
            Skip If
          </h3>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
  {skipIf.split("|").map((item, index) => (
  <li key={`${name}-skip-${index}`}>• {item.trim()}</li>
))}
</ul>

        </div>

        <div>

          <div className="rounded-2xl border border-sky-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_62%,#fff7ed_100%)] p-5">

            <h3 className="font-bold text-blue-700">
              Our Verdict
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-700">
              {verdict}
            </p>

            <a
              href={dealUrl}
              target={isExternalDeal ? "_blank" : undefined}
              rel={isExternalDeal ? "noopener noreferrer sponsored" : undefined}
              className="brand-button mt-6 inline-block rounded-xl px-5 py-3 font-semibold"
            >
              {dealText} →
            </a>

            {secondaryDealUrl && (
              <a
                href={secondaryDealUrl}
                target={isExternalSecondaryDeal ? "_blank" : undefined}
                rel={
                  isExternalSecondaryDeal
                    ? "noopener noreferrer sponsored"
                    : undefined
                }
                className="mt-3 inline-block rounded-xl border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-700 transition hover:border-orange-200 hover:bg-orange-50"
              >
                {secondaryDealText} →
              </a>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

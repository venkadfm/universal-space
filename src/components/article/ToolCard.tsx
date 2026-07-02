type ToolCardProps = {
  name: string;
  logo: string;
  score: string;
  bestFor: string;
  pricing: string;
  children: React.ReactNode;
};

export default function ToolCard({
  name,
  logo,
  score,
  bestFor,
  pricing,
  children,
}: ToolCardProps) {
  return (
    <section className="my-5 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-start justify-between gap-4 bg-slate-50 px-5 py-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
            {logo}
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-950">
              {name}
            </h3>

            <p className="mt-1 text-sm font-medium text-slate-500">
              {bestFor}
            </p>
          </div>
        </div>

        <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
          {score}
        </div>
      </div>

      <div className="grid gap-5 p-5 md:grid-cols-[1fr_220px]">
        <div className="text-sm leading-7 text-slate-700">
          {children}
        </div>

        <aside className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Pricing
          </p>

          <p className="mt-1 font-bold text-slate-900">
            {pricing}
          </p>

          <div className="mt-4 border-t border-slate-200 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Verdict
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              Use free first. Upgrade only when it saves real time every week.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
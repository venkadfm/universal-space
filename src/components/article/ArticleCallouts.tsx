type CalloutProps = {
  title: string;
  children: React.ReactNode;
};

export function RecommendationBox({ title, children }: CalloutProps) {
  return (
    <div className="my-5 rounded-2xl border border-cyan-200 bg-[linear-gradient(135deg,#ecfeff_0%,#ffffff_100%)] p-5 shadow-sm">
      <h3 className="mb-2 text-lg font-bold text-cyan-800">
        {title}
      </h3>
      <div className="text-sm leading-7 text-slate-700">{children}</div>
    </div>
  );
}

export function ProTip({ title, children }: CalloutProps) {
  return (
    <div className="my-5 rounded-2xl border border-emerald-200 bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_100%)] p-5 shadow-sm">
      <h3 className="mb-2 text-lg font-bold text-emerald-800">
        {title}
      </h3>
      <div className="text-sm leading-7 text-slate-700">{children}</div>
    </div>
  );
}

export function WarningBox({ title, children }: CalloutProps) {
  return (
    <div className="my-5 rounded-2xl border border-orange-200 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_100%)] p-5 shadow-sm">
      <h3 className="mb-2 text-lg font-bold text-orange-800">
        {title}
      </h3>
      <div className="text-sm leading-7 text-slate-700">{children}</div>
    </div>
  );
}

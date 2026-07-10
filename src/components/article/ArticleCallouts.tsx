type CalloutProps = {
  title: string;
  children: React.ReactNode;
};

export function RecommendationBox({ title, children }: CalloutProps) {
  return (
    <div className="my-5 rounded-2xl border border-sky-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-5 shadow-sm">
      <h3 className="mb-2 text-lg font-bold text-sky-800">
        {title}
      </h3>
      <div className="text-sm leading-7 text-slate-700">{children}</div>
    </div>
  );
}

export function ProTip({ title, children }: CalloutProps) {
  return (
    <div className="my-5 rounded-2xl border border-sky-200 bg-[linear-gradient(135deg,#f0f9ff_0%,#ffffff_100%)] p-5 shadow-sm">
      <h3 className="mb-2 text-lg font-bold text-sky-800">
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

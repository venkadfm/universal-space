type CalloutProps = {
  title: string;
  children: React.ReactNode;
};

export function RecommendationBox({ title, children }: CalloutProps) {
  return (
    <div className="my-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
      <h3 className="mb-2 text-lg font-bold text-blue-800">
        ⭐ {title}
      </h3>
      <div className="text-sm leading-7 text-slate-700">{children}</div>
    </div>
  );
}

export function ProTip({ title, children }: CalloutProps) {
  return (
    <div className="my-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <h3 className="mb-2 text-lg font-bold text-emerald-800">
        💡 {title}
      </h3>
      <div className="text-sm leading-7 text-slate-700">{children}</div>
    </div>
  );
}

export function WarningBox({ title, children }: CalloutProps) {
  return (
    <div className="my-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <h3 className="mb-2 text-lg font-bold text-amber-800">
        ⚠️ {title}
      </h3>
      <div className="text-sm leading-7 text-slate-700">{children}</div>
    </div>
  );
}

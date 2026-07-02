type CalloutProps = {
  title: string;
  children: React.ReactNode;
};

export function RecommendationBox({ title, children }: CalloutProps) {
  return (
    <div className="my-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
      <h3 className="mb-3 text-xl font-bold text-blue-800">
        ⭐ {title}
      </h3>
      <div className="text-gray-700 leading-8">{children}</div>
    </div>
  );
}

export function ProTip({ title, children }: CalloutProps) {
  return (
    <div className="my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
      <h3 className="mb-3 text-xl font-bold text-emerald-800">
        💡 {title}
      </h3>
      <div className="text-gray-700 leading-8">{children}</div>
    </div>
  );
}

export function WarningBox({ title, children }: CalloutProps) {
  return (
    <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
      <h3 className="mb-3 text-xl font-bold text-amber-800">
        ⚠️ {title}
      </h3>
      <div className="text-gray-700 leading-8">{children}</div>
    </div>
  );
}
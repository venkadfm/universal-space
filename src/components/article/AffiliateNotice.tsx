import Link from "next/link";

export default function AffiliateNotice() {
  return (
    <div className="mb-7 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs leading-6 text-slate-600">
      <strong className="text-slate-800">Reader note:</strong> Some product or
      tool links may support Venveel at no extra cost to you. Recommendations are
      based on practical fit and reader value.{" "}
      <Link
        href="/affiliate-disclosure"
        className="font-semibold text-slate-800 underline underline-offset-4"
      >
        Details
      </Link>
      .
    </div>
  );
}

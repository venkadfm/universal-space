import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-xl bg-slate-950 text-base font-black text-white shadow-[0_12px_26px_rgba(15,23,42,0.18)] ring-1 ring-white/20 transition group-hover:bg-blue-700">
        V
      </span>
      <span className="leading-tight">
        <span className="block text-xl font-black tracking-tight text-slate-950">
          Venveel
        </span>
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Decide smarter
        </span>
      </span>
    </Link>
  );
}

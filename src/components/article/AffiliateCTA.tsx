type AffiliateCTAProps = {
  title: string;
  description: string;
  buttonText: string;
  href: string;
};

export default function AffiliateCTA({
  title,
  description,
  buttonText,
  href,
}: AffiliateCTAProps) {
  return (
    <div className="my-8 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">
        ⭐ Universal Space Recommendation
      </h3>

      <h4 className="mt-4 text-lg font-semibold">
        {title}
      </h4>

      <p className="mt-3 leading-7 text-slate-700">
        {description}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {buttonText}
      </a>

      <p className="mt-3 text-xs text-slate-500">
        We may earn a commission if you purchase through our links, at no extra cost to you.
      </p>
    </div>
  );
}
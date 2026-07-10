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
  const isExternal = href.startsWith("http");

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#eff6ff_100%)] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <h3 className="text-xl font-bold text-slate-900">
        Venveel Recommendation
      </h3>

      <h4 className="mt-4 text-lg font-semibold">
        {title}
      </h4>

      <p className="mt-3 leading-7 text-slate-700">
        {description}
      </p>

      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer sponsored" : undefined}
        className="brand-button mt-6 inline-flex rounded-xl px-6 py-3 font-semibold"
      >
        {buttonText}
      </a>

    </div>
  );
}

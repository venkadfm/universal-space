import Link from "next/link";
import Logo from "./Logo";

const footerSections = [
  {
    title: "Categories",
    links: [
      { label: "AI Tools", href: "/ai" },
      { label: "Reviews", href: "/reviews" },
      { label: "Buying Guides", href: "/buying-guides" },
      { label: "Productivity", href: "/tools" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Resources", href: "/resources" },
      { label: "Learn", href: "/learn" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Editorial Policy", href: "/editorial-policy" },
      { label: "Review Methodology", href: "/review-methodology" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(135deg,#020617_0%,#0f172a_58%,#0b3b4a_100%)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">

        <div>
          <div className="[&_span_span:first-child]:text-white [&_span_span:last-child]:text-slate-400">
            <Logo />
          </div>

          <p className="mt-5 max-w-sm text-slate-400">
            Practical AI, technology reviews, and buying guides for busy
            professionals who want clearer decisions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/marketplace" className="hover:text-white">
              Marketplace
            </Link>
            <span aria-hidden="true">/</span>
            <span>Social profiles coming soon</span>
          </div>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 font-semibold text-white">{section.title}</h3>

            <div className="space-y-2">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-slate-400 transition hover:text-blue-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700 px-6 py-6 text-center text-sm text-slate-400">
        © 2026 Venveel. Independent guides for smarter technology decisions.
      </div>

    </footer>
  );
}

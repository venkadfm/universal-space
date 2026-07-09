import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import IndianTaxCalculator from "../components/IndianTaxCalculator";
import SipCalculator from "../components/SipCalculator";

const taxGuides = [
  {
    title: "New vs Old Tax Regime",
    description: "Choose the lower-tax regime with a simple decision framework.",
    href: "/articles/new-vs-old-tax-regime-india",
  },
  {
    title: "New Regime ITR Filing",
    description: "Follow the filing steps most salaried taxpayers need.",
    href: "/articles/how-to-file-new-tax-regime-itr-india",
  },
  {
    title: "Calculator Input Guide",
    description: "Know exactly where to find every number before entering it.",
    href: "/articles/how-to-use-indian-tax-calculator",
  },
];

export const metadata: Metadata = {
  title: "Indian Tax Calculator, SIP Calculator and Personal Finance Guides",
  description:
    "Use free Indian income tax and SIP calculators, compare new vs old tax regime, and read practical personal finance guides for Indian users.",
  keywords: [
    "Indian tax calculator",
    "new vs old tax regime calculator",
    "income tax calculator India",
    "SIP calculator",
    "personal finance India",
    "ITR filing guide",
  ],
  alternates: {
    canonical: "/wealth",
  },
  openGraph: {
    title: "Indian Tax Calculator and Personal Finance Tools",
    description:
      "Compare new vs old tax regime, estimate tax payable, calculate SIP returns, and read practical Indian personal finance guides.",
    url: "/wealth",
    type: "website",
  },
};

export default function WealthPage() {
  const taxCalculatorJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Indian Income Tax Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://venveel.com/wealth#indian-tax-calculator",
    description:
      "Free Indian income tax calculator to compare new and old tax regime with salary, HRA, house property, deductions, TDS and tax relief.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    publisher: {
      "@type": "Organization",
      name: "Venveel",
      url: "https://venveel.com",
    },
  };
  const sipCalculatorJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SIP and Lump Sum Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://venveel.com/wealth#sip-calculator",
    description:
      "Free SIP and lump sum calculator with monthly, quarterly and yearly SIP options.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    publisher: {
      "@type": "Organization",
      name: "Venveel",
      url: "https://venveel.com",
    },
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxCalculatorJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sipCalculatorJsonLd) }}
      />

      <section className="max-w-6xl mx-auto py-24 px-6">

        <h1 className="text-5xl font-bold mb-8">
          Wealth & Investing
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          Learn how to build long-term wealth through investing,
          personal finance, tax planning and financial discipline.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Stock Market
            </h2>

            <p className="text-gray-600">
              Investment ideas, company analysis and market insights.
            </p>
          </div>

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Personal Finance
            </h2>

            <p className="text-gray-600">
              Budgeting, saving and smart money management.
            </p>
          </div>

          <div className="premium-card premium-card-hover rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Financial Freedom
            </h2>

            <p className="text-gray-600">
              Build assets and create multiple income streams.
            </p>
          </div>

        </div>

        <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)] md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-eyebrow mb-3">
                Personal finance
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Indian Tax Hub
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                Compare regimes, understand the inputs, and prepare your ITR
                review before filing.
              </p>
            </div>

            <Link
              href="#indian-tax-calculator"
              className="brand-button inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold"
            >
              Open calculator
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {taxGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
              >
                <FileText className="size-5 text-blue-700" />
                <h3 className="mt-4 font-bold text-slate-950">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div id="indian-tax-calculator" className="mt-16 scroll-mt-24">
          <IndianTaxCalculator />
        </div>

        <div id="sip-calculator" className="mt-16 scroll-mt-24">
          <SipCalculator />
        </div>

      </section>

    </main>
  );
}

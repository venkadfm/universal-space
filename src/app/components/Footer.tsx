import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[linear-gradient(135deg,#020617_0%,#0f172a_58%,#0b3b4a_100%)] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        <div>
          <div className="[&_span_span:first-child]:text-white [&_span_span:last-child]:text-slate-400">
            <Logo />
          </div>

          <p className="mt-5 text-gray-400">
            Practical AI, tech, money, and buying guides for busy professionals.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Explore</h3>

          <div className="space-y-2">
            <Link href="/ai" className="block hover:text-blue-400">
              AI
            </Link>

            <Link href="/wealth" className="block hover:text-blue-400">
              Wealth
            </Link>

            <Link href="/business" className="block hover:text-blue-400">
              Business
            </Link>

            <Link href="/marketplace" className="block hover:text-blue-400">
              Marketplace
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Resources</h3>

          <div className="space-y-2">
            <Link href="/tools" className="block hover:text-blue-400">
              Tools
            </Link>

            <Link href="/reviews" className="block hover:text-blue-400">
              Reviews
            </Link>

            <Link href="/resources" className="block hover:text-blue-400">
              Resources
            </Link>

            <Link href="/about" className="block hover:text-blue-400">
              About
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Stay Updated
          </h3>

          <p className="text-gray-400 mb-4">
            Weekly insights on AI, investing and online business.
          </p>

          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-blue-50"
          >
            Get in Touch
          </Link>
        </div>

      </div>

      <div className="border-t border-slate-700 text-center py-6 text-gray-400">
        © 2026 Venveel. Independent guides for smarter decisions.
      </div>

    </footer>
  );
}

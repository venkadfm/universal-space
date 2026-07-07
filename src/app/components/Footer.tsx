import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Venveel
          </h2>

          <p className="text-gray-400">
            Your Space for AI, Wealth & Growth.
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

          <button className="bg-blue-600 px-5 py-3 rounded-lg hover:bg-blue-700">
            Join Newsletter
          </button>
        </div>

      </div>

      <div className="border-t border-slate-700 text-center py-6 text-gray-400">
        © 2026 Venveel • Version 1.0 🚀
      </div>

    </footer>
  );
}
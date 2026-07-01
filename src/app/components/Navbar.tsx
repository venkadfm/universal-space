import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-slate-900">
          Universal <span className="text-blue-600">Space</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">

          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <div className="relative group">

            <button className="hover:text-blue-600 transition">
              Learn ▾
            </button>

            <div className="absolute left-0 mt-3 hidden group-hover:block w-64 rounded-xl bg-white shadow-xl border border-gray-100 p-3">

              <Link
                href="/ai"
                className="block rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                🤖 Artificial Intelligence
              </Link>

              <Link
                href="/wealth"
                className="block rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                💰 Wealth
              </Link>

              <Link
                href="/business"
                className="block rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                🚀 Business
              </Link>

              <Link
                href="/reviews"
                className="block rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                💻 Technology
              </Link>

            </div>

          </div>

          <Link href="/tools" className="hover:text-blue-600 transition">
            Tools
          </Link>

          <Link href="/marketplace" className="hover:text-blue-600 transition">
            Marketplace
          </Link>

          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>

        </div>

      </div>
    </nav>
  );
}
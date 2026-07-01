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
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">

          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link href="/ai" className="hover:text-blue-600 transition">
            AI
          </Link>

          <Link href="/wealth" className="hover:text-blue-600 transition">
            Wealth
          </Link>

          <Link href="/business" className="hover:text-blue-600 transition">
            Business
          </Link>

          <Link href="/reviews" className="hover:text-blue-600 transition">
            Reviews
          </Link>

          <Link href="/resources" className="hover:text-blue-600 transition">
            Resources
          </Link>

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
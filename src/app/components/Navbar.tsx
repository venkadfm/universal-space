import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-extrabold text-slate-900">
            Universal Space
          </span>

          <span className="text-xs text-gray-500 tracking-wide">
            AI • Wealth • Business
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-7 text-sm font-medium">

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

          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>

        </div>
      </div>
    </nav>
  );
}
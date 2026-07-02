"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "AI", href: "/ai" },
  { name: "Wealth", href: "/wealth" },
  { name: "Business", href: "/business" },
  { name: "Reviews", href: "/reviews" },
  { name: "Resources", href: "/resources" },
  { name: "Marketplace", href: "/marketplace" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-900">
          Universal Space
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition ${
                  active
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-xl md:hidden"
          aria-label="Open menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-semibold ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
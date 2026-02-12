"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type NavDict = {
  services: string;
  pricing: string;
  faq: string;
  contact: string;
  bookCall: string;
};

export default function Navbar({
  dict,
  locale,
}: {
  dict: NavDict;
  locale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "en" ? "zh" : "en";
  const otherLabel = locale === "en" ? "中文" : "EN";
  const localePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="text-xl font-bold text-white">
            GetClaw 🦞
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo("services")}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {dict.services}
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {dict.pricing}
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {dict.faq}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {dict.contact}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href={localePath}
              className="text-sm text-gray-400 hover:text-white border border-gray-700 rounded-md px-3 py-1.5 transition-colors"
            >
              {otherLabel}
            </Link>
            <button
              onClick={() => scrollTo("contact")}
              className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              {dict.bookCall}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-2 pt-4 space-y-3">
            <button
              onClick={() => scrollTo("services")}
              className="block w-full text-left text-sm text-gray-300 hover:text-white"
            >
              {dict.services}
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="block w-full text-left text-sm text-gray-300 hover:text-white"
            >
              {dict.pricing}
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="block w-full text-left text-sm text-gray-300 hover:text-white"
            >
              {dict.faq}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="block w-full text-left text-sm text-gray-300 hover:text-white"
            >
              {dict.contact}
            </button>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={localePath}
                className="text-sm text-gray-400 hover:text-white border border-gray-700 rounded-md px-3 py-1.5"
              >
                {otherLabel}
              </Link>
              <button
                onClick={() => scrollTo("contact")}
                className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold text-sm px-4 py-2 rounded-lg"
              >
                {dict.bookCall}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

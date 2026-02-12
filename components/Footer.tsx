import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type FooterDict = {
  brand: string;
  quickLinks: string;
  location: string;
  copyright: string;
  disclaimer: string;
};

type NavDict = {
  services: string;
  pricing: string;
  faq: string;
  contact: string;
};

export default function Footer({
  dict,
  navDict,
  locale,
}: {
  dict: FooterDict;
  navDict: NavDict;
  locale: Locale;
}) {
  return (
    <footer className="border-t border-gray-800 py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link
              href={`/${locale}`}
              className="text-xl font-bold text-white"
            >
              GetClaw 🦞
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              {dict.brand}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {dict.quickLinks}
            </h4>
            <ul className="space-y-2">
              {(
                [
                  ["#services", navDict.services],
                  ["#pricing", navDict.pricing],
                  ["#faq", navDict.faq],
                  ["#contact", navDict.contact],
                ] as const
              ).map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <p className="text-sm text-gray-400">{dict.location}</p>
            <p className="text-sm text-gray-400 mt-2">
              <a
                href="mailto:hello@getclaw.ca"
                className="hover:text-white transition-colors"
              >
                hello@getclaw.ca
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center space-y-2">
          <p className="text-sm text-gray-500">{dict.copyright}</p>
          <p className="text-xs text-gray-600">{dict.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}

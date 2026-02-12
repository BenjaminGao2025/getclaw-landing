import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "GetClaw - Professional OpenClaw Deployment & Security",
    description:
      "We deploy OpenClaw for founders and teams who want AI automation without the technical headache. Security-first. Based in Vancouver, serving globally.",
  },
  zh: {
    title: "GetClaw - 专业 OpenClaw 部署与安全加固服务",
    description:
      "我们为创始人和团队部署 OpenClaw，让你享受 AI 自动化，无需操心技术细节。安全优先。温哥华团队，服务全球。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const m = meta[l] || meta.en;

  return {
    metadataBase: new URL("https://getclaw.ca"),
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://getclaw.ca/${l}`,
      siteName: "GetClaw",
      locale: l === "zh" ? "zh_CN" : "en_US",
      type: "website",
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: ["/og-image.svg"],
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return <div lang={locale}>{children}</div>;
}

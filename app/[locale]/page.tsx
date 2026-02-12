import { getDictionary, type Locale } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar dict={dict.nav} locale={locale as Locale} />
      <Hero dict={dict.hero} />
      <PainPoints dict={dict.painPoints} />
      <Services dict={dict.services} />
      <Testimonials dict={dict.testimonials} />
      <Pricing dict={dict.pricing} />
      <HowItWorks dict={dict.howItWorks} />
      <FAQ dict={dict.faq} />
      <Contact dict={dict.contact} />
      <Footer dict={dict.footer} navDict={dict.nav} locale={locale as Locale} />
    </main>
  );
}

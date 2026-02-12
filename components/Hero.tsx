"use client";

import { motion } from "framer-motion";

type HeroDict = {
  title: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
  trust1: string;
  trust2: string;
  trust3: string;
};

export default function Hero({ dict }: { dict: HeroDict }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-gray-950 to-gray-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
        >
          {dict.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          {dict.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("contact")}
            className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold text-lg px-8 py-3.5 rounded-lg transition-colors"
          >
            {dict.cta}
          </button>
          <button
            onClick={() => scrollTo("pricing")}
            className="border border-gray-600 hover:border-gray-400 text-white font-semibold text-lg px-8 py-3.5 rounded-lg transition-colors"
          >
            {dict.ctaSecondary}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500"
        >
          <span>🔒 {dict.trust1}</span>
          <span>🌏 {dict.trust2}</span>
          <span>⚡ {dict.trust3}</span>
        </motion.div>
      </div>
    </section>
  );
}

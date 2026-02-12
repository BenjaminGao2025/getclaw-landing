"use client";

import { motion } from "framer-motion";

type PricingPlan = {
  name: string;
  location: string;
  price: string;
  currency: string;
  period: string;
  features: string[];
  cta: string;
  popular: boolean;
};

type ManagedPlan = {
  name: string;
  price: string;
  period: string;
  desc: string;
};

type PricingDict = {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
  managed: {
    title: string;
    plans: ManagedPlan[];
  };
};

export default function Pricing({ dict }: { dict: PricingDict }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {dict.title}
          </h2>
          <p className="text-gray-400 text-lg">{dict.subtitle}</p>
        </motion.div>

        {/* One-time plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {dict.plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-gray-900/60 border rounded-xl p-8 flex flex-col ${
                plan.popular
                  ? "border-cyan-500 ring-1 ring-cyan-500/20"
                  : "border-gray-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.location}</p>
              </div>
              <div className="mb-6">
                <span className="text-sm text-gray-400">{plan.currency} $</span>
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-cyan-400 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              {/* Future Stripe Checkout integration: replace scrollTo with Stripe Payment Link */}
              <button
                onClick={() => scrollTo("contact")}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors ${
                  plan.popular
                    ? "bg-amber-500 hover:bg-amber-400 text-gray-900"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Managed Care */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/40 border border-gray-800 rounded-xl p-8"
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">
            {dict.managed.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {dict.managed.plans.map((mp, i) => (
              <div
                key={i}
                className="text-center bg-gray-900/60 border border-gray-800 rounded-lg p-6"
              >
                <p className="text-sm text-gray-400 mb-1">{mp.name}</p>
                <p className="text-2xl font-bold text-white">
                  {mp.price !== "Custom" && mp.price !== "定制" ? (
                    <>
                      <span className="text-sm text-gray-400">CAD $</span>
                      {mp.price}
                    </>
                  ) : (
                    mp.price
                  )}
                  <span className="text-sm text-gray-500">{mp.period}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">{mp.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

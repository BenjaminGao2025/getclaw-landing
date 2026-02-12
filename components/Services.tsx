"use client";

import { motion } from "framer-motion";

type ServicesDict = {
  title: string;
  items: { title: string; subtitle: string; features: string[] }[];
};

const icons = ["🛡️", "👔", "🔄"];

export default function Services({ dict }: { dict: ServicesDict }) {
  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white text-center mb-4"
        >
          {dict.title}
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {dict.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-gray-900/60 border border-gray-800 rounded-xl p-8 hover:border-cyan-800/50 transition-colors"
            >
              <div className="text-4xl mb-4">{icons[i]}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-cyan-400 text-sm mb-6">{item.subtitle}</p>
              <ul className="space-y-3">
                {item.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-cyan-400 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

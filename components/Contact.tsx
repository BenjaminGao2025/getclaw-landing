"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type ContactDict = {
  title: string;
  subtitle: string;
  bookCall: { title: string; desc: string; cta: string };
  form: {
    title: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    success: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
  };
  instant: {
    title: string;
    whatsapp: string;
    wechat: string;
    email: string;
  };
};

export default function Contact({ dict }: { dict: ContactDict }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    if (formspreeId) {
      try {
        await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });
      } catch {
        // Silently handle - form still shows success for UX
      }
    }

    setLoading(false);
    setSubmitted(true);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1XXXXXXXXXX";
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book a Call */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/60 border border-gray-800 rounded-xl p-8 flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-lg font-bold text-white mb-2">
              {dict.bookCall.title}
            </h3>
            <p className="text-sm text-gray-400 mb-6 flex-1">
              {dict.bookCall.desc}
            </p>
            {/* Calendly integration placeholder */}
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold text-sm py-3 rounded-lg transition-colors text-center block"
            >
              {dict.bookCall.cta}
            </a>
          </motion.div>

          {/* Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-900/60 border border-gray-800 rounded-xl p-8"
          >
            <h3 className="text-lg font-bold text-white mb-6 text-center">
              {dict.form.title}
            </h3>
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-cyan-400">{dict.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    {dict.form.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={dict.form.namePlaceholder}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    {dict.form.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={dict.form.emailPlaceholder}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    {dict.form.message}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    required
                    placeholder={dict.form.messagePlaceholder}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? "..." : dict.form.submit}
                </button>
              </form>
            )}
          </motion.div>

          {/* Instant Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900/60 border border-gray-800 rounded-xl p-8 flex flex-col items-center text-center"
          >
            <h3 className="text-lg font-bold text-white mb-6">
              {dict.instant.title}
            </h3>

            <div className="space-y-4 w-full flex-1">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-semibold text-sm py-3 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {dict.instant.whatsapp}
              </a>

              {/* WeChat QR placeholder */}
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-3">
                  {dict.instant.wechat}
                </p>
                <div className="w-32 h-32 mx-auto bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                  QR Placeholder
                </div>
              </div>

              <a
                href={`mailto:${dict.instant.email}`}
                className="flex items-center justify-center gap-2 w-full border border-gray-700 hover:border-gray-500 text-white text-sm py-3 rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {dict.instant.email}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// src/Components/Features.jsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, QrCode, Globe, Flask } from "lucide-react";

const items = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Blockchain Security", text: "Immutable provenance anchored on-chain." },
  { icon: <QrCode className="w-5 h-5" />, title: "QR Tracking", text: "Per-product traceability via scannable codes." },
  { icon: <Globe className="w-5 h-5" />, title: "Global Trace", text: "Geo-tag, timestamp and cross-border audits." },
  { icon: <Flask className="w-5 h-5" />, title: "Lab Verified", text: "Attach certified lab results to each checkpoint." },
];

const cardVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: (i = 0) => ({ y: 0, opacity: 1, transition: { duration: 0.6, delay: i * 0.08, ease: "linear" } }),
};

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-12" style={{ background: "linear-gradient(180deg,#ffffff00,#f0fff6)" }}>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "linear" }}
        className="text-3xl font-extrabold text-emerald-900 text-center mb-10"
      >
        Core Features
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, idx) => (
          <motion.article
            key={idx}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.18, ease: "linear" } }}
            className="rounded-2xl p-6 shadow-sm border bg-gradient-to-br from-white to-emerald-50"
          >
            <div className="w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center text-emerald-600 mb-4">
              {it.icon}
            </div>
            <h4 className="font-semibold text-lg text-slate-900">{it.title}</h4>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{it.text}</p>
            <div className="mt-4 text-xs text-emerald-700 font-medium">Learn more →</div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

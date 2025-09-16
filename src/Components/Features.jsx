import { motion } from "framer-motion";
import { ShieldCheck, QrCode, Globe, Flask } from "lucide-react";

const items = [
  { icon: <ShieldCheck />, title: "Blockchain Security", text: "Immutable provenance anchored on-chain." },
  { icon: <QrCode />, title: "QR Tracking", text: "Per-product traceability via scannable codes." },
  { icon: <Globe />, title: "Global Trace", text: "Geo-tag, timestamp and cross-border audits." },
  { icon: <Flask />, title: "Lab Verified", text: "Attach certified lab results to each checkpoint." },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-extrabold text-slate-900 text-center mb-6"
      >
        Core features
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, translateY: -6 }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-transparent hover:border-violet-100 cursor-default"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-50 to-emerald-50 flex items-center justify-center text-violet-600 mb-3">
              {it.icon}
            </div>
            <h4 className="font-semibold text-lg text-slate-900">{it.title}</h4>
            <p className="text-sm text-slate-600 mt-2">{it.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

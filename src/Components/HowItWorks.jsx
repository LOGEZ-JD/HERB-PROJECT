import { motion } from "framer-motion";
import { MapPin, Scissors, Truck } from "lucide-react";

const STEPS = [
  { icon: <MapPin />, title: "Collection", text: "Geo-tagged forms capture location & conditions." },
  { icon: <Scissors />, title: "Processing", text: "Operator logs, checks, lab attachments." },
  { icon: <Truck />, title: "Distribution", text: "QR codes created and distributed with manifests." },
];

export default function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h3 className="text-3xl font-bold text-center text-slate-900 mb-6">How it works</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3 text-emerald-700">
              {s.icon}
            </div>
            <h4 className="font-semibold">{s.title}</h4>
            <p className="text-sm text-slate-600 mt-2">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

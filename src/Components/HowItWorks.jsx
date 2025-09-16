import { motion } from "framer-motion";
import { MapPin, Scissors, Truck } from "lucide-react";

const STEPS = [
  { icon: <MapPin />, title: "Collection", text: "Geo-tagged forms capture time, location and harvest notes." },
  { icon: <Scissors />, title: "Processing", text: "Checks, lab attachments and operator logs form an immutable record." },
  { icon: <Truck />, title: "Distribution", text: "QR codes let consumers and auditors verify origin instantly." },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h3 className="text-3xl font-bold text-center text-emerald-900 mb-8">How It Works</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {STEPS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3 text-emerald-600">
              {s.icon}
            </div>
            <h4 className="font-semibold text-lg">{s.title}</h4>
            <p className="mt-2 text-gray-600 text-sm">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// src/Components/WhyChoose.jsx
import { motion } from "framer-motion";

export default function WhyChoose() {
  const items = [
    { title: "Trust", desc: "Immutable blockchain records ensure authenticity." },
    { title: "Sustainability", desc: "Promotes eco-friendly harvesting and fair trade." },
    { title: "Innovation", desc: "AI-powered herb recognition and traceability." }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <motion.img
          src="/images/sustainability.png"
          alt="Why Choose"
          className="rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />

        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Choose HerbTrack?</h2>
          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-4 rounded-xl bg-white shadow-md hover:shadow-lg"
              >
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

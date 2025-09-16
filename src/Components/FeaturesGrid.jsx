// This is a more visual grid version (cards with icons, longer descriptions)
import { motion } from "framer-motion";
import { Database, MapPin, Users } from "lucide-react";

const GRID = [
  { icon: <Database />, title: "Open Herb Database", text: "Search by name, properties, region, and more." },
  { icon: <MapPin />, title: "Geo Collation", text: "Pin exact harvest coordinates and local conditions." },
  { icon: <Users />, title: "Community", text: "Grower profiles, certifications and ratings." },
];

export default function FeaturesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {GRID.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.03 }}
            className="p-8 bg-white rounded-2xl shadow hover:shadow-2xl border"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              {g.icon}
            </div>
            <h4 className="text-xl font-semibold text-emerald-800">{g.title}</h4>
            <p className="mt-3 text-gray-600">{g.text}</p>
            <button className="mt-6 inline-flex items-center gap-2 text-emerald-600 hover:underline">
              Learn more →
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

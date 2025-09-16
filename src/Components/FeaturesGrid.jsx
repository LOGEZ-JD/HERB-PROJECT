import { motion } from "framer-motion";
import { Database, MapPin, Users } from "lucide-react";

const GRID = [
  { icon: <Database />, title: "Open Herb DB", text: "Rich searchable dataset of herbs & uses." },
  { icon: <MapPin />, title: "Geo Collation", text: "Pin harvest coordinates & local conditions." },
  { icon: <Users />, title: "Community", text: "Grower profiles, certifications & ratings." },
];

export default function FeaturesGrid() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {GRID.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white p-6 rounded-2xl shadow-lg border"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4 text-emerald-700">
              {g.icon}
            </div>
            <h4 className="text-xl font-semibold text-slate-900">{g.title}</h4>
            <p className="mt-2 text-slate-600">{g.text}</p>
            <button className="mt-4 inline-flex items-center gap-2 text-violet-600 hover:underline">
              Explore
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// This is a more visual grid version (cards with icons, longer descriptions)
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Database, MapPin, Users } from "lucide-react";

const GRID = [
  {
    icon: <Database />,
    title: "Open Herb Database",
    text: "Search by name, properties, region, and more.",
    path: "/features/open-herb-database",
  },
  {
    icon: <MapPin />,
    title: "Geo Collation",
    text: "Pin exact harvest coordinates and local conditions.",
    path: "/geo-tracking",
  },
  {
    icon: <Users />,
    title: "Community",
    text: "Grower profiles, certifications and ratings.",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-emerald-900">Features</h2>
        <p className="text-slate-600 mt-2">
          Explore HerbTrack's main capabilities. Click any card to read more
          below.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {GRID.map((g, i) => (
          <Link to={g.path || "#"} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03 }}
              className="p-8 bg-white rounded-2xl shadow hover:shadow-2xl border h-full"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                {g.icon}
              </div>
              <h4 className="text-xl font-semibold text-emerald-800">
                {g.title}
              </h4>
              <p className="mt-3 text-gray-600">{g.text}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-emerald-600 font-semibold">
                Learn more →
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";

const MOCK = [
  { id: 1, name: "Ashwagandha", region: "Rajasthan", tag: "Adaptogen" },
  { id: 2, name: "Tulsi", region: "Kerala", tag: "Antioxidant" },
  { id: 3, name: "Turmeric", region: "Tamil Nadu", tag: "Anti-inflammatory" },
];

export default function HerbsDatabase() {
  const [q, setQ] = useState("");
  const filtered = MOCK.filter((m) => m.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-slate-900">Herb Database</h3>
        <input placeholder="Search herbs..." value={q} onChange={(e) => setQ(e.target.value)} className="px-4 py-2 rounded-lg border w-64" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((h) => (
          <motion.div key={h.id} whileHover={{ y: -6 }} className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold text-slate-900">{h.name}</h4>
            <div className="text-sm text-slate-600">{h.region} • {h.tag}</div>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 bg-violet-600 text-white rounded">View</button>
              <button className="px-3 py-1 border rounded">Trace</button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

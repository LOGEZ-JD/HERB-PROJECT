import { motion } from "framer-motion";
import TraceCard from "../Components/TraceCard";

export default function Dashboard() {
  const stats = [
    { id: 1, label: "Trace Events", value: 5421 },
    { id: 2, label: "Verified", value: 4210 },
    { id: 3, label: "Batches", value: 842 },
  ];
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <motion.h1 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold text-slate-900 mb-4">Dashboard</motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.06 }} className="bg-white p-4 rounded-2xl shadow">
            <div className="text-sm text-slate-500">{s.label}</div>
            <div className="text-2xl font-semibold text-violet-600">{s.value.toLocaleString()}</div>
          </motion.div>
        ))}
      </div>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="font-semibold">Recent Events</h4>
          <div className="mt-4 space-y-3">
            <div className="p-3 rounded-lg border hover:bg-emerald-50 transition">
              <div className="flex justify-between items-start">
                <div><div className="font-medium">Ashwagandha - Collected</div><div className="text-sm text-slate-600">Geo-tag added</div></div>
                <div className="text-xs text-slate-400">2h</div>
              </div>
            </div>
            <div className="p-3 rounded-lg border hover:bg-emerald-50 transition">
              <div className="flex justify-between items-start">
                <div><div className="font-medium">Turmeric - Lab</div><div className="text-sm text-slate-600">Certificate attached</div></div>
                <div className="text-xs text-slate-400">6h</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h4 className="font-semibold">Recent Summary</h4>
          <div className="mt-4 grid gap-3">
            <TraceCard step={{ title: "TRC-001 Collection", desc: "GPS + photo", time: "2025-09-16" }} />
            <TraceCard step={{ title: "TRC-003 Lab", desc: "Certificate LAB-998", time: "2025-09-15" }} />
          </div>
        </div>
      </section>
    </main>
  );
}

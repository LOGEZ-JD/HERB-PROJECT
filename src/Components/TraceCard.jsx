import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function TraceCard({ step }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="bg-white p-4 rounded-xl shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
          {step.icon || "✓"}
        </div>
        <div>
          <h5 className="font-semibold text-slate-900">{step.title}</h5>
          <p className="text-sm text-slate-600">{step.desc}</p>
          {step.time && <div className="mt-2 text-xs text-slate-400 flex items-center gap-2"><Clock className="w-3 h-3" />{step.time}</div>}
        </div>
      </div>
    </motion.div>
  );
}

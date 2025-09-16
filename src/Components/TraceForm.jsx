import { useState } from "react";
import { motion } from "framer-motion";

export default function TraceForm({ onSubmit }) {
  const [id, setId] = useState("");
  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={(e) => { e.preventDefault(); onSubmit?.(id); }} className="bg-white p-6 rounded-2xl shadow max-w-xl">
      <label className="block text-sm text-slate-600 mb-2">Enter product QR / Trace ID</label>
      <div className="flex gap-2">
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="TRC-123456" className="flex-1 px-4 py-2 rounded-lg border" />
        <button type="submit" className="px-4 py-2 bg-violet-600 text-white rounded-lg">Trace</button>
      </div>
      <p className="text-xs text-slate-400 mt-2">We return a tamper-proof history of the selected item.</p>
    </motion.form>
  );
}

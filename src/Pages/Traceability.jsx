import { useState } from "react";
import { motion } from "framer-motion";
import QRModal from "../Components/QRModal";

const SAMPLE = {
  id: "TRC-001",
  product: "Ashwagandha Batch A12",
  events: [
    { step: "Collection", note: "Harvested; moisture 8%", time: "2025-09-10 08:12", geo: "26.91N,75.78E" },
    { step: "Processing", note: "Dried at 40°C", time: "2025-09-11 13:40" },
    { step: "Lab Test", note: "Within spec", time: "2025-09-12 09:21" },
  ],
};

export default function Traceability() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [qrOpen, setQrOpen] = useState(false);

  function handleTrace(e) {
    e?.preventDefault();
    if (!query || query.toLowerCase().includes("trc-001")) setResult(SAMPLE);
    else setResult({ notfound: true });
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Traceability Lookup</h2>
      <p className="text-sm text-slate-500 mb-6">Enter a trace ID or open QR to inspect the history.</p>

      <form onSubmit={handleTrace} className="flex gap-3 mb-8">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="TRC-001" className="flex-1 px-4 py-3 rounded-lg border" />
        <button type="submit" className="px-6 py-3 bg-violet-600 text-white rounded-lg">Trace</button>
        <button type="button" onClick={() => setQrOpen(true)} className="px-4 py-3 border rounded-lg">Open QR</button>
      </form>

      <section>
        {!result && <div className="text-sm text-slate-400">Try sample id <strong>TRC-001</strong>.</div>}
        {result?.notfound && <div className="text-red-500">No trace found.</div>}
        {result && !result.notfound && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-slate-500">Trace ID</div>
                <div className="text-lg font-semibold text-violet-600">{result.id}</div>
                <div className="text-sm text-slate-600 mt-1">{result.product}</div>
              </div>
              <div className="text-sm text-slate-500">Verified on chain</div>
            </div>

            <div className="mt-6 grid gap-3">
              {result.events.map((ev, i) => (
                <div key={i} className="p-4 rounded-lg border hover:bg-emerald-50 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{ev.step}</div>
                      <div className="text-sm text-slate-600">{ev.note}</div>
                    </div>
                    <div className="text-xs text-slate-400">{ev.time}</div>
                  </div>
                  {ev.geo && <div className="mt-2 text-xs text-slate-400">Geo: {ev.geo}</div>}
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => alert("Download manifest (demo)")} className="px-4 py-2 bg-violet-600 text-white rounded">Download</button>
              <button onClick={() => setQrOpen(true)} className="px-4 py-2 border rounded">Show QR</button>
            </div>
          </motion.div>
        )}
      </section>

      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} codeUrl={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(result?.id || "TRC-001")}`} />
    </main>
  );
}

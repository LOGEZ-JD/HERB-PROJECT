// src/Pages/QRGenerator.jsx
import React, { useState } from "react";
import API from "../api";

export default function QRGenerator() {
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    origin: "",
    batchId: "",
    notes: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function update(k, v) { setForm((s) => ({ ...s, [k]: v })); }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/api/herbs", form);
      setResult(res.data.herb);
    } catch (err) {
      alert("Error creating herb");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">QR Code Generator</h1>

      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block text-sm font-medium">Herb name</label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} required className="mt-2 w-full border p-2 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Manufacturer</label>
            <input value={form.manufacturer} onChange={(e) => update("manufacturer", e.target.value)} className="mt-2 w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Origin</label>
            <input value={form.origin} onChange={(e) => update("origin", e.target.value)} className="mt-2 w-full border p-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Batch ID (optional)</label>
          <input value={form.batchId} onChange={(e) => update("batchId", e.target.value)} className="mt-2 w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} className="mt-2 w-full border p-2 rounded" rows={4} />
        </div>

        <div>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-emerald-600 text-white rounded">
            {loading ? "Generating…" : "Generate QR & Save"}
          </button>
        </div>
      </form>

      {result && (
        <section className="mt-6 p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">{result.name}</h3>
          <p className="text-sm text-slate-600">Batch ID: {result.batchId || "—"}</p>
          <div className="mt-4 flex gap-6 items-center">
            <div>
              <img src={result.qrDataUrl} alt="QR" className="w-48 h-48 bg-white p-2 rounded" />
            </div>
            <div>
              <a href={result.qrDataUrl} download={`${result.name}-qr.png`} className="px-4 py-2 bg-slate-100 border rounded">Download QR</a>
              <a href={`/herb/${result.id}`} className="ml-4 px-4 py-2 bg-emerald-50 border rounded">Open Herb Page</a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

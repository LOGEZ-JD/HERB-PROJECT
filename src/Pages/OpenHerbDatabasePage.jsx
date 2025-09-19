// src/Pages/OpenHerbDatabase.jsx
import React, { useEffect, useState } from "react";
import { createHerb, listHerbs } from "../api";
import { useNavigate } from "react-router-dom";

export default function OpenHerbDatabase() {
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", manufacturer: "", origin: "", batchId: "", notes: "" });
  const navigate = useNavigate();

  async function fetchList() {
    setLoading(true);
    try {
      const list = await listHerbs();
      setHerbs(list || []);
    } catch (err) {
      console.error("Failed to fetch herbs:", err);
      setHerbs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Please enter herb name");
      return;
    }

    setLoading(true);
    try {
      const herb = await createHerb({
        name: form.name.trim(),
        manufacturer: form.manufacturer.trim(),
        origin: form.origin.trim(),
        batchId: form.batchId.trim(),
        notes: form.notes.trim(),
      });

      await fetchList();
      if (herb?.id) navigate(`/herb/${herb.id}`);
    } catch (err) {
      console.error("Create herb failed:", err);
      alert("Failed to create herb. See console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-emerald-900 mb-4">Open Herb Database</h1>
        <p className="text-slate-600 mb-6">Search, create, and view herbs. Generate QR codes for each herb for traceability.</p>

        <form className="bg-white p-6 rounded-2xl border mb-8" onSubmit={handleCreate}>
          <h3 className="font-semibold mb-3">Create new herb / batch</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Herb name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-3 border rounded"
            />
            <input
              placeholder="Manufacturer"
              value={form.manufacturer}
              onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
              className="p-3 border rounded"
            />
            <input
              placeholder="Origin (region)"
              value={form.origin}
              onChange={(e) => setForm({ ...form, origin: e.target.value })}
              className="p-3 border rounded"
            />
            <input
              placeholder="Batch ID (optional)"
              value={form.batchId}
              onChange={(e) => setForm({ ...form, batchId: e.target.value })}
              className="p-3 border rounded"
            />
            <textarea
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="p-3 border rounded md:col-span-2"
            />
          </div>

          <div className="mt-4">
            <button type="submit" disabled={loading} className="px-5 py-2 bg-emerald-700 text-white rounded disabled:opacity-60">
              {loading ? "Creating..." : "Generate QR & Save"}
            </button>
            <button type="button" onClick={fetchList} className="ml-3 px-4 py-2 border rounded">
              Refresh
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-3">Herb database {loading ? "(loading...)" : ""}</h4>
            <div className="space-y-3">
              {herbs.length === 0 && <div className="text-sm text-slate-500">No herbs yet. Create one above.</div>}
              {herbs.map((h) => (
                <div
                  key={h.id}
                  onClick={() => navigate(`/herb/${h.id}`)}
                  className="p-3 rounded-lg border hover:shadow cursor-pointer bg-white"
                >
                  <div className="font-semibold text-emerald-800">{h.name}</div>
                  <div className="text-sm text-slate-500 mt-1">Batch: {h.batchId || "—"}</div>
                  <div className="text-xs text-slate-400 mt-1">{h.createdAt ? new Date(h.createdAt).toLocaleDateString() : ""}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="p-6 rounded-2xl border bg-white">
              <p className="text-slate-500">Select a herb from the left or create a new one. When you scan the QR it will open a public detail page that shows full history (events & lab reports).</p>
              <div className="mt-6">
                <h5 className="font-semibold mb-2">Quick tips</h5>
                <ul className="list-disc list-inside text-slate-600">
                  <li>After creating, you will be navigated to the herb detail page where the generated QR is shown.</li>
                  <li>Use the herb detail page to add trace events and lab reports (admin required in production).</li>
                  <li>Ensure backend and FRONTEND_URL are configured correctly so QR points to the right domain.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

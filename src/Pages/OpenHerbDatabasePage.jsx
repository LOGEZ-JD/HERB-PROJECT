// src/Pages/OpenHerbDatabasePage.jsx
import React, { useEffect, useState } from "react";
import API from "../api";

/**
 * Page layout:
 * - Top: page title + short description
 * - Main: left column = database list; right column = QR generator & herb detail
 *
 * Behavior:
 * - Loads herbs from GET /api/herbs
 * - Create herb: POST /api/herbs (returns herb with qrDataUrl)
 * - Selecting a herb shows details on the right
 */

function HerbList({ herbs, onSelect, selectedId }) {
  return (
    <div className="space-y-4">
      {herbs.map((h) => (
        <div
          key={h.id}
          className={`p-4 rounded-lg border ${selectedId === h.id ? "bg-emerald-50 border-emerald-200" : "bg-white"} cursor-pointer`}
          onClick={() => onSelect(h)}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-lg text-slate-800">{h.name}</div>
              <div className="text-sm text-slate-500">Batch: {h.batchId || "—"}</div>
            </div>
            <div className="text-xs text-slate-400">{new Date(h.createdAt?.seconds ? h.createdAt.seconds * 1000 : Date.now()).toLocaleDateString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function QRGeneratorForm({ onCreated }) {
  const [form, setForm] = useState({ name: "", manufacturer: "", origin: "", batchId: "", notes: "" });
  const [loading, setLoading] = useState(false);

  function update(k, v) { setForm((s) => ({ ...s, [k]: v })); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name) { alert("Herb name is required"); return; }
    setLoading(true);
    try {
      const res = await API.post("/api/herbs", {
        name: form.name,
        manufacturer: form.manufacturer,
        origin: form.origin,
        batchId: form.batchId,
        notes: form.notes,
      });
      onCreated(res.data.herb);
      setForm({ name: "", manufacturer: "", origin: "", batchId: "", notes: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to create herb. See console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="text-xl font-semibold">Create new herb / batch</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border rounded p-2" placeholder="Herb name *" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        <input className="border rounded p-2" placeholder="Manufacturer" value={form.manufacturer} onChange={(e) => update("manufacturer", e.target.value)} />
        <input className="border rounded p-2" placeholder="Origin (region)" value={form.origin} onChange={(e) => update("origin", e.target.value)} />
        <input className="border rounded p-2" placeholder="Batch ID (optional)" value={form.batchId} onChange={(e) => update("batchId", e.target.value)} />
      </div>

      <textarea className="w-full border rounded p-2" placeholder="Notes" rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} />

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded">
          {loading ? "Creating…" : "Generate QR & Save"}
        </button>
      </div>
    </form>
  );
}

function HerbDetail({ herb }) {
  if (!herb) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center text-slate-500">
        Select a herb on the left to see details here.
      </div>
    );
  }

  const createdAt = herb.createdAt?.seconds ? new Date(herb.createdAt.seconds * 1000).toLocaleString() : "—";

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <div className="flex gap-6 items-start">
        <div className="w-40 h-40 bg-white flex items-center justify-center border rounded">
          {herb.qrDataUrl ? <img src={herb.qrDataUrl} alt="QR" className="w-36 h-36" /> : <div className="text-slate-400">QR not generated</div>}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900">{herb.name}</h2>
          <p className="text-sm text-slate-500">Batch: {herb.batchId || "—"}</p>
          <p className="mt-2 text-slate-600">{herb.notes || "No notes provided."}</p>

          <div className="mt-4 text-sm text-slate-500">
            <div>Manufacturer: {herb.manufacturer || "—"}</div>
            <div>Origin: {herb.origin || "—"}</div>
            <div>Created at: {createdAt}</div>
          </div>

          <div className="mt-4 flex gap-2">
            {herb.qrDataUrl && (
              <>
                <a href={herb.qrDataUrl} download={`${herb.name}-qr.png`} className="px-3 py-1 border rounded text-sm">Download QR</a>
                <a target="_blank" rel="noreferrer" href={`/herb/${herb.id}`} className="px-3 py-1 border rounded text-sm">Open public page</a>
              </>
            )}
          </div>
        </div>
      </div>

      <section>
        <h4 className="font-semibold">Lab tests</h4>
        <div className="mt-2 space-y-2">
          {herb.labTests && herb.labTests.length ? (
            herb.labTests.map((t, idx) => (
              <div key={idx} className="p-3 rounded border">
                <div className="font-medium">{t.testName}</div>
                <div className="text-sm text-slate-600">Result: {t.result} • Date: {t.date}</div>
              </div>
            ))
          ) : (
            <div className="text-slate-500">No lab tests attached yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function OpenHerbDatabasePage() {
  const [herbs, setHerbs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadHerbs() {
    setLoading(true);
    try {
      const res = await API.get("/api/herbs");
      const list = res.data.herbs || [];
      // Normalize createdAt: keep Firestore timestamps if present
      setHerbs(list);
      if (!selected && list.length) setSelected(list[0]);
    } catch (err) {
      console.error("Failed to load herbs", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHerbs();
    // optional: poll or subscribe, but not required
  }, []);

  function onCreated(newHerb) {
    // Prepend new herb to list and select it
    setHerbs((s) => [newHerb, ...s]);
    setSelected(newHerb);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-extrabold text-emerald-900 mb-2">Open Herb Database</h1>
        <p className="mb-6 text-slate-600">Search, create, and view herbs. Generate QR codes for each herb for traceability.</p>

        {/* Top: create form */}
        <div className="mb-8">
          <QRGeneratorForm onCreated={onCreated} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: list */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Herb database</h3>
              <button onClick={loadHerbs} className="text-sm text-slate-600">Refresh</button>
            </div>

            {loading ? (
              <div className="p-4 bg-white rounded shadow">Loading…</div>
            ) : (
              <div className="max-h-[60vh] overflow-auto">
                <HerbList herbs={herbs} onSelect={setSelected} selectedId={selected?.id} />
              </div>
            )}
          </div>

          {/* Right: details */}
          <div className="lg:col-span-2">
            <HerbDetail herb={selected} />
          </div>
        </div>
      </div>
    </main>
  );
}

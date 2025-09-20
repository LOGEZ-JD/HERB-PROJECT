// src/Pages/Database.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Database() {
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/herbs").then((r) => {
      setHerbs(r.data.herbs || []);
      setLoading(false);
    }).catch((e) => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Herb Database</h1>
      <div className="space-y-4">
        {herbs.map((h) => (
          <div key={h.id} className="bg-white rounded-lg p-4 flex items-center justify-between shadow">
            <div>
              <h3 className="font-semibold">{h.name}</h3>
              <p className="text-sm text-slate-600">Batch: {h.batchId || "—"}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(`/herb/${h.id}`)} className="px-3 py-1 bg-emerald-50 rounded">View</button>
              <a href={h.qrDataUrl} download={`${h.name}-qr.png`} className="px-3 py-1 bg-slate-100 rounded">QR</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

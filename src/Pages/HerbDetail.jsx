// src/Pages/HerbDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function HerbDetail() {
  const { id } = useParams();
  const [herb, setHerb] = useState(null);

  useEffect(() => {
    API.get(`/api/herbs/${id}`).then((r) => setHerb(r.data.herb)).catch((e) => {
      console.error(e);
      setHerb(null);
    });
  }, [id]);

  if (!herb) return <div className="p-6">Loading…</div>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-6">
          <div>
            <img src={herb.qrDataUrl} alt="QR" className="w-48 h-48" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{herb.name}</h1>
            <p className="text-sm text-slate-500">Batch: {herb.batchId}</p>
            <p className="mt-4 text-slate-600">{herb.notes}</p>
            <p className="mt-2 text-slate-500">Manufacturer: {herb.manufacturer || "—"}</p>
            <p className="text-slate-500">Origin: {herb.origin || "—"}</p>
          </div>
        </div>

        <section className="mt-6">
          <h3 className="text-xl font-semibold">Lab Tests</h3>
          <div className="mt-3 space-y-2">
            {herb.labTests && herb.labTests.length ? herb.labTests.map((t, i) => (
              <div key={i} className="p-3 border rounded">
                <div className="font-medium">{t.testName}</div>
                <div className="text-sm text-slate-600">Result: {t.result} — Date: {t.date}</div>
              </div>
            )) : <div className="text-slate-500">No lab tests attached.</div>}
          </div>
        </section>
      </div>
    </main>
  );
}

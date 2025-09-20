// src/Pages/GeoTracking.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";

const demoBatches = [
  {
    id: "ASH-20231026-001",
    name: "Ashwagandha",
    date: "10/26/2023",
    quantity: "150.75 kg",
    gps: "28.613900, 77.209000",
    status: "Collected",
    farmer: "R. Kumar, Organic farm",
  },
  {
    id: "TUR-20231025-002",
    name: "Turmeric",
    date: "10/25/2023",
    quantity: "220.5 kg",
    gps: "20.296100, 85.824500",
    status: "Collected",
    farmer: "P. Sharma, Village cooperative",
  },
];

export default function GeoTracking() {
  const [selected, setSelected] = useState(demoBatches[0]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-emerald-100">
      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <span className="px-4 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
          Real-time Location Tracking
        </span>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-emerald-900 mt-4"
        >
          Geo-Tracking Dashboard
        </motion.h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Track the precise geographical journey of every herb batch from
          collection point to final destination with GPS-enabled transparency.
        </p>
      </section>

      {/* SEARCH & FILTER */}
      <section className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by herb name or batch ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none"
          />
        </div>
        <button className="px-5 py-2 rounded-xl border border-slate-200 bg-white shadow hover:bg-emerald-50 transition">
          Filter by Region
        </button>
        <button className="px-5 py-2 rounded-xl border border-slate-200 bg-white shadow hover:bg-emerald-50 transition flex items-center gap-2">
          <MapPin className="w-4 h-4" /> Map View
        </button>
      </section>

      {/* BATCHES & DETAILS */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* Left: Batches list */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-emerald-800">
            Tracked Herb Batches ({demoBatches.length})
          </h2>
          <div className="space-y-4">
            {demoBatches.map((b) => (
              <motion.div
                key={b.id}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl border shadow cursor-pointer transition ${
                  selected.id === b.id
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-white hover:shadow-md"
                }`}
                onClick={() => setSelected(b)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900">
                      {b.name}
                    </h3>
                    <p className="text-sm text-slate-500">Batch ID: {b.id}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Collection Date: {b.date}
                    </p>
                    <p className="text-sm text-slate-600">GPS: {b.gps}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-md font-semibold text-emerald-800">
                      {b.quantity}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                      {b.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Batch details */}
        {selected && (
          <div className="bg-white rounded-2xl border shadow-lg p-6">
            <h2 className="text-lg font-semibold text-emerald-800 mb-4">
              Batch Details
            </h2>
            <p className="text-sm text-slate-500 mb-1">
              <strong>{selected.name}</strong>
            </p>
            <p className="text-sm text-slate-500 mb-3">ID: {selected.id}</p>

            <ul className="space-y-2 text-slate-700 text-sm">
              <li>
                <strong>Date:</strong> {selected.date}
              </li>
              <li>
                <strong>Quantity:</strong> {selected.quantity}
              </li>
              <li>
                <strong>GPS:</strong> {selected.gps}
              </li>
              <li>
                <strong>Status:</strong> {selected.status}
              </li>
              <li>
                <strong>Farm:</strong> {selected.farmer}
              </li>
            </ul>

            <button className="mt-6 w-full px-5 py-2 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-xl shadow hover:opacity-90 transition">
              Open in Map
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

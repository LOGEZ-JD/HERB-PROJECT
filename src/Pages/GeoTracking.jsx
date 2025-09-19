// src/Pages/GeoTracking.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";   // ✅ import db
import { TRANS } from "../utils/anim";

import SearchBar from "../Components/SearchBar";
import BatchCard from "../Components/BatchCard";
import BatchDetails from "../Components/BatchDetails";
import MapModal from "../Components/MapModal";
import Chatbot from "../Components/Chatbot";

export default function GeoTracking() {
  const [batches, setBatches] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Firestore real-time subscription
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "batches"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBatches(data);
      if (!selected && data.length > 0) setSelected(data[0]);
      setLoading(false);
    });

    return () => unsub(); // cleanup
  }, [selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return batches;
    return batches.filter(
      (b) => b.name?.toLowerCase().includes(q) || b.id?.toLowerCase().includes(q)
    );
  }, [batches, query]);

  function openMapFor(batch) {
    setSelected(batch);
    setMapOpen(true);
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--page-gradient)" }}>
      {/* Page hero */}
      <section style={{ background: "var(--hero-gradient)" }}>
        <div className="center-max py-16 lg:py-20 text-center">
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={TRANS.fade(0)}
          >
            <div className="inline-flex items-center gap-3 bg-white/70 px-4 py-1 rounded-full text-sm text-emerald-800 shadow-sm">
              Real-time Location Tracking
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold" style={{ color: "var(--heading)" }}>
              Geo-Tracking Dashboard
            </h1>
            <p className="mt-4 text-slate-700 max-w-2xl mx-auto">
              Track herb batches from collection to delivery — powered by real-time Firestore updates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="center-max py-10">
        {/* Search + filters */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={TRANS.fade(0.02)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <SearchBar value={query} onChange={(v) => setQuery(v)} placeholder="Search by herb name or batch ID..." />
            </div>
            <div className="flex items-center gap-3 justify-end lg:justify-start">
              <button className="btn-outline">Filter by Region</button>
              <button className="btn-outline" onClick={() => setMapOpen(true)}>Map View</button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Batch list */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: "var(--heading)" }}>
              Tracked Herb Batches ({filtered.length})
            </h3>

            <div className="space-y-6">
              {loading && <div className="card p-6">Loading batches...</div>}
              {!loading && filtered.length === 0 && <div className="card p-6">No results found</div>}

              {filtered.map((b, i) => (
                <BatchCard
                  key={b.id}
                  index={i}
                  batch={b}
                  onSelect={() => setSelected(b)}
                  onMap={() => openMapFor(b)}
                  isSelected={selected?.id === b.id}
                />
              ))}
            </div>
          </div>

          {/* Sidebar details */}
          <aside>
            <div className="card p-6">
              <h4 className="text-xl font-semibold" style={{ color: "var(--heading)" }}>Batch Details</h4>
              <div className="mt-4">
                {selected ? (
                  <BatchDetails batch={selected} onOpenMap={() => openMapFor(selected)} />
                ) : (
                  <p className="text-sm text-slate-500">Select a batch to see details</p>
                )}
              </div>
              {selected && (
                <div className="mt-6 flex gap-3">
                  <button className="btn-cta" onClick={() => openMapFor(selected)}>Open in Map</button>
                  <a
                    className="btn-outline"
                    href={`https://www.google.com/maps/search/?api=1&query=${selected?.coords?.lat},${selected?.coords?.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Google Maps
                  </a>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Global extras */}
      <Chatbot />
      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} batch={selected} />
    </div>
  );
}

import React, { useState, useMemo } from "react";
import SearchBar from "../Components/SearchBar";
import BatchCard from "../Components/BatchCard";
import BatchDetails from "../Components/BatchDetails";
import MapModal from "../Components/MapModal";
import Chatbot from "../Components/Chatbot";

/**
 * Demo data — replace with Firestore/API fetch
 */
const SAMPLE_BATCHES = [
  {
    id: "ASH-20231026-001",
    name: "Ashwagandha",
    collectionDate: "10/26/2023",
    coords: { lat: 28.6139, lng: 77.2090 },
    quantity: "150.75 kg",
    status: "Collected",
    statusColor: "bg-emerald-700",
    image: "https://images.unsplash.com/photo-1547516508-4d5ab9d3b5d4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
    notes: "Farm: R. Kumar, Organic farm."
  },
  {
    id: "TUR-20231025-002",
    name: "Turmeric",
    collectionDate: "10/25/2023",
    coords: { lat: 20.2961, lng: 85.8245 },
    quantity: "220.5 kg",
    status: "Processed",
    statusColor: "bg-gray-500",
    image: "https://images.unsplash.com/photo-1506801310323-534be5e7c12b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
    notes: "Quality: Grade A."
  },
  {
    id: "BRA-20231024-003",
    name: "Brahmi",
    collectionDate: "10/24/2023",
    coords: { lat: 12.9716, lng: 77.5946 },
    quantity: "85.2 kg",
    status: "Quality Checked",
    statusColor: "bg-indigo-600",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
    notes: "Lab: Green Labs — pH good."
  },
  // add more items as needed...
];

export default function GeoTracking() {
  const [batches] = useState(SAMPLE_BATCHES);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(batches[0] || null);
  const [mapOpen, setMapOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return batches;
    return batches.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
    );
  }, [batches, query]);

  function openMapFor(batch) {
    setSelected(batch);
    setMapOpen(true);
  }

  return (
    <div className="min-h-screen bg-emerald-50 text-slate-900">
      {/* Hero */}
      <header className="bg-emerald-100/60 border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-3 bg-emerald-50/40 px-4 py-1 rounded-full text-sm text-emerald-800">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M12 2c2 1.7 4 4 4 8 0 4.5-4 9-4 9s-4-4.5-4-9c0-4 .9-6.3 4-8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Real-time Location Tracking
          </div>

          <h1 className="mt-6 text-5xl font-extrabold text-emerald-900">Geo-Tracking Dashboard</h1>
          <p className="mt-4 text-slate-700 max-w-3xl mx-auto">
            Track the precise geographical journey of every herb batch from collection point to final destination with GPS-enabled transparency.
          </p>
        </div>
      </header>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search by herb name or batch ID..."
              value={query}
              onChange={(v) => setQuery(v)}
            />
          </div>

          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-md border bg-white text-emerald-700 shadow-sm hover:bg-emerald-50"
              onClick={() => alert("Filter by Region - implement your filter UI")}
            >
              Filter by Region
            </button>

            <button
              className="px-4 py-2 rounded-md border bg-white text-emerald-700 shadow-sm hover:bg-emerald-50 flex items-center gap-2"
              onClick={() => setMapOpen(true)}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M3 10.5l7-3 7 3v7l-7 3-7-3v-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Map View
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - list */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-semibold text-emerald-900">Tracked Herb Batches ({filtered.length})</h3>

          <div className="space-y-6">
            {filtered.map((b) => (
              <BatchCard
                key={b.id}
                batch={b}
                onSelect={() => setSelected(b)}
                onMap={() => openMapFor(b)}
                isSelected={selected?.id === b.id}
              />
            ))}
            {filtered.length === 0 && (
              <div className="text-sm text-slate-600 bg-white p-6 rounded-lg shadow">No results</div>
            )}
          </div>
        </div>

        {/* Right column - details */}
        <aside className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-2xl font-semibold text-emerald-900">Batch Details</h3>
          <div className="mt-4">
            <BatchDetails batch={selected} onOpenMap={() => openMapFor(selected)} />
          </div>
        </aside>
      </div>

      {/* floating chat */}
      <Chatbot />

      {/* Map Modal */}
      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} batch={selected} />
    </div>
  );
}

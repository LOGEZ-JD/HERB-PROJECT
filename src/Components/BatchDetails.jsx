// src/Components/BatchDetails.jsx
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // make sure db is exported from src/firebase.js

export default function BatchDetails({ batch, onOpenMap }) {
  const [live, setLive] = useState(null);
  const [loading, setLoading] = useState(false);

  // subscribe to the Firestore doc for this batch when batch.id is available
  useEffect(() => {
    if (!batch || !batch.id) {
      setLive(null);
      return;
    }

    setLoading(true);
    const ref = doc(db, "batches", batch.id);
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setLive({ id: snapshot.id, ...snapshot.data() });
        } else {
          setLive(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Batch onSnapshot error:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [batch?.id]);

  // If we don't have a live doc (e.g. batch has no id yet), use the prop as fallback
  const data = live ?? batch;

  // Helper to update status quickly
  const updateStatus = useCallback(
    async (newStatus) => {
      if (!data?.id) {
        alert("Cannot update status: no batch id (document may not be saved yet).");
        return;
      }
      try {
        const ref = doc(db, "batches", data.id);
        await updateDoc(ref, { status: newStatus, updatedAt: new Date() });
        // onSnapshot will receive update and refresh UI
      } catch (err) {
        console.error("Failed to update status:", err);
        alert("Update failed: " + (err.message || err));
      }
    },
    [data?.id]
  );

  if (!data) {
    return (
      <div className="text-slate-600 italic text-center py-6">
        {loading ? "Loading batch..." : "Select a Batch to view details"}
      </div>
    );
  }

  // Safe accessors
  const coords = data.coords ?? { lat: 0, lng: 0 };

  return (
    <motion.div
      className="p-6 rounded-2xl shadow-md border bg-gradient-to-br from-white to-emerald-50"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "linear" }}
    >
      <div className="flex items-center gap-4">
        <img
          src={data.image ?? "/assets/placeholder.jpg"}
          alt={data.name ?? "Batch image"}
          className="w-28 h-20 object-cover rounded-lg shadow-sm"
        />
        <div>
          <h4 className="text-xl font-semibold text-emerald-900">{data.name}</h4>
          <div className="text-sm text-slate-500">
            Batch ID: <span className="text-slate-700 font-medium">{data.id ?? "-"}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-slate-500">Collection Date</div>
          <div className="font-medium text-slate-800">{data.collectionDate ?? "—"}</div>
        </div>
        <div>
          <div className="text-slate-500">Quantity</div>
          <div className="font-medium text-slate-800">{data.quantity ?? "—"}</div>
        </div>

        <div>
          <div className="text-slate-500">GPS Coordinates</div>
          <div className="font-medium text-slate-800">
            {Number(coords.lat).toFixed(6)}, {Number(coords.lng).toFixed(6)}
          </div>
        </div>
        <div>
          <div className="text-slate-500">Status</div>
          <div
            className={`inline-block px-2 py-1 text-xs rounded-full ${
              data.status === "Collected"
                ? "bg-emerald-100 text-emerald-700"
                : data.status === "Shipped"
                ? "bg-blue-100 text-blue-700"
                : data.status === "Processed"
                ? "bg-gray-100 text-gray-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {data.status ?? "Unknown"}
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="mt-4 text-sm text-slate-600 italic">{data.notes}</div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => onOpenMap?.()}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-emerald-500 text-white rounded-md shadow hover:scale-[1.02] transition"
        >
          Open in Map
        </button>

        <a
          className="px-4 py-2 border rounded-md text-emerald-700 bg-white hover:bg-emerald-50 transition"
          href={`https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`}
          target="_blank"
          rel="noreferrer"
        >
          Open Google Maps
        </a>

        {/* Quick status buttons for testing / admin */}
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => updateStatus("Processed")}
            className="px-3 py-1 rounded-md bg-slate-100 text-slate-800 text-sm hover:bg-slate-200 transition"
            title="Mark as Processed"
          >
            Mark Processed
          </button>
          <button
            onClick={() => updateStatus("Shipped")}
            className="px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-sm hover:bg-blue-200 transition"
            title="Mark as Shipped"
          >
            Mark Shipped
          </button>
          <button
            onClick={() => updateStatus("Collected")}
            className="px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-sm hover:bg-emerald-200 transition"
            title="Mark Collected"
          >
            Mark Collected
          </button>
        </div>
      </div>
    </motion.div>
  );
}

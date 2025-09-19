// src/Components/BatchCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function BatchCard({ batch, onSelect, onMap, isSelected, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: "linear" }}
      onClick={onSelect}
      className={`flex items-center gap-6 bg-white p-6 rounded-xl border ${
        isSelected ? "ring-2 ring-emerald-200" : "border-transparent"
      } shadow-sm`}
    >
      <img src={batch.image} alt={batch.name} className="w-24 h-24 object-cover rounded-lg" />

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold text-emerald-900">{batch.name}</h4>
            <div className="text-sm text-slate-500">
              Batch ID: <span className="text-slate-600">{batch.id}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-slate-500">Quantity</div>
            <div className="font-medium text-slate-700">{batch.quantity}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-500">
          <div>
            <div>Collection Date</div>
            <div className="text-slate-700">{batch.collectionDate}</div>
          </div>
          <div>
            <div>GPS Coordinates</div>
            <div className="text-slate-700">{batch.coords.lat.toFixed(6)}, {batch.coords.lng.toFixed(6)}</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onMap?.(); }}
            className="text-sm bg-white border px-3 py-2 rounded-md inline-flex items-center gap-2"
          >
            View Details
          </button>

          <div className={`ml-auto text-sm px-3 py-1 rounded-md text-white ${batch.statusColor || "bg-emerald-700"}`}>
            {batch.status}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

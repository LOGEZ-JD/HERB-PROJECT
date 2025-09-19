import React from "react";

export default function MapModal({ open, onClose, batch }) {
  if (!open) return null;

  // default coords
  const lat = batch?.coords?.lat ?? 20.2961;
  const lng = batch?.coords?.lng ?? 85.8245;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=12`;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-4xl h-[70vh]" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between p-3 border-b">
          <div className="text-sm font-semibold">Map Preview</div>
          <button onClick={onClose} className="px-3 py-1 rounded bg-emerald-50">Close</button>
        </div>
        <iframe
          title="map"
          src={mapsUrl}
          className="w-full h-full border-0"
          allowFullScreen
        />
      </div>
    </div>
  );
}

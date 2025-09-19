// src/Pages/Database.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { listenToBatches } from "../lib/firestoreBatchApi";
import { AlertTriangle } from "lucide-react";

export default function Database() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = listenToBatches(
      async (data) => {
        try {
          const batchesWithQR = await Promise.all(
            data.map(async (batch) => {
              const qrDataUrl = await QRCode.toDataURL(
                JSON.stringify({ id: batch.id, name: batch.name })
              );
              return { ...batch, qrDataUrl };
            })
          );
          setBatches(batchesWithQR);
        } catch (err) {
          console.error("Error generating QR codes:", err);
          setError("Failed to generate QR codes for database entries.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Could not connect to the database. Please check your connection and try again.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading database...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg max-w-md mx-auto">
        <AlertTriangle className="mx-auto w-12 h-12 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Herb Database</h1>
      <div className="space-y-4">
        {batches.map((b) => (
          <div key={b.id} className="bg-white rounded-lg p-4 flex items-center justify-between shadow">
            <div>
              <h3 className="font-semibold">{b.name}</h3>
              <p className="text-sm text-slate-600">Batch ID: {b.id}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(`/batch/${b.id}`)} className="px-3 py-1 bg-emerald-50 rounded">View Details</button>
              <a href={b.qrDataUrl} download={`${b.name}-qr.png`} className="px-3 py-1 bg-slate-100 rounded">Download QR</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

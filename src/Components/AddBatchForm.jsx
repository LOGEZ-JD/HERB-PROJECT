// src/Components/AddBatchForm.jsx
import React, { useState } from "react";
import { addBatch } from "../lib/firestoreBatchApi";
import { auth } from "../firebase";

export default function AddBatchForm({ onCreated }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addBatch({
        name,
        collectionDate: new Date().toISOString().split("T")[0],
        coords: { lat: parseFloat(lat) || 0, lng: parseFloat(lng) || 0 },
        quantity: qty || "0 kg",
        status: "Collected",
        image: "/assets/placeholder.jpg",
        notes: "Created via demo form",
        ownerUid: user?.uid ?? null
      });
      setName(""); setQty(""); setLat(""); setLng("");
      onCreated?.(docRef.id);
    } catch (err) {
      console.error("Add batch failed", err);
      alert("Add failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 space-y-3">
      <div className="flex gap-2">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Herb name" className="flex-1 p-2 border rounded" />
        <input value={qty} onChange={(e)=>setQty(e.target.value)} placeholder="Qty (e.g. 100 kg)" className="w-40 p-2 border rounded" />
      </div>

      <div className="flex gap-2">
        <input value={lat} onChange={(e)=>setLat(e.target.value)} placeholder="lat" className="p-2 w-1/2 border rounded" />
        <input value={lng} onChange={(e)=>setLng(e.target.value)} placeholder="lng" className="p-2 w-1/2 border rounded" />
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="btn-cta">{loading ? "Adding..." : "Add batch"}</button>
        <button type="button" onClick={()=>{setName("");setQty("");setLat("");setLng("");}} className="btn-outline">Reset</button>
      </div>
    </form>
  );
}

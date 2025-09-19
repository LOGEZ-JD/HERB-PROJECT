// src/Pages/HerbDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHerb, addEvent, addLabReport } from "../api";

export default function HerbDetail() {
  const { id } = useParams();
  const [herb, setHerb] = useState(null);
  const [events, setEvents] = useState([]);
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventForm, setEventForm] = useState({ type: "collected", note: "", location: "" });
  const [labForm, setLabForm] = useState({ labName: "", result: "", reportUrl: "", notes: "" });

  async function fetch() {
    setLoading(true);
    try {
      const res = await getHerb(id);
      setHerb(res.herb || null);
      setEvents(res.events || []);
      setLabs(res.labs || []);
    } catch (err) {
      console.error("Failed to load herb:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleAddEvent(e) {
    e.preventDefault();
    try {
      const ev = await addEvent(id, { type: eventForm.type, note: eventForm.note, location: eventForm.location });
      // push to UI
      setEvents((s) => [ev, ...s]);
      setEventForm({ type: "collected", note: "", location: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add event");
    }
  }

  async function handleAddLab(e) {
    e.preventDefault();
    try {
      const lab = await addLabReport(id, {
        labName: labForm.labName,
        result: labForm.result,
        reportUrl: labForm.reportUrl,
        notes: labForm.notes,
      });
      setLabs((s) => [lab, ...s]);
      setLabForm({ labName: "", result: "", reportUrl: "", notes: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add lab report");
    }
  }

  if (!herb && loading) return <div className="p-6">Loading...</div>;
  if (!herb) return <main className="p-8"><div className="max-w-4xl mx-auto text-center">Herb not found.</div></main>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50 p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 bg-white rounded-2xl border">
            <div className="flex gap-6 items-start">
              <img src={herb.qrDataUrl} alt="QR" className="w-36 h-36 object-cover rounded" />
              <div>
                <h1 className="text-2xl font-bold text-emerald-900">{herb.name}</h1>
                <div className="text-sm text-slate-500 mt-1">Batch: {herb.batchId || "—"}</div>
                <div className="mt-3 text-slate-600">{herb.notes}</div>
                <div className="mt-3 text-xs text-slate-400">
                  Manufacturer: {herb.manufacturer || "—"} • Origin: {herb.origin || "—"}
                </div>
                <div className="mt-2 text-xs text-slate-400">Created: {herb.createdAt || "—"}</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border">
            <h3 className="font-semibold mb-3">Trace events</h3>
            <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <select value={eventForm.type} onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })} className="p-2 border rounded">
                <option value="collected">Collected</option>
                <option value="transit">Transit</option>
                <option value="processed">Processed</option>
                <option value="verified">Verified</option>
                <option value="other">Other</option>
              </select>
              <input placeholder="Note" value={eventForm.note} onChange={(e) => setEventForm({ ...eventForm, note: e.target.value })} className="p-2 border rounded" />
              <input placeholder="Location (lat,lng)" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="p-2 border rounded" />
              <div className="md:col-span-3">
                <button className="px-4 py-2 bg-emerald-700 text-white rounded">Add event</button>
              </div>
            </form>

            <div className="space-y-3">
              {events.length === 0 && <div className="text-sm text-slate-500">No events yet.</div>}
              {events.map((ev) => (
                <div key={ev.id} className="p-3 rounded border bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{ev.type}</div>
                      <div className="text-sm text-slate-600">{ev.note}</div>
                    </div>
                    <div className="text-xs text-slate-400">{ev.createdAt ? new Date(ev.createdAt).toLocaleString() : ""}</div>
                  </div>
                  {ev.location && <div className="text-xs text-slate-400 mt-2">Location: {ev.location}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border">
            <h3 className="font-semibold mb-3">Lab reports</h3>

            <form onSubmit={handleAddLab} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input placeholder="Lab name" value={labForm.labName} onChange={(e) => setLabForm({ ...labForm, labName: e.target.value })} className="p-2 border rounded" />
              <input placeholder="Result summary" value={labForm.result} onChange={(e) => setLabForm({ ...labForm, result: e.target.value })} className="p-2 border rounded" />
              <input placeholder="Report URL" value={labForm.reportUrl} onChange={(e) => setLabForm({ ...labForm, reportUrl: e.target.value })} className="p-2 border rounded md:col-span-2" />
              <textarea placeholder="Notes" value={labForm.notes} onChange={(e) => setLabForm({ ...labForm, notes: e.target.value })} className="p-2 border rounded md:col-span-2" />
              <div>
                <button className="px-4 py-2 bg-emerald-700 text-white rounded">Attach lab report</button>
              </div>
            </form>

            <div className="space-y-3">
              {labs.length === 0 && <div className="text-sm text-slate-500">No lab reports yet.</div>}
              {labs.map((l) => (
                <div key={l.id} className="p-3 rounded border bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{l.labName || "Lab report"}</div>
                      <div className="text-sm text-slate-600">{l.result}</div>
                    </div>
                    <div className="text-xs text-slate-400">{l.createdAt ? new Date(l.createdAt).toLocaleString() : ""}</div>
                  </div>
                  {l.reportUrl && (
                    <div className="mt-2">
                      <a className="text-emerald-700 underline" href={l.reportUrl} target="_blank" rel="noreferrer">
                        Open report
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-6 bg-white rounded-2xl border text-center">
            <h4 className="font-semibold mb-3">QR / Public link</h4>
            <img src={herb.qrDataUrl} alt="qr" className="mx-auto w-48 h-48" />
            <div className="text-sm text-slate-500 mt-3 break-words">{`${window.location.origin}/herb/${id}`}</div>
          </div>

          <div className="p-6 bg-white rounded-2xl border">
            <h4 className="font-semibold mb-2">Quick info</h4>
            <div className="text-sm text-slate-600">Manufacturer: {herb.manufacturer || "—"}</div>
            <div className="text-sm text-slate-600">Origin: {herb.origin || "—"}</div>
            <div className="text-sm text-slate-600">Batch ID: {herb.batchId || "—"}</div>
          </div>
        </aside>
      </div>
    </main>
  );
}

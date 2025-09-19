// src/Pages/Dashboard.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Database, Clock, Download, QrCode, Activity, Layers, AlertTriangle } from "lucide-react";
import { listenToBatches } from "../lib/firestoreBatchApi";

/**
 * Small utilities
 */
function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

function timeSince(date) {
  if (!date) return "";
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "m";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m";
  return Math.floor(seconds) + "s";
}


/**
 * Simple inline sparkline (no external libs)
 * Accepts array of numbers between 0..max
 */
function Sparkline({ data = [], stroke = "#7c3aed", width = 120, height = 36 }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = max === min ? height / 2 : height - ((v - min) / (max - min)) * height;
    return `${x},${y}`;
  });
  const path = `M${points.join(" L ")}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="inline-block">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.14" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${path} L ${width},${height} L 0,${height} Z`} fill="url(#g1)" stroke="none" opacity="0.8" />
    </svg>
  );
}

/**
 * Reusable stat card
 */
function StatCard({ title, value, delta, sparkData, icon }) {
  const deltaPositive = delta && delta > 0;
  return (
    <motion.div
      whileHover={{ translateY: -6 }}
      className="card p-5 rounded-2xl border bg-white flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
            {icon}
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-medium">{title}</div>
            <div className="text-2xl font-extrabold text-slate-900">{value}</div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className={`text-sm font-medium ${deltaPositive ? "text-emerald-700" : "text-rose-600"}`}>
            {delta ? `${deltaPositive ? "▲" : "▼"} ${Math.abs(delta)}%` : ""}
          </div>
          <div className="mt-2 invisible">{/* spacing */}</div>
        </div>
      </div>

      <div className="mt-1">
        <Sparkline data={sparkData} />
      </div>
    </motion.div>
  );
}

/**
 * Timeline item
 */
function TimelineItem({ icon, title, subtitle, time }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <div className="font-semibold text-slate-800">{title}</div>
        <div className="text-sm text-slate-500">{subtitle}</div>
      </div>
      <div className="text-xs text-slate-400">{time}</div>
    </div>
  );
}

/**
 * Main dashboard page
 */
export default function Dashboard() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = listenToBatches(
      (data) => {
        setBatches(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Could not connect to the database. Please check your connection and try again.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const stats = useMemo(() => {
    const totalBatches = batches.length;
    const verifiedBatches = batches.filter(b => b.status === 'Verified').length;
    // dummy data for now
    const traceEvents = totalBatches * 10; 

    return [
      { title: "Trace Events", value: formatNumber(traceEvents), delta: 4.2, spark: [4, 5, 7, 8, 9, 8, 10], icon: <Activity /> },
      { title: "Verified", value: formatNumber(verifiedBatches), delta: 1.8, spark: [6, 6, 7, 7, 6, 7, 8], icon: <CheckCircle /> },
      { title: "Batches", value: formatNumber(totalBatches), delta: -0.5, spark: [2, 3, 4, 3, 5, 4, 4], icon: <Database /> },
    ]
  }, [batches]);

  const recentEvents = useMemo(() => {
    return batches.slice(0, 3).map(b => ({
      id: b.id,
      title: `${b.name} - ${b.status}`,
      subtitle: b.notes,
      time: timeSince(b.createdAt?.toDate())
    }))
  }, [batches]);

  const recentSummary = useMemo(() => {
    return batches.slice(0, 2).map(b => ({
      id: b.id,
      title: `${b.id.substring(0,6)}... - ${b.name}`,
      meta: b.status,
      date: b.collectionDate,
    }))
  }, [batches]);

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg max-w-md mx-auto">
        <AlertTriangle className="mx-auto w-12 h-12 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Connection Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Overview of trace events, batches and blockchain operations.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg border bg-white text-slate-700 hover:shadow">Export CSV</button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-emerald-500 text-white shadow flex items-center gap-2">
              <QrCode className="w-4 h-4" /> Generate QR
            </button>
          </div>
        </div>

        {/* stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <StatCard key={i} title={s.title} value={s.value} delta={s.delta} sparkData={s.spark} icon={s.icon} />
          ))}
        </div>

        {/* main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* recent events / timeline (left) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Recent Events</h3>
                <div className="text-sm text-slate-400">Live feed</div>
              </div>

              <div className="space-y-3">
                {recentEvents.map((ev) => (
                  <motion.div key={ev.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ev.id * 0.06 }} className="rounded-lg border p-3 bg-white">
                    <TimelineItem icon={<Clock />} title={ev.title} subtitle={ev.subtitle} time={ev.time} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* quick actions + blockchain status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6 rounded-2xl">
                <h4 className="font-semibold mb-3">Quick actions</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 rounded-lg border hover:bg-emerald-50">Create Batch</button>
                  <button className="px-4 py-2 rounded-lg border hover:bg-emerald-50">Attach Lab Result</button>
                  <button className="px-4 py-2 rounded-lg border hover:bg-emerald-50">Tag Location</button>
                  <button className="px-4 py-2 rounded-lg border hover:bg-emerald-50">Request Verification</button>
                </div>
                <p className="mt-4 text-sm text-slate-500">Pro tip: use quick actions to speed up trace recording during harvest season.</p>
              </div>

              <div className="card p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Blockchain Status</h4>
                  <div className="text-xs text-slate-400">live</div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">Tx in mempool</div>
                      <div className="text-xl font-bold text-slate-900">23</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500">Confirmed today</div>
                      <div className="text-xl font-bold text-emerald-700">3</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="h-3 w-full bg-slate-100 rounded-lg overflow-hidden">
                      <div style={{ width: "68%" }} className="h-full bg-emerald-300" />
                    </div>
                    <div className="text-xs text-slate-400 mt-2">Node sync: 68%</div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700">Monitor</button>
                    <button className="px-3 py-1 rounded-md border">View logs</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right column: summary */}
          <aside className="space-y-6">
            <div className="card p-6 rounded-2xl">
              <h4 className="font-semibold">Recent Summary</h4>
              <div className="mt-4 space-y-3">
                {recentSummary.map((s) => (
                  <motion.div key={s.id} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25 }} className="rounded-lg border p-3 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
                        <CheckCircle />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{s.title}</div>
                        <div className="text-sm text-slate-500">{s.meta}</div>
                      </div>
                      <div className="text-xs text-slate-400">{s.date}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="card p-6 rounded-2xl">
              <h4 className="font-semibold">Actions</h4>
              <div className="mt-4 flex flex-col gap-3">
                <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-emerald-500 text-white flex items-center justify-center gap-2">
                  <QrCode /> Generate Batch QR
                </button>
                <button className="w-full px-4 py-2 rounded-lg border text-slate-700 flex items-center justify-center gap-2">
                  <Download /> Export Report
                </button>
                <button className="w-full px-4 py-2 rounded-lg border text-slate-700 flex items-center justify-center gap-2">
                  <Layers /> Manage Contracts
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// src/Pages/FeaturesPage.jsx
import React from "react";
import { motion } from "framer-motion";
import Features from "../Components/Features";
import { TRANS } from "../utils/anim";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="w-full"
        style={{
          background: "linear-gradient(180deg, #e8fff4 0%, #f0f9ff 50%, #fbfbff 100%)",
        }}
      >
        <div className="center-max py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ x: -36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={TRANS.leftIn(0.04)}
          >
            <div className="inline-flex items-center gap-3 bg-white/70 px-4 py-1 rounded-full text-sm text-emerald-800 shadow-sm">
              Core platform features
            </div>

            <motion.h1
              style={{ color: "#12355B" }}
              className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
              initial={{ x: -18, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={TRANS.leftIn(0.12)}
            >
              Built for Traceability, Trust & Scale
            </motion.h1>

            <motion.p
              className="mt-6 text-slate-700 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={TRANS.fade(0.18)}
            >
              A unified system for herb traceability — immutable provenance, real-time geolocation, lab verification and
              community-driven metadata. Designed for growers, processors and quality labs.
            </motion.p>

            <motion.div
              className="mt-8 flex gap-4"
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={TRANS.leftIn(0.24)}
            >
              <a className="btn-cta" href="#features">Explore features</a>
              <a className="btn-outline" href="/register">Get started</a>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ x: 36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={TRANS.rightIn(0.06)}
          >
            <div className="card overflow-hidden" style={{ borderRadius: 18 }}>
              <img
                src="/assets/hero-features.jpg"
                alt="Herb features"
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-slate-500">Platform • Highlights</div>
                    <div className="font-semibold text-slate-800">Under the hood</div>
                  </div>
                  <div className="text-xs text-slate-400">Overview</div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={TRANS.fade(0.48)}
              className="absolute -bottom-6 left-8 card px-3 py-2"
              style={{ borderRadius: 10 }}
            >
              <div className="text-xs text-slate-500">Featured</div>
              <div className="text-sm font-semibold">Open Herb Database</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <main className="center-max py-14">
        <Features />
      </main>

      {/* Highlights Section */}
      <section className="center-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Open Herb Database", text: "Search by name, properties, region, and more.", icon: "📚" },
            { title: "Geo Collation", text: "Pin exact harvest coordinates and local conditions.", icon: "📍" },
            { title: "Community", text: "Grower profiles, certifications and ratings.", icon: "👥" },
          ].map((it, i) => (
            <motion.div
              className="card p-6"
              key={i}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={TRANS.fade(i * 0.06)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-emerald-600">
                  <span style={{ fontSize: 20 }}>{it.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold" style={{ color: "#12355B" }}>{it.title}</h4>
                  <p className="text-sm text-slate-600 mt-2">{it.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="center-max py-12">
        <motion.div
          className="card p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={TRANS.fade(0.06)}
        >
          <div>
            <h3 className="text-xl font-bold" style={{ color: "#12355B" }}>
              Ready to bring transparency to your supply chain?
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Start tracking harvests, tests, and shipments today.
            </p>
          </div>

          <div className="flex gap-4">
            <a className="btn-cta" href="/register">Get started</a>
            <a className="btn-outline" href="/geo-tracking">View Geo Dashboard</a>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

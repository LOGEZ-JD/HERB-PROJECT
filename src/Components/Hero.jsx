// src/Components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { TRANS } from "../utils/anim";

// recommended: place the file at public/assets/Acalypha-indica.jpg
const heroImage = "Acalypha indica.jpg";

export default function Hero() {
  return (
    <section
      className="w-full"
      style={{
        // refined soft linear gradient: mint -> pale-lavender -> near-white
        background: "linear-gradient(180deg, #e8fff4 0%, #f0f9ff 48%, #fbfbff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* left: text block slides in from left */}
          <motion.div
            initial={{ x: -36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={TRANS.leftIn(0.02)}
          >
            <span className="inline-flex items-center gap-3 bg-white/70 px-4 py-1 rounded-full text-sm text-emerald-800 shadow-sm">
              Real-time Location Tracking
            </span>

            <motion.h1
              // main heading uses a deep blue-teal instead of plain green
              style={{ color: "#12355B" }}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={TRANS.leftIn(0.08)}
              className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Geo-Tracking Dashboard
            </motion.h1>

            <motion.p
              className="mt-6 text-slate-700 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={TRANS.fade(0.12)}
            >
              Track the precise geographical journey of every herb batch from collection point to final destination with GPS-enabled transparency.
            </motion.p>

            <motion.div
              className="mt-8 flex gap-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={TRANS.leftIn(0.22)}
            >
              <a
                href="#get-started"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-emerald-400 text-white px-5 py-3 rounded-full shadow-md"
              >
                Get started
              </a>

              <a
                href="#features"
                className="inline-flex items-center gap-2 border px-5 py-3 rounded-full bg-white text-slate-700"
              >
                Explore features
              </a>
            </motion.div>

            <div className="mt-6 text-xs text-slate-500">Accessible, mobile-friendly experience. Animations use linear timing.</div>
          </motion.div>

          {/* right: image slides in from right */}
          <motion.div
            initial={{ x: 36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={TRANS.rightIn(0.06)}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ borderRadius: 20 }}>
              <img src={heroImage} alt="Herb" className="w-full h-72 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-500">Herb Track • Smart recognition</div>
                    <div className="font-semibold text-slate-800">Image-based identification + QR</div>
                  </div>
                  <div className="text-xs text-slate-400">Demo</div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={TRANS.fade(0.46)}
              className="absolute -bottom-6 left-8 bg-white rounded-xl border px-4 py-3 shadow"
            >
              <div className="text-xs text-slate-500">Featured</div>
              <div className="text-sm font-semibold">Demo batch</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

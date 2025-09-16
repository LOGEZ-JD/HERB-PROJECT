// src/App.jsx
import React from "react";
import { motion } from "framer-motion";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import FeaturesGrid from "./Components/FeaturesGrid";
import Herbtrack from "./Components/Herbtrack";
import HowItWorks from "./Components/HowItWorks";
import HerbsDatabase from "./Components/HerbsDatabase";
import Slideshow from "./Components/Slideshow";
import Chatbot from "./Components/Chatbot";

/**
 * App = Landing page container
 * Keeps Navbar persistent and composes landing sections.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-emerald-50 to-white text-slate-900">
      <Navbar />

      <main className="flex-1">
        {/* Hero with subtle entrance */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.section>

        {/* Features grid (staggered container) */}
        <section className="max-w-7xl mx-auto px-6 mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <FeaturesGrid />
          </motion.div>
        </section>

        {/* Herb track */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Herbtrack />
        </motion.section>

        {/* How it works */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <HowItWorks />
        </motion.section>

        {/* Database & slideshow */}
        <section className="mt-12">
          <HerbsDatabase />
        </section>

        <section className="mt-8">
          <Slideshow />
        </section>

        {/* Chatbot floating action */}
        <Chatbot />

        {/* spacer to avoid overlap with floating elements */}
        <div className="h-28" />
      </main>

      <footer className="w-full py-6 text-center text-sm text-slate-600 border-t bg-white/30 backdrop-blur-sm">
        © {new Date().getFullYear()} HerbTrack • Crafted with React & Tailwind
      </footer>
    </div>
  );
}

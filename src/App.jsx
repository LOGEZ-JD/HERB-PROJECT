// src/App.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import FeaturesGrid from "./Components/FeaturesGrid";
import Herbtrack from "./Components/Herbtrack";
import HowItWorks from "./Components/HowItWorks";
import HerbsDatabase from "./Components/HerbsDatabase";
import Slideshow from "./Components/Slideshow";
import Chatbot from "./Components/Chatbot";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-emerald-50 to-white text-slate-900">
      <Navbar user={user} />

      <main className="flex-1">
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Hero theme="vibrant" />
        </motion.section>

        <section className="max-w-7xl mx-auto px-6">
          <motion.div
            className="mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14 } },
            }}
          >
            {typeof Features === "function" ? <Features /> : null}
            <FeaturesGrid />
          </motion.div>
        </section>

        <motion.section
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Herbtrack />
        </motion.section>

        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <HowItWorks />
        </motion.section>

        <section className="mt-12">
          <HerbsDatabase />
        </section>

        <section className="mt-8">
          <Slideshow />
        </section>

        <Chatbot />

        <div className="h-28" />
      </main>

      <footer className="w-full py-6 text-center text-sm text-slate-600 border-t">
        © {new Date().getFullYear()} HerbTrack • Crafted with care ✨
      </footer>
    </div>
  );
}

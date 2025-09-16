// src/Components/Hero.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero({ theme = "vibrant" }) {
  const navigate = useNavigate();

  return (
    <header className="relative overflow-hidden">
      {/* decorative gradient wave */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-100 via-emerald-50 to-white opacity-90" />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col-reverse md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Complete Supply Chain Transparency
          </h2>

          <p className="mt-4 text-slate-600 max-w-xl">
            From seed to shelf — a tamper-evident ledger for herbs combined with smart
            recognition and community-driven data.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 12px 30px rgba(124,58,237,0.18)" }}
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-full font-semibold shadow-md"
            >
              Get started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
              className="px-5 py-3 rounded-full border border-slate-200 bg-white/70"
            >
              Explore features
            </motion.button>
          </div>

          <p className="mt-6 text-xs text-slate-500">Accessible, mobile-friendly experience. Animations respect prefers-reduced-motion.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-80 h-56 md:w-[520px] md:h-[330px] rounded-3xl overflow-hidden shadow-2xl transform-gpu hover:scale-[1.02] transition">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
              alt="herbs"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-60 transition duration-400" />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-4 py-2 rounded-2xl shadow">
              <div className="text-sm font-semibold text-slate-900">Herb Track • Smart recognition</div>
              <div className="text-xs text-slate-600 mt-1">Try image-based identification and trace by QR.</div>
            </div>
          </div>
        </motion.div>
      </section>
    </header>
  );
}

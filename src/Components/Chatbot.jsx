// src/Components/Chatbot.jsx
import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Minimal transparent-robot button -> no background, only SVG.
 * Click opens a small chat window (can remove if you only want the robot).
 */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { t: "bot", text: "👋 Hi — ask me about herbs or trace codes (demo)." },
  ]);
  const [val, setVal] = useState("");

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function send() {
    if (!val.trim()) return;
    setMessages((m) => [...m, { t: "user", text: val }]);
    setVal("");
    setTimeout(() => setMessages((m) => [...m, { t: "bot", text: "🌿 Demo reply: here's a short summary." }]), 700);
  }

  // Arm waving variant
  const armWave = {
    animate: {
      rotate: [8, -18, 8],
    },
    transition: {
      duration: 1.1,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 2,
    },
  };

  // Antenna swing variant
  const antennaSwing = {
    animate: { rotate: [-8, 12, -8] },
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  };

  // float up/down
  const floatAnim = {
    animate: { y: [-3, 3, -3] },
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <>
      {/* Robot-only transparent button */}
      <motion.button
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-40 p-0 border-0"
        style={{ background: "transparent" }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          initial="initial"
          animate="animate"
          style={{ width: 72, height: 72, display: "grid", placeItems: "center", cursor: "pointer" }}
          variants={{}}
        >
          <motion.svg
            viewBox="0 0 120 120"
            width="72"
            height="72"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
            {...floatAnim}
          >
            {/* body shadow (subtle, keeps transparency) */}
            <ellipse cx="60" cy="96" rx="22" ry="6" fill="rgba(2,6,23,0.08)" />

            {/* floating group */}
            <motion.g {...floatAnim}>
              {/* head */}
              <rect x="28" y="14" rx="14" ry="14" width="64" height="48" fill="#E6EEF9" stroke="rgba(0,0,0,0.06)"/>

              {/* face (dark screen) */}
              <rect x="36" y="22" rx="9" ry="9" width="48" height="32" fill="#0b1220" />

              {/* eyes - blink animation */}
              <motion.ellipse
                cx="52"
                cy="38"
                rx="4.2"
                ry="6"
                fill="#8EF0E2"
                animate={{ scaleY: [1, 0.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3.2 }}
              />
              <motion.ellipse
                cx="76"
                cy="38"
                rx="4.2"
                ry="6"
                fill="#8EF0E2"
                animate={{ scaleY: [1, 0.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3.2, delay: 0.2 }}
              />

              {/* smiling mouth (subtle pulse) */}
              <motion.path
                d="M fifty true"
                // fallback simple ellipse mouth
                // Using ellipse for mouth
                // (we'll draw mouth as ellipse below)
                style={{ display: "none" }}
              />
              <motion.ellipse
                cx="60"
                cy="46"
                rx="8"
                ry="3.5"
                fill="#ffffff"
                opacity={0.95}
                animate={{ scaleY: [1, 0.85, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* left ear */}
              <circle cx="22" cy="38" r="5" fill="#DCEEFF" />
              {/* right ear */}
              <circle cx="98" cy="38" r="5" fill="#DCEEFF" />

              {/* torso */}
              <ellipse cx="60" cy="78" rx="18" ry="16" fill="#F6FBF6" stroke="rgba(0,0,0,0.03)" />

              {/* right arm (waving) - grouped for rotation */}
              <motion.g
                style={{ originX: "92px", originY: "66px" }}
                animate={armWave.animate}
                transition={armWave.transition}
              >
                <rect x="86" y="62" width="8" height="22" rx="4" fill="#E6EEF9" />
                <circle cx="90" cy="86" r="5.5" fill="#8EF0E2" />
              </motion.g>

              {/* left arm static */}
              <rect x="24" y="62" width="8" height="22" rx="4" fill="#E6EEF9" />
              <circle cx="28" cy="86" r="5.5" fill="#E6EEF9" />

              {/* antenna (swinging) */}
              <motion.g
                style={{ originX: "76px", originY: "18px" }}
                animate={antennaSwing.animate}
                transition={antennaSwing.transition}
              >
                <line x1="76" y1="18" x2="86" y2="8" stroke="#7EE7D4" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="88" cy="6" r="2.8" fill="#7EE7D4" />
              </motion.g>
            </motion.g>
          </motion.svg>
        </motion.div>
      </motion.button>

      {/* Optional chat window (tiny). Remove the block below if you only want the robot */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="fixed right-6 bottom-24 z-50 w-[22rem] bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="px-3 py-2 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* small robot avatar */}
                <svg width="28" height="28" viewBox="0 0 120 120" aria-hidden>
                  <rect x="8" y="8" width="104" height="72" rx="12" fill="#E6EEF9" />
                  <rect x="24" y="20" rx="8" ry="8" width="72" height="40" fill="#0b1220" />
                </svg>
                <div>
                  <div className="text-sm font-semibold text-slate-900">HerbBot</div>
                  <div className="text-xs text-slate-500">seed → shelf assistant</div>
                </div>
              </div>

              <div>
                <button onClick={() => setOpen(false)} className="px-2 py-1 text-slate-600">✖</button>
              </div>
            </div>

            <div className="p-3 max-h-60 overflow-auto space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={`px-3 py-2 rounded-md max-w-[78%] ${m.t === "bot" ? "bg-emerald-50 text-emerald-900" : "bg-violet-100 text-violet-900 ml-auto"}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <div className="p-3 border-t flex gap-2">
              <input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="flex-1 px-3 py-2 rounded-md border text-sm"
                placeholder="Ask about a herb..."
              />
              <button onClick={send} className="px-3 py-2 rounded-md bg-violet-600 text-white">
                <Send size={14} />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

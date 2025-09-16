import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  { img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=60", caption: "Sustainable harvests" },
  { img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=60", caption: "Certified labs" },
];

export default function Slideshow() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={i}
            src={SLIDES[i].img}
            alt={SLIDES[i].caption}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full h-64 object-cover"
          />
        </AnimatePresence>

        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-4 py-2 rounded">
          <div className="text-sm font-semibold text-slate-900">{SLIDES[i].caption}</div>
        </div>
      </div>
    </section>
  );
}

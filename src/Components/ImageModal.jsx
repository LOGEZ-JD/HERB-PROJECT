import { motion } from "framer-motion";

export default function ImageModal({ src, alt, open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="max-w-3xl mx-4">
        <img src={src} alt={alt} className="w-full h-auto rounded-2xl shadow-xl" />
        <div className="mt-2 text-right">
          <button onClick={onClose} className="px-3 py-1 bg-white rounded shadow">Close</button>
        </div>
      </motion.div>
    </div>
  );
}

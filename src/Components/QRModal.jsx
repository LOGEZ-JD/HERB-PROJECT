import { motion } from "framer-motion";

export default function QRModal({ codeUrl, open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <motion.div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-2xl shadow-xl" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <h4 className="font-semibold mb-4">QR Trace</h4>
        <img src={codeUrl} alt="qr" className="w-48 h-48 object-contain mx-auto" />
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded bg-violet-600 text-white">Close</button>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";

export default function Herbtrack() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
          <h3 className="text-4xl font-extrabold text-slate-900">Herb Track</h3>
          <p className="mt-4 text-slate-700">Identify herbs with images, get growth guides, and attach trace events via QR codes.</p>
          <div className="mt-6 flex gap-3">
            <button className="px-5 py-3 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-full shadow-lg">Try it now</button>
            <button className="px-4 py-3 border rounded-full">Learn more</button>
          </div>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="grid gap-4">
          <div className="p-4 bg-white rounded-xl shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">🍃</div>
            <div>
              <h4 className="font-semibold">Identify</h4>
              <p className="text-sm text-slate-600">Snap a photo for species suggestions & tips.</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-50 to-violet-100 flex items-center justify-center">🔍</div>
            <div>
              <h4 className="font-semibold">Trace</h4>
              <p className="text-sm text-slate-600">View chain events, lab attachments and geodata.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

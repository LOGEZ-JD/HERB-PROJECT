import Dashboard from "./Dashboard";
import { motion } from "framer-motion";

export default function BlockchainDashboard() {
  // For demo reuse Dashboard's layout but add a top banner
  return (
    <div>
      <motion.div className="w-full bg-gradient-to-r from-violet-600 to-emerald-500 text-white py-6 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ledger Overview</h2>
            <div className="text-sm">Network health: <span className="font-bold">OK</span></div>
          </div>
        </div>
      </motion.div>

      <Dashboard />
    </div>
  );
}

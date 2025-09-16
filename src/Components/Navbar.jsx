// src/Components/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = "text-violet-600 font-semibold";
  const inactive = "text-slate-700 hover:text-violet-600 transition";

  return (
    <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-violet-200 rounded">
          <motion.div
            whileHover={{ rotate: -12, scale: 1.06 }}
            className="p-2 rounded-full bg-gradient-to-br from-violet-100 to-emerald-50"
          >
            <Leaf className="text-violet-700" />
          </motion.div>

          <div>
            <h1 className="text-lg font-extrabold text-slate-900">HerbTrack</h1>
            <p className="text-xs text-slate-500">seed → shelf</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink end to="/" className={({ isActive }) => (isActive ? active : inactive)}>
            Home
          </NavLink>

          <NavLink to="/features" className={({ isActive }) => (isActive ? active : inactive)}>
            Features
          </NavLink>

          <NavLink to="/database" className={({ isActive }) => (isActive ? active : inactive)}>
            Database
          </NavLink>

          <NavLink to="/trace" className={({ isActive }) => (isActive ? active : inactive)}>
            Trace
          </NavLink>

          <button
            onClick={() => navigate("/register")}
            className="ml-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-full shadow-lg transform-gpu hover:scale-105 active:scale-98 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            Get started
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-200"
          >
            {!open ? <Menu /> : <X />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden px-6 pb-6 bg-white/70 backdrop-blur"
          >
            <div className="flex flex-col gap-2">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-3 rounded-lg ${isActive ? "bg-violet-50 text-violet-700 font-semibold" : "text-slate-700 hover:bg-violet-50"}`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/features"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-3 rounded-lg ${isActive ? "bg-violet-50 text-violet-700 font-semibold" : "text-slate-700 hover:bg-violet-50"}`
                }
              >
                Features
              </NavLink>

              <NavLink
                to="/database"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-3 rounded-lg ${isActive ? "bg-violet-50 text-violet-700 font-semibold" : "text-slate-700 hover:bg-violet-50"}`
                }
              >
                Database
              </NavLink>

              <NavLink
                to="/trace"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-3 rounded-lg ${isActive ? "bg-violet-50 text-violet-700 font-semibold" : "text-slate-700 hover:bg-violet-50"}`
                }
              >
                Trace
              </NavLink>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/register");
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-full shadow"
                >
                  Get started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

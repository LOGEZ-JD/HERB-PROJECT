// src/Components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";

import { auth } from "../firebase";
import { signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey); 
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const active = "text-violet-600 font-semibold";
  const inactive = "text-slate-700 hover:text-violet-600 transition";

  async function handleSignOut() {
    try {
      await firebaseSignOut(auth);
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 focus:outline-none">
          <motion.div whileHover={{ rotate: -12, scale: 1.06 }} className="p-2 rounded-full bg-gradient-to-br from-violet-100 to-emerald-50">
            <Leaf className="text-violet-700" />
          </motion.div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">HerbTrack</h1>
            <p className="text-xs text-slate-500">seed → shelf</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-8">
            <NavLink end to="/" className={({ isActive }) => (isActive ? active : inactive)}>Home</NavLink>
            <NavLink to="/features" className={({ isActive }) => (isActive ? active : inactive)}>Features</NavLink>
            <NavLink to="/database" className={({ isActive }) => (isActive ? active : inactive)}>Database</NavLink>
            <NavLink to="/trace" className={({ isActive }) => (isActive ? active : inactive)}>Trace</NavLink>
            <NavLink to="/geo-tracking" className={({ isActive }) => (isActive ? active : inactive)}>Geo-Tracking</NavLink>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button onClick={() => navigate("/profile")} className="flex items-center gap-3 px-3 py-1 rounded-full hover:bg-slate-100">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold">
                    {(user.displayName && user.displayName[0]) || (user.email && user.email[0].toUpperCase()) || "U"}
                  </div>
                  <span className="hidden sm:block text-sm text-slate-700 max-w-[120px] truncate">{user.displayName ?? user.email}</span>
                </button>

                <button onClick={handleSignOut} className="ml-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-full shadow-lg">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/login")} className="px-4 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-violet-600">Log in</button>
                <button onClick={() => navigate("/register")} className="ml-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-full shadow-lg">Get started</button>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen((s) => !s)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle menu" className="p-2 rounded-md focus:outline-none">
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
                className="py-3 px-3 rounded-lg text-slate-700 hover:bg-violet-50"
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

              <NavLink
                to="/geo-tracking"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-3 rounded-lg ${isActive ? "bg-violet-50 text-violet-700 font-semibold" : "text-slate-700 hover:bg-violet-50"}`
                }
              >
                Geo-Tracking
              </NavLink>

              <div className="pt-3">
                {user ? (
                  <>
                    <button onClick={() => { setOpen(false); navigate("/profile"); }} className="w-full text-left py-3 px-4 rounded-lg hover:bg-violet-50">{user.displayName ?? user.email}</button>
                    <button onClick={handleSignOut} className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-full shadow">Sign out</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setOpen(false); navigate("/login"); }} className="w-full px-4 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-violet-50">Log in</button>
                    <button onClick={() => { setOpen(false); navigate("/register"); }} className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-full shadow">Get started</button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", pw: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.pw);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Create account</h2>
        <p className="text-sm text-slate-500 mb-6">Register as a grower, lab or distributor.</p>

        <input name="name" placeholder="Full name" className="px-3 py-2 rounded border w-full mb-3" value={form.name} onChange={(e) => setForm(f => ({...f, name: e.target.value}))} />
        <input name="email" placeholder="Email" className="px-3 py-2 rounded border w-full mb-3" value={form.email} onChange={(e) => setForm(f => ({...f, email: e.target.value}))} />
        <input name="pw" type="password" placeholder="Password" className="px-3 py-2 rounded border w-full mb-4" value={form.pw} onChange={(e) => setForm(f => ({...f, pw: e.target.value}))} />

        <div className="flex items-center gap-2 mb-4"><input id="terms" type="checkbox" required /><label htmlFor="terms" className="text-sm text-slate-600">Agree to terms</label></div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button type="submit" className="w-full py-2 bg-gradient-to-r from-violet-600 to-emerald-500 text-white rounded-lg">Create account</button>
      </motion.form>
    </main>
  );
}
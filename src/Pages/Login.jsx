import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in</h2>
        <p className="text-sm text-slate-500 mb-4">Manage trace events and ledger entries.</p>

        <label className="text-sm text-slate-600">Email</label>
        <input className="w-full px-3 py-2 rounded border mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="text-sm text-slate-600">Password</label>
        <input type="password" className="w-full px-3 py-2 rounded border mb-4" value={pw} onChange={(e) => setPw(e.target.value)} />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button type="submit" className="w-full py-2 bg-violet-600 text-white rounded-lg">Sign in</button>

        <div className="mt-4 text-center text-sm text-slate-500">No account? <a href="/register" className="text-violet-600">Create</a></div>
      </motion.form>
    </main>
  );
}

// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Dashboard from "./Pages/Dashboard";
import BlockchainDashboard from "./Pages/BlockchainDashboard";
import Traceability from "./Pages/Traceability";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing / Home */}
        <Route path="/" element={<App />} />

        {/* Dashboard route (choose what should appear at /dashboard).
            Currently it points to BlockchainDashboard for ledger view. */}
        <Route path="/dashboard" element={<BlockchainDashboard />} />
        <Route path="/blockchain" element={<BlockchainDashboard />} />

        {/* Traceability lookup */}
        <Route path="/trace" element={<Traceability />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback: render home */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

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
import ProtectedRoute from "./Components/ProtectedRoute";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<App />} />

        {/* Dashboards */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/blockchain" element={<ProtectedRoute><BlockchainDashboard /></ProtectedRoute>} />

        {/* Other pages */}
        <Route path="/trace" element={<Traceability />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

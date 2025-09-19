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
import GeoTracking from "./Pages/GeoTracking";
import FeaturesPage from "./Pages/FeaturesPage";
import OpenHerbDatabasePage from "./Pages/OpenHerbDatabasePage";
import ProtectedRoute from "./Components/ProtectedRoute";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blockchain"
          element={
            <ProtectedRoute>
              <BlockchainDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/features" element={<FeaturesPage />} />
        <Route
          path="/features/open-herb-database"
          element={<OpenHerbDatabasePage />}
        />
        <Route path="/trace" element={<Traceability />} />
        <Route path="/geo-tracking" element={<GeoTracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

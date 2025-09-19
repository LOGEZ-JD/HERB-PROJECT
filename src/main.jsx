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
import FeaturesPage from "./Pages/FeaturesPage"; // <-- features page
import OpenHerbDatabasePage from "./Pages/OpenHerbDatabasePage"; // new page
import HerbDatabasePage from "./Pages/HerbDatabasePage";
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

        <Route path="/features" element={<FeaturesPage />} />   {/* <-- features route */}
        <Route path="/features/open-herb-database" element={<OpenHerbDatabasePage />} /> {/* dedicated DB+QR page */}
        <Route path="/trace" element={<Traceability />} />
        <Route path="/geo-tracking" element={<GeoTracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/herb-database" element={<HerbDatabasePage />} />

        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

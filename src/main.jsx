// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Dashboard from "./Pages/Dashboard";
import FeaturesPage from "./Pages/FeaturesPage";
import OpenHerbDatabase from "./Pages/OpenHerbDatabasePage";
import HerbDetail from "./Pages/HerbDetail";
import Traceability from "./Pages/Traceability";
import GeoTracking from "./Pages/GeoTracking";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
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

        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/features/open-herb-database" element={<OpenHerbDatabase />} />
        <Route path="/database" element={<OpenHerbDatabase />} />

        <Route path="/herb/:id" element={<HerbDetail />} />

        <Route path="/trace" element={<Traceability />} />
        <Route path="/geo-tracking" element={<GeoTracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

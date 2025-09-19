// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Create a herb
export async function createHerb(payload) {
  const res = await API.post("/api/herbs", payload);
  return res.data.herb;
}

// List herbs
export async function listHerbs() {
  const res = await API.get("/api/herbs");
  // res.data.herbs is an array
  return res.data.herbs || [];
}

// Get herb detail (+ events + labs)
export async function getHerb(id) {
  const res = await API.get(`/api/herbs/${id}`);
  return res.data; // { herb, events, labs }
}

// Add event
export async function addEvent(herbId, event) {
  const res = await API.post(`/api/herbs/${herbId}/events`, event);
  return res.data.event;
}

// Add lab report
export async function addLabReport(herbId, lab) {
  const res = await API.post(`/api/herbs/${herbId}/labs`, lab);
  return res.data.lab;
}

export default API;

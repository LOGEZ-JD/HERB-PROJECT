// src/lib/firestoreBatchApi.js
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * Add a new batch (returns created doc ref)
 * data: { name, collectionDate, coords: {lat,lng}, quantity, status, image, notes, ownerUid? }
 */
export async function addBatch(data) {
  const batchesRef = collection(db, "batches");
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const docRef = await addDoc(batchesRef, payload);
  return docRef;
}

/**
 * Update an existing batch by id (partial fields)
 * id: doc id, updates: partial object
 */
export async function updateBatch(id, updates) {
  const ref = doc(db, "batches", id);
  const payload = { ...updates, updatedAt: serverTimestamp() };
  await updateDoc(ref, payload);
  return ref;
}

/**
 * Quick helper to toggle status (example)
 */
export async function updateStatus(id, newStatus) {
  return updateBatch(id, { status: newStatus });
}

/**
 * Fetch a single batch by id
 */
export async function getBatch(id) {
  const ref = doc(db, "batches", id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
}

/**
 * Subscribe to all batches (real-time auto-refresh)
 * Callback gets an array of batch objects
 */
export function listenToBatches(callback) {
  const q = query(collection(db, "batches"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const batches = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(batches);
  });
}

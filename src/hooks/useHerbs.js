// src/hooks/useHerbs.js
import { useState, useEffect, useCallback } from "react";
import { createHerb, listHerbs, getHerb, addEvent, addLabReport } from "../api";

export function useHerbs() {
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHerbs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listHerbs();
      setHerbs(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (herbData) => {
    try {
      const herb = await createHerb(herbData);
      setHerbs((prev) => [herb, ...prev]); // add new herb to state
      return herb;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  return {
    herbs,
    loading,
    error,
    fetchHerbs,
    create,
  };
}

export function useHerb(id) {
  const [herb, setHerb] = useState(null);
  const [events, setEvents] = useState([]);
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const { herb, events, labs } = await getHerb(id);
        setHerb(herb);
        setEvents(events);
        setLabs(labs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function addHerbEvent(data) {
    const ev = await addEvent(id, data);
    setEvents((prev) => [ev, ...prev]);
    return ev;
  }

  async function addHerbLab(data) {
    const lab = await addLabReport(id, data);
    setLabs((prev) => [lab, ...prev]);
    return lab;
  }

  return { herb, events, labs, loading, addHerbEvent, addHerbLab };
}

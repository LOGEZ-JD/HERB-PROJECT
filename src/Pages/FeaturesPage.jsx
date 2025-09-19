// src/Pages/FeaturesPage.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Database, MapPin, Users } from "lucide-react";
import { useLocation } from "react-router-dom";

/**
 * GRID items define title, text, icon and the slug (id) for the detail section.
 * "slug" is used for scrolling to the detail area.
 */
const GRID = [
  {
    icon: <Database className="w-6 h-6" />,
    title: "Open Herb Database",
    text: "Search by name, properties, region, and more.",
    slug: "open-herb-database",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Geo Collation",
    text: "Pin exact harvest coordinates and local conditions.",
    slug: "geo-collation",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community",
    text: "Grower profiles, certifications and ratings.",
    slug: "community",
  },
];

const cardAnim = {
  hidden: { y: 18, opacity: 0 },
  visible: (i = 0) => ({ y: 0, opacity: 1, transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" } }),
};

export default function FeaturesPage() {
  const location = useLocation();

  // on load, if URL has a hash like #geo-collation, scroll to that element
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // slightly delay to ensure layout finished
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      }
    }
  }, [location]);

  function scrollToSlug(slug) {
    const el = document.getElementById(slug);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    // update URL hash without reloading
    if (window && window.history && window.history.pushState) {
      window.history.pushState(null, "", `#${slug}`);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-extrabold text-emerald-900 text-center mb-6">
          Features
        </motion.h1>

        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
          Explore HerbTrack's main capabilities. Click any card to read more below.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GRID.map((g, i) => (
            <motion.article
              key={g.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardAnim}
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-white rounded-2xl shadow-md border hover:shadow-2xl transition"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4 text-emerald-700">
                {g.icon}
              </div>

              <h3 className="text-xl font-semibold text-emerald-800">{g.title}</h3>
              <p className="mt-3 text-slate-600">{g.text}</p>

              <div className="mt-6 flex items-center justify-between">
                <button onClick={() => scrollToSlug(g.slug)} className="inline-flex items-center gap-2 text-emerald-700 font-medium hover:underline">
                  Learn more →
                </button>
                <span className="text-xs text-slate-400">Core</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* DETAILS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Open Herb Database */}
        <article id="open-herb-database" className="bg-white rounded-2xl shadow p-8 border">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-full md:w-1/3">
              <div className="w-20 h-20 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
                <Database className="w-8 h-8" />
              </div>
            </div>

            <div className="md:flex-1">
              <h2 className="text-2xl font-bold text-slate-900">Open Herb Database</h2>
              <p className="mt-3 text-slate-600 max-w-3xl">
                A searchable open database of herbs: common and scientific names, properties, regional variants, and cultivation notes. Filter by region, properties, and uses — and link to trace events and lab results for each batch.
              </p>

              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• Search by name, properties, region and more</li>
                <li>• Attach images and growth guides</li>
                <li>• Link batches to trace events and lab results</li>
              </ul>
            </div>
          </div>
        </article>

        {/* Geo Collation */}
        <article id="geo-collation" className="bg-white rounded-2xl shadow p-8 border">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-full md:w-1/3">
              <div className="w-20 h-20 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
                <MapPin className="w-8 h-8" />
              </div>
            </div>

            <div className="md:flex-1">
              <h2 className="text-2xl font-bold text-slate-900">Geo Collation</h2>
              <p className="mt-3 text-slate-600 max-w-3xl">
                Pin exact harvest coordinates and local conditions to each batch. Store GPS coordinates, elevation, growth-site photos, and microclimate notes for audit-ready traceability.
              </p>

              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• GPS-tag harvest and processing locations</li>
                <li>• Attach local weather, soil, and photos</li>
                <li>• Export maps for audits and logistics</li>
              </ul>
            </div>
          </div>
        </article>

        {/* Community */}
        <article id="community" className="bg-white rounded-2xl shadow p-8 border">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 w-full md:w-1/3">
              <div className="w-20 h-20 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
                <Users className="w-8 h-8" />
              </div>
            </div>

            <div className="md:flex-1">
              <h2 className="text-2xl font-bold text-slate-900">Community</h2>
              <p className="mt-3 text-slate-600 max-w-3xl">
                Grower profiles, certifications, and ratings let buyers and auditors evaluate provenance and quality. Share best practices, certifications and reputation metrics across the community.
              </p>

              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• Grower profiles and reputation</li>
                <li>• Certifications and credentials</li>
                <li>• Ratings, comments and validated reviews</li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

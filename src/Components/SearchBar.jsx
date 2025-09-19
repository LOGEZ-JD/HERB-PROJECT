import React from "react";

export default function SearchBar({ value = "", onChange, placeholder = "Search..." }) {
  return (
    <div className="w-full">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/></svg>
        </span>
        <input
          className="w-full border rounded-lg py-3 pl-10 pr-4 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}

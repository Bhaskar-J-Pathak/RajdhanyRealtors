"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const TYPES = [
  { value: "", label: "All" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "commercial", label: "Commercial" },
  { value: "plot", label: "Plot" },
];

const BEDS = [
  { value: "", label: "Any" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5+" },
];

const SORT = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "oldest", label: "Oldest first" },
];

/* ═══════════════════════════════════════════
   PROPERTY FILTERS — horizontal bar
   ═══════════════════════════════════════════ */
export function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams]
  );

  const currentType = searchParams.get("type") || "";
  const currentBeds = searchParams.get("bedrooms") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const hasFilters = !!(currentType || currentBeds);

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 py-5"
      style={{
        borderTop: "1px solid rgba(0,0,0,0.05)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      {/* Left — type + beds pills */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {/* Property type */}
        <div className="flex items-center gap-1">
          <span
            className="font-sans uppercase shrink-0 mr-2"
            style={{ fontSize: 6.5, letterSpacing: "0.42em", color: "rgba(0,0,0,0.2)" }}
          >
            Type
          </span>
          {TYPES.map((t) => {
            const active = currentType === t.value;
            return (
              <button
                key={t.label}
                onClick={() => updateFilter("type", t.value || null)}
                className="font-sans transition-all duration-200"
                style={{
                  fontSize: 11,
                  color: active ? "rgba(0,0,0,0.82)" : "rgba(0,0,0,0.32)",
                  padding: "4px 11px",
                  borderRadius: 20,
                  backgroundColor: active ? "rgba(0,0,0,0.07)" : "transparent",
                  border: "1px solid",
                  borderColor: active ? "rgba(0,0,0,0.1)" : "transparent",
                  cursor: "pointer",
                  lineHeight: 1.4,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 18, backgroundColor: "rgba(0,0,0,0.08)" }} />

        {/* Bedrooms */}
        <div className="flex items-center gap-1">
          <span
            className="font-sans uppercase shrink-0 mr-2"
            style={{ fontSize: 6.5, letterSpacing: "0.42em", color: "rgba(0,0,0,0.2)" }}
          >
            Beds
          </span>
          {BEDS.map((b) => {
            const active = currentBeds === b.value;
            return (
              <button
                key={b.label}
                onClick={() => updateFilter("bedrooms", b.value || null)}
                className="font-sans transition-all duration-200"
                style={{
                  fontSize: 11,
                  color: active ? "rgba(0,0,0,0.82)" : "rgba(0,0,0,0.32)",
                  padding: "4px 11px",
                  borderRadius: 20,
                  backgroundColor: active ? "rgba(0,0,0,0.07)" : "transparent",
                  border: "1px solid",
                  borderColor: active ? "rgba(0,0,0,0.1)" : "transparent",
                  cursor: "pointer",
                  lineHeight: 1.4,
                }}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right — sort + clear */}
      <div className="flex items-center gap-5">
        {hasFilters && (
          <button
            onClick={() => router.push("/properties")}
            className="font-sans transition-colors duration-200 hover:text-black/65"
            style={{ fontSize: 10.5, color: "rgba(0,0,0,0.3)", cursor: "pointer" }}
          >
            Clear filters
          </button>
        )}

        <div className="flex items-center gap-2">
          <span
            className="font-sans uppercase"
            style={{ fontSize: 6.5, letterSpacing: "0.42em", color: "rgba(0,0,0,0.2)" }}
          >
            Sort
          </span>
          <select
            value={currentSort}
            onChange={(e) => updateFilter("sort", e.target.value)}
            className="font-sans bg-transparent cursor-pointer focus:outline-none appearance-none"
            style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", border: "none" }}
          >
            {SORT.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

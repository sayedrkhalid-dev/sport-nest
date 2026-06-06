"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

export default function FacilitiesHeader({ totalResults = 0 }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const sortBy = searchParams.get("sortBy") || "Newest";

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateQuery("search", search);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search facilities, locations, sports..."
            className="w-full h-12 pl-11 pr-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative min-w-[220px]">
          <select
            value={sortBy}
            onChange={(e) => updateQuery("sortBy", e.target.value)}
            className="w-full h-12 pl-4 pr-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-white text-sm font-medium appearance-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="Newest">Newest First</option>
            <option value="PriceLowToHigh">Price: Low → High</option>
            <option value="PriceHighToLow">Price: High → Low</option>
            <option value="TopRated">Highest Rated</option>
          </select>

          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Results Summary */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-900 dark:text-white">{totalResults}</span>{" "}
          available facilities
        </p>
      </div>
    </div>
  );
}

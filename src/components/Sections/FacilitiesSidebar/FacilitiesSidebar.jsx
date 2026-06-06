"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const surfaces = ["All", "Vinyl", "Grass", "Concrete", "Rubber"];

export default function FacilitiesSidebar({ averagePriceFormatted = "$50" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedLocation = searchParams.get("location") || "All";
  const selectedTime = searchParams.get("time") || "All";
  const minPrice = 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 150;
  const courtTypeIndoor = searchParams.get("indoor") === "true";
  const courtTypeOutdoor = searchParams.get("outdoor") === "true";
  const selectedSurface = searchParams.get("surface") || "All";
  const selectedRating = Number(searchParams.get("rating")) || 0;

  const updateFilters = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "All" || value === "" || value === false || value === 0 || value === null) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const onResetFilters = () => {
    router.push(pathname);
  };

  return (
    <aside className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm lg:sticky lg:top-24 z-30">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Refine your facility search
            </p>
          </div>

          <button
            type="button"
            onClick={onResetFilters}
            className="text-sm font-medium text-red-500 hover:text-red-600 cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Location
          </label>

          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => updateFilters({ location: e.target.value })}
              className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-800 dark:text-slate-200 appearance-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="Lagos, Nigeria">Lagos, Nigeria</option>
              <option value="London, UK">London, UK</option>
              <option value="Brooklyn, US">Brooklyn, US</option>
            </select>

            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            Time Slot
          </label>

          <div className="relative">
            <select
              value={selectedTime}
              onChange={(e) => updateFilters({ time: e.target.value })}
              className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm text-slate-800 dark:text-slate-200 appearance-none outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="All">Any Time</option>
              <option value="Sat,12:00-05:00">Sat, 12:00 - 05:00</option>
              <option value="Sun,09:00-02:00">Sun, 09:00 - 02:00</option>
              <option value="WeekdayEvening">Mon - Fri, 17:00 - 22:00</option>
            </select>

            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Price Range
            </label>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Avg. {averagePriceFormatted}/hour
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="mb-1 text-xs text-slate-500">Min</p>

              <input
                type="text"
                readOnly
                value={
                  selectedLocation === "Lagos, Nigeria"
                    ? `NGN ${(minPrice * 400).toLocaleString()}`
                    : `$${minPrice}`
                }
                className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-center text-sm font-medium"
              />
            </div>

            <div>
              <p className="mb-1 text-xs text-slate-500">Max</p>

              <input
                type="text"
                readOnly
                value={
                  selectedLocation === "Lagos, Nigeria"
                    ? `NGN ${(maxPrice * 400).toLocaleString()}`
                    : `$${maxPrice}`
                }
                className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-center text-sm font-medium"
              />
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="150"
            value={maxPrice}
            onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
            className="w-full accent-primary cursor-pointer"
          />
        </div>

        {/* Court Type */}
        <div>
          <label className="block mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            Court Type
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label
              className={`flex items-center justify-center h-11 rounded-xl border cursor-pointer transition-all ${
                courtTypeIndoor
                  ? "border-primary bg-primary/10 text-primary font-bold"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={courtTypeIndoor}
                onChange={(e) => updateFilters({ indoor: e.target.checked })}
                className="hidden"
              />
              Indoor
            </label>

            <label
              className={`flex items-center justify-center h-11 rounded-xl border cursor-pointer transition-all ${
                courtTypeOutdoor
                  ? "border-primary bg-primary/10 text-primary font-bold"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={courtTypeOutdoor}
                onChange={(e) => updateFilters({ outdoor: e.target.checked })}
                className="hidden"
              />
              Outdoor
            </label>
          </div>
        </div>

        {/* Surface */}
        <div>
          <label className="block mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            Surface Type
          </label>

          <div className="space-y-2">
            {surfaces.map((surface) => (
              <label
                key={surface}
                className={`flex items-center justify-between px-4 h-11 rounded-xl border cursor-pointer transition-all ${
                  selectedSurface === surface
                    ? "border-primary bg-primary/10 font-bold"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                }`}
              >
                <span>{surface}</span>

                <input
                  type="radio"
                  name="surface"
                  checked={selectedSurface === surface}
                  onChange={() => updateFilters({ surface: surface })}
                  className="accent-primary"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            Minimum Rating
          </label>

          <div className="flex justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => updateFilters({ rating: selectedRating === star ? 0 : star })}
                className="transition-transform hover:scale-110 cursor-pointer"
              >
                <FaStar
                  size={22}
                  className={
                    star <= selectedRating ? "text-amber-500" : "text-slate-300 dark:text-slate-600"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onResetFilters}
            className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer text-slate-700 dark:text-slate-300"
          >
            Reset All Filters
          </button>
        </div>
      </form>
    </aside>
  );
}

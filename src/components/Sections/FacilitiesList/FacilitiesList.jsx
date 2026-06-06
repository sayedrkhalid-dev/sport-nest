"use client";

import FacilityCard from "@/components/UI/FacilityCard/FacilityCard";
import { FiGrid } from "react-icons/fi";

export default function FacilitiesList({ facilities = [] }) {
  return (
    <div>
      <h3 className="text-base font-black text-on-surface dark:text-white uppercase tracking-wider font-display flex items-center gap-1.5 mb-4">
        <FiGrid className="text-primary dark:text-primary-fixed-dim text-lg" />
        Others
      </h3>

      {facilities.length > 0 ? (
        <div className="space-y-4">
          {facilities.map((facility) => (
            <FacilityCard key={facility._id || facility.id} facility={facility} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center shadow-premium">
          <span className="text-base font-black text-outline dark:text-slate-400 mb-2">
            No facilities found
          </span>
          <p className="text-xs text-outline dark:text-slate-450 max-w-xs leading-relaxed">
            Try adjusting your search criteria, clear search queries, or reset active filters.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import FacilityCard from "@/components/UI/FacilityCard/FacilityCard";

export default function PopularFacilities({ facilities = [] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-black text-on-surface dark:text-white uppercase tracking-wider font-display flex items-center gap-1.5">
          <span className="text-xl">🔥</span>
          Popular Courts
        </h3>
      </div>

      {facilities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <FacilityCard key={facility._id || facility.id} facility={facility} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-3xl text-outline dark:text-slate-400 text-xs font-bold shadow-sm">
          No popular courts found matching filter criteria.
        </div>
      )}
    </div>
  );
}

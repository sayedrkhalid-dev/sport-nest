import FacilityCard from "@/components/UI/FacilityCard/FacilityCard";

export default function FeaturedFacilities({ facilities = [] }) {
  return (
    <section className="w-full py-16 px-margin-desktop max-w-container-max mx-auto border-t border-stroke-soft dark:border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
        <div>
          <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed-dim rounded-full text-[11px] font-bold uppercase tracking-wider block w-fit mb-3">
            Featured Facilities
          </span>
          <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface dark:text-white text-2xl md:text-3xl font-display">
            Elite Spaces Available Today
          </h2>
        </div>
        <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-md mt-4 md:mt-0 text-sm font-semibold">
          Vetted by professionals. Explore top featured courts and pitches available now for
          bookings.
        </p>
      </div>

      {facilities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <FacilityCard key={facility._id || facility.id} facility={facility} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-surface-container-low dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-3xl text-outline dark:text-slate-400 text-sm font-semibold">
          No featured facilities available at the moment.
        </div>
      )}
    </section>
  );
}

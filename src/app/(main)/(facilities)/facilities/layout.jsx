import FacilitiesHeader from "@/components/Sections/FacilitiesHeader/FacilitiesHeader";
import FacilitiesSidebar from "@/components/Sections/FacilitiesSidebar/FacilitiesSidebar";

export default function FacilitiesLayout({ children }) {
  return (
    <main className="flex-1 pt-24 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mt-6">
          <FacilitiesSidebar />

          <div className="lg:col-span-3 space-y-8">
            <FacilitiesHeader />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

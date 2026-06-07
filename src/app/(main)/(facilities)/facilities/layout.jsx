"use client";

import { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import FacilitiesHeader from "@/components/Sections/FacilitiesHeader/FacilitiesHeader";
import FacilitiesSidebar from "@/components/Sections/FacilitiesSidebar/FacilitiesSidebar";

export default function FacilitiesLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="flex-1 pt-24 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-container-max mx-auto px-4 lg:px-margin-desktop">

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mt-6 mb-4">
          <h1 className="text-lg font-extrabold text-on-surface dark:text-white">
            All Facilities
          </h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-md cursor-pointer"
          >
            <FiFilter />
            Filters
          </button>
        </div>

        {/* ── Mobile Sidebar Backdrop ── */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Mobile Sidebar Drawer — left থেকে আসবে ── */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
            <h2 className="font-bold text-lg text-on-surface dark:text-white">Filters</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="p-4">
            <FacilitiesSidebar onApply={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* ── Desktop Layout ── */}
        <div className="hidden lg:grid grid-cols-4 gap-8 items-start mt-6">
          <FacilitiesSidebar />
          <div className="col-span-3 space-y-8">
            <FacilitiesHeader />
            {children}
          </div>
        </div>

        {/* ── Mobile Content (no sidebar, just list) ── */}
        <div className="lg:hidden space-y-6">
          <FacilitiesHeader />
          {children}
        </div>

      </div>
    </main>
  );
}
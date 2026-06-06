"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMyFacilities, deleteFacility } from "@/lib/api";
import AddFacilityModal from "@/components/UI/AddFacilityModal/AddFacilityModal";
import PrivateRoute from "@/components/UI/PrivateRoute/PrivateRoute";
import LoadingSpinner from "@/components/UI/LoadingSpinner/LoadingSpinner";
import { FiSliders, FiTrash2, FiEdit2, FiPlus, FiArrowRight, FiMapPin, FiDollarSign, FiUsers, FiX, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ManageMyFacilitiesPage() {
  const { user } = useAuth();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [deletingFacilityId, setDeletingFacilityId] = useState(null);

  const fetchFacilities = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const data = await getMyFacilities(user.email);
      setFacilities(data || []);
    } catch (err) {
      toast.error(err.message || "Failed to fetch your facilities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, [user?.email]);

  const handleDeleteConfirm = async () => {
    if (!deletingFacilityId) return;
    try {
      await deleteFacility(deletingFacilityId);
      toast.success("Facility deleted successfully!");
      // Optimistic UI update
      setFacilities((prev) => prev.filter((f) => (f._id || f.id) !== deletingFacilityId));
      setDeletingFacilityId(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete facility.");
    }
  };

  // Stats calculation
  const totalBookingsCount = facilities.reduce((sum, f) => sum + (f.booking_count || 0), 0);
  const avgHourlyRate = facilities.length > 0
    ? facilities.reduce((sum, f) => sum + Number(f.price_per_hour || f.price || 0), 0) / facilities.length
    : 0;

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between pt-24">
        <main className="flex-1 pb-16 px-4 md:px-margin-desktop max-w-container-max mx-auto w-full">
          {/* Page Header */}
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed-dim rounded-full text-[11px] font-bold uppercase tracking-wider block w-fit mb-3">
                Host Analytics
              </span>
              <h1 className="text-headline-lg font-extrabold text-on-surface dark:text-white text-3xl md:text-4xl font-display">
                Manage My Facilities
              </h1>
              <p className="text-body-md text-on-surface-variant dark:text-slate-400 mt-2 text-sm max-w-xl font-semibold">
                Review and adjust rates, upload specifications, and track visitor reservations. Keep playing spaces verified.
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 bg-primary text-white dark:bg-primary-fixed-dim dark:text-slate-950 font-bold text-xs rounded-xl hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FiPlus className="text-base" />
              <span>List New Arena</span>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              {/* Dashboard Stats */}
              {facilities.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div className="bg-white dark:bg-slate-905 border border-stroke-soft dark:border-slate-800 rounded-2xl p-5 shadow-premium">
                    <span className="text-[10px] text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-widest block">
                      Total Spaces Owned
                    </span>
                    <span className="text-2xl font-extrabold text-on-surface dark:text-white font-display block mt-1.5">
                      {facilities.length} Venues
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-905 border border-stroke-soft dark:border-slate-800 rounded-2xl p-5 shadow-premium">
                    <span className="text-[10px] text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-widest block">
                      Aggregated Bookings
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-500 font-display block mt-1.5">
                      {totalBookingsCount} Reservations
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-905 border border-stroke-soft dark:border-slate-800 rounded-2xl p-5 shadow-premium">
                    <span className="text-[10px] text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-widest block">
                      Avg Hourly Price
                    </span>
                    <span className="text-2xl font-extrabold text-primary dark:text-primary-fixed-dim font-display block mt-1.5">
                      ${avgHourlyRate.toFixed(2)}/hr
                    </span>
                  </div>
                </div>
              )}

              {/* Facilities Table/Card Display */}
              {facilities.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-3xl p-12 md:p-16 text-center max-w-2xl mx-auto shadow-premium animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <FiSliders className="text-2xl text-primary dark:text-primary-fixed-dim" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface dark:text-white mb-2">
                    No Listings Published Yet
                  </h3>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 max-w-sm mx-auto leading-relaxed mb-8">
                    It seems you haven&apos;t added any facilities to SportNest. List your courts or turfs to start receiving athlete bookings.
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-6 py-3 bg-primary text-white dark:bg-primary-fixed-dim dark:text-slate-950 font-bold text-xs rounded-xl hover:scale-[1.02] hover:brightness-110 transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Add Your First Facility</span>
                    <FiArrowRight />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {facilities.map((fac) => {
                    const price = fac.price_per_hour || fac.price || 0;
                    return (
                      <div
                        key={fac._id || fac.id}
                        className="bg-white dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-3xl overflow-hidden shadow-premium flex flex-col justify-between group hover:border-primary/45 dark:hover:border-primary-fixed-dim/45 transition-colors duration-300"
                      >
                        <div>
                          {/* Thumbnail Cover */}
                          <div className="h-44 w-full relative bg-slate-100 dark:bg-slate-950">
                            <img
                              src={fac.image || "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"}
                              alt={fac.name || fac.title}
                              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            />
                            <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 border border-stroke-soft dark:border-slate-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase text-primary dark:text-primary-fixed-dim shadow-sm">
                              {fac.facility_type || fac.sport || "Sport"}
                            </span>
                          </div>

                          {/* Body Info */}
                          <div className="p-5 space-y-4">
                            <div>
                              <span className="text-[10px] text-outline dark:text-slate-500 font-bold uppercase tracking-widest block truncate">
                                Space ID: {fac._id || fac.id}
                              </span>
                              <h3 className="font-bold text-on-surface dark:text-white text-base md:text-lg font-display truncate mt-1">
                                {fac.name || fac.title}
                              </h3>
                            </div>

                            <div className="space-y-2.5 py-3 border-y border-stroke-soft dark:border-slate-800/60 text-xs text-on-surface-variant dark:text-slate-400 font-semibold">
                              <div className="flex items-center gap-2">
                                <FiMapPin className="text-primary dark:text-primary-fixed-dim text-sm" />
                                <span className="truncate">{fac.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FiDollarSign className="text-primary dark:text-primary-fixed-dim text-sm" />
                                <span className="font-bold text-on-surface dark:text-white">
                                  ${price}/hr
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FiUsers className="text-primary dark:text-primary-fixed-dim text-sm" />
                                <span>Booked: <strong>{fac.booking_count || 0} times</strong></span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card CTA Actions */}
                        <div className="p-5 pt-0 flex gap-3">
                          <button
                            onClick={() => setEditingFacility(fac)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-stroke-soft dark:border-slate-800 hover:bg-primary/5 hover:border-primary/20 hover:text-primary text-xs font-bold text-on-surface dark:text-slate-300 rounded-xl transition-all cursor-pointer"
                          >
                            <FiEdit2 />
                            <span>Edit Specs</span>
                          </button>
                          <button
                            onClick={() => setDeletingFacilityId(fac._id || fac.id)}
                            className="flex items-center justify-center p-2.5 border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-500/10 hover:border-red-500 rounded-xl transition-all cursor-pointer"
                            aria-label="Delete facility"
                          >
                            <FiTrash2 className="text-base" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>

        {/* ================= EDIT MODAL OVERLAY ================= */}
        {editingFacility && (
          <AddFacilityModal
            isOpen={true}
            onClose={() => setEditingFacility(null)}
            onSuccess={fetchFacilities}
            editData={editingFacility}
          />
        )}

        {/* ================= DELETE CONFIRMATION MODAL OVERLAY ================= */}
        {deletingFacilityId && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl p-6 text-center animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-xl text-red-500" />
              </div>
              <h3 className="font-bold text-lg text-on-surface dark:text-white font-display">
                Delete Facility space?
              </h3>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-2 leading-relaxed font-semibold">
                Warning: This action is permanent. Deleting this listing will completely erase it from the platform. Are you sure you want to proceed?
              </p>

              <div className="flex gap-3 justify-center mt-6">
                <button
                  onClick={() => setDeletingFacilityId(null)}
                  className="px-5 py-2.5 border border-stroke-soft dark:border-slate-800 text-on-surface dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Keep Listing
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-5 py-2.5 bg-red-500 text-white font-bold text-xs rounded-xl hover:brightness-115 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  Delete Space
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADD FACILITY MODAL OVERLAY ================= */}
        <AddFacilityModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchFacilities}
        />
      </div>
    </PrivateRoute>
  );
}

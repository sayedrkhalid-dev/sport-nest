"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMyBookings } from "@/lib/api";
import MyBookingCard from "@/components/UI/MyBookingCard/MyBookingCard";
import PrivateRoute from "@/components/UI/PrivateRoute/PrivateRoute";
import LoadingSpinner from "@/components/UI/LoadingSpinner/LoadingSpinner";
import { FiCalendar, FiClock, FiGrid, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const data = await getMyBookings(user.email);
      setBookings(data || []);
    } catch (err) {
      toast.error(err.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user?.email]);

  const handleCancelled = (id) => {
    setBookings((prev) =>
      prev.map((b) => ((b._id || b.id) === id ? { ...b, status: "cancelled" } : b))
    );
  };

  return (
    <PrivateRoute>
      <main className="flex-1 pt-24 pb-16 px-4 md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-stroke-soft dark:border-slate-800 pb-6">
          <div>
            <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed-dim rounded-full text-[11px] font-bold uppercase tracking-wider block w-fit mb-3">
              Athlete Dashboard
            </span>
            <h1 className="text-headline-lg font-extrabold text-on-surface dark:text-white text-3xl md:text-4xl font-display">
              My Bookings
            </h1>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 mt-2 text-sm max-w-xl font-semibold">
              Review session schedules, check booking approval states, or cancel pending bookings.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-3xl p-12 md:p-16 text-center max-w-2xl mx-auto shadow-premium animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FiCalendar className="text-2xl text-primary dark:text-primary-fixed-dim" />
            </div>
            <h3 className="text-lg font-bold text-on-surface dark:text-white mb-2">
              No Bookings Scheduled
            </h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 max-w-sm mx-auto leading-relaxed mb-8">
              You haven&apos;t reserved any athletic spaces yet. Find your sport arena and book a slot to get started!
            </p>
            <Link
              href="/facilities"
              className="px-6 py-3 bg-primary text-white dark:bg-primary-fixed-dim dark:text-slate-950 font-bold text-xs rounded-xl hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Browse Facilities</span>
              <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <h3 className="text-base font-black text-on-surface dark:text-white uppercase tracking-wider font-display flex items-center gap-1.5 mb-4">
              <FiGrid className="text-primary dark:text-primary-fixed-dim text-lg" />
              Schedules
            </h3>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <MyBookingCard
                  key={booking._id || booking.id}
                  booking={booking}
                  onCancelled={handleCancelled}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </PrivateRoute>
  );
}

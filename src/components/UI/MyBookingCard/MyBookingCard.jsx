"use client";

import { HiCalendarDays, HiClock, HiCurrencyDollar, HiXMark } from "react-icons/hi2";
import toast from "react-hot-toast";
import { cancelBooking } from "@/lib/api";
import { useState } from "react";

const STATUS_STYLES = {
  pending:   "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
  confirmed: "bg-green-100  text-green-800  dark:bg-green-900/40  dark:text-green-300",
  cancelled: "bg-red-100    text-red-800    dark:bg-red-900/40    dark:text-red-300",
};

export default function MyBookingCard({ booking, onCancelled }) {
  const [cancelling, setCancelling] = useState(false);

  const {
    _id,
    facility_id,
    booking_date,
    time_slot,
    hours,
    total_price,
    status,
  } = booking;

  const facilityName =
    booking.facility_name ||
    (typeof facility_id === "object" ? facility_id?.name : null) ||
    "Facility";

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    setCancelling(true);
    try {
      await cancelBooking(_id);
      toast.success("Booking cancelled successfully.");
      onCancelled?.(_id);
    } catch (err) {
      toast.error(err.message || "Could not cancel booking.");
    } finally {
      setCancelling(false);
    }
  };

  const formattedDate = booking_date
    ? new Date(booking_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <article className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/60 border border-outline-variant/40 dark:border-slate-700/50 p-5 shadow-premium">
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-on-surface dark:text-slate-100 text-base leading-tight">
            {facilityName}
          </h3>
          <span
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize flex-shrink-0 ${
              STATUS_STYLES[status] || STATUS_STYLES.pending
            }`}
          >
            {status}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-on-surface-variant dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <HiCalendarDays className="w-4 h-4 text-primary" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <HiClock className="w-4 h-4 text-secondary" />
            {time_slot ? `${time_slot.start_time} – ${time_slot.end_time}` : "—"}
            {hours && ` · ${hours}h`}
          </span>
          <span className="flex items-center gap-1.5">
            <HiCurrencyDollar className="w-4 h-4 text-energy-orange" />
            <strong className="text-on-surface dark:text-slate-200">${total_price}</strong>
          </span>
        </div>
      </div>

      {status !== "cancelled" && (
        <button
          id={`cancel-booking-${_id}`}
          onClick={handleCancel}
          disabled={cancelling}
          className="self-start sm:self-center flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-error/10 text-error hover:bg-error/20 transition-all duration-150 cursor-pointer disabled:opacity-50"
        >
          <HiXMark className="w-4 h-4" />
          {cancelling ? "Cancelling…" : "Cancel"}
        </button>
      )}
    </article>
  );
}

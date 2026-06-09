"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiCalendar, FiClock, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { createBooking } from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookingCard({ facility }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [bookingDone, setBookingDone] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const slots = (facility?.available_slots || []).map((s) => ({
    name: `${s?.start_time}–${s?.end_time}`,
    start_time: s?.start_time,
    end_time: s?.end_time,
  }));

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(slots[0]);

  const basePrice = facility?.price || facility?.price_per_hour || 0;
  const rating = facility?.rating || 0;

  const toMin = (t) => {
    if (!t) return 0;
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const hours = selectedSlot
    ? (toMin(selectedSlot.end_time) - toMin(selectedSlot.start_time)) / 60
    : 0;
  const subtotal = basePrice * hours;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  const todayStr = () => new Date().toISOString().split("T")[0];

  const handleBooking = async () => {
    if (!isAuthenticated || !user) {
      toast.error("Please sign in to book a slot.");
      router.push(`/login?redirectTo=/facilities/${facility._id || facility.id}`);
      return;
    }

    if (!selectedDate) {
      setErrorMsg("Please select a booking date.");
      return;
    }

    setErrorMsg("");
    setBookingLoading(true);

    try {
      await createBooking({
        facility_id: facility._id || facility.id,
        booking_date: selectedDate,
        time_slot: {
          start_time: selectedSlot?.start_time,
          end_time: selectedSlot?.end_time,
        },
        owner_email: user.email,
      });

      toast.success("Booking confirmed!");
      setBookingDone(true);
    } catch (error) {
      setErrorMsg(error.message || "Booking failed. Please try again.");
      toast.error("Booking failed.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="bg-surface-main dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-2xl p-6 shadow-premium relative overflow-hidden">
      {bookingDone ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-3xl font-bold mb-4">
            ✓
          </div>
          <h3 className="text-headline-sm font-extrabold text-on-surface dark:text-white mb-2">
            Booking Confirmed!
          </h3>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-xs text-sm mb-1 font-semibold">
            Your booking for <strong>{facility?.title || facility?.name || "Facility"}</strong> has been confirmed on{" "}
            <strong>{selectedDate}</strong>.
          </p>
          <p className="text-xs text-outline dark:text-slate-500 font-semibold mb-6">
            Slot: {selectedSlot?.start_time} – {selectedSlot?.end_time}
          </p>
          <button
            onClick={() => {
              setBookingDone(false);
              setSelectedDate("");
              setSelectedSlot(slots[0]);
            }}
            className="px-6 py-2 border border-primary text-primary dark:border-primary-fixed-dim dark:text-primary-fixed-dim font-bold rounded-lg hover:bg-primary/5 transition-all cursor-pointer"
          >
            Book Another Session
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center pb-4 border-b border-stroke-soft dark:border-slate-800 mb-6">
            <div>
              <span className="text-[10px] text-outline dark:text-slate-400 block font-bold uppercase tracking-wider">
                Rate / Hour
              </span>
              <span className="text-headline-lg font-extrabold text-primary dark:text-primary-fixed-dim text-2xl">
                ${basePrice}
                <span className="text-body-md text-on-surface-variant dark:text-slate-400 font-normal text-sm">
                  /hr
                </span>
              </span>
            </div>
            <div className="flex items-center text-energy-orange gap-1">
              <FaStar className="text-[16px]" />
              <span className="text-label-md font-bold">{rating}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-600 dark:text-red-400 mb-5 font-semibold flex items-center gap-2">
              <FiAlertCircle className="text-lg shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleBooking();
            }}
            className="space-y-5"
          >
            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-on-surface dark:text-slate-300 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <FiCalendar className="text-primary dark:text-primary-fixed-dim" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={todayStr()}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stroke-soft dark:border-slate-800 bg-surface-alt dark:bg-slate-950 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md font-medium cursor-pointer"
              />
            </div>

            {/* Slot */}
            <div>
              <label className="block text-xs font-bold text-on-surface dark:text-slate-300 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <FiClock className="text-primary dark:text-primary-fixed-dim" />
                Session Time
              </label>
              <div className={`grid gap-2 ${slots.length <= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                {slots.map((slot) => {
                  const isSelected = selectedSlot?.start_time === slot.start_time;
                  return (
                    <button
                      key={slot.start_time}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center ${
                        isSelected
                          ? "bg-primary border-primary text-white dark:bg-primary-fixed-dim dark:border-primary-fixed-dim dark:text-slate-950 shadow-sm"
                          : "bg-surface-alt border-stroke-soft dark:border-slate-800 dark:bg-slate-950 text-on-surface-variant dark:text-slate-400 hover:border-primary"
                      }`}
                    >
                      <div className="font-extrabold">{slot?.name}</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-outline dark:text-slate-500 mt-1.5 font-semibold">
                {selectedSlot?.start_time} – {selectedSlot?.end_time} ({hours}h)
              </p>
            </div>

            {/* Price summary — slot time থেকে calculate, backend এর সাথে match */}
            <div className="p-4 bg-surface-alt dark:bg-slate-950 border border-stroke-soft dark:border-slate-800 rounded-xl space-y-2.5 text-label-md">
              <div className="flex justify-between text-on-surface-variant dark:text-slate-400 text-xs font-semibold">
                <span>Rent (${basePrice} × {hours}h)</span>
                <span className="font-bold text-on-surface dark:text-white">${subtotal}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant dark:text-slate-400 text-xs font-semibold">
                <span>Platform Service Fee</span>
                <span className="font-bold text-on-surface dark:text-white">${serviceFee}</span>
              </div>
              <div className="border-t border-stroke-soft dark:border-slate-800 pt-2.5 flex justify-between font-extrabold text-on-surface dark:text-white text-sm">
                <span>Total Cost</span>
                <span className="text-primary dark:text-primary-fixed-dim">${total}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={bookingLoading || isLoading || !user}
              className={`w-full py-3 bg-primary text-white dark:bg-primary-fixed-dim dark:text-slate-950 font-bold rounded-xl active:scale-95 transition-all shadow-md cursor-pointer flex justify-center items-center gap-2 ${
                bookingLoading || isLoading || !user ? "opacity-75 cursor-not-allowed" : "hover:brightness-110"
              }`}
            >
              {bookingLoading || isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLoading ? "Loading..." : "Processing Booking..."}
                </>
              ) : isAuthenticated ? (
                <>
                  <FiCheckCircle className="text-base" />
                  Confirm Booking
                </>
              ) : (
                "Sign In to Book"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

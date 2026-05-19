"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiCalendar, FiClock, FiActivity } from "react-icons/fi";

export default function BookingCard({ basePrice = 45, rating = "4.9" }) {
  const [selectedDate, setSelectedDate] = useState("2026-05-20");
  const [selectedSlot, setSelectedSlot] = useState("Afternoon");
  const [duration, setDuration] = useState(2);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  const slots = [
    { name: "Morning", time: "08:00 AM - 12:00 PM" },
    { name: "Afternoon", time: "12:00 PM - 04:00 PM" },
    { name: "Evening", time: "04:00 PM - 08:00 PM" },
  ];

  const serviceFee = 5;
  const subtotal = basePrice * duration;
  const total = subtotal + serviceFee;

  const handleBooking = () => {
    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setBookingDone(true);
    }, 2000);
  };

  return (
    <div className="bg-surface-main dark:bg-surface-dim border border-stroke-soft dark:border-outline-variant rounded-2xl p-6 shadow-premium relative overflow-hidden">
      {bookingDone ? (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-3xl font-bold mb-4 shadow-md animate-bounce">
            ✓
          </div>
          <h3 className="text-headline-sm font-extrabold text-on-surface dark:text-inverse-on-surface mb-2">
            Booking Confirmed!
          </h3>
          <p className="text-body-md text-on-surface-variant dark:text-outline-variant max-w-xs text-sm mb-6">
            Your space has been successfully reserved for {selectedDate} during the {selectedSlot}{" "}
            session.
          </p>
          <button
            onClick={() => setBookingDone(false)}
            className="px-6 py-2 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary/5 transition-all cursor-pointer"
          >
            Book Another Session
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center pb-4 border-b border-stroke-soft dark:border-outline-variant mb-6">
            <div>
              <span className="text-label-sm text-outline dark:text-outline-variant text-[11px] block font-semibold uppercase">
                Rate / Hour
              </span>
              <span className="text-headline-lg font-extrabold text-primary dark:text-primary-fixed-dim">
                ${basePrice}
                <span className="text-body-md text-on-surface-variant dark:text-outline-variant font-normal text-sm">
                  /hr
                </span>
              </span>
            </div>
            <div className="flex items-center text-energy-orange gap-1">
              <FaStar className="text-[16px]" />
              <span className="text-label-md font-bold">{rating}</span>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* Date Input */}
            <div>
              <label className="block text-label-sm font-bold text-on-surface dark:text-inverse-on-surface mb-2 flex items-center gap-1.5">
                <FiCalendar className="text-primary" />
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stroke-soft dark:border-outline bg-surface-alt dark:bg-surface-dim dark:text-inverse-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md font-medium cursor-pointer"
              />
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-label-sm font-bold text-on-surface dark:text-inverse-on-surface mb-2 flex items-center gap-1.5">
                <FiClock className="text-primary" />
                Session Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot.name;
                  return (
                    <button
                      key={slot.name}
                      type="button"
                      onClick={() => setSelectedSlot(slot.name)}
                      className={`py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center ${
                        isSelected
                          ? "bg-primary border-primary text-on-primary shadow-sm"
                          : "bg-surface-alt border-stroke-soft dark:border-outline text-on-surface-variant dark:text-outline-variant hover:border-primary"
                      }`}
                    >
                      <div className="font-extrabold">{slot.name}</div>
                      <div className="opacity-80 scale-90 mt-0.5">{slot.time.split(" ")[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-label-sm font-bold text-on-surface dark:text-inverse-on-surface mb-2 flex items-center gap-1.5">
                <FiActivity className="text-primary" />
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-stroke-soft dark:border-outline bg-surface-alt dark:bg-surface-dim dark:text-inverse-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md font-medium cursor-pointer"
              >
                <option value={1}>1 Hour Session</option>
                <option value={2}>2 Hours Session</option>
                <option value={3}>3 Hours Session</option>
                <option value={4}>4 Hours Session</option>
              </select>
            </div>

            {/* Pricing Summary */}
            <div className="p-4 bg-surface-alt dark:bg-surface-dim border border-stroke-soft dark:border-outline-variant rounded-xl space-y-2.5 text-label-md">
              <div className="flex justify-between text-on-surface-variant dark:text-outline-variant text-sm">
                <span>
                  Rent (${basePrice} × {duration} hrs)
                </span>
                <span className="font-bold text-on-surface dark:text-inverse-on-surface">
                  ${subtotal}
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant dark:text-outline-variant text-sm">
                <span>Platform Service Fee</span>
                <span className="font-bold text-on-surface dark:text-inverse-on-surface">
                  ${serviceFee}
                </span>
              </div>
              <div className="border-t border-stroke-soft dark:border-outline-variant pt-2.5 flex justify-between font-extrabold text-on-surface dark:text-inverse-on-surface text-base">
                <span>Total Cost</span>
                <span className="text-primary dark:text-primary-fixed-dim">${total}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className={`w-full py-3 bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed font-headline-md font-bold rounded-xl active:scale-95 transition-all shadow-md cursor-pointer flex justify-center items-center gap-2 ${
                bookingLoading ? "opacity-75 cursor-not-allowed" : "hover:brightness-110"
              }`}
            >
              {bookingLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

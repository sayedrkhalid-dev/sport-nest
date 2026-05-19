"use client";

import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export default function Banner() {
  const liveSlots = [
    { space: "Grand Arena FIFA Turf", time: "Morning slot active", status: "Few slots left" },
    { space: "Olympic Size Swimming Pool", time: "All slots open", status: "Available now" },
    { space: "Center Court Tennis Hub", time: "Evening slot active", status: "Few slots left" },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#131b2e] dark:bg-black text-white">
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1540747737956-37872404a821?auto=format&fit=crop&w=1920&q=80"
          alt="Stadium lights background"
          className="w-full h-full object-cover hero-zoom-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#131b2e] via-[#131b2e]/90 to-transparent" />
      </div>

      <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Banner Text Columns */}
        <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/20 text-primary-fixed border border-primary/30 text-[11px] font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed animate-pulse" />
            Dual-Role Sports Platform
          </span>
          <h1 className="text-headline-lg font-extrabold text-white text-4xl lg:text-5xl leading-tight tracking-tight font-display">
            Where Elite Athletes <br />
            <span className="text-primary dark:text-primary-fixed-dim">Find Elite Spaces</span>
          </h1>
          <p className="text-body-lg text-slate-300 max-w-xl font-medium leading-relaxed">
            Unlock access to premium stadiums, courts, and high-performance training centers. Book
            in real-time, check live slots, and elevate your standard of play.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/facilities"
              className="px-6 py-3.5 bg-primary text-on-primary font-headline-md font-bold rounded-xl hover:bg-primary-container hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              Explore Facilities
              <FiArrowRight />
            </Link>
            <Link
              href="/facilities"
              className="px-6 py-3.5 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-md text-white font-headline-md font-bold rounded-xl hover:bg-white/10 transition-all cursor-pointer"
            >
              Book a Slot
            </Link>
          </div>
        </div>

        {/* Live Availability Column */}
        <div className="lg:col-span-5 animate-fade-in-right">
          <div className="glass-panel border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-headline-md font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                Live Availability
              </h3>
              <span className="text-[10px] font-bold text-primary-fixed uppercase tracking-wider px-2 py-0.5 bg-primary/10 rounded border border-primary/20">
                Real-Time
              </span>
            </div>

            <div className="space-y-4">
              {liveSlots.map((slot, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all flex justify-between items-center gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white line-clamp-1">{slot.space}</h4>
                    <p className="text-xs text-slate-400 font-medium">{slot.time}</p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                      slot.status === "Available now"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {slot.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-400 font-medium">
              <span>Updated 1m ago</span>
              <span className="flex items-center gap-1 text-green-400">
                <FiCheck />
                System Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

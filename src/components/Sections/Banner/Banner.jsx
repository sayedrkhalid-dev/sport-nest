"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck, FiMapPin, FiCalendar } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Banner({ facilities: slides = [] }) {
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#131b2e] dark:bg-black text-white">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full h-full min-h-[550px] lg:min-h-[650px]"
      >
        {slides.map((slide) => {
          const title = slide.title || slide.name || "SportNest Premium Facility";
          const description = slide.description || "High-performance sports venue matching professional standards.";
          const sportBadge = slide.sportBadge || slide.facility_type || "Sports";
          const spaceName = slide.spaceName || slide.location || "Vetted Sports Arena";
          const spaceStatus = slide.spaceStatus || (slide.available_slots?.length > 0 ? "Available now" : "Fully booked");
          const imageSrc = slide.image || "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80";

          const titleWords = title.split(" ");
          const titleFirst = titleWords.length > 2 ? titleWords.slice(0, -2).join(" ") : title;
          const titleSecond = titleWords.length > 2 ? titleWords.slice(-2).join(" ") : "";

          return (
            <SwiperSlide
              key={slide._id || slide.id}
              className="relative w-full h-full min-h-[550px] lg:min-h-[650px] flex items-center"
            >
              {/* Slide Background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover opacity-35"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
              </div>

              {/* Slide Content */}
              <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-16 w-full">
                {/* Banner Text Columns */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/20 text-primary-fixed border border-primary/30 text-[11px] font-bold uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed animate-pulse" />
                    {sportBadge}
                  </span>
                  <h1 className="text-headline-lg font-extrabold text-white text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-display">
                    {titleFirst}{" "}
                    {titleSecond && (
                      <span className="text-primary dark:text-primary-fixed-dim block sm:inline">
                        {titleSecond}
                      </span>
                    )}
                  </h1>
                  <p className="text-body-lg text-slate-300 max-w-xl font-semibold leading-relaxed text-sm md:text-base">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link
                      href="/facilities"
                      className="px-6 py-3.5 bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-slate-950 font-bold rounded-xl hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      Explore Facilities
                      <FiArrowRight />
                    </Link>
                    <Link
                      href="/facilities"
                      className="px-6 py-3.5 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                    >
                      Book a Slot
                    </Link>
                  </div>
                </div>

                {/* Slide Side Card (Live Highlight) */}
                <div className="lg:col-span-5 hidden lg:block">
                  <div className="glass-panel border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-headline-md font-bold text-white flex items-center gap-2 text-base">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                        Live Arena Status
                      </h3>
                      <span className="text-[9px] font-bold text-primary-fixed uppercase tracking-wider px-2 py-0.5 bg-primary/10 rounded border border-primary/20">
                        Real-Time
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary-fixed text-lg font-extrabold shrink-0">
                        ★
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h4 className="font-bold text-sm text-white truncate">{spaceName}</h4>
                        <p className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                          <FiMapPin className="text-primary-fixed" />
                          Premium Vetted Sports Center
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                      <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                        <FiCalendar className="text-green-400" />
                        Availability Check:
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          spaceStatus === "Available now"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {spaceStatus}
                      </span>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-400 font-medium">
                      <span>Updated 1m ago</span>
                      <span className="flex items-center gap-1 text-green-400">
                        <FiCheck />
                        System Sync Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

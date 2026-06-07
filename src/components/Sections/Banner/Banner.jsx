"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck, FiMapPin, FiCalendar } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function Banner({ facilities: slides = [] }) {
  if (!slides || slides.length === 0) return null;

  return (
    <section className="pt-20 relative w-full overflow-hidden bg-[#131b2e] dark:bg-black text-white">
<Swiper
  modules={[Autoplay, EffectFade, Pagination]}
  effect="fade"
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  pagination={{
    clickable: true,
    dynamicBullets: true,
  }}
  style={{
    "--swiper-pagination-bottom": "20px",
  }}
>
        {slides.map((slide) => {
          const title       = slide.title || slide.name || "SportNest Premium Facility";
          const description = slide.description || "High-performance sports venue matching professional standards.";
          const sportBadge  = slide.sportBadge || slide.facility_type || "Sports";
          const spaceName   = slide.spaceName || slide.location || "Vetted Sports Arena";
          const spaceStatus = slide.spaceStatus || (slide.available_slots?.length > 0 ? "Available now" : "Fully booked");
          const imageSrc    = slide.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/3840px-User-avatar.svg.png";

          const titleWords  = title.split(" ");
          const titleFirst  = titleWords.length > 2 ? titleWords.slice(0, -2).join(" ") : title;
          const titleSecond = titleWords.length > 2 ? titleWords.slice(-2).join(" ") : "";

          return (
            <SwiperSlide
              key={slide._id || slide.id}
               className="relative w-full min-h-[480px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] flex items-center"
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0">
<Image
  src={imageSrc}
  alt={title}
  fill
  priority
  sizes="100vw"
  className="object-cover opacity-35"
/>
                {/* gradient: full dark on mobile, fades right on desktop */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90 lg:bg-gradient-to-r lg:from-slate-950 lg:via-slate-950/80 lg:to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop py-12 sm:py-16 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

                {/* Text column */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
                  {/* Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 text-primary-fixed border border-primary/30 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mx-auto lg:mx-0">
                    <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
                    {sportBadge}
                  </span>

                  {/* Heading */}
                  <h1 className="font-extrabold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight font-display break-words">
                    {titleFirst}{" "}
                    {titleSecond && (
                      <span className="text-primary dark:text-primary-fixed-dim">
                        {titleSecond}
                      </span>
                    )}
                  </h1>

                  {/* Description */}
                  <p className="text-slate-300 font-semibold leading-relaxed text-sm md:text-base max-w-xl mx-auto lg:mx-0">
                    {description}
                  </p>

                  {/* Buttons — stack on mobile, row on sm+ */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start w-full sm:w-auto">
                    <Link
                      href="/facilities"
                      className="px-5 sm:px-6 py-3 sm:py-3.5 bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-slate-950 font-bold rounded-xl hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                    >
                      Explore Facilities
                      <FiArrowRight />
                    </Link>
                    <Link
  href="/facilities"
  className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/10 transition-all cursor-pointer text-sm sm:text-base text-center"
>
                      Book a Slot
                    </Link>
                  </div>
                </div>

                {/* Live status card — desktop only */}
                <div className="lg:col-span-5 hidden md:block">
                  <div className="glass-panel border border-white/10 rounded-2xl p-4 lg:p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-white flex items-center gap-2 text-base">
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
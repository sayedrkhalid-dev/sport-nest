"use client";

import Image from "next/image";
import { HiMapPin, HiStar, HiClock, HiCurrencyDollar } from "react-icons/hi2";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const SPORT_COLORS = {
  Football: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Basketball: "bg-orange-100  text-orange-700  dark:bg-orange-900/40  dark:text-orange-300",
  Tennis: "bg-yellow-100  text-yellow-700  dark:bg-yellow-900/40  dark:text-yellow-300",
  Swimming: "bg-sky-100     text-sky-700     dark:bg-sky-900/40     dark:text-sky-300",
  Badminton: "bg-purple-100  text-purple-700  dark:bg-purple-900/40  dark:text-purple-300",
  Cricket: "bg-red-100     text-red-700     dark:bg-red-900/40     dark:text-red-300",
  Volleyball: "bg-pink-100    text-pink-700    dark:bg-pink-900/40    dark:text-pink-300",
  "Table Tennis": "bg-teal-100   text-teal-700    dark:bg-teal-900/40    dark:text-teal-300",
};

export default function FacilityCard({ facility }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  console.log(facility)

  const {
    _id,
    title,
    about,
    facility_type,
    image,
    location,
    price,
    rating,
    badge,
    capacity,
    available_slots,
    owner_email,
    amenities
  } = facility;

  const sportColor = SPORT_COLORS[facility_type] || "bg-surface-container text-on-surface-variant";

  const handleBook = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/facilities/${_id}`);
    } else {
      router.push(`/facilities/${_id}`);
    }
  };

  return (
    <article className="facility-card flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest dark:bg-slate-800/60 border border-outline-variant/40 dark:border-slate-700/50 shadow-premium">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder-sport.jpg"}
          alt={title || "facility image"}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badge */}
        {badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-primary text-on-primary shadow">
            {badge}
          </span>
        )}
        {/* Rating */}
        {rating && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-black/60 text-white backdrop-blur-sm">
            <HiStar className="text-yellow-400 w-3.5 h-3.5" />
            {rating}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Type badge */}
        <span className={`self-start px-2.5 py-0.5 text-xs font-medium rounded-full ${sportColor}`}>
          {facility_type}
        </span>

        <h3 className="font-display font-bold text-base leading-tight text-on-surface dark:text-slate-100 line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-col gap-1.5 text-sm text-on-surface-variant dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <HiMapPin className="w-4 h-4 flex-shrink-0 text-primary" />
            <span className="truncate">{location}</span>
          </div>
          {capacity && (
            <div className="flex items-center gap-1.5">
              <HiClock className="w-4 h-4 flex-shrink-0 text-secondary" />
              <span>Capacity: {capacity}</span>
            </div>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-outline-variant/30 dark:border-slate-700/50">
          <div className="flex items-center gap-1 text-primary dark:text-blue-400">
            <HiCurrencyDollar className="w-5 h-5" />
            <span className="font-bold text-lg">{price}</span>
            <span className="text-xs text-on-surface-variant dark:text-slate-400">/hr</span>
          </div>
          <button
            id={`book-btn-${_id}`}
            onClick={handleBook}
            className="px-4 py-1.5 text-sm font-semibold rounded-xl bg-primary text-on-primary hover:bg-primary/90 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}

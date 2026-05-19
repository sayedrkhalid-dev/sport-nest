"use client";

import { useState } from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FiMapPin, FiHeart } from "react-icons/fi";

export default function FacilityCard({
  id = 1,
  title = "Grand Arena FIFA Turf",
  image = "",
  rating = "4.9",
  location = "West London Sports Hub",
  price = "45",
  sport = "Football",
  type = "Indoor",
  badge = "",
  unit = "hr",
}) {
  const [liked, setLiked] = useState(false);

  const getBadgeStyle = () => {
    switch (badge) {
      case "Available Now":
        return "bg-secondary-container text-on-secondary-container";
      case "Premium Partner":
        return "bg-primary-container text-on-primary-container";
      case "Few Slots Left":
        return "bg-error-container text-on-error-container";
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <article className="facility-card bg-surface-main dark:bg-surface-dim rounded-2xl overflow-hidden flex flex-col h-full border border-stroke-soft dark:border-outline-variant hover:shadow-2xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            src={image}
            alt={title}
          />
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-outline dark:text-outline-variant text-label-md">
            No image available
          </div>
        )}

        {badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-label-sm font-label-sm uppercase z-10 font-bold ${getBadgeStyle()}`}
          >
            {badge}
          </span>
        )}

        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/40 transition-colors z-10 cursor-pointer"
          aria-label="Like facility"
        >
          <FiHeart
            className={`text-lg transition-all ${liked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`}
          />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline-md text-label-md font-bold text-on-surface dark:text-inverse-on-surface line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center text-energy-orange gap-1 shrink-0">
            <FaStar className="text-[14px]" />
            <span className="text-label-sm font-bold">{rating}</span>
          </div>
        </div>

        <p className="text-body-md text-on-surface-variant dark:text-outline-variant text-sm mb-4 flex items-center gap-1.5 line-clamp-1">
          <FiMapPin className="text-[16px] shrink-0" />
          <span>{location}</span>
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-2.5 py-1 bg-primary/5 dark:bg-primary-fixed-dim/10 text-primary dark:text-primary-fixed-dim rounded text-[11px] font-extrabold uppercase tracking-wider">
            {sport}
          </span>
          <span className="px-2.5 py-1 bg-primary/5 dark:bg-primary-fixed-dim/10 text-primary dark:text-primary-fixed-dim rounded text-[11px] font-extrabold uppercase tracking-wider">
            {type}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-stroke-soft dark:border-outline-variant pt-4">
          <div>
            <span className="text-label-sm text-outline dark:text-outline-variant text-[11px] block font-semibold">
              Starting from
            </span>
            <span className="text-headline-md font-extrabold text-primary dark:text-primary-fixed-dim text-lg">
              ${price}
              <span className="text-body-md text-on-surface-variant dark:text-outline-variant font-normal text-sm">
                /{unit}
              </span>
            </span>
          </div>
          <Link
            href={`/facilities/${id}`}
            className="px-5 py-2 bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed font-label-md font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all text-center text-sm"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}

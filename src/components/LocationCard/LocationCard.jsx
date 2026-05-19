"use client";

import { FiMapPin, FiMap } from "react-icons/fi";

export default function LocationCard({
  mapImage = "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
  locationName = "Olympic Park Arena",
  address = "Stratford, London E20 2ST, United Kingdom",
}) {
  return (
    <div className="bg-surface-main dark:bg-surface-dim border border-stroke-soft dark:border-outline-variant rounded-2xl p-6 shadow-premium transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-headline-md font-bold text-on-surface dark:text-inverse-on-surface flex items-center gap-2">
          <FiMap className="text-primary text-xl" />
          Location & Directions
        </h3>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-label-sm font-label-sm text-primary hover:underline cursor-pointer"
        >
          View in Google Maps
        </a>
      </div>

      <div className="relative h-48 rounded-xl overflow-hidden mb-4 border border-stroke-soft dark:border-outline-variant group">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={mapImage}
          alt={`Map location of ${locationName}`}
        />
        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg animate-bounce">
            <FiMapPin className="text-2xl" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 items-start">
        <div className="p-2 rounded-lg bg-primary/5 text-primary shrink-0">
          <FiMapPin className="text-xl" />
        </div>
        <div>
          <h4 className="font-bold text-on-surface dark:text-inverse-on-surface text-sm">
            {locationName}
          </h4>
          <p className="text-xs text-on-surface-variant dark:text-outline-variant mt-0.5">
            {address}
          </p>
        </div>
      </div>
    </div>
  );
}

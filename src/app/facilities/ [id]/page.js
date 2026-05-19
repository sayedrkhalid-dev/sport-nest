"use client";

import { use } from "react";
import Navbar from "@/components/Navbar/Navbar";
import LocationCard from "@/components/LocationCard/LocationCard";
import BookingCard from "@/components/BookingCard/BookingCard";
import Footer from "@/components/Footer/Footer";
import { FaStar } from "react-icons/fa";
import { FiMapPin, FiCheckCircle } from "react-icons/fi";

const mockFacilities = {
  1: {
    title: "Grand Arena FIFA Turf",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    rating: "4.9",
    location: "West London Sports Hub",
    address: "Stratford, London E20 2ST, United Kingdom",
    price: 45,
    sport: "Football",
    type: "Indoor",
    size: "105m × 68m (FIFA Standard)",
    capacity: "Up to 22 players",
    surface: "Premium 3G Artificial Turf",
    lighting: "Floodlight System (500 Lux)",
    amenities: [
      "Shower Rooms",
      "Changing Rooms",
      "Water Dispenser",
      "Free Wi-Fi",
      "Dedicated Parking",
      "First Aid Kit",
    ],
  },
  2: {
    title: "Apex Indoor Basketball Court",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    rating: "4.8",
    location: "East Side Athletic Center",
    address: "Flatbush Avenue, Brooklyn, NY 11217, USA",
    price: 60,
    sport: "Basketball",
    type: "Indoor",
    size: "28m × 15m (NBA Standard)",
    capacity: "Up to 10 players",
    surface: "Polished Hardwood Maple",
    lighting: "Professional LED System",
    amenities: [
      "Changing Rooms",
      "Locker Rooms",
      "AC Cooling",
      "Electronic Scoreboard",
      "Dedicated Parking",
      "First Aid Kit",
    ],
  },
  3: {
    title: "Center Court Tennis Hub",
    image:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80",
    rating: "4.7",
    location: "North London Racket Club",
    address: "Regent's Park Lakesides, London NW1 4NR, UK",
    price: 35,
    sport: "Tennis",
    type: "Outdoor",
    size: "23.77m × 8.23m (ITF Standard)",
    capacity: "Up to 4 players",
    surface: "Acrylic Hard Court",
    lighting: "Floodlight System (300 Lux)",
    amenities: [
      "Water Dispenser",
      "Free Wi-Fi",
      "Dedicated Parking",
      "Shower Rooms",
      "Racket Rental",
      "First Aid Kit",
    ],
  },
};

export default function FacilityDetails({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams?.id || 1;

  const facility = mockFacilities[id] || mockFacilities[1];

  return (
    <>
      <Navbar loggedIn={true} />

      <main className="flex-1 pt-20">
        <section className="relative w-full h-[350px] lg:h-[450px] overflow-hidden text-white">
          <div className="absolute inset-0 z-0">
            <img src={facility.image} alt={facility.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
          </div>

          <div className="max-w-container-max mx-auto h-full px-margin-desktop flex flex-col justify-end pb-8 relative z-10 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-label-sm font-label-sm uppercase tracking-wider font-bold">
                {facility.sport}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-label-sm font-label-sm uppercase tracking-wider font-bold">
                {facility.type}
              </span>
            </div>

            <h1 className="text-headline-lg font-extrabold text-3xl lg:text-5xl font-display">
              {facility.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
              <span className="flex items-center gap-1">
                <FiMapPin className="text-primary-fixed-dim" />
                {facility.location}
              </span>
              <span className="flex items-center gap-1 text-energy-orange">
                <FaStar className="fill-current" />
                {facility.rating} Rating
              </span>
            </div>
          </div>
        </section>

        <section className="w-full py-12 px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8 animate-fade-in-up">
            <div className="bg-surface-main dark:bg-surface-dim border border-stroke-soft dark:border-outline-variant rounded-2xl p-6 shadow-premium">
              <h3 className="text-headline-md font-bold text-on-surface dark:text-inverse-on-surface mb-4">
                Overview & Details
              </h3>
              <p className="text-body-md text-on-surface-variant dark:text-outline-variant leading-relaxed text-sm">
                This elite {facility.sport} facility is engineered for high-performance training,
                league tournaments, and casual club play. Featuring professional-grade surface
                finishing, state-of-the-art illumination, and optimized capacity parameters, it
                provides an outstanding experience for athletes of all levels.
              </p>
            </div>

            <div className="bg-surface-main dark:bg-surface-dim border border-stroke-soft dark:border-outline-variant rounded-2xl p-6 shadow-premium">
              <h3 className="text-headline-md font-bold text-on-surface dark:text-inverse-on-surface mb-6">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-label-md">
                <div className="flex justify-between py-2 border-b border-stroke-soft dark:border-outline-variant">
                  <span className="text-outline dark:text-outline-variant">Field Size:</span>
                  <span className="font-bold text-on-surface dark:text-inverse-on-surface">
                    {facility.size}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-stroke-soft dark:border-outline-variant">
                  <span className="text-outline dark:text-outline-variant">Capacity Limits:</span>
                  <span className="font-bold text-on-surface dark:text-inverse-on-surface">
                    {facility.capacity}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-stroke-soft dark:border-outline-variant">
                  <span className="text-outline dark:text-outline-variant">Surface Texture:</span>
                  <span className="font-bold text-on-surface dark:text-inverse-on-surface">
                    {facility.surface}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-stroke-soft dark:border-outline-variant">
                  <span className="text-outline dark:text-outline-variant">Lighting Specs:</span>
                  <span className="font-bold text-on-surface dark:text-inverse-on-surface">
                    {facility.lighting}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface-main dark:bg-surface-dim border border-stroke-soft dark:border-outline-variant rounded-2xl p-6 shadow-premium">
              <h3 className="text-headline-md font-bold text-on-surface dark:text-inverse-on-surface mb-6">
                Available Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-label-md">
                {facility.amenities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-on-surface-variant dark:text-outline-variant font-medium text-sm"
                  >
                    <FiCheckCircle className="text-green-500 text-lg shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <LocationCard locationName={facility.location} address={facility.address} />
          </div>

          <div className="lg:col-span-4 animate-fade-in-right">
            <div className="sticky top-24">
              <BookingCard basePrice={facility.price} rating={facility.rating} />
            </div>
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </>
  );
}

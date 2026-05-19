"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import FacilityCard from "@/components/FacilityCard/FacilityCard";
import Footer from "@/components/Footer/Footer";
import { FiSearch, FiSliders } from "react-icons/fi";

export default function FacilitiesDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");

  const filterCategories = ["All", "Football", "Basketball", "Tennis", "Swimming", "Badminton"];

  const allFacilities = [
    {
      id: 1,
      title: "Grand Arena FIFA Turf",
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
      rating: "4.9",
      location: "West London Sports Hub",
      price: "45",
      sport: "Football",
      type: "Indoor",
      badge: "Available Now",
    },
    {
      id: 2,
      title: "Apex Indoor Basketball Court",
      image:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
      rating: "4.8",
      location: "East Side Athletic Center",
      price: "60",
      sport: "Basketball",
      type: "Indoor",
      badge: "Premium Partner",
    },
    {
      id: 3,
      title: "Center Court Tennis Hub",
      image:
        "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&q=80",
      rating: "4.7",
      location: "North London Racket Club",
      price: "35",
      sport: "Tennis",
      type: "Outdoor",
      badge: "Few Slots Left",
    },
    {
      id: 4,
      title: "Olympic Size Swimming Pool",
      image:
        "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80",
      rating: "4.9",
      location: "Royal Aquatic Center",
      price: "50",
      sport: "Swimming",
      type: "Indoor",
      badge: "Available Now",
    },
    {
      id: 5,
      title: "Wembley Multi-Sport Arena",
      image:
        "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=600&q=80",
      rating: "4.9",
      location: "Stadium Way, Brent",
      price: "80",
      sport: "Football",
      type: "Indoor",
      badge: "Premium Partner",
    },
    {
      id: 6,
      title: "Stamford Rackets Club",
      image:
        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80",
      rating: "4.6",
      location: "Stamford Bridge Sports Hub",
      price: "25",
      sport: "Badminton",
      type: "Indoor",
      badge: "New Facility",
    },
    {
      id: 7,
      title: "Brooklyn Courts Center",
      image:
        "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&w=600&q=80",
      rating: "4.8",
      location: "Flatbush Avenue, Brooklyn",
      price: "55",
      sport: "Basketball",
      type: "Indoor",
      badge: "Few Slots Left",
    },
    {
      id: 8,
      title: "Lakeside Watersports Pool",
      image:
        "https://images.unsplash.com/photo-1470376619031-a6791e534bf0?auto=format&fit=crop&w=600&q=80",
      rating: "4.5",
      location: "Regent's Park Lakesides",
      price: "40",
      sport: "Swimming",
      type: "Outdoor",
      badge: "Available Now",
    },
  ];

  const filteredFacilities = allFacilities.filter((facility) => {
    const matchesSearch =
      facility.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.sport.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSport = selectedSport === "All" || facility.sport === selectedSport;

    return matchesSearch && matchesSport;
  });

  return (
    <>
      <Navbar loggedIn={true} />

      <main className="flex-1 pt-20">
        <section className="w-full bg-surface-container-low dark:bg-surface-dim py-12 border-b border-stroke-soft dark:border-outline-variant">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <h1 className="text-headline-lg font-headline-lg font-extrabold text-on-surface dark:text-inverse-on-surface mb-3 font-display">
              Explore Athletic Venues
            </h1>
            <p className="text-body-md text-on-surface-variant dark:text-outline-variant max-w-xl">
              Book real-time slot arrangements in elite facilities matching high-performance
              requirements.
            </p>
          </div>
        </section>

        <section className="w-full sticky top-16 z-40 bg-surface/90 backdrop-blur-md border-b border-stroke-soft dark:border-outline-variant py-4 px-margin-desktop">
          <div className="max-w-container-max mx-auto flex flex-col lg:flex-row justify-between gap-4 items-center">
            <div className="relative w-full lg:w-96">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline dark:text-outline-variant text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search arenas, locations, sports..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stroke-soft dark:border-outline bg-surface-main dark:bg-surface-dim dark:text-inverse-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md font-medium shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
              <span className="text-label-sm font-bold text-outline dark:text-outline-variant flex items-center gap-1.5 mr-2 shrink-0">
                <FiSliders />
                Sports:
              </span>
              {filterCategories.map((sport) => {
                const isActive = selectedSport === sport;
                return (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`px-4 py-2 rounded-xl text-label-sm font-bold border transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? "bg-primary border-primary text-on-primary shadow-sm"
                        : "bg-surface-main border-stroke-soft dark:border-outline text-on-surface-variant dark:text-outline-variant hover:border-primary"
                    }`}
                  >
                    {sport}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full py-12 px-margin-desktop max-w-container-max mx-auto">
          {filteredFacilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredFacilities.map((facility) => (
                <FacilityCard key={facility.id} {...facility} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 flex flex-col items-center justify-center border border-dashed border-stroke-soft dark:border-outline-variant rounded-2xl bg-surface-container-low dark:bg-surface-dim">
              <span className="text-headline-md font-extrabold text-outline dark:text-outline-variant mb-2">
                No facilities found
              </span>
              <p className="text-body-md text-on-surface-variant dark:text-outline-variant max-w-xs text-sm">
                Try adjusting your search filters or clear inputs to see all elite sports spaces.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

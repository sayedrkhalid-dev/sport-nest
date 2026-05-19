"use client";

import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/components/Banner/Banner";
import SponsorBanner from "@/components/SponsorBanner/SponsorBanner";
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import FacilityCard from "@/components/FacilityCard/FacilityCard";
import Footer from "@/components/Footer/Footer";
import { FiCheckCircle } from "react-icons/fi";

export default function Home() {
  const featuredFacilities = [
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
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-20">
        <Banner />
        <SponsorBanner />
        <CategoryCard />

        {/* Featured Section */}
        <section className="w-full py-16 px-margin-desktop max-w-container-max mx-auto border-t border-stroke-soft dark:border-outline-variant">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-sm font-label-sm uppercase tracking-wider block w-fit mb-3">
                Featured Facilities
              </span>
              <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface dark:text-inverse-on-surface">
                Elite Spaces Available Today
              </h2>
            </div>
            <p className="text-body-md text-on-surface-variant dark:text-outline-variant max-w-md mt-4 md:mt-0">
              Vetted by professionals. Explore top featured courts and pitches available now for
              bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFacilities.map((facility) => (
              <FacilityCard key={facility.id} {...facility} />
            ))}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="w-full py-16 px-margin-desktop bg-surface-container-low dark:bg-surface-dim border-y border-stroke-soft dark:border-outline-variant">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-sm font-label-sm uppercase tracking-wider block w-fit mb-3">
                Why SportNest?
              </span>
              <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface dark:text-inverse-on-surface mb-6">
                Engineered for High-Performance Athletics
              </h2>
              <p className="text-body-md text-on-surface-variant dark:text-outline-variant leading-relaxed mb-8">
                SportNest is a dual-role platform serving both high-performance sports organizers
                and facility managers. We simplify arena bookings while maximizing facility
                utilization.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <FiCheckCircle className="text-primary text-xl shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-on-surface dark:text-inverse-on-surface text-sm">
                      Real-Time Availability
                    </h4>
                    <p className="text-xs text-on-surface-variant dark:text-outline-variant mt-0.5">
                      Never double book. Our live calendars are synchronized in real-time.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <FiCheckCircle className="text-primary text-xl shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-on-surface dark:text-inverse-on-surface text-sm">
                      Dual-Role Functionality
                    </h4>
                    <p className="text-xs text-on-surface-variant dark:text-outline-variant mt-0.5">
                      Switch between player bookings and host dashboard manager in a single tap.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <FiCheckCircle className="text-primary text-xl shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-on-surface dark:text-inverse-on-surface text-sm">
                      Vetted Sports Spaces
                    </h4>
                    <p className="text-xs text-on-surface-variant dark:text-outline-variant mt-0.5">
                      Each listing is thoroughly verified for surface quality, lighting, and
                      amenities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-96">
              <img
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
                alt="Elite training court"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75 flex items-center justify-center">
                <div className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-2xl border border-stroke-soft max-w-xs text-center shadow-lg animate-bounce">
                  <span className="text-energy-orange text-3xl font-extrabold block mb-1">100%</span>
                  <span className="text-xs text-on-surface-variant dark:text-outline-variant font-bold uppercase tracking-widest">
                    Verified Arenas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

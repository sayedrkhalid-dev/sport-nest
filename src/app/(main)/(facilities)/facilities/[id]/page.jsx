import LocationCard from "@/components/UI/LocationCard/LocationCard";
import BookingCard from "@/components/UI/BookingCard/BookingCard";
import PrivateRoute from "@/components/UI/PrivateRoute/PrivateRoute";
import { FaStar } from "react-icons/fa";
import { FiMapPin, FiCheckCircle } from "react-icons/fi";
import Image from "next/image";
import { getFacilityById } from "@/lib/api";

export const revalidate = 0;

export default async function FacilityDetails({ params }) {
  const { _id: id } = await params;
  let facility = null;

  try {
    facility = await getFacilityById(id);
  } catch (err) {
    console.error("Failed to fetch facility details:", err);
  }

  if (!facility) {
    return (
      <main className="flex-1 pt-24 pb-20 text-center">
        <h2 className="text-xl font-bold text-red-500">Facility Not Found</h2>
        <p className="text-slate-500 mt-2">The requested facility could not be retrieved.</p>
      </main>
    );
  }

  return (
    <PrivateRoute>
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative w-full h-[350px] lg:h-[450px] overflow-hidden text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src={facility.image || "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"}
              alt={facility.title || facility.name}
              className="w-full h-full object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
          </div>

          <div className="max-w-container-max mx-auto h-full px-4 sm:px-8 lg:px-margin-desktop flex flex-col justify-end pb-8 relative z-10 space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-label-sm font-label-sm uppercase tracking-wider font-bold">
                {facility.sport || facility.facility_type || "Sports"}
              </span>
              {facility.court_type && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-label-sm font-label-sm uppercase tracking-wider font-bold">
                  {facility.court_type || facility.type}
                </span>
              )}
            </div>

            <h1 className="text-headline-lg font-extrabold text-3xl lg:text-5xl font-display">
              {facility.title || facility.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
              <span className="flex items-center gap-1">
                <FiMapPin className="text-primary-fixed-dim" />
                {facility.location}
              </span>
              <span className="flex items-center gap-1 text-energy-orange">
                <FaStar className="fill-current" />
                {facility.rating || "5.0"} Rating
              </span>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="w-full py-12 px-4 sm:px-8 lg:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-8 space-y-8 animate-fade-in-up">
            {/* Overview */}
            <div className="bg-surface-main dark:bg-surface-dim border border-stroke-soft dark:border-outline-variant rounded-2xl p-6 shadow-premium">
              <h3 className="text-headline-md font-bold text-on-surface dark:text-inverse-on-surface mb-4">
                Overview &amp; Details
              </h3>
              <p className="text-body-md text-on-surface-variant dark:text-outline-variant leading-relaxed text-sm">
                {facility.description || facility.about}
              </p>
            </div>

            {/* Technical Specs */}
            <div className="bg-surface-main dark:bg-surface-dim border border-stroke-soft dark:border-outline-variant rounded-2xl p-6 shadow-premium">
              <h3 className="text-headline-md font-bold text-on-surface dark:text-inverse-on-surface mb-6">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-label-md">
                {[
                  { label: "Field Size", value: facility.size || "Standard Size" },
                  { label: "Capacity Limits", value: facility.capacity || "Unlimited" },
                  { label: "Surface Texture", value: facility.surface || "Premium" },
                  { label: "Lighting Specs", value: facility.lighting || "Pro-Grade LED" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between py-2 border-b border-stroke-soft dark:border-outline-variant"
                  >
                    <span className="text-outline dark:text-outline-variant">{label}:</span>
                    <span className="font-bold text-on-surface dark:text-inverse-on-surface">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {facility.amenities?.length > 0 && (
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
            )}

            {/* Location */}
            <LocationCard
              locationName={facility.location}
              address={facility.address || facility.location}
            />
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-4 animate-fade-in-right">
            <div className="sticky top-24">
              <BookingCard facility={facility} />
            </div>
          </div>
        </section>
      </main>
    </PrivateRoute>
  );
}
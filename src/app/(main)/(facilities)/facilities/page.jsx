import PopularFacilities from "@/components/Sections/PopularFacilities/PopularFacilities";
import FacilitiesList from "@/components/Sections/FacilitiesList/FacilitiesList";
import { getFacilities } from "@/lib/api";

export const revalidate = 0;

export default async function FacilitiesPage({ searchParams }) {
  const params = await searchParams;

  // Build query params for the API request
const query = {
  search: params.search || "",
  facility_type: params.type || "",
  location: params.location || "",
};

  if (params.indoor === "true") query.indoor = "true";
  if (params.outdoor === "true") query.outdoor = "true";

  let facilities = [];
  try {
    facilities = await getFacilities(query);
  } catch (err) {
    console.error("Failed to fetch facilities:", err);
  }

  // Handle client-side sorting in server component if backend doesn't support it directly
  const sortBy = params.sortBy || "Newest";
  const sortedFacilities = [...facilities].sort((a, b) => {
    if (sortBy === "PriceLowToHigh") {
      return (a.price_per_hour || a.price || 0) - (b.price_per_hour || b.price || 0);
    }
    if (sortBy === "PriceHighToLow") {
      return (b.price_per_hour || b.price || 0) - (a.price_per_hour || a.price || 0);
    }
    if (sortBy === "TopRated") {
      return (b.rating || 0) - (a.rating || 0);
    }
    // Default: Newest first
    return new Date(b.createdAt || b.id || 0) - new Date(a.createdAt || a.id || 0);
  });

  // Split into popular (rating >= 4.5) and others
  const popular = sortedFacilities.filter((f) => (f.rating || 0) >= 4.5).slice(0, 3);

  return (
    <>
      <PopularFacilities facilities={popular} />
      <FacilitiesList facilities={sortedFacilities} />
    </>
  );
}

import Banner from "@/components/Sections/Banner/Banner";
import SponsorBanner from "@/components/Sections/SponsorBanner/SponsorBanner";
import Categories from "@/components/Sections/Categories/Categories";
import FeaturedFacilities from "@/components/Sections/FeaturedFacilities/FeaturedFacilities";
import WhyChooseUs from "@/components/Sections/WhyChooseUs/WhyChooseUs";
import ProCoaching from "@/components/Sections/ProCoaching/ProCoaching";
import { getFacilities } from "@/lib/api";

export const revalidate = 0;

export default async function HomePage() {
  let facilities = [];
  try {
    facilities = await getFacilities();
  } catch (err) {
    console.error("Failed to fetch facilities for homepage:", err);
  }

  // Showcase up to 6 facilities in the Featured section
  const featured = facilities.slice(0, 6);
  // Show up to 3 facilities in the Hero Banner
  const heroFacilities = facilities.slice(0, 3);

  const sponsors = [
    { text: "Nike" },
    { text: "Adidas" },
    { text: "Puma" },
    { text: "Under Armour" },
    { text: "Reebok" },
  ];

  return (
    <>
      {/* Dynamic Hero banner */}
      <Banner facilities={heroFacilities} />

      {/* Dynamic Sponsor banner */}
      <SponsorBanner sponsors={sponsors} />

      {/* Dynamic Category Card browser */}
      <Categories />

      {/* Featured Facilities Section */}
      <FeaturedFacilities facilities={featured} />

      {/* Professional Coaching Partners Network */}
      <ProCoaching />

      {/* Why Choose Us (Kinetic Tech Showcase) */}
      <WhyChooseUs />
    </>
  );
}

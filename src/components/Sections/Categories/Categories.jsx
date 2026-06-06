"use client";

import { useRouter } from "next/navigation";
import CategoryCard from "@/components/UI/CategoryCard/CategoryCard";

export default function Categories() {
  const router = useRouter();

  const categories = [
    { name: "Football" },
    { name: "Basketball" },
    { name: "Tennis" },
    { name: "Swimming" },
    { name: "Badminton" },
  ];

  const handleCategoryClick = (name) => {
    router.push(`/facilities?type=${encodeURIComponent(name)}`);
  };

  return (
    <section className="w-full py-16 px-margin-desktop max-w-container-max mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
        <div>
          <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed-dim rounded-full text-label-sm font-label-sm uppercase tracking-wider block w-fit mb-3">
            Top Sports
          </span>
          <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface dark:text-white text-2xl md:text-3xl font-display">
            Browse by Sports Category
          </h2>
        </div>
        <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-md mt-4 md:mt-0 text-sm font-semibold">
          Find specialized professional environments engineered for maximum performance, regular
          club play, or training.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
            onClick={handleCategoryClick}
          />
        ))}
      </div>
    </section>
  );
}

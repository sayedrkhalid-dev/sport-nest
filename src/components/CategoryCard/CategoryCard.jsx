"use client";

import { IoSportsSoccer, IoBasketball, IoSwim } from "react-icons/io5";
import { GiTennisRacket, GiShuttlecock } from "react-icons/gi";

export default function CategoryCard({ onSelectCategory }) {
  const categories = [
    {
      name: "Football",
      slots: "12 Arenas Available",
      icon: IoSportsSoccer,
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Basketball",
      slots: "8 Courts Available",
      icon: IoBasketball,
      color: "from-orange-500 to-amber-600",
    },
    {
      name: "Swimming",
      slots: "4 Pools Available",
      icon: IoSwim,
      color: "from-cyan-500 to-blue-600",
    },
    {
      name: "Tennis",
      slots: "6 Courts Available",
      icon: GiTennisRacket,
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: "Badminton",
      slots: "9 Halls Available",
      icon: GiShuttlecock,
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <section className="w-full py-16 px-margin-desktop max-w-container-max mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
        <div>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-sm font-label-sm uppercase tracking-wider block w-fit mb-3">
            Top Sports
          </span>
          <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface dark:text-inverse-on-surface">
            Browse by Sports Category
          </h2>
        </div>
        <p className="text-body-md text-on-surface-variant dark:text-outline-variant max-w-md mt-4 md:mt-0">
          Find specialized professional environments engineered for maximum performance, regular club
          play, or training.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory && onSelectCategory(cat.name)}
              className="flex flex-col items-center justify-center p-6 bg-surface-main dark:bg-surface-dim border border-stroke-soft dark:border-outline-variant rounded-2xl hover:border-primary dark:hover:border-primary-fixed hover:-translate-y-1 hover:shadow-premium transition-all duration-300 group cursor-pointer"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon className="text-3xl" />
              </div>
              <h3 className="font-headline-md text-label-md font-bold text-on-surface dark:text-inverse-on-surface mb-1">
                {cat.name}
              </h3>
              <span className="text-label-sm text-on-surface-variant dark:text-outline-variant text-[11px]">
                {cat.slots}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

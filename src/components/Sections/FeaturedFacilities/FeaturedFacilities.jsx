"use client";

import FacilityCard from "@/components/UI/FacilityCard/FacilityCard";
import { motion } from "framer-motion";

// Animation variants
const headingVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const subVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function FeaturedFacilities({ facilities = [] }) {
  return (
    <section className="w-full py-16 px-4 sm:px-8 lg:px-margin-desktop max-w-container-max mx-auto border-t border-stroke-soft dark:border-slate-800">
      {/* Heading row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed-dim rounded-full text-[11px] font-bold uppercase tracking-wider block w-fit mb-3">
            Featured Facilities
          </span>
          <h2 className="text-headline-lg font-extrabold text-on-surface dark:text-white text-2xl md:text-3xl font-display">
            Elite Spaces Available Today
          </h2>
        </motion.div>

        <motion.p
          variants={subVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-on-surface-variant dark:text-slate-400 max-w-md mt-4 md:mt-0 text-sm font-semibold"
        >
          Vetted by professionals. Explore top featured courts and pitches available now for
          bookings.
        </motion.p>
      </div>

      {/* Cards grid */}
      {facilities.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {facilities.map((facility, index) => (
            <FacilityCard
              key={facility._id || facility.id}
              facility={facility}
              index={index}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-surface-container-low dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-3xl text-outline dark:text-slate-400 text-sm font-semibold"
        >
          No featured facilities available at the moment.
        </motion.div>
      )}
    </section>
  );
}
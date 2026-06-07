"use client"

import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const features = [
  {
    title: "Real-Time Availability",
    desc: "Never double book. Our live calendars are synchronized in real-time.",
  },
  {
    title: "Dual-Role Functionality",
    desc: "Switch between player bookings and host dashboard manager in a single tap.",
  },
  {
    title: "Vetted Sports Spaces",
    desc: "Each listing is thoroughly verified for surface quality, lighting, and amenities.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
  }),
};

export default function WhyChooseUs() {
  return (
    <section className="w-full py-16 px-4 sm:px-8 lg:px-margin-desktop bg-surface-container-low dark:bg-slate-900/40 border-y border-stroke-soft dark:border-slate-800">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Text side */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed-dim rounded-full text-[11px] font-bold uppercase tracking-wider block w-fit mb-3">
              Why SportNest?
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-on-surface dark:text-white mb-6">
              Engineered for High-Performance Athletics
            </h2>
            <p className="text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed mb-8">
              SportNest is a dual-role platform serving both high-performance sports organizers and
              facility managers. We simplify arena bookings while maximizing facility utilization.
            </p>
          </motion.div>

          {/* Feature list — each item animates in with stagger */}
          <div className="space-y-4">
            {features.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex gap-3"
              >
                <FiCheckCircle className="text-primary dark:text-primary-fixed-dim text-xl shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-on-surface dark:text-white text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image side — scale in */}
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-96"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
            alt="Elite training court"
            className="w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75 flex items-center justify-center">
            <motion.div
              className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-2xl border border-stroke-soft dark:border-slate-800 max-w-xs text-center shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <span className="text-energy-orange text-3xl font-extrabold block mb-1 font-display">
                100%
              </span>
              <span className="text-[10px] text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-widest">
                Verified Arenas
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
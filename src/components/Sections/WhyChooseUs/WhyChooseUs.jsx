import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";

export default function WhyChooseUs() {
  return (
    <section className="w-full py-16 px-margin-desktop bg-surface-container-low dark:bg-slate-900/40 border-y border-stroke-soft dark:border-slate-800">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
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

          <div className="space-y-4">
            {[
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
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <FiCheckCircle className="text-primary dark:text-primary-fixed-dim text-xl shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-on-surface dark:text-white text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-96">
          <Image
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
            alt="Elite training court"
            className="w-full h-full object-cover"
            fill
          />

          <div className="absolute inset-0 bg-primary/20 backdrop-brightness-75 flex items-center justify-center">
            <div className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-2xl border border-stroke-soft dark:border-slate-800 max-w-xs text-center shadow-lg">
              <span className="text-energy-orange text-3xl font-extrabold block mb-1 font-display">
                100%
              </span>
              <span className="text-[10px] text-on-surface-variant dark:text-slate-400 font-bold uppercase tracking-widest">
                Verified Arenas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

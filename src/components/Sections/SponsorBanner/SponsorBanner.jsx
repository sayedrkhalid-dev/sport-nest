import Marquee from "react-fast-marquee";
import SponsorCard from "@/components/UI/SponsorCard/SponsorCard";

export default function SponsorBanner({ sponsors = [] }) {
  if (!sponsors || sponsors.length === 0) return null;

  return (
    <section className="w-full py-8 bg-surface-container-low dark:bg-slate-900 border-y border-stroke-soft dark:border-slate-800 overflow-hidden relative">
      <div className="max-w-container-max mx-auto px-margin-desktop mb-4">
        <h2 className="text-center text-[11px] font-bold text-outline dark:text-slate-400 tracking-widest uppercase">
          Trusted by Professional Leagues & Elite Clubs
        </h2>
      </div>
      <div className="w-full relative py-2">
        <Marquee speed={40} gradient={false} pauseOnHover={true}>
          <div className="flex gap-16 items-center whitespace-nowrap">
            {sponsors.map((sponsor, index) => (
              <SponsorCard key={sponsor.id || sponsor.text || index} sponsor={sponsor} />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}

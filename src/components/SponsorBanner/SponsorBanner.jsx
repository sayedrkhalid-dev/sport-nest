"use client";

export default function SponsorBanner() {
  const sponsors = [
    { name: "Sponsor 1", text: "SPORT HUB" },
    { name: "Sponsor 2", text: "VITAL ENERGY" },
    { name: "Sponsor 3", text: "ARENA GEAR" },
    { name: "Sponsor 4", text: "FIT GLIDE" },
    { name: "Sponsor 5", text: "NEXT STEP" },
    { name: "Sponsor 6", text: "ELITE CORE" },
  ];

  const list = [...sponsors, ...sponsors];

  return (
    <section className="w-full py-8 bg-surface-container-low dark:bg-surface-dim border-y border-stroke-soft dark:border-outline-variant overflow-hidden relative">
      <div className="max-w-container-max mx-auto px-margin-desktop mb-4">
        <h2 className="text-center text-label-sm font-label-sm text-outline dark:text-outline-variant tracking-widest uppercase">
          Trusted by Professional Leagues & Elite Clubs
        </h2>
      </div>
      <div className="flex w-full overflow-hidden relative">
        <div className="flex gap-16 items-center animate-infinite-scroll whitespace-nowrap">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-headline-sm font-extrabold text-on-surface-variant/45 dark:text-outline-variant/30 select-none hover:text-primary transition-colors py-2"
            >
              <div className="w-2.5 h-2.5 bg-primary/20 dark:bg-primary-fixed-dim/25 rounded-full" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

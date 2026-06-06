import TrainerCard from "@/components/UI/TrainerCard/TrainerCard";

const DEFAULT_TRAINERS = [
  {
    name: "Coach Marcus Vance",
    sport: "Football",
    nationality: "British",
    club: "Elite Academy",
    experience: "12 years",
    rating: 4.9,
    sessions: 1420,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bio: "UEFA 'A' licensed coach specializing in youth tactical development and high-intensity attacking setups.",
  },
  {
    name: "Coach Sarah Jenkins",
    sport: "Tennis",
    nationality: "American",
    club: "Grand Slam Club",
    experience: "8 years",
    rating: 4.8,
    sessions: 980,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    bio: "Former WTA circuit player focusing on mechanical correction, footwork drills, and tournament mental preparation.",
  },
  {
    name: "Coach David Kim",
    sport: "Basketball",
    nationality: "Korean-American",
    club: "Metro Titans",
    experience: "10 years",
    rating: 5.0,
    sessions: 1850,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    bio: "Specialist trainer in shooting mechanics, floor vision, and agility optimization for high-performance point guards.",
  },
];

export default function ProCoaching({ trainers = [] }) {
  const displayTrainers = trainers && trainers.length > 0 ? trainers : DEFAULT_TRAINERS;

  return (
    <section className="w-full py-16 px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed-dim rounded-full text-[11px] font-bold uppercase tracking-wider block w-fit mb-3 mx-auto">
          Pro Network
        </span>
        <h2 className="text-headline-lg font-headline-lg font-extrabold text-on-surface dark:text-white text-2xl md:text-3xl font-display">
          Connect With Elite Trainers
        </h2>
        <p className="text-body-md text-on-surface-variant dark:text-slate-400 mt-3 text-xs font-semibold">
          Optimize your booking slot by pairing it with a professional skills trainer or UEFA
          licensed tactical coach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayTrainers.map((trainer) => (
          <TrainerCard key={trainer.name} trainer={trainer} />
        ))}
      </div>
    </section>
  );
}

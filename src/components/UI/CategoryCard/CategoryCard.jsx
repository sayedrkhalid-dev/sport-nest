import {
  GiSoccerBall,
  GiBasketballBall,
  GiTennisBall,
  GiSwimfins,
  GiCricketBat,
  GiVolleyballBall,
  GiShuttlecock,
} from "react-icons/gi";
import { MdSportsTennis } from "react-icons/md";

const SPORT_ICONS = {
  Football: {
    icon: GiSoccerBall,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  Basketball: {
    icon: GiBasketballBall,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  Tennis: {
    icon: GiTennisBall,
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  Swimming: { icon: GiSwimfins, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-900/20" },
  Badminton: {
    icon: GiShuttlecock,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  Cricket: { icon: GiCricketBat, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
  Volleyball: {
    icon: GiVolleyballBall,
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
  "Table Tennis": {
    icon: MdSportsTennis,
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-teal-900/20",
  },
};

export default function CategoryCard({ category, onClick, isActive }) {
  const { name } = category;
  const config = SPORT_ICONS[name] || {
    icon: GiSoccerBall,
    color: "text-primary",
    bg: "bg-surface-container",
  };
  const Icon = config.icon;

  return (
    <button
      id={`category-${name.toLowerCase().replace(/\s/g, "-")}`}
      onClick={() => onClick?.(name)}
      className={`
        flex flex-col items-center gap-2.5 p-4 rounded-2xl border cursor-pointer
        transition-all duration-200 hover:-translate-y-1 hover:shadow-md
        ${
          isActive
            ? "border-primary bg-primary text-on-primary shadow-md"
            : "border-outline-variant/40 dark:border-slate-700/50 bg-surface-container-lowest dark:bg-slate-800/60 text-on-surface dark:text-slate-100 hover:border-primary/50"
        }
      `}
    >
      <div className={`p-3 rounded-xl ${isActive ? "bg-white/20" : config.bg}`}>
        <Icon className={`w-7 h-7 ${isActive ? "text-white" : config.color}`} />
      </div>
      <span className="text-sm font-semibold whitespace-nowrap">{name}</span>
    </button>
  );
}

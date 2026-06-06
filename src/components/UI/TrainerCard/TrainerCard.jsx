import Image from "next/image";
import { HiStar } from "react-icons/hi2";

export default function TrainerCard({ trainer }) {
  const { name, sport, nationality, club, experience, rating, sessions, photo, bio } = trainer;

  return (
    <article className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-surface-container-lowest dark:bg-slate-800/60 border border-outline-variant/40 dark:border-slate-700/50 shadow-premium hover:-translate-y-1 transition-transform duration-200">
      {/* Avatar */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20 flex-shrink-0">
        <Image
          src={photo || "/placeholder-avatar.jpg"}
          alt={name}
          fill
          className="object-cover object-top"
          sizes="96px"
        />
      </div>

      <div className="space-y-1">
        <h3 className="font-display font-bold text-on-surface dark:text-slate-100 text-base">
          {name}
        </h3>
        <p className="text-sm font-medium text-primary dark:text-blue-400">{sport}</p>
        <p className="text-xs text-on-surface-variant dark:text-slate-400">{club}</p>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <HiStar className="w-4 h-4 text-yellow-400" />
          <span className="font-semibold text-on-surface dark:text-slate-100">{rating}</span>
        </div>
        <div className="w-px h-4 bg-outline-variant/50" />
        <span className="text-on-surface-variant dark:text-slate-400">{experience}</span>
        {sessions && (
          <>
            <div className="w-px h-4 bg-outline-variant/50" />
            <span className="text-on-surface-variant dark:text-slate-400">{sessions?.toLocaleString()} sessions</span>
          </>
        )}
      </div>

      {bio && (
        <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed line-clamp-3">
          {bio}
        </p>
      )}
    </article>
  );
}

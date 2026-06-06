const SponsorCard = ({ sponsor }) => {
  return (
    <div className="flex items-center gap-2 text-xl md:text-2xl font-extrabold text-on-surface-variant/40 dark:text-slate-500/30 select-none hover:text-primary dark:hover:text-primary-fixed-dim transition-colors mr-16">
      <div className="w-2.5 h-2.5 bg-primary/20 dark:bg-primary-fixed-dim/25 rounded-full shrink-0" />
      <span>{sponsor.text}</span>
    </div>
  );
};

export default SponsorCard;

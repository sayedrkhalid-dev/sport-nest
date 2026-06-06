export default function LoadingSpinner({ fullPage = false, size = "md" }) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-[3px]",
    lg: "w-16 h-16 border-4",
  };

  const spinner = (
    <span
      className={`${sizes[size]} inline-block rounded-full border-primary/20 border-t-primary animate-spin`}
      role="status"
      aria-label="Loading…"
    />
  );

  if (!fullPage) return spinner;

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      {spinner}
    </div>
  );
}

import Link from "next/link";
import { FiHome, FiHelpCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-md w-full px-6 text-center space-y-8 animate-fade-in-up">
        {/* Big Code */}
        <div className="space-y-2">
          <h1 className="text-8xl md:text-9xl font-black font-display tracking-widest text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-bold font-display text-slate-100">
            Out of Bounds
          </h2>
        </div>

        {/* Message */}
        <p className="text-slate-450 text-sm leading-relaxed max-w-sm mx-auto font-medium">
          The sports arena or dashboard path you are looking for does not exist or has been relocated by the system.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiHome className="text-lg" />
            <span>Return Home</span>
          </Link>
          <a
            href="#"
            className="w-full sm:w-auto px-6 py-3 border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiHelpCircle className="text-lg" />
            <span>Get Support</span>
          </a>
        </div>
      </div>
    </main>
  );
}

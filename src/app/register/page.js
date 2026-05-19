"use client";

import RegisterForm from "@/components/RegisterForm/RegisterForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#0b0f19] relative overflow-hidden px-4 py-12">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white font-label-md font-bold text-sm transition-colors"
        >
          <FiArrowLeft />
          Back to Home
        </Link>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <Link
          href="/"
          className="text-headline-md font-extrabold text-primary dark:text-primary-fixed-dim mb-8 text-2xl tracking-wider hover:opacity-90 transition-all font-display"
        >
          SportNest
        </Link>
        <RegisterForm />
      </div>
    </main>
  );
}

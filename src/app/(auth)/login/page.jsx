"use client";

import LoginForm from "@/components/UI/LoginForm/LoginForm";
import Link from "next/link";
import { FiArrowLeft, FiLayers } from "react-icons/fi";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background dark:bg-slate-950 text-on-surface">
      {/* Back to Home Button floating on top left */}
      <div className="absolute top-6 left-6 z-30">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/80 hover:text-white font-label-md font-bold text-xs bg-slate-950/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 hover:bg-slate-950/60 transition-all cursor-pointer shadow-md"
        >
          <FiArrowLeft className="text-sm" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Left Side: Refined Sports Background & Hero */}
      <section className="relative w-full md:w-1/2 lg:w-[60%] min-h-[350px] md:min-h-screen overflow-hidden">
        {/* Background Image with subtle zoom/pan */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-105 hero-zoom-bg pointer-events-none"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDeYnyxkeZq2vAz_CYKejwAdkDpYEJLdGJcZfJ5i1RRIyPjMCpHm36F8NaZqwxqBRg52TlIaQ75v7QaQsXR7fxLVxepNZmRM_UqmlbTTvFW870Z4xgN59wZAHBnm4RBD2svkpj1yvboFjBa_yTHzY-qNMd60fF_VQ1GPM-KB3ONZoJfybS_HAV_NjDQgUGkSJsaKHdrL6LtLgxoSoJ8CZ53mjNlJhQiN1-dkAZHlnx4ZKJou_ONONpceJRhc4QLGQaWzKfP1NmMOZFP')",
          }}
        />
        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/45 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/60" />

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-between p-8 md:p-16 z-20 min-h-[350px] md:min-h-screen">
          {/* Branding Anchor */}
          <div>
            <div className="flex items-center gap-2 group cursor-default">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-lg group-hover:scale-105 transition-transform">
                <FiLayers className="text-white text-xl" />
              </div>
              <span className="text-xl font-headline-md font-extrabold text-white tracking-tight font-display">
                SportNest
              </span>
            </div>
          </div>

          {/* Main Value Proposition */}
          <div className="max-w-xl my-auto pt-16 md:pt-0">
            <h1 className="text-white font-display text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Elevate Your Game at <span className="text-secondary-fixed">Elite Facilities</span>.
            </h1>
            <p className="text-slate-300 font-body-lg mb-8 max-w-md text-sm md:text-base">
              The ultimate high-performance sports management platform for elite facility operators
              and dedicated athletes.
            </p>

            {/* Performance Metrics / Social Proof */}
            <div className="grid grid-cols-2 gap-6 max-w-sm">
              <div className="glass-panel rounded-xl p-4">
                <span className="block text-secondary-fixed font-headline-md text-2xl font-extrabold mb-0.5">
                  500+
                </span>
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-wider">
                  Premium Venues
                </span>
              </div>
              <div className="glass-panel rounded-xl p-4">
                <span className="block text-secondary-fixed font-headline-md text-2xl font-extrabold mb-0.5">
                  24/7
                </span>
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-wider">
                  Instant Booking
                </span>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="hidden md:block">
            <p className="text-slate-400 text-xs font-semibold">
              Trusted by professional athletic associations worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Right Side: Form Container */}
      <section className="w-full md:w-1/2 lg:w-[40%] flex items-center justify-center bg-white dark:bg-slate-900 px-8 py-16 md:px-16 min-h-[50vh] md:min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-headline-lg font-headline-lg text-on-surface dark:text-white mb-2 text-2xl md:text-3xl font-extrabold">
              Welcome Back
            </h2>
            <p className="text-on-surface-variant dark:text-outline-variant text-sm font-medium">
              Please enter your credentials to continue.
            </p>
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}

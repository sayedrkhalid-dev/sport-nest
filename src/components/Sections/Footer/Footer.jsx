"use client";

import Link from "next/link";
import { FiGlobe, FiShare2, FiUsers } from "react-icons/fi";

export default function Footer({ variant = "premium" }) {
  const isSimple = variant === "simple";

  if (isSimple) {
    return (
      <footer className="w-full bg-surface-container-high dark:bg-inverse-surface border-t border-stroke-soft dark:border-outline mt-auto">
        <div className="max-w-container-max mx-auto px-4 sm:px-8 lg:px-margin-desktop py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <Link href="/" className="font-bold text-primary dark:text-primary-fixed-dim text-lg">
              SportNest
            </Link>
            <p className="text-on-surface-variant dark:text-outline-variant mt-1 text-sm">
              Precision sports booking for elite athletes.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {["Contact Us", "Privacy Policy", "Terms of Service", "Twitter", "Instagram"].map((item) => (
              <a key={item} href="#" className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-all hover:underline">
                {item}
              </a>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant dark:text-outline-variant opacity-80 whitespace-nowrap">
            © 2026 SportNest. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-surface-container-high dark:bg-inverse-surface border-t border-stroke-soft dark:border-outline mt-auto">
      <div className="max-w-container-max mx-auto px-4 sm:px-8 lg:px-margin-desktop py-10 lg:py-16">

        {/* ── Main Grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-10 lg:mb-16">

          {/* Company — full width on mobile */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="font-bold text-primary dark:text-primary-fixed-dim text-xl block mb-4"
            >
              SportNest
            </Link>
            <p className="text-on-surface-variant dark:text-outline-variant text-sm max-w-sm mb-6 leading-relaxed">
              Connecting athletes with premium professional facilities globally. Elevate your game
              with our elite network of stadiums and courts.
            </p>
            <div className="flex gap-3">
              {[FiGlobe, FiShare2, FiUsers].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="text-xs font-bold text-on-surface dark:text-inverse-on-surface mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3">
              {["Contact Us", "Help Center", "Safety Policy", "Community"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div className="col-span-1">
            <h4 className="text-xs font-bold text-on-surface dark:text-inverse-on-surface mb-4 uppercase tracking-wider">
              Sports
            </h4>
            <ul className="space-y-3">
              {["Football", "Basketball", "Tennis", "Swimming"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter — full width on mobile */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs font-bold text-on-surface dark:text-inverse-on-surface mb-4 uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-on-surface-variant dark:text-outline-variant text-sm mb-4">
              Subscribe for latest facility updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 sm:flex-row lg:flex-col">
              <input
                className="flex-1 px-4 py-2.5 rounded-lg border border-stroke-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm bg-surface-main dark:bg-surface-dim dark:text-inverse-on-surface dark:border-outline"
                placeholder="Your email"
                type="email"
                required
              />
              <button className="px-4 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <div className="pt-6 border-t border-stroke-soft/50 dark:border-outline/30 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
          <p className="text-xs text-on-surface-variant dark:text-outline-variant whitespace-nowrap">
            © 2026 SportNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
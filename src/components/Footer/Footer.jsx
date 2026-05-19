"use client";

import Link from "next/link";
import { FiGlobe, FiShare2, FiUsers } from "react-icons/fi";

export default function Footer({ variant = "premium" }) {
  const isSimple = variant === "simple";

  if (isSimple) {
    return (
      <footer className="w-full py-stack-lg px-margin-desktop flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto bg-surface-container-high dark:bg-inverse-surface border-t border-stroke-soft dark:border-outline mt-auto">
        <div className="mb-8 md:mb-0">
          <Link
            href="/"
            className="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed-dim"
          >
            SportNest
          </Link>
          <p className="text-on-surface-variant dark:text-outline-variant mt-2 text-label-md">
            Precision sports booking for elite athletes.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-label-sm">
          <a
            href="#"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-all hover:underline"
          >
            Contact Us
          </a>
          <a
            href="#"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-all hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-all hover:underline"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-all hover:underline"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-all hover:underline"
          >
            Instagram
          </a>
        </div>
        <p className="text-label-sm text-on-surface-variant dark:text-outline-variant mt-8 md:mt-0 opacity-80">
          © 2026 SportNest. All rights reserved.
        </p>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-surface-container-high dark:bg-inverse-surface border-t border-stroke-soft dark:border-outline mt-auto">
      <div className="max-w-container-max mx-auto py-stack-lg px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Company Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-headline-sm font-headline-sm font-bold text-primary dark:text-primary-fixed-dim block mb-6"
            >
              SportNest
            </Link>
            <p className="text-on-surface-variant dark:text-outline-variant text-body-md font-body-md max-w-sm mb-8">
              Connecting athletes with premium professional facilities globally. Elevate your game
              with our elite network of stadiums and courts.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                <FiGlobe className="text-xl" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                <FiShare2 className="text-xl" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
              >
                <FiUsers className="text-xl" />
              </a>
            </div>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-headline-md text-label-md text-on-surface dark:text-inverse-on-surface mb-6 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors text-label-md"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors text-label-md"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors text-label-md"
                >
                  Safety Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors text-label-md"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Sports Column */}
          <div>
            <h4 className="font-headline-md text-label-md text-on-surface dark:text-inverse-on-surface mb-6 uppercase tracking-wider">
              Sports
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors text-label-md"
                >
                  Football
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors text-label-md"
                >
                  Basketball
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors text-label-md"
                >
                  Tennis
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors text-label-md"
                >
                  Swimming
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h4 className="font-headline-md text-label-md text-on-surface dark:text-inverse-on-surface mb-6 uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-on-surface-variant dark:text-outline-variant text-label-sm mb-4">
              Subscribe for latest facility updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
              <input
                className="px-4 py-2 rounded-lg border border-stroke-soft focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md bg-surface-main dark:bg-surface-dim dark:text-inverse-on-surface dark:border-outline"
                placeholder="Your email"
                type="email"
                required
              />
              <button className="w-full py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container active:scale-95 transition-all cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-stroke-soft/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 order-2 md:order-1">
            <a
              href="#"
              className="text-label-sm text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-label-sm text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-label-sm text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors"
            >
              Cookie Policy
            </a>
          </div>
          <p className="text-label-sm text-on-surface-variant dark:text-outline-variant order-1 md:order-2">
            © 2026 SportNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

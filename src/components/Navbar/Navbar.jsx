"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSun, FiMoon, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "@/components/ThemeContext/ThemeContext";

export default function Navbar({ loggedIn = false }) {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Facilities", href: "/facilities" },
    { label: "My Bookings", href: "#" },
    { label: "Manage Facilities", href: "#" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-surface-container-lowest dark:bg-surface-dim border-b border-stroke-soft dark:border-outline-variant shadow-sm transition-all duration-300 ${
        scrolled ? "h-16 py-2" : "h-20 py-4"
      }`}
    >
      <div className="max-w-container-max mx-auto h-full px-margin-desktop flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-headline-md font-headline-md font-extrabold text-primary dark:text-primary-fixed tracking-tight"
          >
            SportNest
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-label-md font-label-md transition-colors ${
                    isActive
                      ? "text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1"
                      : "text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer">
            Add Facility
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex items-center gap-2 p-1.5 bg-surface-container rounded-full border border-stroke-soft hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full transition-all ${
                mounted && theme === "light"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-transparent text-on-surface-variant"
              }`}
            >
              <FiSun className="w-[16px] h-[16px]" />
            </div>
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full transition-all ${
                mounted && theme === "dark"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-transparent text-on-surface-variant"
              }`}
            >
              <FiMoon className="w-[16px] h-[16px]" />
            </div>
          </button>

          {/* Logged In Status / Login CTA */}
          {loggedIn ? (
            <div className="flex items-center gap-3">
              <button className="text-on-surface-variant hover:text-primary p-2 cursor-pointer">
                <FiSearch className="text-xl" />
              </button>
              <img
                alt="User profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary/10"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz-e0C1r748cuQlAjs0OEqWqc-uRP_ZvF6Cehwz3aghOcXdYhvm1gFD0EKda9CpbxBDgi_rGBlbZltmlPBLjfhDV6ZCyT5qGcbKZO4G1hAVi7DtvCr9IgOb_Rnpd5cmmA5vTjE35ofY9hGaAS1iI9DrPivWljs_TDIllvkQNKC1yJbDoH1eSryy_DkcS83zWMb_yGcjVWjGC6tbjYGfMQH5RSELK7ucIZO_q_-3syX35saoFptcdvVtclaXdz1lc5F3WGKdCY3oH96"
              />
            </div>
          ) : (
            <Link
              href="/login"
              className="px-6 py-2.5 border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-surface-alt transition-all text-center"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface-container-lowest dark:bg-surface-dim border-b border-stroke-soft dark:border-outline-variant shadow-lg py-4 px-margin-mobile flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-label-md font-label-md py-2 transition-colors ${
                  isActive
                    ? "text-primary dark:text-primary-fixed font-bold pl-2 border-l-2 border-primary"
                    : "text-on-surface-variant dark:text-outline-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button className="w-full flex justify-center items-center px-6 py-3 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container active:scale-95 transition-all">
            Add Facility
          </button>
        </div>
      )}
    </header>
  );
}

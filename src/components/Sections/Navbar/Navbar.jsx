"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiCalendar,
  FiPlusSquare,
  FiSliders,
  FiChevronDown,
} from "react-icons/fi";
import ThemeController from "@/components/UI/ThemeController/ThemeController";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/authClient";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "All Facilities", href: "/facilities" },
  ];

  const privateLinks = [
    { label: "My Bookings", href: "/my-bookings", icon: FiCalendar },
    { label: "Add Facility", href: "/add-facility", icon: FiPlusSquare },
    { label: "Manage My Facilities", href: "/manage-my-facilities", icon: FiSliders },
  ];

  const handleLogoutClick = async () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully logged out!");
            window.location.href = "/";
          },
        },
      });
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  const userPhoto =
    user?.photoUrl ||
    user?.image ||
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";

  return (
    <>
      {/* ─── Main Navbar ─────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-stroke-soft dark:border-slate-800 shadow-sm transition-all duration-300 ${
          scrolled ? "h-16 py-2" : "h-20 py-4"
        }`}
      >
        <div className="max-w-container-max mx-auto h-full px-4 lg:px-margin-desktop flex justify-between items-center">

          {/* Logo */}
          <Link
            href="/"
            className="font-extrabold text-primary dark:text-primary-fixed tracking-tight font-display flex items-center gap-2 hover:scale-[1.01] transition-transform"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              S
            </div>
            <span className="text-lg">SportNest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {publicLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm transition-all font-semibold ${
                    isActive
                      ? "text-primary dark:text-primary-fixed font-bold border-b-2 border-primary pb-1"
                      : "text-on-surface-variant dark:text-slate-400 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {isAuthenticated &&
              privateLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm transition-all font-semibold ${
                      isActive
                        ? "text-primary dark:text-primary-fixed font-bold border-b-2 border-primary pb-1"
                        : "text-on-surface-variant dark:text-slate-400 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Add Facility shortcut — desktop only */}
            {isAuthenticated && (
              <Link
                href="/add-facility"
                className="hidden md:flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md font-bold"
              >
                <FiPlusSquare className="text-base" />
                <span>Add Facility</span>
              </Link>
            )}

            {/* Theme toggle */}
            <ThemeController />

            {/* Profile dropdown — desktop */}
            {isAuthenticated ? (
              <div className="relative hidden lg:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-full border border-stroke-soft dark:border-slate-800 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="User profile"
                >
                  <Image
                    alt={user?.name || "User"}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
                    src={userPhoto}
                  />
                  <FiChevronDown className="text-on-surface-variant dark:text-slate-400 mr-1 text-sm" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-2xl shadow-xl py-3 z-50 animate-fade-in">
                    <div className="px-4 pb-3 mb-2 border-b border-stroke-soft dark:border-slate-800 flex items-center gap-3">
                      <Image
                        src={userPhoto}
                        alt={user?.name || "User"}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border border-primary/20"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-on-surface dark:text-white text-sm truncate">
                          {user?.name}
                        </h4>
                        <p className="text-xs text-on-surface-variant dark:text-slate-400 truncate font-semibold">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-0.5 px-2">
                      {privateLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-on-surface-variant dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary transition-all text-sm font-semibold"
                          >
                            <Icon className="text-lg text-primary/70 dark:text-primary-fixed-dim" />
                            <span>{link.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="border-t border-stroke-soft dark:border-slate-800 mt-2 pt-2 px-2">
                      <button
                        onClick={handleLogoutClick}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all text-sm font-bold text-left cursor-pointer"
                      >
                        <FiLogOut className="text-lg" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden lg:block px-5 py-2.5 border border-primary text-primary dark:border-primary-fixed-dim dark:text-primary-fixed-dim font-bold text-sm rounded-xl hover:bg-primary/5 transition-all"
              >
                Sign In
              </Link>
            )}

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-on-surface-variant dark:text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <FiMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Drawer Backdrop ──────────────────────────────────────── */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`lg:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ─── Mobile Drawer — slides in from RIGHT ────────────────────────── */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-72 z-[70] bg-white dark:bg-slate-900 border-l border-stroke-soft dark:border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stroke-soft dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white font-extrabold text-base shadow-md">
              S
            </div>
            <span className="font-extrabold text-primary font-display text-base">SportNest</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <FiX className="text-xl text-on-surface-variant dark:text-slate-400" />
          </button>
        </div>

        {/* User info — shown if logged in */}
        {isAuthenticated && (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-stroke-soft dark:border-slate-800 bg-primary/5 dark:bg-primary/10">
            <Image
              src={userPhoto}
              alt={user?.name || "User"}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
            />
            <div className="min-w-0">
              <p className="font-bold text-on-surface dark:text-white text-sm truncate">{user?.name}</p>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {/* Public links */}
          {publicLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary dark:text-primary-fixed"
                    : "text-on-surface-variant dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Private links */}
          {isAuthenticated && (
            <>
              <div className="border-t border-stroke-soft dark:border-slate-800 my-2" />
              <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-500 mb-1">
                My Account
              </p>
              {privateLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary dark:text-primary-fixed"
                        : "text-on-surface-variant dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className="text-base text-primary/70 dark:text-primary-fixed-dim shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        {/* Drawer Footer */}
        <div className="px-4 py-4 border-t border-stroke-soft dark:border-slate-800">
          {isAuthenticated ? (
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-500/10 text-red-500 font-bold text-sm hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              <FiLogOut className="text-base" />
              <span>Log Out</span>
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex justify-center items-center py-3 bg-primary text-white dark:bg-primary-fixed-dim dark:text-slate-950 font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all"
            >
              Sign In to Account
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
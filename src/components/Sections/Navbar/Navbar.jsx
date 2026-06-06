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

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Standard Links
  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "All Facilities", href: "/facilities" },
  ];

  // Private Links (Visible only to authenticated users)
  const privateLinks = [
    { label: "My Bookings", href: "/my-bookings", icon: FiCalendar },
    { label: "Add Facility", href: "/add-facility", icon: FiPlusSquare },
    { label: "Manage My Facilities", href: "/manage-my-facilities", icon: FiSliders },
  ];

  const handleLogoutClick = async () => {
    setDropdownOpen(false);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully logged out!");
            window.location.href = "/";
          },
        },
      });
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const userPhoto = user?.photoUrl || user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-stroke-soft dark:border-slate-800 shadow-sm transition-all duration-300 ${
        scrolled ? "h-16 py-2" : "h-20 py-4"
      }`}
    >
      <div className="max-w-container-max mx-auto h-full px-margin-desktop flex justify-between items-center">
        {/* Logo & Brand */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-headline-md font-headline-md font-extrabold text-primary dark:text-primary-fixed tracking-tight font-display flex items-center gap-2 group hover:scale-[1.01] transition-transform"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              S
            </div>
            <span>SportNest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {publicLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-label-md font-label-md transition-all ${
                    isActive
                      ? "text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1"
                      : "text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed font-semibold"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Private Navigation (Desktop) */}
            {isAuthenticated &&
              privateLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-label-md font-label-md transition-all ${
                      isActive
                        ? "text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1"
                        : "text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed font-semibold"
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
          {/* Add Facility Action Shortcut (Desktop) */}
          {isAuthenticated && (
            <Link
              href="/add-facility"
              className="hidden md:flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-white font-label-sm text-sm rounded-xl hover:bg-primary-container dark:bg-primary-fixed-dim dark:text-slate-950 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer shadow-md font-bold"
            >
              <FiPlusSquare className="text-lg" />
              <span>Add Facility</span>
            </Link>
          )}

          {/* Theme Toggle Button */}
          <ThemeController />

          {/* Logged In Status / Dropdown */}
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full border border-stroke-soft dark:border-slate-800 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="User profile dropdown"
              >
                <Image
                  alt={user?.name || "User"}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
                  src={userPhoto}
                />
                <FiChevronDown className="text-on-surface-variant dark:text-slate-400 mr-1 text-sm hidden sm:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-stroke-soft dark:border-slate-800 rounded-2xl shadow-xl py-3 z-50 animate-fade-in text-label-md">
                  {/* User Profile Summary Header */}
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
                      {user?.role && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary dark:text-primary-fixed-dim text-[10px] font-extrabold rounded uppercase tracking-wider">
                          {user.role}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Private Dropdown Links */}
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

                  {/* Logout Button */}
                  <div className="border-t border-stroke-soft dark:border-slate-800 mt-2 pt-2 px-2">
                    <button
                      onClick={handleLogoutClick}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-all text-sm font-bold text-left cursor-pointer"
                    >
                      <FiLogOut className="text-lg" />
                      <span>Log Out Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-5.5 py-2.5 border border-primary text-primary dark:border-primary-fixed-dim dark:text-primary-fixed-dim font-bold text-sm rounded-xl hover:bg-primary/5 transition-all text-center"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-on-surface-variant dark:text-slate-400 hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-stroke-soft dark:border-slate-800 shadow-xl py-4 px-margin-mobile flex flex-col gap-3 animate-fade-in">
          {publicLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-label-md font-bold py-2 px-3.5 rounded-xl transition-colors ${
                  isActive
                    ? "text-primary dark:text-primary-fixed bg-primary/10"
                    : "text-on-surface-variant dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Private Links in Mobile Menu */}
          {isAuthenticated && (
            <>
              <div className="border-t border-stroke-soft dark:border-slate-800 my-1"></div>
              {privateLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-label-md font-bold py-2 px-3.5 rounded-xl flex items-center gap-2 transition-colors ${
                      isActive
                        ? "text-primary dark:text-primary-fixed bg-primary/10"
                        : "text-on-surface-variant dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className="text-lg text-primary/70 dark:text-primary-fixed-dim" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="border-t border-stroke-soft dark:border-slate-800 my-1"></div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogoutClick();
                }}
                className="w-full flex items-center gap-2 py-2.5 px-3.5 rounded-xl text-red-500 font-bold hover:bg-red-500/10 transition-colors text-left"
              >
                <FiLogOut className="text-lg" />
                <span>Log Out Session</span>
              </button>
            </>
          )}

          {!isAuthenticated && (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full mt-2 flex justify-center items-center py-3 bg-primary text-white dark:bg-primary-fixed-dim dark:text-slate-950 font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all"
            >
              Sign In to Account
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

"use client";

import { useTheme } from "@/context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi2";

export default function ThemeController({ className = "" }) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return <div className={`w-9 h-9 ${className}`} />;

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`
        relative flex items-center justify-center w-9 h-9 rounded-full
        bg-surface-container text-on-surface-variant
        hover:bg-primary/10 hover:text-primary
        transition-all duration-200 cursor-pointer
        ${className}
      `}
    >
      {theme === "dark" ? (
        <HiSun className="w-5 h-5" />
      ) : (
        <HiMoon className="w-5 h-5" />
      )}
    </button>
  );
}

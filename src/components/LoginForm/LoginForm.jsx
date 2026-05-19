"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Sign in successful!");
    }, 2000);
  };

  return (
    <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-8 border border-stroke-soft dark:border-outline-variant shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-headline-lg font-extrabold text-on-surface dark:text-inverse-on-surface mb-2">
          Welcome Back
        </h2>
        <p className="text-body-md text-on-surface-variant dark:text-outline-variant text-sm">
          Access your premium sports dashboard
        </p>
      </div>

      {error && (
        <div className="p-3 bg-error-container text-on-error-container rounded-xl text-label-sm mb-6 border border-error/20 font-semibold animate-pulse">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label className="block text-label-sm font-bold text-on-surface dark:text-inverse-on-surface mb-2 flex items-center gap-1.5">
            <FiMail className="text-primary" />
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-stroke-soft dark:border-outline bg-surface-alt/50 dark:bg-surface-dim dark:text-inverse-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md font-medium"
              placeholder="name@domain.com"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-label-sm font-bold text-on-surface dark:text-inverse-on-surface flex items-center gap-1.5">
              <FiLock className="text-primary" />
              Password
            </label>
            <a href="#" className="text-xs text-primary hover:underline">
              Forgot?
            </a>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-stroke-soft dark:border-outline bg-surface-alt/50 dark:bg-surface-dim dark:text-inverse-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md font-medium"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline dark:text-outline-variant hover:text-primary transition-colors cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            id="remember-me"
            type="checkbox"
            className="w-4 h-4 text-primary bg-slate-100 border-stroke-soft rounded focus:ring-primary cursor-pointer"
          />
          <label
            htmlFor="remember-me"
            className="text-xs text-on-surface-variant dark:text-outline-variant select-none cursor-pointer"
          >
            Keep me logged in
          </label>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed font-headline-md font-bold rounded-xl active:scale-95 transition-all shadow-md cursor-pointer flex justify-center items-center gap-2 ${
            loading ? "opacity-75 cursor-not-allowed" : "hover:brightness-110"
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In to Dashboard"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6 gap-3">
        <div className="flex-1 h-[1px] bg-stroke-soft dark:bg-outline-variant" />
        <span className="text-[11px] font-bold text-outline dark:text-outline-variant uppercase">
          Or Continue With
        </span>
        <div className="flex-1 h-[1px] bg-stroke-soft dark:bg-outline-variant" />
      </div>

      {/* Social SSO Row */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 py-2.5 border border-stroke-soft dark:border-outline bg-white dark:bg-surface-dim hover:bg-slate-50 dark:hover:bg-slate-800 text-on-surface dark:text-inverse-on-surface text-label-md font-bold rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm">
          <FaGoogle className="text-red-500" />
          Google
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 border border-stroke-soft dark:border-outline bg-white dark:bg-surface-dim hover:bg-slate-50 dark:hover:bg-slate-800 text-on-surface dark:text-inverse-on-surface text-label-md font-bold rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm">
          <FaApple className="text-black dark:text-white" />
          Apple
        </button>
      </div>

      {/* Footnote */}
      <p className="text-center text-xs text-on-surface-variant dark:text-outline-variant mt-8">
        New to SportNest?{" "}
        <Link href="/register" className="text-primary font-bold hover:underline">
          Create an Account
        </Link>
      </p>
    </div>
  );
}

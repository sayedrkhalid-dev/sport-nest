"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { HiEnvelope, HiLockClosed, HiEye, HiEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { authClient } from "@/lib/authClient";

export default function LoginForm() {
  console.log(authClient);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async ({ email, password }) => {
  setLoading(true);
  try {
    const { error } = await authClient.signIn.email(
      { email, password, callbackURL: redirect },
      { throw: false }
    );
    if (error) throw new Error(error.message || "Invalid credentials.");
    toast.success("Welcome back!");
    router.push(redirect);
  } catch (err) {
    toast.error(err.message || "Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: redirect });
    } catch {
      toast.error("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Google */}
      <button
        id="google-login-btn"
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 font-semibold text-sm hover:bg-surface-container dark:hover:bg-slate-700 transition-colors cursor-pointer disabled:opacity-60"
      >
        <FcGoogle className="w-5 h-5" />
        {googleLoading ? "Redirecting…" : "Continue with Google"}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-outline-variant/50 dark:bg-slate-700" />
        <span className="text-xs text-on-surface-variant dark:text-slate-500 font-medium">
          or sign in with email
        </span>
        <div className="flex-1 h-px bg-outline-variant/50 dark:bg-slate-700" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="login-email"
            className="text-sm font-semibold text-on-surface dark:text-slate-200"
          >
            Email Address
          </label>
          <div className="relative">
            <HiEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-variant dark:text-slate-500" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
          {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="login-password"
            className="text-sm font-semibold text-on-surface dark:text-slate-200"
          >
            Password
          </label>
          <div className="relative">
            <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-variant dark:text-slate-500" />
            <input
              id="login-password"
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="w-full pl-10 pr-12 py-3 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-500 hover:text-primary transition-colors cursor-pointer"
              tabIndex={-1}
            >
              {showPass ? (
                <HiEyeSlash className="w-4.5 h-4.5" />
              ) : (
                <HiEye className="w-4.5 h-4.5" />
              )}
            </button>
          </div>
          {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
        </div>

        <button
          id="login-submit-btn"
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-on-surface-variant dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

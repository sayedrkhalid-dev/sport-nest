"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiUser, HiEnvelope, HiLockClosed, HiPhoto, HiEye, HiEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { authClient } from "@/lib/authClient";

export default function RegisterForm() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

const onSubmit = async ({ name, email, password, image }) => {
  setLoading(true);
  try {
    await authClient.signUp.email({ name, email, password, image });
    toast.success("Account created! Please sign in.");
    router.push("/login");
  } catch (err) {
    toast.error(err.message || "Registration failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-up failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Google */}
      <button
        id="google-register-btn"
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
        <span className="text-xs text-on-surface-variant dark:text-slate-500 font-medium">or create an account</span>
        <div className="flex-1 h-px bg-outline-variant/50 dark:bg-slate-700" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="reg-name" className="text-sm font-semibold text-on-surface dark:text-slate-200">Full Name</label>
          <div className="relative">
            <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-variant dark:text-slate-500" />
            <input id="reg-name" type="text" autoComplete="name" placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="reg-email" className="text-sm font-semibold text-on-surface dark:text-slate-200">Email Address</label>
          <div className="relative">
            <HiEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-variant dark:text-slate-500" />
            <input id="reg-email" type="email" autoComplete="email" placeholder="you@example.com"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
        </div>

        {/* Photo URL */}
        <div className="space-y-1.5">
          <label htmlFor="reg-photo" className="text-sm font-semibold text-on-surface dark:text-slate-200">Photo URL <span className="text-on-surface-variant font-normal">(optional)</span></label>
          <div className="relative">
            <HiPhoto className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-variant dark:text-slate-500" />
            <input id="reg-photo" type="url" placeholder="https://example.com/avatar.jpg"
              {...register("image", { pattern: { value: /^https?:\/\/.+/, message: "Enter a valid URL" } })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          {errors.image && <p className="text-xs text-error">{errors.image.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="reg-password" className="text-sm font-semibold text-on-surface dark:text-slate-200">Password</label>
          <div className="relative">
            <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-on-surface-variant dark:text-slate-500" />
            <input id="reg-password" type={showPass ? "text" : "password"} autoComplete="new-password" placeholder="Min. 6 characters"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                validate: {
                  hasUpper: (v) => /[A-Z]/.test(v) || "Must contain an uppercase letter",
                  hasLower: (v) => /[a-z]/.test(v) || "Must contain a lowercase letter",
                }
              })}
              className="w-full pl-10 pr-12 py-3 rounded-xl border border-outline-variant dark:border-slate-600 bg-surface-container-lowest dark:bg-slate-800 text-on-surface dark:text-slate-100 text-sm placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button type="button" onClick={() => setShowPass((p) => !p)} tabIndex={-1}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-500 hover:text-primary transition-colors cursor-pointer"
            >
              {showPass ? <HiEyeSlash className="w-4.5 h-4.5" /> : <HiEye className="w-4.5 h-4.5" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
          <ul className="text-xs text-on-surface-variant dark:text-slate-500 space-y-0.5 mt-1">
            <li className={`flex items-center gap-1 ${watch("password")?.length >= 6 ? "text-secondary" : ""}`}>• Min. 6 characters</li>
            <li className={`flex items-center gap-1 ${/[A-Z]/.test(watch("password") || "") ? "text-secondary" : ""}`}>• One uppercase letter</li>
            <li className={`flex items-center gap-1 ${/[a-z]/.test(watch("password") || "") ? "text-secondary" : ""}`}>• One lowercase letter</li>
          </ul>
        </div>

        <button id="register-submit-btn" type="submit" disabled={loading}
          className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-60"
        >
          {loading ? "Creating Account…" : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-on-surface-variant dark:text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
      </p>
    </div>
  );
}

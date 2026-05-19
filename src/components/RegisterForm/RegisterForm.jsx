"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa";

export default function RegisterForm() {
  const canvasRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: "rgba(0, 80, 203, 0.15)",
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });

      ctx.strokeStyle = "rgba(0, 80, 203, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Registration successful!");
    }, 2000);
  };

  return (
    <div className="w-full max-w-md bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl p-8 border border-stroke-soft dark:border-outline-variant shadow-2xl relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-headline-lg font-extrabold text-on-surface dark:text-inverse-on-surface mb-2">
            Create Account
          </h2>
          <p className="text-body-md text-on-surface-variant dark:text-outline-variant text-sm">
            Join SportNest and elevate your game today
          </p>
        </div>

        {error && (
          <div className="p-3 bg-error-container text-on-error-container rounded-xl text-label-sm mb-6 border border-error/20 font-semibold animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-label-sm font-bold text-on-surface dark:text-inverse-on-surface mb-1.5 flex items-center gap-1.5">
              <FiUser className="text-primary" />
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-stroke-soft dark:border-outline bg-surface-alt/50 dark:bg-surface-dim dark:text-inverse-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md font-medium text-sm"
              placeholder="Alex Morgan"
              required
            />
          </div>

          <div>
            <label className="block text-label-sm font-bold text-on-surface dark:text-inverse-on-surface mb-1.5 flex items-center gap-1.5">
              <FiMail className="text-primary" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-stroke-soft dark:border-outline bg-surface-alt/50 dark:bg-surface-dim dark:text-inverse-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md font-medium text-sm"
              placeholder="alex@domain.com"
              required
            />
          </div>

          <div>
            <label className="block text-label-sm font-bold text-on-surface dark:text-inverse-on-surface mb-1.5 flex items-center gap-1.5">
              <FiLock className="text-primary" />
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-stroke-soft dark:border-outline bg-surface-alt/50 dark:bg-surface-dim dark:text-inverse-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md font-medium text-sm"
                placeholder="Min. 8 characters"
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

          <div>
            <label className="block text-label-sm font-bold text-on-surface dark:text-inverse-on-surface mb-1.5 flex items-center gap-1.5">
              <FiImage className="text-primary" />
              Profile Image URL (Optional)
            </label>
            <input
              type="url"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-stroke-soft dark:border-outline bg-surface-alt/50 dark:bg-surface-dim dark:text-inverse-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none text-label-md font-medium text-sm"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 bg-primary text-on-primary dark:bg-primary-fixed-dim dark:text-on-primary-fixed font-headline-md font-bold rounded-xl active:scale-95 transition-all shadow-md cursor-pointer flex justify-center items-center gap-2 ${
              loading ? "opacity-75 cursor-not-allowed" : "hover:brightness-110"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="flex items-center my-5 gap-3">
          <div className="flex-1 h-[1px] bg-stroke-soft dark:bg-outline-variant" />
          <span className="text-[10px] font-bold text-outline dark:text-outline-variant uppercase">
            Or Register With
          </span>
          <div className="flex-1 h-[1px] bg-stroke-soft dark:bg-outline-variant" />
        </div>

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

        <p className="text-center text-xs text-on-surface-variant dark:text-outline-variant mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
}

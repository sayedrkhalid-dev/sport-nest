"use client";

import { useEffect, useRef } from "react";
import RegisterForm from "@/components/UI/RegisterForm/RegisterForm";
import Link from "next/link";
import { FiArrowLeft, FiZap, FiLayers, FiUsers } from "react-icons/fi";
import Image from "next/image";

export default function RegisterPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];
    const count = 60;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = "#0066FF"; // Electric Blue matching Kinetic Pro
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };
    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-background dark:bg-slate-950 text-on-surface">
      {/* Back to Home Button floating on top left */}
      <div className="absolute top-6 left-6 z-30">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/80 hover:text-white font-label-md font-bold text-xs bg-slate-950/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 hover:bg-slate-950/60 transition-all cursor-pointer shadow-md"
        >
          <FiArrowLeft className="text-sm" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Left Side: Energetic Sports Background with Animations */}
      <section className="relative w-full md:w-1/2 lg:w-3/5 min-h-[350px] md:min-h-screen overflow-hidden">
        {/* Base Image with subtle zoom/pan */}
        <div className="absolute inset-0 hero-zoom-bg pointer-events-none">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeYnyxkeZq2vAz_CYKejwAdkDpYEJLdGJcZfJ5i1RRIyPjMCpHm36F8NaZqwxqBRg52TlIaQ75v7QaQsXR7fxLVxepNZmRM_UqmlbTTvFW870Z4xgN59wZAHBnm4RBD2svkpj1yvboFjBa_yTHzY-qNMd60fF_VQ1GPM-KB3ONZoJfybS_HAV_NjDQgUGkSJsaKHdrL6LtLgxoSoJ8CZ53mjNlJhQiN1-dkAZHlnx4ZKJou_ONONpceJRhc4QLGQaWzKfP1NmMOZFP"
            alt="SportNest Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* JS Particle System Overlay */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

        {/* Kinetic Pro Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/45 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/60 flex flex-col justify-end p-8 md:p-16 z-20">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 floating-element kinetic-pulse-effect w-fit">
              <FiZap className="text-sm" />
              <span>Kinetic Pro Performance</span>
            </div>

            <h1 className="text-white font-display text-3xl md:text-5xl font-extrabold leading-tight">
              Elevate Your <span className="text-primary-fixed">Game</span> With SportNest.
            </h1>

            <p className="text-slate-300 font-body-lg max-w-md text-sm md:text-base">
              Join the elite network of facility managers and professional athletes. Experience
              frictionless booking and high-performance management.
            </p>

            <div className="flex gap-6 pt-4">
              <div className="glass-panel p-4 rounded-2xl flex items-center gap-3">
                <FiLayers className="text-primary-fixed text-3xl shrink-0" />
                <div>
                  <div className="text-white font-bold text-lg md:text-xl leading-tight">500+</div>
                  <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">
                    Premium Venues
                  </div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl flex items-center gap-3">
                <FiUsers className="text-primary-fixed text-3xl shrink-0" />
                <div>
                  <div className="text-white font-bold text-lg md:text-xl leading-tight">10k+</div>
                  <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">
                    Active Pros
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branding Overlay */}
        <div className="absolute top-16 left-8 z-30">
          <div className="text-white font-headline-lg font-extrabold flex items-center gap-2 font-display">
            <div className="bg-primary flex items-center justify-center p-2 rounded-lg text-white shadow-lg">
              <FiLayers className="text-xl" />
            </div>
            <span className="text-xl">SportNest</span>
          </div>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center bg-white dark:bg-slate-900 px-8 py-16 md:px-16 min-h-[50vh] md:min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <header className="space-y-2 text-center md:text-left">
            <h2 className="text-headline-lg text-on-surface dark:text-white text-2xl md:text-3xl font-extrabold font-display">
              Create Account
            </h2>
            <p className="text-on-surface-variant dark:text-outline-variant text-sm font-medium">
              Start your professional journey today.
            </p>
          </header>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}

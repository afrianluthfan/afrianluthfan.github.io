"use client";

import { useEffect, useState, useRef } from "react";

interface HeroSectionProps {
  name: string;
  location: string;
  email: string;
  website: string;
  phone: string;
  linkedinUsername: string;
}

export default function HeroSection({
  name,
  location,
  email,
  website,
  linkedinUsername,
}: HeroSectionProps) {
  const [time, setTime] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible] = useState(true);

  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "Asia/Jakarta",
        }),
      );
    }, 1000);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const h = sectionRef.current.offsetHeight;
      const scrolled = window.scrollY;
      setScrollOpacity(Math.max(0, 1 - scrolled / (h * 0.5)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-(--color-brutal-white) flex items-center justify-center"
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-brutal-black) 2px, transparent 2px),
              linear-gradient(90deg, var(--color-brutal-black) 2px, transparent 2px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Decorative color blocks — hidden on mobile */}
      <div className="hidden md:block absolute top-8 right-8 w-20 h-20 bg-(--color-brutal-yellow) border-3 border-(--color-brutal-black) brutal-shadow rounded-2xl" />
      <div className="hidden md:block absolute top-20 right-24 w-12 h-12 bg-(--color-brutal-pink) border-3 border-(--color-brutal-black) brutal-shadow rounded-xl" />
      <div className="hidden md:block absolute bottom-24 left-8 w-16 h-16 bg-(--color-brutal-green) border-3 border-(--color-brutal-black) brutal-shadow rounded-2xl" />

      {/* Corner labels */}
      <div className="absolute top-6 left-6 font-mono text-xs tracking-[0.3em] text-(--color-brutal-black) uppercase">
        <div className="bg-(--color-brutal-blue) text-white px-3 py-1.5 border-2 border-(--color-brutal-black) brutal-shadow inline-block rounded-xl">
          Portfolio / 2026
        </div>
      </div>
      <div className="absolute top-6 right-6 font-mono text-xs text-(--color-brutal-black)">
        <div className="bg-(--color-brutal-yellow) px-3 py-1.5 border-2 border-(--color-brutal-black) brutal-shadow inline-block font-bold rounded-xl">
          {time} WIB
        </div>
      </div>
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs font-bold"
        style={{ opacity: scrollOpacity }}
      >
        <div className="bg-white px-3 py-1.5 border-2 border-(--color-brutal-black) animate-bounceDown rounded-xl">
          SCROLL ↓
        </div>
      </div>
      <div className="hidden md:block absolute bottom-6 right-6 font-mono text-xs font-bold">
        <div className="bg-white px-3 py-1.5 border-2 border-(--color-brutal-black) brutal-shadow rounded-xl">
          {location}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-12 w-full max-w-350">
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Overline */}
          <div className="inline-block mb-6">
            <span className="font-mono text-sm tracking-[0.2em] bg-(--color-brutal-red) text-white px-4 py-2 border-3 border-(--color-brutal-black) brutal-shadow uppercase font-bold rounded-xl">
              Software Engineer
            </span>
          </div>

          {/* Name — massive brutalist type */}
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.03em] text-(--color-brutal-black) uppercase">
            {name.split(",")[0]}
          </h1>

          {/* Degree tag */}
          <div className=" inline-block bg-(--color-brutal-yellow) border-3 border-(--color-brutal-black) px-3 py-1 brutal-shadow rounded-xl">
            <span className="font-mono text-sm text-(--color-brutal-black) tracking-wider font-bold">
              {name.split(",")[1]?.trim()}
            </span>
          </div>

          {/* Contact row */}
          <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 font-mono text-xs sm:text-sm">
            <a
              href={`mailto:${email}`}
              className="bg-white border-2 border-(--color-brutal-black) px-4 py-2.5 brutal-shadow-interactive font-bold flex items-center gap-2 rounded-xl"
            >
              <span className="w-3 h-3 bg-(--color-brutal-red) border border-(--color-brutal-black) rounded-full" />
              {email}
            </a>
            <a
              href={website}
              target="_blank"
              className="bg-white border-2 border-(--color-brutal-black) px-4 py-2.5 brutal-shadow-interactive font-bold flex items-center gap-2 rounded-xl"
            >
              <span className="w-3 h-3 bg-(--color-brutal-blue) border border-(--color-brutal-black) rounded-full" />
              {website.replace("https://", "")}
            </a>
            <a
              href={`https://linkedin.com/in/${linkedinUsername}`}
              target="_blank"
              className="bg-white border-2 border-(--color-brutal-black) px-4 py-2.5 brutal-shadow-interactive font-bold flex items-center gap-2 rounded-xl"
            >
              <span className="w-3 h-3 bg-(--color-brutal-green) border border-(--color-brutal-black) rounded-full" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-(--color-brutal-black)" />
    </section>
  );
}

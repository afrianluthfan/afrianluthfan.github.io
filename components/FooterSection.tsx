"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface FooterSectionProps {
  name: string;
  email: string;
  website: string;
  linkedinUsername: string;
}

export default function FooterSection({
  name,
  email,
  website,
  linkedinUsername,
}: FooterSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref, 0.2);

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-(--color-brutal-blue) flex items-center justify-center"
    >
      {/* Decorative blocks — hidden on mobile */}
      <div className="hidden md:block absolute top-16 left-16 w-20 h-20 bg-(--color-brutal-yellow) border-3 border-(--color-brutal-black) brutal-shadow rounded-2xl" />
      <div className="hidden md:block absolute bottom-24 right-20 w-16 h-16 bg-(--color-brutal-pink) border-3 border-(--color-brutal-black) brutal-shadow rounded-2xl" />
      <div className="hidden md:block absolute top-32 right-32 w-12 h-12 bg-(--color-brutal-green) border-3 border-(--color-brutal-black) brutal-shadow rounded-xl" />

      <div
        className="text-center px-6 sm:px-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "scale(1)" : "scale(0.9)",
          transition: "all 0.8s ease",
        }}
      >
        <div className="inline-block mb-8">
          <span className="font-mono text-sm tracking-[0.3em] uppercase bg-(--color-brutal-yellow) text-(--color-brutal-black) px-4 py-2 border-3 border-(--color-brutal-black) brutal-shadow font-bold rounded-xl">
            Let&apos;s connect
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[0.9] uppercase mb-12">
          Get in
          <br />
          Touch
          <span className="inline-block w-6 h-6 md:w-8 md:h-8 bg-(--color-brutal-yellow) border-3 border-(--color-brutal-black) ml-2 align-middle rounded-lg" />
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <a
            href={`mailto:${email}`}
            className="bg-white border-3 border-(--color-brutal-black) px-6 py-3 brutal-shadow-lg-interactive font-mono text-sm font-bold flex items-center gap-3 rounded-xl"
          >
            <span className="w-4 h-4 bg-(--color-brutal-red) border-2 border-(--color-brutal-black) rounded-full" />
            {email}
          </a>
          <a
            href={website}
            target="_blank"
            className="bg-(--color-brutal-yellow) border-3 border-(--color-brutal-black) px-6 py-3 brutal-shadow-lg-interactive font-mono text-sm font-bold flex items-center gap-3 rounded-xl"
          >
            <span className="w-4 h-4 bg-(--color-brutal-green) border-2 border-(--color-brutal-black) rounded-full" />
            {website.replace("https://", "")}
          </a>
          <a
            href={`https://linkedin.com/in/${linkedinUsername}`}
            target="_blank"
            className="bg-(--color-brutal-green) border-3 border-(--color-brutal-black) px-6 py-3 brutal-shadow-lg-interactive font-mono text-sm font-bold flex items-center gap-3 rounded-xl"
          >
            <span className="w-4 h-4 bg-(--color-brutal-blue) border-2 border-(--color-brutal-black) rounded-full" />
            LinkedIn
          </a>
        </div>

        <div className="mt-12 sm:mt-20">
          <span className="font-mono text-[10px] sm:text-xs text-white bg-(--color-brutal-black) px-3 sm:px-4 py-2 border-2 border-white font-bold tracking-wider rounded-xl inline-block">
            © {new Date().getFullYear()} {name.split(",")[0]}. All rights
            reserved.
          </span>
        </div>
      </div>

      {/* Corner decorations — hidden on mobile */}
      <div className="hidden md:block absolute top-8 left-8">
        <div className="w-10 h-10 border-t-4 border-l-4 border-(--color-brutal-black) rounded-tl-xl" />
      </div>
      <div className="hidden md:block absolute top-8 right-8">
        <div className="w-10 h-10 border-t-4 border-r-4 border-(--color-brutal-black) rounded-tr-xl" />
      </div>
      <div className="hidden md:block absolute bottom-8 left-8">
        <div className="w-10 h-10 border-b-4 border-l-4 border-(--color-brutal-black) rounded-bl-xl" />
      </div>
      <div className="hidden md:block absolute bottom-8 right-8">
        <div className="w-10 h-10 border-b-4 border-r-4 border-(--color-brutal-black) rounded-br-xl" />
      </div>
    </section>
  );
}

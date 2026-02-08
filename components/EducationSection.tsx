"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import type { Education } from "@/lib/cv";

interface EducationSectionProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref, 0.2);

  const edu = education[0];

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-(--color-brutal-green) flex items-center justify-center py-20"
    >
      {/* Section label */}
      <div className="absolute top-6 left-6">
        <div className="font-mono text-xs tracking-[0.3em] uppercase bg-(--color-brutal-black) text-white px-3 py-1.5 border-2 border-(--color-brutal-black) inline-block font-bold rounded-xl">
          04 — Education
        </div>
      </div>

      {/* Giant background year — smaller on mobile */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 text-[6rem] sm:text-[12rem] md:text-[22rem] font-extrabold text-(--color-brutal-black) opacity-[0.07] leading-none select-none pointer-events-none">
        {edu.end_date.split("-")[0]}
      </div>

      {/* Decorative blocks — hidden on mobile */}
      <div className="hidden md:block absolute top-20 right-12 w-16 h-16 bg-(--color-brutal-yellow) border-3 border-(--color-brutal-black) brutal-shadow rounded-2xl" />
      <div className="hidden md:block absolute bottom-20 left-12 w-12 h-12 bg-(--color-brutal-pink) border-3 border-(--color-brutal-black) brutal-shadow rounded-xl" />

      <div
        className="relative z-10 px-6 sm:px-8 md:px-16 lg:px-24 max-w-250 w-full"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s ease",
        }}
      >
        {/* University */}
        <div className="mb-12">
          <div className="inline-block mb-6">
            <span className="font-mono text-xs tracking-[0.3em] uppercase bg-(--color-brutal-black) text-(--color-brutal-green) px-4 py-2 border-2 border-(--color-brutal-black) font-bold rounded-xl">
              {edu.start_date.split("-")[0]} — {edu.end_date.split("-")[0]}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-(--color-brutal-black) tracking-tight leading-[0.9] uppercase mb-8">
            {edu.institution}
          </h2>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-white border-3 border-(--color-brutal-black) px-5 py-3 brutal-shadow rounded-xl">
              <div className="font-mono text-xs text-(--color-brutal-black) tracking-wider uppercase mb-1 opacity-60">
                Degree
              </div>
              <div className="font-bold text-(--color-brutal-black)">
                {edu.degree}
              </div>
            </div>
            <div className="bg-(--color-brutal-yellow) border-3 border-(--color-brutal-black) px-5 py-3 brutal-shadow rounded-xl">
              <div className="font-mono text-xs text-(--color-brutal-black) tracking-wider uppercase mb-1 opacity-60">
                Major
              </div>
              <div className="font-bold text-(--color-brutal-black)">
                {edu.area}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            {edu.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-(--color-brutal-black) flex items-center justify-center shrink-0 border-2 border-(--color-brutal-black) rounded-lg">
                  <span className="text-(--color-brutal-green) text-xs font-bold font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="text-(--color-brutal-black) text-lg flex items-end gap-2 flex-wrap">
                  {h.includes("http") ? (
                    <>
                      <span>{h.split(": ")[0]}:</span>
                      <a
                        href={h.split(": ")[1]}
                        target="_blank"
                        className="bg-(--color-brutal-blue) text-white px-2 py-0.5 border-2 border-(--color-brutal-black) brutal-shadow-interactive inline-block font-bold text-sm rounded-lg"
                      >
                        View Document ↗
                      </a>
                    </>
                  ) : (
                    h
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative corner squares */}
      <div className="absolute bottom-8 right-8 flex gap-3">
        <div className="w-6 h-6 bg-(--color-brutal-red) border-2 border-(--color-brutal-black) rounded-md" />
        <div className="w-6 h-6 bg-(--color-brutal-blue) border-2 border-(--color-brutal-black) rounded-md" />
        <div className="w-6 h-6 border-2 border-(--color-brutal-black) rounded-md" />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-(--color-brutal-black)" />
    </section>
  );
}

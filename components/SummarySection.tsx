"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface SummarySectionProps {
  summary: string[];
}

export default function SummarySection({ summary }: SummarySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref, 0.2);

  const words = summary[0].split(" ");
  const highlightWords = ["JavaScript,", "TypeScript,", "Python"];

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-(--color-brutal-yellow) flex items-center justify-center"
    >
      {/* Section number */}
      <div className="absolute top-6 left-6">
        <div className="font-mono text-xs tracking-[0.3em] uppercase bg-(--color-brutal-black) text-white px-3 py-1.5 border-2 border-(--color-brutal-black) inline-block font-bold rounded-xl">
          02 — Summary
        </div>
      </div>

      {/* Large decorative quote block */}
      <div className="absolute top-12 right-8 md:right-16 text-[15rem] md:text-[25rem] font-extrabold text-(--color-brutal-black) opacity-[0.06] leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      {/* Decorative blocks — hidden on mobile */}
      <div className="hidden md:block absolute bottom-12 right-12 w-24 h-24 bg-(--color-brutal-pink) border-3 border-(--color-brutal-black) brutal-shadow rounded-2xl" />
      <div className="hidden md:block absolute bottom-20 right-32 w-14 h-14 bg-(--color-brutal-blue) border-3 border-(--color-brutal-black) brutal-shadow rounded-xl" />

      <div className="relative z-10 px-6 sm:px-8 md:px-16 lg:px-24 max-w-275">
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="flex gap-6 md:gap-10">
            <div className="hidden md:block w-3 bg-(--color-brutal-black) shrink-0" />
            <div>
              <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.3] text-(--color-brutal-black) tracking-tight">
                {words.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block transition-all duration-500"
                    style={{
                      transitionDelay: isVisible ? `${i * 40}ms` : "0ms",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(10px)",
                    }}
                  >
                    {highlightWords.includes(word.replace(",", "")) ? (
                      <span className="bg-(--color-brutal-red) text-white px-2 py-0.5 border-2 border-(--color-brutal-black) inline-block mx-0.5 rounded-lg">
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                    &nbsp;
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom geometric decoration */}
      <div className="absolute bottom-16 left-8 md:left-16 flex gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 border-2 border-(--color-brutal-black) rounded-md"
            style={{
              backgroundColor:
                i === 0
                  ? "var(--color-brutal-red)"
                  : i === 1
                    ? "var(--color-brutal-blue)"
                    : "transparent",
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-(--color-brutal-black)" />
    </section>
  );
}

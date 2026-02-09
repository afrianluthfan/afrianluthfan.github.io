"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import type { Experience } from "@/lib/cv";

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatDate(dateStr: string): string {
  if (dateStr === "present") return "Present";
  const [year, month] = dateStr.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

const tabColors = [
  "var(--color-brutal-blue)",
  "var(--color-brutal-green)",
  "var(--color-brutal-pink)",
  "var(--color-brutal-orange)",
];

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref, 0.1);
  const [activeIdx, setActiveIdx] = useState(0);

  const active = experiences[activeIdx];
  const activeColor = tabColors[activeIdx % tabColors.length];

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-(--color-brutal-white) flex items-start md:items-center"
    >
      {/* Section label */}
      <div className="absolute top-6 left-6">
        <div className="font-mono text-xs tracking-[0.3em] uppercase bg-(--color-brutal-blue) text-white px-3 py-1.5 border-2 border-(--color-brutal-black) brutal-shadow inline-block font-bold rounded-xl">
          03 — Experience
        </div>
      </div>

      {/* Giant background text */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-10 text-[8rem] md:text-[14rem] font-extrabold text-(--color-brutal-black) opacity-[0.04] leading-none select-none pointer-events-none uppercase whitespace-nowrap -rotate-90 origin-center">
        Work
      </div>

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row pt-20 pb-10">
        {/* Left: company list */}
        <div className="md:w-85 lg:w-100 md:border-r-4 border-b-4 md:border-b-0 border-(--color-brutal-black) flex flex-col justify-center px-6 md:px-8 py-6 md:py-10">
          <div className="space-y-2">
            {experiences.map((exp, i) => {
              const color = tabColors[i % tabColors.length];
              return (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`cursor-pointer w-full text-left px-4 py-4 transition-all duration-200 font-bold rounded-xl ${
                    activeIdx === i
                      ? "border-3 border-(--color-brutal-black) brutal-shadow translate-x-0"
                      : "border-2 border-gray-300 hover:border-(--color-brutal-black)"
                  }`}
                  style={{
                    backgroundColor: activeIdx === i ? color : "transparent",
                    color:
                      activeIdx === i
                        ? "var(--color-brutal-black)"
                        : "var(--color-brutal-black)",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateX(0)"
                      : "translateX(-20px)",
                    transition: `all 0.5s ease ${i * 100}ms`,
                  }}
                >
                  <div className="font-mono text-xs tracking-wider mb-1 opacity-70">
                    {formatDate(exp.start_date)} → {formatDate(exp.end_date)}
                  </div>
                  <div className="text-sm font-bold">{exp.company}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: detail */}
        <div className="flex-1 flex items-center px-6 md:px-14 lg:px-20 py-6 md:py-10">
          <div key={activeIdx} className="animate-fadeSlide">
            <div className="inline-block mb-4">
              <span
                className="font-mono text-xs tracking-wider uppercase px-3 py-1.5 border-2 border-(--color-brutal-black) brutal-shadow font-bold rounded-xl"
                style={{ backgroundColor: activeColor }}
              >
                {formatDate(active.start_date)} — {formatDate(active.end_date)}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-(--color-brutal-black) tracking-tight leading-tight mb-2 uppercase">
              {active.position}
            </h3>
            <div className="text-lg text-(--color-brutal-black) font-mono mb-8 opacity-60">
              @ {active.company}
            </div>

            <ul className="space-y-3">
              {active.highlights.map((h, j) => (
                <li key={j} className="flex gap-4 group">
                  <span
                    className="w-8 h-8 flex items-center justify-center border-2 border-(--color-brutal-black) text-xs font-mono font-bold shrink-0 rounded-lg"
                    style={{ backgroundColor: activeColor }}
                  >
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <span className="text-(--color-brutal-black) text-sm md:text-base leading-relaxed pt-1">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-(--color-brutal-black)" />
    </section>
  );
}

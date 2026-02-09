"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import type { Experience } from "@/lib/cv";

interface OrgExperienceSectionProps {
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

const dotColors = [
  "var(--color-brutal-blue)",
  "var(--color-brutal-orange)",
  "var(--color-brutal-green)",
  "var(--color-brutal-pink)",
];

export default function OrgExperienceSection({
  experiences,
}: OrgExperienceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref, 0.1);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-(--color-brutal-white) flex items-center py-20"
    >
      {/* Section label */}
      <div className="absolute top-6 left-6">
        <div className="font-mono text-xs tracking-[0.3em] uppercase bg-(--color-brutal-green) px-3 py-1.5 border-2 border-(--color-brutal-black) brutal-shadow inline-block font-bold rounded-xl">
          07 — Organizations
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 text-[10rem] md:text-[16rem] font-extrabold text-(--color-brutal-black) opacity-[0.04] leading-none select-none pointer-events-none rotate-90 origin-center">
        ORG
      </div>

      <div className="relative z-10 w-full px-6 sm:px-8 md:px-16 lg:px-24 max-w-350 mx-auto pt-20 pb-10">
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-(--color-brutal-black) tracking-tight uppercase mb-12 break-words">
            Organizational
            <br />
            Experience
            <span className="inline-block w-4 h-4 bg-(--color-brutal-orange) border-2 border-(--color-brutal-black) ml-2 align-middle rounded-full" />
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-2.25 top-1 bottom-0 w-1 bg-(--color-brutal-black) z-0" />

          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const color = dotColors[i % dotColors.length];
              return (
                <div
                  key={i}
                  className="relative pl-12 group"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateX(0)"
                      : "translateX(-20px)",
                    transition: `all 0.5s ease ${i * 120}ms`,
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-1 w-5 h-5 border-3 border-(--color-brutal-black) group-hover:scale-125 transition-transform rounded-full z-10"
                    style={{ backgroundColor: color }}
                  />

                  <div className="inline-block mb-2">
                    <span
                      className="font-mono text-xs tracking-wider px-3 py-1 border-2 border-(--color-brutal-black) font-bold rounded-xl"
                      style={{ backgroundColor: color }}
                    >
                      {formatDate(exp.start_date)} → {formatDate(exp.end_date)}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-(--color-brutal-black) tracking-tight mb-1 uppercase">
                    {exp.position}
                  </h3>
                  <div className="text-sm font-mono text-(--color-brutal-black) opacity-50 mb-3 font-bold">
                    @ {exp.company}
                  </div>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="text-sm text-(--color-brutal-black) flex gap-3 group-hover:translate-x-1 transition-transform"
                      >
                        <span className="font-bold shrink-0">—</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-(--color-brutal-black)" />
    </section>
  );
}

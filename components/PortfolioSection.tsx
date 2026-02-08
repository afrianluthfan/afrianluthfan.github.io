"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import type { PortfolioItem } from "@/lib/cv";

interface PortfolioSectionProps {
  projects: PortfolioItem[];
}

const rowColors = [
  "var(--color-brutal-blue)",
  "var(--color-brutal-pink)",
  "var(--color-brutal-yellow)",
  "var(--color-brutal-green)",
  "var(--color-brutal-orange)",
  "var(--color-brutal-red)",
];

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref, 0.1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-(--color-brutal-pink) flex items-center py-20"
    >
      {/* Section label */}
      <div className="absolute top-6 left-6">
        <div className="font-mono text-xs tracking-[0.3em] uppercase bg-(--color-brutal-black) text-white px-3 py-1.5 border-2 border-(--color-brutal-black) inline-block font-bold rounded-xl">
          06 — Portfolio
        </div>
      </div>

      {/* Giant decorative */}
      <div className="absolute -bottom-10 -left-10 text-[15rem] md:text-[22rem] font-extrabold text-(--color-brutal-black) opacity-[0.07] leading-none select-none pointer-events-none">
        Work
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 md:px-16 lg:px-24 max-w-350 mx-auto pt-20 pb-10">
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-(--color-brutal-black) tracking-tight uppercase mb-12">
            Selected
            <br />
            Projects
            <span className="inline-block w-4 h-4 bg-(--color-brutal-yellow) border-2 border-(--color-brutal-black) ml-2 align-middle rounded-full" />
          </h2>
        </div>

        <div className="space-y-3">
          {projects.map((project, i) => {
            const isExternal =
              project.url !== "Internal Use Only" &&
              project.url.startsWith("http");
            const color = rowColors[i % rowColors.length];
            const isDark =
              color === "var(--color-brutal-blue)" ||
              color === "var(--color-brutal-red)" ||
              color === "var(--color-brutal-pink)";
            return (
              <div
                key={i}
                className="group relative"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-30px)",
                  transition: `all 0.5s ease ${i * 80}ms`,
                }}
              >
                <div
                  className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 px-4 sm:px-6 border-3 border-(--color-brutal-black) transition-all duration-200 rounded-xl ${
                    hoveredIdx === i
                      ? "brutal-shadow-lg translate-x-0 translate-y-0"
                      : ""
                  }`}
                  style={{
                    backgroundColor: hoveredIdx === i ? color : "white",
                  }}
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    <span
                      className="font-mono text-sm shrink-0 font-bold w-8 h-8 flex items-center justify-center border-2 border-(--color-brutal-black) rounded-lg"
                      style={{
                        backgroundColor:
                          hoveredIdx === i
                            ? "var(--color-brutal-black)"
                            : color,
                        color:
                          hoveredIdx === i
                            ? "white"
                            : isDark
                              ? "white"
                              : "var(--color-brutal-black)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-(--color-brutal-black) uppercase">
                        {project.name}
                      </h3>
                      <p
                        className="text-sm mt-1"
                        style={{
                          color:
                            hoveredIdx === i && isDark
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(26,26,26,0.6)",
                        }}
                      >
                        {project.highlights[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 shrink-0 mt-3 sm:mt-0 sm:ml-4">
                    {project.status && (
                      <span className="hidden md:inline font-mono text-xs px-3 py-1.5 bg-(--color-brutal-black) text-white border-2 border-(--color-brutal-black) font-bold rounded-lg">
                        {project.status.length > 30
                          ? project.status.slice(0, 30) + "…"
                          : project.status}
                      </span>
                    )}
                    {isExternal ? (
                      <a
                        href={project.url}
                        target="_blank"
                        className="font-mono text-sm font-bold bg-(--color-brutal-yellow) border-2 border-(--color-brutal-black) w-8 h-8 flex items-center justify-center hover:bg-(--color-brutal-black) hover:text-white transition-colors rounded-lg"
                      >
                        ↗
                      </a>
                    ) : (
                      <span className="font-mono text-xs font-bold bg-neutral-200 border-2 border-(--color-brutal-black) px-3 py-1.5 rounded-lg">
                        Internal
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-(--color-brutal-black)" />
    </section>
  );
}

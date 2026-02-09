"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import type { Certification } from "@/lib/cv";

interface CertificationsSectionProps {
  certifications: Certification[];
  certificationsUrl?: string;
}

const cardColors = [
  "var(--color-brutal-yellow)",
  "var(--color-brutal-blue)",
  "var(--color-brutal-pink)",
  "var(--color-brutal-green)",
  "var(--color-brutal-orange)",
  "var(--color-brutal-red)",
];

export default function CertificationsSection({
  certifications,
  certificationsUrl,
}: CertificationsSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useInView(ref, 0.1);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-(--color-brutal-white) flex items-center py-20"
    >
      {/* Section label */}
      <div className="absolute top-6 left-6">
        <div className="font-mono text-xs tracking-[0.3em] uppercase bg-(--color-brutal-orange) px-3 py-1.5 border-2 border-(--color-brutal-black) brutal-shadow inline-block font-bold rounded-xl">
          05 — Certifications
        </div>
      </div>

      {/* Background text */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 text-[10rem] md:text-[16rem] font-extrabold text-(--color-brutal-black) opacity-[0.04] leading-none select-none pointer-events-none uppercase">
        Certs
      </div>

      <div className="relative z-10 w-full px-6 sm:px-8 md:px-16 lg:px-24 max-w-350 mx-auto pt-20 pb-10">
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <div className="flex flex-wrap flex-col items-start gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-(--color-brutal-black) tracking-tight uppercase">
              Certifications
              <span className="inline-block w-4 h-4 bg-(--color-brutal-red) border-2 border-(--color-brutal-black) ml-2 align-middle rounded-full" />
            </h2>
            {certificationsUrl && (
              <a
                href={certificationsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold px-4 py-2 bg-(--color-brutal-black) text-white border-2 border-(--color-brutal-black) rounded-lg brutal-shadow-interactive"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View All Certificates
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => {
            const color = cardColors[i % cardColors.length];
            const isDark =
              color === "var(--color-brutal-blue)" ||
              color === "var(--color-brutal-red)" ||
              color === "var(--color-brutal-pink)";
            return (
              <div
                key={i}
                className="border-3 border-(--color-brutal-black) p-5 brutal-shadow-interactive rounded-2xl"
                style={{
                  backgroundColor: color,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease ${i * 70}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="font-mono text-xs font-bold px-2 py-1 border-2 border-(--color-brutal-black) rounded-lg"
                    style={{
                      backgroundColor: isDark
                        ? "white"
                        : "var(--color-brutal-black)",
                      color: isDark ? "var(--color-brutal-black)" : "white",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-mono text-xs tracking-wider font-bold"
                    style={{
                      color: isDark ? "white" : "var(--color-brutal-black)",
                    }}
                  >
                    {cert.date}
                  </span>
                </div>
                <h3
                  className="text-sm font-bold leading-relaxed mb-3"
                  style={{
                    color: isDark ? "white" : "var(--color-brutal-black)",
                  }}
                >
                  {cert.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 border-2 border-(--color-brutal-black) rounded-full"
                    style={{
                      backgroundColor: isDark
                        ? "white"
                        : "var(--color-brutal-black)",
                    }}
                  />
                  <span
                    className="font-mono text-xs font-bold"
                    style={{
                      color: isDark
                        ? "rgba(255,255,255,0.8)"
                        : "rgba(0,0,0,0.6)",
                    }}
                  >
                    {cert.location}
                  </span>
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

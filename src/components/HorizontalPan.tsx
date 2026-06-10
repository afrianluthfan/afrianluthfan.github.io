"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HorizontalPan({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const distance = () =>
            (track.current?.scrollWidth ?? 0) - window.innerWidth;
          gsap.to(track.current, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: wrap.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      );
    },
    { scope: wrap },
  );

  return (
    <section
      id={id}
      ref={wrap}
      className="relative overflow-hidden border-y-[3px] border-ink"
    >
      <div
        ref={track}
        className="flex min-h-[100dvh] flex-col gap-12 px-5 py-24 md:h-[100dvh] md:min-h-0 md:w-max md:flex-row md:items-center md:gap-0 md:px-0 md:py-0"
      >
        {children}
      </div>
    </section>
  );
}

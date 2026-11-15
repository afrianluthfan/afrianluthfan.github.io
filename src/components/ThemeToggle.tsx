"use client";

import { CircleHalf } from "@phosphor-icons/react";
import { setTheme, useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      aria-pressed={theme === "dark"}
      className="grid size-9 place-items-center border-[3px] border-ink bg-paper transition-all duration-300 ease-snap hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-sm active:translate-x-0 active:translate-y-0 active:shadow-none"
    >
      <CircleHalf
        weight="bold"
        className={`size-4 transition-transform duration-500 ease-snap ${theme === "dark" ? "rotate-180" : ""}`}
      />
    </button>
  );
}

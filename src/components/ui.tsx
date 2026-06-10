import type { ReactNode } from "react";

const BTN_VARIANTS = {
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
  accent: "bg-accent text-ink",
} as const;

const BTN_SIZES = {
  sm: "px-4 py-2 text-xs",
  md: "px-7 py-4 text-sm",
  lg: "px-9 py-5 text-base md:px-12 md:py-6 md:text-xl",
} as const;

export function BrutalLink({
  href,
  children,
  variant = "ink",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof BTN_VARIANTS;
  size?: keyof typeof BTN_SIZES;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 whitespace-nowrap border-[3px] border-ink font-mono font-bold uppercase tracking-wider shadow-hard transition-all duration-300 ease-snap hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-[7px] active:translate-y-[7px] active:shadow-none ${BTN_VARIANTS[variant]} ${BTN_SIZES[size]} ${className}`}
    >
      {children}
    </a>
  );
}

const CHIP_VARIANTS = {
  paper: "bg-paper text-ink",
  accent: "bg-accent text-ink",
  ink: "bg-ink text-paper",
} as const;

export function Chip({
  children,
  variant = "paper",
  className = "",
}: {
  children: ReactNode;
  variant?: keyof typeof CHIP_VARIANTS;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 border-[3px] border-ink px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider ${CHIP_VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

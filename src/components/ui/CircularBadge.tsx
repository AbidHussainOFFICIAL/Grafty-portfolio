import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const LOBES = 18;
const BASE_RADIUS = 46.5;
const DEPTH = 2.4;
const STEPS = 180;

/** Wavy "seal" outline, computed once. */
const SCALLOP_PATH = (() => {
  const points: string[] = [];
  for (let step = 0; step < STEPS; step += 1) {
    const angle = (step / STEPS) * Math.PI * 2;
    const radius = BASE_RADIUS + DEPTH * Math.cos(LOBES * angle);
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    points.push(`${step === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `${points.join("")}Z`;
})();

interface CircularBadgeProps {
  tone: "dark" | "light";
  className?: string;
  children: ReactNode;
}

/** Scalloped round badge. The outline turns slowly; the content stays put. */
export function CircularBadge({ tone, className, children }: CircularBadgeProps) {
  return (
    <span className={cn("relative grid place-items-center", className)}>
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        focusable="false"
        className={cn(
          "animate-badge absolute inset-0 h-full w-full",
          tone === "dark" ? "fill-ink" : "fill-white",
        )}
      >
        <path d={SCALLOP_PATH} />
      </svg>
      <span className="relative flex flex-col items-center">{children}</span>
    </span>
  );
}

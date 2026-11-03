"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const PATTERN = /^(\d+)(?:\.(\d+))?(.*)$/;

interface CountUpProps {
  /** A figure such as "07", "120+" or "5.00". The number counts up; the rest is kept. */
  value: string;
}

/** Counts a figure up from zero the first time it scrolls into view. */
export function CountUp({ value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const match = PATTERN.exec(value);
    const element = ref.current;
    if (!match || !element || reduceMotion) return;

    const integerDigits = match[1].length;
    const decimals = match[2]?.length ?? 0;
    const suffix = match[3] ?? "";
    const target = Number(`${match[1]}.${match[2] ?? "0"}`);
    const format = (amount: number) => {
      const [whole, fraction] = amount.toFixed(decimals).split(".");
      return `${whole.padStart(integerDigits, "0")}${fraction ? `.${fraction}` : ""}${suffix}`;
    };

    if (!inView) {
      element.textContent = format(0);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        element.textContent = format(latest);
      },
      onComplete: () => {
        element.textContent = value;
      },
    });
    return () => {
      controls.stop();
      element.textContent = value;
    };
  }, [inView, reduceMotion, value]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true" suppressHydrationWarning>
        {value}
      </span>
    </>
  );
}

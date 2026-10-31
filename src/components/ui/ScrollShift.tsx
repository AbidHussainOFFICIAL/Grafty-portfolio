"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ScrollShiftProps {
  children: ReactNode;
  className?: string;
  /** Where the element starts and ends horizontally, as CSS lengths, e.g. ["-6vw", "0vw"]. */
  x?: readonly [string, string];
  /** Where the element starts and ends vertically, as CSS lengths. */
  y?: readonly [string, string];
  /**
   * When the movement is finished: once the element's centre reaches the middle of the
   * screen ("center"), or once its bottom reaches the bottom of the screen ("end").
   */
  settle?: "center" | "end";
}

/** Moves its content from one position to another while it scrolls into view. */
export function ScrollShift({
  children,
  className,
  x = ["0vw", "0vw"],
  y = ["0%", "0%"],
  settle = "center",
}: ScrollShiftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: settle === "end" ? ["start end", "end end"] : ["start end", "center center"],
  });
  const xValue = useTransform(scrollYProgress, [0, 1], [x[0], x[1]]);
  const yValue = useTransform(scrollYProgress, [0, 1], [y[0], y[1]]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? undefined : { x: xValue, y: yValue }}
    >
      {children}
    </motion.div>
  );
}

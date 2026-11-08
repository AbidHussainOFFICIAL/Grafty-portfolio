"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** A thin violet line across the top of the screen that fills as the page is read. */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-violet print:hidden"
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
    />
  );
}

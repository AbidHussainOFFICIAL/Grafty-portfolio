"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/** Percentage of one copy of the content that passes by each second. */
const BASE_SPEED = 3.6;

/** Maps any number into the range [min, max). */
function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

interface VelocityMarqueeProps {
  children: ReactNode;
  className?: string;
  /** Stops drifting while a mouse pointer rests on the strip (touch and pen never pause it). */
  pauseOnHover?: boolean;
}

/** An endless strip that drifts sideways and speeds up while the page is being scrolled. */
export function VelocityMarquee({ children, className, pauseOnHover = false }: VelocityMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();

  const position = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(position, (value) => `${wrap(-50, 0, value)}%`);

  useAnimationFrame((_time, delta) => {
    if (!inView || reduceMotion || paused.current) return;
    const step = -BASE_SPEED * (delta / 1000);
    position.set(position.get() + step * (1 + Math.abs(boost.get())));
  });

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className ?? ""}`}
      onPointerEnter={
        pauseOnHover
          ? (event) => {
              paused.current = event.pointerType === "mouse";
            }
          : undefined
      }
      onPointerLeave={
        pauseOnHover
          ? () => {
              paused.current = false;
            }
          : undefined
      }
    >
      {/* The content appears twice, so moving by exactly half its width loops seamlessly. */}
      <motion.div className="flex w-max gap-2 pr-2" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </div>
  );
}

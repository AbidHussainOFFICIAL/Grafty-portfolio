"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { withAmpersands } from "@/lib/text";

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ word, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{withAmpersands(word)}</motion.span>;
}

interface ScrollWordsProps {
  text: string;
  className?: string;
}

/** A paragraph whose words light up one by one as it scrolls through the screen. */
export function ScrollWords({ text, className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {withAmpersands(text)}
      </p>
    );
  }

  // Split on plain spaces only, so a non-breaking space keeps its two words together.
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => {
          const start = (index / words.length) * 0.88;
          return (
            <span key={index}>
              <Word word={word} progress={scrollYProgress} range={[start, start + 0.12]} />
              {index < words.length - 1 && " "}
            </span>
          );
        })}
      </span>
    </p>
  );
}

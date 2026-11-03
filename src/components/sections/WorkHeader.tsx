"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/content";
import { useIntroReady } from "@/components/layout/Intro";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The Work page's title row: the ghost word on the left, the label and project count on the right,
 * then one intro line. The page is already in view when it loads, so the entrance is timed rather
 * than scroll-driven: the ghost word slides in first, the rest follows it (and the filter bar and
 * list, in WorkBrowser, come last). On a first visit it waits for the loader's curtain to lift.
 */
export function WorkHeader() {
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section aria-labelledby="work-title" className="px-5 pt-4 md:px-8 md:pt-14 lg:px-[5.08%] lg:pt-[5cqw]">
      <h1 id="work-title" className="sr-only">
        Selected work
      </h1>

      <div className="flex items-end justify-between gap-4">
        <motion.div
          className="w-[58%] md:w-[60%]"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, x: "-6vw" },
                animate: ready ? { opacity: 1, x: 0 } : { opacity: 0, x: "-6vw" },
                transition: { duration: 1.1, ease: EASE },
              })}
        >
          <GhostHeading text="WORK" ratio={4.6} className="w-full" />
        </motion.div>

        <motion.div className="text-right md:mb-2 lg:mb-[2.4cqw]" {...rise(0.3)}>
          <SectionLabel as="p" bar="after">
            Selected work
          </SectionLabel>
          <p className="font-numeral mt-2 text-sm lg:mt-[0.8cqw] lg:text-[max(14px,1.4cqw)]">
            {String(projects.length).padStart(2, "0")} Projects
          </p>
        </motion.div>
      </div>

      <motion.p
        className="mt-block max-w-[34rem] text-base leading-snug md:text-xl lg:max-w-[48cqw] lg:text-[1.9cqw] lg:leading-[1.4]"
        {...rise(0.45)}
      >
        Branding, product design and front-end builds. Pick a category to narrow it down.
      </motion.p>
    </section>
  );
}

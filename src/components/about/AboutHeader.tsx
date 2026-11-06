"use client";

import { motion } from "framer-motion";
import { about } from "@/data/content";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useEntrance } from "@/lib/useEntrance";

/**
 * The About page's title row, built like the Work and Services headers: the ghost word slides in
 * first, then the label (tablets and up) and the intro line follow it. Timed rather than
 * scroll-driven because it is already on screen when the page opens (and on a first visit it
 * waits for the loader's curtain to lift).
 */
export function AboutHeader() {
  const { rise, slide } = useEntrance();

  return (
    <section aria-labelledby="about-page-title" className="px-5 pt-4 md:px-8 md:pt-14 lg:px-[5.08%] lg:pt-[5cqw]">
      <h1 id="about-page-title" className="sr-only">
        About Jessy Linda
      </h1>

      <div className="flex items-end justify-between gap-4">
        <motion.div className="w-full md:w-[52%]" {...slide}>
          <GhostHeading text="ABOUT" ratio={4.8} className="w-full" />
        </motion.div>

        <motion.div className="hidden text-right md:mb-2 md:block lg:mb-[2.4cqw]" {...rise(0.3)}>
          <SectionLabel as="p" bar="after">
            About me
          </SectionLabel>
        </motion.div>
      </div>

      <motion.p
        className="mt-block max-w-[34rem] text-base leading-snug md:text-xl lg:max-w-[48cqw] lg:text-[1.9cqw] lg:leading-[1.4]"
        {...rise(0.45)}
      >
        {about.page.intro}
      </motion.p>
    </section>
  );
}

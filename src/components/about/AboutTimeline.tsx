"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { experience } from "@/data/content";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

/**
 * Roles and years as a compact list down a vertical line that fills with ink as you scroll (the
 * same line as the Services process, but the text stays fully readable). The newest role has an
 * orange dot. With reduced motion the line is simply full.
 */
export function AboutTimeline() {
  const reduceMotion = useReducedMotion() ?? false;
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.7", "end 0.7"] });

  return (
    <section id="experience" aria-labelledby="experience-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <div className="flex items-end justify-between gap-4">
        <ScrollShift x={["-6vw", "0vw"]} className="w-[66%] md:w-[60%]">
          <GhostHeading text="EXPERIENCE" ratio={7.8} className="w-full" />
        </ScrollShift>
        <SectionLabel bar="after" id="experience-title" className="mb-2 lg:mb-[2.4cqw]">
          Experience
        </SectionLabel>
      </div>

      <ol ref={listRef} className="relative mt-block pl-7 md:pl-10 lg:pl-[5cqw]">
        <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-0 w-0.5 bg-ink/15" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-[5px] top-0 w-0.5 origin-top bg-ink"
          style={reduceMotion ? undefined : { scaleY: scrollYProgress }}
        />

        {experience.map((role, index) => (
          <li key={role.id} className="relative border-b border-ink/15 py-5 last:border-b-0 md:py-6 lg:py-[2.2cqw]">
            <span
              aria-hidden="true"
              className={cn(
                "absolute -left-7 top-[1.65rem] h-3 w-3 rounded-full md:-left-10 md:top-[2rem] lg:-left-[5cqw] lg:top-[3.1cqw]",
                index === 0 ? "bg-accent ring-4 ring-accent/30" : "bg-ink",
              )}
            />
            <Reveal>
              <div className="lg:grid lg:grid-cols-[16cqw_1fr_26cqw] lg:items-baseline lg:gap-[2cqw]">
                <p className="font-numeral text-sm opacity-70 md:text-base lg:text-[1.6cqw]">{role.years}</p>
                <h3 className="font-cond mt-1 text-[clamp(1.75rem,8vw,2.5rem)] uppercase leading-[0.95] lg:mt-0 lg:text-[3.4cqw]">
                  {role.title}
                </h3>
                <p className="mt-1 text-sm md:text-base lg:mt-0 lg:text-right lg:text-[1.5cqw]">{role.place}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

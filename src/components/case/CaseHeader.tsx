"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { categories, routes, type Project } from "@/data/content";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useEntrance } from "@/lib/useEntrance";
import { withAmpersands } from "@/lib/text";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * On desktop the title stays on one line. Its size is the Hero-style 9.6cqw for short titles and
 * shrinks for long ones so the whole line always fits inside the page margins.
 */
const TITLE_MAX = 9.6;
const TITLE_FIT = 84;
const CHAR_WIDTH = 0.45;

const categoryLabel = Object.fromEntries(categories.map((category) => [category.id, category.label]));

interface CaseHeaderProps {
  project: Project;
  /** The project's place in the list, starting at 1. */
  number: number;
  total: number;
}

/**
 * The top of a case study: a way back, the ghost "CASE STUDY" word with the project's number,
 * the title (its lines rise through masks like the Hero headline), the categories and a tagline.
 * Timed rather than scroll-driven, because it is on screen the moment the page opens.
 */
export function CaseHeader({ project, number, total }: CaseHeaderProps) {
  const { reduceMotion, ready, rise, slide } = useEntrance();
  const lines = project.title.split(" ");
  const titleSize = Math.min(TITLE_MAX, TITLE_FIT / (project.title.length * CHAR_WIDTH)).toFixed(2);

  return (
    <section aria-labelledby="case-title" className="px-5 pt-4 md:px-8 md:pt-10 lg:px-[5.08%] lg:pt-[3.4cqw]">
      <motion.div {...rise(0)}>
        <ArrowLink href={routes.work} back>
          All work
        </ArrowLink>
      </motion.div>

      <div className="mt-4 flex items-end justify-between gap-4 lg:mt-[2cqw]">
        <motion.div className="w-[66%] md:w-[58%]" {...slide}>
          <GhostHeading text="CASE STUDY" ratio={7} className="w-full" />
        </motion.div>
        <motion.div className="text-right md:mb-1 lg:mb-[1.6cqw]" {...rise(0.3)}>
          <SectionLabel as="p" bar="after">
            Project
          </SectionLabel>
          <p className="font-numeral mt-2 text-sm lg:mt-[0.8cqw] lg:text-[max(14px,1.4cqw)]">
            {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </motion.div>
      </div>

      <h1
        id="case-title"
        style={{ "--title-size": `${titleSize}cqw` } as CSSProperties}
        className="font-cond mt-5 text-[clamp(2.75rem,14vw,6rem)] uppercase leading-[0.85] lg:mt-[2.4cqw] lg:flex lg:gap-x-[0.12em] lg:whitespace-nowrap lg:text-[length:var(--title-size)] lg:leading-[0.83]"
      >
        {lines.map((line, index) => (
          <span key={line} className="-my-[0.14em] block overflow-hidden py-[0.14em]">
            <motion.span
              className="block"
              initial={reduceMotion ? false : { y: "115%" }}
              animate={reduceMotion ? undefined : { y: ready ? 0 : "115%" }}
              transition={{ duration: 0.9, delay: 0.35 + index * 0.12, ease: EASE }}
            >
              {withAmpersands(line)}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.div className="mt-6 lg:mt-[2.4cqw]" {...rise(0.75)}>
        <p className="flex flex-wrap items-center gap-2 lg:gap-[0.7cqw]">
          <span className="sr-only">Categories: </span>
          {project.categories.map((id) => (
            <span
              key={id}
              className="rounded-full border border-ink/50 px-3 py-1.5 text-[11px] font-semibold uppercase leading-none tracking-wide lg:px-[1.2cqw] lg:py-[0.6cqw] lg:text-[max(11px,0.95cqw)]"
            >
              {categoryLabel[id]}
            </span>
          ))}
          <span className="font-numeral ml-1 text-sm lg:ml-[0.4cqw] lg:text-[max(14px,1.4cqw)]">{project.year}</span>
        </p>
        <p className="mt-4 max-w-[34rem] text-base leading-snug md:text-xl lg:mt-[1.6cqw] lg:max-w-[50cqw] lg:text-[1.9cqw] lg:leading-[1.4]">
          {project.study.tagline}
        </p>
      </motion.div>
    </section>
  );
}

"use client";

import { createRef, useMemo, type RefObject } from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/content";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

/** Cards pile up at most this many steps deep; the rest stack on the last step. */
const MAX_STEPS = 3;

interface StackCardProps {
  project: Project;
  index: number;
  count: number;
  meta: boolean;
  ownRef: RefObject<HTMLLIElement | null>;
  nextRef: RefObject<HTMLLIElement | null> | undefined;
}

function StackCard({ project, index, count, meta, ownRef, nextRef }: StackCardProps) {
  const reduceMotion = useReducedMotion();
  const stacked = !reduceMotion;
  // How many cards come after this one, capped so a long list never shrinks cards to nothing.
  const depth = Math.min(count - 1 - index, MAX_STEPS);

  // Progress of the next card rising over this one: 0 when it appears, 1 when it has landed.
  // The last card has nothing above it, so it stays full size and undimmed.
  const { scrollYProgress } = useScroll({
    target: nextRef ?? ownRef,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, nextRef ? 0.98 - 0.03 * depth : 1]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, nextRef ? 0.1 + 0.12 * depth : 0]);

  return (
    <li
      ref={ownRef}
      className="sticky mb-4 transition-[top] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] last:mb-0 motion-reduce:static motion-reduce:transition-none md:mb-6 lg:mb-[3cqw] lg:h-[min(46cqw,calc(100svh-11rem))] lg:motion-reduce:static"
      style={{ top: `calc(var(--stack-top) + ${Math.min(index, MAX_STEPS)} * var(--stack-step))` }}
    >
      <ProjectCard
        project={project}
        number={index + 1}
        total={count}
        meta={meta}
        scale={stacked ? scale : undefined}
        dim={stacked && nextRef ? dim : undefined}
      />
    </li>
  );
}

interface ProjectStackProps {
  projects: readonly Project[];
  /** Shows each card's categories and year. */
  meta?: boolean;
  /** Pins the cards below the Work page's sticky filter bar instead of near the top of the screen. */
  pinBelowBar?: boolean;
  className?: string;
}

/**
 * A list of project cards. At every screen size the cards pin near the top of the screen and the
 * next one slides over the last, which shrinks and darkens beneath it. Phones use compact
 * cards of equal height so a whole card fits on screen; with reduced motion they simply scroll past.
 */
export function ProjectStack({ projects, meta = false, pinBelowBar = false, className }: ProjectStackProps) {
  const refs = useMemo(() => projects.map(() => createRef<HTMLLIElement>()), [projects]);

  return (
    <ul
      className={cn(
        "[--stack-step:0.75rem] md:[--stack-step:1rem] lg:[--stack-step:1.25rem]",
        pinBelowBar
          ? "[--stack-top:calc(var(--bar-top)+var(--bar-h)+0.5rem)]"
          : "[--stack-top:1rem] md:[--stack-top:1.5rem] lg:[--stack-top:5.5rem]",
        className,
      )}
    >
      {projects.map((project, index) => (
        <StackCard
          key={project.id}
          project={project}
          index={index}
          count={projects.length}
          meta={meta}
          ownRef={refs[index]}
          nextRef={refs[index + 1]}
        />
      ))}
    </ul>
  );
}

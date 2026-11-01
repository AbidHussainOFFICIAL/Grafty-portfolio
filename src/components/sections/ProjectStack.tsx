"use client";

import { createRef, useMemo, type RefObject } from "react";
import { Photo } from "@/components/ui/Photo";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { projects, type Project } from "@/data/content";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** How far the image leans towards the pointer, in degrees. */
const MAX_TILT = 6;

const panelTone: Record<Project["tone"], { panel: string; badge: string }> = {
  light: { panel: "bg-white text-ink", badge: "bg-ink text-white" },
  dark: { panel: "bg-ink text-white", badge: "bg-white text-ink" },
  violet: { panel: "bg-violet text-white", badge: "bg-white text-ink" },
  accent: { panel: "bg-accent text-ink", badge: "bg-ink text-white" },
};

const pad = (value: number) => String(value).padStart(2, "0");

interface ImageTiltProps {
  project: Project;
  tilt: boolean;
}

/** The project image. On desktop it leans towards the pointer, with a soft highlight. */
function ImageTilt({ project, tilt }: ImageTiltProps) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-MAX_TILT, MAX_TILT]), {
    stiffness: 160,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [MAX_TILT, -MAX_TILT]), {
    stiffness: 160,
    damping: 20,
  });
  const highlightX = useTransform(pointerX, (value) => value * 100);
  const highlightY = useTransform(pointerY, (value) => value * 100);
  const highlight = useMotionTemplate`radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.3), transparent 55%)`;
  const highlightOpacity = useMotionValue(0);
  const scale = useSpring(1, { stiffness: 160, damping: 20 });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!tilt || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width);
    pointerY.set((event.clientY - box.top) / box.height);
    highlightOpacity.set(1);
    scale.set(1.08);
  };

  const handleLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    highlightOpacity.set(0);
    scale.set(1);
  };

  return (
    <div
      className="relative aspect-[16/10] shrink-0 overflow-hidden [perspective:900px] md:aspect-[16/9] lg:aspect-square lg:h-full"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <motion.div
        className="h-full w-full"
        style={tilt ? { rotateX, rotateY, scale, transformStyle: "preserve-3d" } : undefined}
      >
        <Photo
          src={project.image.src}
          alt={project.image.alt}
          width={888}
          height={888}
          sizes="(min-width: 1440px) 660px, (min-width: 1024px) 46vw, (min-width: 768px) 45vw, 92vw"
          className="h-full w-full object-cover"
        />
        {tilt && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: highlight, opacity: highlightOpacity }}
          />
        )}
      </motion.div>
    </div>
  );
}

interface StackCardProps {
  project: Project;
  index: number;
  total: number;
  ownRef: RefObject<HTMLLIElement | null>;
  nextRef: RefObject<HTMLLIElement | null> | undefined;
}

function StackCard({ project, index, total, ownRef, nextRef }: StackCardProps) {
  const reduceMotion = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const stacked = !reduceMotion;
  const tone = panelTone[project.tone];
  const depth = total - 1 - index;

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
      className="sticky mb-4 last:mb-0 motion-reduce:static md:mb-6 lg:mb-[3cqw] lg:h-[min(46cqw,calc(100svh-11rem))] lg:motion-reduce:static"
      style={{ top: `calc(var(--stack-top) + ${index} * var(--stack-step))` }}
    >
      <motion.div
        className="relative h-full origin-top overflow-hidden rounded-card shadow-card"
        style={stacked ? { scale } : undefined}
      >
        <a
          href={project.href}
          className="group flex h-full flex-col lg:flex-row"
          aria-label={`${project.title}, project ${index + 1} of ${total}`}
        >
          <ImageTilt project={project} tilt={stacked && desktop} />

          <div
            className={`flex flex-1 flex-col justify-between gap-4 p-4 md:gap-8 md:p-6 lg:gap-0 lg:p-[3cqw] ${tone.panel}`}
          >
            <p className="font-numeral text-sm lg:text-[max(14px,1.4cqw)]" aria-hidden="true">
              {pad(index + 1)} / {pad(total)}
            </p>

            <h3 className="font-cond text-[clamp(2rem,9vw,3.5rem)] uppercase leading-[0.88] lg:text-[7.4cqw]">
              {project.title.split(" ").map((word) => (
                <span key={word} className="block">
                  {word}
                </span>
              ))}
            </h3>

            <span className="flex items-center gap-3 text-sm lg:gap-[1cqw] lg:text-[max(14px,1.4cqw)]">
              <span
                aria-hidden="true"
                className={`grid h-11 w-11 place-items-center rounded-full transition duration-300 group-hover:rotate-45 lg:h-[5cqw] lg:w-[5cqw] ${tone.badge}`}
              >
                <ArrowUpRightIcon className="h-5 w-5 lg:h-[2.2cqw] lg:w-[2.2cqw]" />
              </span>
              View project
            </span>
          </div>
        </a>

        {stacked && nextRef && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-ink"
            style={{ opacity: dim }}
          />
        )}
      </motion.div>
    </li>
  );
}

/**
 * The portfolio list. At every screen size the cards pin to the top of the screen and the
 * next one slides over the last, which shrinks and darkens beneath it. Phones use compact
 * cards so a whole card fits on screen; with reduced motion they simply scroll past.
 */
export function ProjectStack() {
  const refs = useMemo(() => projects.map(() => createRef<HTMLLIElement>()), []);

  return (
    <ul className="mt-block [--stack-step:0.75rem] [--stack-top:1rem] md:[--stack-step:1rem] md:[--stack-top:1.5rem] lg:[--stack-step:1.25rem] lg:[--stack-top:5.5rem]">
      {projects.map((project, index) => (
        <StackCard
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          ownRef={refs[index]}
          nextRef={refs[index + 1]}
        />
      ))}
    </ul>
  );
}

"use client";

import { useEffect, useId, useRef, useState, type PointerEvent, type RefObject } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { categories, routes, type CaseLine, type Project } from "@/data/content";
import { Photo } from "@/components/ui/Photo";
import { ArrowUpRightIcon, PlusMinusIcon } from "@/components/ui/Icons";
import { SiteLink } from "@/components/ui/SiteLink";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** How far the image leans towards the pointer, in degrees. */
const MAX_TILT = 6;

/** Scrolling this far (in pixels) closes an opened "See more" panel on phones. */
const COLLAPSE_SCROLL = 24;

const panelTone: Record<Project["tone"], { panel: string; badge: string }> = {
  light: { panel: "bg-white text-ink", badge: "bg-ink text-white" },
  dark: { panel: "bg-ink text-white", badge: "bg-white text-ink" },
  violet: { panel: "bg-violet text-white", badge: "bg-white text-ink" },
  accent: { panel: "bg-accent text-ink", badge: "bg-ink text-white" },
};

const categoryLabel = Object.fromEntries(categories.map((category) => [category.id, category.label]));

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Lets the project image lean towards a mouse pointer, with a soft highlight. The listeners go
 * on the whole card (its title link is stretched over it), so the tilt works over the image only.
 */
function useImageTilt(enabled: boolean, imageRef: RefObject<HTMLDivElement | null>) {
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

  const reset = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
    highlightOpacity.set(0);
    scale.set(1);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!enabled || event.pointerType !== "mouse") return;
    const box = imageRef.current?.getBoundingClientRect();
    if (!box) return;
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) {
      reset();
      return;
    }
    pointerX.set(x);
    pointerY.set(y);
    highlightOpacity.set(1);
    scale.set(1.08);
  };

  return { rotateX, rotateY, scale, highlight, highlightOpacity, onPointerMove, onPointerLeave: reset };
}

type Tilt = ReturnType<typeof useImageTilt>;

function ProjectImage({
  project,
  imageRef,
  tilt,
  tilting,
}: {
  project: Project;
  imageRef: RefObject<HTMLDivElement | null>;
  tilt: Tilt;
  tilting: boolean;
}) {
  return (
    <div
      ref={imageRef}
      className="relative aspect-[16/10] shrink-0 overflow-hidden [perspective:900px] md:aspect-[16/9] lg:aspect-square lg:h-full"
    >
      <motion.div
        className="h-full w-full"
        style={
          tilting
            ? { rotateX: tilt.rotateX, rotateY: tilt.rotateY, scale: tilt.scale, transformStyle: "preserve-3d" }
            : undefined
        }
      >
        <Photo
          src={project.image.src}
          alt={project.image.alt}
          width={888}
          height={888}
          sizes="(min-width: 1440px) 660px, (min-width: 1024px) 46vw, (min-width: 768px) 45vw, 92vw"
          className="h-full w-full object-cover"
        />
        {tilting && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: tilt.highlight, opacity: tilt.highlightOpacity }}
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * The folded part of a card: Problem / Role / Result as three thin-ruled rows. Labels sit above the text on phones, beside it on desktop. On phones it
 * stays folded away until "See more" is pressed; from tablet up it is always shown.
 */
function Details({ line, id, open }: { line: CaseLine; id: string; open: boolean }) {
  const rows = [
    ["Problem", line.problem],
    ["Role", line.role],
    ["Result", line.result],
  ] as const;

  return (
    <div
      id={id}
      data-open={open ? "" : undefined}
      className="grid grid-rows-[0fr] transition-[grid-template-rows,margin] duration-300 ease-out motion-reduce:transition-none max-md:-mt-3 max-md:data-open:mt-0 data-open:grid-rows-[1fr] md:grid-rows-[1fr]"
    >
      <div className="min-h-0 overflow-hidden">
        <dl>
          {rows.map(([label, text]) => (
            <div
              key={label}
              className="border-b border-current/20 py-1.5 first:border-t lg:grid lg:grid-cols-[7.5cqw_1fr] lg:items-baseline lg:gap-[1cqw] lg:py-[0.7cqw]"
            >
              <dt className="text-[10px] font-semibold uppercase leading-none tracking-wide opacity-75 lg:text-[max(10px,0.9cqw)]">
                {label}
              </dt>
              <dd className="mt-1 line-clamp-2 text-[13px] leading-snug md:text-sm lg:mt-0 lg:text-[max(13px,1.2cqw)]">
                {text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/** The project's categories as small outlined pills. */
function Chips({ project, className }: { project: Project; className?: string }) {
  return (
    <p className={`flex items-center gap-1.5 lg:gap-[0.6cqw] ${className ?? ""}`}>
      <span className="sr-only">Categories: </span>
      {project.categories.map((id) => (
        <span
          key={id}
          className="whitespace-nowrap rounded-full border border-current/40 px-2.5 py-1 text-[10px] font-semibold uppercase leading-none tracking-wide lg:px-[1cqw] lg:py-[0.45cqw] lg:text-[max(10px,0.85cqw)]"
        >
          {categoryLabel[id]}
        </span>
      ))}
    </p>
  );
}

export interface ProjectCardProps {
  project: Project;
  /** The number shown on the card, starting at 1. */
  number: number;
  /** The total shown after the number ("01 / 08"). */
  total: number;
  /** Shows the category chips and year (the Work page does, Home does not). */
  meta?: boolean;
  /** Set by the stack: how far the next card has covered this one. */
  scale?: MotionValue<number>;
  dim?: MotionValue<number>;
}

/**
 * One project card: image on the left (top on phones), coloured panel on the right.
 * The whole card is the link (the title's ::after stretches over it). It fills its parent's
 * height, so the stack and the featured block decide how tall it is.
 */
export function ProjectCard({ project, number, total, meta = false, scale, dim }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const tilting = !reduceMotion && desktop;
  const tone = panelTone[project.tone];
  const imageRef = useRef<HTMLDivElement>(null);
  const tilt = useImageTilt(tilting, imageRef);
  const rowsId = useId();
  const [expanded, setExpanded] = useState(false);

  // An opened "See more" folds itself away as soon as the visitor scrolls on.
  useEffect(() => {
    if (!expanded) return;
    const start = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - start) > COLLAPSE_SCROLL) setExpanded(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [expanded]);

  return (
    <motion.div
      className="group relative h-full origin-top overflow-hidden rounded-card shadow-card has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-violet"
      style={scale ? { scale } : undefined}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
    >
      <div className="flex h-full flex-col lg:flex-row">
        <ProjectImage project={project} imageRef={imageRef} tilt={tilt} tilting={tilting} />

        <div
          className={`flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 md:gap-6 md:p-6 lg:gap-0 lg:p-[3cqw] ${tone.panel}`}
        >
          <div className="flex min-h-6 items-center gap-3 lg:gap-[1.2cqw]">
            <p className="font-numeral text-sm lg:text-[max(14px,1.4cqw)]" aria-hidden="true">
              {pad(number)} / {pad(total)}
            </p>
            {/* On desktop the chips sit beside the number, which keeps the panel's height free for the text. */}
            {meta && <Chips project={project} className="max-lg:hidden" />}
            <span className="ml-auto flex items-center">
              {project.caseLine ? (
                <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase leading-none tracking-wide text-ink lg:px-[1.2cqw] lg:py-[0.5cqw] lg:text-[max(10px,0.9cqw)]">
                  Featured
                </span>
              ) : (
                meta && (
                  <span className="font-numeral text-xs opacity-75 max-lg:hidden lg:text-[max(12px,1.1cqw)]">
                    {project.year}
                  </span>
                )
              )}
            </span>
          </div>

          <div className="min-w-0">
            <h3
              className="font-cond min-h-[1.76em] text-[clamp(2rem,9vw,3.5rem)] uppercase leading-[0.88] lg:text-[min(7.4cqw,calc((100svh_-_11rem)*0.16))]"
            >
              {/* The title is the card's link; its ::after stretches over the whole card. */}
              <SiteLink
                href={`${routes.work}/${project.id}`}
                aria-label={`${project.title}: view case study, project ${number} of ${total}`}
                className="select-none outline-none after:absolute after:inset-0 after:content-['']"
              >
                {project.title.split(" ").map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </SiteLink>
            </h3>

            {meta && (
              <div className="mt-2 flex items-center justify-between gap-2 lg:hidden">
                <Chips project={project} />
                {!project.caseLine && <span className="font-numeral text-xs opacity-75">{project.year}</span>}
              </div>
            )}
          </div>

          {project.caseLine && (
            <Details line={project.caseLine} id={rowsId} open={expanded} />
          )}

          <div className="flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2.5 whitespace-nowrap text-[13px] min-[380px]:gap-3 min-[380px]:text-sm lg:gap-[1cqw] lg:text-[max(14px,1.4cqw)]">
              <span
                aria-hidden="true"
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition duration-300 group-hover:rotate-45 min-[380px]:h-11 min-[380px]:w-11 lg:h-[5cqw] lg:w-[5cqw] ${tone.badge}`}
              >
                <ArrowUpRightIcon className="h-5 w-5 lg:h-[2.2cqw] lg:w-[2.2cqw]" />
              </span>
              View case study
            </span>

            {project.caseLine && (
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={rowsId}
                onClick={() => setExpanded((current) => !current)}
                className="relative z-10 -mr-2 inline-flex min-h-10 shrink-0 select-none items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[13px] font-medium transition active:opacity-60 min-[380px]:min-h-11 min-[380px]:gap-2 min-[380px]:px-3 min-[380px]:text-sm md:hidden"
              >
                {expanded ? "See less" : "See more"}
                <PlusMinusIcon open={expanded} className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {dim && (
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
      )}
    </motion.div>
  );
}

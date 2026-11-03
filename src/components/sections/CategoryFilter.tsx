"use client";

import { useEffect, useRef, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { categories, type CategoryFilterId } from "@/data/content";

const options: readonly { id: CategoryFilterId; label: string }[] = [{ id: "all", label: "All" }, ...categories];

const pad = (value: number) => String(value).padStart(2, "0");

interface CategoryFilterProps {
  value: CategoryFilterId;
  counts: Record<CategoryFilterId, number>;
  onChange: (next: CategoryFilterId) => void;
  /** The bar itself, so the page can measure where it pins. */
  barRef: RefObject<HTMLDivElement | null>;
}

/**
 * The category pills. The bar pins under the header while the list scrolls, and follows the header
 * up when it tucks away. Phones scroll it sideways (with soft edges that show there is more);
 * from tablet up all five pills fit. The black pill slides to the chosen category. The labels are
 * white drawn with "difference", so they read black on a white pill and white on the black one at
 * every moment of the slide.
 */
export function CategoryFilter({ value, counts, onChange, barRef }: CategoryFilterProps) {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const fadeLeft = useRef<HTMLSpanElement>(null);
  const fadeRight = useRef<HTMLSpanElement>(null);

  // Soft edges appear only on the side that has more pills hidden. Written straight to the
  // elements, so scrolling never re-renders anything.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const update = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      if (fadeLeft.current) fadeLeft.current.style.opacity = scroller.scrollLeft > 2 ? "1" : "0";
      if (fadeRight.current) fadeRight.current.style.opacity = scroller.scrollLeft < max - 2 ? "1" : "0";
    };
    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    return () => {
      scroller.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  // Keeps the chosen pill in view on phones.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = scroller?.querySelector<HTMLElement>("[aria-pressed='true']");
    if (!scroller || !active || scroller.scrollWidth <= scroller.clientWidth) return;
    const left = active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2;
    scroller.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  }, [value, reduceMotion]);

  return (
    <div
      ref={barRef}
      className="sticky top-[var(--bar-top)] z-30 -mx-3 rounded-full bg-surface/80 backdrop-blur-md transition-[top] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
    >
      <div className="relative">
        <div
          ref={scrollerRef}
          role="group"
          aria-label="Filter projects by category"
          className="relative isolate flex snap-x gap-2 overflow-x-auto px-3 py-3 [scrollbar-width:none] md:gap-3 [&::-webkit-scrollbar]:hidden"
        >
          {options.map((option) => {
            const active = option.id === value;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(option.id)}
                className="relative inline-flex h-11 shrink-0 snap-center select-none items-center gap-2 rounded-full bg-white px-5 text-sm font-medium shadow-card transition duration-300 hover:bg-ink active:scale-[0.97] md:h-12 md:gap-2.5 md:px-6 md:text-base"
              >
                {active && (
                  <motion.span
                    layoutId="work-filter-pill"
                    aria-hidden="true"
                    className="absolute inset-0 z-[1] rounded-full bg-ink"
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative z-[2] text-white mix-blend-difference">{option.label}</span>
                <span className="font-numeral relative z-[2] text-[11px] text-white opacity-70 mix-blend-difference md:text-xs">
                  {pad(counts[option.id])}
                </span>
              </button>
            );
          })}
        </div>
        <span
          ref={fadeLeft}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 rounded-l-full bg-linear-to-r from-surface to-transparent opacity-0 transition-opacity duration-200 md:hidden"
        />
        <span
          ref={fadeRight}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-full bg-linear-to-l from-surface to-transparent opacity-0 transition-opacity duration-200 md:hidden"
        />
      </div>
    </div>
  );
}

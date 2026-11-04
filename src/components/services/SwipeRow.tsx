"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SwipeRowProps {
  /** The tiles, as <li> elements. */
  children: ReactNode;
  /** One name per tile, for the dots under the row. */
  labels: readonly string[];
  /** The tile that sits in the middle of the screen when the page opens. */
  initialIndex?: number;
  /** Describes the row for assistive tech ("Packages"). */
  label: string;
}

/** Scrolls the row so tile `index` sits in its middle. */
function centre(list: HTMLUListElement, index: number, smooth: boolean) {
  const tile = list.children[index] as HTMLElement | undefined;
  if (!tile) return;
  list.scrollTo({
    left: tile.offsetLeft - (list.clientWidth - tile.offsetWidth) / 2,
    behavior: smooth ? "smooth" : "auto",
  });
}

/**
 * A row of tiles that swipes sideways below desktop width and becomes a three-column grid on
 * desktop. The middle tile is centred on arrival so the ones either side peek in from the edges,
 * the tiles snap to the centre as you swipe, and dots underneath show where you are (and can be
 * tapped). On desktop there is nothing to scroll, so the dots are hidden.
 */
export function SwipeRow({ children, labels, initialIndex = 0, label }: SwipeRowProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef(initialIndex);
  const [active, setActive] = useState(initialIndex);
  const reduceMotion = useReducedMotion();

  // Centre the starting tile on arrival, and again if the screen turns or is resized.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const place = () => {
      if (list.scrollWidth > list.clientWidth) centre(list, activeRef.current, false);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  const onScroll = () => {
    const list = listRef.current;
    if (!list) return;
    const middle = list.scrollLeft + list.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(list.children).forEach((child, index) => {
      const tile = child as HTMLElement;
      const distance = Math.abs(tile.offsetLeft + tile.offsetWidth / 2 - middle);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    activeRef.current = nearest;
    setActive(nearest);
  };

  const goTo = (index: number) => {
    const list = listRef.current;
    if (list) centre(list, index, !reduceMotion);
  };

  return (
    <>
      <ul
        ref={listRef}
        aria-label={label}
        onScroll={onScroll}
        className="-mx-5 -mb-5 mt-0 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[15vw] pb-7 pt-4 [scrollbar-width:none] md:-mx-8 md:gap-4 md:px-[30vw] lg:mx-0 lg:mb-0 lg:mt-[2.5cqw] lg:grid lg:snap-none lg:grid-cols-3 lg:gap-[1.4cqw] lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      <div role="group" aria-label={`${label} position`} className="mt-3 flex justify-center lg:hidden">
        {labels.map((name, index) => (
          <button
            key={name}
            type="button"
            aria-label={`Show ${name}`}
            aria-current={index === active}
            onClick={() => goTo(index)}
            className="grid h-6 w-6 select-none place-items-center"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-2 rounded-full transition-all duration-300",
                index === active ? "w-6 bg-ink" : "w-2 bg-ink/25",
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}

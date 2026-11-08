import { useReducedMotion } from "framer-motion";
import { useIntroReady } from "@/components/layout/Intro";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Entrance animations for the top of a page, which is already on screen when it loads and so
 * cannot wait for a scroll. They are timed instead, and on a first visit they wait for the
 * loader's curtain to lift. With reduced motion everything simply appears.
 * - `slide`: the ghost word, which comes in from the left first (`slideRight` for pages whose ghost sits on the right).
 * - `rise(delay)`: everything else, which fades up after it.
 */
export function useEntrance() {
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

  const slideFrom = (x: string) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, x },
          animate: ready ? { opacity: 1, x: 0 } : { opacity: 0, x },
          transition: { duration: 1.1, ease: EASE },
        };

  return { reduceMotion, ready, rise, slide: slideFrom("-6vw"), slideRight: slideFrom("6vw") };
}

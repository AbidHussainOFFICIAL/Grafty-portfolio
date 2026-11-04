"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { Photo } from "@/components/ui/Photo";
import { ArrowRightLongIcon, CloseIcon } from "@/components/ui/Icons";
import { useDialog } from "@/lib/useDialog";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A swipe counts when it travels this far (pixels) or is this fast (pixels per second). */
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

const SIZES = "(min-width: 768px) 75vh, 90vw";

const circle =
  "grid h-11 w-11 shrink-0 select-none place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white active:scale-95 md:h-12 md:w-12";

export interface ViewerShot {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

interface ImageViewerProps {
  shots: readonly ViewerShot[];
  /** The picture on show. */
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Full-screen image viewer, in the same style as the phone menu: a surface-coloured sheet with
 * round white buttons. Every picture sits in the same square frame, so they all show at one size. Arrow keys, the buttons and a swipe move
 * between pictures (and wrap round at the ends); Escape, the close button or a tap outside the
 * picture close it. Pressing quickly always lands on the last picture asked for.
 * It must be mounted in a portal (see CaseGallery): the page's layout container would otherwise
 * trap its fixed positioning.
 */
export function ImageViewer({ shots, index, onChange, onClose }: ImageViewerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(1);
  useDialog(panelRef, onClose);

  const count = shots.length;
  const shot = shots[index];

  const go = (step: number) => {
    setDirection(step);
    onChange((index + step + count) % count);
  };

  // The keyboard handler always calls the latest `go`.
  const goRef = useRef(go);
  useEffect(() => {
    goRef.current = go;
  });
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goRef.current(1);
      else if (event.key === "ArrowLeft") goRef.current(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const onDragEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1);
  };

  const travel = reduceMotion ? 0 : 60;
  const neighbours = count > 1 ? [(index + 1) % count, (index - 1 + count) % count] : [];

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      tabIndex={-1}
      data-lenis-prevent
      className="fixed inset-0 z-[90] flex flex-col bg-surface outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // While it fades out it must not swallow taps meant for the page behind it.
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] shrink-0 items-center justify-between px-5 py-4 md:px-8">
        <p className="font-numeral text-sm md:text-base">
          {pad(index + 1)} / {pad(count)}
        </p>
        <button type="button" aria-label="Close image viewer" onClick={onClose} className={circle}>
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 items-center justify-center overflow-hidden px-5 md:px-8"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (step: number) => ({ x: step * travel, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (step: number) => ({ x: -step * travel, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            className="relative aspect-square w-[min(100%,calc(100svh-11rem),48rem)] touch-pan-y"
          >
            <Photo
              src={shot.src}
              alt={shot.alt}
              fill
              sizes={SIZES}
              draggable={false}
              className="select-none rounded-card object-cover shadow-card"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] shrink-0 items-center justify-between gap-4 px-5 pb-5 pt-4 md:px-8">
        {count > 1 && (
          <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={circle}>
            <ArrowRightLongIcon className="h-5 w-5 rotate-180" />
          </button>
        )}
        <p aria-live="polite" className="min-w-0 flex-1 text-center text-sm md:text-base">
          {shot.caption}
        </p>
        {count > 1 && (
          <button type="button" aria-label="Next image" onClick={() => go(1)} className={circle}>
            <ArrowRightLongIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Loads the pictures either side in advance, so stepping through never waits. */}
      <div hidden>
        {neighbours.map((n) => (
          <Photo
            key={shots[n].src + n}
            src={shots[n].src}
            alt=""
            width={888}
            height={888}
            sizes={SIZES}
            loading="eager"
            fetchPriority="low"
          />
        ))}
      </div>
    </motion.div>
  );
}

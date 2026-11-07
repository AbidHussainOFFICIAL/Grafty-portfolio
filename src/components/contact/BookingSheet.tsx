"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { booking } from "@/data/content";
import { CloseIcon } from "@/components/ui/Icons";
import { useDialog } from "@/lib/useDialog";
import { BookingPicker } from "./BookingPicker";
import type { Draft, Outcome, PatchDraft } from "./draft";
import { PHONE_QUERY } from "./phone";

interface BookingSheetProps {
  draft: Draft;
  patch: PatchDraft;
  onBooked: (outcome: Outcome) => void;
  onClose: () => void;
}

/**
 * The booking on phones: a full-screen sheet that slides up, like the menu. It is drawn straight into
 * the document body, because the page content sits in a container that would otherwise confine it.
 */
export function BookingSheet({ draft, patch, onBooked, onClose }: BookingSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  useDialog(panelRef, onClose);

  // Leaving the phone layout (rotating a tablet, resizing) closes the sheet: the page shows the booking inline there.
  useEffect(() => {
    const list = window.matchMedia(PHONE_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (!event.matches) onClose();
    };
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [onClose]);

  return createPortal(
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-sheet-title"
      tabIndex={-1}
      data-lenis-prevent
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-surface outline-none"
      initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
      animate={reduceMotion ? { opacity: 1 } : { y: "0%" }}
      // Taps during the slide-down must reach the page behind, not the closing sheet.
      exit={reduceMotion ? { opacity: 0, pointerEvents: "none" } : { y: "100%", pointerEvents: "none" }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex min-h-full max-w-xl flex-col px-5 pb-8 pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            aria-label="Close the booking"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white active:scale-95"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <h2 id="booking-sheet-title" className="font-cond mt-6 text-[clamp(3rem,16vw,4.5rem)] uppercase leading-[0.95]">
          {booking.title}
        </h2>
        <p className="mt-3 text-base leading-snug">{booking.intro}</p>

        <div className="mt-8 rounded-card bg-white p-5 shadow-card">
          <BookingPicker draft={draft} patch={patch} onBooked={onBooked} />
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}

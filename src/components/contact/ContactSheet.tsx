"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contact } from "@/data/content";
import { CloseIcon } from "@/components/ui/Icons";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ContactForm } from "@/components/sections/ContactForm";
import { useDialog } from "@/lib/useDialog";
import { SHEET_QUERY } from "./sheetQuery";

/** The full-screen contact form for phones. Loaded the first time it is needed. */
export function ContactSheet({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  useDialog(panelRef, onClose);

  // Leaving the phone layout (rotating a tablet, resizing) closes the sheet.
  useEffect(() => {
    const list = window.matchMedia(SHEET_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (!event.matches) onClose();
    };
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-sheet-title"
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
            aria-label="Close contact form"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white active:scale-95"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <h2
          id="contact-sheet-title"
          className="font-cond mt-6 text-[clamp(3rem,16vw,4.5rem)] uppercase leading-[0.95]"
        >
          {contact.title}
        </h2>
        <p className="mt-3 text-base leading-snug">
          Tell me about your project and I will get back to you.
        </p>

        <div className="mt-8 rounded-card bg-white p-5 shadow-card">
          <ContactForm />
        </div>

        <div className="mt-8 text-sm">
          <p className="text-ink/70">Prefer email?</p>
          <CopyEmail className="mt-2" />
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useId, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contactPage } from "@/data/content";
import { cn } from "@/lib/cn";
import type { ContactMode } from "@/lib/useContactLocation";

const MODES: readonly ContactMode[] = ["brief", "call"];

interface ModeSwitchProps {
  mode: ContactMode;
  onChange: (mode: ContactMode) => void;
  /** The id of the panel the tabs control. */
  panelId: string;
}

/** "Project brief" / "Book a call": two tabs in a white track, with an ink pill that slides under the chosen one. */
export function ModeSwitch({ mode, onChange, panelId }: ModeSwitchProps) {
  const prefix = useId();
  const reduceMotion = useReducedMotion();

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
    onChange(next);
    document.getElementById(`${prefix}-${next}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="How would you like to start?"
      className="relative grid grid-cols-2 gap-1 rounded-full bg-white p-1 shadow-card md:inline-grid md:grid-cols-[auto_auto] lg:p-[0.35cqw]"
    >
      {MODES.map((id) => {
        const selected = id === mode;
        const { label, note } = contactPage.modes[id];
        return (
          <button
            key={id}
            id={`${prefix}-${id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
            onKeyDown={onKeyDown}
            className={cn(
              "relative flex h-12 select-none items-center justify-center gap-3 rounded-full px-4 text-sm font-medium transition-colors duration-300 md:px-8 md:text-base lg:h-[4.4cqw] lg:px-[3cqw] lg:text-[max(14px,1.5cqw)]",
              selected ? "text-white" : "hover:text-violet-deep",
            )}
          >
            {selected && (
              <motion.span
                layoutId={`${prefix}-pill`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className="relative">{label}</span>
            <span
              className={cn(
                "relative hidden text-xs font-normal md:inline lg:text-[max(11px,1.05cqw)]",
                selected ? "text-white/70" : "text-ink/60",
              )}
            >
              {note}
            </span>
          </button>
        );
      })}
    </div>
  );
}

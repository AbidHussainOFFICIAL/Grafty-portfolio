"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { PlusMinusIcon } from "./Icons";

export interface AccordionEntry {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

interface AccordionProps {
  items: readonly AccordionEntry[];
  /** "card" = white cards (services). "line" = hairline rows (FAQ). */
  variant: "card" | "line";
  defaultOpenId?: string;
}

/*
 * The padding lives on the header button (and on the panel's inner wrapper), not on the
 * item, so the whole header area is clickable and not just the title and the icon.
 * While open, the button's bottom padding shrinks to the gap above the answer.
 */
const styles = {
  card: {
    list: "flex flex-col gap-2.5 lg:gap-[0.98cqw]",
    item: "overflow-hidden rounded-xl bg-white lg:rounded-[1.4cqw]",
    button:
      "gap-4 px-5 py-5 hover:bg-ink/[0.03] aria-expanded:pb-3 md:px-8 md:py-7 md:aria-expanded:pb-4 lg:px-[3.9cqw] lg:py-[4.1cqw] lg:aria-expanded:pb-[2.8cqw]",
    title:
      "font-cond translate-y-[0.04em] text-[clamp(2.25rem,11vw,4.5rem)] uppercase leading-[0.9] lg:text-[8.2cqw]",
    icon: "h-6 w-6 shrink-0 md:h-9 md:w-9 lg:h-[4.3cqw] lg:w-[4.3cqw]",
    panel: "px-5 pb-5 md:px-8 md:pb-7 lg:px-[3.9cqw] lg:pb-[4.1cqw]",
    body: "max-w-prose text-base leading-snug md:text-xl lg:max-w-[66cqw] lg:text-[2.35cqw] lg:leading-[1.4]",
  },
  line: {
    list: "border-t border-ink",
    item: "border-b border-ink",
    button:
      "gap-6 py-5 hover:bg-ink/[0.03] aria-expanded:pb-3 md:py-6 lg:py-[3.2cqw] lg:aria-expanded:pb-[1cqw]",
    title:
      "font-cond text-lg uppercase leading-tight md:text-2xl lg:text-[2.25cqw] lg:leading-none",
    icon: "h-4 w-4 shrink-0 md:h-5 md:w-5 lg:h-[1.6cqw] lg:w-[1.6cqw]",
    panel: "pb-5 md:pb-6 lg:pb-[3.2cqw]",
    body: "text-sm leading-relaxed md:text-base lg:max-w-[88cqw] lg:text-[max(14px,1.4cqw)] lg:leading-[1.65]",
  },
} as const;

/** Single-open accordion with keyboard-accessible headers and animated panels. */
export function Accordion({ items, variant, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const style = styles[variant];

  return (
    <ul className={style.list}>
      {items.map((item) => {
        const open = item.id === openId;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <li key={item.id} className={style.item}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between text-left transition-colors duration-300",
                  style.button,
                )}
              >
                <span className={style.title}>{item.title}</span>
                <PlusMinusIcon open={open} className={style.icon} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  {/* Padding sits on this inner wrapper: the animated element above must be able to shrink to zero height. */}
                  <div className={style.panel}>
                    <p className={style.body}>{item.body}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

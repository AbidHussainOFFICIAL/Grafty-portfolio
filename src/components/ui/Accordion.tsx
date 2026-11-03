"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ArrowUpRightIcon, PlusMinusIcon } from "./Icons";
import { SiteLink } from "./SiteLink";

export interface AccordionEntry {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

interface AccordionProps {
  items: readonly AccordionEntry[];
  defaultOpenId?: string;
  /** Shows 01, 02... before each title. */
  numbered?: boolean;
  /** A last row that is a link, not an accordion item (it ends the list in a dark card). */
  action?: { readonly label: string; readonly href: string };
}

/*
 * The padding lives on the header button (and on the panel's inner wrapper), not on the
 * item, so the whole header area is clickable and not just the title and the icon.
 * While open, the button's bottom padding shrinks to the gap above the answer.
 */
const style = {
  list: "flex flex-col gap-2.5 lg:gap-[0.98cqw]",
  item: "overflow-hidden rounded-card bg-white shadow-card",
  button:
    "gap-4 px-5 py-5 hover:bg-ink/[0.03] aria-expanded:pb-3 md:px-8 md:py-7 md:aria-expanded:pb-4 lg:px-[3.9cqw] lg:py-[4.1cqw] lg:aria-expanded:pb-[2.8cqw]",
  title:
    "font-cond translate-y-[0.04em] text-[clamp(2.25rem,11vw,4.5rem)] uppercase leading-[0.9] lg:text-[8.2cqw]",
  icon: "h-6 w-6 shrink-0 md:h-9 md:w-9 lg:h-[4.3cqw] lg:w-[4.3cqw]",
  panel: "px-5 pb-5 md:px-8 md:pb-7 lg:px-[3.9cqw] lg:pb-[4.1cqw]",
  body: "max-w-prose text-base leading-snug md:text-xl lg:max-w-[66cqw] lg:text-[2.35cqw] lg:leading-[1.4]",
} as const;

/** Single-open accordion with keyboard-accessible headers and animated panels. */
export function Accordion({ items, defaultOpenId, numbered = false, action }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <ul className={style.list}>
      {items.map((item, index) => {
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
                onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                className={cn(
                  "flex w-full cursor-pointer select-none items-center justify-between text-left transition-colors duration-300",
                  style.button,
                )}
              >
                <span className="flex min-w-0 items-baseline gap-3 lg:gap-[1.6cqw]">
                  {numbered && (
                    <span aria-hidden="true" className="font-numeral text-sm opacity-60 md:text-base lg:text-[1.6cqw]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                  <span className={style.title}>{item.title}</span>
                </span>
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
      {action && (
        <li className="overflow-hidden rounded-card bg-ink text-white shadow-card">
          <SiteLink
            href={action.href}
            className="group flex w-full select-none items-center justify-between gap-4 px-5 py-5 transition-colors duration-300 hover:bg-violet active:opacity-90 md:px-8 md:py-7 lg:px-[3.9cqw] lg:py-[4.1cqw]"
          >
            <span className={style.title}>{action.label}</span>
            <ArrowUpRightIcon className={`${style.icon} transition duration-300 group-hover:rotate-45`} />
          </SiteLink>
        </li>
      )}
    </ul>
  );
}

"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PlusMinusIcon } from "@/components/ui/Icons";

export interface ContentsItem {
  /** The id of the section's element on the page. */
  readonly id: string;
  readonly title: string;
}

const pad = (index: number) => String(index + 1).padStart(2, "0");

/**
 * "On this page". Desktop: a list that stays beside the document and marks the section being read.
 * Phones and tablets: a white bar above the document that opens to the same list.
 */
export function LegalContents({ items }: { items: readonly ContentsItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  useEffect(() => {
    const targets = items.flatMap((item) => {
      const element = document.getElementById(item.id);
      return element ? [element] : [];
    });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="mb-4 min-w-0 lg:sticky lg:top-[calc(var(--bar-top)+1rem)] lg:mb-0 lg:self-start">
      {/* Phones and tablets */}
      <div className="overflow-hidden rounded-card bg-white shadow-card lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
          className="flex min-h-14 w-full cursor-pointer select-none items-center justify-between gap-4 px-5 text-left text-base font-semibold transition-colors duration-300 hover:bg-ink/[0.03] md:px-8"
        >
          On this page
          <PlusMinusIcon open={open} className="h-5 w-5 shrink-0 md:h-7 md:w-7" />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              id={panelId}
              aria-label="On this page"
              key="list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ol className="px-5 pb-3 md:px-8">
                {items.map((item, index) => (
                  <li key={item.id} className="border-t border-ink/15">
                    <a
                      href={`#${item.id}`}
                      className="flex min-h-12 items-baseline gap-3 py-3 text-base transition-colors duration-300 hover:text-violet-deep"
                    >
                      <span aria-hidden="true" className="font-numeral text-sm text-violet-deep">
                        {pad(index)}
                      </span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop */}
      <nav aria-label="On this page" className="hidden lg:block">
        <p className="text-[max(11px,1.05cqw)] font-semibold uppercase tracking-wide">On this page</p>
        <ol className="mt-[1.2cqw] border-t border-ink/15 pt-[0.8cqw]">
          {items.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className="relative flex items-baseline gap-[1cqw] py-[0.55cqw] pl-[1.6cqw] text-[max(13px,1.3cqw)] transition-colors duration-300 before:absolute before:left-0 before:top-1/2 before:h-[0.55cqw] before:w-[0.55cqw] before:-translate-y-1/2 before:scale-0 before:rounded-full before:bg-ink before:transition-transform before:duration-300 hover:text-violet-deep aria-[current]:font-semibold aria-[current]:before:scale-100"
              >
                <span aria-hidden="true" className="font-numeral text-[max(11px,1.05cqw)] text-violet-deep">
                  {pad(index)}
                </span>
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}

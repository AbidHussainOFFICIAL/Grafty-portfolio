"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SiteLink } from "@/components/ui/SiteLink";
import { useEntrance } from "@/lib/useEntrance";

const pill =
  "h-12 w-full px-8 text-base md:w-auto lg:h-[4.6cqw] lg:px-[3cqw] lg:text-[max(14px,1.5cqw)]";

/** The black pill of a status page ("Back to home", "Try again"). A link with `href`, otherwise a button. */
export function StatusButton({ href, onClick, children }: { href?: string; onClick?: () => void; children: string }) {
  return href === undefined ? (
    <Button onClick={onClick} className={pill}>
      {children}
    </Button>
  ) : (
    <Button href={href} className={pill}>
      {children}
    </Button>
  );
}

/** The white pill next to it. */
export function StatusLink({ href, children }: { href: string; children: string }) {
  return (
    <SiteLink
      href={href}
      className={`inline-flex select-none items-center justify-center rounded-full bg-white font-medium text-ink shadow-card transition duration-300 ease-out hover:bg-ink hover:text-white active:scale-[0.97] ${pill}`}
    >
      {children}
    </SiteLink>
  );
}

interface StatusPageProps {
  /** The large ghost word and its width-to-height ratio. */
  ghost: string;
  ratio: number;
  /** The small label at the right of the title row (tablets and up). */
  label: string;
  title: string;
  text: string;
  /** The row of buttons under the text. */
  actions: ReactNode;
  /** Anything below the buttons: quick links, a reference code. */
  extra?: ReactNode;
}

/**
 * The page behind the 404 and error screens, built like the other page headers: the ghost word
 * slides in first, then the label, headline, text and buttons rise one after the other. The
 * headline takes focus so a screen reader announces what happened.
 */
export function StatusPage({ ghost, ratio, label, title, text, actions, extra }: StatusPageProps) {
  const { rise, slide } = useEntrance();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ghostWidth = { "--ghost-w": `${Math.round(ratio * 9.3)}%` } as CSSProperties;

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section aria-labelledby="status-title" className="px-5 pt-4 md:px-8 md:pt-14 lg:px-[5.08%] lg:pt-[5cqw]">
      <div className="flex items-end justify-between gap-4" style={ghostWidth}>
        <motion.div className="w-full md:w-[var(--ghost-w)]" {...slide}>
          <GhostHeading text={ghost} ratio={ratio} className="w-full" />
        </motion.div>

        <motion.div className="hidden text-right md:mb-2 md:block lg:mb-[2.4cqw]" {...rise(0.3)}>
          <SectionLabel as="p" bar="after">
            {label}
          </SectionLabel>
        </motion.div>
      </div>

      <motion.h1
        ref={headingRef}
        id="status-title"
        tabIndex={-1}
        className="font-cond mt-block text-[clamp(2.5rem,12vw,4.5rem)] uppercase leading-[0.9] lg:text-[6cqw]"
        {...rise(0.45)}
      >
        {title}
      </motion.h1>
      <motion.p
        className="mt-4 max-w-[34rem] text-base leading-snug md:text-xl lg:mt-[1.6cqw] lg:max-w-[48cqw] lg:text-[1.9cqw] lg:leading-[1.4]"
        {...rise(0.6)}
      >
        {text}
      </motion.p>

      <motion.div className="mt-8 flex flex-col gap-3 md:flex-row lg:mt-[3cqw] lg:gap-[1cqw]" {...rise(0.75)}>
        {actions}
      </motion.div>

      {extra && (
        <motion.div className="mt-10 lg:mt-[3.4cqw]" {...rise(0.9)}>
          {extra}
        </motion.div>
      )}
    </section>
  );
}

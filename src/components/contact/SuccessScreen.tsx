"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { booking, contactSuccess, routes, site } from "@/data/content";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { ArrowDownIcon } from "@/components/ui/Icons";
import type { Outcome } from "./draft";

const EASE = [0.22, 1, 0.36, 1] as const;

interface SuccessScreenProps {
  outcome: Outcome;
  /** Goes back to an empty form. */
  onReset: () => void;
  /** Switches to the other half of the page (a call after a brief, a brief after a call). */
  onOther: () => void;
}

/**
 * "Message sent" (and "You're booked"): a tick that draws itself, a recap of what was sent or booked
 * and what happens next. It replaces the form in the panel, and takes focus so screen readers hear it.
 */
export function SuccessScreen({ outcome, onReset, onOther }: SuccessScreenProps) {
  const reduceMotion = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copy = contactSuccess[outcome.kind];
  const firstName = outcome.name.split(/\s+/)[0] ?? outcome.name;

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, []);

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <div>
      <motion.span
        aria-hidden="true"
        className="grid h-16 w-16 place-items-center rounded-full bg-accent text-white lg:h-[7cqw] lg:w-[7cqw]"
        {...(reduceMotion
          ? {}
          : { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.6, ease: EASE } })}
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 lg:h-[3.4cqw] lg:w-[3.4cqw]" fill="none">
          <motion.path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...(reduceMotion
              ? {}
              : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.6, delay: 0.3, ease: EASE } })}
          />
        </svg>
      </motion.span>

      <motion.h2
        ref={titleRef}
        tabIndex={-1}
        className="font-cond mt-6 text-[clamp(3rem,15vw,4.5rem)] uppercase leading-[0.95] outline-none lg:mt-[2cqw] lg:text-[7cqw]"
        {...rise(0.15)}
      >
        {copy.title}
      </motion.h2>
      <motion.p
        className="mt-3 max-w-[34rem] text-base leading-snug md:text-xl lg:mt-[1.2cqw] lg:max-w-[44cqw] lg:text-[1.9cqw] lg:leading-[1.4]"
        {...rise(0.25)}
      >
        {copy.text.replace("{name}", firstName)}
      </motion.p>

      <motion.div className="mt-6 lg:mt-[2cqw]" {...rise(0.35)}>
        {outcome.kind === "brief" ? (
          <ul aria-label="What you sent" className="flex flex-wrap gap-2 lg:gap-[0.7cqw]">
            {outcome.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-ink/40 px-3.5 py-1.5 text-sm lg:px-[1.6cqw] lg:py-[0.7cqw] lg:text-[max(13px,1.15cqw)]"
              >
                {chip}
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-card bg-surface p-5 lg:p-[2cqw]">
            <p className="font-cond text-2xl uppercase leading-none md:text-[1.75rem] lg:text-[2.4cqw]">{outcome.when}</p>
            <p className="mt-2 text-sm lg:text-[max(13px,1.2cqw)]">
              {booking.durationMinutes} min on {booking.meeting} with {site.name}
            </p>
            <a
              href={`data:text/calendar;charset=utf-8,${encodeURIComponent(outcome.ics)}`}
              download="intro-call.ics"
              className="group mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors duration-300 hover:text-violet-deep lg:text-[max(13px,1.2cqw)]"
            >
              <ArrowDownIcon className="h-4 w-4 transition duration-300 group-hover:translate-y-0.5" />
              Add to my calendar
            </a>
          </div>
        )}
      </motion.div>

      <motion.div className="mt-8 border-t border-ink/15 pt-8 lg:mt-[3cqw] lg:pt-[3cqw]" {...rise(0.45)}>
        <h3 className="font-cond text-[clamp(1.75rem,8vw,2.25rem)] uppercase leading-none lg:text-[3cqw]">What happens next</h3>
        <ol className="mt-5 flex flex-col gap-5 lg:mt-[1.8cqw] lg:gap-[1.8cqw]">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="flex gap-4 lg:gap-[1.6cqw]">
              <span aria-hidden="true" className="font-numeral w-6 shrink-0 pt-0.5 text-sm opacity-60 md:text-base lg:w-[2.4cqw] lg:text-[1.4cqw]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-base font-semibold lg:text-[max(15px,1.6cqw)]">{step.title}</p>
                <p className="mt-1 max-w-prose text-sm leading-snug md:text-base lg:mt-[0.4cqw] lg:max-w-[44cqw] lg:text-[max(13px,1.35cqw)]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>

      <motion.div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 lg:mt-[3cqw] lg:gap-x-[3cqw]" {...rise(0.55)}>
        <Button href="/" className="h-12 px-8 text-base md:h-11 md:text-sm lg:h-[4.6cqw] lg:px-[3cqw] lg:text-[max(14px,1.5cqw)]">
          Back to home
        </Button>
        <ArrowLink href={routes.work}>See my work</ArrowLink>
        <ArrowLink
          href="#start"
          inPage
          onClick={(event) => {
            event.preventDefault();
            onOther();
          }}
        >
          {copy.other}
        </ArrowLink>
      </motion.div>

      <motion.p className="mt-4 lg:mt-[1.2cqw]" {...rise(0.6)}>
        <button
          type="button"
          onClick={onReset}
          className="min-h-11 text-sm underline underline-offset-4 transition-colors duration-300 hover:text-violet-deep lg:text-[max(13px,1.2cqw)]"
        >
          Start over
        </button>
      </motion.p>
    </div>
  );
}

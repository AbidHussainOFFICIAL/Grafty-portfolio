"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { workflow, type WorkflowStep } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollWords } from "@/components/ui/ScrollWords";

const STATEMENT = "Five clear steps, no surprises. You always know what happens next.";

interface StepProps {
  step: WorkflowStep;
  number: number;
  reduceMotion: boolean;
}

/**
 * One step. Its number and title (and the dot on the line) light up as the row rises through
 * the screen, and its text lights word by word, the same way the About statement does.
 */
function Step({ step, number, reduceMotion }: StepProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.45"] });
  const opacity: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0.16, 1]);

  return (
    <li ref={ref} className="relative pb-10 last:pb-0 md:pb-14 lg:pb-[5cqw]">
      <span
        aria-hidden="true"
        className="absolute -left-9 top-4 h-3 w-3 rounded-full bg-ink/20 md:-left-14 md:top-5 lg:-left-[8cqw] lg:top-[2.4cqw]"
      >
        <motion.span className="absolute inset-0 rounded-full bg-accent" style={reduceMotion ? undefined : { opacity: scrollYProgress }} />
      </span>

      <motion.div style={reduceMotion ? undefined : { opacity }} className="flex items-baseline gap-3 lg:gap-[1.6cqw]">
        <span aria-hidden="true" className="font-numeral text-sm opacity-60 md:text-base lg:text-[1.6cqw]">
          {String(number).padStart(2, "0")}
        </span>
        <h3 className="font-cond translate-y-[0.04em] text-[clamp(2.25rem,11vw,4.5rem)] uppercase leading-[0.9] lg:text-[6.4cqw]">
          {step.title}
        </h3>
        <span className="ml-auto self-center rounded-full border border-ink/40 px-2.5 py-1 text-xs leading-none md:text-sm lg:px-[1.2cqw] lg:py-[0.6cqw] lg:text-[max(12px,1.1cqw)]">
          {step.time}
        </span>
      </motion.div>

      <ScrollWords
        text={step.body}
        className="mt-3 max-w-prose text-base leading-snug md:mt-4 md:text-xl lg:mt-[1.2cqw] lg:max-w-[56cqw] lg:text-[2cqw] lg:leading-[1.4]"
      />
    </li>
  );
}

/**
 * "How I work": a centred pill and a statement that lights up word by word (as in About), then the
 * five steps down a vertical line that fills as you scroll. With reduced motion everything is lit.
 */
export function ProcessSteps() {
  const reduceMotion = useReducedMotion() ?? false;
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });

  return (
    <section id="process" aria-labelledby="process-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <div className="text-center">
        <Reveal>
          <h2
            id="process-title"
            className="inline-block rounded-full bg-white px-4 py-1.5 text-[10px] font-medium uppercase leading-none tracking-wide lg:px-[2.2cqw] lg:py-[0.9cqw] lg:text-[max(11px,0.95cqw)]"
          >
            How I work
          </h2>
        </Reveal>
        <ScrollWords
          text={STATEMENT}
          className="font-statement mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,7.4vw,3.25rem)] uppercase leading-[1.02] md:max-w-[30ch] lg:mt-[3cqw] lg:max-w-[81cqw] lg:text-[4.8cqw] lg:leading-[1.06]"
        />
      </div>

      <ol ref={listRef} className="relative mt-12 pl-9 md:mt-16 md:pl-14 lg:mt-[7cqw] lg:pl-[8cqw]">
        <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-0 w-0.5 bg-ink/15" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-[5px] top-0 w-0.5 origin-top bg-ink"
          style={reduceMotion ? undefined : { scaleY: scrollYProgress }}
        />
        {workflow.map((step, index) => (
          <Step key={step.id} step={step} number={index + 1} reduceMotion={reduceMotion} />
        ))}
      </ol>
    </section>
  );
}

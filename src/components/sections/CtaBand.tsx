"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { contact, routes } from "@/data/content";
import { signature } from "@/data/artwork";
import { CircularBadge } from "@/components/ui/CircularBadge";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SiteLink } from "@/components/ui/SiteLink";
import { VectorArt } from "@/components/ui/VectorArt";

const EASE = [0.22, 1, 0.36, 1] as const;

const pill =
  "inline-flex h-12 w-full select-none items-center justify-center rounded-full px-8 text-base font-medium transition duration-300 ease-out active:scale-[0.97] md:w-auto lg:h-[4.6cqw] lg:px-[3cqw] lg:text-[max(14px,1.5cqw)]";

/**
 * The closing "Let's work together" panel: "Start a project" and "Book a call" lead to the Contact
 * page. The headline lines rise through masks like the hero's, the buttons fade in one after the
 * other and the seal turns slowly.
 */
export function CtaBand({ className }: { className?: string }) {
  const { band } = contact;
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <Reveal className={className}>
      <div
        ref={ref}
        className="relative overflow-hidden rounded-card bg-violet p-6 text-white shadow-card md:p-10 lg:p-[5cqw]"
      >
        <VectorArt
          art={signature}
          className="pointer-events-none absolute bottom-[1.1rem] right-0 w-[78%] text-white/10 md:bottom-8 md:right-8 md:w-[46%] lg:bottom-[3.2cqw] lg:right-[4.4cqw] lg:w-[50%]"
        />

        <div className="relative md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8">
          <div>
            <motion.p className="text-base text-white/90 md:text-lg lg:text-[max(14px,1.7cqw)]" {...fade(0.05)}>
              {band.eyebrow}
            </motion.p>

            <h3 className="font-cond mt-2 text-[clamp(2.75rem,14vw,6rem)] uppercase leading-[0.85] lg:mt-[1cqw] lg:text-[9.6cqw] lg:leading-[0.83]">
              {band.headline.map((line, index) => (
                <span key={line} className="-my-[0.14em] block overflow-hidden py-[0.14em]">
                  <motion.span
                    className="block"
                    initial={reduceMotion ? false : { y: "115%" }}
                    animate={reduceMotion ? undefined : { y: inView ? 0 : "115%" }}
                    transition={{ duration: 0.9, delay: 0.1 + index * 0.12, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h3>

            <div className="mt-8 flex flex-col gap-3 md:flex-row lg:mt-[3.4cqw] lg:gap-[1cqw]">
              <motion.div className="w-full md:w-auto" {...fade(0.45)}>
                <SiteLink
                  href={routes.contact}
                  className={`${pill} bg-white text-ink hover:bg-ink hover:text-white`}
                >
                  {band.primary}
                </SiteLink>
              </motion.div>
              <motion.div className="w-full md:w-auto" {...fade(0.58)}>
                <SiteLink
                  href={routes.contactBook}
                  className={`${pill} border border-white text-white hover:bg-white hover:text-violet-deep`}
                >
                  {band.secondary}
                </SiteLink>
              </motion.div>
            </div>

          </div>

          <SiteLink
            href={routes.contact}
            aria-label={band.primary}
            className="hidden transition duration-300 hover:scale-105 md:block"
          >
            <CircularBadge tone="light" className="h-36 w-36 lg:h-[17cqw] lg:w-[17cqw]">
              <ArrowUpRightIcon className="h-10 w-10 text-violet-deep lg:h-[6cqw] lg:w-[6cqw]" />
            </CircularBadge>
          </SiteLink>
        </div>

      </div>
    </Reveal>
  );
}

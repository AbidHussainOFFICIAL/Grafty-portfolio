"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { legalUpdated, type LegalDoc } from "@/data/legal";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";
import { useEntrance } from "@/lib/useEntrance";

/**
 * The title row of the Privacy and Terms pages, built like the other page headers: the ghost word
 * slides in first, then the label (tablets and up), the intro line and the date follow it. The two
 * pages alternate sides, like the ghost words down the other pages. Timed rather than scroll-driven
 * because it is already on screen when the page opens (and on a first visit it waits for the
 * loader's curtain to lift).
 */
export function LegalHeader({ doc }: { doc: LegalDoc }) {
  const { rise, slide, slideRight } = useEntrance();
  const fromRight = doc.from === "right";
  // The same capital height for every word: the width follows the word's ratio.
  const ghostWidth = { "--ghost-w": `${Math.round(doc.ratio * 9.3)}%` } as CSSProperties;

  return (
    <section aria-labelledby="legal-page-title" className="px-5 pt-4 md:px-8 md:pt-14 lg:px-[5.08%] lg:pt-[5cqw]">
      <h1 id="legal-page-title" className="sr-only">
        {doc.title}
      </h1>

      <div className={cn("flex items-end justify-between gap-4", fromRight && "flex-row-reverse")} style={ghostWidth}>
        <motion.div className="w-full md:w-[var(--ghost-w)]" {...(fromRight ? slideRight : slide)}>
          <GhostHeading text={doc.ghost} ratio={doc.ratio} className="w-full" />
        </motion.div>

        <motion.div className={cn("hidden md:mb-2 md:block lg:mb-[2.4cqw]", !fromRight && "text-right")} {...rise(0.3)}>
          <SectionLabel as="p" bar={fromRight ? "before" : "after"}>
            Legal
          </SectionLabel>
        </motion.div>
      </div>

      <motion.p
        className="mt-block max-w-[34rem] text-base leading-snug md:text-xl lg:max-w-[48cqw] lg:text-[1.9cqw] lg:leading-[1.4]"
        {...rise(0.45)}
      >
        {doc.intro}
      </motion.p>
      <motion.p className="mt-3 text-sm text-ink/70 lg:mt-[1cqw] lg:text-[max(13px,1.2cqw)]" {...rise(0.55)}>
        Last updated {legalUpdated}
      </motion.p>
    </section>
  );
}

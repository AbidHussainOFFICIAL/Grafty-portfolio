"use client";

import { motion } from "framer-motion";
import { showPrices } from "@/data/content";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useEntrance } from "@/lib/useEntrance";
import { ContactButton } from "@/components/contact/ContactActions";

/**
 * The Services page's title row, built like the Work page's: the ghost word slides in first,
 * then the label, the intro line and the two actions follow it. Timed rather than
 * scroll-driven because it is already on screen when the page opens (and on a first visit it
 * waits for the loader's curtain to lift).
 */
export function ServicesHeader() {
  const { rise, slide } = useEntrance();

  return (
    <section aria-labelledby="services-page-title" className="px-5 pt-4 md:px-8 md:pt-14 lg:px-[5.08%] lg:pt-[5cqw]">
      <h1 id="services-page-title" className="sr-only">
        Services
      </h1>

      <div className="flex items-end justify-between gap-4">
        <motion.div className="w-full md:w-[60%]" {...slide}>
          <GhostHeading text="SERVICES" ratio={6.2} className="w-full" />
        </motion.div>

        <motion.div className="hidden text-right md:mb-2 md:block lg:mb-[2.4cqw]" {...rise(0.3)}>
          <SectionLabel as="p" bar="after">
            What I do
          </SectionLabel>
        </motion.div>
      </div>

      <motion.p
        className="mt-block max-w-[34rem] text-base leading-snug md:text-xl lg:max-w-[48cqw] lg:text-[1.9cqw] lg:leading-[1.4]"
        {...rise(0.45)}
      >
        Four disciplines, one designer: from first sketch to shipped code. Here is what each one includes
        {showPrices ? ", how I work and what it costs." : " and how I work."}
      </motion.p>

      <motion.div
        className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:gap-6 lg:mt-[2.4cqw] lg:gap-[2.4cqw]"
        {...rise(0.6)}
      >
        <ContactButton>Start a project</ContactButton>
        <div className="hidden md:block">
          <ArrowLink href="#packages" inPage>
            {showPrices ? "See packages" : "How to hire me"}
          </ArrowLink>
        </div>
      </motion.div>
    </section>
  );
}

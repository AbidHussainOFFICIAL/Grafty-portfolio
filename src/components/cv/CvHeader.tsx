"use client";

import { motion } from "framer-motion";
import { cvPage, routes } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import { useEntrance } from "@/lib/useEntrance";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { CvLink } from "@/components/ui/CvLink";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";

const pill = "h-12 w-full px-8 text-base md:w-auto lg:h-[4.6cqw] lg:px-[3cqw] lg:text-[max(14px,1.5cqw)]";

/**
 * The CV page's title row and its buttons, built like the other page headers: the ghost word slides
 * in first, then the label, the intro and the buttons rise after it. None of it is printed.
 * Printing is for computers: on a phone the PDF download is the main button.
 */
export function CvHeader() {
  const { rise, slide } = useEntrance();

  const print = () => {
    trackEvent("CV printed");
    window.print();
  };

  return (
    <section aria-labelledby="cv-page-title" className="px-5 pt-4 md:px-8 md:pt-14 lg:px-[5.08%] lg:pt-[5cqw] print:hidden">
      <h1 id="cv-page-title" className="sr-only">
        Curriculum vitae of Jessy Linda
      </h1>

      <div className="flex items-end justify-between gap-4">
        <motion.div className="w-[40%] md:w-[24%]" {...slide}>
          <GhostHeading text="CV" ratio={2.2} className="w-full" />
        </motion.div>

        <motion.div className="hidden text-right md:mb-2 md:block lg:mb-[2.4cqw]" {...rise(0.3)}>
          <SectionLabel as="p" bar="after">
            {cvPage.label}
          </SectionLabel>
        </motion.div>
      </div>

      <motion.p
        className="mt-block max-w-[34rem] text-base leading-snug md:text-xl lg:max-w-[48cqw] lg:text-[1.9cqw] lg:leading-[1.4]"
        {...rise(0.45)}
      >
        {cvPage.intro}
      </motion.p>

      <motion.div
        className="mt-6 flex flex-col gap-3 md:flex-row md:items-center lg:mt-[2.4cqw] lg:gap-[1cqw]"
        {...rise(0.6)}
      >
        <div className="hidden lg:block">
          <Button onClick={print} className={pill}>
            Print / Save as PDF
          </Button>
        </div>
        <CvLink
          className={`inline-flex select-none items-center justify-center rounded-full bg-ink font-medium text-white transition duration-300 ease-out hover:bg-violet active:scale-[0.97] lg:bg-white lg:text-ink lg:shadow-card lg:hover:bg-ink lg:hover:text-white ${pill}`}
        >
          Download PDF
        </CvLink>
        <ArrowLink href={routes.about} back className="md:ml-auto">
          Back to about
        </ArrowLink>
      </motion.div>
    </section>
  );
}

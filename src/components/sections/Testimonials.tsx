"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { testimonials, type Testimonial } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Icons";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Rows fade as they leave the middle of the screen, so the reader's focus stays on one
 * quote, and the portrait drifts slightly against the text.
 */
function TestimonialRow({ testimonial }: { testimonial: Testimonial }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.25, 1, 1, 0.25]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const { rating, quote, name, role, image } = testimonial;

  return (
    <motion.article
      ref={ref}
      className="border-t border-ink py-6 md:py-8 lg:py-[3.9cqw]"
      style={reduceMotion ? undefined : { opacity }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between md:gap-8">
        <div className="flex flex-col justify-between gap-8 md:max-w-[60%] lg:max-w-[52cqw]">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium lg:gap-[0.5cqw] lg:text-[max(13px,1.2cqw)]">
              <span>{rating}</span>
              <Stars label={`Rated ${rating} out of 5`} className="h-3 w-3 lg:h-[1.3cqw] lg:w-[1.3cqw]" />
            </p>
            <blockquote className="mt-3 text-[clamp(1.5rem,6.2vw,2.25rem)] font-semibold leading-[1.1] lg:mt-[2.4cqw] lg:text-[3.7cqw]">
              <p>&ldquo;{quote}&rdquo;</p>
            </blockquote>
          </div>
          <p className="text-sm lg:text-[max(14px,1.4cqw)]">
            <span className="block font-semibold">{name}</span>
            <span className="block text-xs lg:text-[max(13px,1.2cqw)]">{role}</span>
          </p>
        </div>

        <motion.div
          className="order-first shrink-0 md:order-none"
          style={reduceMotion ? undefined : { y: portraitY }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={474}
            height={474}
            sizes="(min-width: 1440px) 340px, (min-width: 768px) 24vw, 40vw"
            className="h-36 w-36 rounded-full object-cover md:h-52 md:w-52 lg:h-[23.5cqw] lg:w-[23.5cqw]"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}

export function Testimonials() {
  return (
    <section
      id="feedback"
      aria-labelledby="feedback-title"
      className="mt-20 px-5 md:mt-28 md:px-8 lg:mt-[10.8cqw] lg:px-[5.08%]"
    >
      <div className="flex items-center justify-between gap-4">
        <SectionLabel bar="before" id="feedback-title">
          Client Feedback
        </SectionLabel>
        <Button
          href="#work"
          className="h-9 px-5 text-sm lg:h-[3.4cqw] lg:px-[2.3cqw] lg:text-[max(14px,1.4cqw)]"
        >
          Explore All
        </Button>
      </div>

      <div className="mt-5 lg:mt-[2.8cqw]">
        {testimonials.map((testimonial) => (
          <TestimonialRow key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}

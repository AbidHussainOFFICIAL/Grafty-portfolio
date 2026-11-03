"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/content";
import { Photo } from "@/components/ui/Photo";
import { useEntrance } from "@/lib/useEntrance";

/**
 * The cover image in a rounded card. The picture settles from a slight zoom as the card
 * scrolls into the middle of the screen; with reduced motion it stays still.
 */
export function CaseCover({ project }: { project: Project }) {
  const { reduceMotion, rise } = useEntrance();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section aria-label="Cover" className="mt-block px-5 md:px-8 lg:px-[5.08%]">
      <motion.div {...rise(0.9)}>
        <div
          ref={ref}
          className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card md:aspect-[16/9]"
        >
          <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { scale }}>
            <Photo
              src={project.image.src}
              alt={project.image.alt}
              fill
              priority
              sizes="(min-width: 1440px) 1300px, (min-width: 1024px) 90vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

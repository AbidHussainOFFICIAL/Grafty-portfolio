"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { hero, site } from "@/data/content";
import { signature } from "@/data/artwork";
import { useContactClick } from "@/components/contact/ContactLink";
import { CircularBadge } from "@/components/ui/CircularBadge";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { ArrowRightLongIcon } from "@/components/ui/Icons";
import { VectorArt } from "@/components/ui/VectorArt";
import { withAmpersands } from "@/lib/text";

const EASE = [0.22, 1, 0.36, 1] as const;

interface TagProps {
  label: string;
  rotate: number;
  className: string;
  delay: number;
}

/** Black rotated pill that floats gently beside the portrait. */
function Tag({ label, rotate, className, delay }: TagProps) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 ${className}`}>
      <motion.span
        className="block whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs text-white md:px-6 md:py-3 md:text-base lg:px-[2.3cqw] lg:py-[1.1cqw] lg:text-[1.65cqw]"
        style={{ rotate }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
                transition: {
                  opacity: { duration: 0.5, delay },
                  scale: { duration: 0.6, delay, ease: EASE },
                  y: { duration: 5, delay, repeat: Infinity, ease: "easeInOut" },
                },
              }
        }
      >
        {label}
      </motion.span>
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const artRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const onContactClick = useContactClick();

  // The text and the card sit below the first screen on desktop and the card does on phones,
  // so they play their entrance when they scroll into view rather than on load.
  const introInView = useInView(introRef, { once: true, margin: "0px 0px -12% 0px" });
  const cardInView = useInView(cardRef, { once: true, margin: "0px 0px -12% 0px" });

  // As the hero scrolls away its layers part ways: the ghost word and portrait lag behind
  // the page while the signature drifts up. These only move the wrappers, so they never
  // interfere with the entrance animation on the layers themselves.
  const { scrollYProgress } = useScroll({ target: artRef, offset: ["start start", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0vw", "7vw"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0vw", "3vw"]);
  const signatureY = useTransform(scrollYProgress, [0, 1], ["0vw", "-3vw"]);
  const layer = (y: typeof ghostY) => (reduceMotion ? undefined : { y });

  const rise = (visible: boolean, delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section id="home" aria-labelledby="hero-title" className="relative">
      {/*
        Desktop: the first screen is the artwork alone. --art-h is the artwork's height
        (its portrait fades out at the bottom of the screen) and --fold is where the first
        screen ends; the introduction and the card start just below it.
        Phones and tablets: the first screen holds the artwork and the greeting + headline;
        the card follows below.
      */}
      <div className="relative px-5 md:px-8 lg:h-[calc(var(--fold)+37cqw)] lg:px-0 lg:[--art-h:clamp(37.7cqw,calc(100svh-var(--header-h)-2cqw),54cqw)] lg:[--fold:max(var(--art-h),calc(100svh-var(--header-h)))] lg:[--header-h:calc(2*clamp(1.1rem,2.2vw,2rem)+clamp(32px,3.35vw,48px))]">
        <div className="flex min-h-[calc(100svh-5.25rem)] flex-col justify-center gap-8 py-6 lg:contents">
          {/* Artwork: ghost word, arch portrait, signature and floating tags */}
          <div
            ref={artRef}
            className="relative mx-auto aspect-[1/0.86] w-full max-w-[760px] md:aspect-[1/0.72] md:max-w-none lg:aspect-auto lg:h-[var(--art-h)]"
          >
            <motion.div
              className="absolute left-0 top-[10%] w-full lg:left-[5.08%] lg:top-[7.33cqw] lg:w-[89.84%]"
              style={layer(ghostY)}
            >
              <GhostHeading text={hero.ghost} ratio={5.26} className="w-full" />
            </motion.div>

            <motion.div
              className="absolute left-[10%] top-0 z-10 w-[80%] lg:bottom-0 lg:left-[30.57%] lg:top-[1.3cqw] lg:w-[38.87%]"
              style={layer(portraitY)}
            >
              <motion.div
                className="h-full"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 24 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Image
                  src={hero.portrait.src}
                  alt={hero.portrait.alt}
                  width={hero.portrait.width}
                  height={hero.portrait.height}
                  priority
                  sizes="(min-width: 1440px) 680px, 40vw"
                  className="h-auto w-full rounded-t-full [mask-image:linear-gradient(to_bottom,#000_86%,transparent)] lg:h-full lg:object-cover lg:object-top"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="pointer-events-none absolute left-0 top-[25%] z-20 w-full text-violet lg:left-[6.35%] lg:top-[21.9cqw] lg:w-[87.9%]"
              style={layer(signatureY)}
            >
              <motion.div
                initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
                animate={reduceMotion ? undefined : { clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
              >
                <VectorArt art={signature} className="block h-auto w-full" />
              </motion.div>
            </motion.div>

            <Tag
              label={hero.tags[0]}
              rotate={-9}
              delay={0.9}
              className="left-[15%] top-[47%] lg:left-[29.5%] lg:top-[18cqw]"
            />
            <Tag
              label={hero.tags[1]}
              rotate={17}
              delay={1.05}
              className="left-[84%] top-[9%] lg:left-[68.2%] lg:top-[9.5cqw]"
            />
          </div>

          {/* Introduction */}
          <div
            ref={introRef}
            className="relative z-30 lg:absolute lg:left-[5.27%] lg:top-[calc(var(--fold)+3cqw)]"
          >
            <motion.p className="text-base md:text-lg lg:text-[max(14px,1.5cqw)]" {...rise(introInView, 0.1)}>
              {hero.greeting} <span aria-hidden="true">👋</span> I&rsquo;m{" "}
              <span className="font-medium">{hero.name}</span>
            </motion.p>
            <h1
              id="hero-title"
              className="font-cond mt-2 text-[clamp(2.75rem,14vw,6rem)] uppercase leading-[0.85] md:mt-3 lg:mt-[1cqw] lg:text-[7.8cqw] lg:leading-[0.83]"
            >
              <span className="sr-only">{site.name}: </span>
              {hero.headline.map((line, index) => (
                <span key={line} className="-my-[0.06em] block overflow-hidden py-[0.06em]">
                  <motion.span
                    className="block"
                    initial={reduceMotion ? false : { y: "115%" }}
                    animate={reduceMotion ? undefined : { y: introInView ? 0 : "115%" }}
                    transition={{ duration: 0.9, delay: 0.15 + index * 0.12, ease: EASE }}
                  >
                    {withAmpersands(line)}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        <motion.div
          ref={cardRef}
          className="relative z-30 rounded-2xl bg-white p-6 md:ml-auto md:max-w-md lg:absolute lg:left-[63.7%] lg:top-[calc(var(--fold)+6cqw)] lg:w-[31.1%] lg:max-w-none lg:rounded-[1.6cqw] lg:p-[2.8cqw]"
          {...rise(cardInView, 0.1)}
        >
          <p className="max-w-[16rem] text-lg leading-snug lg:max-w-[24.6cqw] lg:text-[1.9cqw] lg:leading-[1.43]">
            {hero.intro}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block border-b border-ink py-2 text-sm lg:mt-[3.2cqw] lg:py-0 lg:text-[max(14px,1.5cqw)]"
          >
            {site.email}
          </a>

          <a
            href="#contact"
            onClick={onContactClick}
            aria-label="Let's discuss: go to the contact form"
            className="absolute bottom-4 right-4 transition duration-300 hover:scale-105 lg:bottom-[1.5cqw] lg:right-[2.8cqw]"
          >
            <CircularBadge tone="dark" className="h-[88px] w-[88px] lg:h-[8.6cqw] lg:w-[8.6cqw]">
              <span className="flex -rotate-[20deg] flex-col items-center text-white">
                <span className="text-center text-[10px] font-semibold uppercase leading-tight tracking-wide lg:text-[max(11px,0.95cqw)]">
                  Let&rsquo;s
                  <br />
                  discuss
                </span>
                <ArrowRightLongIcon className="mt-1 w-7 lg:mt-[0.5cqw] lg:w-[3.2cqw]" />
              </span>
            </CircularBadge>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { galleryArt, type Project } from "@/data/content";
import { Photo } from "@/components/ui/Photo";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ImageViewer } from "./ImageViewer";

/**
 * Where each of the five tiles sits. Phones: one column. Tablet: two columns, the first tile wide.
 * Desktop: a six-column grid with fixed-height rows: a wide tile and a tall one, then three equal tiles.
 */
const placement = [
  "md:col-span-2 md:aspect-[16/10] lg:col-span-4 lg:row-span-3 lg:aspect-auto",
  "md:aspect-square lg:col-span-2 lg:row-span-3 lg:aspect-auto",
  "md:aspect-square lg:col-span-2 lg:row-span-2 lg:aspect-auto",
  "md:aspect-square lg:col-span-2 lg:row-span-2 lg:aspect-auto",
  "md:aspect-square lg:col-span-2 lg:row-span-2 lg:aspect-auto",
] as const;

const noop = () => () => {};

/**
 * The picture grid and its viewer. Each tile is a button that opens the viewer at that picture.
 * The viewer is rendered into <body> because the page's layout container (which has a CSS
 * container-type) would otherwise become the containing block of its fixed positioning.
 */
export function CaseGallery({ project }: { project: Project }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const portalRoot = useSyncExternalStore(noop, () => document.body, () => null);

  const shots = useMemo(
    () =>
      project.study.gallery.map((shot) => ({
        src: galleryArt[shot.art],
        alt: `${project.title}: ${shot.caption}`,
        caption: shot.caption,
        focus: shot.focus,
      })),
    [project],
  );

  return (
    <section aria-labelledby="case-gallery-title" id="gallery" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <div className="flex items-end justify-between gap-4">
        <SectionLabel bar="before" id="case-gallery-title" className="mb-2 lg:mb-[2.4cqw]">
          Gallery
        </SectionLabel>
        <ScrollShift x={["6vw", "0vw"]} className="w-[54%]">
          <GhostHeading text="GALLERY" ratio={5.6} className="w-full" />
        </ScrollShift>
      </div>

      <ul className="mt-block grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-6 lg:auto-rows-[12cqw] lg:gap-[1.4cqw]">
        {shots.map((shot, index) => (
          <li key={`${shot.src}-${index}`} className={`relative aspect-[4/3] ${placement[index] ?? placement[2]}`}>
            <Reveal delay={Math.min(index, 3) * 0.06} className="absolute inset-0">
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Open image ${index + 1} of ${shots.length}: ${shot.caption}`}
                onClick={() => setOpenIndex(index)}
                className="group absolute inset-0 block select-none overflow-hidden rounded-card bg-white shadow-card transition duration-300 active:scale-[0.99]"
              >
                <Photo
                  src={shot.src}
                  alt=""
                  fill
                  sizes="(min-width: 1440px) 860px, (min-width: 1024px) 60vw, (min-width: 768px) 46vw, 92vw"
                  style={{ objectPosition: shot.focus }}
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition duration-300 group-hover:rotate-45 lg:bottom-[1.2cqw] lg:right-[1.2cqw] lg:h-[4cqw] lg:w-[4cqw]"
                >
                  <ArrowUpRightIcon className="h-5 w-5 lg:h-[1.8cqw] lg:w-[1.8cqw]" />
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {portalRoot &&
        createPortal(
          <AnimatePresence>
            {openIndex !== null && (
              <ImageViewer
                key="viewer"
                shots={shots}
                index={openIndex}
                onChange={setOpenIndex}
                onClose={() => setOpenIndex(null)}
              />
            )}
          </AnimatePresence>,
          portalRoot,
        )}
    </section>
  );
}

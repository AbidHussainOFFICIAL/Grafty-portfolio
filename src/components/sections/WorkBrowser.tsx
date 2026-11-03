"use client";

import { useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { categories, projects, type CategoryFilterId } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { useCategoryParam } from "@/lib/useCategoryParam";
import { CategoryFilter } from "./CategoryFilter";
import { ProjectCard } from "./ProjectCard";
import { ProjectStack } from "./ProjectStack";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The first project is the featured one; it gets the large card under "All". */
const [featured, ...others] = projects;

const counts = Object.fromEntries([
  ["all", projects.length],
  ...categories.map((category) => [
    category.id,
    projects.filter((project) => project.categories.includes(category.id)).length,
  ]),
]) as Record<CategoryFilterId, number>;

const labelOf = (id: CategoryFilterId) =>
  id === "all" ? "All" : (categories.find((category) => category.id === id)?.label ?? id);

/**
 * The filter bar and the project list. "All" opens with a large featured card and the stack
 * continues from 02; a category shows just its projects, numbered from 01. Changing the filter
 * crossfades the whole list (not card by card) and, when the visitor has scrolled past the top of
 * the list, glides back up to it.
 */
export function WorkBrowser() {
  const [category, setCategory] = useCategoryParam();
  const reduceMotion = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (category === "all" ? others : projects.filter((project) => project.categories.includes(category))),
    [category],
  );
  const all = category === "all";
  const shown = counts[category];

  const select = (next: CategoryFilterId) => {
    if (next === category) return;
    setCategory(next);

    const bar = barRef.current?.getBoundingClientRect();
    const list = listRef.current?.getBoundingClientRect();
    if (!bar || !list) return;
    const gap = bar.bottom + 8;
    if (list.top < gap) {
      window.scrollTo({ top: window.scrollY + list.top - gap, behavior: reduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <div>
      <CategoryFilter value={category} counts={counts} onChange={select} barRef={barRef} />

      <p role="status" className="sr-only">
        {all ? `Showing all ${shown} projects` : `Showing ${shown} ${shown === 1 ? "project" : "projects"} in ${labelOf(category)}`}
      </p>

      <div ref={listRef} className="mt-1 md:mt-2 lg:mt-[1.5cqw]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={category}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.45, ease: EASE } }}
            exit={{ opacity: 0, pointerEvents: "none", transition: { duration: reduceMotion ? 0 : 0.15 } }}
          >
            {all && (
              <div className="mb-4 md:mb-6 lg:mb-[3cqw] lg:h-[min(50cqw,calc(100svh-9rem))]">
                <ProjectCard project={featured} number={1} total={projects.length} meta featured />
              </div>
            )}

            {filtered.length > 0 ? (
              <ProjectStack
                projects={filtered}
                numberOffset={all ? 1 : 0}
                total={all ? projects.length : filtered.length}
                meta
                pinBelowBar
              />
            ) : (
              <div className="rounded-card bg-white p-6 text-center shadow-card md:p-10 lg:p-[4cqw]">
                <p className="font-cond text-[clamp(2rem,9vw,3.5rem)] uppercase leading-[0.9] lg:text-[5cqw]">
                  Nothing here yet
                </p>
                <p className="mt-3 text-base lg:mt-[1.2cqw] lg:text-[max(14px,1.5cqw)]">
                  There are no projects in this category at the moment.
                </p>
                <Button type="button" onClick={() => select("all")} className="mt-6 h-12 px-8 text-base lg:mt-[2.4cqw]">
                  Show all
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

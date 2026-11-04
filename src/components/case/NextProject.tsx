import { projects, routes, type Project } from "@/data/content";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { ArrowRightLongIcon, ArrowUpRightIcon } from "@/components/ui/Icons";
import { PillLink } from "@/components/ui/PillLink";
import { SiteLink } from "@/components/ui/SiteLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** The next project as the same card the Work list uses (after the last, it loops back to the first), then a way to the full list. */
export function NextProject({ project }: { project: Project }) {
  const index = projects.findIndex((entry) => entry.id === project.id);
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const nextNumber = ((index + 1) % projects.length) + 1;

  return (
    <section aria-labelledby="case-next-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <SectionLabel bar="before" id="case-next-title">
        Next project
      </SectionLabel>

      <Reveal className="mt-block">
        <div className="lg:h-[min(46cqw,calc(100svh-11rem))]">
          <ProjectCard project={next} number={nextNumber} total={projects.length} meta />
        </div>
      </Reveal>

      <Reveal className="mt-block">
        {/* Phones: the previous project as a small card beside the "All work" pill. */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 md:hidden">
          <SiteLink
            href={`${routes.work}/${previous.id}`}
            className="group flex min-w-0 select-none items-center gap-3 rounded-card bg-white p-2.5 pr-4 shadow-card transition duration-300 active:scale-[0.98]"
          >
            <span
              aria-hidden="true"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white"
            >
              <ArrowRightLongIcon className="h-5 w-5 rotate-180" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase leading-none tracking-wide opacity-75">
                Previous
              </span>
              <span className="font-cond mt-1.5 block truncate text-xl uppercase leading-none">{previous.title}</span>
            </span>
          </SiteLink>
          <Button href={routes.work} className="group gap-3 pl-5 pr-1.5 text-base">
            All work
            <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink">
              <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </Button>
        </div>

        <div className="hidden md:flex md:items-center md:justify-between">
          <ArrowLink href={`${routes.work}/${previous.id}`} back>
            Previous project
          </ArrowLink>
          <PillLink href={routes.work}>All work</PillLink>
        </div>
      </Reveal>
    </section>
  );
}

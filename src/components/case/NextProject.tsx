import { projects, routes, type Project } from "@/data/content";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PillLink } from "@/components/ui/PillLink";
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

      <Reveal className="mt-block flex flex-col items-center gap-4 md:flex-row md:justify-between lg:mt-[3cqw]">
        <ArrowLink href={`${routes.work}/${previous.id}`} back>
          Previous project
        </ArrowLink>
        <PillLink href={routes.work}>All work</PillLink>
      </Reveal>
    </section>
  );
}

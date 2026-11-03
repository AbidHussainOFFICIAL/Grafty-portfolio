import type { Project } from "@/data/content";
import { Accordion } from "@/components/ui/Accordion";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** The four steps as the same accordion the Services section uses, numbered. */
export function CaseProcess({ project }: { project: Project }) {
  return (
    <section aria-labelledby="case-process-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <div className="flex items-end justify-between gap-4">
        <ScrollShift x={["-6vw", "0vw"]} className="w-[54%]">
          <GhostHeading text="PROCESS" ratio={5.6} className="w-full" />
        </ScrollShift>
        <SectionLabel bar="after" id="case-process-title" className="mb-2 lg:mb-[2.4cqw]">
          Process
        </SectionLabel>
      </div>

      <Reveal className="mt-block">
        <Accordion items={project.study.process} defaultOpenId={project.study.process[0]?.id} numbered />
      </Reveal>
    </section>
  );
}

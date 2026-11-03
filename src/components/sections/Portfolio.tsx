import { latestProjects, routes } from "@/data/content";
import { PillLink } from "@/components/ui/PillLink";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { ProjectStack } from "./ProjectStack";

export function Portfolio() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mt-section px-5 md:px-8 lg:px-[5.08%]"
    >
      <h2 id="work-title" className="sr-only">
        Latest portfolio
      </h2>
      <ScrollShift x={["6vw", "0vw"]}>
        <GhostHeading text="LATEST PORTFOLIO" ratio={11.4} className="w-full" />
      </ScrollShift>

      <ProjectStack projects={latestProjects} className="mt-block" />

      <Reveal className="mt-block flex justify-center lg:mt-[3cqw]">
        <PillLink href={routes.work}>View all work</PillLink>
      </Reveal>
    </section>
  );
}

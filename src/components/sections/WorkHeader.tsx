import { projects } from "@/data/content";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** The Work page's title row: the ghost word on the left, the label and project count on the right. */
export function WorkHeader() {
  return (
    <section aria-labelledby="work-title" className="px-5 pt-10 md:px-8 md:pt-14 lg:px-[5.08%] lg:pt-[5cqw]">
      <h1 id="work-title" className="sr-only">
        Selected work
      </h1>

      <div className="flex items-end justify-between gap-4">
        <ScrollShift x={["-6vw", "0vw"]} className="w-[58%] md:w-[60%]">
          <GhostHeading text="WORK" ratio={4.6} className="w-full" />
        </ScrollShift>
        <div className="mb-2 text-right lg:mb-[2.4cqw]">
          <SectionLabel as="p" bar="after">
            Selected work
          </SectionLabel>
          <p className="font-numeral mt-2 text-sm lg:mt-[0.8cqw] lg:text-[max(14px,1.4cqw)]">
            {String(projects.length).padStart(2, "0")} Projects
          </p>
        </div>
      </div>

      <Reveal className="mt-block">
        <p className="max-w-[34rem] text-base leading-snug md:text-xl lg:max-w-[48cqw] lg:text-[1.9cqw] lg:leading-[1.4]">
          Branding, product design and front-end builds. Pick a category to narrow it down.
        </p>
      </Reveal>
    </section>
  );
}

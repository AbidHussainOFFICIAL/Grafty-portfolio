import { skillGroups } from "@/data/content";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Skills and tools in three groups. From tablet up each group is its own white card; on phones the
 * three groups share one card, separated by thin lines, so the section stays short.
 */
export function AboutSkills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <div className="flex items-end justify-between gap-4">
        <SectionLabel bar="before" id="skills-title" className="mb-2 lg:mb-[2.4cqw]">
          Skills &amp; tools
        </SectionLabel>
        <ScrollShift x={["6vw", "0vw"]} className="w-[54%]">
          <GhostHeading text="SKILLS" ratio={5.2} className="w-full" />
        </ScrollShift>
      </div>

      <ul className="mt-block grid max-md:rounded-card max-md:bg-white max-md:p-5 max-md:shadow-card md:grid-cols-3 md:gap-4 lg:gap-[1.4cqw]">
        {skillGroups.map((group, index) => (
          <li
            key={group.id}
            className="max-md:border-b max-md:border-ink/15 max-md:py-4 max-md:first:pt-0 max-md:last:border-b-0 max-md:last:pb-0"
          >
            <Reveal delay={index * 0.08} className="md:h-full md:rounded-card md:bg-white md:p-6 md:shadow-card lg:p-[2.6cqw]">
              <h3 className="font-cond text-[clamp(1.75rem,8vw,2.5rem)] uppercase leading-none lg:text-[3.4cqw]">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5 lg:mt-[1.4cqw] lg:gap-[0.6cqw]">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink/40 px-3 py-1.5 text-xs md:text-sm lg:px-[1.2cqw] lg:py-[0.6cqw] lg:text-[max(12px,1.1cqw)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

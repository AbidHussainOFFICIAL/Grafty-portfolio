import { skills } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";

const chip =
  "inline-flex h-12 shrink-0 items-center whitespace-nowrap rounded-full bg-white px-6 text-base font-medium shadow-card lg:h-[4.6cqw] lg:px-[2.6cqw] lg:text-[max(14px,1.5cqw)]";

/**
 * A slim strip of tool chips that drifts sideways like the phone logo strip, speeds up while
 * scrolling and pauses under a mouse. Visitors who prefer reduced motion get the same chips
 * as a still, wrapped grid. Screen readers get one plain list instead of the endless copies.
 */
export function SkillsStrip() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mt-section px-5 md:px-8 lg:px-[5.08%]"
    >
      <SectionLabel bar="before" id="skills-title">
        Tools I work with
      </SectionLabel>

      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <Reveal className="mt-block">
        <div aria-hidden="true" className="motion-reduce:hidden">
          {/* Padding and an equal negative margin leave room for the chips' shadows inside the clipped strip. */}
          <VelocityMarquee
            pauseOnHover
            className="-my-5 py-5 [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]"
          >
            {skills.map((skill) => (
              <span key={skill} className={chip}>
                {skill}
              </span>
            ))}
          </VelocityMarquee>
        </div>

        <div aria-hidden="true" className="hidden flex-wrap gap-2 motion-reduce:flex lg:gap-[0.8cqw]">
          {skills.map((skill) => (
            <span key={skill} className={chip}>
              {skill}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

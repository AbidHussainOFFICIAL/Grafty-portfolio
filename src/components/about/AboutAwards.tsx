import { awards } from "@/data/content";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Each award as a white row, in the same look as the accordion rows but not clickable: year, name, issuer. */
export function AboutAwards() {
  return (
    <section id="awards" aria-labelledby="awards-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <div className="flex items-end justify-between gap-4">
        <ScrollShift x={["-6vw", "0vw"]} className="w-[54%]">
          <GhostHeading text="AWARDS" ratio={5.4} className="w-full" />
        </ScrollShift>
        <SectionLabel bar="after" id="awards-title" className="mb-2 lg:mb-[2.4cqw]">
          Recognition
        </SectionLabel>
      </div>

      <ul className="mt-block flex flex-col gap-2.5 lg:gap-[0.98cqw]">
        {awards.map((award, index) => (
          <li key={award.id}>
            <Reveal delay={index * 0.08}>
              <div className="rounded-card bg-white p-5 shadow-card md:px-8 md:py-6 lg:grid lg:grid-cols-[12cqw_1fr_auto] lg:items-baseline lg:gap-[2cqw] lg:px-[3.9cqw] lg:py-[2.4cqw]">
                <p className="font-numeral text-sm opacity-70 md:text-base lg:text-[1.6cqw]">{award.year}</p>
                <h3 className="font-cond mt-1 text-[clamp(1.75rem,8vw,2.5rem)] uppercase leading-[0.95] lg:mt-0 lg:text-[3.4cqw]">
                  {award.name}
                </h3>
                <p className="mt-1 text-sm md:text-base lg:mt-0 lg:text-[1.5cqw]">{award.issuer}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

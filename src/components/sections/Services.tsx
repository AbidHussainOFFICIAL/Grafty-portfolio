import { services } from "@/data/content";
import { Accordion } from "@/components/ui/Accordion";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mt-section relative px-5 md:px-8 lg:-mt-[3.4cqw] lg:px-[5.08%]"
    >
      <div className="flex items-end justify-between gap-4">
        <ScrollShift x={["-6vw", "0vw"]} className="w-[54%]">
          <GhostHeading text="SERVICE" ratio={5.5} className="w-full" />
        </ScrollShift>
        <SectionLabel bar="after" id="services-title" className="mb-2 lg:mb-[2.4cqw]">
          Services
        </SectionLabel>
      </div>

      <Reveal className="mt-block">
        <Accordion items={services} variant="card" defaultOpenId="design" />
      </Reveal>
    </section>
  );
}

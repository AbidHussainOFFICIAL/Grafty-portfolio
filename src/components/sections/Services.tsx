import { services } from "@/data/content";
import { Accordion } from "@/components/ui/Accordion";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative mt-16 px-5 md:mt-20 md:px-8 lg:-mt-[3.4cqw] lg:px-[5.08%]"
    >
      <div className="flex items-end justify-between gap-4">
        <GhostHeading text="SERVICE" ratio={5.5} className="w-[54%]" />
        <SectionLabel bar="after" id="services-title" className="mb-2 lg:mb-[2.4cqw]">
          Services
        </SectionLabel>
      </div>

      <Reveal className="mt-3 lg:mt-[2.9cqw]">
        <Accordion items={services} variant="card" defaultOpenId="design" />
      </Reveal>
    </section>
  );
}

import { about } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";

const { stats } = about;

/** The four counting figures as one row (a 2 × 2 grid on phones). The awards figure scrolls to the awards below. */
export function AboutStats() {
  return (
    <section aria-label="In numbers" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <Reveal>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-0">
          <li className="lg:pr-[2.4cqw]">
            <Stat compact value={stats.experience.value} label={stats.experience.label} />
          </li>
          <li className="lg:border-l lg:border-ink/20 lg:px-[2.4cqw]">
            <Stat compact value={stats.projects.value} label={stats.projects.label} />
          </li>
          <li className="lg:border-l lg:border-ink/20 lg:px-[2.4cqw]">
            <Stat compact stars value={stats.rating.value} label={stats.rating.label} />
          </li>
          <li className="lg:border-l lg:border-ink/20 lg:pl-[2.4cqw]">
            <Stat compact inPage href="#awards" value={stats.awards.value} label={stats.awards.label} />
          </li>
        </ul>
      </Reveal>
    </section>
  );
}

import type { Project } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollWords } from "@/components/ui/ScrollWords";

/** "The challenge": a white label and one large statement whose words light up as you scroll (like About). */
export function CaseChallenge({ project }: { project: Project }) {
  return (
    <section aria-labelledby="case-challenge-title" className="mt-section px-5 text-center md:px-8 lg:px-[5.08%]">
      <Reveal>
        <h2
          id="case-challenge-title"
          className="inline-block rounded-full bg-white px-4 py-1.5 text-[10px] font-medium uppercase leading-none tracking-wide lg:px-[2.2cqw] lg:py-[0.9cqw] lg:text-[max(11px,0.95cqw)]"
        >
          The challenge
        </h2>
      </Reveal>
      <ScrollWords
        text={project.study.challenge}
        className="font-statement mx-auto mt-5 max-w-[26ch] text-[clamp(1.5rem,6.4vw,2.75rem)] uppercase leading-[1.04] md:max-w-[32ch] lg:mt-[3cqw] lg:max-w-[81cqw] lg:text-[4.2cqw] lg:leading-[1.08]"
      />
    </section>
  );
}

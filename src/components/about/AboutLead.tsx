import { about } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollWords } from "@/components/ui/ScrollWords";

/** A centred pill and a statement whose words light up one by one as you scroll: Home's "About me" look. */
export function AboutLead() {
  return (
    <section aria-labelledby="approach-title" className="mt-section px-5 text-center md:px-8 lg:px-[5.08%]">
      <Reveal>
        <h2
          id="approach-title"
          className="inline-block rounded-full bg-white px-4 py-1.5 text-[10px] font-medium uppercase leading-none tracking-wide lg:px-[2.2cqw] lg:py-[0.9cqw] lg:text-[max(11px,0.95cqw)]"
        >
          {about.page.approachLabel}
        </h2>
      </Reveal>
      <ScrollWords
        text={about.page.lead}
        className="font-statement mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,7.4vw,3.25rem)] uppercase leading-[1.02] md:max-w-[30ch] lg:mt-[3cqw] lg:max-w-[81cqw] lg:text-[4.8cqw] lg:leading-[1.06]"
      />
    </section>
  );
}

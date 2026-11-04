import type { Project } from "@/data/content";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stars } from "@/components/ui/Icons";

/** The results on a dark panel (three figures that count up), then the client's quote on a white card. */
export function CaseOutcome({ project }: { project: Project }) {
  const { results, quote } = project.study;

  return (
    <section aria-labelledby="case-results-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <Reveal>
        <div className="rounded-card bg-ink p-6 text-white shadow-card md:p-10 lg:p-[4cqw]">
          <SectionLabel bar="before" id="case-results-title">
            Results
          </SectionLabel>
          <ul className="mt-6 grid gap-0 md:grid-cols-3 md:gap-8 lg:mt-[3cqw] lg:gap-[3cqw]">
            {results.map((result) => (
              <li
                key={result.label}
                className="border-t border-white/20 py-5 md:py-6 lg:py-[2cqw]"
              >
                <p className="font-numeral text-[clamp(3rem,16vw,5.5rem)] leading-none lg:text-[7.2cqw]">
                  <CountUp value={result.value} />
                </p>
                <p className="mt-2 max-w-[22ch] text-sm text-white/80 md:text-base lg:mt-[1cqw] lg:max-w-[24cqw] lg:text-[max(14px,1.5cqw)]">
                  {result.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="mt-3 md:mt-4 lg:mt-[1.4cqw]">
        <figure className="rounded-card bg-white p-6 shadow-card md:p-10 lg:p-[4cqw]">
          <p className="flex items-center gap-1.5 text-xs font-medium lg:gap-[0.5cqw] lg:text-[max(13px,1.2cqw)]">
            <span>5.00</span>
            <Stars label="Rated 5.00 out of 5" className="h-3 w-3 lg:h-[1.3cqw] lg:w-[1.3cqw]" />
          </p>
          <blockquote className="mt-3 max-w-[30ch] text-[clamp(1.5rem,6.2vw,2.25rem)] font-semibold leading-[1.1] md:max-w-[34ch] lg:mt-[2cqw] lg:max-w-[56cqw] lg:text-[3.7cqw]">
            <p>&ldquo;{quote.text}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 lg:mt-[2.6cqw] lg:gap-[1.2cqw]">
            <span
              aria-hidden="true"
              className="font-numeral grid h-12 w-12 shrink-0 place-items-center rounded-full bg-violet text-lg text-white lg:h-[4.4cqw] lg:w-[4.4cqw] lg:text-[1.8cqw]"
            >
              {quote.name.charAt(0)}
            </span>
            <span className="text-sm lg:text-[max(14px,1.4cqw)]">
              <span className="block font-semibold">{quote.name}</span>
              <span className="block text-xs lg:text-[max(13px,1.2cqw)]">{quote.role}</span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

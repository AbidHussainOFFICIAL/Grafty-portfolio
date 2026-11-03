import type { Project } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const rowLabel = "text-[10px] font-semibold uppercase leading-none tracking-wide opacity-75 lg:text-[max(10px,0.9cqw)]";

/** The overview paragraph, and a white card of facts: client, role, year, duration, tools. */
export function CaseSummary({ project }: { project: Project }) {
  const { study } = project;
  const facts = [
    ["Client", study.client],
    ["Role", study.role],
    ["Year", project.year],
    ["Duration", study.duration],
  ] as const;

  return (
    <section
      aria-labelledby="case-summary-title"
      className="mt-section px-5 md:px-8 lg:px-[5.08%]"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_32cqw] lg:items-start lg:gap-[4cqw]">
        <Reveal>
          <SectionLabel bar="before" id="case-summary-title">
            Overview
          </SectionLabel>
          <p className="mt-4 max-w-prose text-lg leading-snug md:text-xl lg:mt-[1.6cqw] lg:max-w-none lg:text-[2.35cqw] lg:leading-[1.4]">
            {study.overview}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="rounded-card bg-white p-5 shadow-card md:p-8 lg:p-[2.4cqw]">
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="border-b border-ink/15 py-3 first:pt-0 lg:grid lg:grid-cols-[8cqw_1fr] lg:items-baseline lg:py-[1.1cqw] lg:first:pt-0"
              >
                <dt className={rowLabel}>{label}</dt>
                <dd className="mt-1.5 text-base lg:mt-0 lg:text-[max(14px,1.4cqw)]">{value}</dd>
              </div>
            ))}
            <div className="pt-3 lg:grid lg:grid-cols-[8cqw_1fr] lg:items-baseline lg:pb-0 lg:pt-[1.1cqw]">
              <dt className={rowLabel}>Tools</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5 lg:mt-0 lg:gap-[0.6cqw]">
                {study.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-ink/40 px-2.5 py-1 text-xs lg:px-[1cqw] lg:py-[0.45cqw] lg:text-[max(11px,1cqw)]"
                  >
                    {tool}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

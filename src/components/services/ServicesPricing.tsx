import { hireGuide, packages, showPrices, type Package } from "@/data/content";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { CheckIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";
import { ContactArrowLink, ContactButton } from "./ContactActions";

const rowLabel = "text-[10px] font-semibold uppercase leading-none tracking-wide opacity-75 lg:text-[max(10px,0.9cqw)]";
const cardTitle = "font-cond text-[clamp(1.75rem,8vw,2.5rem)] uppercase leading-none lg:text-[3.2cqw]";
const listText = "text-base leading-snug lg:text-[max(14px,1.5cqw)]";

function PackageCard({ pack }: { pack: Package }) {
  const dark = pack.featured === true;
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-card p-5 shadow-card md:p-8 lg:p-[2.6cqw]",
        dark ? "bg-ink text-white" : "bg-white",
      )}
    >
      {dark && (
        <span className="absolute -top-3 right-5 rounded-full bg-accent px-3 py-1.5 text-[10px] font-semibold uppercase leading-none tracking-wide text-ink md:right-8 lg:-top-[1cqw] lg:right-[2.6cqw] lg:px-[1.2cqw] lg:py-[0.6cqw] lg:text-[max(10px,0.9cqw)]">
          Most chosen
        </span>
      )}
      <h3 className={cardTitle}>{pack.name}</h3>
      <p className={cn("mt-3 lg:mt-[1cqw]", listText, dark && "text-white/80")}>{pack.audience}</p>

      <p className="mt-6 lg:mt-[2.4cqw]">
        <span className={rowLabel}>From</span>
        <span className="font-numeral mt-2 block text-[clamp(2.5rem,13vw,4.5rem)] leading-none lg:mt-[0.8cqw] lg:text-[6cqw]">
          {pack.from}
        </span>
      </p>

      <ul className="mt-6 flex flex-col gap-3 lg:mt-[2.4cqw] lg:gap-[1.1cqw]">
        {pack.includes.map((item) => (
          <li key={item} className={cn("flex items-start gap-3 lg:gap-[1cqw]", listText)}>
            <CheckIcon
              className={cn("mt-0.5 h-5 w-5 shrink-0 lg:mt-[0.2cqw] lg:h-[2cqw] lg:w-[2cqw]", dark ? "text-accent" : "text-ink")}
            />
            {item}
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "mt-6 border-t pt-5 lg:mt-[2.4cqw] lg:pt-[2cqw]",
          dark ? "border-white/20" : "border-ink/15",
        )}
      >
        <p className={rowLabel}>Typical timeline</p>
        <p className="font-numeral mt-2 text-lg md:text-xl lg:mt-[0.8cqw] lg:text-[2cqw]">{pack.timeline}</p>
      </div>

      <div className="mt-auto pt-6 lg:pt-[2.4cqw]">
        <ContactButton onDark={dark} full>{`Start with ${pack.name}`}</ContactButton>
      </div>
    </article>
  );
}

/** One column of the "How to hire me" guide: a title and a short list. */
function GuideColumn({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="h-full rounded-card bg-white p-5 shadow-card md:p-8 lg:p-[2.6cqw]">
      <h3 className={cardTitle}>{title}</h3>
      <ul className="mt-5 flex flex-col gap-3 lg:mt-[2cqw] lg:gap-[1.1cqw]">
        {items.map((item) => (
          <li key={item} className={cn("flex items-start gap-3 lg:gap-[1cqw]", listText)}>
            <span
              aria-hidden="true"
              className="mt-[0.45em] inline-block h-2 w-2 shrink-0 rounded-full bg-accent lg:h-[0.8cqw] lg:w-[0.8cqw]"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Packages with "from" prices. When `showPrices` is off in content.ts, the same space becomes
 * "How to hire me" (project types, timeline, how to start) and no price appears on the page.
 */
export function ServicesPricing() {
  const title = showPrices ? "Packages" : "How to hire me";
  const columns = [hireGuide.types, hireGuide.timeline, hireGuide.start];

  return (
    <section id="packages" aria-labelledby="packages-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <div className="flex items-end justify-between gap-4">
        <SectionLabel bar="before" id="packages-title" className="mb-2 lg:mb-[2.4cqw]">
          {title}
        </SectionLabel>
        <ScrollShift x={["6vw", "0vw"]} className="w-[54%]">
          <GhostHeading text={showPrices ? "PACKAGES" : "HIRE ME"} ratio={showPrices ? 6.2 : 5} className="w-full" />
        </ScrollShift>
      </div>

      <ul className="mt-block grid gap-3 md:gap-4 lg:grid-cols-3 lg:gap-[1.4cqw]">
        {showPrices
          ? packages.map((pack, index) => (
              <li key={pack.id}>
                <Reveal delay={index * 0.08} className="h-full">
                  <PackageCard pack={pack} />
                </Reveal>
              </li>
            ))
          : columns.map((column, index) => (
              <li key={column.title}>
                <Reveal delay={index * 0.08} className="h-full">
                  <GuideColumn title={column.title} items={column.items} />
                </Reveal>
              </li>
            ))}
      </ul>

      <Reveal className="mt-block flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="max-w-[34rem] text-base leading-snug md:text-lg lg:max-w-[50cqw] lg:text-[max(14px,1.6cqw)]">
          {showPrices
            ? "Every project is scoped individually. These prices are starting points, not fixed costs."
            : "Every project is scoped individually. Send a short brief and I will reply with a fixed quote."}
        </p>
        <ContactArrowLink>Not sure? Get a quote</ContactArrowLink>
      </Reveal>
    </section>
  );
}

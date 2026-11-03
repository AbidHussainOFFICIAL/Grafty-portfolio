import { ArrowLink } from "@/components/ui/ArrowLink";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";

interface ComingSoonProps {
  /** The page name, used for the real heading and the large ghost word. */
  title: string;
  blurb: string;
  backHref: string;
  backLabel: string;
}

/** Approximate width-to-cap-height ratio of a word set in the ghost face. */
const ratioFor = (word: string) => Math.max(3.4, word.length * 0.8);

/** A placeholder page: same header, ghost heading and footer as Home, until the real page is built. */
export function ComingSoon({ title, blurb, backHref, backLabel }: ComingSoonProps) {
  const word = title.toUpperCase();
  const ratio = ratioFor(word);

  return (
    <section aria-labelledby="page-title" className="px-5 pt-10 md:px-8 md:pt-14 lg:px-[5.08%] lg:pt-[5cqw]">
      {/* Short words would otherwise fill the whole width and become enormous. */}
      <div className="mx-auto" style={{ width: `${Math.min(100, Math.round(ratio * 12))}%` }}>
        <GhostHeading text={word} ratio={ratio} className="w-full" />
      </div>
      <Reveal className="mt-block rounded-card bg-white p-6 shadow-card md:p-10 lg:p-[4cqw]">
        <p className="text-xs font-medium uppercase tracking-wide md:text-sm lg:text-[max(12px,1.1cqw)]">Coming soon</p>
        <h1
          id="page-title"
          className="font-cond mt-3 text-[clamp(2.5rem,12vw,4.5rem)] uppercase leading-[0.9] lg:mt-[1.2cqw] lg:text-[6cqw]"
        >
          {title}
        </h1>
        <p className="mt-4 max-w-prose text-base leading-snug md:text-xl lg:mt-[1.6cqw] lg:max-w-[48cqw] lg:text-[1.9cqw] lg:leading-[1.4]">
          {blurb}
        </p>
        <div className="mt-8 lg:mt-[3cqw]">
          <ArrowLink href={backHref}>{backLabel}</ArrowLink>
        </div>
      </Reveal>
    </section>
  );
}

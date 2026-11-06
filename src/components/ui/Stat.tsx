import { CountUp } from "./CountUp";
import { ArrowUpRightIcon, Stars } from "./Icons";
import { SiteLink } from "./SiteLink";

interface StatProps {
  value: string;
  label: string;
  align?: "left" | "right";
  stars?: boolean;
  /** Makes the whole figure a link. */
  href?: string;
  /** The link is a "#section" on the page you are already on (a plain anchor, which the smooth scroller handles). */
  inPage?: boolean;
  /** Smaller figures, for a row of four. */
  compact?: boolean;
}

/** A big counting figure with its label (Home's "07 Years of Experience", and the About page's row of four). */
export function Stat({ value, label, align = "left", stars = false, href, inPage = false, compact = false }: StatProps) {
  const content = (
    <>
      <div className="relative">
        {stars && (
          <span className={`absolute bottom-full ${align === "right" ? "right-0" : "left-0"}`}>
            <Stars label="Rated 5 out of 5" className="h-3 w-3 md:h-4 md:w-4 lg:h-[2cqw] lg:w-[2cqw]" />
          </span>
        )}
        <p
          className={
            compact
              ? "font-numeral text-[clamp(2.25rem,11vw,3.75rem)] leading-none lg:text-[5.6cqw]"
              : "font-numeral text-[clamp(2.5rem,13vw,4.75rem)] leading-none lg:text-[7.2cqw]"
          }
        >
          <CountUp value={value} />
        </p>
      </div>
      <p
        className={
          compact
            ? "mt-1 text-sm md:mt-2 md:text-base lg:mt-[0.8cqw] lg:text-[1.5cqw]"
            : "mt-1 text-sm md:mt-2 md:text-base lg:mt-[1cqw] lg:text-[1.65cqw]"
        }
      >
        {label}
        {href && (
          <ArrowUpRightIcon className="ml-1 inline-block h-[0.8em] w-[0.8em] align-baseline transition duration-300 group-hover:rotate-45" />
        )}
      </p>
    </>
  );
  const alignment = align === "right" ? "text-right" : "text-left";
  const linkClass = `group block transition-colors duration-300 hover:text-violet-deep active:opacity-70 ${alignment}`;

  if (!href) return <div className={alignment}>{content}</div>;
  return inPage ? (
    <a href={href} className={linkClass}>
      {content}
    </a>
  ) : (
    <SiteLink href={href} className={linkClass}>
      {content}
    </SiteLink>
  );
}

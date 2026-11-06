import { site } from "@/data/content";
import { CircularBadge } from "./CircularBadge";
import { ArrowDownIcon } from "./Icons";

/**
 * The round "Download my CV" badge that hangs off the bottom edge of a portrait (Home and About).
 * Place it inside a `relative` box that is the portrait's size.
 */
export function CvBadge() {
  return (
    <a
      href={site.cvUrl}
      download
      aria-label="Download my CV"
      className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 transition duration-300 hover:scale-105"
    >
      <CircularBadge tone="light" className="h-[104px] w-[104px] lg:h-[14cqw] lg:w-[14cqw]">
        <span className="text-center text-[9px] font-semibold uppercase leading-tight tracking-wide lg:text-[max(11px,1.05cqw)]">
          Download
          <br />
          my CV
        </span>
        <ArrowDownIcon className="mt-1.5 h-5 w-3 lg:mt-[0.9cqw] lg:h-[3.4cqw] lg:w-[2cqw]" />
      </CircularBadge>
    </a>
  );
}

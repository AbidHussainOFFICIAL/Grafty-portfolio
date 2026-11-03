import { cn } from "@/lib/cn";
import { ArrowUpRightIcon } from "./Icons";
import { SiteLink } from "./SiteLink";

interface ArrowLinkProps {
  href: string;
  children: string;
  className?: string;
}

/** A 44px black circle with an arrow and a label. On hover the arrow turns and the label goes violet. */
export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <SiteLink
      href={href}
      className={cn(
        "group inline-flex min-h-11 select-none items-center gap-3 text-sm transition-colors duration-300 hover:text-violet-deep active:opacity-70 md:text-base lg:gap-[1cqw] lg:text-[max(14px,1.4cqw)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition duration-300 group-hover:rotate-45 lg:h-[5cqw] lg:w-[5cqw]"
      >
        <ArrowUpRightIcon className="h-5 w-5 lg:h-[2.2cqw] lg:w-[2.2cqw]" />
      </span>
      {children}
    </SiteLink>
  );
}

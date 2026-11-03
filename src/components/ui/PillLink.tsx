import { cn } from "@/lib/cn";
import { ArrowUpRightIcon } from "./Icons";
import { Button } from "./Button";

interface PillLinkProps {
  href: string;
  children: string;
  className?: string;
}

/** Black pill with a white arrow circle at the end ("View all work", "More about me"). */
export function PillLink({ href, children, className }: PillLinkProps) {
  return (
    <Button
      href={href}
      className={cn(
        "group h-12 gap-3 pl-7 pr-1.5 text-base lg:h-[5cqw] lg:gap-[1.2cqw] lg:pl-[2.8cqw] lg:pr-[0.8cqw] lg:text-[max(14px,1.4cqw)]",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition duration-300 group-hover:rotate-45 lg:h-[3.4cqw] lg:w-[3.4cqw]"
      >
        <ArrowUpRightIcon className="h-4 w-4 lg:h-[1.6cqw] lg:w-[1.6cqw]" />
      </span>
    </Button>
  );
}

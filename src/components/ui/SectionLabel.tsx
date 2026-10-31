import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionLabelProps {
  children: ReactNode;
  /** Which side of the text the small orange bar sits on. */
  bar: "before" | "after";
  as?: ElementType;
  id?: string;
  className?: string;
}

/** Small uppercase heading with the orange accent bar, e.g. "SERVICES|". */
export function SectionLabel({
  children,
  bar,
  as: Tag = "h2",
  id,
  className,
}: SectionLabelProps) {
  const barElement = (
    <span
      aria-hidden="true"
      className="inline-block h-[1.05em] w-[0.22em] min-w-[3px] bg-accent"
    />
  );
  return (
    <Tag
      id={id}
      className={cn(
        "font-cond inline-flex items-center gap-[0.22em] text-base uppercase leading-none md:text-xl lg:text-[2.3cqw]",
        className,
      )}
    >
      {bar === "before" && barElement}
      {children}
      {bar === "after" && barElement}
    </Tag>
  );
}

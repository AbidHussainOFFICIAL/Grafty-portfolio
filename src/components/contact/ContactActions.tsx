import type { ReactNode } from "react";
import { routes } from "@/data/content";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** A link to the Contact page. Pass an `href` from `contactHref()` to arrive with a service or package already chosen. */
export function ContactArrowLink({ children, href = routes.contact }: { children: string; href?: string }) {
  return <ArrowLink href={href}>{children}</ArrowLink>;
}

const pill = "h-12 px-8 text-base lg:h-[4.6cqw] lg:px-[3cqw] lg:text-[max(14px,1.5cqw)]";

interface ContactButtonProps {
  children: ReactNode;
  /** Where it leads; defaults to the Contact page. */
  href?: string;
  /** A white button, for use on the dark package card. */
  onDark?: boolean;
  /** Always the full width of its box; otherwise it is full width on phones only. */
  full?: boolean;
  className?: string;
}

export function ContactButton({ children, href = routes.contact, onDark = false, full = false, className }: ContactButtonProps) {
  return (
    <Button
      href={href}
      className={cn(pill, full ? "w-full" : "w-full md:w-auto", onDark && "bg-white! text-ink! hover:bg-violet! hover:text-white!", className)}
    >
      {children}
    </Button>
  );
}

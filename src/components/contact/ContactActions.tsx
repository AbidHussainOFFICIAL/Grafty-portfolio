"use client";

import type { ReactNode } from "react";
import { routes } from "@/data/content";
import { useContactClick } from "@/components/contact/ContactLink";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Links to the Contact page. On phones they open the contact sheet instead (like the closing
 * "Let's work together" band), everywhere else they go to the page.
 */
export function ContactArrowLink({ children }: { children: string }) {
  const onClick = useContactClick();
  return (
    <ArrowLink href={routes.contact} onClick={onClick}>
      {children}
    </ArrowLink>
  );
}

const pill = "h-12 px-8 text-base lg:h-[4.6cqw] lg:px-[3cqw] lg:text-[max(14px,1.5cqw)]";

interface ContactButtonProps {
  children: ReactNode;
  /** A white button, for use on the dark package card. */
  onDark?: boolean;
  /** Always the full width of its box; otherwise it is full width on phones only. */
  full?: boolean;
  className?: string;
}

export function ContactButton({ children, onDark = false, full = false, className }: ContactButtonProps) {
  const onClick = useContactClick();
  return (
    <Button
      href={routes.contact}
      onClick={onClick}
      className={cn(pill, full ? "w-full" : "w-full md:w-auto", onDark && "bg-white! text-ink! hover:bg-violet! hover:text-white!", className)}
    >
      {children}
    </Button>
  );
}

"use client";

import type { MouseEvent, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { SHEET_QUERY, useContactSheet } from "./ContactSheetProvider";

/**
 * Click handler for any "#contact" link: on phones it opens the full-screen contact sheet
 * instead of scrolling to the section; everywhere else the anchor behaves normally.
 */
export function useContactClick(onNavigate?: () => void) {
  const { open } = useContactSheet();

  return function onClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();
    if (!window.matchMedia(SHEET_QUERY).matches) return;
    event.preventDefault();
    open();
  };
}

interface ContactLinkProps {
  children: ReactNode;
  className?: string;
  /** Runs before the sheet opens or the page scrolls (the mobile menu uses it to close itself). */
  onNavigate?: () => void;
}

/** The black pill button that leads to the contact form. */
export function ContactLink({ children, className, onNavigate }: ContactLinkProps) {
  return (
    <Button href="#contact" onClick={useContactClick(onNavigate)} className={className}>
      {children}
    </Button>
  );
}

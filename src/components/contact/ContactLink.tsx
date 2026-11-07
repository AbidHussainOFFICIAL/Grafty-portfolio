import type { ReactNode } from "react";
import { routes } from "@/data/content";
import { Button } from "@/components/ui/Button";

interface ContactLinkProps {
  children: ReactNode;
  className?: string;
  /** Runs when the link is used (the mobile menu closes itself with it). */
  onNavigate?: () => void;
}

/** The black pill button that leads to the Contact page. */
export function ContactLink({ children, className, onNavigate }: ContactLinkProps) {
  return (
    <Button href={routes.contact} onClick={onNavigate} className={className}>
      {children}
    </Button>
  );
}

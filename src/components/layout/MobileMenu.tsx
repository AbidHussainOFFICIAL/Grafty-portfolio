"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { navLinks } from "@/data/content";
import { wordmark } from "@/data/artwork";
import { ContactLink } from "@/components/contact/ContactLink";
import { ContactStrip } from "@/components/ui/ContactStrip";
import { ArrowUpRightIcon, CloseIcon } from "@/components/ui/Icons";
import { SiteLink } from "@/components/ui/SiteLink";
import { VectorArt } from "@/components/ui/VectorArt";
import { currentState } from "@/lib/nav";
import { useDialog } from "@/lib/useDialog";

const circleLink =
  "grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white active:scale-95";

interface MobileMenuProps {
  /** Id of the section currently on screen, shown in violet. */
  activeSection: string | null;
  onClose: () => void;
}

/** Full-screen navigation for phones and tablets. Rendered by the Navbar while open. */
export function MobileMenu({ activeSection, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  useDialog(panelRef, onClose);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-surface outline-none lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // While it fades out the menu must not swallow taps meant for the page (or the menu button) behind it.
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
    >
      {/* Sized to the screen: the link rows share whatever height is left, so nothing scrolls. */}
      <div className="mx-auto flex h-full min-h-[30rem] max-w-xl flex-col px-5 pb-5 pt-4 md:px-8">
        <div className="flex shrink-0 items-center justify-between">
          <SiteLink href="#home" onClick={onClose} aria-label="Home">
            <VectorArt art={wordmark} className="h-7 w-auto text-ink" />
          </SiteLink>
          <button type="button" aria-label="Close menu" onClick={onClose} className={circleLink}>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-3 min-h-0 flex-1">
          <ul className="flex h-full flex-col border-t border-ink/15">
            {navLinks.map((link) => {
              const current = currentState(link, pathname, activeSection);
              return (
                <li key={link.href} className="min-h-0 flex-1 border-b border-ink/15">
                  <SiteLink
                    href={link.href}
                    onClick={onClose}
                    aria-current={current}
                    className="flex h-full items-center gap-4 transition hover:text-violet-deep active:opacity-60 aria-[current]:text-violet-deep"
                  >
                    <span className="font-cond flex-1 text-[clamp(1.75rem,5.6svh,3.25rem)] uppercase leading-none">
                      {link.label}
                    </span>
                    <ArrowUpRightIcon className="h-5 w-5 shrink-0 opacity-40" />
                  </SiteLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-4 flex shrink-0 flex-col gap-3">
          <ContactLink onNavigate={onClose} className="h-12 w-full px-8 text-base">
            Start a project
          </ContactLink>
          <ContactStrip />
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { navLinks, socials } from "@/data/content";
import { wordmark } from "@/data/artwork";
import { ContactLink } from "@/components/contact/ContactLink";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { CloseIcon, SocialIcon } from "@/components/ui/Icons";
import { VectorArt } from "@/components/ui/VectorArt";
import { useDialog } from "@/lib/useDialog";

const circleLink =
  "grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white";

interface MobileMenuProps {
  /** Id of the section currently on screen, shown in violet. */
  activeSection: string | null;
  onClose: () => void;
}

/** Full-screen navigation for phones and tablets. Rendered by the Navbar while open. */
export function MobileMenu({ activeSection, onClose }: MobileMenuProps) {
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
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
    >
      {/* Sized to the screen: the link rows share whatever height is left, so nothing scrolls. */}
      <div className="mx-auto flex h-full min-h-[30rem] max-w-xl flex-col px-5 pb-5 pt-4 md:px-8">
        <div className="flex shrink-0 items-center justify-between">
          <a href="#home" onClick={onClose} aria-label="Home">
            <VectorArt art={wordmark} className="h-7 w-auto text-ink" />
          </a>
          <button type="button" aria-label="Close menu" onClick={onClose} className={circleLink}>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-3 min-h-0 flex-1">
          <ul className="flex h-full flex-col border-t border-ink/15">
            {navLinks.map((link, index) => {
              const current = activeSection === link.href.slice(1);
              return (
                <li key={link.href} className="min-h-0 flex-1 border-b border-ink/15">
                  <a
                    href={link.href}
                    onClick={onClose}
                    aria-current={current ? "location" : undefined}
                    className="flex h-full items-center gap-4 transition hover:text-violet aria-[current=location]:text-violet"
                  >
                    <span aria-hidden="true" className="w-6 text-xs tabular-nums text-ink/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-cond text-[clamp(1.75rem,5.6svh,3.25rem)] uppercase leading-none">
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-4 flex shrink-0 flex-col items-start gap-4 text-sm">
          <ContactLink onNavigate={onClose} className="h-12 px-8 text-base">
            Start a project
          </ContactLink>
          <CopyEmail />
          <ul className="flex items-center gap-2.5">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={circleLink}
                >
                  <SocialIcon id={social.id} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

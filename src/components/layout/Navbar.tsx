"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks, site, socials } from "@/data/content";
import { wordmark } from "@/data/artwork";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon, SocialIcon } from "@/components/ui/Icons";
import { VectorArt } from "@/components/ui/VectorArt";

const headerSocials = socials.filter((social) => social.inHeader);

const circleLink =
  "grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white lg:h-[clamp(30px,3.1vw,44px)] lg:w-[clamp(30px,3.1vw,44px)]";

function Logo({ className }: { className?: string }) {
  return (
    <a href="#home" aria-label={`${site.brand} home`} className={className}>
      <VectorArt art={wordmark} className="h-7 w-auto text-ink lg:h-[clamp(20px,2.2vw,32px)]" />
    </a>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    const button = menuButtonRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      button?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="relative z-40 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-[5.08%] lg:py-[clamp(1.1rem,2.2vw,2rem)]">
      <nav aria-label="Primary" className="hidden items-center gap-[clamp(1.5rem,3.9vw,3.5rem)] text-[clamp(11px,1.05vw,15px)] lg:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="transition hover:text-violet">
            {link.label}
          </a>
        ))}
      </nav>

      <Logo className="lg:justify-self-center" />

      <div className="flex items-center justify-end gap-2.5">
        <ul className="hidden items-center gap-2.5 lg:flex">
          {headerSocials.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className={circleLink}
              >
                <SocialIcon id={social.id} className="h-[18px] w-[18px] lg:h-[clamp(12px,1.25vw,18px)] lg:w-[clamp(12px,1.25vw,18px)]" />
              </a>
            </li>
          ))}
        </ul>
        <Button href="#contact" className="ml-1 h-11 px-6 text-[15px] lg:h-[clamp(32px,3.35vw,48px)] lg:px-[clamp(1.4rem,2.5vw,2.25rem)] lg:text-[clamp(11px,1.05vw,15px)]">
          Hire Me!
        </Button>
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
          className={`${circleLink} lg:hidden`}
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col bg-surface px-5 py-5 md:px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className={circleLink}
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-14 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="font-cond text-[clamp(3rem,16vw,6rem)] uppercase leading-[0.95] transition hover:text-violet"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto flex items-center justify-between gap-4 pb-4">
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
              <a href={`mailto:${site.email}`} className="text-sm underline underline-offset-4">
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

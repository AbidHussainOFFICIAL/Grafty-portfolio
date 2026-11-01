"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { navLinks, site, socials } from "@/data/content";
import { wordmark } from "@/data/artwork";
import { ContactLink } from "@/components/contact/ContactLink";
import { MenuIcon, SocialIcon } from "@/components/ui/Icons";
import { VectorArt } from "@/components/ui/VectorArt";
import { MobileMenu } from "./MobileMenu";

const headerSocials = socials.filter((social) => social.inHeader);
const barLinks = navLinks.filter((link) => link.inBar);

/** Scrolling down past this many pixels is what lets the bar tuck away. */
const HIDE_AFTER = 160;

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
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const focusInside = useRef(false);

  // The bar tucks away while reading downwards and returns the moment you scroll up.
  // It stays put for keyboard users, the open menu and visitors who prefer less motion.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (reduceMotion || menuOpen || focusInside.current) {
      setHidden(false);
    } else if (latest > previous && latest > HIDE_AFTER) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  // Highlights the link of whichever section is crossing the middle of the screen.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.header
        className="sticky top-0 z-40 w-full"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        onFocusCapture={(event) => {
          // Only keyboard focus keeps the bar in view; a click that merely focused a control must not.
          focusInside.current = (event.target as Element).matches(":focus-visible");
          if (focusInside.current) setHidden(false);
        }}
        onBlurCapture={() => {
          focusInside.current = false;
        }}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 border-b border-ink/10 bg-surface/80 backdrop-blur-md transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
        />
        <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-[5.08%] lg:py-[clamp(1.1rem,2.2vw,2rem)]">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-[clamp(1.1rem,2.6vw,2.5rem)] text-[clamp(11px,1.05vw,15px)] lg:flex"
          >
            {barLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.href.slice(1) ? "location" : undefined}
                className="relative transition hover:text-violet-deep after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=location]:text-violet-deep aria-[current=location]:after:scale-x-100"
              >
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
                    <SocialIcon
                      id={social.id}
                      className="h-[18px] w-[18px] lg:h-[clamp(12px,1.25vw,18px)] lg:w-[clamp(12px,1.25vw,18px)]"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <ContactLink className="ml-1 h-11 px-6 text-[15px] lg:h-[clamp(32px,3.35vw,48px)] lg:px-[clamp(1.4rem,2.5vw,2.25rem)] lg:text-[clamp(11px,1.05vw,15px)]">
              Hire Me!
            </ContactLink>
            <button
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
        </div>
      </motion.header>

      {/* Outside the header so the header's transform and blur cannot trap this fixed overlay. */}
      <AnimatePresence>
        {menuOpen && <MobileMenu key="menu" activeSection={activeSection} onClose={closeMenu} />}
      </AnimatePresence>
    </>
  );
}

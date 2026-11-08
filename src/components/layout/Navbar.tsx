"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { navLinks, site, socials } from "@/data/content";
import { wordmark } from "@/data/artwork";
import { ContactLink } from "@/components/contact/ContactLink";
import { MenuIcon, SocialIcon } from "@/components/ui/Icons";
import { SiteLink } from "@/components/ui/SiteLink";
import { VectorArt } from "@/components/ui/VectorArt";
import { currentState } from "@/lib/nav";
import { MobileMenu } from "./MobileMenu";

const headerSocials = socials.filter((social) => social.inHeader);
const barLinks = navLinks.filter((link) => link.inBar);

/** Scrolling down past this many pixels is what lets the bar tuck away. Above the page's first stretch it always shows. */
const HIDE_AFTER = 160;
const ALWAYS_SHOWN_ABOVE = 80;
/** The bar returns only after this many pixels of steady upward scrolling... */
const REVEAL_DISTANCE = 140;
/** ...and then only after this short pause (milliseconds), never the instant you scroll up. */
const REVEAL_DELAY = 400;

const circleLink =
  "grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white active:scale-95 lg:h-[clamp(34px,2.9vw,42px)] lg:w-[clamp(34px,2.9vw,42px)]";

function Logo({ className }: { className?: string }) {
  return (
    <SiteLink href="#home" aria-label={`${site.brand} home`} className={className}>
      <VectorArt art={wordmark} className="h-6 w-auto text-ink lg:h-[clamp(18px,1.9vw,28px)]" />
    </SiteLink>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const focusInside = useRef(false);

  // The bar tucks away as soon as you scroll down and stays away. It comes back only after a clear
  // stretch of upward scrolling plus a short pause, so a flick or a bounce never brings it back.
  // It stays put for keyboard users, the open menu and visitors who prefer less motion.
  const lastY = useRef(0);
  const upwards = useRef(0);
  const revealTimer = useRef<number | undefined>(undefined);

  const cancelReveal = () => {
    window.clearTimeout(revealTimer.current);
    revealTimer.current = undefined;
  };

  useEffect(() => () => window.clearTimeout(revealTimer.current), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastY.current;
    lastY.current = latest;
    setScrolled(latest > 24);

    if (reduceMotion || menuOpen || focusInside.current || latest <= ALWAYS_SHOWN_ABOVE) {
      cancelReveal();
      upwards.current = 0;
      setHidden(false);
      return;
    }
    if (Math.abs(delta) < 0.5) return;

    if (delta > 0) {
      upwards.current = 0;
      cancelReveal();
      if (latest > HIDE_AFTER) setHidden(true);
      return;
    }

    upwards.current -= delta;
    if (upwards.current >= REVEAL_DISTANCE && revealTimer.current === undefined) {
      revealTimer.current = window.setTimeout(() => {
        revealTimer.current = undefined;
        setHidden(false);
      }, REVEAL_DELAY);
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

  // Tells the rest of the page where the header is, so sticky bars (the Work filter) can follow it:
  // --header-h is its height, data-header says whether it is tucked away.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const measure = () => root.style.setProperty("--header-h", `${header.offsetHeight}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--header-h");
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.header = hidden ? "hidden" : "shown";
    return () => {
      delete root.dataset.header;
    };
  }, [hidden]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.header
        ref={headerRef}
        className="sticky top-0 z-40 w-full print:hidden"
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
        <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-3 md:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-[5.08%] lg:py-[clamp(0.8rem,1.3vw,1.2rem)]">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-[clamp(1.1rem,2.6vw,2.5rem)] text-[clamp(11px,1.05vw,15px)] lg:flex"
          >
            {barLinks.map((link) => (
              <SiteLink
                key={link.href}
                href={link.href}
                aria-current={currentState(link, pathname, activeSection)}
                className="relative transition hover:text-violet-deep after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current]:text-violet-deep aria-[current]:after:scale-x-100"
              >
                {link.label}
              </SiteLink>
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
            <ContactLink className="ml-1 h-10 px-5 text-[15px] lg:h-[clamp(34px,2.9vw,42px)] lg:px-[clamp(1.2rem,2.1vw,1.9rem)] lg:text-[clamp(11px,1.05vw,15px)]">
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

"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Gives mouse-wheel scrolling a soft, weighted feel and eases in-page anchor jumps.
 * Lenis leaves touch scrolling native and, for visitors who prefer reduced motion,
 * turns smoothing off and makes anchor jumps instant. Renders nothing.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });

    let frame = requestAnimationFrame(function tick(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    });

    // Handled here (rather than by Lenis) so the target also receives keyboard focus,
    // which keeps the skip link and every other "#section" link accessible.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor || anchor.target) return;

      const hash = anchor.getAttribute("href") ?? "";
      const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return;

      event.preventDefault();
      // "Home" means the very top of the page, above the header, not the top of the hero.
      lenis.scrollTo(hash === "#home" ? 0 : target);
      window.history.pushState(null, "", hash);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

/**
 * Gives mouse-wheel scrolling a soft, weighted feel and eases in-page anchor jumps.
 * Lenis leaves touch scrolling native and, for visitors who prefer reduced motion,
 * turns smoothing off and makes anchor jumps instant. Renders nothing.
 * The Lenis code is loaded after the page, so it never delays the first paint.
 */
export function SmoothScroll() {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.1 });

      // The first-visit loader (Intro.tsx) holds the page still until its curtain lifts.
      const startScrolling = () => lenis.start();
      if (document.documentElement.dataset.intro === "show") lenis.stop();
      window.addEventListener("intro:done", startScrolling);

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

      cleanup = () => {
        document.removeEventListener("click", onClick);
        window.removeEventListener("intro:done", startScrolling);
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}

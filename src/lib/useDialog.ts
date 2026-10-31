import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Counts open overlays so one closing never unlocks scrolling while another is still open. */
let scrollLocks = 0;

/**
 * Behaviour every full-screen overlay needs while it is mounted: the page behind stops
 * scrolling, Escape closes it, Tab stays inside it, focus moves into it and returns to
 * whatever opened it afterwards. The panel needs tabindex="-1" so it can take focus.
 */
export function useDialog(panelRef: RefObject<HTMLElement | null>, onClose: () => void) {
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    scrollLocks += 1;
    document.body.style.overflow = "hidden";
    panel.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null,
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      scrollLocks -= 1;
      if (scrollLocks === 0) document.body.style.overflow = "";
      // Hand focus back only if nothing else (another overlay) has taken it meanwhile.
      const active = document.activeElement;
      if (opener?.isConnected && (active === document.body || panel.contains(active))) opener.focus();
    };
  }, [panelRef]);
}

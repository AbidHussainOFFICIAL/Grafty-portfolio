import { useSyncExternalStore } from "react";

export type ContactMode = "brief" | "call";

/** "/contact#book" opens the booking; no hash is the brief. */
const BOOK_HASH = "#book";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

/**
 * Which half of the Contact page is showing, kept in the address (#book) so the "Book a call"
 * buttons elsewhere can open it directly and a reload keeps your place. Switching replaces the
 * current history entry, so Back leaves the page instead of stepping through every switch.
 * The server and the first client render always see "brief".
 */
export function useContactMode(): readonly [ContactMode, (next: ContactMode) => void] {
  const mode = useSyncExternalStore<ContactMode>(
    subscribe,
    () => (window.location.hash === BOOK_HASH ? "call" : "brief"),
    () => "brief",
  );

  const write = (next: ContactMode) => {
    const url = new URL(window.location.href);
    url.hash = next === "call" ? BOOK_HASH : "";
    window.history.replaceState(window.history.state, "", url);
    listeners.forEach((listener) => listener());
  };

  return [mode, write];
}

/** The address's query string ("?type=design"), or "" on the server and during hydration. */
export function useContactSearch(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
}

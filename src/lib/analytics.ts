import { track } from "@vercel/analytics";

type Properties = Record<string, string | number | boolean | null>;

/**
 * Every custom event the site sends, and exactly what each carries. Nothing personal is ever
 * included: no names, email addresses, messages or file names. Vercel Web Analytics shows these
 * under Events (custom events need a Pro plan; on Hobby the calls are harmless and unseen).
 */
interface PropertyEvents {
  /** A link to the Contact page was used. `page` is where it was clicked, `to` which tab it opens. */
  "Contact click": { page: string; to: "brief" | "call" };
  /** The project brief was sent (only while contactLive is true). */
  "Brief sent": { type: string; budget: string };
  "CV downloaded": { page: string };
  "Email copied": { page: string };
}

type PlainEvent = "Call booked" | "CV printed";

export function trackEvent(name: PlainEvent): void;
export function trackEvent<Name extends keyof PropertyEvents>(name: Name, properties: PropertyEvents[Name]): void;
export function trackEvent(name: string, properties?: Properties): void {
  // Nothing is sent while developing, so local clicks never reach the dashboard.
  if (process.env.NODE_ENV !== "production") return;
  try {
    track(name, properties);
  } catch {
    // Analytics must never break the page.
  }
}

import { useSyncExternalStore } from "react";
import { localKey, type DayKey } from "./booking";

const never = () => () => {};

/**
 * The visitor's own date and time zone. Both are null/empty on the server and during hydration, so the
 * calendar renders the same HTML as the server did and fills in once it is in the browser.
 */
export function useToday(): DayKey | null {
  return useSyncExternalStore(
    never,
    () => localKey(new Date()),
    () => null,
  );
}

export function useTimeZone(): string {
  return useSyncExternalStore(
    never,
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    () => "",
  );
}

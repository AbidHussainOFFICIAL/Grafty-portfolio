import { useSyncExternalStore } from "react";
import { categories, type CategoryFilterId } from "@/data/content";

const PARAM = "category";
const listeners = new Set<() => void>();

const isCategory = (value: string | null): value is CategoryFilterId =>
  value !== null && categories.some((category) => category.id === value);

function read(): CategoryFilterId {
  const value = new URLSearchParams(window.location.search).get(PARAM);
  return isCategory(value) ? value : "all";
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("popstate", onChange);
  };
}

/**
 * The Work page's filter, kept in the address (/work?category=branding) so a filtered view can be
 * shared and survives a reload. Changing it replaces the current history entry instead of adding
 * one, so Back leaves the page rather than stepping through every filter that was tried.
 * The server and the first client render always see "all".
 */
export function useCategoryParam(): readonly [CategoryFilterId, (next: CategoryFilterId) => void] {
  const value = useSyncExternalStore(subscribe, read, () => "all" as const);

  const write = (next: CategoryFilterId) => {
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete(PARAM);
    else url.searchParams.set(PARAM, next);
    window.history.replaceState(window.history.state, "", url);
    listeners.forEach((listener) => listener());
  };

  return [value, write];
}

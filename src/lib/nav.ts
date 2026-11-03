import type { NavLink } from "@/data/content";

/**
 * Which state a navigation link is in, for aria-current:
 * - "page" when the link is the page being viewed (/work on the Work page),
 * - "location" when it is the Home section crossing the middle of the screen,
 * - undefined otherwise.
 */
export function currentState(
  link: NavLink,
  pathname: string,
  activeSection: string | null,
): "page" | "location" | undefined {
  if (link.href.startsWith("/")) {
    if (pathname === link.href || pathname.startsWith(`${link.href}/`)) return "page";
  }
  if (pathname !== "/" || activeSection === null) return undefined;
  const section = link.section ?? (link.href.startsWith("#") ? link.href.slice(1) : null);
  return section === activeSection ? "location" : undefined;
}

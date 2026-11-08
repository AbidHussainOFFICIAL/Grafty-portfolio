"use client";

import type { ComponentPropsWithoutRef, MouseEventHandler } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/data/content";
import { trackEvent } from "@/lib/analytics";

type SiteLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };

/**
 * Every internal link on the site goes through here.
 * - "#section" is a plain anchor on the Home page (the smooth scroller handles it), and becomes
 *   a link to "/#section" on any other page, so the menu works everywhere.
 * - "/page" is a client-side link.
 * - Anything else (mailto:, https://) is a normal anchor.
 * It also counts every use of a link to the Contact page (see lib/analytics.ts).
 */
export function SiteLink({ href, onClick, ...rest }: SiteLinkProps) {
  const pathname = usePathname();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);
    if (href.startsWith(routes.contact) && pathname !== routes.contact) {
      trackEvent("Contact click", { page: pathname, to: href.includes("#book") ? "call" : "brief" });
    }
  };

  if (href.startsWith("#")) {
    return pathname === "/" ? (
      <a href={href} onClick={handleClick} {...rest} />
    ) : (
      <Link href={`/${href}`} onClick={handleClick} {...rest} />
    );
  }
  if (href.startsWith("/")) return <Link href={href} onClick={handleClick} {...rest} />;
  return <a href={href} onClick={handleClick} {...rest} />;
}

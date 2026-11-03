"use client";

import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SiteLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };

/**
 * Every internal link on the site goes through here.
 * - "#section" is a plain anchor on the Home page (the smooth scroller handles it), and becomes
 *   a link to "/#section" on any other page, so the menu works everywhere.
 * - "/page" is a client-side link.
 * - Anything else (mailto:, https://) is a normal anchor.
 */
export function SiteLink({ href, ...rest }: SiteLinkProps) {
  const pathname = usePathname();

  if (href.startsWith("#")) {
    return pathname === "/" ? <a href={href} {...rest} /> : <Link href={`/${href}`} {...rest} />;
  }
  if (href.startsWith("/")) return <Link href={href} {...rest} />;
  return <a href={href} {...rest} />;
}

import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { StatusButton, StatusLink, StatusPage } from "@/components/status/StatusPage";
import { SiteLink } from "@/components/ui/SiteLink";
import { routes } from "@/data/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  // The root layout's canonical address (the home page) must not be inherited.
  alternates: { canonical: null },
};

const quickLinks = [
  { label: "Work", href: routes.work },
  { label: "Services", href: routes.services },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
] as const;

/** Shown for any address that does not exist (Next.js sends the 404 status itself). */
export default function NotFound() {
  return (
    <PageShell>
      <StatusPage
        ghost="404"
        ratio={3.2}
        label="Page not found"
        title="Lost your way?"
        text="We couldn’t find that page. It may have moved, or the address may have a typo."
        actions={
          <>
            <StatusButton href="/">Back to home</StatusButton>
            <StatusLink href={routes.contact}>Start a project</StatusLink>
          </>
        }
        extra={
          <nav aria-label="Pages">
            <p className="text-xs font-semibold uppercase tracking-wide md:text-sm lg:text-[max(12px,1.1cqw)]">Or jump to</p>
            <ul className="mt-3 flex flex-wrap gap-2 lg:mt-[1cqw] lg:gap-[0.8cqw]">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <SiteLink
                    href={link.href}
                    className="inline-flex h-11 select-none items-center rounded-full bg-white px-5 text-sm font-medium shadow-card transition duration-300 hover:bg-ink hover:text-white active:scale-[0.97] md:text-base lg:h-[4cqw] lg:px-[2.4cqw] lg:text-[max(14px,1.4cqw)]"
                  >
                    {link.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
        }
      />
    </PageShell>
  );
}

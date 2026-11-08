"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/content";
import { trackEvent } from "@/lib/analytics";

/** The download link for the CV PDF. It counts each download (see lib/analytics.ts). */
export function CvLink({ className, ariaLabel, children }: { className?: string; ariaLabel?: string; children: ReactNode }) {
  const pathname = usePathname();

  return (
    <a
      href={site.cvUrl}
      download
      aria-label={ariaLabel}
      className={className}
      onClick={() => trackEvent("CV downloaded", { page: pathname })}
    >
      {children}
    </a>
  );
}

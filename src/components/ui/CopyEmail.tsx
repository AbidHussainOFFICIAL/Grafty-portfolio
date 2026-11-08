"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/content";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { CheckIcon, CopyIcon } from "./Icons";

/** The email address as a link, with a button that copies it. */
export function CopyEmail({
  className,
  variant = "plain",
}: {
  className?: string;
  /** "pill" is a full-width white bar with the copy button at the right end. */
  variant?: "plain" | "pill";
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      return; // Clipboard access can be blocked; the mailto link still works.
    }
    setCopied(true);
    trackEvent("Email copied", { page: pathname });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <span
      className={cn(
        "flex items-center gap-3",
        variant === "pill" && "h-12 justify-between text-ink rounded-full bg-white py-1 pl-5 pr-1",
        className,
      )}
    >
      <a href={`mailto:${site.email}`} className="text-sm underline underline-offset-4">
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink transition duration-300 hover:bg-ink hover:text-white",
          variant === "pill" ? "bg-surface" : "bg-white",
        )}
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}

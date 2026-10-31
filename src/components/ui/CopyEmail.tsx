"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/content";
import { cn } from "@/lib/cn";
import { CheckIcon, CopyIcon } from "./Icons";

/** The email address as a link, with a button that copies it. */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      return; // Clipboard access can be blocked; the mailto link still works.
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <a href={`mailto:${site.email}`} className="underline underline-offset-4">
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white"
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}

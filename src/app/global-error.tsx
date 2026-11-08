"use client";

import { GhostHeading } from "@/components/ui/GhostHeading";
import { fontVariables } from "./fonts";
import "./globals.css";

/**
 * The last resort, for when the root layout itself fails. It replaces the whole page, so it has no
 * header or footer and uses plain elements (no router, no page animations) in the site's look.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <main className="mx-auto flex min-h-screen max-w-[1440px] flex-col justify-center px-5 py-16 md:px-8 lg:px-[5.08%]">
          <GhostHeading text="OOPS" ratio={4.4} className="w-full md:w-[41%]" />
          <h1 className="font-cond mt-3 text-[clamp(2.5rem,12vw,4.5rem)] uppercase leading-[0.9]">Something went wrong</h1>
          <p className="mt-4 max-w-[34rem] text-base leading-snug md:text-xl">
            Sorry, the site hit a problem. Please try again, or reload the page.
          </p>
          <div className="mt-8 flex flex-col gap-3 md:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-12 w-full select-none items-center justify-center rounded-full bg-ink px-8 text-base font-medium text-white transition duration-300 ease-out hover:bg-violet active:scale-[0.97] md:w-auto"
            >
              Try again
            </button>
            {/* A plain link on purpose: it reloads the whole site, and there is no working router here. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="inline-flex h-12 w-full select-none items-center justify-center rounded-full bg-white px-8 text-base font-medium text-ink shadow-card transition duration-300 ease-out hover:bg-ink hover:text-white active:scale-[0.97] md:w-auto"
            >
              Back to home
            </a>
          </div>
          {error.digest && <p className="mt-10 text-sm text-ink/70">Reference: {error.digest}</p>}
        </main>
      </body>
    </html>
  );
}
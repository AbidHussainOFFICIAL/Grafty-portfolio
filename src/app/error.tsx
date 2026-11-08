"use client";

import { useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { StatusButton, StatusLink, StatusPage } from "@/components/status/StatusPage";

/** Shown when a page fails while it is running. "Try again" re-renders the page without reloading the site. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell>
      <StatusPage
        ghost="OOPS"
        ratio={4.4}
        label="Error"
        title="Something went wrong"
        text="Sorry, that didn’t work. Please try again, or head back to the home page."
        actions={
          <>
            <StatusButton onClick={reset}>Try again</StatusButton>
            <StatusLink href="/">Back to home</StatusLink>
          </>
        }
        extra={
          error.digest ? <p className="text-sm text-ink/70 lg:text-[max(13px,1.2cqw)]">Reference: {error.digest}</p> : null
        }
      />
    </PageShell>
  );
}

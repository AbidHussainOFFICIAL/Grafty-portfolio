import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { stubMetadata } from "@/lib/stubPage";

export const metadata = stubMetadata("Terms", "/terms");

export default function TermsPage() {
  return (
    <PageShell>
      <ComingSoon
        title="Terms"
        blurb="The terms of use are coming soon."
        backHref="/"
        backLabel="Back to home"
      />
    </PageShell>
  );
}

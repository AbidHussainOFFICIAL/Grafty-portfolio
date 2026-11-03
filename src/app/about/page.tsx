import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { stubMetadata } from "@/lib/stubPage";

export const metadata = stubMetadata("About", "/about");

export default function AboutPage() {
  return (
    <PageShell>
      <ComingSoon
        title="About"
        blurb="A longer story, awards and experience are coming soon."
        backHref="/"
        backLabel="Back to home"
      />
    </PageShell>
  );
}

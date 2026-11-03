import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { stubMetadata } from "@/lib/stubPage";

export const metadata = stubMetadata("Privacy", "/privacy");

export default function PrivacyPage() {
  return (
    <PageShell>
      <ComingSoon
        title="Privacy"
        blurb="The privacy policy is coming soon."
        backHref="/"
        backLabel="Back to home"
      />
    </PageShell>
  );
}

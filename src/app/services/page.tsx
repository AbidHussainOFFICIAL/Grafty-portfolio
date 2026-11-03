import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { stubMetadata } from "@/lib/stubPage";

export const metadata = stubMetadata("Services", "/services");

export default function ServicesPage() {
  return (
    <PageShell>
      <ComingSoon
        title="Services"
        blurb="How I work, what each service includes and answers to common questions are coming soon."
        backHref="/"
        backLabel="Back to home"
      />
    </PageShell>
  );
}

import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { stubMetadata } from "@/lib/stubPage";

export const metadata = stubMetadata("Contact", "/contact");

export default function ContactPage() {
  return (
    <PageShell>
      <ComingSoon
        title="Contact"
        blurb="A full contact page with booking is coming soon. For now, use the form on the home page or email me."
        backHref="/"
        backLabel="Back to home"
      />
    </PageShell>
  );
}

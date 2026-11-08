import { LegalPage } from "@/components/legal/LegalPage";
import { routes } from "@/data/content";
import { terms } from "@/data/legal";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata({ title: terms.title, description: terms.description, path: routes.terms });

export default function TermsPage() {
  return <LegalPage doc={terms} path={routes.terms} />;
}

import { LegalPage } from "@/components/legal/LegalPage";
import { routes } from "@/data/content";
import { privacy } from "@/data/legal";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata({ title: privacy.title, description: privacy.description, path: routes.privacy });

export default function PrivacyPage() {
  return <LegalPage doc={privacy} path={routes.privacy} />;
}

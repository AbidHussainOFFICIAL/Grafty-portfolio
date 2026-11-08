import { PageShell } from "@/components/layout/PageShell";
import { PageJsonLd } from "@/components/seo/JsonLd";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactPanel } from "@/components/contact/ContactPanel";
import { routes, site } from "@/data/content";
import { pageMetadata } from "@/lib/pageMetadata";

const description =
  "Start a project with Jessy Linda: send a project brief with your budget, timeline and files, or book a free 30-minute intro call. Replies within 24 hours.";

export const metadata = pageMetadata({ title: "Contact", description, path: routes.contact });

const url = `${site.url}${routes.contact}`;

const nodes = [
  {
    "@type": "ContactPage",
    "@id": `${url}#page`,
    url,
    name: `Contact | ${site.brand}`,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#person` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Contact", item: url },
    ],
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageJsonLd nodes={nodes} />
      <ContactHeader />
      <ContactPanel />
      <ContactFaq />
    </PageShell>
  );
}

import { PageShell } from "@/components/layout/PageShell";
import { CtaBand } from "@/components/sections/CtaBand";
import { WorkBrowser } from "@/components/sections/WorkBrowser";
import { WorkHeader } from "@/components/sections/WorkHeader";
import { PageJsonLd } from "@/components/seo/JsonLd";
import { routes, site } from "@/data/content";
import { pageMetadata } from "@/lib/pageMetadata";

const description =
  "Selected branding, product UI/UX, marketing and front-end projects by Jessy Linda. Filter by category.";

export const metadata = pageMetadata({ title: "Work", description, path: routes.work });

const nodes = [
  {
    "@type": "CollectionPage",
    "@id": `${site.url}${routes.work}#page`,
    url: `${site.url}${routes.work}`,
    name: `Work | ${site.brand}`,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#person` },
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}${routes.work}` },
    ],
  },
];

export default function WorkPage() {
  return (
    <PageShell>
      <PageJsonLd nodes={nodes} />
      <WorkHeader />

      <section id="projects" aria-label="Projects" className="mt-block px-5 md:px-8 lg:px-[5.08%]">
        <WorkBrowser />
      </section>

      <section aria-label="Start a project" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
        <CtaBand />
      </section>
    </PageShell>
  );
}

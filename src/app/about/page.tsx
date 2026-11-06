import { PageShell } from "@/components/layout/PageShell";
import { AboutAwards } from "@/components/about/AboutAwards";
import { AboutCv } from "@/components/about/AboutCv";
import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutLead } from "@/components/about/AboutLead";
import { AboutSkills } from "@/components/about/AboutSkills";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageJsonLd } from "@/components/seo/JsonLd";
import { routes, site, skills } from "@/data/content";
import { pageMetadata } from "@/lib/pageMetadata";

const description =
  "The story of Jessy Linda, a creative designer in California: experience, skills and tools, awards, and a downloadable CV.";

export const metadata = pageMetadata({ title: "About", description, path: routes.about });

const url = `${site.url}${routes.about}`;

const nodes = [
  {
    "@type": "AboutPage",
    "@id": `${url}#page`,
    url,
    name: `About | ${site.name}`,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#person` },
    mainEntity: { "@id": `${site.url}/#person` },
  },
  // Awards and past employers are left out of the markup while they are placeholder text.
  { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, knowsAbout: skills },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "About", item: url },
    ],
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageJsonLd nodes={nodes} />
      <AboutHeader />
      <AboutLead />
      <AboutStory />
      <AboutStats />
      <AboutTimeline />
      <AboutSkills />
      <AboutAwards />
      <AboutCv />

      <section aria-label="Start a project" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
        <CtaBand />
      </section>
    </PageShell>
  );
}

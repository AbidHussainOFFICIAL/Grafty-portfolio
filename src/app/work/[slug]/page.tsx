import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CaseChallenge } from "@/components/case/CaseChallenge";
import { CaseCover } from "@/components/case/CaseCover";
import { CaseGallery } from "@/components/case/CaseGallery";
import { CaseHeader } from "@/components/case/CaseHeader";
import { CaseOutcome } from "@/components/case/CaseOutcome";
import { CaseProcess } from "@/components/case/CaseProcess";
import { CaseSummary } from "@/components/case/CaseSummary";
import { NextProject } from "@/components/case/NextProject";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageJsonLd } from "@/components/seo/JsonLd";
import { caseStudiesPublished, categories, projects, routes, site } from "@/data/content";
import { pageMetadata } from "@/lib/pageMetadata";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

// Only the projects listed in content.ts exist; any other address is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.id === slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} case study`,
    description: project.study.tagline,
    path: `${routes.work}/${project.id}`,
    indexable: caseStudiesPublished,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const index = projects.findIndex((entry) => entry.id === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const url = `${site.url}${routes.work}/${project.id}`;

  const nodes = [
    {
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      url,
      name: project.title,
      description: project.study.overview,
      dateCreated: project.year,
      genre: project.categories.map((id) => categories.find((category) => category.id === id)?.label ?? id),
      image: `${site.url}${project.image.src}`,
      creator: { "@id": `${site.url}/#person` },
      isPartOf: { "@id": `${site.url}${routes.work}#page` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}${routes.work}` },
        { "@type": "ListItem", position: 3, name: project.title, item: url },
      ],
    },
  ];

  return (
    <PageShell>
      <PageJsonLd nodes={nodes} />
      <CaseHeader project={project} number={index + 1} total={projects.length} />
      <CaseCover project={project} />
      <CaseSummary project={project} />
      <CaseChallenge project={project} />
      <CaseProcess project={project} />
      <CaseGallery project={project} />
      <CaseOutcome project={project} />
      <NextProject project={project} />

      <section aria-label="Start a project" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
        <CtaBand />
      </section>
    </PageShell>
  );
}

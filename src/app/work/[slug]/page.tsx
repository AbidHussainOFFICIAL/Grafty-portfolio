import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { projects, routes } from "@/data/content";
import { stubMetadata } from "@/lib/stubPage";

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
  return stubMetadata(project ? `${project.title} case study` : "Case study", `${routes.work}/${slug}`);
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.id === slug);
  if (!project) notFound();

  return (
    <PageShell>
      <ComingSoon
        title={project.title}
        blurb="The full case study is coming soon."
        backHref={routes.work}
        backLabel="All work"
      />
    </PageShell>
  );
}

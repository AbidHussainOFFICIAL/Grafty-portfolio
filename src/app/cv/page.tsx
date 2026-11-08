import { PageShell } from "@/components/layout/PageShell";
import { CvHeader } from "@/components/cv/CvHeader";
import { CvSheet } from "@/components/cv/CvSheet";
import { routes } from "@/data/content";
import { pageMetadata } from "@/lib/pageMetadata";

// It repeats the About page, so it stays out of search results and the sitemap.
export const metadata = pageMetadata({
  title: "CV",
  description: "The CV of Jessy Linda on one printable page.",
  path: routes.cv,
  indexable: false,
});

export default function CvPage() {
  return (
    <PageShell>
      <CvHeader />
      <CvSheet />
    </PageShell>
  );
}

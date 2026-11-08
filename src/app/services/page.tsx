import { PageShell } from "@/components/layout/PageShell";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageJsonLd } from "@/components/seo/JsonLd";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { ServiceList } from "@/components/services/ServiceList";
import { ServicesFaq, servicesFaqs } from "@/components/services/ServicesFaq";
import { ServicesHeader } from "@/components/services/ServicesHeader";
import { ServicesPricing } from "@/components/services/ServicesPricing";
import { routes, services, site } from "@/data/content";
import { pageMetadata } from "@/lib/pageMetadata";

const description =
  "Branding, UI/UX design, marketing design and front-end code by Jessy Linda: what each service includes, how the work runs, packages and answers to common questions.";

export const metadata = pageMetadata({ title: "Services", description, path: routes.services });

const url = `${site.url}${routes.services}`;

const nodes = [
  {
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name: `Services | ${site.brand}`,
    description,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#person` },
  },
  ...services.map((service) => ({
    "@type": "Service",
    "@id": `${url}#${service.id}`,
    name: service.title,
    description: service.detail,
    serviceType: service.title,
    provider: { "@id": `${site.url}/#person` },
    areaServed: "Worldwide",
  })),
  {
    // Every question and answer below is visible on this page, which Google requires for FAQ markup.
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: servicesFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
  {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: url },
    ],
  },
];

export default function ServicesPage() {
  return (
    <PageShell>
      <PageJsonLd nodes={nodes} />
      <ServicesHeader />
      <ServiceList />
      <ProcessSteps />
      <ServicesPricing />
      <ServicesFaq />

      <section aria-label="Start a project" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
        <CtaBand />
      </section>
    </PageShell>
  );
}

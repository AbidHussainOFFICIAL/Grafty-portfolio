import type { LegalDoc } from "@/data/legal";
import { PageShell } from "@/components/layout/PageShell";
import { PageJsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CheckIcon } from "@/components/ui/Icons";
import { ContactStrip } from "@/components/ui/ContactStrip";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/content";
import { LegalContents } from "./LegalContents";
import { LegalDocument } from "./LegalDocument";
import { LegalHeader } from "./LegalHeader";

interface LegalPageProps {
  doc: LegalDoc;
  /** The page's address, e.g. "/privacy". Its last part also prefixes the section ids. */
  path: string;
}

/** A Privacy or Terms page: title row, the short version, the contents list beside the full text, and a way to ask questions. */
export function LegalPage({ doc, path }: LegalPageProps) {
  const prefix = path.slice(1);
  const url = `${site.url}${path}`;
  const items = doc.sections.map((section) => ({ id: `${prefix}-${section.id}`, title: section.title }));

  const nodes = [
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: `${doc.title} | ${site.brand}`,
      description: doc.description,
      inLanguage: "en",
      isPartOf: { "@id": `${site.url}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: doc.title, item: url },
      ],
    },
  ];

  return (
    <PageShell>
      <PageJsonLd nodes={nodes} />
      <LegalHeader doc={doc} />

      <div className="mt-8 px-5 md:mt-10 md:px-8 lg:mt-[3.4cqw] lg:px-[5.08%]">
        <div className="lg:grid lg:grid-cols-[24%_1fr] lg:items-start lg:gap-x-[2.4cqw]">
          <LegalContents items={items} />

          <div className="min-w-0">
            <Reveal>
              <section aria-labelledby={`${prefix}-short-title`} className="rounded-card bg-white p-5 shadow-card md:p-8 lg:p-[3cqw]">
                <h2
                  id={`${prefix}-short-title`}
                  className="text-xs font-semibold uppercase tracking-wide md:text-sm lg:text-[max(12px,1.1cqw)]"
                >
                  The short version
                </h2>
                <ul className="mt-4 flex flex-col gap-3 lg:mt-[1.4cqw] lg:gap-[1cqw]">
                  {doc.summary.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-base leading-snug md:text-lg lg:gap-[1cqw] lg:text-[max(14px,1.5cqw)]">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-white lg:h-[2.2cqw] lg:w-[2.2cqw]"
                      >
                        <CheckIcon className="h-3 w-3 lg:h-[1cqw] lg:w-[1cqw]" />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <div className="mt-4 lg:mt-[1.4cqw]">
              <LegalDocument doc={doc} prefix={prefix} />
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby={`${prefix}-questions-title`} className="mt-section px-5 md:px-8 lg:px-[5.08%]">
        <Reveal>
          <div className="rounded-card bg-white p-5 shadow-card md:flex md:items-center md:justify-between md:gap-10 md:p-8 lg:p-[3cqw]">
            <div>
              <h2
                id={`${prefix}-questions-title`}
                className="font-cond text-[clamp(1.75rem,8vw,2.25rem)] uppercase leading-none lg:text-[3cqw]"
              >
                Questions?
              </h2>
              <p className="mt-3 max-w-[30rem] text-base leading-snug lg:mt-[1.2cqw] lg:max-w-[36cqw] lg:text-[max(14px,1.5cqw)]">
                Ask me anything about this page, or ask to see, fix or delete your information.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:w-[22rem] md:shrink-0 lg:w-[32cqw]">
              <ContactStrip />
            </div>
          </div>
        </Reveal>
        <div className="mt-6 lg:mt-[2.4cqw]">
          <ArrowLink href={doc.other.href}>{doc.other.label}</ArrowLink>
        </div>
      </section>
    </PageShell>
  );
}

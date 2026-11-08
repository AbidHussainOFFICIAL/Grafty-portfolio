import type { ReactNode } from "react";
import { routes, site } from "@/data/content";
import type { LegalBlock, LegalDoc } from "@/data/legal";
import { Reveal } from "@/components/ui/Reveal";
import { SiteLink } from "@/components/ui/SiteLink";
import { cn } from "@/lib/cn";

const linkClass = "underline underline-offset-4 transition-colors duration-300 hover:text-violet-deep";

/** Swaps the placeholders in the legal text ({email}, {privacy}, {terms}) for real links. */
function withLinks(text: string): ReactNode[] {
  return text.split(/(\{email\}|\{privacy\}|\{terms\})/).map((part, index) => {
    switch (part) {
      case "{email}":
        return (
          <a key={index} href={`mailto:${site.email}`} className={linkClass}>
            {site.email}
          </a>
        );
      case "{privacy}":
        return (
          <SiteLink key={index} href={routes.privacy} className={linkClass}>
            privacy policy
          </SiteLink>
        );
      case "{terms}":
        return (
          <SiteLink key={index} href={routes.terms} className={linkClass}>
            terms of use
          </SiteLink>
        );
      default:
        return part;
    }
  });
}

const textClass = "text-base leading-snug md:text-lg lg:max-w-[52cqw] lg:text-[max(15px,1.55cqw)] lg:leading-[1.5]";

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return <p className={cn("mt-3 lg:mt-[1.2cqw]", textClass)}>{withLinks(block)}</p>;
  }
  return (
    <ul className="mt-3 flex flex-col gap-2.5 lg:mt-[1.2cqw] lg:gap-[1cqw]">
      {block.map((item) => (
        <li key={item} className={cn("flex gap-3 lg:gap-[1.2cqw]", textClass)}>
          <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink lg:h-[0.6cqw] lg:w-[0.6cqw]" />
          <span>{withLinks(item)}</span>
        </li>
      ))}
    </ul>
  );
}

/** The sections of a legal page in one white panel: a violet number, a condensed title and plain text. */
export function LegalDocument({ doc, prefix }: { doc: LegalDoc; prefix: string }) {
  return (
    <div className="rounded-card bg-white p-5 shadow-card md:p-8 lg:p-[3cqw]">
      {doc.sections.map((section, index) => {
        const id = `${prefix}-${section.id}`;
        return (
          <Reveal
            key={section.id}
            className={cn(index > 0 && "mt-8 border-t border-ink/15 pt-8 md:mt-10 md:pt-10 lg:mt-[3cqw] lg:pt-[3cqw]")}
          >
            <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
              <h2 id={`${id}-title`} className="flex items-baseline gap-3 lg:gap-[1.2cqw]">
                <span aria-hidden="true" className="font-numeral text-sm text-violet-deep md:text-base lg:text-[1.5cqw]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-cond text-[clamp(1.75rem,8vw,2.25rem)] uppercase leading-none lg:text-[3cqw]">
                  {section.title}
                </span>
              </h2>
              {section.body.map((block, blockIndex) => (
                <Block key={blockIndex} block={block} />
              ))}
            </section>
          </Reveal>
        );
      })}
    </div>
  );
}

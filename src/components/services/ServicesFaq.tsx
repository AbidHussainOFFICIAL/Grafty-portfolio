import { faqs } from "@/data/content";
import { Accordion } from "@/components/ui/Accordion";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactArrowLink } from "@/components/contact/ContactActions";

/** The questions shown on this page. The page's structured data (FAQPage) is built from the same list. */
export const servicesFaqs = faqs.filter((faq) => faq.page === "services");

/** Cost and service questions, as a compact accordion. */
export function ServicesFaq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <div className="flex items-end justify-between gap-4">
        <ScrollShift x={["-6vw", "0vw"]} className="w-[54%]">
          <GhostHeading text="ANSWERS" ratio={5.4} className="w-full" />
        </ScrollShift>
        <SectionLabel bar="after" id="faq-title" className="mb-2 lg:mb-[2.4cqw]">
          Questions
        </SectionLabel>
      </div>

      <Reveal className="mt-block">
        <Accordion
          items={servicesFaqs.map((faq) => ({ id: faq.id, title: faq.question, body: faq.answer }))}
          defaultOpenId="cost"
          variant="compact"
        />
      </Reveal>

      <Reveal className="mt-block">
        <ContactArrowLink>Ask me something else</ContactArrowLink>
      </Reveal>
    </section>
  );
}

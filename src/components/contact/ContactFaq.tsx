import { faqs } from "@/data/content";
import { Accordion } from "@/components/ui/Accordion";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { SectionLabel } from "@/components/ui/SectionLabel";

const contactFaqs = faqs.filter((faq) => faq.page === "contact");

/** Questions people ask before writing, as a compact accordion. The ghost word comes from the right, opposite the page header. */
export function ContactFaq() {
  return (
    <section aria-labelledby="contact-faq-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <div className="flex flex-row-reverse items-end justify-between gap-4">
        <ScrollShift x={["6vw", "0vw"]} className="w-[54%]">
          <GhostHeading text="ASK ME" ratio={5} className="w-full" />
        </ScrollShift>
        <SectionLabel bar="before" id="contact-faq-title" className="mb-2 lg:mb-[2.4cqw]">
          Questions
        </SectionLabel>
      </div>

      <Reveal className="mt-block">
        <Accordion
          items={contactFaqs.map((faq) => ({ id: faq.id, title: faq.question, body: faq.answer }))}
          defaultOpenId="contact"
          variant="compact"
        />
      </Reveal>
    </section>
  );
}

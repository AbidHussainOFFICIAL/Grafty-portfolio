import { faqs } from "@/data/content";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { withAmpersands } from "@/lib/text";

const items = faqs.map(({ id, question, answer }) => ({ id, title: question, body: answer }));

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="mt-20 px-5 md:mt-28 md:px-8 lg:mt-[9.3cqw] lg:px-[5.08%]"
    >
      <h2
        id="faq-title"
        className="font-cond text-center text-[clamp(2rem,9vw,3.5rem)] uppercase leading-none lg:text-[5cqw]"
      >
        {withAmpersands("Question & Answers")}
      </h2>
      <Reveal className="mt-8 lg:mt-[5cqw]">
        <Accordion items={items} variant="line" defaultOpenId="contact" />
      </Reveal>
    </section>
  );
}

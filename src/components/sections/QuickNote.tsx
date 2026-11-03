import { Photo } from "@/components/ui/Photo";
import { contact } from "@/data/content";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { ContactForm } from "./ContactForm";

/** Tablet and up: a short form with a portrait. Phones use the full-screen contact sheet instead. */
export function QuickNote() {
  const { portrait, quickNote } = contact;

  return (
    <section
      aria-labelledby="quick-note-title"
      className="mt-section hidden px-5 md:block md:px-8 lg:px-[5.08%]"
    >
      <h2 id="quick-note-title" className="sr-only">
        Send a message
      </h2>
      <ScrollShift x={["6vw", "0vw"]}>
        <GhostHeading text="SAY HELLO" ratio={7} className="mx-auto w-[96.5%]" />
      </ScrollShift>

      <Reveal className="relative mt-block overflow-hidden rounded-card bg-white shadow-card lg:grid lg:h-[34cqw] lg:grid-cols-[40.6%_1fr]">
        <div className="relative h-80 overflow-hidden lg:h-full">
          {/* Taller than its frame so the photo can drift slowly as the page scrolls. */}
          <ScrollShift y={["-6%", "6%"]} className="absolute inset-x-0 -inset-y-[8%]">
            <Photo
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              sizes="(min-width: 1440px) 540px, (min-width: 1024px) 38vw, 100vw"
              className="h-full w-full object-cover object-[50%_30%]"
            />
          </ScrollShift>
        </div>

        <div className="p-6 md:p-10 lg:flex lg:flex-col lg:justify-center lg:py-[3cqw] lg:pl-[6cqw] lg:pr-[4.9cqw]">
          <h3 className="font-cond text-[clamp(1.75rem,4vw,2.5rem)] uppercase leading-none lg:text-[2.7cqw]">
            {quickNote}
          </h3>
          <div className="mt-6 lg:mt-[2.4cqw]">
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

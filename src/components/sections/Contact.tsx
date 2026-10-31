import Image from "next/image";
import { contact } from "@/data/content";
import { ContactLink } from "@/components/contact/ContactLink";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { portrait, title } = contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mt-20 px-5 md:mt-28 md:px-8 lg:mt-[13.4cqw] lg:px-[5.08%]"
    >
      <h2 id="contact-title" className="sr-only">
        Contact
      </h2>
      <ScrollShift x={["-6vw", "0vw"]}>
        <GhostHeading text="CONTACT" ratio={6.6} className="mx-auto w-[96.5%]" />
      </ScrollShift>

      <Reveal className="relative mt-2 overflow-hidden rounded-2xl bg-white lg:mt-[3cqw] lg:grid lg:h-[44.4cqw] lg:grid-cols-[40.6%_1fr] lg:rounded-[1.76cqw]">
        {/* Phones: a compact card; the form itself opens full screen from the button. */}
        <div className="p-6 md:hidden">
          <h3 className="font-cond text-[clamp(2.5rem,12vw,3.5rem)] uppercase leading-none">
            {title}
          </h3>
          <p className="mt-3 text-base leading-snug">
            Have a project in mind? Send me a few lines and I will get back to you.
          </p>
          <ContactLink className="mt-6 h-12 w-full px-8 text-base">Write me a message</ContactLink>
          <CopyEmail className="mt-5 text-sm" />
        </div>

        <div className="relative hidden h-80 overflow-hidden md:block lg:h-full">
          {/* Taller than its frame so the photo can drift slowly as the page scrolls. */}
          <ScrollShift y={["-6%", "6%"]} className="absolute inset-x-0 -inset-y-[8%]">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              sizes="(min-width: 1440px) 540px, (min-width: 1024px) 38vw, 100vw"
              className="h-full w-full object-cover object-[50%_30%]"
            />
          </ScrollShift>
        </div>

        <div className="hidden p-6 md:block md:p-10 lg:py-[4.6cqw] lg:pl-[6cqw] lg:pr-[4.9cqw]">
          <h3 className="font-cond text-[clamp(2.5rem,12vw,3.5rem)] uppercase leading-none lg:text-[5cqw]">
            {title}
          </h3>
          <div className="mt-8 lg:mt-[3.4cqw]">
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

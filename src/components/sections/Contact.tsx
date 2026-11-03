import { GhostHeading } from "@/components/ui/GhostHeading";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { CtaBand } from "./CtaBand";

/**
 * The ghost heading and the "Let's work together" band. On phones the band's button opens the
 * full-screen contact sheet; on tablets and desktops the quick form follows in its own section.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mt-section px-5 md:px-8 lg:px-[5.08%]"
    >
      <h2 id="contact-title" className="sr-only">
        Contact
      </h2>
      <ScrollShift x={["-6vw", "0vw"]}>
        <GhostHeading text="CONTACT" ratio={6.6} className="mx-auto w-[96.5%]" />
      </ScrollShift>

      <CtaBand className="mt-block" />
    </section>
  );
}

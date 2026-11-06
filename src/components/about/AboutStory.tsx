import { signature } from "@/data/artwork";
import { about, routes } from "@/data/content";
import { ContactButton } from "@/components/contact/ContactActions";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CvBadge } from "@/components/ui/CvBadge";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VectorArt } from "@/components/ui/VectorArt";

/**
 * The longer story: the round portrait with the CV badge hanging off its edge (as on Home), and the
 * story beside it on desktop (below it on phones), ending in the signature and two actions.
 */
export function AboutStory() {
  const { portrait, page } = about;

  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="mt-section px-5 md:px-8 lg:px-[5.08%]"
    >
      <div className="grid gap-12 lg:grid-cols-[37.4cqw_1fr] lg:items-center lg:gap-[7cqw]">
        <Reveal className="relative mx-auto mb-8 w-[min(72vw,20rem)] lg:mx-0 lg:mb-0 lg:w-full">
          <Photo
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 1440px) 540px, (min-width: 1024px) 38vw, 72vw"
            className="aspect-square h-auto w-full rounded-full object-cover"
          />
          <CvBadge />
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel bar="before" id="story-title">
              {page.storyLabel}
            </SectionLabel>
          </Reveal>

          {page.story.map((paragraph, index) => (
            <Reveal key={paragraph} className={index === 0 ? "mt-block" : "mt-4 md:mt-5 lg:mt-[1.6cqw]"}>
              <p className="max-w-prose text-lg leading-snug md:text-xl lg:max-w-none lg:text-[1.9cqw] lg:leading-[1.5]">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal className="mt-8 lg:mt-[3cqw]">
            <VectorArt art={signature} className="w-[60%] max-w-[16rem] text-violet lg:w-[22cqw] lg:max-w-none" />
            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:gap-6 lg:mt-[2.4cqw] lg:gap-[2.4cqw]">
              <ContactButton>Start a project</ContactButton>
              <ArrowLink href={routes.work}>See my work</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

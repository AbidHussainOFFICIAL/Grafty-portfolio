import { Photo } from "@/components/ui/Photo";
import { about, routes } from "@/data/content";
import { CvBadge } from "@/components/ui/CvBadge";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollWords } from "@/components/ui/ScrollWords";
import { Stat } from "@/components/ui/Stat";

export function About() {
  const { statement, portrait, stats } = about;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mt-section px-5 md:px-8 lg:px-[5.08%]"
    >
      <div className="text-center">
        <Reveal>
          <h2
            id="about-title"
            className="inline-block rounded-full bg-white px-4 py-1.5 text-[10px] font-medium uppercase leading-none tracking-wide lg:px-[2.2cqw] lg:py-[0.9cqw] lg:text-[max(11px,0.95cqw)]"
          >
            About me
          </h2>
        </Reveal>
        <ScrollWords
          text={statement}
          className="font-statement mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,7.4vw,3.25rem)] uppercase leading-[1.02] md:max-w-[30ch] lg:mt-[3cqw] lg:max-w-[81cqw] lg:text-[4.8cqw] lg:leading-[1.06]"
        />
        <Reveal className="mt-6 flex justify-center lg:mt-[2.4cqw]">
          <PillLink href={routes.about}>More about me</PillLink>
        </Reveal>
      </div>

      <div className="mb-12 mt-10 grid grid-cols-2 gap-x-6 md:mt-14 lg:mb-[6.5cqw] lg:mt-[3.7cqw] lg:grid-cols-[1fr_auto_1fr] lg:gap-x-0">
        <Reveal className="relative order-first col-span-2 mx-auto mb-10 w-[min(72vw,20rem)] lg:order-none lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:w-[37.4cqw]">
          <Photo
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(min-width: 1440px) 540px, 38vw"
            className="aspect-square h-auto w-full rounded-full object-cover"
          />
          <CvBadge />
        </Reveal>

        <div className="relative flex flex-col justify-between gap-10 lg:col-start-1 lg:row-start-1 lg:py-[2.2cqw]">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 hidden h-[0.2cqw] min-h-px bg-ink lg:block"
          />
          <Stat value={stats.experience.value} label={stats.experience.label} />
          <Stat value={stats.projects.value} label={stats.projects.label} />
        </div>

        <div className="relative flex flex-col justify-between gap-10 lg:col-start-3 lg:row-start-1 lg:py-[2.2cqw]">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 hidden h-[0.2cqw] min-h-px bg-ink lg:block"
          />
          <Stat value={stats.rating.value} label={stats.rating.label} align="right" stars />
          <Stat value={stats.awards.value} label={stats.awards.label} align="right" href={routes.aboutAwards} />
        </div>
      </div>
    </section>
  );
}

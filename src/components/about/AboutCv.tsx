import { about, site } from "@/data/content";
import { ArrowDownIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

/** A slim dark panel (the style of the Results panel on case studies) with the CV download. */
export function AboutCv() {
  const { cv } = about.page;

  return (
    <section aria-labelledby="cv-title" className="mt-section px-5 md:px-8 lg:px-[5.08%]">
      <Reveal>
        <div className="rounded-card bg-ink p-6 text-white shadow-card md:flex md:items-center md:justify-between md:gap-8 md:p-10 lg:p-[4cqw]">
          <div>
            <p className="text-[10px] font-semibold uppercase leading-none tracking-wide opacity-75 lg:text-[max(10px,0.9cqw)]">
              {cv.label}
            </p>
            <h2
              id="cv-title"
              className="font-cond mt-3 text-[clamp(2rem,10vw,3.5rem)] uppercase leading-[0.9] lg:mt-[1.2cqw] lg:text-[6cqw]"
            >
              {cv.headline}
            </h2>
            <p className="mt-3 max-w-[30rem] text-base leading-snug text-white/80 lg:mt-[1.2cqw] lg:max-w-[40cqw] lg:text-[max(14px,1.7cqw)]">
              {cv.text}
            </p>
          </div>

          <a
            href={site.cvUrl}
            download
            className="group mt-6 inline-flex h-12 w-full shrink-0 select-none items-center justify-between gap-3 rounded-full bg-white pl-7 pr-1.5 text-base font-medium text-ink transition duration-300 ease-out hover:bg-violet hover:text-white active:scale-[0.97] md:mt-0 md:w-auto lg:h-[5cqw] lg:gap-[1.2cqw] lg:pl-[2.8cqw] lg:pr-[0.8cqw] lg:text-[max(14px,1.4cqw)]"
          >
            Download CV
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition duration-300 lg:h-[3.4cqw] lg:w-[3.4cqw]"
            >
              <ArrowDownIcon className="h-5 w-3 lg:h-[2.2cqw] lg:w-[1.4cqw]" />
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

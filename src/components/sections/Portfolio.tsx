import Image from "next/image";
import { projects } from "@/data/content";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Portfolio() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mt-20 px-5 md:mt-28 md:px-8 lg:mt-[20cqw] lg:px-[5.08%]"
    >
      <h2 id="work-title" className="sr-only">
        Latest portfolio
      </h2>
      <GhostHeading text="LATEST PORTFOLIO" ratio={11.4} className="w-full" />

      <ul className="mt-3 grid gap-3 md:grid-cols-2 lg:mt-[1.8cqw] lg:gap-[2.3cqw]">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Reveal delay={(index % 2) * 0.1}>
              <a
                href={project.href}
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-ink lg:rounded-[2cqw]"
              >
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={888}
                  height={888}
                  sizes="(min-width: 1440px) 660px, (min-width: 768px) 45vw, 92vw"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 flex items-center gap-2 lg:bottom-[2.3cqw] lg:left-[2.3cqw] lg:gap-[0.8cqw]">
                  <span className="font-cond flex h-10 items-center rounded-full bg-white px-5 text-base uppercase lg:h-[3.9cqw] lg:px-[2.15cqw] lg:text-[1.85cqw]">
                    {project.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition duration-300 group-hover:bg-ink group-hover:text-white lg:h-[3.9cqw] lg:w-[3.9cqw]"
                  >
                    <ArrowUpRightIcon className="h-5 w-5 transition duration-300 group-hover:rotate-45 lg:h-[2cqw] lg:w-[2cqw]" />
                  </span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

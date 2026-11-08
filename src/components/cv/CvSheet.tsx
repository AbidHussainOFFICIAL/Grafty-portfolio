"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { awards, categories, cvPage, experience, latestProjects, site, skillGroups, socials } from "@/data/content";
import { useEntrance } from "@/lib/useEntrance";

const host = (address: string) => address.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const work = experience.filter((role) => !role.study);
const study = experience.filter((role) => role.study);

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide print:text-[8pt]">
        <span aria-hidden="true" className="inline-block h-[1.05em] w-[0.22em] min-w-[3px] bg-accent" />
        {title}
      </h3>
      <div className="mt-3 print:mt-2">{children}</div>
    </section>
  );
}

function Years({ children }: { children: string }) {
  return <p className="font-numeral text-xs opacity-70 print:text-[8pt]">{children}</p>;
}

/**
 * The CV as a sheet of paper: name and contact details on top, experience and selected work on the
 * left, skills, awards and education on the right. On screen it is a white card; printed, it is
 * the plain page (everything else on the site is hidden, and the entrance animation is forced to
 * its end state so nothing prints half-faded). Built from content.ts, so it never disagrees with
 * the rest of the site.
 */
export function CvSheet() {
  const { rise } = useEntrance();

  return (
    <div className="mt-8 px-5 md:mt-10 md:px-8 lg:mt-[3cqw] lg:px-[5.08%] print:mt-0 print:px-0">
      <motion.article
        aria-label={`Curriculum vitae of ${site.name}`}
        className="mx-auto max-w-[820px] rounded-card bg-white p-6 text-sm shadow-card [print-color-adjust:exact] md:p-10 md:text-[15px] print:max-w-none print:rounded-none print:bg-transparent print:p-0 print:text-[9.5pt] print:leading-snug print:opacity-100! print:shadow-none print:transform-none!"
        {...rise(0.75)}
      >
        <header className="border-b border-ink/15 pb-5 md:flex md:items-end md:justify-between md:gap-8 print:flex print:items-end print:justify-between print:gap-8">
          <div>
            <h2 className="font-cond text-[clamp(2.5rem,12vw,3.75rem)] uppercase leading-[0.9] print:text-[34pt]">{site.name}</h2>
            <p className="mt-2 text-base font-medium print:text-[11pt]">{site.jobTitle}</p>
          </div>
          <ul className="mt-4 space-y-0.5 md:mt-0 md:text-right print:mt-0 print:text-right">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.url}>{host(site.url)}</a>
            </li>
            {socials.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {host(social.href)}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-[1fr_30%] md:gap-10 print:mt-5 print:grid-cols-[1fr_30%] print:gap-8">
          <div className="flex flex-col gap-6 print:gap-4">
            <CvSection title="Summary">
              <p>{cvPage.summary}</p>
            </CvSection>

            <CvSection title="Experience">
              <ol className="space-y-4 print:space-y-3">
                {work.map((role) => (
                  <li key={role.id} className="break-inside-avoid">
                    <Years>{role.years}</Years>
                    <p className="font-semibold">{role.title}</p>
                    <p className="text-ink/80">{role.place}</p>
                  </li>
                ))}
              </ol>
            </CvSection>

            <CvSection title="Selected work">
              <ul className="space-y-2 print:space-y-1.5">
                {latestProjects.map((project) => (
                  <li key={project.id} className="break-inside-avoid">
                    <span className="font-semibold">{project.title}</span>
                    <span className="text-ink/80">
                      {" "}
                      · {project.categories.map((id) => categories.find((category) => category.id === id)?.label).join(", ")} · {project.year}
                    </span>
                  </li>
                ))}
              </ul>
            </CvSection>
          </div>

          <div className="flex flex-col gap-6 print:gap-4">
            <CvSection title="Skills">
              <ul className="space-y-3 print:space-y-2">
                {skillGroups.map((group) => (
                  <li key={group.id}>
                    <p className="font-semibold">{group.title}</p>
                    <p className="text-ink/80">{group.items.join(", ")}</p>
                  </li>
                ))}
              </ul>
            </CvSection>

            <CvSection title="Awards">
              <ul className="space-y-3 print:space-y-2">
                {awards.map((award) => (
                  <li key={award.id} className="break-inside-avoid">
                    <p className="font-semibold">{award.name}</p>
                    <p className="text-ink/80">
                      {award.issuer} · {award.year}
                    </p>
                  </li>
                ))}
              </ul>
            </CvSection>

            <CvSection title="Education">
              <ul className="space-y-3 print:space-y-2">
                {study.map((role) => (
                  <li key={role.id} className="break-inside-avoid">
                    <Years>{role.years}</Years>
                    <p className="font-semibold">{role.title}</p>
                    <p className="text-ink/80">{role.place}</p>
                  </li>
                ))}
              </ul>
            </CvSection>
          </div>
        </div>

        <p className="mt-6 border-t border-ink/15 pt-3 text-xs text-ink/70 print:mt-5 print:text-[8pt]">
          Updated {cvPage.updated} · {host(site.url)}/cv
        </p>
      </motion.article>
    </div>
  );
}

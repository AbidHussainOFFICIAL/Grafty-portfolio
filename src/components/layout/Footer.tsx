import { footerLinks, navLinks, site, socials } from "@/data/content";
import { wordmark } from "@/data/artwork";
import { GhostHeading } from "@/components/ui/GhostHeading";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ArrowUpIcon, SocialIcon } from "@/components/ui/Icons";
import { ScrollShift } from "@/components/ui/ScrollShift";
import { VectorArt } from "@/components/ui/VectorArt";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 lg:mt-[10.4cqw]">
      {/* Phones and tablets: a purpose-built footer. */}
      <div className="px-5 md:px-8 lg:hidden">
        <a href="#home" aria-label={`${site.brand} home`} className="inline-block">
          <VectorArt art={wordmark} className="h-7 w-auto text-ink" />
        </a>

        <nav aria-label="Footer" className="mt-6">
          <ul className="grid grid-cols-2 gap-x-6 border-t border-ink/15">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-ink/15">
                <a href={link.href} className="flex min-h-12 items-center text-base transition hover:text-violet">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
          <ul className="flex items-center gap-2">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white"
                >
                  <SocialIcon id={social.id} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#home"
            className="flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 text-sm text-white transition duration-300 hover:bg-violet"
          >
            Back to top
            <ArrowUpIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 text-sm">
          <CopyEmail />
          <p className="mt-4 text-ink/80">
            <strong className="font-semibold">
              &copy;{year} {site.brand} Inc.
            </strong>{" "}
            All Rights Reserved
          </p>
        </div>
      </div>

      {/* Desktop footer, unchanged. */}
      <div className="hidden px-5 md:px-8 lg:block lg:px-[5.08%]">
        <div className="grid justify-items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-y-[1.4cqw] lg:px-[4.3cqw]">
          <a
            href="#home"
            aria-label={`${site.brand} home`}
            className="lg:col-start-2 lg:row-start-1"
          >
            <VectorArt art={wordmark} className="h-7 w-auto text-ink lg:h-[2.25cqw]" />
          </a>

          <ul className="flex items-center gap-2 lg:col-start-2 lg:row-start-2">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white lg:h-[3.2cqw] lg:w-[3.2cqw]"
                >
                  <SocialIcon id={social.id} className="h-4 w-4 lg:h-[1.5cqw] lg:w-[1.5cqw]" />
                </a>
              </li>
            ))}
          </ul>

          <nav
            aria-label="Footer"
            className="flex items-center gap-3 text-sm lg:col-start-3 lg:row-start-2 lg:justify-self-end lg:text-[max(13px,1.2cqw)]"
          >
            {footerLinks.map((link, index) => (
              <span key={link.href} className="flex items-center gap-3">
                {index > 0 && <span aria-hidden="true">.</span>}
                <a href={link.href} className="transition hover:text-violet">
                  {link.label}
                </a>
              </span>
            ))}
          </nav>

          <p className="text-center text-sm lg:col-start-1 lg:row-start-2 lg:justify-self-start lg:text-left lg:text-[max(13px,1.2cqw)]">
            <strong className="font-semibold">
              &copy;{year} {site.brand} Inc.
            </strong>{" "}
            All Rights Reserved
          </p>
        </div>
      </div>

      <ScrollShift x={["-6vw", "0vw"]} settle="end" className="mx-auto mt-10 w-[92%] lg:mt-[5cqw] lg:w-[87%]">
        <GhostHeading text="JESSY LINDA" ratio={7.3} visible={0.49} className="w-full" />
      </ScrollShift>
    </footer>
  );
}

import { socials } from "@/data/content";
import { CopyEmail } from "./CopyEmail";
import { SocialIcon } from "./Icons";

/**
 * Email pill with a copy button, and a row of equal social buttons.
 * Both rows span the full width so they line up with whatever sits above them.
 * Shared by the mobile menu and the mobile footer.
 */
export function ContactStrip() {
  return (
    <div className="flex flex-col gap-3">
      <CopyEmail variant="pill" />
      <ul className="grid grid-cols-4 gap-2">
        {socials.map((social) => (
          <li key={social.id}>
            <a
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-12 place-items-center rounded-full bg-white text-ink transition duration-300 hover:bg-ink hover:text-white"
            >
              <SocialIcon id={social.id} className="h-[18px] w-[18px]" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

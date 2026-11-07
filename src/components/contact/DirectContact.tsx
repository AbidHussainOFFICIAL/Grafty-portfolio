import { contactPage } from "@/data/content";
import { CheckIcon } from "@/components/ui/Icons";
import { ContactStrip } from "@/components/ui/ContactStrip";

/** The email (with a copy button), the social links and what to expect. Beside the panel on desktop, below it elsewhere. */
export function DirectContact() {
  const { title, text, promises } = contactPage.direct;

  return (
    <div>
      <h2 className="font-cond text-[clamp(1.75rem,8vw,2.25rem)] uppercase leading-none lg:text-[3cqw]">{title}</h2>
      <p className="mt-3 max-w-[30rem] text-base leading-snug lg:mt-[1.2cqw] lg:text-[max(14px,1.5cqw)]">{text}</p>

      <div className="mt-5 max-w-[30rem] lg:mt-[1.8cqw] lg:max-w-none">
        <ContactStrip />
      </div>

      <ul className="mt-6 flex flex-col gap-3 lg:mt-[2.2cqw] lg:gap-[1cqw]">
        {promises.map((promise) => (
          <li key={promise} className="flex items-center gap-3 text-sm lg:gap-[1cqw] lg:text-[max(13px,1.25cqw)]">
            <span
              aria-hidden="true"
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-white lg:h-[2.2cqw] lg:w-[2.2cqw]"
            >
              <CheckIcon className="h-3 w-3 lg:h-[1cqw] lg:w-[1cqw]" />
            </span>
            {promise}
          </li>
        ))}
      </ul>
    </div>
  );
}

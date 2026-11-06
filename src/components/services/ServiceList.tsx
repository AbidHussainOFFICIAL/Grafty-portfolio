import { services, showPrices, type Service } from "@/data/content";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { ContactArrowLink } from "@/components/contact/ContactActions";

const rowLabel = "text-[10px] font-semibold uppercase leading-none tracking-wide opacity-75 lg:text-[max(10px,0.9cqw)]";

/** What sits under a service's text when it is open: deliverables, timeline, price and a link to ask for a quote. */
function ServiceExtra({ service }: { service: Service }) {
  return (
    <div className="mt-6 lg:mt-[2.4cqw]">
      <p className={rowLabel}>What you get</p>
      <ul className="mt-3 flex flex-wrap gap-1.5 lg:mt-[1cqw] lg:gap-[0.6cqw]">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="rounded-full border border-ink/40 px-3 py-1.5 text-xs md:text-sm lg:px-[1.2cqw] lg:py-[0.6cqw] lg:text-[max(12px,1.1cqw)]"
          >
            {item}
          </li>
        ))}
      </ul>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/15 pt-5 lg:mt-[2.4cqw] lg:max-w-[48cqw] lg:gap-[2cqw] lg:pt-[2cqw]">
        <div>
          <dt className={rowLabel}>Typical timeline</dt>
          <dd className="font-numeral mt-2 text-lg md:text-xl lg:mt-[0.8cqw] lg:text-[2cqw]">{service.timeline}</dd>
        </div>
        <div>
          <dt className={rowLabel}>{showPrices ? "Starting from" : "Pricing"}</dt>
          <dd className="font-numeral mt-2 text-lg md:text-xl lg:mt-[0.8cqw] lg:text-[2cqw]">
            {showPrices ? service.from : "On request"}
          </dd>
        </div>
      </dl>

      <div className="mt-5 lg:mt-[2cqw]">
        <ContactArrowLink>{`Get a ${service.title.toLowerCase()} quote`}</ContactArrowLink>
      </div>
    </div>
  );
}

/**
 * The four services. Phones get the Home accordion (longer text and the extra detail in each
 * panel). From tablet up everything is open at once as a grid of cards, so nothing is hidden
 * and the page doesn't repeat the accordion look that the questions use further down.
 */
export function ServiceList() {
  const items = services.map((service) => ({
    id: service.id,
    title: service.title,
    body: service.detail,
    extra: <ServiceExtra service={service} />,
  }));

  return (
    <section id="service-list" aria-label="Services" className="mt-8 px-5 md:mt-10 md:px-8 lg:mt-[3.4cqw] lg:px-[5.08%]">
      <Reveal className="md:hidden">
        <Accordion items={items} defaultOpenId="design" />
      </Reveal>

      <ul className="hidden gap-4 md:grid md:grid-cols-2 lg:gap-[1.4cqw]">
        {services.map((service, index) => (
          <li key={service.id}>
            <Reveal delay={(index % 2) * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-card bg-white p-8 shadow-card lg:p-[2.6cqw]">
                <p aria-hidden="true" className="font-numeral text-base opacity-60 lg:text-[1.6cqw]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-cond mt-2 text-[clamp(2.5rem,6vw,3.5rem)] uppercase leading-[0.9] lg:mt-[0.8cqw] lg:text-[5.6cqw]">
                  {service.title}
                </h3>
                <p className="mt-4 text-lg leading-snug lg:mt-[1.4cqw] lg:text-[1.65cqw] lg:leading-[1.45]">
                  {service.detail}
                </p>
                <div className="mt-auto">
                  <ServiceExtra service={service} />
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

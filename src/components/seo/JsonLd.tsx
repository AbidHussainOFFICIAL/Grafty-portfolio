import { faqs, services, site, socials } from "@/data/content";

/** Profile links only count once they point at a real profile, not a site's home page. */
const profiles = socials.map((social) => social.href).filter((href) => new URL(href).pathname.length > 1);

/*
 * Structured data for search engines, built from the same content as the page.
 * Reviews are left out on purpose: Google does not show star ratings for reviews a business
 * publishes about itself, and marking up placeholder testimonials as real would be misleading.
 */
const graph = [
  {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.title,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": `${site.url}/#person` },
  },
  {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: site.jobTitle,
    url: site.url,
    image: `${site.url}/opengraph-image.png`,
    email: site.email,
    description: site.description,
    address: { "@type": "PostalAddress", addressRegion: "California", addressCountry: "US" },
    ...(profiles.length > 0 && { sameAs: profiles }),
  },
  {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#service`,
    name: `${site.brand} by ${site.name}`,
    url: site.url,
    image: `${site.url}/opengraph-image.png`,
    description: site.description,
    founder: { "@id": `${site.url}/#person` },
    email: site.email,
    areaServed: "Worldwide",
    address: { "@type": "PostalAddress", addressRegion: "California", addressCountry: "US" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.body },
      })),
    },
    ...(profiles.length > 0 && { sameAs: profiles }),
  },
  {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
];

export function JsonLd() {
  // "<" is escaped so no text in the content can close the script tag early.
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

import { services, site, socials } from "@/data/content";

/** Profile links only count once they point at a real profile, not a site's home page. */
const profiles = socials.map((social) => social.href).filter((href) => new URL(href).pathname.length > 1);

/*
 * Structured data for search engines, built from the same content as the page.
 * FAQ markup is not here on purpose: Google only accepts it for questions that are visible on the
 * same page, and Home does not show them. It is rendered by the Services page, next to its FAQ.
 * Reviews are left out on purpose: Google does not show star ratings for reviews a business
 * publishes about itself, and marking up placeholder testimonials as real would be misleading.
 */
const graph = [
  {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.brand,
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
    description: site.bio,
    address: { "@type": "PostalAddress", addressRegion: "California", addressCountry: "US" },
    ...(profiles.length > 0 && { sameAs: profiles }),
  },
  {
    "@type": "ProfessionalService",
    "@id": `${site.url}/#service`,
    name: `${site.brand} by ${site.name}`,
    url: site.url,
    image: `${site.url}/opengraph-image.png`,
    description: site.bio,
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
  }
];

/** "<" is escaped so no text in the content can close the script tag early. */
function Script({ nodes }: { nodes: readonly object[] }) {
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/** The site-wide data, rendered once by the root layout. */
export function JsonLd() {
  return <Script nodes={graph} />;
}

/** Data for one inner page (a collection page, breadcrumbs), rendered by that page. */
export function PageJsonLd({ nodes }: { nodes: readonly object[] }) {
  return <Script nodes={nodes} />;
}

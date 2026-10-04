import { site, serviceAreas } from "./site";
import { services, specialties, type Faq } from "./services";

const ID = `${site.url}/#business`;
export const PERSON_ID = `${site.url}/#jason`;
export const WEBSITE_ID = `${site.url}/#website`;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: [site.legalName, site.shortName],
    description: site.description,
    url: site.url,
    telephone: site.phoneE164,
    image: [`${site.url}/og.jpg`, `${site.url}/images/work/lobby-reef-1200.jpg`, `${site.url}/images/work/reef-display.jpg`],
    logo: `${site.url}/brand/logo-mark.png`,
    hasMap: site.googleMapsUrl,
    priceRange: "$$",
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      addressRegion: site.state,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: serviceAreas.map((a) => ({
      "@type": "City",
      name: `${a.name}, FL`,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: [site.googleMapsUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Aquarium services",
      itemListElement: [...services, ...specialties].map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${site.url}/${"bullets" in s ? "services" : "aquariums"}/${s.slug}`,
        },
      })),
    },
    knowsAbout: [
      "Saltwater reef aquariums",
      "Coral care",
      "Freshwater aquariums",
      "Planted aquariums",
      "Koi ponds",
      "Aquarium water chemistry",
      "Aquarium installation",
    ],
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.ownerFirst,
    jobTitle: "Owner and aquarium technician",
    url: `${site.url}/about`,
    worksFor: { "@id": ID },
    knowsAbout: ["Saltwater reef aquariums", "Freshwater and planted aquariums", "Koi ponds", "Aquarium water chemistry", "Aquarium installation"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    alternateName: [site.shortName, site.legalName],
    publisher: { "@id": ID },
    inLanguage: "en-US",
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: opts.url,
    provider: { "@id": ID },
    areaServed: serviceAreas.map((a) => ({ "@type": "City", name: `${a.name}, FL` })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.url}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}

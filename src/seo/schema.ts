import { MARKETS, marketContacts, type Market } from '../data/markets';

export type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
export type JsonLdObject = { [key: string]: JsonLdValue };

export const SITE_NAME = 'Space Glass';
export const DEFAULT_IMAGE = '/images/v5/hero.webp';
export const LOGO_PATH = '/images/space-glass-logo.png';

// Company facts for structured data. Only what the site itself publishes (contacts page, footer):
// one phone and e-mail for all offices, and the social profiles that open. No legal name, postal
// codes or coordinates are published, so none are marked up. Phone/e-mail come from the market config
// (src/data/markets.ts): the company-wide channels are the Ukrainian ones.
export const COMPANY_PHONE = MARKETS.UA.contact.phone!.e164;
export const COMPANY_EMAIL = MARKETS.UA.contact.email!;
export const COMPANY_SAME_AS = [
  'https://www.instagram.com/spaceglass_od/',
  'https://t.me/spaceglass',
  'https://www.tiktok.com/@spaceglass',
  'https://www.facebook.com/spaceglasscomua',
  'https://www.youtube.com/@spaceglass_od'
];
export const organizationId = (origin: string | URL) => `${absoluteUrl('/', origin)}#organization`;

export const absoluteUrl = (pathOrUrl: string | URL, origin: string | URL) => new URL(pathOrUrl, origin).href;

// Founders are marked up only where the page itself shows them (the About team section), not sitewide.
export function organizationSchema(origin: string | URL, founders: JsonLdObject[] = [], market: Market = MARKETS.UA): JsonLdObject {
  const siteUrl = absoluteUrl('/', origin);
  // The page's market decides the contact point and the service area. A market without an office (Austria)
  // is a service area of the same organization: no address, no LocalBusiness, and no availableLanguage
  // until the market lists a confirmed contact language (market.languages).
  const contacts = marketContacts(market);
  return {
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: SITE_NAME,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(LOGO_PATH, origin)
    },
    image: absoluteUrl(DEFAULT_IMAGE, origin),
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: contacts.phone?.e164 ?? COMPANY_PHONE,
      email: contacts.email ?? COMPANY_EMAIL,
      areaServed: market.countryCode,
      ...(market.languages.length ? { availableLanguage: market.languages } : {})
    },
    areaServed: market.schemaCity ? [{ '@type': 'Country', name: market.schemaCountry }, { '@type': 'City', name: market.schemaCity }] : { '@type': 'Country', name: market.schemaCountry },
    sameAs: COMPANY_SAME_AS,
    ...(founders.length ? { founder: founders } : {})
  };
}

export function websiteSchema(origin: string | URL, language: string): JsonLdObject {
  const siteUrl = absoluteUrl('/', origin);
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: language,
    publisher: { '@id': `${siteUrl}#organization` }
  };
}

export function webPageSchema({
  canonical,
  title,
  description,
  image,
  language,
  type = 'WebPage',
  mainEntityId
}: {
  canonical: string | URL;
  title: string;
  description: string;
  image: string | URL;
  language: string;
  type?: string;
  /** @id of the page's main entity (e.g. the Article of a knowledge page). */
  mainEntityId?: string;
}): JsonLdObject {
  const url = canonical.toString();
  const siteUrl = new URL('/', url).href;
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    headline: title,
    description,
    inLanguage: language,
    isPartOf: { '@id': `${siteUrl}#website` },
    about: { '@id': `${siteUrl}#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: image.toString()
    },
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {})
  };
}

export function breadcrumbSchema(items: Array<{ label: string; href: string | URL }>): JsonLdObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href.toString()
    }))
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>): JsonLdObject | null {
  if (items.length === 0) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function jsonLdGraph(nodes: Array<JsonLdObject | null | undefined>): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean) as JsonLdObject[]
  };
}

/** Office (branch) of the organization as shown on the contacts page: same business, one node per address. */
export function officeSchema(
  origin: string | URL,
  office: { id: string; city: string; streetAddress: string; url: string; countryCode?: string }
): JsonLdObject {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${absoluteUrl('/contacts/', origin)}#office-${office.id}`,
    name: `${SITE_NAME} — ${office.city}`,
    url: absoluteUrl(office.url, origin),
    parentOrganization: { '@id': organizationId(origin) },
    logo: absoluteUrl(LOGO_PATH, origin),
    telephone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.streetAddress,
      addressLocality: office.city,
      addressCountry: office.countryCode ?? 'UA'
    },
    areaServed: { '@type': 'City', name: office.city },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00'
    }
  };
}

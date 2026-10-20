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

export const brandId = (origin: string | URL) => `${absoluteUrl('/', origin)}#brand`;
/** @id of the business serving a market (UA → the historical #organization, AT → #organization-at). */
export const marketOrganizationId = (origin: string | URL, market: Market) => `${absoluteUrl('/', origin)}#${(market.organization ?? MARKETS.UA.organization!).id}`;

/** The common commercial brand of the Ukrainian business and Space Glass KG. */
export function brandSchema(origin: string | URL): JsonLdObject {
  return {
    '@type': 'Brand',
    '@id': brandId(origin),
    name: SITE_NAME,
    url: absoluteUrl('/', origin),
    logo: absoluteUrl(LOGO_PATH, origin)
  };
}

/**
 * The business of one market as its own Organization — the same node (same values) on every page it
 * appears on. UA and AT are separate legal structures: separate @id, linked only through the shared
 * `brand`, no parentOrganization/subOrganization (not confirmed). Only published facts: legalName when
 * the owner confirmed it, no registration numbers; a service-area market (Austria) gets the country as
 * its address and no street, office or LocalBusiness.
 * Founders are marked up only where the page itself shows them (the About team section), not sitewide.
 */
export function marketOrganizationSchema(origin: string | URL, market: Market, founders: JsonLdObject[] = []): JsonLdObject {
  const contacts = marketContacts(market);
  return {
    '@type': 'Organization',
    '@id': marketOrganizationId(origin, market),
    name: SITE_NAME,
    ...(market.organization?.legalName ? { legalName: market.organization.legalName } : {}),
    url: absoluteUrl(market.organization?.url ?? '/', origin),
    brand: { '@id': brandId(origin) },
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(LOGO_PATH, origin)
    },
    image: absoluteUrl(DEFAULT_IMAGE, origin),
    telephone: contacts.phone?.e164 ?? COMPANY_PHONE,
    email: contacts.email ?? COMPANY_EMAIL,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: contacts.phone?.e164 ?? COMPANY_PHONE,
      email: contacts.email ?? COMPANY_EMAIL,
      areaServed: market.countryCode,
      ...(market.languages.length ? { availableLanguage: market.languages } : {})
    },
    ...(market.presence === 'service-area' ? { address: { '@type': 'PostalAddress', addressCountry: market.countryCode } } : {}),
    areaServed: { '@type': 'Country', name: market.schemaCountry },
    // The social profiles are the Ukrainian business's own accounts.
    ...(market.code === 'UA' ? { sameAs: COMPANY_SAME_AS } : {}),
    ...(founders.length ? { founder: founders } : {})
  };
}

/** The Ukrainian business (#organization): publisher of the website, owner of the offices and projects. */
export function organizationSchema(origin: string | URL, founders: JsonLdObject[] = []): JsonLdObject {
  return marketOrganizationSchema(origin, MARKETS.UA, founders);
}

/** The website node is the same on every page: all its languages, published by the Ukrainian business. */
export function websiteSchema(origin: string | URL): JsonLdObject {
  const siteUrl = absoluteUrl('/', origin);
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: ['uk', 'ru', 'en', 'de', 'es'],
    publisher: { '@id': `${siteUrl}#organization` }
  };
}

/** A service page's offer, provided by the business of the page's market. */
export function serviceSchema({ canonical, name, description, providerId, areaServed }: { canonical: string; name: string; description: string; providerId: string; areaServed: string }): JsonLdObject {
  return {
    '@type': 'Service',
    '@id': `${canonical}#service`,
    url: canonical,
    name,
    description,
    provider: { '@id': providerId },
    areaServed: { '@type': 'Country', name: areaServed }
  };
}

export function webPageSchema({
  canonical,
  title,
  description,
  image,
  language,
  type = 'WebPage',
  mainEntityId,
  aboutId
}: {
  canonical: string | URL;
  title: string;
  description: string;
  image: string | URL;
  language: string;
  type?: string;
  /** @id of the page's main entity (e.g. the Article of a knowledge page). */
  mainEntityId?: string;
  /** @id of the business the page is about (the page market's organization); default = #organization. */
  aboutId?: string;
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
    about: { '@id': aboutId ?? `${siteUrl}#organization` },
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

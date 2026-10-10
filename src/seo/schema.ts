export type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
export type JsonLdObject = { [key: string]: JsonLdValue };

export const SITE_NAME = 'Space Glass';
export const DEFAULT_IMAGE = '/images/v5/hero.webp';
export const LOGO_PATH = '/images/space-glass-logo.png';

// Company facts for structured data. Only what the site itself publishes (contacts page, footer):
// one phone and e-mail for all offices, and the social profiles that open. No legal name, postal
// codes or coordinates are published, so none are marked up.
export const COMPANY_PHONE = '+380734251400';
export const COMPANY_EMAIL = 'info@space-glass.com.ua';
export const COMPANY_SAME_AS = [
  'https://www.instagram.com/spaceglass_od/',
  'https://t.me/spaceglass',
  'https://www.tiktok.com/@spaceglass',
  'https://www.facebook.com/spaceglasscomua',
  'https://www.youtube.com/@spaceglass_od'
];
export const organizationId = (origin: string | URL) => `${absoluteUrl('/', origin)}#organization`;

export const absoluteUrl = (pathOrUrl: string | URL, origin: string | URL) => new URL(pathOrUrl, origin).href;

export function organizationSchema(origin: string | URL): JsonLdObject {
  const siteUrl = absoluteUrl('/', origin);
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
      telephone: COMPANY_PHONE,
      email: COMPANY_EMAIL,
      areaServed: 'UA',
      availableLanguage: ['uk', 'ru']
    },
    areaServed: { '@type': 'Country', name: 'Ukraine' },
    sameAs: COMPANY_SAME_AS
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
    publisher: { '@id': `${siteUrl}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
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
  office: { id: string; city: string; streetAddress: string; url: string }
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
      addressCountry: 'UA'
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

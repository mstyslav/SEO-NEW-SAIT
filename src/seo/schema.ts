export type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
export type JsonLdObject = { [key: string]: JsonLdValue };

export const SITE_NAME = 'Space Glass';
export const DEFAULT_IMAGE = '/images/v5/hero.webp';
export const LOGO_PATH = '/images/space-glass-logo.png';

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
    sameAs: []
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
  type = 'WebPage'
}: {
  canonical: string | URL;
  title: string;
  description: string;
  image: string | URL;
  language: string;
  type?: string;
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
    }
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

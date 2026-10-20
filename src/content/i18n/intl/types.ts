// Content shapes of the EN/DE/ES pages (src/content/i18n/intl/*). Facts come from the UA pages
// and project records; the texts are written for each market, not translated word by word.
import type { IntlLocale } from '../../../i18n/intl-routes';

export type Pair = [string, string];

/** A product / service hub page (rendered by src/components/intl/IntlHubPage.astro). */
export interface HubCopy {
  meta: { title: string; description: string };
  /** Short page name for breadcrumbs, related links and the schema ItemList. */
  name: string;
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
  /** Label of the first hero button (scrolls to the types). */
  explore: string;
  intro: { title: string; paragraphs: string[]; spec: Pair[] };
  types: { eyebrow: string; title: string; intro: string; items: Pair[] };
  options?: { eyebrow: string; title: string; intro: string; items: Pair[] };
  benefits: { eyebrow: string; title: string; items: Pair[] };
  process?: { title: string; steps: Pair[] };
  area?: { title: string; paragraphs: string[] };
  faq: { title: string; intro: string; items: Pair[] };
  form: { title: string; text: string; optionsLabel: string; options: string[]; commentPlaceholder: string; product: string };
}

/** Labels and default blocks shared by all hub pages of one locale. */
export interface HubCommon {
  home: string;
  request: string;
  typesLinkLabel: string;
  processEyebrow: string;
  processTitle: string;
  processSteps: Pair[];
  areaEyebrow: string;
  areaTitle: string;
  areaParagraphs: string[];
  offices: Pair[];
  projectsEyebrow: string;
  projectsTitle: string;
  allProjects: string;
  relatedEyebrow: string;
  relatedTitle: string;
  formFamily?: never;
}

export interface CaseCopy {
  seo: { title: string; description: string };
  h1: string;
  cardTitle: string;
  city?: string;
  objectType: string;
  constructionType: string;
  shortDescription: string;
  categoryLabel: string;
  facts: Array<{ label: string; value: string }>;
  coverAlt: string;
  heroCaption?: string;
  galleryAlts: string[];
  galleryTitle: string;
  about?: { title: string; paragraphs: string[] };
  task?: { title: string; text: string };
  solution?: { title: string; paragraphs: string[] };
  tech?: { title: string; items: Array<{ label: string; value: string }>; note?: string };
  process?: { title: string; fact?: string; general?: { label: string; steps: Array<{ title: string; text: string }> } };
  result?: { title: string; text: string };
  benefits?: { title: string; note?: string; items: Array<{ title: string; text: string }> };
  /** Intl hub id of the related product page. */
  service: { hubId: string; title: string; text?: string };
  cta: { title: string; text: string; button: string };
  faqTitle: string;
  faq: Pair[];
  requestExample: string;
}

export interface CaseLabels {
  home: string; projects: string; breadcrumbs: string; photos: string; openPhoto: string; factsLabel: string;
  about: string; task: string; solution: string; tech: string; process: string; projectFact: string; result: string;
  benefits: string; gallery: string; generalTag: string; service: string;
  /** Lead-in of the line with the product pages of this case (e.g. "Auch"); only shown where they exist. */
  also?: string;
  faqIntro: string; relatedEyebrow: string; relatedTitle: string; back: string;
  lbLabel: string; close: string; prev: string; next: string; of: string; viewProject: string;
}

export interface ProjectsPageCopy {
  meta: { title: string; description: string };
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
  intro: string[];
  gridTitle: string;
  more: { title: string; text: string; button: string };
}

export interface RequestFormLabels {
  eyebrow: string; title: string; intro: string; example: string; name: string; namePh: string; phone: string;
  city: string; cityPh: string; need: string; needPh: string; consent: string; policy: string; consentAfter?: string; send: string;
}

export interface LegalCopy {
  title: string;
  description: string;
  updated: string;
  /** Trusted HTML written in this repository (headings, paragraphs, lists, links). */
  html: string;
}

export type ByLocale<T> = Record<IntlLocale, T>;

/** A child page of a hub (e.g. Ganzglaswand under Glastrennwände): rendered by IntlChildPage.astro. */
export interface ChildCopy {
  meta: { title: string; description: string };
  /** Short name for breadcrumbs, related links and the hub's list of detail pages. */
  name: string;
  /** Card on the parent hub: short title + one sentence. */
  card: Pair;
  eyebrow: string;
  h1: string;
  lead: string;
  heroAlt: string;
  intro: { title: string; paragraphs: string[]; spec: Pair[] };
  variants: { eyebrow: string; title: string; intro: string; items: Pair[] };
  benefits: { eyebrow: string; title: string; items: Pair[] };
  /** Austria block: market-specific wording of this page (what we offer to customers in Austria). */
  austria?: { title: string; paragraphs: string[] };
  faq: { title: string; intro: string; items: Pair[] };
  form: { title: string; text: string; optionsLabel: string; options: string[]; commentPlaceholder: string; product: string };
  /** Ids of related child pages (without the `child:` prefix), besides the parent hub. */
  related: string[];
}

export interface ChildLabels {
  variantsLink: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionIntro: string;
  readMore: string;
  relatedEyebrow: string;
  relatedTitle: string;
  parentLabel: string;
  austriaEyebrow: string;
  austriaCta: [string, string];
  contactCta: [string, string];
  /** Prefix of a link to a reference project in the related links (e.g. "Projekt"). */
  projectLabel: string;
}

/**
 * Markets (countries Space Glass serves) — the single source of truth for market-specific contacts,
 * offices, service area, schema and the market metadata sent with every lead form.
 *
 * MARKET ≠ LANGUAGE. A page has a language (uk, ru; later en, de, es) AND a market (UA, AT; later ES).
 * The language only picks the default market (`defaultMarketByLocale`); a page can pass its own market
 * to BaseLayout / Header / Footer (e.g. a future EN page for Austria = locale 'en' + market 'AT').
 *
 * Rules (owner's instructions, do not relax without confirmation):
 * - Only real, confirmed data. A field we do not have is `null` with a `NEEDS INPUT` note — never a guess.
 * - Austria has NO public office/showroom: no address, no office marker, no LocalBusiness node.
 *   It is presented as a service area (Vienna & Austria) of the same brand.
 * - Spain is `planned`: not rendered anywhere, not in schema, until the owner confirms the market.
 *   Launching it = fill its data + set `status: 'active'` (+ `defaultMarketByLocale.es` if wanted).
 */
import type { Locale } from '../i18n/helpers';

export type MarketCode = 'UA' | 'AT' | 'ES';
/** Languages a market text may exist in (all five site languages). */
export type MarketLanguage = Locale;
export type MarketText = { uk: string; ru: string } & Partial<Record<'en' | 'de' | 'es', string>>;

export interface MarketPhone {
  /** E.164, used for tel: links, wa.me and schema. */
  e164: string;
  /** As printed on the site. */
  display: string;
}

export interface MarketOffice {
  id: string;
  city: MarketText;
  street: MarketText;
  /** Google Maps query (route / open map buttons). */
  mapQuery: string;
  hours: string;
  /** City page of this office (unprefixed UA path). */
  page: string;
}

export interface Market {
  code: MarketCode;
  /** active = shown on the site; planned = architecture only, never rendered. */
  status: 'active' | 'planned';
  /** ISO 3166-1 alpha-2 — schema addressCountry / areaServed, intl-tel-input default country. */
  countryCode: string;
  /** Country name used in schema.org areaServed / address of the market's organization. */
  schemaCountry: string;
  /**
   * The business that serves this market, as its own schema.org Organization (src/seo/schema.ts).
   * UA and AT are separate legal structures under the common brand Space Glass (owner, 2026-10-20):
   * separate @id, no parent/sub relation (not confirmed), linked only through `brand`.
   * legalName only when confirmed by the owner; null = not published, the field is left out.
   */
  organization: { id: string; legalName: string | null; /** The part of the site that presents this business. */ url: string } | null;
  country: MarketText;
  /** Main city of the market (Vienna for Austria) — shown as the service-area city, not as an office. */
  primaryCity: MarketText | null;
  /** How the market is presented: offices (physical addresses) or a service area without an office. */
  presence: 'offices' | 'service-area';
  serviceArea: MarketText;
  offices: MarketOffice[];
  contact: {
    phone: MarketPhone | null;
    /** WhatsApp number (E.164). Only a number the owner confirmed works in WhatsApp. */
    whatsapp: string | null;
    email: string | null;
    telegram: string | null;
  };
  /**
   * Where missing contact channels come from. AT has no own phone/e-mail yet, so the company-wide
   * channels (UA) are used — they are real company contacts, not an invented Austrian number. Once an
   * Austrian phone/e-mail is filled in above it automatically replaces the fallback everywhere.
   */
  contactFallback: MarketCode | null;
  /** Languages the market's customers are served in (schema ContactPoint.availableLanguage). */
  languages: MarketLanguage[];
  /** Short UI label of the market card / contact block. */
  label: MarketText;
  /** One honest line about how the market is served (no office claims for service-area markets). */
  note: MarketText;
  /**
   * Future geo SEO modifiers per language for COMMERCIAL pages only (e.g. «Glastrennwände in Wien»).
   * Informational pages must not use them — see geoModifier().
   */
  seoGeo?: Partial<Record<MarketLanguage, { city: string; country: string }>>;
  /** Market landing pages that really exist (unprefixed paths). Empty = no links rendered (no 404s). */
  landingPages: Array<{ path: string; label: MarketText }>;
}

const COMPANY_PHONE: MarketPhone = { e164: '+380734251400', display: '+38 (073) 425 14 00' };
const COMPANY_EMAIL = 'info@space-glass.com.ua';
const COMPANY_TELEGRAM = 'https://t.me/spaceglass';
const OFFICE_HOURS = 'Пн–Пт: 09:00–19:00';

export const MARKETS: Record<MarketCode, Market> = {
  UA: {
    code: 'UA',
    status: 'active',
    countryCode: 'UA',
    schemaCountry: 'Ukraine',
    // The historical #organization node: offices, projects, articles and the founder's site refer to it.
    organization: { id: 'organization', legalName: null, url: '/' }, // NEEDS INPUT: legal name of the Ukrainian business (not published)
    country: { uk: 'Україна', ru: 'Украина', en: 'Ukraine', de: 'Ukraine', es: 'Ucrania' },
    primaryCity: null,
    presence: 'offices',
    serviceArea: { uk: 'Вся Україна', ru: 'Вся Украина', en: 'All of Ukraine', de: 'Ganze Ukraine', es: 'Toda Ucrania' },
    // Addresses confirmed by the owner (contacts page since 2026-10); order = tab order on /contacts/.
    offices: [
      { id: 'odesa', city: { uk: 'Одеса', ru: 'Одесса' }, street: { uk: 'вул. Глиняна, 5', ru: 'ул. Глиняная, 5' }, mapQuery: 'Одеса, вул. Глиняна, 5', hours: OFFICE_HOURS, page: '/city/odesa/' },
      { id: 'kyiv', city: { uk: 'Київ', ru: 'Киев' }, street: { uk: 'вул. Лауреатська, 8', ru: 'ул. Лауреатская, 8' }, mapQuery: 'Київ, вул. Лауреатська, 8', hours: OFFICE_HOURS, page: '/city/kyiv/' },
      { id: 'lviv', city: { uk: 'Львів', ru: 'Львов' }, street: { uk: 'вул. Кульпарківська, 144', ru: 'ул. Кульпарковская, 144' }, mapQuery: 'Львів, вул. Кульпарківська, 144', hours: OFFICE_HOURS, page: '/city/lviv/' }
    ],
    contact: { phone: COMPANY_PHONE, whatsapp: null, email: COMPANY_EMAIL, telegram: COMPANY_TELEGRAM },
    contactFallback: null,
    languages: ['uk', 'ru'],
    label: { uk: 'Україна', ru: 'Украина', en: 'Ukraine', de: 'Ukraine', es: 'Ucrania' },
    note: {
      uk: 'Офіси в Києві, Одесі та Львові. Проєкти по всій Україні.',
      ru: 'Офисы в Киеве, Одессе и Львове. Проекты по всей Украине.',
      en: 'Offices in Kyiv, Odesa and Lviv. Projects across Ukraine.',
      de: 'Büros in Kyjiw, Odesa und Lwiw. Projekte in der ganzen Ukraine.',
      es: 'Oficinas en Kiev, Odesa y Leópolis. Proyectos en toda Ucrania.'
    },
    landingPages: []
  },
  AT: {
    code: 'AT',
    status: 'active',
    countryCode: 'AT',
    schemaCountry: 'Austria',
    // Confirmed by the owner (2026-10-20): Space Glass KG, Austria. No Firmenbuch number, UID or address published.
    organization: { id: 'organization-at', legalName: 'Space Glass KG', url: '/de/' },
    country: { uk: 'Австрія', ru: 'Австрия', en: 'Austria', de: 'Österreich', es: 'Austria' },
    primaryCity: { uk: 'Відень', ru: 'Вена', en: 'Vienna', de: 'Wien', es: 'Viena' },
    presence: 'service-area',
    serviceArea: { uk: 'Відень та Австрія', ru: 'Вена и Австрия', en: 'Vienna & Austria', de: 'Wien & Österreich', es: 'Viena y Austria' },
    // No public office / showroom in Austria — do not add one without the owner's confirmation.
    offices: [],
    contact: {
      // Confirmed by the owner (2026-10-18): the Austrian line answers in German; the same number is on WhatsApp.
      phone: { e164: '+4367764336327', display: '+43 677 64336327' },
      whatsapp: '+4367764336327', // wa.me/4367764336327
      email: 'info@space-glass.com.ua', // same company mailbox
      telegram: null // not offered for Austria; the company Telegram is used via contactFallback
    },
    contactFallback: 'UA',
    languages: ['de'], // ContactPoint.availableLanguage: the Austrian line is German-speaking (confirmed by the owner)
    label: { uk: 'Австрія', ru: 'Австрия', en: 'Austria', de: 'Österreich', es: 'Austria' },
    note: {
      uk: 'Для об’єктів в Австрії надішліть фото, розміри або креслення — підготуємо попередній розрахунок.',
      ru: 'Для объектов в Австрии отправьте фото, размеры или чертёж — подготовим предварительный расчёт.',
      en: 'For projects in Austria, send photos, dimensions or drawings and we will prepare a preliminary quote.',
      de: 'Für Objekte in Österreich: Senden Sie Fotos, Maße oder Pläne – wir erstellen eine erste Kalkulation.',
      es: 'Para proyectos en Austria, envíe fotos, medidas o planos y prepararemos un presupuesto orientativo.'
    },
    seoGeo: { de: { city: 'Wien', country: 'Österreich' }, en: { city: 'Vienna', country: 'Austria' } },
    landingPages: []
  },
  ES: {
    code: 'ES',
    // Not a confirmed market: never rendered, no schema, no claims (no cities, no "Space Glass Spain").
    status: 'planned',
    countryCode: 'ES',
    schemaCountry: 'Spain',
    organization: null,
    country: { uk: 'Іспанія', ru: 'Испания', en: 'Spain', de: 'Spanien', es: 'España' },
    primaryCity: null,
    presence: 'service-area',
    serviceArea: { uk: '', ru: '' },
    offices: [],
    contact: { phone: null, whatsapp: null, email: null, telegram: null },
    contactFallback: 'UA',
    languages: [],
    label: { uk: 'Іспанія', ru: 'Испания', en: 'Spain', es: 'España' },
    note: { uk: '', ru: '' },
    landingPages: []
  }
};

/** Market order on the site (cards, schema areaServed). */
const MARKET_ORDER: MarketCode[] = ['UA', 'AT', 'ES'];

/**
 * Default market of a page by its language. A page can override it (BaseLayout `market`).
 * de → AT: the German pages are written for Austria (Wien & Österreich). en and es keep the company-wide
 * UA contacts/schema they have today (EN pages carry no Austria claim; Spain is planned, not active).
 * Moving en to AT later = change one value here.
 * NOT related to the phone-input country of the forms: that is chosen by page LANGUAGE in
 * public/js/forms.js (uk/ru/en → +380, de → +43, es → +34) and must not be derived from the market.
 */
export const defaultMarketByLocale: Partial<Record<MarketLanguage, MarketCode>> = { uk: 'UA', ru: 'UA', en: 'UA', de: 'AT', es: 'UA' };
export const DEFAULT_MARKET: MarketCode = 'UA';

export const activeMarkets = (): Market[] => MARKET_ORDER.map((code) => MARKETS[code]).filter((market) => market.status === 'active');

/** Page market: explicit (if it is an active market) → language default → UA. */
export function resolveMarket(locale?: string, market?: string): Market {
  const explicit = market ? MARKETS[market.toUpperCase() as MarketCode] : undefined;
  if (explicit && explicit.status === 'active') return explicit;
  const byLocale = defaultMarketByLocale[locale as MarketLanguage];
  return MARKETS[byLocale && MARKETS[byLocale].status === 'active' ? byLocale : DEFAULT_MARKET];
}

/** Text in the page language; en/de/es fall back to en, then uk. */
export function marketText(text: MarketText | null | undefined, locale: string): string {
  if (!text) return '';
  return (text as Record<string, string | undefined>)[locale] ?? text.en ?? text.uk;
}

export interface ResolvedContacts {
  phone: MarketPhone | null;
  whatsapp: string | null;
  email: string | null;
  telegram: string | null;
  /** True when the phone is the company-wide (Ukrainian) number — printed in the site's existing per-language format. */
  phoneIsCompany: boolean;
  /** Which channels come from the fallback market (for honest labelling, e.g. "company phone"). */
  fallback: Array<'phone' | 'email' | 'telegram'>;
}

/** Contact channels of a market with the fallback applied (WhatsApp never falls back: it is market-specific). */
export function marketContacts(market: Market): ResolvedContacts {
  const base = market.contactFallback ? MARKETS[market.contactFallback].contact : null;
  const fallback: ResolvedContacts['fallback'] = [];
  const pick = <K extends 'phone' | 'email' | 'telegram'>(key: K) => {
    if (market.contact[key]) return market.contact[key];
    if (base?.[key]) { fallback.push(key); return base[key]; }
    return null;
  };
  const phone = pick('phone');
  return { phone, email: pick('email'), telegram: pick('telegram'), whatsapp: market.contact.whatsapp, phoneIsCompany: phone === MARKETS.UA.contact.phone, fallback };
}

export const telHref = (phone: MarketPhone) => `tel:${phone.e164}`;
/** International WhatsApp link: wa.me takes the number without "+" or spaces. */
export const whatsappHref = (e164: string) => `https://wa.me/${e164.replace(/\D/g, '')}`;

/**
 * Geo modifier for a FUTURE commercial page title/H1 in a market language, e.g.
 * geoModifier('AT', 'de', 'commercial', 'city') → 'in Wien'. Informational pages get '' on purpose:
 * their H1 follows the informational intent, no city/country stuffing.
 */
export function geoModifier(code: MarketCode, locale: MarketLanguage, intent: 'commercial' | 'informational', scope: 'city' | 'country' = 'city'): string {
  if (intent !== 'commercial') return '';
  const geo = MARKETS[code].seoGeo?.[locale];
  if (!geo) return '';
  const place = scope === 'city' ? geo.city : geo.country;
  const preposition: Partial<Record<MarketLanguage, string>> = { de: 'in', en: 'in', es: 'en' };
  return preposition[locale] ? `${preposition[locale]} ${place}` : place;
}

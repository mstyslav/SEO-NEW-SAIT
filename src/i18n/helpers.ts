export const supportedLocales = ['uk', 'ru'] as const;
export type Locale = typeof supportedLocales[number];

export function normalizeLocale(locale?: string): Locale {
  return supportedLocales.includes(locale as Locale) ? (locale as Locale) : 'uk';
}

export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(uk|ru)(?=\/|$)/, '');
  return stripped || '/';
}

/**
 * Unprefixed (uk) paths that actually have a real, non-redirect page under
 * /ru/. This is the single source of truth for "does a localized
 * version of this route exist" — every localized link in the site (Header,
 * Footer, related links, CTAs, ...) must go through localizedPath()/lp()
 * instead of hand-building `/${locale}${path}`, so that adding or removing a
 * localized page only requires updating this list in one place.
 *
 * Keep in sync with src/pages/ru/**: a path belongs here only if the
 * matching page renders real localized content (not `Astro.redirect(...)`).
 */
const LOCALIZED_ROUTES: Record<'ru', ReadonlySet<string>> = {
  ru: new Set([
    '/',
    '/catalog/',
    '/contacts/',
    '/oplata-dostavka/',
    '/poslugy/',
    '/projects/',
    '/rishennya/',
    '/sklyani-perehorodky/ofisni/',
    '/bezramne-configurator/',
    '/dzerkala-configurator/',
    '/fasadne-configurator/',
    '/loft-configurator/',
    '/ogorozhi-configurator/',
    '/peregorodky-configurator/'
  ])
};

export function hasLocalizedRoute(pathname: string, locale: Locale): boolean {
  if (locale === 'uk') return true;
  return LOCALIZED_ROUTES[locale].has(stripLocale(pathname));
}

/**
 * Builds the link to use for `pathname` in `locale`. Returns the localized
 * (prefixed) URL only when that page actually exists; otherwise falls back
 * to the real, unprefixed (uk) page instead of producing a 404 — the same
 * content the user would have reached anyway, just not yet translated.
 */
export function localizedPath(pathname: string, locale: Locale): string {
  const base = stripLocale(pathname);
  if (locale === 'uk') return base;
  if (!LOCALIZED_ROUTES[locale].has(base)) return base;
  return `/${locale}${base === '/' ? '/' : base}`;
}

export function localeFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/(uk|ru)(?=\/|$)/);
  return match ? (match[1] as Locale) : 'uk';
}

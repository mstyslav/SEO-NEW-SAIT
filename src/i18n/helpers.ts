export const supportedLocales = ['uk', 'ru', 'en', 'de'] as const;
export type Locale = typeof supportedLocales[number];

export function normalizeLocale(locale?: string): Locale {
  return supportedLocales.includes(locale as Locale) ? (locale as Locale) : 'uk';
}

export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(uk|ru|en|de)(?=\/|$)/, '');
  return stripped || '/';
}

export function localizedPath(pathname: string, locale: Locale): string {
  const base = stripLocale(pathname);
  return `/${locale}${base === '/' ? '/' : base}`;
}

export function localeFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/(uk|ru|en|de)(?=\/|$)/);
  return match ? (match[1] as Locale) : 'uk';
}

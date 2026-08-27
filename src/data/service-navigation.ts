import type { Locale } from '../i18n/helpers';

export interface ServiceNavigationItem {
  label: string;
  href: string;
}

/**
 * Головні комерційні напрямки душових конструкцій.
 * Цей список спільний для сторінки послуг і Footer, щоб назви,
 * кількість та посилання в обох блоках завжди збігалися.
 *
 * `label` тримає uk/ru разом (одне джерело на href), щоб не заводити
 * окремий RU-масив, який довелося б тримати синхронним вручну.
 */
const showerServiceNavigationItems: Array<{ href: string; label: Record<Locale, string> }> = [
  { href: '/catalog/dushovi-piddony/', label: { uk: 'Душові піддони', ru: 'Душевые поддоны' } },
  { href: '/dushovi-kabiny/kutovi/', label: { uk: 'Кутова душова', ru: 'Угловая душевая кабина' } },
  { href: '/dushovi-kabiny/dushovi-dveri/', label: { uk: 'Двері для душу', ru: 'Двери для душа' } },
  { href: '/poslugy/dushovi-konstruktsii/perehorodka-dlia-dushu/', label: { uk: 'Перегородка для душу', ru: 'Перегородка для душа' } },
  { href: '/dushovi-kabiny/shtorky-dlia-vanny/', label: { uk: 'Скляна шторка на ванну', ru: 'Стеклянная шторка для ванны' } }
];

export function getShowerServiceNavigation(locale: Locale = 'uk'): ServiceNavigationItem[] {
  return showerServiceNavigationItems.map(({ href, label }) => ({ href, label: label[locale] ?? label.uk }));
}

// Backward-compatible uk-only export for any caller that hasn't moved to
// getShowerServiceNavigation(locale) yet.
export const showerServiceNavigation: ServiceNavigationItem[] = getShowerServiceNavigation('uk');

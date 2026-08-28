import type { Locale } from '../i18n/helpers';

export interface ServiceNavigationItem {
  label: string;
  href: string;
}

/**
 * Final shower architecture: one MASTER + eight commercial child directions.
 * UK labels are SEO-facing. RU labels remain display-only until full RU child
 * parity is implemented; URLs intentionally stay on the current UK routes.
 */
const showerServiceNavigationItems: Array<{ href: string; label: Record<Locale, string> }> = [
  { href: '/dushovi-kabiny/peregorodka-dlya-dusha/', label: { uk: 'Скляні перегородки для душу', ru: 'Стеклянные перегородки для душа' } },
  { href: '/dushovi-kabiny/dushovi-dveri/', label: { uk: 'Скляні душові двері', ru: 'Стеклянные двери для душа' } },
  { href: '/dushovi-kabiny/kutovi/', label: { uk: 'Скляні кутові душові кабіни', ru: 'Стеклянные угловые душевые кабины' } },
  { href: '/dushovi-kabiny/rozsuvni/', label: { uk: 'Розсувні душові кабіни', ru: 'Раздвижные душевые кабины' } },
  { href: '/dushovi-kabiny/u-nishu/', label: { uk: 'Душові кабіни в нішу', ru: 'Душевые кабины в нишу' } },
  { href: '/dushovi-kabiny/skladni/', label: { uk: 'Двері гармошка у ванну кімнату', ru: 'Двери гармошка в ванную комнату' } },
  { href: '/dushovi-kabiny/dushovi-piddony/', label: { uk: 'Душові піддони', ru: 'Душевые поддоны' } },
  { href: '/dushovi-kabiny/shtorky-dlya-vannoyi/', label: { uk: 'Скляні шторки на ванну', ru: 'Стеклянные шторки для ванны' } }
];

export function getShowerServiceNavigation(locale: Locale = 'uk'): ServiceNavigationItem[] {
  return showerServiceNavigationItems.map(({ href, label }) => ({ href, label: label[locale] ?? label.uk }));
}

export const showerServiceNavigation: ServiceNavigationItem[] = getShowerServiceNavigation('uk');

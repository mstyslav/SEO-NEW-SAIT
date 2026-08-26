// Single shared uk/ru source for the standard TrustBar strip (used by
// HomePage, RishennyaPage, and any other page that renders <TrustBar>).
// Keeping it here — instead of inside each page's own content file —
// avoids re-declaring the same 4 translations once per caller.
import type { Locale } from './helpers';

export type TrustBarItem = [title: string, text: string, icon: string];

export const trustBarItems: Record<Locale, TrustBarItem[]> = {
  uk: [
    ['Власне виробництво', 'В Україні', '◇'],
    ['Гарантія 2 роки', 'На всі конструкції', '◉'],
    ['Доставка по Україні', 'Та Європі', '▱'],
    ['Індивідуальні рішення', 'Під ваш проєкт', '◯']
  ],
  ru: [
    ['Собственное производство', 'В Украине', '◇'],
    ['Гарантия 2 года', 'На все конструкции', '◉'],
    ['Доставка по Украине', 'И Европе', '▱'],
    ['Индивидуальные решения', 'Под ваш проект', '◯']
  ]
};

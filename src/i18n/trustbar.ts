// Single shared uk/ru source for the standard TrustBar strip (used by
// HomePage, RishennyaPage, and any other page that renders <TrustBar>).
// Keeping it here — instead of inside each page's own content file —
// avoids re-declaring the same 4 translations once per caller.
import type { Locale } from './helpers';

export type TrustBarItem = [title: string, text: string, icon: string];

export const trustBarItems: Record<Locale, TrustBarItem[]> = {
  uk: [
    ['Власне виробництво', 'В Україні', 'factory'],
    ['Гарантія 2 роки', 'На всі конструкції', 'shield-check'],
    ['Доставка по Україні', 'Та Європі', 'truck'],
    ['Індивідуальні рішення', 'Під ваш проєкт', 'custom-design']
  ],
  ru: [
    ['Собственное производство', 'В Украине', 'factory'],
    ['Гарантия 2 года', 'На все конструкции', 'shield-check'],
    ['Доставка по Украине', 'И Европе', 'truck'],
    ['Индивидуальные решения', 'Под ваш проект', 'custom-design']
  ]
};

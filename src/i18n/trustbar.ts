// Single shared uk/ru source for the standard TrustBar strip (used by
// HomePage, RishennyaPage, and any other page that renders <TrustBar>).
// Keeping it here — instead of inside each page's own content file —
// avoids re-declaring the same 4 translations once per caller.
import type { Locale } from './helpers';

export type TrustBarItem = [title: string, text: string, icon: string];

export const trustBarItems: Record<Locale, TrustBarItem[]> = {
  uk: [
    ['Власне виробництво', 'В Україні', 'factory'],
    ['Гарантія: скло — 5 років', 'Фурнітура — 2 роки · монтаж — 1 рік', 'shield-check'],
    ['Доставка по Україні', 'Та Європі', 'truck'],
    ['Індивідуальні рішення', 'Під ваш проєкт', 'custom-design']
  ],
  ru: [
    ['Собственное производство', 'В Украине', 'factory'],
    ['Гарантия: стекло — 5 лет', 'Фурнитура — 2 года · монтаж — 1 год', 'shield-check'],
    ['Доставка по Украине', 'И Европе', 'truck'],
    ['Индивидуальные решения', 'Под ваш проект', 'custom-design']
  ],
  en: [
    ['In-house production', 'In Ukraine', 'factory'],
    ['Warranty: glass — 5 years', 'Hardware — 2 years · installation — 1 year', 'shield-check'],
    ['Delivery in Ukraine', 'And to Europe', 'truck'],
    ['Made to measure', 'For your project', 'custom-design']
  ],
  de: [
    ['Glas- und Aluminiumsysteme', 'Für Wohnen und Gewerbe', 'factory'],
    ['Garantie: Glas — 5 Jahre', 'Beschläge — 2 Jahre · Montage — 1 Jahr', 'shield-check'],
    ['Lieferung und Montage', 'Projektbezogen abgestimmt', 'truck'],
    ['Maßanfertigung', 'Für Ihr Projekt', 'custom-design']
  ],
  es: [
    ['Fabricación propia', 'En Ucrania', 'factory'],
    ['Garantía: vidrio — 5 años', 'Herrajes — 2 años · instalación — 1 año', 'shield-check'],
    ['Envíos en Ucrania', 'Y a Europa', 'truck'],
    ['Fabricación a medida', 'Para su proyecto', 'custom-design']
  ]
};

// Child page texts (hub detail pages) by locale and page id. Only German exists so far (batch 1).
import type { IntlLocale } from '../../../i18n/intl-routes';
import type { ChildCopy, ChildLabels } from './types';
import { childrenDe1 } from './children-de-1';
import { childrenDe2 } from './children-de-2';
import { childrenDe3 } from './children-de-3';
import { childrenDe4 } from './children-de-4';
import { childrenDe5 } from './children-de-5';
import { childrenDe6 } from './children-de-6';
import { childrenDe7 } from './children-de-7';

const empty: Record<string, ChildCopy> = {};

export const childCopy: Record<IntlLocale, Record<string, ChildCopy>> = {
  en: empty,
  de: { ...childrenDe1, ...childrenDe2, ...childrenDe3, ...childrenDe4, ...childrenDe5, ...childrenDe6, ...childrenDe7 },
  es: empty
};

const labelsDe: ChildLabels = {
  variantsLink: 'Ausführungen ansehen',
  sectionEyebrow: 'Im Detail',
  sectionTitle: '{name}: Ausführungen im Überblick',
  sectionIntro: 'Zu diesen Varianten finden Sie eigene Seiten mit Systemen, Glas und technischen Eckdaten.',
  readMore: 'Mehr erfahren',
  relatedEyebrow: 'Weiterlesen',
  relatedTitle: 'Passende Lösungen',
  parentLabel: 'Übersicht',
  austriaEyebrow: 'Anfrage aus Österreich',
  austriaCta: ['Anfrage senden', 'Fotos, Maße oder Grundriss'],
  contactCta: ['Kontakt und Büros', 'Telefon, E-Mail, Standorte']
};
// EN/ES have no child pages yet; the labels are only read when a locale has them.
export const childLabels: Record<IntlLocale, ChildLabels> = { en: labelsDe, de: labelsDe, es: labelsDe };

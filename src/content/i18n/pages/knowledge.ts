// Locale-keyed chrome copy for the /knowledge/ hub (uk, unprefixed) and
// /ru/knowledge/. Both URLs are rendered by the single template at
// src/components/pages/KnowledgePage.astro.
//
// IMPORTANT SCOPE NOTE: only the hub's own chrome (hero, filters, card
// labels, empty state, CTA) is translated here. The 80 articles in
// src/data/knowledge-articles.ts (title, description, category, body) are
// UK-only content — translating them was explicitly out of scope for this
// pass. The ru hub therefore lists the same UK-language article catalog
// (real, existing /knowledge/<slug>/ URLs — never fake ru ones), just with
// a fully localized hub shell around it.
import type { Locale } from '../../../i18n/helpers';

export interface KnowledgeContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: string; lead: string; imageAlt: string };
  filtersAriaLabel: string;
  allFilterLabel: string;
  countLabel: (value: number) => string;
  libraryTitle: string;
  readingTimeUnit: string;
  cardLinkLabel: string;
  emptyMessage: string;
  cta: { eyebrow: string; title: string; text: string; buttonLabel: string };
}

export const knowledgeContent: Record<Locale, KnowledgeContent> = {
  uk: {
    meta: {
      title: 'База знань про скляні конструкції | Space Glass',
      description:
        'Практичні матеріали Space Glass про вибір скла, душових, перегородок, дверей, дзеркал, огорож, замір, монтаж, вартість і догляд.'
    },
    hero: {
      eyebrow: 'Практичні поради Space Glass',
      h1: 'База знань про скляні конструкції',
      lead: 'Допомагаємо розібратися у матеріалах, конструкціях, замірі, монтажі та догляді до замовлення.',
      imageAlt: 'Матеріали Space Glass про скло, конструкції, креслення та вибір технічних рішень'
    },
    filtersAriaLabel: 'Фільтр матеріалів',
    allFilterLabel: 'Усі матеріали',
    countLabel: (value: number) => {
      const mod10 = value % 10;
      const mod100 = value % 100;
      if (mod10 === 1 && mod100 !== 11) return `${value} експертний матеріал`;
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${value} експертні матеріали`;
      return `${value} експертних матеріалів`;
    },
    libraryTitle: 'Від вибору до експлуатації',
    readingTimeUnit: 'хв',
    cardLinkLabel: 'Читати матеріал →',
    emptyMessage: 'За цим запитом матеріалів не знайдено. Спробуйте коротше формулювання.',
    cta: {
      eyebrow: 'Потрібна порада для вашого об’єкта?',
      title: 'Покажіть фото або креслення',
      text: 'Менеджер уточнить завдання і підкаже, які дані потрібні для попереднього розрахунку.',
      buttonLabel: 'Поставити запитання'
    }
  },
  ru: {
    meta: {
      title: 'База знаний о стеклянных конструкциях | Space Glass',
      description:
        'Практические материалы Space Glass о выборе стекла, душевых, перегородок, дверей, зеркал, ограждений, замере, монтаже, стоимости и уходе.'
    },
    hero: {
      eyebrow: 'Практические советы Space Glass',
      h1: 'База знаний о стеклянных конструкциях',
      lead: 'Помогаем разобраться в материалах, конструкциях, замере, монтаже и уходе до заказа.',
      imageAlt: 'Материалы Space Glass о стекле, конструкциях, чертежах и выборе технических решений'
    },
    filtersAriaLabel: 'Фильтр материалов',
    allFilterLabel: 'Все материалы',
    countLabel: (value: number) => {
      const mod10 = value % 10;
      const mod100 = value % 100;
      if (mod10 === 1 && mod100 !== 11) return `${value} экспертный материал`;
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${value} экспертных материала`;
      return `${value} экспертных материалов`;
    },
    libraryTitle: 'От выбора до эксплуатации',
    readingTimeUnit: 'мин',
    cardLinkLabel: 'Читать материал →',
    emptyMessage: 'По этому запросу материалов не найдено. Попробуйте короче сформулировать.',
    cta: {
      eyebrow: 'Нужен совет по вашему объекту?',
      title: 'Покажите фото или чертёж',
      text: 'Менеджер уточнит задачу и подскажет, какие данные нужны для предварительного расчёта.',
      buttonLabel: 'Задать вопрос'
    }
  }
};

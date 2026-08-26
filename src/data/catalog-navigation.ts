import { seoCategories } from './seo-services';
import { getShowerServiceNavigation } from './service-navigation';
import type { Locale } from '../i18n/helpers';

export interface CatalogNavigationCategory {
  slug: string;
  name: string;
  href: string;
  services: Array<{ shortName: string; path: string }>;
}

// uk names/shortNames come straight from src/data/seo-services.ts (the
// single source of truth for those SEO landing pages) and from the two
// "featured" categories defined below — neither is duplicated here.
//
// ru is a display-only overlay: seo-services.ts stays uk-only (it also
// powers the full /poslugy/.../ SEO pages, which have no /ru/ route yet —
// translating that whole content set is a separate, much larger task).
// This overlay only swaps the short label shown in the Header menus; the
// underlying slug/path/href — the URL source of truth — never changes.
const categoryNameRu: Record<string, string> = {
  'dushovi-konstruktsii': 'Душевые конструкции',
  'sklyani-perehorodky': 'Стеклянные перегородки',
  'sklyani-dveri': 'Стеклянные двери',
  'sklyani-ohorozhi': 'Стеклянные ограждения',
  dzerkala: 'Зеркала',
  'sklyani-fasady': 'Стеклянные фасады',
  'bezramne-sklinnya': 'Безрамное остекление',
  'sklo-dlia-biznesu': 'Стекло для бизнеса',
  'alyuminiievi-konstruktsii': 'Алюминиевые конструкции',
  'metaloplastykovi-konstruktsii': 'Металлопластиковые конструкции'
};

// Keyed by the service's own path (stable and unique) rather than by
// uk shortName text, so a future uk wording tweak can't silently break ru.
const serviceShortNameRu: Record<string, string> = {
  '/poslugy/sklyani-perehorodky/ofisni-sklyani-perehorodky/': 'Офисные перегородки',
  '/poslugy/sklyani-perehorodky/mizhkimnatni-sklyani-perehorodky/': 'Межкомнатные перегородки',
  '/poslugy/sklyani-perehorodky/rozsuvni-sklyani-perehorodky/': 'Раздвижные перегородки',
  '/poslugy/sklyani-perehorodky/sklyani-perehorodky-loft/': 'Перегородки Loft',
  '/poslugy/sklyani-perehorodky/bezramni-sklyani-perehorodky/': 'Безрамные перегородки',
  '/poslugy/sklyani-perehorodky/stacionarni-sklyani-perehorodky/': 'Стационарные перегородки',
  '/poslugy/sklyani-perehorodky/mobilni-sklyani-perehorodky/': 'Мобильные перегородки',
  '/poslugy/sklyani-perehorodky/akustychni-sklyani-perehorodky/': 'Акустические перегородки',
  '/poslugy/sklyani-perehorodky/perehorodky-dlia-restoranu/': 'Перегородки для ресторана',

  '/poslugy/sklyani-dveri/rozpashni-sklyani-dveri/': 'Распашные двери',
  '/poslugy/sklyani-dveri/rozsuvni-sklyani-dveri/': 'Раздвижные двери',
  '/poslugy/sklyani-dveri/mayatnykovi-sklyani-dveri/': 'Маятниковые двери',
  '/poslugy/sklyani-dveri/dveri-v-aliuminiievomu-profili/': 'Двери в профиле',
  '/poslugy/sklyani-dveri/matovi-sklyani-dveri/': 'Матовые двери',
  '/poslugy/sklyani-dveri/sklyani-dveri-dlia-ofisu/': 'Офисные двери',

  '/poslugy/sklyani-ohorozhi/sklyani-peryla-dlia-skhodiv/': 'Перила для лестниц',
  '/poslugy/sklyani-ohorozhi/bezramni-sklyani-ohorozhi/': 'Безрамные ограждения',
  '/poslugy/sklyani-ohorozhi/sklyani-ohorozhi-balkoniv/': 'Ограждения балконов',
  '/poslugy/sklyani-ohorozhi/sklyani-ohorozhi-teras/': 'Ограждения террас',
  '/poslugy/sklyani-ohorozhi/sklyani-ohorozhi-na-stiykakh/': 'Ограждения на стойках',
  '/poslugy/sklyani-ohorozhi/sklyani-poruchni/': 'Ограждения с поручнем',

  '/poslugy/dzerkala/dzerkalo-za-rozmirom/': 'Зеркало по размеру',
  '/poslugy/dzerkala/dzerkalo-z-pidsvitkoyu/': 'Зеркало с подсветкой',
  '/poslugy/dzerkala/dzerkalo-u-vannu/': 'Зеркало в ванную',
  '/poslugy/dzerkala/dzerkalna-stina/': 'Зеркальная стена',
  '/poslugy/dzerkala/dzerkalo-v-rami/': 'Зеркало в раме',
  '/poslugy/dzerkala/dzerkalo-dlia-sportzalu/': 'Зеркала для спортзала',

  '/poslugy/sklyani-fasady/sklyani-fasady-budynkiv/': 'Фасады домов',
  '/poslugy/sklyani-fasady/stiykovo-ryhelne-sklinnya/': 'Стоечно-ригельное остекление',
  '/poslugy/sklyani-fasady/strukturne-sklinnya-fasadu/': 'Структурное остекление',
  '/poslugy/sklyani-fasady/vitrinne-sklinnya/': 'Витринное остекление',
  '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/': 'Входные группы',

  '/poslugy/bezramne-sklinnya/bezramne-sklinnya-terasy/': 'Остекление террасы',
  '/poslugy/bezramne-sklinnya/bezramne-sklinnya-balkona/': 'Остекление балкона',
  '/poslugy/bezramne-sklinnya/bezramne-sklinnya-altanky/': 'Остекление беседки',
  '/poslugy/bezramne-sklinnya/panoramne-sklinnya/': 'Панорамное остекление',
  '/poslugy/bezramne-sklinnya/sklyani-rozsuvni-systemy/': 'Раздвижные системы',

  '/poslugy/sklo-dlia-biznesu/sklyani-vitriny-dlia-mahazynu/': 'Витрины для магазина',
  '/poslugy/sklo-dlia-biznesu/sklyani-kozyrky/': 'Стеклянные козырьки',
  '/poslugy/sklo-dlia-biznesu/sklyani-stilnytsi/': 'Стеклянные столешницы',
  '/poslugy/sklo-dlia-biznesu/sklyani-politsi/': 'Стеклянные полки',
  '/poslugy/sklo-dlia-biznesu/sklyani-doshky-dlia-ofisu/': 'Стеклянные маркерные доски'
};

const featuredCategories: Record<Locale, CatalogNavigationCategory[]> = {
  uk: [
    { slug: 'alyuminiievi-konstruktsii', name: 'Алюмінієві конструкції', href: '/alyuminiievi-konstruktsii/', services: ['Алюмінієві вікна', 'Алюмінієві двері', 'Розсувні системи', 'Алюмінієві фасади', 'Зимові сади', 'Перголи'].map(shortName => ({ shortName, path: '/alyuminiievi-konstruktsii/' })) },
    { slug: 'metaloplastykovi-konstruktsii', name: 'Металопластикові конструкції', href: '/metaloplastykovi-konstruktsii/', services: ['Металопластикові вікна', 'Металопластикові двері', 'Балконні блоки', 'Розсувні ПВХ-системи'].map(shortName => ({ shortName, path: '/metaloplastykovi-konstruktsii/' })) }
  ],
  ru: [
    { slug: 'alyuminiievi-konstruktsii', name: 'Алюминиевые конструкции', href: '/alyuminiievi-konstruktsii/', services: ['Алюминиевые окна', 'Алюминиевые двери', 'Раздвижные системы', 'Алюминиевые фасады', 'Зимние сады', 'Перголы'].map(shortName => ({ shortName, path: '/alyuminiievi-konstruktsii/' })) },
    { slug: 'metaloplastykovi-konstruktsii', name: 'Металлопластиковые конструкции', href: '/metaloplastykovi-konstruktsii/', services: ['Металлопластиковые окна', 'Металлопластиковые двери', 'Балконные блоки', 'Раздвижные ПВХ-системы'].map(shortName => ({ shortName, path: '/metaloplastykovi-konstruktsii/' })) }
  ]
};

const categoryOrder = ['dushovi-konstruktsii', 'dzerkala', 'sklyani-perehorodky', 'sklyani-dveri', 'sklyani-ohorozhi', 'bezramne-sklinnya', 'alyuminiievi-konstruktsii', 'sklyani-fasady', 'metaloplastykovi-konstruktsii', 'sklo-dlia-biznesu'];

function buildServiceCategories(locale: Locale): CatalogNavigationCategory[] {
  return seoCategories.map((category) => {
    const name = locale === 'uk' ? category.name : (categoryNameRu[category.slug] ?? category.name);
    if (category.slug === 'dushovi-konstruktsii') {
      return { slug: category.slug, name, href: '/dushovi-kabiny/', services: getShowerServiceNavigation(locale).map(({ label, href }) => ({ shortName: label, path: href })) };
    }
    return {
      slug: category.slug,
      name,
      href: `/poslugy/${category.slug}/`,
      services: category.services.map((service) => ({
        shortName: locale === 'uk' ? service.shortName : (serviceShortNameRu[service.path] ?? service.shortName),
        path: service.path
      }))
    };
  });
}

export function getCatalogNavigation(locale: Locale = 'uk'): CatalogNavigationCategory[] {
  const serviceCategories = buildServiceCategories(locale);
  const featured = featuredCategories[locale] ?? featuredCategories.uk;
  return categoryOrder.map((slug) => {
    const category = [...serviceCategories, ...featured].find(item => item.slug === slug);
    if (!category) throw new Error(`Catalog navigation is missing category: ${slug}`);
    return category;
  });
}

// Backward-compatible uk-only export for any caller that hasn't moved to
// getCatalogNavigation(locale) yet.
export const catalogNavigation = getCatalogNavigation('uk');

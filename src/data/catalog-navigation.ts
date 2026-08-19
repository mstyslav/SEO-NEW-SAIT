import { seoCategories } from './seo-services';
import { showerServiceNavigation } from './service-navigation';

export interface CatalogNavigationCategory {
  slug: string;
  name: string;
  href: string;
  services: Array<{ shortName: string; path: string }>;
}

const featuredCategories: CatalogNavigationCategory[] = [
  { slug: 'alyuminiievi-konstruktsii', name: 'Алюмінієві конструкції', href: '/alyuminiievi-konstruktsii/', services: ['Алюмінієві вікна', 'Алюмінієві двері', 'Розсувні системи', 'Алюмінієві фасади', 'Зимові сади', 'Перголи'].map(shortName => ({ shortName, path: '/alyuminiievi-konstruktsii/' })) },
  { slug: 'metaloplastykovi-konstruktsii', name: 'Металопластикові конструкції', href: '/metaloplastykovi-konstruktsii/', services: ['Металопластикові вікна', 'Металопластикові двері', 'Балконні блоки', 'Розсувні ПВХ-системи'].map(shortName => ({ shortName, path: '/metaloplastykovi-konstruktsii/' })) }
];

const categoryOrder = ['dushovi-konstruktsii', 'dzerkala', 'sklyani-perehorodky', 'sklyani-dveri', 'sklyani-ohorozhi', 'bezramne-sklinnya', 'alyuminiievi-konstruktsii', 'sklyani-fasady', 'metaloplastykovi-konstruktsii', 'sklo-dlia-biznesu'];
const serviceCategories: CatalogNavigationCategory[] = seoCategories.map(category => category.slug === 'dushovi-konstruktsii'
  ? { ...category, href: '/dushovi-kabiny/', services: showerServiceNavigation.map(({ label, href }) => ({ shortName: label, path: href })) }
  : { ...category, href: `/poslugy/${category.slug}/` });

export const catalogNavigation = categoryOrder.map((slug) => {
  const category = [...serviceCategories, ...featuredCategories].find(item => item.slug === slug);
  if (!category) throw new Error(`Catalog navigation is missing category: ${slug}`);
  return category;
});

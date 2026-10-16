// Product navigation of the EN/DE/ES pages (header mega menu, mobile menu, footer, About directions).
// Hrefs are the UA paths of the translated hub pages; localizedPath() turns them into the
// localized URLs from src/i18n/intl-routes.ts.
import type { IntlLocale } from '../../../i18n/intl-routes';

export interface IntlNavItem { id: string; href: string; name: string; note: string }

const HUBS: Array<{ id: string; href: string }> = [
  { id: 'showers', href: '/dushovi-kabiny/' },
  { id: 'mirrors', href: '/dzerkala/' },
  { id: 'partitions', href: '/sklyani-perehorodky/' },
  { id: 'doors', href: '/sklyani-dveri/' },
  { id: 'railings', href: '/sklyani-ohorozhi/' },
  { id: 'canopies', href: '/sklyani-kozyrky/' },
  { id: 'frameless', href: '/bezramne-sklinnya/' },
  { id: 'aluminium', href: '/alyuminiyevi-konstrukcziyi/' },
  { id: 'facades', href: '/poslugy/sklyani-fasady/' },
  { id: 'wintergardens', href: '/alyuminiyevi-konstrukcziyi/zymovi-sady/' },
  { id: 'business', href: '/dlya-biznesu/' }
];

const NAMES: Record<IntlLocale, Record<string, [name: string, note: string]>> = {
  en: {
    showers: ['Glass shower enclosures', 'Walk-in, corner, niche and sliding showers, bath screens'],
    mirrors: ['Custom mirrors', 'LED, framed and wall mirrors made to size'],
    partitions: ['Glass partitions', 'Loft, frameless, sliding and office partitions'],
    doors: ['Glass doors', 'Hinged, sliding, pivot and framed glass doors'],
    railings: ['Glass railings', 'Stairs, balconies, terraces and pools'],
    canopies: ['Glass canopies', 'Entrance canopies on brackets, rods or frames'],
    frameless: ['Frameless glazing', 'Sliding and folding glass for terraces and balconies'],
    aluminium: ['Aluminium windows and doors', 'Thermally broken windows, doors and sliding systems'],
    facades: ['Glass facades', 'Stick, structural and shopfront glazing'],
    wintergardens: ['Winter gardens', 'Glazed aluminium extensions and terraces'],
    business: ['Commercial glazing', 'Hotels, restaurants, offices, shops and clinics']
  },
  de: {
    showers: ['Glasduschen', 'Walk-in, Eck-, Nischen- und Schiebeduschen, Badewannenaufsätze'],
    mirrors: ['Spiegel nach Maß', 'LED-, Rahmen- und Wandspiegel in Sondermaßen'],
    partitions: ['Glastrennwände', 'Loft-, Ganzglas-, Schiebe- und Bürotrennwände'],
    doors: ['Glastüren', 'Dreh-, Schiebe-, Pendel- und Rahmentüren aus Glas'],
    railings: ['Glasgeländer', 'Treppen, Balkone, Terrassen und Pools'],
    canopies: ['Glasvordächer', 'Vordächer mit Punkthaltern, Zugstangen oder Rahmen'],
    frameless: ['Rahmenlose Verglasung', 'Schiebe- und Faltsysteme für Terrasse und Balkon'],
    aluminium: ['Aluminium-Fenster und -Türen', 'Wärmegedämmte Fenster, Türen und Schiebesysteme'],
    facades: ['Glasfassaden', 'Pfosten-Riegel-, Structural-Glazing- und Schaufensterverglasung'],
    wintergardens: ['Wintergärten', 'Verglaste Anbauten und Terrassen aus Aluminium'],
    business: ['Glaslösungen für Gewerbe', 'Hotels, Gastronomie, Büros, Handel und Praxen']
  },
  es: {
    showers: ['Mamparas de ducha', 'Walk-in, de esquina, en hornacina, correderas y de bañera'],
    mirrors: ['Espejos a medida', 'Espejos LED, con marco y de pared'],
    partitions: ['Tabiques de vidrio', 'Tabiques loft, sin perfiles, correderos y de oficina'],
    doors: ['Puertas de vidrio', 'Abatibles, correderas, pivotantes y con marco'],
    railings: ['Barandillas de vidrio', 'Escaleras, balcones, terrazas y piscinas'],
    canopies: ['Marquesinas de vidrio', 'Marquesinas con soportes, tirantes o marco'],
    frameless: ['Cortinas de cristal', 'Sistemas correderos y plegables para terrazas'],
    aluminium: ['Ventanas y puertas de aluminio', 'Ventanas, puertas y correderas con rotura de puente térmico'],
    facades: ['Fachadas de vidrio', 'Muro cortina, vidrio estructural y escaparates'],
    wintergardens: ['Jardines de invierno', 'Porches y terrazas acristaladas de aluminio'],
    business: ['Vidrio para empresas', 'Hoteles, restauración, oficinas, comercios y clínicas']
  }
};

export const intlNavItems = (locale: IntlLocale): IntlNavItem[] =>
  HUBS.map(({ id, href }) => ({ id, href, name: NAMES[locale][id][0], note: NAMES[locale][id][1] }));

/** Same shape as getCatalogNavigation() (no sub-items; the short note is shown instead). */
export const intlCatalogNavigation = (locale: IntlLocale) =>
  intlNavItems(locale).map(({ id, href, name, note }) => ({ slug: id, name, href, note, services: [] as Array<{ shortName: string; path: string }> }));

export const intlHubName = (locale: IntlLocale, id: string): string => NAMES[locale][id]?.[0] ?? id;

// Footer copy of the EN/DE/ES pages (same facts as the UA/RU footer: warranty, delivery, offices).
import type { IntlLocale } from '../../../i18n/intl-routes';

interface FooterText {
  categoriesTitle: string;
  servicesTitle: string;
  companyTitle: string;
  citiesTitle: string;
  contactsTitle: string;
  productsTitle: string;
  callSecondary: string;
  hours: string;
  citiesLine: string;
  brandDescription: string;
  copyright: string;
  benefits: [string, string][];
  quoteCta: [string, string];
}

export const intlFooterText: Record<IntlLocale, { text: FooterText; services: string[]; company: [string, string][]; cities: [string][] }> = {
  en: {
    text: {
      categoriesTitle: 'Products',
      servicesTitle: 'Services',
      companyTitle: 'Company',
      citiesTitle: 'Offices',
      contactsTitle: 'Contact',
      productsTitle: 'What we make',
      callSecondary: 'Request a call',
      hours: 'Mon–Fri: 09:00–19:00 (Kyiv time)',
      citiesLine: 'Kyiv · Lviv · Odesa',
      brandDescription: 'Premium glass structures for homes, businesses and architectural projects.',
      copyright: '© 2014–2026 Space Glass. All rights reserved.',
      benefits: [
        ['In-house production', 'Full quality control'],
        ['Warranty: glass — 5 years', 'Hardware — 2 years · installation — 1 year'],
        ['Delivery in Ukraine and Europe', 'Selected products and structures'],
        ['Made to measure', 'Designed for your project']
      ],
      quoteCta: ['Get a quote', 'Send us your plan or photos']
    },
    services: ['Design and engineering', 'Site survey', 'Manufacturing', 'Installation', 'Warranty and service'],
    company: [
      ['About us', '/about/'],
      ['Projects', '/project/'],
      ['Commercial glazing', '/dlya-biznesu/'],
      ['Contact', '/contacts/'],
      ['Privacy policy', '/privacy-policy/']
    ],
    cities: [['Kyiv'], ['Odesa'], ['Lviv'], ['All contacts']]
  },
  de: {
    text: {
      categoriesTitle: 'Produkte',
      servicesTitle: 'Leistungen',
      companyTitle: 'Unternehmen',
      citiesTitle: 'Standorte',
      contactsTitle: 'Kontakt',
      productsTitle: 'Unsere Produkte',
      callSecondary: 'Rückruf anfordern',
      hours: 'Mo–Fr: 09:00–19:00 (Kyjiwer Zeit)',
      citiesLine: 'Kyjiw · Lwiw · Odesa',
      brandDescription: 'Hochwertige Glaskonstruktionen für Wohnen, Gewerbe und Architekturprojekte.',
      copyright: '© 2014–2026 Space Glass. Alle Rechte vorbehalten.',
      benefits: [
        ['Eigene Fertigung', 'Volle Qualitätskontrolle'],
        ['Garantie: Glas — 5 Jahre', 'Beschläge — 2 Jahre · Montage — 1 Jahr'],
        ['Lieferung in der Ukraine und in Europa', 'Ausgewählte Produkte und Konstruktionen'],
        ['Maßanfertigung', 'Geplant für Ihr Projekt']
      ],
      quoteCta: ['Angebot anfragen', 'Grundriss oder Fotos senden']
    },
    services: ['Planung und Konstruktion', 'Aufmaß vor Ort', 'Fertigung', 'Montage', 'Garantie und Service'],
    company: [
      ['Über uns', '/about/'],
      ['Projekte', '/project/'],
      ['Glaslösungen für Gewerbe', '/dlya-biznesu/'],
      ['Kontakt', '/contacts/'],
      ['Datenschutz', '/privacy-policy/']
    ],
    cities: [['Kyjiw'], ['Odesa'], ['Lwiw'], ['Alle Kontakte']]
  },
  es: {
    text: {
      categoriesTitle: 'Productos',
      servicesTitle: 'Servicios',
      companyTitle: 'Empresa',
      citiesTitle: 'Oficinas',
      contactsTitle: 'Contacto',
      productsTitle: 'Nuestros productos',
      callSecondary: 'Solicitar una llamada',
      hours: 'Lun–Vie: 09:00–19:00 (hora de Kiev)',
      citiesLine: 'Kiev · Leópolis · Odesa',
      brandDescription: 'Estructuras de vidrio de alta gama para viviendas, empresas y proyectos de arquitectura.',
      copyright: '© 2014–2026 Space Glass. Todos los derechos reservados.',
      benefits: [
        ['Fabricación propia', 'Control total de la calidad'],
        ['Garantía: vidrio — 5 años', 'Herrajes — 2 años · instalación — 1 año'],
        ['Envíos en Ucrania y Europa', 'Productos y estructuras seleccionados'],
        ['Fabricación a medida', 'Diseñada para su proyecto']
      ],
      quoteCta: ['Pedir presupuesto', 'Envíenos su plano o fotos']
    },
    services: ['Diseño e ingeniería', 'Medición en obra', 'Fabricación', 'Instalación', 'Garantía y servicio'],
    company: [
      ['Sobre nosotros', '/about/'],
      ['Proyectos', '/project/'],
      ['Vidrio para empresas', '/dlya-biznesu/'],
      ['Contacto', '/contacts/'],
      ['Política de privacidad', '/privacy-policy/']
    ],
    cities: [['Kiev'], ['Odesa'], ['Leópolis'], ['Todos los contactos']]
  }
};

// Locale-independent parts of the EN/DE/ES hub pages: hero photo (the same photo as the UA hub),
// type icons (same line icons as the UA pages, in the order of the `types.items` of every locale),
// related hubs and project cases. The texts live in hubs-{en,de,es}.ts.
import { profileIcons } from '../../../data/profile-icons';

const iconWrap = (p: string) =>
  `<svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

// Same drawings as src/pages/dushovi-kabiny/index.astro and src/pages/dzerkala/index.astro.
const shower = {
  screen: iconWrap('<path d="M6 34h28"/><path d="M9 34V7"/><rect x="9" y="7" width="17" height="27"/>'),
  corner: iconWrap('<path d="M5 34h30"/><path d="M7 34V13l13-4v25"/><path d="M20 9l13 4v21"/><path d="M27 13v20"/><path d="M24.5 22h.01"/>'),
  niche: iconWrap('<path d="M6 6v30M34 6v30"/><path d="M6 34h28"/><rect x="12" y="9" width="16" height="25"/><path d="M20 9v25"/><path d="M17.5 21h.01"/>'),
  sliding: iconWrap('<path d="M5 9h30"/><path d="M6 34h28"/><rect x="8" y="11" width="15" height="23"/><rect x="18" y="11" width="15" height="23"/><path d="M25 22h4"/>'),
  door: iconWrap('<path d="M8 34h24"/><path d="M12 34V8h16v26"/><path d="M12 8v26"/><path d="M24.5 21h.01"/>'),
  fold: iconWrap('<path d="M5 34h30M7 8h26"/><path d="M9 10l7 24 7-24 8 24"/><circle cx="16" cy="34" r="1"/><circle cx="31" cy="34" r="1"/>'),
  bath: iconWrap('<path d="M5 22h30v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z"/><path d="M8 22v-4a3 3 0 0 1 3-3h2"/><rect x="20" y="7" width="12" height="15"/>'),
  pentagon: iconWrap('<path d="M8 34h24"/><path d="M8 34V15l7-7h10l7 7v19"/><path d="M15 8v26"/><path d="M25 8v26"/>')
};
const mirror = {
  led: iconWrap('<rect x="11" y="8" width="18" height="24"/><path d="M6 12v-4h4M34 12v-4h-4M6 28v4h4M34 28v4h-4"/>'),
  framed: iconWrap('<rect x="7" y="6" width="26" height="28"/><rect x="12" y="11" width="16" height="18"/>'),
  wall: iconWrap('<path d="M5 7h30v26H5z"/><path d="M15 7v26M25 7v26"/>'),
  panno: iconWrap('<path d="M6 6h12v12H6zM22 6h12v12H22zM6 22h12v12H6zM22 22h12v12H22z"/>'),
  gym: iconWrap('<rect x="4" y="7" width="32" height="24"/><path d="M4 35h32M10 31v4M30 31v4"/>'),
  salon: iconWrap('<rect x="12" y="7" width="16" height="26"/><path d="M8 12h.01M8 20h.01M8 28h.01M32 12h.01M32 20h.01M32 28h.01"/>')
};
// Business segments — simple line drawings in the same 40×40 style.
const business = {
  hotel: iconWrap('<path d="M7 34V8h26v26"/><path d="M4 34h32"/><path d="M12 13h4M24 13h4M12 19h4M24 19h4M12 25h4M24 25h4"/><path d="M17 34v-5h6v5"/>'),
  restaurant: iconWrap('<path d="M13 6v10a3 3 0 0 0 6 0V6M16 6v28"/><path d="M27 6c-3 2-4 6-4 10h4v18"/>'),
  office: iconWrap('<rect x="6" y="9" width="28" height="22"/><path d="M6 15h28M17 15v16M26 15v16"/><path d="M4 34h32"/>'),
  shop: iconWrap('<path d="M6 15 9 7h22l3 8"/><path d="M6 15h28v19H6z"/><path d="M11 34V21h8v13M23 21h7v7h-7z"/>'),
  salon: mirror.salon,
  clinic: iconWrap('<rect x="7" y="8" width="26" height="26"/><path d="M20 14v12M14 20h12"/>'),
  residential: iconWrap('<path d="M8 34V12l12-6 12 6v22"/><path d="M4 34h32"/><path d="M14 16h4M22 16h4M14 22h4M22 22h4M17 34v-6h6v6"/>'),
  resort: iconWrap('<path d="M6 34h28"/><path d="M10 34V20l10-8 10 8v14"/><path d="M20 4v4M8 10l2 2M32 10l-2 2"/><path d="M16 34v-7h8v7"/>')
};
const wintergarden = {
  heated: profileIcons['alu/zymovi-sady'],
  seasonal: profileIcons['frameless/sklinnya-teras-ta-altanok'],
  roof: iconWrap('<path d="M5 18 20 8l15 10"/><path d="M8 16v18h24V16"/><path d="M14 12v22M26 12v22"/><path d="M8 25h24"/>'),
  doors: profileIcons['alu/rozsuvni-dveri'],
  pergola: profileIcons['alu/perholy']
};

export interface HubVisual {
  hero: { src: string; srcset: string; sizes: string; width: number; height: number; image: string; mobile?: { srcset: string; width: number; height: number } };
  /** Icon of each item of `types.items`, same order in every locale. */
  icons: string[];
  /** Hub ids shown as "related" links. */
  related: string[];
  /** Project case ids (src/i18n/intl-routes.ts → INTL_CASES) shown on the page. */
  cases: string[];
  /** Parent hub id for the breadcrumb trail (UA structure), if any. */
  parent?: string;
  /** Types link to other hubs (services hub): hub id per item. */
  typeLinks?: string[];
  schemaType?: 'CollectionPage' | 'WebPage';
  /** ProfileRequestForm family: picks the middle promise of the form intro. */
  family: 'glazing' | 'glass';
}

const sizes = '(max-width: 900px) 100vw, 50vw';
const set = (base: string, widths: number[]) => widths.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
const hero = (base: string, widths: number[], width: number, height: number, mid = widths[1]) => ({
  src: `${base}-${mid}.webp`, srcset: set(base, widths), sizes, width, height, image: `${base}-${widths[widths.length - 1]}.webp`
});

const CAT = '/images/catalog';

export const HUB_VISUALS: Record<string, HubVisual> = {
  services: {
    hero: { src: '/images/services/services-hero-desktop.webp', srcset: '/images/services/services-hero-desktop.webp 1536w', sizes, width: 1536, height: 1024, image: '/images/services/services-hero-desktop.webp', mobile: { srcset: '/images/services/services-hero-mobile.webp 800w', width: 800, height: 1000 } },
    icons: [],
    related: ['business', 'facades', 'aluminium', 'frameless'],
    cases: ['osocor', 'coffee-ocean', 'office-odesa'],
    typeLinks: ['showers', 'partitions', 'doors', 'railings', 'mirrors', 'canopies', 'frameless', 'aluminium', 'wintergardens', 'facades', 'business'],
    family: 'glass'
  },
  showers: {
    hero: hero(`${CAT}/dushovi-kabiny/dushovi-kabiny`, [480, 768, 1200], 1200, 900),
    icons: [shower.screen, shower.door, shower.corner, shower.sliding, shower.niche, shower.fold, shower.bath, shower.pentagon],
    related: ['mirrors', 'partitions', 'doors', 'business'],
    cases: ['hotel-showers'],
    family: 'glass'
  },
  partitions: {
    hero: hero(`${CAT}/sklyani-perehorodky/hero-hub`, [480, 900, 1080], 1080, 771),
    icons: ['loft-sklyani-peregorodku', 'tsilnosklyani-perehorodky', 'pidvisni-sklyani-peregorodky', 'nyzhnooporni-sklyani-perehorodky', 'teleskopichni-sklyani-perehorodky', 'transformuyuchi-sklyani-peregorodky', 'z-dveryma', 'ofisni', 'mizhkimnatni'].map((slug) => profileIcons[`partitions/${slug}`]),
    related: ['doors', 'showers', 'mirrors', 'business'],
    cases: ['office-odesa'],
    family: 'glass'
  },
  doors: {
    hero: hero(`${CAT}/sklyani-dveri/hero5-hub`, [480, 900, 1000], 1000, 650),
    icons: ['rozpashni-sklyani-dveri', 'rozsuvni-sklyani-dveri', 'mayatnykovi-sklyani-dveri', 'dveri-v-aliuminiievomu-profili', 'matovi-sklyani-dveri', 'sklyani-dveri-dlia-ofisu'].map((slug) => profileIcons[`doors/${slug}`]),
    related: ['partitions', 'showers', 'facades', 'business'],
    cases: ['osocor'],
    family: 'glass'
  },
  railings: {
    hero: hero(`${CAT}/sklyani-ohorozhi/hero-hub`, [480, 900, 1080], 1080, 771),
    icons: ['sklyani-peryla-dlia-skhodiv', 'sklyani-ohorozhi-balkoniv', 'sklyani-ohorozhi-teras', 'sklyani-ohorozhi-baseiniv', 'bezramni-sklyani-ohorozhi', 'sklyani-ohorozhi-na-stiykakh'].map((slug) => profileIcons[`railings/${slug}`]),
    related: ['frameless', 'canopies', 'wintergardens', 'doors'],
    cases: ['stair-railing', 'osocor'],
    family: 'glass'
  },
  mirrors: {
    hero: { src: `${CAT}/dzerkala/sg-moon-900.webp`, srcset: set(`${CAT}/dzerkala/sg-moon`, [480, 900]), sizes, width: 900, height: 900, image: `${CAT}/dzerkala/sg-moon-900.webp` },
    icons: [mirror.led, mirror.framed, mirror.wall, mirror.panno, mirror.gym, mirror.salon],
    related: ['showers', 'partitions', 'business', 'doors'],
    cases: ['nofilters'],
    family: 'glass'
  },
  canopies: {
    hero: hero(`${CAT}/sklyani-kozyrky/hero-hub`, [480, 900, 1080], 1080, 771),
    icons: ['konsolni-kozyrky', 'kozyrky-na-tyahakh', 'kozyrky-na-kronshteinakh', 'kozyrky-v-rami', 'kozyrky-z-bokovym-zakhystom', 'kozyrky-dlya-biznesu'].map((slug) => profileIcons[`canopies/${slug}`]),
    related: ['railings', 'facades', 'doors', 'business'],
    cases: [],
    family: 'glass'
  },
  frameless: {
    hero: hero(`${CAT}/bezramne/cat-hub`, [480, 900, 1080], 1080, 1080),
    icons: ['povorotno-skladni-systemy', 'sklyani-rozsuvni-systemy', 'giljotynni-systemy', 'bezporogovi-systemy', 'teple-bezramne-sklinnya', 'sklinnya-balkoniv', 'sklinnya-teras-ta-altanok', 'bezramne-sklinnya-altanky', 'sklinnya-budynkiv'].map((slug) => profileIcons[`frameless/${slug}`]),
    related: ['wintergardens', 'railings', 'aluminium', 'canopies'],
    cases: ['osocor'],
    family: 'glazing'
  },
  aluminium: {
    hero: hero(`${CAT}/profile-systems/cat-alu-rozsuvni`, [480, 900, 1080], 1080, 1080),
    icons: ['vikna', 'dveri', 'rozsuvni-dveri', 'ofisne-sklinnya', 'fasadne-sklinnya', 'zymovi-sady', 'perholy', 'sitky-plise'].map((slug) => profileIcons[`alu/${slug}`]),
    related: ['wintergardens', 'facades', 'frameless', 'business'],
    cases: ['coffee-ocean'],
    family: 'glazing'
  },
  wintergardens: {
    hero: hero(`${CAT}/profile-systems/cat-alu-zymovi-sady`, [480, 900, 1080], 1080, 1080),
    icons: [wintergarden.heated, wintergarden.seasonal, wintergarden.roof, wintergarden.doors, wintergarden.pergola],
    related: ['aluminium', 'frameless', 'railings', 'facades'],
    cases: [],
    parent: 'aluminium',
    family: 'glazing'
  },
  facades: {
    hero: hero(`${CAT}/profile-systems/cat-fas2-hub`, [480, 900, 1080], 1080, 771),
    icons: ['stiykovo-ryhelne-sklinnya', 'strukturne-sklinnya-fasadu', 'sklyani-fasady-budynkiv', 'enerhoefektyvni-fasady', 'vitrinne-sklinnya', 'sklyani-vkhidni-hrupy'].map((slug) => profileIcons[`facade/${slug}`]),
    related: ['aluminium', 'canopies', 'business', 'frameless'],
    cases: ['coffee-ocean'],
    family: 'glazing'
  },
  business: {
    hero: { src: '/images/business/biz-goteli-800.webp', srcset: set('/images/business/biz-goteli', [640, 800, 1280]), sizes, width: 1280, height: 960, image: '/images/business/biz-goteli-1280.webp' },
    icons: [business.hotel, business.restaurant, business.office, business.shop, business.salon, business.clinic, business.residential, business.resort],
    related: ['partitions', 'facades', 'doors', 'frameless'],
    cases: ['hotel-showers', 'coffee-ocean', 'office-odesa', 'nofilters'],
    family: 'glass'
  }
};

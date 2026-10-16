// Hero photos of the child pages — the same photos as the UA pages (locale independent).
// Files: `<base>-480.webp`, `-800.webp`, `-900.webp`.
export interface ChildImage { src: string; srcset: string; width: number; height: number; sizes: string }

const sizes = '(max-width: 900px) 100vw, 50vw';
const sq = (base: string, width = 1080, height = 1080): ChildImage => ({
  src: `${base}-900.webp`,
  srcset: `${base}-480.webp 480w, ${base}-800.webp 800w, ${base}-900.webp 900w`,
  width,
  height,
  sizes
});

/** Photos that exist only as -480 and -900. */
const two = (base: string): ChildImage => ({ src: `${base}-900.webp`, srcset: `${base}-480.webp 480w, ${base}-900.webp 900w`, width: 1080, height: 1080, sizes });

const biz = (name: string): ChildImage => ({
  src: `/images/business/biz-${name}-800.webp`,
  srcset: `/images/business/biz-${name}-640.webp 640w, /images/business/biz-${name}-800.webp 800w, /images/business/biz-${name}-1280.webp 1280w`,
  width: 1280,
  height: 960,
  sizes
});

const P = '/images/catalog/sklyani-perehorodky';
const B = '/images/catalog/bezramne';
const D = '/images/catalog/dushovi-kabiny/models';
const S = '/images/catalog/profile-systems';
const R = '/images/catalog/sklyani-ohorozhi';

export const CHILD_IMAGES: Record<string, ChildImage> = {
  ganzglaswand: sq(`${P}/hero-tsilnosklyani-perehorodky`),
  'loft-trennwand': sq(`${P}/hero-loft-sklyani-peregorodku`),
  'schiebe-trennwand': sq(`${P}/hero-pidvisni-sklyani-peregorodky`),
  'trennwand-tuer': sq(`${P}/hero-z-dveryma`),
  'buero-trennwand': sq(`${P}/hero-ofisni`),
  terrassenverglasung: sq(`${B}/cat-bezramne-sklinnya-terasy`),
  'glas-faltwand': sq(`${B}/cat-povorotno-skladni-systemy`),
  schiebeverglasung: sq(`${B}/cat-sklyani-rozsuvni-systemy`),
  balkonverglasung: sq(`${B}/cat-bezramne-sklinnya-balkona`),
  'walk-in-dusche': sq(`${D}/sq-peregorodka-dlya-dusha`),
  eckdusche: sq(`${D}/wide2-kutovi`, 1440, 1029),
  'schiebetuer-dusche': sq(`${D}/sq-rozsuvni`),
  aluminiumfenster: sq(`${S}/cat-alu-vikna`),
  'aluminium-schiebetuer': sq(`${S}/cat-alu-rozsuvni`),
  treppengelaender: sq(`${R}/hero-sklyani-peryla-dlia-skhodiv`),
  balkongelaender: sq(`${R}/hero-sklyani-ohorozhi-balkoniv`),
  glasschiebetuer: sq('/images/catalog/sklyani-dveri/hero4-rozsuvni-sklyani-dveri'),
  'pfosten-riegel': sq(`${S}/cat-fas2-stiykovo-ryhelne-sklinnya`),
  'led-spiegel': sq('/images/catalog/dzerkala/cat-led'),
  'vertikal-schiebeverglasung': sq(`${B}/cat-giljotynni-systemy`),
  nischendusche: sq(`${D}/sq-u-nishu`),
  aluminiumtuer: sq(`${S}/cat-alu-dveri`),
  'aluminium-pergola': sq(`${S}/cat-alu-perholy`),
  glasdrehtuer: sq('/images/catalog/sklyani-dveri/hero4-rozpashni-sklyani-dveri'),
  'glastuer-aluminiumrahmen': sq('/images/catalog/sklyani-dveri/hero4-dveri-v-aliuminiievomu-profili'),
  'rahmenloses-glasgelaender': sq(`${R}/hero-bezramni-sklyani-ohorozhi`),
  'pool-glasgelaender': sq(`${R}/hero-sklyani-ohorozhi-baseiniv`),
  'glasvordach-freitragend': sq('/images/catalog/sklyani-kozyrky/hero-konsolni-kozyrky'),
  'glasvordach-zugstangen': sq('/images/catalog/sklyani-kozyrky/hero-kozyrky-na-tyahakh'),
  'structural-glazing': sq(`${S}/cat-fas2-strukturne-sklinnya-fasadu`),
  schaufensterverglasung: sq(`${S}/cat-fas2-vitrinne-sklinnya`),
  wandspiegel: sq('/images/catalog/dzerkala/cat-stina'),
  gastronomie: biz('restoranam'),
  'buero-glasloesungen': biz('dlya-ofisu'),
  einzelhandel: biz('magazynam'),
  'franzoesischer-balkon': two(`${R}/gp-canto-fasad`),
  badewannenaufsatz: sq(`${D}/sq-shtorky-dlya-vannoyi`),
  'glas-raumteiler-wohnung': sq(`${P}/hero-mizhkimnatni`),
  'bautraeger-wohnanlagen': biz('zhytlovym-kompleksam'),
  'aluminium-buerotrennwand': sq(`${S}/cat-alu-ofis`),
  'spiegel-mit-rahmen': sq('/images/catalog/dzerkala/cat-rama'),
  kaltwintergarten: two(`${S}/veranda`),
  hotels: {
    src: '/images/business/biz-goteli-800.webp',
    srcset: '/images/business/biz-goteli-640.webp 640w, /images/business/biz-goteli-800.webp 800w, /images/business/biz-goteli-1280.webp 1280w',
    width: 1280,
    height: 960,
    sizes
  }
};

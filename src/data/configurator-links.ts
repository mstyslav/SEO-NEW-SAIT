/**
 * Hero CTA «Розрахувати в конфігураторі» on catalog pages whose constructions a configurator
 * actually prices (options in src/pricing/configs/*.json). Keys are UA page paths — RU
 * categories carry the same UA-style path, and lp() turns the target into /ru/…-configurator/.
 * Railings and canopies set heroExtra in their own data; a category's own heroExtra wins.
 */
export const HUB_CONFIGURATORS: Record<string, string> = {
  '/sklyani-perehorodky/': '/peregorodky-configurator/',
  '/bezramne-sklinnya/': '/bezramne-configurator/',
  '/dzerkala/': '/dzerkala-configurator/',
  '/poslugy/sklyani-fasady/': '/fasadne-configurator/'
};

export const CATEGORY_CONFIGURATORS: Record<string, string> = {
  // loft.json: Loft systems (standard / thin / premium) with or without doors
  '/sklyani-perehorodky/loft-sklyani-peregorodku/': '/loft-configurator/',
  // glass-partition.json: frameless or profile partition, no door / swing / sliding door
  '/sklyani-perehorodky/tsilnosklyani-perehorodky/': '/peregorodky-configurator/',
  '/sklyani-perehorodky/ofisni/': '/peregorodky-configurator/',
  '/sklyani-perehorodky/mizhkimnatni/': '/peregorodky-configurator/',
  '/sklyani-perehorodky/z-dveryma/': '/peregorodky-configurator/',
  // facade.json: stick (mullion-transom), structural and semi-structural facades
  '/poslugy/sklyani-fasady/stiykovo-ryhelne-sklinnya/': '/fasadne-configurator/',
  '/poslugy/sklyani-fasady/strukturne-sklinnya-fasadu/': '/fasadne-configurator/',
  '/alyuminiyevi-konstrukcziyi/fasadne-sklinnya/': '/fasadne-configurator/',
  // frameless-glazing.json: folding / sliding single-glass systems (not guillotine, not insulated units)
  '/bezramne-sklinnya/povorotno-skladni-systemy/': '/bezramne-configurator/',
  '/bezramne-sklinnya/sklyani-rozsuvni-systemy/': '/bezramne-configurator/',
  '/bezramne-sklinnya/bezporogovi-systemy/': '/bezramne-configurator/',
  '/bezramne-sklinnya/sklinnya-balkoniv/': '/bezramne-configurator/',
  '/bezramne-sklinnya/sklinnya-teras-ta-altanok/': '/bezramne-configurator/',
  '/bezramne-sklinnya/bezramne-sklinnya-altanky/': '/bezramne-configurator/',
  '/bezramne-sklinnya/sklinnya-budynkiv/': '/bezramne-configurator/',
  // mirror.json: custom size, shape, LED, heating
  '/dzerkala/led-dzerkala/': '/dzerkala-configurator/',
  '/dzerkala/dzerkala-v-rami/': '/dzerkala-configurator/',
  '/dzerkala/dzerkala-na-stinu/': '/dzerkala-configurator/',
  '/dzerkala/dzerkalne-panno/': '/dzerkala-configurator/',
  '/dzerkala/dzerkala-dlya-sportzalu/': '/dzerkala-configurator/',
  '/dzerkala/dzerkala-dlya-salonu-krasy/': '/dzerkala-configurator/'
};

/**
 * «Реалізовані проєкти» on commercial pages: at most 4 real projects whose construction matches the
 * page (checked against each project's type, system and description — not its slug or the broad
 * project category). Keys are UA page paths; RU pages use the same key and link /ru/project/{slug}/.
 * Partition pages never show the old unlinked «Наші роботи» cards (several did not match the page's
 * system); a partition page without an entry here simply has no projects block.
 * Knowledge linking wave 1 (P1), 2026-09-29.
 */
export const PROJECT_LINKS: Record<string, string[]> = {
  // Showers
  '/dushovi-kabiny/shtorky-dlya-vannoyi/': ['shtorka-dlya-vannoyi-zhk-akvarel-v-m-odesa', 'bath-screen-teremky-kyiv', 'shtorka-dlya-vannoyi-v-m-odesa', 'gotel-dvoryanskyj-odesa-dushovi-ta-shtorky-na-vanu'],
  '/dushovi-kabiny/peregorodka-dlya-dusha/': ['stationary-glass-partition-lviv', 'stationary-shower-partition-odesa', 'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu', 'trapezoid-shower-lviv'],
  '/dushovi-kabiny/kytova-dushova-kabina/': ['corner-shower-black-hardware-lviv', 'corner-shower-bronze-hardware-odesa', 'corner-shower-satin-hardware-odesa', 'shower-glass-to-ceiling-kyiv'],
  '/dushovi-kabiny/u-nishu/': ['shower-corner-niche-kyiv', 'shower-wall-to-wall-brass-kyiv', 'shower-door-fixed-glass-kyiv'],
  '/dushovi-kabiny/dveri-dlya-dushu/': ['swing-shower-door-kyiv', 'shower-door-gold-hardware-kyiv', 'shower-sloped-ceiling-lviv'],
  // Mirrors
  '/dzerkala/led-dzerkala/': ['dzerkalo-z-pidsvidkoyu-v-m-odesa', 'dzerkalo-z-pidsvidkoyu-v-m-odesa-2'],
  // Partitions
  '/sklyani-perehorodky/ofisni/': ['sklyani-peregorodky-dlya-ofisu-v-m-odesa', 'choice-osklinya-kabinetu-v-vzhe-diyuchomu-magazyni', 'rozdilennya-peregorodkomu-prostoru-ta-obklejka-lakobelem-dvernyh-portaliv-dlya-stomatalogii-m-odesa', 'rozdilennya-zony-pryjomu-kliyenta-mizh-pidgotovchoyu-zonoyu-v-kliniczi-zdrava'],
  '/sklyani-perehorodky/loft-sklyani-peregorodku/': ['mizhkimnatni-peregorodky-v-styli-loft-zhk-atlant-m-kyyiv', 'mizhkimnatni-peregorodku-v-stuli-loft', 'sklinni-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-2', 'mizhkimnatni-peregorodky-v-dytyachu'],
  '/sklyani-perehorodky/mizhkimnatni/': ['dzerkalni-dveri-v-garderob', 'sklyani-peregorodky-u-garderobnu-v-m-odesa', 'mizhkimnatni-peregorodky-v-dytyachu'],
  // Glass doors
  '/sklyani-dveri/': ['chastne-zamovlennya-odesa-dushova-ta-peregorodka', 'mirrored-wardrobe-doors-milos-odesa', 'zonuvannya-prostoru-odnokimnatnoyi-kvartyry', 'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-osocor-residence-m-kyyiv'],
  '/sklyani-dveri/mayatnykovi-sklyani-dveri/': ['chastne-zamovlennya-odesa-dushova-ta-peregorodka'],
  // Railings
  '/sklyani-ohorozhi/': ['ogorozha-shodiv-ta-drugogo-poverhu', 'dzerkalni-dveri-v-garderob-2', 'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-osocor-residence-m-kyyiv'],
  '/sklyani-ohorozhi/sklyani-peryla-dlia-skhodiv/': ['ogorozha-shodiv-ta-drugogo-poverhu', 'dzerkalni-dveri-v-garderob-2'],
  // Frameless glazing
  '/bezramne-sklinnya/': ['sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-osocor-residence-m-kyyiv'],
  '/bezramne-sklinnya/sklinnya-teras-ta-altanok/': ['sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-osocor-residence-m-kyyiv'],
  // Aluminium
  '/alyuminiyevi-konstrukcziyi/': ['teple-osklinnya-vhidnoyi-grupy-restoranu-art-shat', 'zasklinnya-fasadiv-ta-okno-vydachi-v-coffee-ocean-m-odesa-arkadijska-aleya'],
  // Facades
  '/poslugy/sklyani-fasady/': ['zasklinnya-fasadiv-ta-okno-vydachi-v-coffee-ocean-m-odesa-arkadijska-aleya', 'chastne-zamovlennya-odesa-dushova-ta-peregorodka', 'teple-osklinnya-vhidnoyi-grupy-restoranu-art-shat'],
  '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/': ['chastne-zamovlennya-odesa-dushova-ta-peregorodka', 'teple-osklinnya-vhidnoyi-grupy-restoranu-art-shat'],
  // Wave 2 (P2/P3, 2026-09-30): matched by construction type, never by slug or broad category.
  '/dushovi-kabiny/skladni/': ['dushovi-garmoshka-zhk'],
  '/dushovi-kabiny/rozsuvni/': ['sliding-shower-doors-kyiv'],
  '/dzerkala/dzerkala-na-stinu/': ['dzerkalo-na-stinu-v-zhk-kontynent-m-odesa'],
  '/dzerkala/dzerkala-dlya-salonu-krasy/': ['zonuvannya-prostoru-odnokimnatnoyi-kvartyry'],
  '/sklyani-dveri/rozsuvni-sklyani-dveri/': ['mirrored-wardrobe-doors-milos-odesa'],
  '/sklyani-perehorodky/z-dveryma/': ['choice-osklinya-kabinetu-v-vzhe-diyuchomu-magazyni', 'sklyani-peregorodky-dlya-ofisu-v-m-odesa', 'mizhkimnatni-peregorodku-v-stuli-loft'],
  '/pryvatnyj-sektor/pryvatnyj-sektor/ogorozhy/': ['ogorozha-shodiv-ta-drugogo-poverhu', 'dzerkalni-dveri-v-garderob-2'],
  '/poslugy/sklyani-fasady/vitrinne-sklinnya/': ['zasklinnya-fasadiv-ta-okno-vydachi-v-coffee-ocean-m-odesa-arkadijska-aleya']
};

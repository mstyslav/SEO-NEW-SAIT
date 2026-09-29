/**
 * «Реалізовані проєкти» on commercial pages: at most 4 real projects whose construction matches the
 * page (checked against each project's type, system and description — not its slug or the broad
 * project category). Keys are UA page paths; RU pages use the same key and link /ru/project/{slug}/.
 * On the partition pages listed here this block replaces the unlinked «Наші роботи» cards.
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
  '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/': ['chastne-zamovlennya-odesa-dushova-ta-peregorodka', 'teple-osklinnya-vhidnoyi-grupy-restoranu-art-shat']
};

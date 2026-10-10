/**
 * Extra service links for a project that shows more than one construction: rendered next to the
 * main serviceLink on the UA project page only (Task 26B, 2026-10-10). Keys are project slugs.
 */
export const PROJECT_EXTRA_LINKS: Record<string, [string, string][]> = {
  // Nofilters beauty salon, Odesa: custom mirrors for the work stations + glass interior doors.
  'zonuvannya-prostoru-odnokimnatnoyi-kvartyry': [
    ['дзеркала для салонів краси', '/dzerkala/dzerkala-dlya-salonu-krasy/'],
    ['скляні міжкімнатні двері', '/sklyani-perehorodky/sklyani-mizhkimnatni-dveri/']
  ],
  // Hotel Dvoryanskyi, Odesa: shower partitions + glass screens on the bath rim.
  'gotel-dvoryanskyj-odesa-dushovi-ta-shtorky-na-vanu': [
    ['скляні шторки для ванної', '/dushovi-kabiny/shtorky-dlya-vannoyi/']
  ]
};

/** Same for the RU project page: RU labels, UA-style hrefs (localized by the template). */
export const PROJECT_EXTRA_LINKS_RU: Record<string, [string, string][]> = {
  // Wall mirror in a black frame, ZhK Kontynent, Odesa.
  'dzerkalo-na-stinu-v-zhk-kontynent-m-odesa': [
    ['зеркала в раме на заказ', '/dzerkala/dzerkala-v-rami/']
  ]
};

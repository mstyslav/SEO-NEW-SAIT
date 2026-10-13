/**
 * Extra service links for a project that shows more than one construction: rendered next to the
 * main serviceLink on the UA project page only (Task 26B, 2026-10-10). Keys are project slugs.
 */
export const PROJECT_EXTRA_LINKS: Record<string, [string, string][]> = {
  // Nofilters beauty salon, Odesa: mirrors-only case (Task 33.3) — the main service link is the
  // salon mirrors page; this is the second, business-level link. No door links.
  'zonuvannya-prostoru-odnokimnatnoyi-kvartyry': [
    ['скло для салонів краси', '/dlya-biznesu/salonam-krasy/']
  ],
  // Hotel Dvoryanskyi, Odesa: shower partitions + glass screens on the bath rim.
  'gotel-dvoryanskyj-odesa-dushovi-ta-shtorky-na-vanu': [
    ['скляні шторки для ванної', '/dushovi-kabiny/shtorky-dlya-vannoyi/']
  ]
};

/** Same for the RU project page: RU labels, UA-style hrefs (localized by the template). */
export const PROJECT_EXTRA_LINKS_RU: Record<string, [string, string][]> = {
  'zonuvannya-prostoru-odnokimnatnoyi-kvartyry': [
    ['стекло для салонов красоты', '/dlya-biznesu/salonam-krasy/']
  ],
  // Wall mirror in a black frame, ZhK Kontynent, Odesa.
  'dzerkalo-na-stinu-v-zhk-kontynent-m-odesa': [
    ['зеркала в раме на заказ', '/dzerkala/dzerkala-v-rami/']
  ]
};

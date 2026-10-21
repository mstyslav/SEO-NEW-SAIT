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
  ],
  // Task 57: the Loft partition in ZhK Atlant is an interior (room-to-room) partition; the main service
  // link stays the Loft page, this adds the interior-partitions category it also belongs to.
  'mizhkimnatni-peregorodky-v-styli-loft-zhk-atlant-m-kyyiv': [
    ['міжкімнатні скляні перегородки', '/sklyani-perehorodky/mizhkimnatni/']
  ]
};

/**
 * Optional lead-in for the extra links of one project (UA / RU). Without an entry the project shows the
 * default «У цьому проєкті також» / «В этом проекте также» (Task 57.1: the Atlant partition links to its own
 * category, so it reads as a call to action instead).
 */
export const PROJECT_EXTRA_LEAD: Record<string, string> = {
  'mizhkimnatni-peregorodky-v-styli-loft-zhk-atlant-m-kyyiv': 'Переглянути рішення'
};
export const PROJECT_EXTRA_LEAD_RU: Record<string, string> = {
  'mizhkimnatni-peregorodky-v-styli-loft-zhk-atlant-m-kyyiv': 'Посмотреть решения'
};

/** Same for the RU project page: RU labels, UA-style hrefs (localized by the template). */
export const PROJECT_EXTRA_LINKS_RU: Record<string, [string, string][]> = {
  'zonuvannya-prostoru-odnokimnatnoyi-kvartyry': [
    ['стекло для салонов красоты', '/dlya-biznesu/salonam-krasy/']
  ],
  // Wall mirror in a black frame, ZhK Kontynent, Odesa.
  'dzerkalo-na-stinu-v-zhk-kontynent-m-odesa': [
    ['зеркала в раме на заказ', '/dzerkala/dzerkala-v-rami/']
  ],
  'mizhkimnatni-peregorodky-v-styli-loft-zhk-atlant-m-kyyiv': [
    ['межкомнатные стеклянные перегородки', '/sklyani-perehorodky/mizhkimnatni/']
  ]
};

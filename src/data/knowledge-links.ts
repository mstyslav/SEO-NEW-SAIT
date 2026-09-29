/**
 * «Корисно знати» on commercial pages: at most 3 Knowledge articles per page, the ones that help
 * choose, size or maintain exactly this construction. Keys are UA page paths — RU pages carry the
 * same UA-style path, and the RU article URL and title come from the slug, so one map serves both
 * languages. A page listed here shows only this article block: Knowledge links are dropped from its
 * «Далі по темі» list. Knowledge linking wave 1 (P1), 2026-09-29.
 *
 * Not listed on purpose: /sklyani-ohorozhi/bezramni-sklyani-ohorozhi/ ↔ /knowledge/bezramni-ogorozhi-profil/
 * share one H1 — only the article links to the page until the pair is reviewed for cannibalization.
 */
export const KNOWLEDGE_LINKS: Record<string, string[]> = {
  // Partitions
  '/sklyani-perehorodky/': ['yak-obraty-sklyanu-perehorodku', 'pryvatnist-sklyanyh-perehorodok', 'matove-ryflene-tonovane-sklo'],
  '/sklyani-perehorodky/loft-sklyani-peregorodku/': ['loft-perehorodky-vydy-sklo-profili', 'matove-ryflene-tonovane-sklo'],
  '/sklyani-perehorodky/ofisni/': ['ofisni-perehorodky-akustyka', 'pryvatnist-sklyanyh-perehorodok', 'vidy-bezpechnogo-skla'],
  '/sklyani-perehorodky/mizhkimnatni/': ['mizhkimnatni-sklyani-perehorodky', 'pryvatnist-sklyanyh-perehorodok'],
  '/sklyani-perehorodky/tsilnosklyani-perehorodky/': ['stacionarni-sklyani-perehorodky', 'vymogy-do-osnovy-pid-sklo'],
  '/sklyani-perehorodky/pidvisni-sklyani-peregorodky/': ['rozsuvni-perehorodky-napryamni', 'doglyad-za-rozsuvnymy-systemamy'],
  // Glass doors
  '/sklyani-dveri/': ['rozpashni-chy-rozsuvni-sklyani-dveri', 'sklyani-dveri-furnitura', 'regulyuvannya-sklyanyh-dverey'],
  '/sklyani-dveri/mayatnykovi-sklyani-dveri/': ['mayatnykovi-sklyani-dveri', 'regulyuvannya-sklyanyh-dverey'],
  // Canopies (hub only)
  '/sklyani-kozyrky/': ['sklyanyi-kozyrok', 'yake-sklo-krashche', 'heat-soak-test-zagartovanogo-skla'],
  // Railings
  '/sklyani-ohorozhi/': ['sklyani-ohorozhi-vymohy-bezpeka', 'yake-sklo-krashche', 'poruchni-dlya-sklyanyh-ogorozh'],
  '/sklyani-ohorozhi/sklyani-ohorozhi-balkoniv/': ['sklyani-ogorozhi-balkona', 'oglyad-sklyanoyi-ogorozhi'],
  '/sklyani-ohorozhi/sklyani-ohorozhi-teras/': ['sklyani-ogorozhi-terasy', 'poruchni-dlya-sklyanyh-ogorozh'],
  '/sklyani-ohorozhi/sklyani-ohorozhi-na-stiykakh/': ['ogorozhi-na-stiykah', 'poruchni-dlya-sklyanyh-ogorozh'],
  '/sklyani-ohorozhi/sklyani-peryla-dlia-skhodiv/': ['sklyani-ogorozhi-skhodiv', 'poruchni-dlya-sklyanyh-ogorozh', 'sklyani-shody'],
  // Facades
  '/poslugy/sklyani-fasady/stiykovo-ryhelne-sklinnya/': ['stiykovo-rygelne-sklinnya', 'heat-soak-test-zagartovanogo-skla'],
  '/poslugy/sklyani-fasady/strukturne-sklinnya-fasadu/': ['strukturne-sklinnya-fasadu', 'heat-soak-test-zagartovanogo-skla'],
  '/poslugy/sklyani-fasady/vitrinne-sklinnya/': ['vitrinne-sklinnya-magazynu', 'vidy-bezpechnogo-skla'],
  '/poslugy/sklyani-fasady/sklyani-fasady-budynkiv/': ['panoramne-sklinnya-budynku', 'kondensat-na-panoramnomu-skli'],
  // Frameless glazing
  '/bezramne-sklinnya/': ['bezramne-sklinnya-systemy-yak-obraty', 'slaydingova-chy-skladana-systema', 'teple-chy-kholodne-sklinnya-terasy'],
  '/bezramne-sklinnya/sklinnya-balkoniv/': ['bezramne-sklinnya-balkona', 'teple-chy-kholodne-sklinnya-terasy'],
  '/bezramne-sklinnya/sklyani-rozsuvni-systemy/': ['slaydingova-chy-skladana-systema', 'doglyad-za-rozsuvnymy-systemamy'],
  // Showers
  '/dushovi-kabiny/shtorky-dlya-vannoyi/': ['shtorka-na-vannu-zi-skla', 'vapnyanyi-nalit-na-skli', 'tovshchyna-skla-8-10-12-mm'],
  '/dushovi-kabiny/kytova-dushova-kabina/': ['kutova-dushova-kabina-vybir', 'yak-obraty-dushovu-kabinu', 'tovshchyna-skla-8-10-12-mm'],
  '/dushovi-kabiny/rozsuvni/': ['rozsuvna-dushova-systema', 'rozpashni-chy-rozsuvni-sklyani-dveri', 'yak-obraty-dushovu-kabinu'],
  '/dushovi-kabiny/dveri-dlya-dushu/': ['dushovi-dveri-zi-skla', 'rozpashni-chy-rozsuvni-sklyani-dveri', 'germetychnist-dushovoyi']
};

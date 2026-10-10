/**
 * Extra service links for a project that shows more than one construction: rendered next to the
 * main serviceLink on the UA project page only (Task 26B, 2026-10-10). Keys are project slugs.
 */
export const PROJECT_EXTRA_LINKS: Record<string, [string, string][]> = {
  // Nofilters beauty salon, Odesa: custom mirrors for the work stations + glass interior doors.
  'zonuvannya-prostoru-odnokimnatnoyi-kvartyry': [
    ['дзеркала для салонів краси', '/dzerkala/dzerkala-dlya-salonu-krasy/'],
    ['скляні міжкімнатні двері', '/sklyani-perehorodky/sklyani-mizhkimnatni-dveri/']
  ]
};

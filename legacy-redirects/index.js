/**
 * Stage 1 of the SEO migration (approved 2026-09-27): 301 for old production URLs that
 * currently return 404 on space-glass.com.ua → the EXACT existing page with the same
 * search intent (never a generic category). Any other request on these routes is passed
 * through to the origin (WordPress) untouched.
 */
const MAP = {
  '/peregorodki/loft-peregorodku/': '/sklyani-perehorodky/loft-sklyani-peregorodku/',
  '/peregorodki/nyzhnooporni-perehorodky/': '/sklyani-perehorodky/nyzhnooporni-sklyani-perehorodky/',
  '/peregorodki/teleskopichni-perehorodky/': '/sklyani-perehorodky/teleskopichni-sklyani-perehorodky/',
  '/peregorodki/transformuyuchi-peregorodky/': '/sklyani-perehorodky/transformuyuchi-sklyani-peregorodky/',
  '/peregorodki/pidvisni-peregorodky/': '/sklyani-perehorodky/pidvisni-sklyani-peregorodky/',
  '/peregorodki/door/': '/sklyani-perehorodky/sklyani-mizhkimnatni-dveri/',
  '/sklyani-perehorodky/door/': '/sklyani-perehorodky/sklyani-mizhkimnatni-dveri/',
  '/metaloplastykovi-konstrukcziyi/ofisni-peregorodky/': '/metaloplastykovi-konstrukcziyi/ofisni-sklyani-peregorodky/'
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
    const target = MAP[path];
    if (target) {
      return new Response(null, { status: 301, headers: { Location: `https://space-glass.com.ua${target}${url.search}`, 'cache-control': 'public, max-age=3600' } });
    }
    return fetch(request);
  }
};

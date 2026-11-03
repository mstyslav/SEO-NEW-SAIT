# Shop — final QA, categorisation and staged-indexing proposal (TASK 101)

Branch `claude/led-mirrors-site-catalog-d71e6c`, PR #59. Local state; nothing pushed, merged or deployed. /shop/* stays `noindex,follow`, out of the sitemap.

## Model audit (48 models, `scripts/audit-shop-models.mjs`, read from `src/data/led-mirrors/public.json`)
- Main light: 24 without, 11 front, 13 background. Confirmed by the script.
- Models without ANY light (no main light and no backlight option): 4 — TURMALINE, BRITANNIC, ARK ROYAL, DREADNOUGHT. Confirmed.
- Models with a backlight option but no main light: 20. Metal frame: 32, frameless: 16.
- GALAXY NGC 4567 / GALAXY NGC 4567 SINGLE and GALAXY FNGC 4567-8 / ...-8 SINGLE: every data attribute is identical (shape, frame, light, mounting, size limits, standard sizes, option groups, price source); only id, slug, name and photo count (2 vs 1) differ. The data does not say what SINGLE means. Not merged, URLs untouched. Owner question in `SEO-OWNER-ACTIONS.md`.

## Categorisation (implemented without changing any URL)
- «Дзеркала» (/shop/, /shop/mirrors/): all 48 models.
- LED listing (/shop/mirrors/led/): the 44 models that have LED light in an available configuration (main light or a backlight option). The 4 models above stay in the general catalog only. Their product URLs /shop/mirrors/led/{slug}/ still exist and are unchanged (URL change = owner decision).
- «У металевій рамі» is a real filter (type = framed, 32 models).
- Proposal, not done: if the owner wants the 4 light-less models under a URL without `led`, that needs new routes + 301s; to be decided before any indexing.

## SEO metadata
- 48 models x UA/RU: title, description, H1 from `src/data/led-mirrors/seo.json` (imported from the research CSV with validation); unique texts `src/lib/shop-content.mjs` (generated from real data, 48/48 unique per language, reviewed for grammar; needs an editor pass before indexing).
- Catalog pages: `src/lib/shop-meta.mjs` (counts computed from data; no price or delivery claims). /shop/ H1 remains «Магазин Space Glass».
- /dzerkala/led-dzerkala/ (R-069, freeze to 2026-11-11) untouched: head SEO tags, H1 and JSON-LD identical to the merge base.

## Staged indexing (recommendation only — nothing opened)
1. Do not open anything before 2026-11-11 (R-069 measurement). Then decide with GSC data of /dzerkala/led-dzerkala/.
2. First candidate: model pages with a distinctive intent (framed + front light models, large formats), 5-10 pages, after the editor pass of texts and real photos check. Keep the catalog pages `noindex` longest (they duplicate the main LED page's intent).
3. Avoid cannibalisation: /dzerkala/led-dzerkala/ stays the only target for «led дзеркала»; shop pages target model/format queries; never index filtered states.
4. Readiness signals: owner-confirmed brand/availability/shipping/returns, Merchant Center account verified, R-069 position stable 4+ weeks, no duplicate pairs (GALAXY/SINGLE resolved).

## Merchant readiness
Draft feed (local, gitignored): 185 standard-size items; price identical to the Worker price table for every item and to `/api/led-mirror-price` (YAMATO 600x600 = 9094 UAH on page, in the cart, in the feed). Left empty on purpose: availability, condition, brand, gtin, mpn, identifier_exists, shipping, returns.

## Redirects (`scripts/audit-redirects.mjs`, against `wrangler dev`)
Old catalog URLs: the wildcard was replaced by explicit rules (every model, UA+RU, with and without trailing slash, straight to the final URL). Result: 610 rules, all static, 0 dynamic; every rule answers with the expected status/Location and every target answers 200 (no chains/loops). `/dzerkala/katalog/agnes` is now a single hop; an unknown old slug is a plain 404. Wrangler reports 38 "duplicate rule" warnings: all are older non-ASCII rules of main (/product/..., /ru/alyumini...), not part of this work. Real Cloudflare validation only in the Workers Build.

## Baseline comparison (merge base = origin/main, 0 commits ahead)
654 existing HTML pages compared: title, description, canonical, hreflang, robots, JSON-LD and H1 identical except /cart/ and /ru/cart/ (title/H1 «Кошик», approved cart redesign, still noindex). EN/DE/ES: 0 body differences (random FAQ ids and hashed assets normalised). sitemap-*.xml, sitemap-index.xml and robots.txt byte-identical. Added pages: 110, all under /shop/.

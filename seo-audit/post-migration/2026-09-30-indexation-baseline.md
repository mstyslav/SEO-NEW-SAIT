# Post-migration indexation baseline — 2026-09-30

Production: main `1cf4018` (CF version d89b4b87). Migration WordPress → Astro: 2026-09-27 13:26 UTC.
Expected state: 483 generated · 472 indexable = sitemap · UA 236 / RU 236 · MATCHED 236 · INTENTIONAL_SINGLE_LANGUAGE 0.

This file is the baseline for the next GSC checks (2026-10-07 and 2026-10-14). No site changes were made.

## 1. GSC data available

| Source (local exports, `~/Downloads/`) | Dimension | Period | Class | Usable now |
|---|---|---|---|---|
| `space-glass/` (28.08) | Performance: date, queries, pages, countries, devices | 16 months → 2026-08-27 | PRE | history only |
| `space-glass-2/`, `space-glass-3/` (14.06) | Core Web Vitals / enhancements | → 2026-06-13 | PRE | no |
| `space-glass-4/` (27.09 02:52) | Performance | 16 months → 2026-09-24 | PRE | history only |
| `space-glass-5/` (28.09) | Page indexing: «Проскановано – наразі не проіндексовано» (60 URL) | 2026-06-30 → 2026-09-21 | PRE (WordPress URLs) | history only |
| `space-glass-6/` (28.09) | Page indexing: all not-indexed (257 URL) | 2026-06-30 → 2026-09-21 | PRE (WordPress URLs) | history only |
| `space-glass-7/` (28.09) | Performance | 3 months → 2026-09-26 | PRE | history only |
| `space-glass-8/` (29.09) | Performance | 16 months → 2026-09-26 | PRE | watchlist source |
| `seo-audit/post-migration/gsc_pages_live.json` (28.09) | GSC page list × live status | pages from the 3-month export | MIXED (GSC = PRE, status = live 28.09) | redirect check only |

- The newest GSC day is **2026-09-26**, the day before the switch. Indexing reports end on **2026-09-21**.
- There are no page × query pairs in any export.
- Sitemap status was not exported. Last known from the user: GSC read the sitemap on 29.09, when it had 474 URL. Production now has 472 (D1/D2 removed 2 UA-only pages), so a GSC figure of 474 is update lag, not an error.

**NO POST-MIGRATION GSC DATA YET.**
**NO SUFFICIENT POST-MIGRATION PAGE×QUERY DATA YET.**

## 2. Current technical indexability (live, 2026-09-30, Googlebot UA)

- **`/sitemap.xml`:** 200 `application/xml`, 472 URL, of them 236 `/ru/`. All 472 return 200 directly and match the `1cf4018` build: main content, title, canonical, hreflang, robots. Old D1/D2 URLs are absent.
- **`robots.txt`:** allows everything except `/api/ /cart/ /compare/ /proposal/ /project-print/ /thank-you/` and `/*?*`. It names the sitemap. No money page is blocked.
- **Priority sample (108 URL = 54 UA + 54 RU):** home, all hubs and key children of showers, partitions, doors, railings, mirrors, frameless, facades (including the historical aluminium facade URL), aluminium, PVC, business, solutions, catalog, knowledge and projects.
  - 108/108: 200, 0 hops, no `noindex` (meta or X-Robots-Tag), canonical = self, hreflang uk/ru/x-default reciprocal.
  - No Cloudflare challenge; max response 1.25 s.
- **Host variants:** `http://` → 1 × 301 → https; `www` → 1 × 301 → apex.

What Google already sees can only be confirmed with post-migration GSC. Technically nothing blocks crawling or indexing.

## 3. Migration redirect health (live recheck of `OLD_URL_COVERAGE_FINAL.csv`, URL with impressions > 0)

| Group | Checked | Result |
|---|---|---|
| 301 VALIDATED | 100 | 99 × 301 → 200 in exactly 1 hop; 1 now 200 directly: `/ru/dlya-biznesu/restoranam/` got its own RU page (better than the planned 301) |
| KEEP 200 | 82 | 80 × 200 directly; 2 expected: `http://` root and `/ru/cart/` → `/cart/` (service, disallowed) |
| New D1/D2 | 3 | `/catalog/piddon/`, `/catalog/dushova-perehorodka-walk-in-black/`, `/ru/catalog/piddon/` → 301 → 200, 1 hop |

- 0 broken redirects, 0 targets returning 404, 0 chains, 0 loops.
- The top 40 historical pages from the 16-month export all resolve to 200: directly, or in 1 hop to the same-intent page.

## 4. Old 404 (URL that had impressions)

- **B — correct 404 (P3):** WordPress junk and technical URL.
  - Examples: `/pre-order/` (116 impressions), `/kolir/bilyj/` (79), `/ru/zerkala/__trashed*/`, `/blog/`, `/catalog/page/N/`, `/project/page/N/`, `/product-category/*/page/2/`, `/feedback/*`, `/label/business/*`, `/poysk/`, `/succes/`, `/gotelllllllyam/`, `/checkout/`.
  - No modern equivalent; do not redirect.
- **C — review, owner's decision (not P0):**
  - `/klienty-sg/` (227), `/ru/klienty-sg/` (75), `/klienty-sg/garantiyi/` (19), `/ru/klienty-sg/garantiyi/` (3): old «Клієнтам» / «Гарантії» pages. The closest pages are `/delivery-payment/` or `/poslugy/#full-cycle`; the earlier recommendation was a 301 to `/delivery-payment/`.
  - `/offert/` (45), `/ru/offert/` (1): public offer contract. `/terms/` is not the same document.
- **A — should redirect:** none found.

## 5. Classification

- **P0 — fix now: 0.** No 5xx, broken redirect, wrong canonical, blocked money page, noindex on an indexable page or broken sitemap target.
- **P1 — watch 7 days (re-check 2026-10-07):**
  - the sitemap in GSC is read again and shows 472;
  - the home page and main hubs switch to the new titles in results;
  - historical 301 sources (loft, peregorodki/*, product/* cabins and trays, `ofisni-peregorodky`) are reported as «Сторінка з переспрямуванням», and their targets gain impressions;
  - the D1/D2 old URLs drop from the index.
- **P2 — watch 14 days (re-check 2026-10-14):**
  - discovery and indexing of the 236 RU URL (all new or re-pointed within the last few days);
  - the 80 + 80 Knowledge articles, especially whether the rewritten ones land in «Проскановано – не проіндексовано» en masse;
  - the new catalog children (frameless, partitions, facades, canopies, business);
  - the first page × query export for positioning decisions (aluminium facade vs glass facades, office cluster).
- **P3 — expected, no action:**
  - old redirected URL in GSC;
  - correct WordPress 404;
  - `/cart/` and `/compare/`: service pages, disallowed, noindex;
  - `?attribute_pa_…` / `?utm` parameter URL: blocked by `/*?*`, so they may show as «Проіндексовано, хоча заблоковано robots.txt» or excluded. The clean URL has a self canonical. Watch only.
- **Outside the repo — owner's decision:** the old WordPress subdomains `dyshovi.`, `ua.` and `vikna.space-glass.com.ua` still answer 200 with their own canonicals (known since the 2026-09-28 audit). They keep competing for shower and window queries. Options: redirect the subdomains to the matching new sections, or keep them. This needs a decision on hosting and DNS, not code.

## 6. Watchlist (re-check 2026-10-07 and 2026-10-14)

| # | URL / cluster | Why important (16-month GSC, WordPress era) | Migration status | What to watch |
|---|---|---|---|---|
| 1 | `/` and `/ru/` | 13 714 + 1 556 impressions, 490 + 61 clicks | kept 200 | brand queries, new title, clicks recover |
| 2 | `/peregorodki/loft-peregorodku/` → `/sklyani-perehorodky/loft-sklyani-peregorodku/` | 10 473 impressions | 301, 1 hop | target inherits impressions |
| 3 | `/alyuminiyevi-konstrukcziyi/alyuminiyevi-dveri/` | 10 278 impressions, position 54.7 | kept 200 | indexed; position after recrawl |
| 4 | `/dushovi-kabiny/peregorodka-dlya-dusha/` | 8 331 impressions; now also the D2 target | kept 200 | walk-in queries; the D2 URL drops |
| 5 | `/alyuminiyevi-konstrukcziyi/alyuminiyevi-vikna/` | 7 731 impressions | kept 200 | indexed; competition with `vikna.` subdomain |
| 6 | `/metaloplastykovi-konstrukcziyi/rozsuvni-dveri/` | 5 927 impressions | kept 200 | indexed (few inbound links) |
| 7 | `/alyuminiyevi-konstrukcziyi/fasadne-sklinnya/` | 5 142 impressions, 44 clicks — strongest facade URL | kept 200 | queries vs `/poslugy/sklyani-fasady/*` (needs page × query) |
| 8 | old `/product/*` cabins (libra, apus, pictor) → `kytova` / `piatykutni` | 5 693 + 4 809 + 3 582 + 1 813 impressions | 301, 1 hop | targets gain the cabin queries |
| 9 | `/dushovi-kabiny/dushovi-piddony/` + `/product/dushovyj-piddon-*` | 4 245 + 4 571 + 2 711 impressions; D1 target | kept 200 + 301 | tray queries consolidate; `/catalog/piddon/` drops |
| 10 | `/metaloplastykovi-konstrukcziyi/ofisni-peregorodky/` → `ofisni-sklyani-peregorodky/` | 4 475 impressions | 301, 1 hop | office query split with `/sklyani-perehorodky/ofisni/` |
| 11 | `/peregorodki/` → `/sklyani-perehorodky/` | 5 549 impressions | 301, 1 hop | hub inherits |
| 12 | `/peregorodki/transformuyuchi-*` and `nyzhnooporni-*` | 4 152 + 3 456 impressions | 301, 1 hop | targets indexed |
| 13 | `/project/dushovi-garmoshka-zhk/` + other projects with history | 5 354 impressions (position 11.9), hotel 3 004, loft projects | kept 200 | projects keep impressions; now linked from commercial pages |
| 14 | `/dushovi-kabiny/` and children (`dveri`, `kytova`, `rozsuvni`, `u-nishu`, `shtorky`, `skladni`, `piatykutni`) | 3 404 impressions on hub, 3 000–4 000 on children | kept 200 | indexed; subdomain `dyshovi.` competition |
| 15 | `/bezramne-sklinnya/` + `sklinnya-teras-ta-altanok`, `sklinnya-budynkiv` | 3 052 / 2 399 / 1 475 impressions | kept 200 | indexed; terrace vs gazebo split (D8) |
| 16 | `/sklyani-perehorodky/` + `ofisni`, `mizhkimnatni`, `pidvisni` (new title D6) | 3 039 impressions on hub | kept 200 | new pidvisni title picked up |
| 17 | `/peregorodki/door/` → `/sklyani-perehorodky/sklyani-mizhkimnatni-dveri/` | 2 221 impressions | 301, 1 hop | target indexed |
| 18 | `/private-houses/*` → `/pryvatnyj-sektor/`, `/dushovi-kabiny/` | 2 440 impressions (showers) | 301, 1 hop | targets indexed |
| 19 | `/pryvatnyj-sektor/` + `/pryvatnyj-sektor/pryvatnyj-sektor/ogorozhy/` | 1 670 impressions; D3 breadcrumb change | kept 200 | both indexed, no cannibalisation with `/sklyani-ohorozhi/` |
| 20 | `/catalog/` | 1 734 impressions, 39 clicks | kept 200 | stays indexed |
| 21 | `/metaloplastykovi-konstrukcziyi/` + windows/doors | 1 754 / 1 700 / 2 717 impressions | kept 200 | indexed |
| 22 | RU cluster (236 URL) | new or re-pointed after 27.09 | in sitemap, self canonical, reciprocal hreflang | discovered/indexed share by 14.10; flag only if a whole section is missing |
| 23 | Knowledge 80 + 80 | rewritten 29–30.09 | 200, in sitemap | «Проскановано – не проіндексовано» share, especially for the 40 rewritten |
| 24 | D1/D2 old URLs | removed 30.09 | 301, 1 hop | reported as redirect, then dropped |
| 25 | `/klienty-sg/`, `/offert/` (UA/RU) | 227 / 75 / 45 impressions, now 404 | 404 (review) | decide 301 vs keep 404 |
| 26 | subdomains `dyshovi.`, `ua.`, `vikna.` | ~480 impressions / 3 months | old WordPress, live | owner decision; watch overlap with main-site pages |

## 7. Next checks

- **2026-10-07.** Export from GSC:
  - Performance, last 7 days, with pages, queries and page × query (filter date ≥ 2026-09-28);
  - Page indexing (all reasons, with URL lists);
  - Sitemaps status.
  - Compare with sections 2–6.
- **2026-10-14.** Same exports, 14 days. First decisions that may use data: facade and office positioning, `klienty-sg` / `offert`, subdomains, Knowledge merge candidates.

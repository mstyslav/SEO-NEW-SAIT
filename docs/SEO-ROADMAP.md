# Space Glass — SEO Roadmap

Last updated: 2026-10-24 · Source of truth for SEO work. The structured register is [SEO-ROADMAP.csv](SEO-ROADMAP.csv) (same items, full detail). Owner decisions: [SEO-OWNER-ACTIONS.md](SEO-OWNER-ACTIONS.md). Next tasks: [SEO-NEXT-TASKS.md](SEO-NEXT-TASKS.md).

## How future SEO tasks must use this file
1. Read this roadmap first and check the item status.
2. Do not repeat DONE work; do not touch pages that are SCHEDULED for measurement before their date.
3. Execute the assigned task.
4. Update the item in BOTH files (Markdown and CSV): status, next action, target date, evidence, last updated.
5. Record any new dependency as a new item (next free R-number).
6. Save completion evidence (commit SHA, PR, date, report path).
7. Real dates only; never invent completion dates or data.

IDs are stable; numbering is grouped (R-00x done, R-01x scheduled/measurement, R-02x ready/research, R-03x owner data, R-04x Austria) and gaps are intentional. New items: next free number in the group.

Statuses: DONE · READY · IN PROGRESS · WAITING FOR DATA · WAITING FOR OWNER · SCHEDULED · BLOCKED.

## Dashboard (35 items)

| Status | Count |
|---|---|
| DONE | 12 |
| READY | 2 |
| IN PROGRESS | 0 |
| WAITING FOR DATA | 3 |
| WAITING FOR OWNER | 9 |
| SCHEDULED | 8 |
| BLOCKED | 0 |

## Important dates
| Date | What |
|---|---|
| 2026-11-03 | Ahrefs full-tool audit vs SCLASS (row limit resets) — R-016; owner answer on paid links — R-047 |
| after 2026-11-04 (plan 2026-11-05) | Glass partitions reassessment — R-012 |
| 2026-11-07 | TASK 69/70 first check — R-010, R-011; UA article not indexed + EN/DE/ES indexing check — R-044 |
| 2026-11-10 | IndexNow wait research — R-021 |
| 2026-11-21 | noindex report monitor (R-042); TASK 69/70 second check; shower trays 4-week review; GA4 contact events review — R-010, R-011, R-014, R-019 |
| 2026-11-27 | Austria review — R-040 |
| 2026-12-05 | TASK 69/70 final (42-day) check; shower trays 6-week review |
| 2027-01-15 | Backlink/SCLASS comparison repeat — R-048 |

## Protected pages (do not edit without evidence of a critical problem)
- Until 2026-12-05: TASK 69 pages (RU terrace glazing, RU stair railings, RU pergolas) and TASK 70 pages (aluminium doors UA/RU).
- Until 2026-11-04: partitions hub UA/RU (meta 2026-10-21, links 2026-10-22).
- Shower trays: URL stays; changes only on R-014 evidence.

## Register
| ID | Pri | Status | Target | Summary |
|---|---|---|---|---|
| R-001 | P1 | DONE | 2026-10-24 | 12-week GSC/GA4 growth analysis (TASK 67) |
| R-002 | P0 | DONE | 2026-10-24 | GA4 / lead tracking audit (TASK 68): 5-day tag gap 27.09-02.10, consent-only sampling, contact clicks wrongly key events |
| R-003 | P1 | DONE | 2026-10-24 | contact_method parameter on click_phone/email/telegram/whatsapp (TASK 68.1) |
| R-004 | P1 | DONE | 2026-10-24 | RU CTR quick wins (TASK 69): meta titles/description for RU terrace glazing, RU glass stair railings, RU aluminium pergo |
| R-005 | P1 | DONE | 2026-10-24 | Aluminium doors UA/RU title+description aligned to head queries; 2 contextual links (vitrine glazing -> doors) (TASK 70) |
| R-006 | P1 | DONE | 2026-10-24 | Shower trays: research (TASK 64/65) and implementation (TASK 66): URL unchanged, catalog direction, mega-menu H2s remove |
| R-007 | P2 | DONE | 2026-10-24 | Earlier completed milestones (verified in git): domain switch to Astro 2026-09-27; RU parity and redirects; knowledge re |
| R-010 | P1 | SCHEDULED | 2026-11-07 | TASK 69 follow-up: RU terrace glazing, RU glass stair railings, RU aluminium pergolas |
| R-011 | P1 | SCHEDULED | 2026-11-07 | TASK 70 follow-up: aluminium doors UA/RU |
| R-012 | P1 | SCHEDULED | 2026-11-05 | Glass partitions reassessment (hub + interior sub-pages, UA/RU) |
| R-014 | P2 | SCHEDULED | 2026-11-21 | Shower trays review 4-6 weeks after TASK 66: category impressions, commercial keywords, CTR, positions, internal-linking |
| R-016 | P1 | SCHEDULED | 2026-11-03 | Ahrefs audit: Space Glass vs SCLASS |
| R-019 | P2 | WAITING FOR DATA | 2026-11-21 | GA4 contact events review on real visitors: contact_method, phone/email/Telegram/WhatsApp clicks, generate_lead |
| R-020 | P1 | DONE | 2026-10-24 | GSC "Excluded by noindex" = 9,936 URLs audited (TASK 72) |
| R-021 | P3 | READY | 2026-11-10 | IndexNow reliability: deploy wait is 25 min (--wait 1500) inside a 45 min job; Cloudflare queue once took ~33 min, so th |
| R-022 | P2 | READY | 2026-11-17 | Analytics coverage research ONLY: Cloudflare Web Analytics, Google Consent Mode v2, GDPR/ePrivacy implications, compatib |
| R-023 | P2 | WAITING FOR DATA | 2026-11-21 | Page-3 commercial pages: UA interior partitions (pos ~40), aluminium windows (pos ~45), facade glazing (pos ~30, 536 imp |
| R-024 | P3 | WAITING FOR OWNER | 2026-11-21 | GA4 reporting hygiene: filter internal/bot traffic (China, Vietnam, Austria team traffic) |
| R-025 | P3 | WAITING FOR OWNER | 2026-11-30 | Housekeeping: legacy subdomain sitemaps (dyshovi.space-glass.com.ua x2) still listed in GSC; Google still shows http://  |
| R-030 | P1 | WAITING FOR OWNER | 2026-11-14 | Verified aluminium door prices |
| R-031 | P1 | WAITING FOR OWNER | 2026-11-30 | Real project cases: aluminium entrance doors (priority) and glass partitions |
| R-032 | P3 | WAITING FOR OWNER | 2026-12-15 | Shower tray model prices: Product/Offer schema must NOT be added until each of the 4 tray models has a verified price/av |
| R-033 | P2 | WAITING FOR OWNER | 2026-11-10 | Link building (authority): TASK 75 produced a 3-month plan (Nov 2026 - Jan 2027), 20 vetted opportunity rows and 3 budge |
| R-034 | P3 | WAITING FOR OWNER | 2026-12-15 | Knowledge articles: 20 generic articles left (10 merge candidates, 10 need verified facts) |
| R-035 | P2 | DONE | 2026-10-24 | Private backup of evidence reports (TASK 64-72): 8 zip archives uploaded to a private Google Drive folder "Space Glass / |
| R-040 | P2 | WAITING FOR DATA | 2026-11-27 | Austria review (separate from Ukraine): GSC AT/DE after the 2026-10-16 launch (DE 72 URLs) |
| R-041 | P3 | WAITING FOR OWNER | 2026-12-01 | Open Austria backlog from DE P2/P3 work: Austrian reference case, neutral/.at/.eu email-domain question, DE contact posi |
| R-042 | P3 | SCHEDULED | 2026-11-21 | Monitor GSC "Excluded by noindex" (9,936, old WordPress filter URLs now 404): expect the count to fall and "Not found (4 |
| R-043 | P2 | DONE | 2026-10-25 | GSC coverage audit (TASK 73): 404 (171), redirects (101), crawled-not-indexed (132) fully exported and checked on produc |
| R-044 | P2 | SCHEDULED | 2026-11-07 | One UA page is indexable but NOT in Google (TASK 73): /knowledge/vymogy-do-osnovy-pid-sklo/ (article, crawled once on 20 |
| R-045 | P2 | DONE | 2026-10-25 | Removed the obsolete "Архітектурні системи" page (owner decision, TASK 74): /arkhitekturni-systemy/ (UA) and /ru/arkhite |
| R-046 | P1 | DONE | 2026-10-25 | Backlink quality audit (TASK 75): GSC export verified (9 domains, 317 linking pages, 144-page sample), donors checked li |
| R-047 | P2 | WAITING FOR OWNER | 2026-11-03 | Owner to confirm whether the DIPFO article (dofollow, exact-match anchor "скляні перегородки на замовлення") and the uba |
| R-048 | P2 | SCHEDULED | 2027-01-15 | Repeat the backlink/SCLASS comparison after two months of execution: Ahrefs full tool, GSC Links report, referral traffi |
| R-049 | P2 | DONE | 2026-10-25 | Structured data audit (TASK 83): Ahrefs 'Product missing' (148) and 'Article missing' (7) not applied - site has no priced products and the 80 knowledge articles already carry Article; fake Product/Offer would violate guidelines. 'ItemList missing' (4) confirmed real on UA/RU /dzerkala/ and /dushovi-kabiny/: ItemList added 1:1 with the visible type cards (6 and 9 items). |
| R-050 | P2 | DONE | 2026-10-25 | Ahrefs follow-up (TASK 83.2): 7 'Article missing' URLs verified as category/service/knowledge-index pages, not articles - no Article added. 'ItemList missing' 4: /ru/project/ real (63 cards) -> ItemList + CollectionPage added on UA/RU /project/; 3 /ru/dlya-biznesu/* are Service pages with zone text blocks, no ItemList. EN/DE/ES: 9 DE hubs with 3-7 visible child-page cards got ItemList; 22 EN/ES hubs have no linked list, DE wintergaerten only 1 child - none added. Requires Ahrefs re-crawl to confirm. |
| R-051 | P2 | DONE | 2026-10-25 | LED mirrors category (TASK 91): COMO price aligned to the supplier's current public minimum (5 179 -> 5 490 UAH, 600x800, checked 2026-10-25) in UA/RU data; shared price note now 'autumn 2026'; use-case card extended with office (GSC shows office-intent LED queries). Title/H1/meta/schema/URLs unchanged; no model pages, no Product/Offer. |
| R-052 | P2 | WAITING FOR OWNER | 2026-11-15 | LED mirrors follow-ups (TASK 91): (a) owner to confirm the price of FEATHER (not found on the supplier site; KING/AGNES/MOON/BLOSSOM done in R-053); (b) owner to confirm written permission to use the supplier's COMO photos before any are added. |
| R-053 | P2 | DONE | 2026-10-25 | LED mirrors price synchronisation (TASK 92): KING 5 648->5 990, AGNES 3 765->3 990, MOON 8 075->8 451, BLOSSOM 10 350->10 827 UAH ('від', minimum size, supplier public prices re-verified 2026-10-25 on studioglass.ua; no promo, LED included). Applied everywhere the model is shown (LED, salon, hub; UA/RU). COMO (5 490) and FEATHER (unverified, 8 084) unchanged; no Offer/schema change. |
| R-054 | P3 | DONE | 2026-10-25 | AI search visibility audit (TASK 94): Ahrefs AI score 87 (Beta; no history, decline not confirmed), Machine Readability 55 driven by Ahrefs' 148-URL 'Product' class (0% coverage) - no schema change; 'indexable page not in sitemap' (639) is an Ahrefs project/sitemap-source issue (sitemap.xml is 200 with all 639 URLs). Only confirmed defect fixed: dangling aria-labelledby=faq-title on /poslugy/ + /ru/poslugy/. Owner: check sitemap source in the Ahrefs project. |
| R-055 | P2 | DONE | 2026-10-26 | Ahrefs 'Article missing' re-flag (TASK 98): same 7 URLs as R-050 re-audited on production 2026-10-26 (all 200). 2 gazebo/partition category pages + RU telescopic partitions = CollectionPage+ItemList+FAQPage; 2 /montazh-vikon/ (UA/RU) = WebPage+Service+FAQPage; 2 /knowledge/ (UA/RU) = CollectionPage index. None is an article; Ahrefs 'Guide' is a content-class guess. Knowledge articles (e.g. /knowledge/bezramne-sklinnya-balkona/) already carry one Article each. No schema change - adding Article would misdescribe commercial/index pages. Warning is a justified false positive. |
| R-056 | P2 | DONE | 2026-10-26 | Ahrefs 'ItemList missing' on 3 /ru/dlya-biznesu/* (salonam-krasy, dlya-ofisu, restoranam) (TASK 99): supersedes the R-050 'no ItemList' call - these pages DO have a visible linked tile grid (#zones, 6 tiles each, every tile a real link). Root cause: shared BusinessPage.astro emitted BreadcrumbList+FAQPage only; systemic for all 8 business types x UA/RU (16 pages). Fix: one ItemList per page mirroring the 6 visible zone tiles 1:1 (localized names/URLs). Not added: 'other business types' tile row (navigation, not the page's primary list). Regression: npm run check:itemlist. No URL/canonical/hreflang/title/description change. Re-crawl Ahrefs to confirm. |
| R-057 | P1 | DONE | 2026-10-26 | Full structured data audit (TASK 99): 639 sitemap URLs crawled on production 2026-10-26 - 0 JSON-LD syntax errors, 0 duplicate @id, canonical = sitemap URL everywhere, inLanguage matches page language, 160 Article (80 UA + 80 RU knowledge articles) each have headline/description/dates/author/publisher/mainEntityOfPage (no image - none confirmed, not invented). Real defects fixed: (1) /catalog/ + /ru/catalog/ ItemList numberOfItems hardcoded 10 vs 11 items -> categories.length; (2) /knowledge/ + /ru/knowledge/ CollectionPage had no ItemList -> ItemList of the 80 visible article cards added (2 pages). Not changed (justified): 7 Article warnings (R-055), EN/ES hubs and DE wintergaerten without child list (R-050), Service nodes without inLanguage (not a valid Service property), top-level hubs/legal pages without BreadcrumbList (no visible breadcrumb), DE pages carry UA + AT Organization as separate entities by design. Rich Results Test / Schema Markup Validator not run (no access); local JSON-LD parse only. |
| R-058 | P1 | PARTIAL | 2026-11-15 | Article images + FAQ + hreflang audit (TASK 100): (A) 80 unique knowledge topics (160 UA/RU Articles), 0 have an article image - Article.image absent and og:image is the site-wide hero placeholder. No image-generation tool or API is available in this environment -> 0 images generated (BLOCKED, not claimed). Delivered: 80 ready prompts + target filenames (docs/knowledge-article-image-prompts.csv), and plumbing: when public/images/knowledge/articles/<slug>.webp exists, UA+RU Article.image and og:image use the same file (verified with a temporary file, removed). ALT texts to be written when real images exist. (B) FAQ: 590 pages with FAQPage checked via scripts/check-faq-hreflang.mjs - 0 mismatches (2 delivery-payment pages use different markup, 2 project pages show 20 visible Q vs 5 in JSON-LD = visible superset, allowed); 11 pages have visible FAQ without FAQPage (home, contacts, configurators) - left. Content defect noted: one project page shows a generated question 'Від чого залежить вартість Питання про проєкт і замовлення?'. (C) hreflang: 639 sitemap URLs, self-reference, reciprocity, language codes, canonical = URL, targets in sitemap - 0 errors, nothing to fix. |
| R-059 | P3 | DONE | 2026-10-27 | Ahrefs 'title differs from SERP title' on 4 URLs (TASK 100). Audit only, NO title changes. /sklyani-perehorodky/ (R-012) and /ru/.../sklinnya-teras-ta-altanok/ (R-010) are protected measurement pages; edits deferred. /ru/sklyani-dveri/rozsuvni-sklyani-dveri/ and /ru/knowledge/rozsuvna-dushova-systema/: difference is only separator/brand, current titles correct. Shared BaseLayout fitSeoText caps titles at 60 chars (brand dropped first, then cut at separator): a candidate partitions title 'Скляні перегородки на замовлення: Loft, розсувні — Київ, Одеса' is cut to '...— Київ'; terrace candidate 'Безрамное остекление террасы и веранды — цена за м² | Space Glass' loses the brand suffix. Candidates to evaluate at R-010/R-012 checks, on GSC evidence only. |
| R-060 | P2 | PARTIAL | 2026-11-07 | Ahrefs 'slow page' 10.1-10.3 s on /de/, /es/, /dushovi-kabiny/ (TASK 101). NOT confirmed as a real-user problem; no code changes. Production 2026-10-27, 3 curl runs/page + browser Performance API: TTFB 40-160 ms, total 65-175 ms (also with AhrefsSiteAudit/Googlebot UA, HTTP/1.1 and identity), HTTP 200, no redirects, cf-cache-status HIT, content-encoding br. Brotli HTML 32-41 KB (de 157,185 B raw -> ~33 KB; dushovi-kabiny 219,458 B -> ~41 KB); same as / and /ru/ (~41 KB). Browser load event 70-290 ms, 8-13 requests, <60 KB, CLS 0, no third-party requests. Raw HTML size is mostly inline CSS (~68 KB, deliberate: no render-blocking CSS request) + inline JS (~16-18 KB) + inline SVG (~14 KB) + JSON-LD (3-14 KB, SEO). All three Ahrefs values sit at the ~10 s crawler timeout cap, pointing to a crawl-side artifact. Not run: Lighthouse/PageSpeed Insights (not installed here / no PSI access). TASK 101.1 (2026-10-27): pipeline for 6bdc9041 (IndexNow after deploy) success; production /, /de/, /es/, /dushovi-kabiny/ HTTP 200 (0.15-0.25 s). PageSpeed Insights NOT obtained: public API returned 429 (no key) and pagespeed.web.dev report did not render in the browser pane after ~30 s. Lab Performance score, LCP, INP and field CrUX remain UNVERIFIED (CLS 0 and load 70-290 ms from browser Performance API only). |
| R-061 | P1 | PARTIAL | 2026-11-07 | Semantic core v1 from a 90-day GSC export (TASK 102). Local-only files (not in git, public repo): scratchpad gsc/semantic_core.csv = 1000 queries clustered into 19 themes with target pages and priority zones (A pos 4-12, B 13-30, C >30). Findings: biggest demand clusters rank at pos 28-48 (partitions hub/geo, aluminium doors/windows, facades, interior partitions) = ranking/content depth problem, not title problem; closest to page 1 are shower trays, sliding shower doors/accordion, winter gardens/terraces, mirrors. Plisse mosquito nets rank ~56 (page exists). Google Suggest expansion returned nothing (endpoint blocked), Keyword Planner/Ahrefs data not yet added. |
| R-062 | P1 | SCHEDULED | 2026-11-11 | Strengthening item 1 (semantic core plan, TASK 102): sliding shower doors. Finding: 'dveri garmoshka' queries are already served by /dushovi-kabiny/skladni/ (title/H1/H2 optimised) and the project /project/dushovi-garmoshka-zhk/, which links to it, so no change there. Changed only meta titles: UA/RU /dushovi-kabiny/rozsuvni/ now lead with the query phrase 'rozsuvni dveri v dushovu kabinu' + verified price 'vid 19 775 grn'; RU /dushovi-kabiny/dveri-dlya-dushu/ gets the same verified price pattern UA already had ('vid 12 964 grn'). H1/H2/canonical/hreflang/URLs unchanged. Baseline kept locally (not in git). |
| R-063 | P2 | DONE | 2026-10-28 | Strengthening item 2 (semantic core plan, TASK 102): angular shower cabin /dushovi-kabiny/kytova-dushova-kabina/ UA/RU. Audit only, NO change. Page already aligned: title 'Kutovi dushovi kabiny zi skla - vid 21 332 grn', H1, 13 H2s incl. models/sizes/FAQ (14 questions incl. 'Yaki rozmiry'), query 'kutovi dushovi kabiny rozmiry' already ranks ~2.5. Linked from all 262 UA pages via mega menu with exact anchor. Positions 17-19 for head queries (kutova dushova kabina, dushova kabina kutova) are a competition/authority gap (retail marketplaces), not an on-page gap; editing would be speculative. No change made. |
| R-064 | P1 | SCHEDULED | 2026-11-11 | Strengthening item 3 (semantic core plan, TASK 102): shower partitions. Hub /dushovi-kabiny/ (UA/RU) audited, NO change (pos ~11/15, titles/H2s/FAQ already aligned). Changed only meta titles of /dushovi-kabiny/peregorodka-dlya-dusha/ UA/RU to lead with the head phrase used in GSC ('dushovi peregorodky' / 'dushevye peregorodki', ~170 impr) plus verified price 'vid 10 526 grn' (UA 'Dushovi peregorodky zi skla Walk-In - vid 10 526 grn', RU analogue). H1 keeps 'dlya dushu/dusha'. UA page weakest in cluster (pos ~41, 821 impr, 0.6% CTR); RU pos ~18. H1/H2/URL/canonical/hreflang unchanged; baseline kept locally. |
| R-065 | P1 | SCHEDULED | 2026-11-11 | Strengthening item 4 (semantic core plan, TASK 102): winter gardens /alyuminiyevi-konstrukcziyi/zymovi-sady/ UA/RU. Findings: UA page pos ~40 (781 impr, 0.64% CTR), RU pos ~25; head query 'zymovi sady' pos 8 (211 impr, ~1% CTR); price-intent queries ('zymovyi sad tsina / tsiny / tsina pid kliuch') pos 41-54, ~180 impr combined. Page already has 14-question FAQ and a cost-factors answer but NO verified price, so none added (never invent prices). Changed only meta titles to lead with the exact query + intent words: UA 'Zymovi sady z aliuminiiu pid kliuch: proiekt, tsina, montazh', RU 'Zimnie sady iz aliuminiia pod kliuch: proekt, tsena, montazh' (Aluprof stays in description/H2). H1/H2/URL/canonical/hreflang unchanged; baseline local. Price block depends on owner (SEO-OWNER-ACTIONS #11). UPDATE 2026-10-28: owner gave the price in chat ('vid 25 000 grn/m2'). Published as 'orientovno vid 25 000 grn/m2' in UA/RU meta title, meta description and a new FAQ question ('Skilky koshtuie zymovyi sad?'); final price 'za kreslenniam abo pislia zamiru'. VAT and exact inclusions NOT confirmed by owner, so none claimed. Titles now 'Zymovi sady z aliuminiiu pid kliuch - vid 25 000 grn/m2'. Measure 2026-11-11 / 2026-11-25. |
| R-066 | P1 | SCHEDULED | 2026-11-11 | Strengthening item 5 (semantic core plan, TASK 102): aluminium windows /alyuminiyevi-konstrukcziyi/alyuminiyevi-vikna/ UA/RU (outside R-011, which covers doors). Findings: UA pos ~45 (1,392 impr, 0.36% CTR), RU pos ~48 (233 impr). Head query is 'vikna z aliuminiievoho profiliu' (257 impr) + price/buy/office variants (~100-140 impr each), pos 36-47; the page used 'aliuminiievi vikna Aluprof' in title/H1 and the searched phrase appeared once. Page already has a market-benchmark price block (labelled 'rynkovyi oriientyr', figures from existing data) and a 14-question FAQ. Changed: (1) meta titles to lead with the searched phrase + 'tsina' + Aluprof: UA 'Vikna z aliuminiievoho profiliu: tsina, Aluprof, na zamovlennia', RU 'Okna iz aliuminievogo profilia: tsena, Aluprof, na zakaz'; (2) price-block H2 (shared CalculatedPriceBlock, alu branch only; PVC branch unchanged) to 'Skilky koshtuiut vikna z aliuminiievoho profiliu' / RU analogue. No price in the title (the block is a market reference, not our tariff). H1/URL/canonical/hreflang unchanged; baseline local. |
| R-067 | P2 | SCHEDULED | 2026-11-11 | Strengthening item 6 (semantic core plan, TASK 102): metal-plastic windows/doors. Plan assumption 'no GSC visibility' was wrong: pages are indexed and visible (windows pos ~9.6, 91 impr; entrance/balcony doors pos 18, 793 impr, 0.76% CTR; sliding PVC doors pos ~31, 729 impr, 0.41% CTR), head queries are long-tail/anonymised. Changed meta titles only: sliding doors UA/RU lead with the searched order 'metaloplastykovi rozsuvni dveri' + 'tsina' (queries ~96/83 impr pos 24-28); entrance/balcony doors UA/RU add 'vid vyrobnyka / ot proizvoditelia' (queries 'metaloplastykovi dveri vid vyrobnyka' pos 54-58, ~125 impr; site states 'Vlasne vyrobnytstvo'). No prices added (none verified for these pages). Windows page unchanged. H1/H2/URL/canonical/hreflang unchanged; baseline local. |
| R-068 | P2 | SCHEDULED | 2026-11-11 | Strengthening item 7 (semantic core plan, TASK 102): facades and residential-complex glazing. Audit: /alyuminiyevi-konstrukcziyi/fasadne-sklinnya/ UA is already the best performer in the cluster (1,895 impr, 15 clicks, pos ~28; RU pos ~22) - NOT changed. Weak spots: hub /poslugy/sklyani-fasady/ (pos ~60, 398 impr, 0.25% CTR) never uses the trade phrase 'svitloprozori fasadni systemy' (169 impr, pos 61.5) which appears only on the alu facade page; /dlya-biznesu/zhytlovym-kompleksam/ (pos ~41, 226 impr) never says 'sklinnia ZhK' (105 impr, pos 14.5). Changed meta titles only: hub UA 'Skliani fasady ta svitloprozori fasadni systemy na zamovlennia', RU 'Steklyannye fasady i svetoprozrachnye fasadnye sistemy'; ZhK page UA 'Sklinnia ZhK i zhytlovykh kompleksiv - balkony, vkhody, fasady', RU 'Ostekleniie ZhK i zhilykh kompleksov - ...'. H1/H2/URL/canonical/hreflang unchanged; hub vs alu facade page cannibalisation to re-check; baseline local. |
| R-069 | P2 | SCHEDULED | 2026-11-11 | Strengthening item 8 (semantic core plan, TASK 102): LED mirrors. Audit: Planner shows 'dzerkalo z pidsvitkoiu' 10-100K/month, but the real LED page /dzerkala/led-dzerkala/ has only ~114 impr at pos ~44 in GSC (head term is retail/marketplace territory; no on-page gap). The hub /dzerkala/ is healthy (pos ~15, 590 impr, 14 clicks) - NOT changed. Page already has verified prices (R-051): cheapest ready model AGNES 'vid 3 990 grn' (min size), FAQ and model table. Changed meta title only: UA 'Dzerkalo z LED-pidsvitkoiu - vid 3 990 grn | Space Glass', RU 'Zerkalo s LED-podsvetkoi - ot 3 990 grn' (price from page data, same pattern as shower/other titles). H1/H2/URL/canonical/hreflang/schema unchanged; baseline local. |
| R-070 | P3 | SCHEDULED | 2026-11-11 | Strengthening item 9 (semantic core plan, TASK 102): pleated mosquito nets /alyuminiyevi-konstrukcziyi/sitky-plise/ UA/RU. Audit: page is on-topic (71 mentions) and small in demand: GSC UA 98 impr pos ~24, RU 90 impr pos ~20; ~20 plise queries (mostly Russian spelling 'setka plisse') at pos 40-66 with 10-30 impr each; Planner band 100-1K for 'moskitna sitka plise'. No verified price exists, so none added. Changed meta titles only to add the commercial intent missing from them ('kupyty/tsena' queries ~100 impr combined): UA 'Moskitni sitky plise na dveri ta vikna: tsina, zamovlennia', RU 'Moskitnye setki plisse na dveri i okna: tsena, zakaz'. H1/H2/URL/canonical/hreflang unchanged; baseline local. |
| R-061 | P2 | PARTIAL | 2026-11-07 | Ahrefs 'Identical title and H1' (TASK 102): Title now differs from H1 on 24 UA + 21 RU project pages, 3 EN/DE/ES Nofilters case pages and 79 UA + 79 RU knowledge articles (H1 unchanged, Title carries wider query set: 'на замовлення', guide/comparison/for-apartment-house-office intents; no invented prices/facts). Knowledge titles live in src/data/knowledge-meta-titles.ts (explicit article metaTitle still wins). Left unchanged on purpose: /knowledge/vymogy-do-osnovy-pid-sklo/ UA+RU (R-044 SCHEDULED) and 7 non-audited category pages still Title=H1 (pryvatnyj-sektor UA/RU, /ru/rishennya/, sklyani-ohorozhi-na-stiykakh UA/RU, ru bezramni-sklyani-ohorozhi, ru povorotno-skladni-systemy; some within R-010 protection until 2026-12-05). Verified: npm run build OK, dist 645 pages, all titles <=60 chars. |

## Details per open item

### R-010 — Measurement (P1, SCHEDULED)
- **Category:** Measurement
- **Description:** TASK 69 follow-up: RU terrace glazing, RU glass stair railings, RU aluminium pergolas. Compare equal windows to baseline: clicks, impressions, CTR, average position, query-level changes.
- **Dependency:** R-004 deployed 2026-10-24; GSC data lag 2-3 days
- **Next action:** Checks on 2026-11-07, 2026-11-21, 2026-12-05 (GSC windows 28d, same length as baseline). No edits to these pages.
- **Target date:** 2026-11-07
- **Evidence:** Baseline: task-69/TASK-69-GSC-BASELINE.csv (LOCAL (untracked, not in git))
- **Related files:** /ru/bezramne-sklinnya/sklinnya-teras-ta-altanok/; /ru/sklyani-ohorozhi/sklyani-peryla-dlia-skhodiv/; /ru/alyuminiyevi-konstrukcziyi/pergoly/
- **Last updated:** 2026-10-24

### R-011 — Measurement (P1, SCHEDULED)
- **Category:** Measurement
- **Description:** TASK 70 follow-up: aluminium doors UA/RU. Compare clicks, impressions, CTR, positions and commercial queries (алюмінієві двері, вхідні алюмінієві двері, алюмінієві двері на замовлення).
- **Dependency:** R-005 deployed 2026-10-24 ~20:36 UTC
- **Next action:** Checks on 2026-11-07, 2026-11-21, 2026-12-05. No rewrite of these pages.
- **Target date:** 2026-11-07
- **Evidence:** Baseline: task-70/TASK-70-GSC-BASELINE.csv (LOCAL (untracked, not in git))
- **Related files:** /alyuminiyevi-konstrukcziyi/alyuminiyevi-dveri/; /ru/alyuminiyevi-konstrukcziyi/alyuminiyevi-dveri/
- **Last updated:** 2026-10-24

### R-012 — SEO content (P1, SCHEDULED)
- **Category:** SEO content
- **Description:** Glass partitions reassessment (hub + interior sub-pages, UA/RU). Fresh GSC, commercial intent, hub vs sub-page, price presentation, internal links, verified project examples. Hub meta changed 2026-10-21 and links 2026-10-22 (14-day rule ends 2026-11-04).
- **Dependency:** 14-day window after 2026-10-22; R-007/TASK 55.4 changes
- **Next action:** On/after 2026-11-05 pull GSC (28d/prev28/7d) for the 4 URLs, decide changes only on evidence. Can be bundled with the 2026-11-07 check.
- **Target date:** 2026-11-05
- **Evidence:** TASK 70 research: hub UA 12 clicks/1,090 impr/pos 23; interior UA pos 40; interior ranks worse than hub on the same queries (task-70/TASK-70-SEO-RESEARCH.md, LOCAL (untracked, not in git))
- **Related files:** /sklyani-perehorodky/; /ru/sklyani-perehorodky/; /sklyani-perehorodky/mizhkimnatni/; /ru/sklyani-perehorodky/mizhkimnatni/; src/data/partition-catalog.ts
- **Last updated:** 2026-10-24

### R-014 — SEO content (P2, SCHEDULED)
- **Category:** SEO content
- **Description:** Shower trays review 4-6 weeks after TASK 66: category impressions, commercial keywords, CTR, positions, internal-linking effect. Keep current URL. 2026-10-27: empty standalone 'Душові піддони' column removed from header mega menu/mobile accordion (link stays in shower category list; URL unchanged) - note as a change factor in the review.
- **Dependency:** R-006 deployed 2026-10-24 (4 weeks = 2026-11-21, 6 weeks = 2026-12-05)
- **Next action:** Pull GSC for /dushovi-kabiny/dushovi-piddony/ (+RU) and tray queries; compare with TASK 65 levels (site-wide tray queries, category URL, query level).
- **Target date:** 2026-11-21
- **Evidence:** TASK 65 baseline: category 185 impr pos 18.1 (3 months) - task-65/TASK-65-FINAL-REPORT.md (LOCAL (untracked, not in git))
- **Related files:** /dushovi-kabiny/dushovi-piddony/; /ru/dushovi-kabiny/dushovi-piddony/
- **Last updated:** 2026-10-27

### R-016 — Authority (P1, SCHEDULED)
- **Category:** Authority
- **Description:** Ahrefs audit: Space Glass vs SCLASS. TASK 75 recorded free-tool values on 2026-10-25 (SG: DR 23 [unverified jump from ~5], RD 554, backlinks 2.2K, traffic est. 37; SCLASS: DR 10, RD 677, backlinks 1.5K, traffic est. 191). Full-tool metrics still missing: new/lost RD, organic keywords, SCLASS full donor list, confirmation of DR.
- **Dependency:** Ahrefs monthly row limit resets 2026-11-03 (free plan; Site Explorer competitor views may stay unavailable)
- **Next action:** On 2026-11-03 re-open Ahrefs Site Explorer (row limit reset): confirm DR, RD, dofollow RD, new/lost RD, keywords; export SCLASS referring domains and diff against ours. No link purchases, no disavow, no outreach.
- **Target date:** 2026-11-03
- **Evidence:** TASK 75: GSC 9 linking domains / 317 linking pages (2026-10-25), manual actions none; free Ahrefs checker values; docs/SEO-AUDIT-BACKLINK-SUMMARY.md
- **Related files:** task-67/TASK-67-AHREFS-COMPARISON.csv (LOCAL (untracked, not in git))
- **Last updated:** 2026-10-24

### R-019 — Analytics (P2, WAITING FOR DATA)
- **Category:** Analytics
- **Description:** GA4 contact events review on real visitors: contact_method, phone/email/Telegram/WhatsApp clicks, generate_lead. Contact clicks are NOT confirmed leads. Check data volume sufficiency (GA4 only counts visitors who accept cookies).
- **Dependency:** R-003 live 2026-10-24; needs several weeks of post-deploy traffic
- **Next action:** Review on 2026-11-21 (4 weeks). If volume is too low, postpone to 2026-12-05 and say so.
- **Target date:** 2026-11-21
- **Evidence:** TASK 68.1 DebugView verification
- **Related files:** task-68/TASK-68.1-DEPLOY-VERIFICATION.md (LOCAL (untracked, not in git))
- **Last updated:** 2026-10-24

### R-021 — Technical SEO (P3, READY)
- **Category:** Technical SEO
- **Description:** IndexNow reliability: deploy wait is 25 min (--wait 1500) inside a 45 min job; Cloudflare queue once took ~33 min, so the run ended BLOCKED/exit 2 with 0 URLs submitted. Research whether 45-60 min is appropriate. Keep the 500-URL limit. No forced submits.
- **Dependency:** Research only
- **Next action:** Decide: --wait 2400-3000 s requires job timeout-minutes > wait + ~3 min (build). Also verify that URLs of a BLOCKED run are picked up by the next run (state handling). If justified, open a SEPARATE implementation task.
- **Target date:** 2026-11-10
- **Evidence:** Run 40104185350 (8c7e558): BLOCKED, deploy landed 15:21 UTC; workflow .github/workflows/indexnow.yml; MAX_AUTO_URLS=500 in scripts/indexnow-auto.mjs
- **Related files:** .github/workflows/indexnow.yml; scripts/indexnow-auto.mjs; task-68/TASK-68.1-DEPLOY-VERIFICATION.md (LOCAL (untracked, not in git))
- **Last updated:** 2026-10-24

### R-022 — Analytics (P2, READY)
- **Category:** Analytics
- **Description:** Analytics coverage research ONLY: Cloudflare Web Analytics, Google Consent Mode v2, GDPR/ePrivacy implications, compatibility with the current consent logic (GA4 loads only after "accept all" since TASK 60). No implementation, no weakening of privacy.
- **Dependency:** Research only
- **Next action:** Write a comparison (accuracy gain, legal risk UA/AT/ES, consent text, effect on GSC-vs-GA4 gap). Output = recommendation, no code.
- **Target date:** 2026-11-17
- **Evidence:** TASK 68: GA4 sees ~40-50% of Google clicks after consent gating
- **Related files:** task-68/TASK-68-PROPOSED-CHANGES.md (LOCAL (untracked, not in git))
- **Last updated:** 2026-10-24

### R-023 — SEO content (P2, WAITING FOR DATA)
- **Category:** SEO content
- **Description:** Page-3 commercial pages: UA interior partitions (pos ~40), aluminium windows (pos ~45), facade glazing (pos ~30, 536 impr). Content/internal-link work, not snippets.
- **Dependency:** Lessons from R-010/R-011 checks (2026-11-21); R-012 for partitions
- **Next action:** After the 2026-11-21 check decide whether snippet/intent changes move positions; then plan one batch (max 2+2 pages). Do not edit protected pages.
- **Target date:** 2026-11-21
- **Evidence:** TASK 67 pages table; TASK 70 audit (pages already deep; gap = intent/price/authority)
- **Related files:** task-67/TASK-67-GSC-PAGES.csv (LOCAL (untracked, not in git))
- **Last updated:** 2026-10-24

### R-024 — Technical SEO (P3, WAITING FOR OWNER)
- **Category:** Technical SEO
- **Description:** GA4 reporting hygiene: filter internal/bot traffic (China, Vietnam, Austria team traffic). Needs a GA4 admin change.
- **Dependency:** Owner approval for GA4 admin change
- **Next action:** Ask owner; if approved create an internal-traffic filter in testing state first. Do not change consent settings.
- **Target date:** 2026-11-21
- **Evidence:** TASK 67/68: China 61 users 0.6% engaged; Austria 10 users 10m32s
- **Related files:** task-68/TASK-68-AUDIT-REPORT.md (LOCAL (untracked, not in git))
- **Last updated:** 2026-10-24

### R-025 — Technical SEO (P3, WAITING FOR OWNER)
- **Category:** Technical SEO
- **Description:** Housekeeping: legacy subdomain sitemaps (dyshovi.space-glass.com.ua x2) still listed in GSC; Google still shows http:// homepage variant (301 to https works); saved Keyword Planner plan "План от окт. 24, 2026" (planId 1443306605) in the Ads account.
- **Dependency:** Owner GSC / Google Ads access decisions
- **Next action:** Owner decides whether to remove the stale sitemaps and delete the Planner plan.
- **Target date:** 2026-11-30
- **Evidence:** TASK 67 GSC sitemaps; TASK 65 side-effect disclosure
- **Related files:** task-67/TASK-67-GSC-INDEXATION.csv (LOCAL (untracked, not in git))
- **Last updated:** 2026-10-24

### R-030 — Commercial data (P1, WAITING FOR OWNER)
- **Category:** Commercial data
- **Description:** Verified aluminium door prices. Needed: min price cold doors; min price warm (thermal-break) doors; per m2 or per unit; installation included?; do Pivot and folding systems need separate pricing? Competitors win SERP snippets with prices.
- **Dependency:** Owner-provided verified prices (no pricing config exists for aluminium doors)
- **Next action:** Owner answers checklist in docs/SEO-OWNER-ACTIONS.md. Then: price line in title/description + price block + (optionally) Offer schema only with verified data.
- **Target date:** 2026-11-14
- **Evidence:** TASK 70 research: 6 of 7 competitor pages show prices; Space Glass has none
- **Related files:** docs/SEO-OWNER-ACTIONS.md; task-70/TASK-70-SEO-RESEARCH.md (LOCAL (untracked, not in git))
- **Last updated:** 2026-10-24

### R-031 — Commercial data (P1, WAITING FOR OWNER)
- **Category:** Commercial data
- **Description:** Real project cases: aluminium entrance doors (priority) and glass partitions. Needed: confirmed completed projects, photographs, city, construction type, verified technical details. No invented portfolio.
- **Dependency:** Owner-provided photos and facts
- **Next action:** Owner supplies cases; then add project pages and link them (doors page, partitions pages). Archive currently has no verified aluminium entrance-door case.
- **Target date:** 2026-11-30
- **Evidence:** TASK 70: no verified aluminium entrance-door project; TASK 58 note in src/data/project-extra-links.ts
- **Related files:** src/data/project-extra-links.ts; src/data/project-links.ts
- **Last updated:** 2026-10-24

### R-032 — Commercial data (P3, WAITING FOR OWNER)
- **Category:** Commercial data
- **Description:** Shower tray model prices: Product/Offer schema must NOT be added until each of the 4 tray models has a verified price/availability (TASK 65 finding).
- **Dependency:** Owner-provided per-model prices
- **Next action:** When prices are verified, evaluate Offer schema for trays.
- **Target date:** 2026-12-15
- **Evidence:** TASK 65 section 6 technical findings
- **Related files:** task-65/TASK-65-FINAL-REPORT.md (LOCAL (untracked, not in git))
- **Last updated:** 2026-10-24

### R-033 — Authority (P2, WAITING FOR OWNER)
- **Category:** Authority
- **Description:** Link building (authority): TASK 75 produced a 3-month plan (Nov 2026 - Jan 2027), 20 vetted opportunity rows and 3 budget scenarios (planning estimates). Nothing bought or contacted. Needs owner decisions: scenario, who contacts suppliers/clients/publishers, approval of paid placements (must be marked rel=sponsored).
- **Dependency:** R-016 Ahrefs results (2026-11-03); owner budget decision
- **Next action:** Owner picks scenario A/B/C and approves first contacts (supplier dealer/reference pages, client credits, one expert article). Then execute November steps; Claude drafts materials, owner sends.
- **Target date:** 2026-11-10
- **Evidence:** TASK 75 plan; verified DIPFO price list 2026-10-25 (article 800/1,600 UAH); UA-Region tiers 2,990-9,990 UAH visible; other prices UNKNOWN
- **Related files:** seo-audit/ (link-building drafts exist only in a local worktree)
- **Last updated:** 2026-10-24

### R-034 — SEO content (P3, WAITING FOR OWNER)
- **Category:** SEO content
- **Description:** Knowledge articles: 20 generic articles left (10 merge candidates, 10 need verified facts). Needs owner facts (edge finishing, certificates, silicones, coatings, etc.).
- **Dependency:** Owner facts / merge decision
- **Next action:** Owner supplies facts or approves merges; then one batch.
- **Target date:** 2026-12-15
- **Evidence:** Knowledge recovery completed 2026-09-30 (13cfa9f); list in seo-audit/knowledge-content-upgrade-backlog.md
- **Related files:** seo-audit/knowledge-content-upgrade-backlog.md
- **Last updated:** 2026-10-24

### R-040 — Austria SEO (P2, WAITING FOR DATA)
- **Category:** Austria SEO
- **Description:** Austria review (separate from Ukraine): GSC AT/DE after the 2026-10-16 launch (DE 72 URLs). So far AT 21 clicks/92 impr, mostly the brand query; DE 0 clicks/39 impr. Check indexing of DE pages, DE queries, Wien-related demand, contact/WhatsApp use.
- **Dependency:** DE pages need weeks to index/rank (launched 2026-10-16)
- **Next action:** On 2026-11-27 (6 weeks) pull GSC country=AT/DE and /de/ page filter; do not edit DE pages before evidence.
- **Target date:** 2026-11-27
- **Evidence:** TASK 67 country/language tables (2026-07-27..10-18)
- **Related files:** task-67/TASK-67-GSC-COUNTRIES.csv; task-67/TASK-67-GSC-LANGUAGES.csv (LOCAL (untracked, not in git))
- **Last updated:** 2026-10-24

### R-041 — Austria SEO (P3, WAITING FOR OWNER)
- **Category:** Austria SEO
- **Description:** Open Austria backlog from DE P2/P3 work: Austrian reference case, neutral/.at/.eu email-domain question, DE contact positioning; remaining P3 DE page ideas (Praxen, Plissee, Einfamilienhaus, Windschutz, Sicherheitsglas, Duschtasse). Never create /de/wien/<product>/ doorway pages. Impressum/legal pages were done in TASK 60 (c0f2317) and AT phone/WhatsApp in a273238.
- **Dependency:** Owner: Austrian case, e-mail domain decision; GSC DE evidence (R-040)
- **Next action:** Revisit after R-040. Create new DE pages only with demand evidence.
- **Target date:** 2026-12-01
- **Evidence:** Project notes (DE P2/P3 batches, 0f6023c); a273238
- **Related files:** src/content/i18n/intl/; src/i18n/intl-routes.ts
- **Last updated:** 2026-10-24

### R-042 — Technical SEO (P3, SCHEDULED)
- **Category:** Technical SEO
- **Description:** Monitor GSC "Excluded by noindex" (9,936, old WordPress filter URLs now 404): expect the count to fall and "Not found (404)" to rise as Google re-crawls. Re-export once the count changes (GSC lists max 1,000 rows, a different subset may appear).
- **Dependency:** Google re-crawl of the old URLs (weeks)
- **Next action:** Check Page indexing on 2026-11-21 and 2026-12-05; if noindex stays ~9.9k, re-export the list and look for non-/catalog/ patterns. No redirects, no mass indexing requests.
- **Target date:** 2026-11-21
- **Evidence:** TASK 72: 6,929 (05.08) -> 9,980 (22.09) -> 9,936 (16.10)
- **Related files:** docs/SEO-AUDIT-NOINDEX-SUMMARY.md
- **Last updated:** 2026-10-24

### R-044 — Technical SEO (P2, SCHEDULED)
- **Category:** Technical SEO
- **Description:** One UA page is indexable but NOT in Google (TASK 73): /knowledge/vymogy-do-osnovy-pid-sklo/ (article, crawled once on 2026-09-27). Also watch indexing progress of the 52 EN/DE/ES URLs reported as crawled-not-indexed (new pages, 2026-10-16) and that the removed /arkhitekturni-systemy/ URLs (R-045) drop out of the GSC "crawled - not indexed" list.
- **Dependency:** Google re-crawl; at least 2 weeks after the report
- **Next action:** On 2026-11-07 re-run URL Inspection for the article and sample 5 EN/DE/ES URLs; confirm the removed hub URLs now show 410/404 in GSC. If the article is still not indexed: add 1-2 natural contextual internal links and re-check 14 days later; an optional single manual indexing request needs owner approval. No mass requests, no IndexNow force.
- **Target date:** 2026-11-07
- **Evidence:** TASK 73 URL Inspection 2026-10-25; the article is 200, canonical self, in sitemap
- **Related files:** docs/SEO-AUDIT-COVERAGE-SUMMARY.md; task-73/TASK-73-FIX-PLAN.md (LOCAL)
- **Last updated:** 2026-10-24

### R-047 — Authority (P2, WAITING FOR OWNER)
- **Category:** Authority
- **Description:** Owner to confirm whether the DIPFO article (dofollow, exact-match anchor "скляні перегородки на замовлення") and the uba.top listing were paid. DIPFO publicly sells dofollow articles; paid links that pass ranking credit should carry rel="sponsored"/"nofollow" under Google policy.
- **Dependency:** Owner knowledge of past payments
- **Next action:** Owner answers yes/no for DIPFO and uba.top. If paid: decide whether to ask the publisher (owner contact only) to add rel="sponsored", or accept the risk; never remove/disavow without evidence of harm.
- **Target date:** 2026-11-03
- **Evidence:** TASK 75 donor audit: DIPFO price page verified 2026-10-25; link rel = noopener only
- **Related files:** docs/SEO-AUDIT-BACKLINK-SUMMARY.md; task-75/TASK-75-GSC-DONORS.csv (LOCAL)
- **Last updated:** 2026-10-24

### R-048 — Authority (P2, SCHEDULED)
- **Category:** Authority
- **Description:** Repeat the backlink/SCLASS comparison after two months of execution: Ahrefs full tool, GSC Links report, referral traffic, GSC clicks/impressions on target pages, new relevant referring domains. Adjust or stop tactics.
- **Dependency:** R-016 baseline (2026-11-03) and R-033 execution
- **Next action:** Run on 2027-01-15; compare with TASK-75-SCLASS-COMPARISON.csv and R-016 results.
- **Target date:** 2027-01-15
- **Evidence:** TASK 75 plan
- **Related files:** task-75/TASK-75-LINK-BUILDING-PLAN.md (LOCAL)
- **Last updated:** 2026-10-24

## Completed (evidence)
| ID | Summary | Evidence |
|---|---|---|
| R-001 | 12-week GSC/GA4 growth analysis (TASK 67). Growth step on 28.09 after the Astro switch; Ahrefs blocked by row limit. | Reports in task-67/ (LOCAL (untracked, not in git)) |
| R-002 | GA4 / lead tracking audit (TASK 68): 5-day tag gap 27.09-02.10, consent-only sampling, contact clicks wrongly key events, legacy WordPress events. Key events cleaned (click_phone/email/telegram unmarked; generate_lead stays; purchase cannot be unmarked). | GA4 Admin change 2026-10-24; reports in task-68/ (LOCAL (untracked, not in git)) |
| R-003 | contact_method parameter on click_phone/email/telegram/whatsapp (TASK 68.1). Live and confirmed in GA4 DebugView. | PR #40, main 8c7e558, production deployed 2026-10-24 15:21 UTC; DebugView 4/4 events |
| R-004 | RU CTR quick wins (TASK 69): meta titles/description for RU terrace glazing, RU glass stair railings, RU aluminium pergolas. | PR #41, main 620e878, production verified; IndexNow 3/3 accepted |
| R-005 | Aluminium doors UA/RU title+description aligned to head queries; 2 contextual links (vitrine glazing -> doors) (TASK 70). Partitions analysed, intentionally unchanged. | PR #42, main 27af761, production verified; IndexNow 4/4 accepted |
| R-006 | Shower trays: research (TASK 64/65) and implementation (TASK 66): URL unchanged, catalog direction, mega-menu H2s removed before H1, size table. | main 9c1b1c1 deployed 2026-10-24 13:59 UTC; research in task-64/, task-65/ (LOCAL (untracked, not in git)). No TASK 66 report file exists locally |
| R-007 | Earlier completed milestones (verified in git): domain switch to Astro 2026-09-27; RU parity and redirects; knowledge recovery; TASK 51 technical SEO (f0e013d, 2026-10-20); TASK 55.4 UA/RU commercial meta (1f22f6f, 2026-10-21); category link strengthening (2026-10-22); EN/DE/ES 75 URLs (4f3d9d1, 2026-10-16); Austria market layer (a273238, 2026-10-18); TASK 60 consent-gated GA4 + legal pages/Impressum (c0f2317, 2026-10-24); automatic IndexNow (943b8cf, 2026-10-24). | git history on main |
| R-020 | GSC "Excluded by noindex" = 9,936 URLs audited (TASK 72). Sample of 1,000 (GSC export cap): all old WordPress faceted /catalog/ filter URLs, last crawled 2026-09-27, all return 404 now; 0 commercial pages affected; sitemap 641/641 clean. Verdict: expected historical exclusion, no P0/P1 issue. | TASK 72 audit; GSC data date 2026-10-16; 1,000/9,936 URLs sampled (not random); 641 sitemap URLs checked on production; 7 commercial pages inspected in GSC |
| R-035 | Private backup of evidence reports (TASK 64-72): 8 zip archives uploaded to a private Google Drive folder "Space Glass / SEO / Reports / 2026" (owner-only, general access restricted). TASK 66 has no report file. Byte-level read-back was not performed (names, count and privacy verified). | Drive folder created and 8 files verified present 2026-10-24; public repo still holds no GSC/GA4 data |
| R-043 | GSC coverage audit (TASK 73): 404 (171), redirects (101), crawled-not-indexed (132) fully exported and checked on production. No current commercial page in the 404 list; all 101 redirects valid (no loops, no 404 targets, no language mismatch, 0 internal links to old URLs); crawled-not-indexed = mostly stale historical URLs (73) and recently published EN/DE/ES pages (52, sampled hubs already on Google); 2 UA pages indexable but not in Google (P2). No P0/P1. | TASK 73 audit; GSC data date 2026-10-16; all three lists exported in full (no 1,000 cap hit); URL Inspection on 6 URLs on 2026-10-25 |
| R-045 | Removed the obsolete "Архітектурні системи" page (owner decision, TASK 74): /arkhitekturni-systemy/ (UA) and /ru/arkhitekturni-systemy/ (RU) deleted (no DE/EN/ES versions existed); both URLs answer HTTP 410 Gone via the Cloudflare Worker (wrangler run_worker_first + GONE_PATHS), no redirects; removed from sitemap, navigation lists, /poslugy/ direction cards, solutions, facade related links, route/project checks and catalog data. | PR #46; build 654 pages, sitemap 639; local Worker test 410/410/410/410, other pages 200; live verification in the task report |
| R-046 | Backlink quality audit (TASK 75): GSC export verified (9 domains, 317 linking pages, 144-page sample), donors checked live, no manual action, no disavow/removal candidates; 1 INVESTIGATE (DIPFO paid status); comparison with SCLASS from free Ahrefs tools; 20 opportunity rows; 3-month plan. | GSC manual actions 2026-10-25: none; Google link-spam/disavow guidance fetched 2026-10-25; private reports task-75/ (LOCAL) |

## Evidence location
The reports `task-64/` … `task-70/` (GSC/GA4 numbers, competitor tables, baselines) are **local, untracked files** in the working folder of the project owner. This repository is public, so performance data is intentionally not committed (see R-035). Committed evidence: `seo-audit/` and commit/PR references above.

## Known documentation gaps
- No standalone TASK 66 report file was found; evidence is commit 9c1b1c1 and the TASK 65 report.
- Weekly GSC history older than ~3 months is not available in the GSC UI; baselines are stored in the task folders.

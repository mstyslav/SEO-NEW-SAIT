# GSC index coverage — sanitized audit summary (TASK 73, 2026-10-25)

Public summary without performance data. Raw exports and per-URL tables are private (see R-035 in [SEO-ROADMAP.md](SEO-ROADMAP.md)).

**Scope:** three Google Search Console "not indexed" categories, exported in full (GSC data date 2026-10-16) and checked on production:

| Category | URLs | Result |
|---|---|---|
| Not found (404) | 171 | Old WordPress filter/sort URLs (132), scanner/technical URLs (14), old service/review/trash pages (11), old categories/products/projects (14). No current commercial page; no internal links to them. 154 still 404, 12 already 301 to a relevant page. **Keep 404.** |
| Page with redirect | 101 | All valid 301/307 → 200, self canonical, final pages in the sitemap, no loops, no redirects to 404, no language mismatch, no internal links to old URLs. **No action; do not remove redirects.** |
| Crawled – currently not indexed | 132 | 73 historical WordPress URLs (404/redirect now, stale snapshot), 52 new EN/DE/ES pages published 2026-10-16 (sampled hubs already on Google), 4 technical/tool pages, 3 UA/RU pages (1 resolved since, **2 indexable but not in Google**). |

**Confirmed:** no P0/P1 issue; redirects healthy; the 404 list holds no valuable URL; two UA pages (an "architectural systems" hub and one knowledge article) are technically indexable but not indexed.
**Hypotheses (not confirmed):** low internal prominence for the hub; a single early crawl (right after the 2026-09-27 domain switch) for the article; processing delay for the new language pages.
**Priority:** P2 for the two UA pages (R-044, re-check 2026-11-07, then at most two small internal-link additions); everything else P3.
**Not done on purpose:** no redirects added, no indexing requests, no IndexNow batches, no site changes.
**Limits:** GSC data is about 9 days old; URL Inspection was run for 6 URLs; reasons for "crawled – not indexed" are not exposed by Google.

**Update 2026-10-25 (TASK 74):** the "architectural systems" hub flagged above was an obsolete page; the owner confirmed it is not needed, so UA/RU versions were removed and now return HTTP 410 (R-045). Only the knowledge article remains under R-044.

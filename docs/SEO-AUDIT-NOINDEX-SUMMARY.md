# GSC "Excluded by noindex" — sanitized audit summary (TASK 72, 2026-10-24)

Public summary without performance data. Full evidence is private (see R-035 in [SEO-ROADMAP.md](SEO-ROADMAP.md)).

**Question:** GSC reports 9,936 URLs "Excluded by noindex". Are they errors?

**Answer: no confirmed error.** They are historical records of the old WordPress site's faceted filter URLs.
- GSC data date 2026-10-16. Trend: 6,929 (2026-08-05) → 9,980 (2026-09-22) → 9,936 (2026-10-16). Most of the count predates the Astro switch (2026-09-27); the step on 2026-09-22 happened while the old site was live.
- GSC exports at most 1,000 URLs. All 1,000 are `/catalog/<facet>…/` filter combinations (forma, vyrobnycztvo, cat-, material, furnitura …), last crawled 2026-09-27. The sample is not random, so nothing is extrapolated to the other ~8,936.
- Today all 1,000 sampled URLs return **404** on production (the 404 page is `noindex, follow`); none is in the sitemap; there is no redirect rule for filter combinations, and indexing them was never wanted.
- Current commercial pages are not affected: 26 URLs (13 categories × UA/RU) are 200, indexable, self-canonical and in the sitemap; 7 key pages were inspected in GSC and are on Google.
- Production sitemap: 641 URLs, all 200, none noindex, all self-canonical.
- The current site produces only 15 intentional noindex pages (cart, compare, thank-you, proposal, project-print, wishlist, tray stub, 404s), none in the sitemap.

**Priority:** P3 (historical). Nothing was changed in the site, redirects, sitemap or robots; no indexing requests were made.
**Follow-up:** monitor the report (R-042, 2026-11-21); classify the other non-indexed categories (R-043).
**Limits:** 1,000 of 9,936 URLs visible; GSC lag; not inspected in GSC: facade glazing, shower hub, projects hub (sitemap check clean).

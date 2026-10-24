# Space Glass — next SEO tasks

Priority order inside each group. Updated: 2026-10-24. Status lives in [SEO-ROADMAP.md](SEO-ROADMAP.md).

## READY NOW
1. **Noindex investigation (R-020, P1, read-only)** — 9,936 URLs "excluded by noindex" in GSC were never inspected.
   - Purpose: confirm they are intended (configurators, thank-you, params) or find accidental noindex.
   - Benefit: protects indexation; may reveal pages blocked by mistake.
   - Prerequisites: GSC access. Scope: GSC sampling + code check, report only. Risk: none (no edits unless a defect is confirmed).
2. **IndexNow reliability research (R-021, P3)** — deploy wait 25 min vs observed 33 min queue.
   - Purpose: decide whether to extend the wait (45–60 min) and whether URLs of a BLOCKED run are picked up later.
   - Benefit: no silently skipped submissions. Prerequisites: read workflow/script. Scope: research note; implementation would be a separate task with job timeout raised above the wait. Risk: low; do not change the 500-URL limit or force-submit.
3. **Analytics coverage research (R-022, P2)** — Cloudflare Web Analytics vs Consent Mode v2, GDPR/ePrivacy.
   - Purpose: close the GSC-vs-GA4 gap without weakening privacy. Benefit: trustworthy traffic counts. Prerequisites: none. Scope: written recommendation only. Risk: legal/privacy — no implementation.

## WAITING FOR DATE
1. **Ahrefs audit vs SCLASS (R-016) — 2026-11-03.** Benefit: current backlink position, safe link options. Prerequisite: row limit reset (free plan limits may remain). Scope: read-only audit + report. Risk: free plan may hide competitor views.
2. **Glass partitions reassessment (R-012) — after 2026-11-04 (plan 2026-11-05).** Benefit: decide evidence-based changes for hub and interior pages. Prerequisite: 14-day window over; fresh GSC. Scope: analysis, at most a small batch. Risk: over-editing protected pages.
3. **TASK 69/70 checks (R-010, R-011) — 2026-11-07, 2026-11-21, 2026-12-05.** Benefit: learn whether snippet work moves CTR/position. Prerequisite: baselines (task-69/, task-70/). Scope: read-only comparison. Risk: tiny volumes → noisy results; no page edits before 2026-12-05.
4. **Shower trays review (R-014) — 2026-11-21 to 2026-12-05.** Benefit: judge TASK 66 effect. Scope: GSC comparison. Risk: demand for trays is small (hundreds of impressions).
5. **GA4 contact events review (R-019) — 2026-11-21.** Benefit: first real data on contact_method. Prerequisite: enough post-deploy traffic. Risk: consent-limited sample.
6. **Page-3 commercial pages (R-023) — after 2026-11-21.** Benefit: plan content/link work for partitions interior, windows, facades. Risk: do not edit before lessons from R-010/R-011.
7. **Austria review (R-040) — 2026-11-27.** Benefit: judge DE pages launched 2026-10-16. Risk: too early before 6 weeks.

## WAITING FOR OWNER
See [SEO-OWNER-ACTIONS.md](SEO-OWNER-ACTIONS.md): door prices (R-030), real cases (R-031), link-building decisions (R-033), evidence backup (R-035), GA4 filter approval (R-024), tray prices (R-032), knowledge facts (R-034), Austria items (R-041), housekeeping (R-025).
- Highest value: **verified door prices** — enables a price line in snippets (the main gap found in TASK 70). Scope after data: 2 pages UA/RU meta + price block. Risk: publishing wrong prices — only verified numbers.

## RESEARCH ONLY (no implementation)
- R-022 analytics coverage, R-021 IndexNow wait, R-040 Austria evidence review.

# legacy-subdomains Worker

Page-level 301s from the old subdomains to space-glass.com.ua. Separate Worker, not part of the Astro build.

- Source of truth: `mapping.csv` (audit 2026-09-30; bezramne. rows added 2026-10-10) → `src/mapping.json` (99 redirects, 13 removed URL → 410).
- `mapping-bezramne-pending.csv`: 6 bezramne. URL with a proposed target that still NEED APPROVAL. They are NOT in `mapping.json` and answer 404 — do not switch the bezramne. DNS record to Proxied before they are approved and moved into `mapping.csv`.
- Unknown paths → 404; `robots.txt` → allow all, no sitemap; old sitemaps → 410. Query strings are dropped.
- Routes: `dyshovi.space-glass.com.ua/*`, `ua.space-glass.com.ua/*`, `vikna.space-glass.com.ua/*`, `bezramne.space-glass.com.ua/*` — they fire only while the DNS record is proxied.
- Test before deploy: `node test.mjs mapping.csv` (every row with/without slash, encoded, with query).
- Deploy: `npx wrangler deploy --config wrangler.toml` (the explicit config avoids the repo-root redirected Astro config).

Rollback: delete the three routes (Workers → legacy-subdomains → Triggers) and, for dyshovi/ua, set the DNS record back to DNS only (A 5.181.161.50). Origins (Tilda, WordPress on vikna) stay untouched.
Keep the redirects for at least 12 months.

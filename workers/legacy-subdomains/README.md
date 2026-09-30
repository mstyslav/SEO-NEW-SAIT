# legacy-subdomains Worker

Page-level 301s from the old subdomains to space-glass.com.ua. Separate Worker, not part of the Astro build.

- Source of truth: `mapping.csv` (audit 2026-09-30) → `src/mapping.json` (81 redirects, 9 removed URL → 410).
- Unknown paths → 404; `robots.txt` → allow all, no sitemap; old sitemaps → 410. Query strings are dropped.
- Routes: `dyshovi.space-glass.com.ua/*`, `ua.space-glass.com.ua/*`, `vikna.space-glass.com.ua/*` — they fire only while the DNS record is proxied.
- Test before deploy: `node test.mjs mapping.csv` (every row with/without slash, encoded, with query).
- Deploy: `npx wrangler deploy --config wrangler.toml` (the explicit config avoids the repo-root redirected Astro config).

Rollback: delete the three routes (Workers → legacy-subdomains → Triggers) and, for dyshovi/ua, set the DNS record back to DNS only (A 5.181.161.50). Origins (Tilda, WordPress on vikna) stay untouched.
Keep the redirects for at least 12 months.

# Space Glass — SEO owner actions

Decisions and facts that only the business owner can provide. Updated: 2026-10-24. Tracked in [SEO-ROADMAP.md](SEO-ROADMAP.md) (ID in brackets). Do not publish anything below until verified.

| # | Priority | Status | Needed from the owner | Why it matters | Category |
|---|---|---|---|---|---|
| 1 | P1 | WAITING FOR OWNER | **Aluminium door prices** [R-030] — see checklist A | Competitors win search snippets with prices ("from 210 EUR/m²"); Space Glass shows none | Aluminium doors |
| 2 | P1 | WAITING FOR OWNER | **Real project cases with photos** [R-031] — see checklist B | No verified aluminium entrance-door or partition case exists; cases build trust and internal links | Aluminium doors, partitions |
| 3 | P2 | WAITING FOR OWNER | **Link-building decision** [R-033]: choose scenario A (0–3,000 UAH) / B (8,000–25,000 UAH) / C (30,000–90,000 UAH) — planning estimates for 3 months — and who makes contacts (suppliers, clients, publishers). Claude does not contact anyone | The 3-month plan is ready; execution needs owner approval and contacts | Authority |
| 4 | P2 | DONE | **Evidence backup** [R-035]: reports are in the private Google Drive folder `Space Glass / SEO / Reports / 2026` (owner-only). Optional: keep refreshing it after each task | Protects the 07.11 / 21.11 / 05.12 baselines | Repository |
| 5 | P3 | WAITING FOR OWNER | **GA4 internal/bot traffic filter** [R-024]: approve a GA4 admin change | Cleaner engagement data (China bots, team visits from Austria) | Analytics |
| 6 | P3 | WAITING FOR OWNER | **Shower tray model prices** [R-032] (per model, verified) | Enables product price markup later; not before | Shower trays |
| 7 | P3 | WAITING FOR OWNER | **Knowledge-article facts** [R-034] (10 topics) or approval to merge 10 articles | Removes thin generic articles | Knowledge |
| 8 | P3 | WAITING FOR OWNER | **Austria**: a reference case in Austria; e-mail domain decision (neutral/.at/.eu) [R-041] | Trust for the Austrian market | Austria |
| 9 | P3 | WAITING FOR OWNER | **Housekeeping** [R-025]: remove stale GSC sitemaps (dyshovi.*); delete saved Keyword Planner plan "План от окт. 24, 2026" in Google Ads | Tidiness only | Technical |
| 11 | P2 | DONE (partial) | **Winter garden price** [R-065]: minimum verified price (per m² or per project, VAT, what is included, Aluprof system) for aluminium winter gardens | Queries 'зимовий сад ціна / ціни / ціна під ключ' have no priced answer on the page; no price is published without this | Winter gardens | Owner stated "from 25,000 UAH/m²" on 2026-10-28; VAT/inclusions still unknown.

## Checklist A — aluminium door prices (R-030)
Answer each line; "unknown" is acceptable.
1. Minimum price for **cold** aluminium doors: ______ (currency, with/without VAT)
2. Minimum price for **warm** (thermal-break) aluminium doors: ______
3. Is the price **per m²** or **per unit** (what size is the reference door)? ______
4. Is **installation included**? ______
5. Do **Pivot** and **folding (Fold Line)** systems need **separate** prices? ______ If yes, minimum price for each: ______
6. How long are the prices valid / when will they be reviewed? ______
No price will be published without these answers.

## Checklist B — real project cases (R-031)
For each completed project (priority: aluminium entrance doors, then glass partitions):
1. Construction type and system (e.g. aluminium entrance door, Pivot / glass partition with door).
2. City and object type (house, shop, office…).
3. Confirmation that it is a completed Space Glass project and permission to show it.
4. 5–12 real photographs (originals, no stock images).
5. Verified technical details (dimensions, glass, profile, hardware) only if known.
No project will be invented or filled in from assumptions.
| 10 | P2 | WAITING FOR OWNER | **Paid-link status** [R-047]: was the DIPFO article (dofollow, anchor "скляні перегородки на замовлення") paid? was the uba.top listing paid? | Paid links that pass ranking credit should carry rel="sponsored"; decides whether to ask the publisher for the attribute | Authority |

## LED mirror catalog and unified cart (R-071, R-072)
Decided by owner 2026-11-03: supplier photos allowed (stored locally); retail price = purchase price + agreed markup (not stated in this public repo); manual price updates; one unified cart for UA/RU only.
1. **Control CRM website-order endpoint (decided: add it).** Implemented in the CRM repo (SpaceGlassControlBot, local branch `feat/website-order-intake`, not pushed): signed `POST /website/api/orders`, migration 063. Before deploy set Cloudflare secrets: CRM worker `WEBSITE_ORDER_SECRET` (new random string; optional `SITE_ORDERS_CHAT_ID` = the lead group id, otherwise the first ALLOWED_CHAT_IDS group is used) and the website Worker `CRM_ORDERS_URL` (https://<crm-domain>/website/api/orders) + `CRM_ORDERS_SECRET` (the same string). Deploy the CRM first (its workflow applies migration 063), then the site. No test order was sent to production: do one real order together and check the deal, the note and the Telegram message.
2. Review the local preview (catalog, AGNES, cart UA/RU) and approve going live (remove noindex, add to sitemap, link from the /dzerkala/ hub, deploy).
3. Purchase prices reach the Worker only through the secret `LED_MIRRORS_PRICES` (set on 2026-11-03; compact numeric table, never in Git or in the build). To update prices: `npm run led:build -- <supplier-catalog.json> --markup <factor>` then `npm run led:publish` (needs the local, gitignored worker/private files). If the secret is missing the calculator and orders answer a controlled error (no fake prices). `.dev.vars` is local only; CART_ORDER_DRY_RUN must never be set in production.
4. The old 'від 3 990 грн' on /dzerkala/led-dzerkala/ (title, R-069 protected until 2026-11-11), src/data/mirror-catalog.ts, ru/mirror-catalog.ru.ts and mirror-types.ts equals the supplier's price; the catalog shows the retail 'від 4 389 грн'. Approve changing those pages.
5. Price update: re-collect supplier catalog -> `npm run led:build -- <file> --markup <factor>` -> `npm run test:led-mirrors && npm run test:cart` -> build -> deploy.

# Google Merchant Center readiness — Space Glass shop (UA/RU, UAH)

Status 2026-11-03: **PARTIAL — not ready to connect.** Site-side data model, schema and a draft feed generator exist; several owner decisions and
legal/policy items are missing. Nothing is published, no feed URL exists, Merchant Center is not connected, no ads are planned here.
No GSC/GA4 performance data and no purchase prices are stored in this repository.

## 1. Product data (48 LED mirror models)

| Merchant field | State | Source / note |
|---|---|---|
| id | **READY** | `sg-led-{slug}[-WxH]` (stable, from the model slug) |
| title | READY | «Дзеркало {NAME} {W}×{H} мм» (real model names, unchanged) |
| description | READY (short, factual) | built from real attributes only (shape, frame, lighting, size) |
| link | READY | `https://space-glass.com.ua/shop/mirrors/led/{slug}/?size=WxH` (preselects that size; canonical stays the base URL) |
| image_link / additional_image_link | READY | 48/48 main photos ≥ 900 px; 39 items have extra photos. **Check**: Google bans promotional overlays / watermarks and requires the right to use the photos (owner confirmed supplier permission for the site; confirm it also covers advertising use). |
| price + currency | READY | retail UAH from the same server-side function as the page (draft feed cross-checked against the Worker secret: identical) |
| availability | **MISSING — owner** | stock is not tracked; for made-to-order goods the owner must choose the value and the handling time (see questions) |
| condition | **MISSING — owner** | proposed `new`, needs confirmation |
| brand | **MISSING — owner** | NOT filled: do not put "Space Glass" until the right to sell the supplier's models under the own brand is confirmed |
| gtin / mpn | **MISSING — owner** | none exist in our data; never invented. If the products truly have none, `identifier_exists = no` is allowed, but only on the owner's confirmation |
| google_product_category | PROPOSED | "Home & Garden > Decor > Mirrors" (verify the exact ID in the current Google taxonomy before publishing) |
| shipping / tax / returns | **MISSING — owner** | configured in Merchant Center, see section 5 |
| sku | READY | visible on the page and in Product JSON-LD: `SG-LED-{SLUG}` |
| variants (size) | READY | 185 real standard-size variants (4.0 per model on average) |
| additional functions | not in feed | selectable on the page (price changes), too many combinations — see section 3 |

## 2. Product structured data (current)

`Product` + `Offer` (price = price shown on load, `priceCurrency` UAH), `BreadcrumbList`, `sku`, photos, description that matches visible text.
Deliberately **not** emitted: `brand`, `gtin`/`mpn`, `availability`, `itemCondition`, `aggregateRating`, `review`, `FAQPage` — each would claim something that is
not confirmed or not visible. Add `availability` / `itemCondition` / `brand` only after the owner decisions above, and only when the same fact is visible on the page.
`ProductGroup` is **not** used yet: it needs the variants to be real separate offers with their own visible price; today one URL shows all sizes. Revisit only if
variant URLs are ever created (not recommended, see section 3).
FAQ: the shop FAQ is plain accordion content (10 questions per page), without FAQPage markup — Google limits FAQ rich results, and the FAQ is written for customers.

## 3. Variants: one model = one product, or sizes as variants?

| | A. one model = one item (price "from") | B. one item per STANDARD size (default options), grouped by model |
|---|---|---|
| Google price rule | **Risky**: price must equal the landing-page price of that item; "from" is the minimum size but the page opens on another selection | **Compliant**: `?size=WxH` preselects exactly that size and shows exactly the feed price |
| Price accuracy | needs a "from" convention Google may disapprove | exact (fixed standard-size prices) |
| Buyer experience | simple | the ad shows the size the buyer clicked |
| Scalability | 48 items | ≈185 items (not thousands) |
| Extra URLs | none | none: query parameter only, canonical stays the model URL |
| Custom sizes / functions | not representable | not in the feed (shown on the page) |

**Recommendation: B, restricted to standard sizes with default options.** Every feed item has an exact price and a selectable configuration on the landing page.
Function combinations and custom sizes stay on the page only. Do not create thousands of combinations. The `?size=` preselect is implemented on the product page.

## 4. Price parity (critical)

Retail price = ceil(purchase total × markup); the formula and purchase prices live only in the Worker secret. The page, the cart and the draft feed use the same
function. A feed item = standard size + default options = the page after `?size=WxH` with nothing else changed (verified by `npm run feed:draft`).
Rules to keep: (1) publish the feed only after `led:build` + `led:publish` ran for the same price list; (2) any price change → regenerate and re-submit the feed
the same day (a stale feed price is a Google policy violation); (3) never use "from" prices in the feed.

## 5. Delivery, payment, returns, seller information

| Requirement | State |
|---|---|
| Seller / contact data | exists (`/contacts/`, `/about/`, legal entity data); show full seller details required for Merchant Center |
| Privacy policy | exists (`/privacy-policy/`) |
| Terms | page exists (`/terms/`) — review for the shop (distance sales) |
| Payment info | `/delivery-payment/` describes cashless/cash and prepayment; **no online payment** in the shop — Merchant Center needs the real checkout flow to match |
| Delivery across Ukraine | described generally; **no delivery cost / time per product** in the shop — needs shipping settings in Merchant Center |
| Returns | **no returns/exchange policy page** |
| Made-to-order terms | **not defined** |

Ukrainian-law points to be confirmed by a lawyer before publishing (not legal advice): the Law «Про захист прав споживачів» (distance contracts, the
consumer's right to withdraw within the legal period and its exceptions for goods made to the consumer's individual specification) and the Law «Про електронну
комерцію» (information the seller must give). Whether a *standardized* made-to-order mirror falls under the individual-specification exception must not be
assumed either way.

## 6. Owner questions (blocking Merchant Center)

1. Availability value and production/handling time for made-to-order mirrors (what do we promise, and can we keep it?).
2. Brand: may products be sold under "Space Glass"? If not, which brand/manufacturer name is correct and publishable?
3. GTIN/MPN: do the products have manufacturer codes? If none, confirm `identifier_exists = no`.
4. Condition `new` — confirm.
5. Shipping: delivery cost rule (Nova Poshta tariffs? free above X?), delivery time, regions.
6. Returns / exchange policy and the wording for made-to-order goods (legal review).
7. Payment: which methods will the checkout support at launch (the cart is a request flow without online payment)?
8. Photo rights for advertising use; confirm there are no watermarks/branding of the supplier on the photos used in the feed.
9. Who updates prices and the feed, and how often.

## 7. Feed architecture (proposed, not built beyond the draft)

- Source of truth: `public.json` (names, sizes, photos) + the Worker price function. A Worker route (e.g. `/feeds/merchant.tsv`) can render the feed at request time from the
  secret-backed prices, cached for a short time, so prices can never drift from the site. The local draft generator proves the format and parity.
- Publish only after sections 5 and 6 are answered. Until then the route must not exist.
- Merchant Center fetch: scheduled URL fetch of the TSV (HTTPS), UAH, language uk, country UA.

# Shop launch checklist (ordered by technical dependency)

Everything under `/shop/` is `noindex`, outside the sitemap, and not deployed. Do not skip the order: later steps depend on the earlier ones.

1. **Design complete and approved** — catalog, product pages, cart (owner review of the local preview, UA and RU, desktop and mobile).
2. **Product data verified** — names, photos (rights incl. advertising use), characteristics, size limits, option names (owner spot-check of a sample of models).
3. **Retail prices verified** — run `npm run led:build` + `led:publish` for the current supplier price list, `npm run test:led-secret` (20,000 configurations) and `npm run feed:draft`; owner compares a sample with the supplier list.
4. **Cloudflare build green** — PR #59 build must pass (earlier failure: `_redirects` dynamic-rule limit; fix = static per-model redirect rules).
5. **CRM** — merge CRM PR #2 first, deploy the CRM from `fix/crm-telegram-auth-signature`, secrets `WEBSITE_ORDER_SECRET`, `SITE_ORDERS_CHAT_ID` (set), migration 063 applied by the workflow.
6. **Checkout** — website secrets `CRM_ORDERS_URL`, `CRM_ORDERS_SECRET`, `LED_MIRRORS_PRICES` (set); never `CART_ORDER_DRY_RUN` in production.
7. **Delivery, payment, returns, seller information** — owner decisions and legal review (see `docs/MERCHANT-CENTER-READINESS.md` §5–6); publish the returns/made-to-order terms.
8. **Production deployment** — merge PR #59 only after 4–7; verify `/shop/` and a product page on production while still noindex.
9. **Real test order** — one order with the owner: deal, note and Telegram message in the CRM; remove the test deal afterwards.
10. **Remove noindex** — owner approval; keep canonical/hreflang as built; after R-069 freeze (ends 2026-11-11) if the shop links to protected pages.
11. **Update the sitemap** — add the shop URLs (UA + RU, hreflang pairs) in the same release as step 10.
12. **Check Product structured data** — Rich Results Test on a sample, Search Console enhancements; add `availability` / `itemCondition` / `brand` only with confirmed owner decisions.
13. **Connect Merchant Center** — claim the site, set shipping/returns/tax, publish the feed route (only then), review Diagnostics until there are no price/availability mismatches.
14. **Prepare advertising campaigns** — only after the feed is approved and the first orders are confirmed; campaigns are out of scope of this repository.

Related open items: product order in the catalog (owner to name the card, see `docs/SEO-OWNER-ACTIONS.md`), the two filter hints (price "from", size meaning), home-page block (prepared, not published), R-069 LED-page block.

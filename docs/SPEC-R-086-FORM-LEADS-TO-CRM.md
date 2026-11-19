# R-086 — website form leads to the CRM (specification, NOT implemented)

Status: draft for owner review, 2026-11-19. Roadmap: [R-086](SEO-ROADMAP.md). No secrets, customer data or CRM internals are recorded here.

## 1. How a form lead travels today (verified in code)
1. `public/js/forms.js`: every `[data-lead-form]` sends `POST /api/kommo-lead` (JSON, or multipart when a file is attached) with header `x-sg-form: 1`. The body carries `lead_id` (a random UUID: one per submission, reused on retry, new after a success), page, locale, market, and attribution fields only with analytics consent.
2. `worker/index.ts` → `handleLead` (the Worker runs first for `/api/*`, see `wrangler.jsonc`): honeypot, `_js` marker, header and Origin checks, link / CJK / name filters (spam gets a fake `{ok:true}` without `lead_sent`), phone validation (libphonenumber, E.164), 5 leads/min per IP.
3. Delivery: `Promise.allSettled(Telegram, optional Resend e-mail)`. If at least one channel accepted → `{ok:true, lead_sent:true}` (the browser then sends GA4 `generate_lead`); otherwise `502 delivery_failed`.
4. There is NO CRM write and NO idempotency on the server: `lead_id` is only printed in the Telegram/e-mail text. `src/pages/api/kommo-lead.ts` (Kommo) is an unused static stub because the Worker answers that path first.

## 2. Can the cart integration be reused?
Partly. Reusable as is: the signed server-to-server call in `worker/index.ts` (`signOrder`: HMAC-SHA256 over `"<timestamp>.<body>"`, headers `x-sg-timestamp` / `x-sg-signature`, secrets `CRM_ORDERS_URL`, `CRM_ORDERS_SECRET`, 10 s timeout) and the status mapping in `worker/cart-order.ts`.
NOT reusable without a CRM change: the cart payload has `source: "Space Glass Website Cart"` (the CRM accepts that source only) and requires `items`. A form lead has no items. The CRM owner must add a contract for a plain lead, for example `source: "Space Glass Website Form"`, `kind: "lead"`, with `customer {name, phone, email?}`, `request {product, configuration, city, comment, page, locale, market}`, optional `attribution` (only what the visitor consented to). Attachments stay in Telegram; the CRM receives only a flag `has_attachment`.

## 3. Requirements
- Telegram/e-mail stay the first channels; the CRM is an additional channel. `lead_sent:true` is returned if ANY channel accepted (today's guarantee is kept). A CRM failure is logged with `lead_id` only (no PII) for manual reconciliation.
- Idempotency key = `lead_id` (UUID, 36 chars, fits the existing 8–64 pattern). The CRM must store it UNIQUE. A repeated `lead_id` with the same content must answer `200` with the same `lead_ref` (and `duplicate:true`), not `409`. If the browser sent no `lead_id` (very old browsers), the Worker generates one and does not retry the CRM write.
- Spam (any `spamReasons`) and validation errors are never written to the CRM.
- Do not change the browser contract (`lead_sent`, error codes) or the GA4 rule: `generate_lead` only after server confirmation, no personal data. `lead_id` already travels in the event and can be matched to the CRM record.
- Do not change GA4 settings (e.g. registering `lead_id` as a custom dimension) without owner approval.

## 4. Acceptance tests (mocked CRM, like `scripts/test-cart-order.mjs`)
1) CRM ok → one record, `lead_sent:true`. 2) CRM down, Telegram ok → still `lead_sent:true`, failure logged. 3) Same `lead_id` twice → one CRM record, second answer `duplicate:true`. 4) Spam / invalid phone → no CRM call. 5) File attached → no file bytes sent to the CRM. 6) Logs contain no name, phone or comment.

## 5. Open questions for the CRM owner
Endpoint and contract for a plain lead; source name; whether a repeated key returns 200 or 409 (see section 6); field mapping for city and market; who is notified (the CRM currently sends its own Telegram message for cart orders, which would duplicate the Worker's message).

## 6. Cart: lost response, then `duplicate:true` (reproduced, no code changed)
Test: real `worker/cart-order.ts` bundled with esbuild, mocked CRM, client rules copied from `ProjectCart.astro` (event only when `!r.duplicate`; on `order_conflict` the client drops the order id). Run on 2026-11-19:

| Scenario | CRM orders | `generate_lead` |
|---|---|---|
| S1 first response lost, retry hits the Worker cache (same data centre) → `duplicate:true` | 1 | 0 (undercount) |
| S2 cache miss, CRM answers 200 with the same ref | 1 | 1 (correct) |
| S3 cache miss, CRM answers 409 for a repeated `order_id` → `order_conflict` → client creates a NEW order id on the next click | 2 (hypothetical duplicate order) | 1 |

S1 is confirmed by the test. S3 depends on how the real CRM treats a repeated `order_id`; the CRM code is not in this repository, so it is UNVERIFIED. Recommended (separate approval): the CRM answers an identical repeated `order_id` with 200 and the same `order_ref`; the cart sends `generate_lead` once per `order_id` even when `duplicate:true`, guarded by a local marker, so a lost first answer is not under-counted.

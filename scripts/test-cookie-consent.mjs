// End-to-end test of the cookie banner (two independent choices) on the BUILT site (dist/).  Run: npm run build && npm run test:cookie-consent
// Needs Playwright (require('playwright') available); skipped with a message when it is not installed or dist/ is missing.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const dist = new URL('../dist/', import.meta.url).pathname;
if (!fs.existsSync(path.join(dist, 'index.html'))) { console.warn('SKIPPED: dist/ is missing (run npm run build)'); process.exit(0); }
let chromium;
try { ({ chromium } = createRequire(import.meta.url)('playwright')); } catch { console.warn('SKIPPED: playwright is not installed'); process.exit(0); }

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = path.join(dist, p);
  if (!f.startsWith(dist)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;
const GCLID = 'Cj0KCQiA_e2e-GCLID_1234567890';
const browser = await chromium.launch();
let failed = 0;
const t = async (name, fn) => {
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  const google = [];
  await page.route('**/*', (route) => { const u = route.request().url(); if (!u.startsWith(base)) { google.push(u); return route.abort(); } return route.continue(); });
  try { await fn(page, google, ctx); console.log('ok   ', name); } catch (e) { failed++; console.error('FAIL ', name, '-', e.message); }
  await ctx.close();
};
const ls = (page, k) => page.evaluate((key) => localStorage.getItem(key), k);
const banner = (page) => page.locator('[data-cookie-consent]');
const settings = async (page) => { if (await page.locator('[data-cc-ads]').isHidden()) await page.locator('[data-cookie-more]').click(); };      // «Налаштувати»
const dl = (page) => page.evaluate(() => (window.dataLayer || []).map((a) => Array.from(a)));

await t('first visit: banner shown, both choices unticked, nothing stored, no Google request, no click id kept', async (page, google) => {
  await page.goto(`${base}/?gclid=${GCLID}`);
  await banner(page).waitFor({ state: 'visible' });
  assert.equal(await page.locator('[data-cc-ads]').isHidden(), true, 'compact view first: the choices are behind «Налаштувати»');
  assert.equal(await page.locator('[data-cookie-save]').isHidden(), true);
  await settings(page);
  assert.equal(await page.locator('[data-cc-analytics]').isChecked(), false);
  assert.equal(await page.locator('[data-cc-ads]').isChecked(), false);
  for (const k of ['sg-cookie-consent', 'sg-ad-consent', 'sg-ad-click', 'sg-attr']) assert.equal(await ls(page, k), null, k);
  assert.equal(await page.evaluate(() => window.sgAdAttribution && window.sgAdAttribution()), null);
  assert.equal(google.filter((u) => /googletagmanager|google-analytics/.test(u)).length, 0);
  assert.equal(await page.locator('[data-cookie-accept]').isVisible() && await page.locator('[data-cookie-reject]').isVisible() && await page.locator('[data-cookie-save]').isVisible(), true);
});
await t('advertising only: click id of the current page is stored, analytics stays off (no Google tag)', async (page, google) => {
  await page.goto(`${base}/?gclid=${GCLID}`); await banner(page).waitFor({ state: 'visible' });
  await settings(page); await page.locator('[data-cc-ads]').check(); await page.locator('[data-cookie-save]').click();
  assert.equal(await ls(page, 'sg-ad-consent'), 'granted'); assert.equal(await ls(page, 'sg-cookie-consent'), 'necessary');
  const a = await page.evaluate(() => window.sgAdAttribution());
  assert.equal(a.gclid, GCLID); assert.deepEqual(a.consent, { ad_user_data: 'granted', ad_personalization: 'granted' });
  assert.equal(await ls(page, 'sg-attr'), null, 'analytics attribution must not start');
  assert.equal(google.filter((u) => /googletagmanager/.test(u)).length, 0, 'GA4 must not load without the analytics choice');
  await page.goto(`${base}/dzerkala/`);      // same ad id survives a navigation (≤ 90 days)
  assert.equal((await page.evaluate(() => window.sgAdAttribution())).gclid, GCLID);
});
await t('analytics only: Google tag starts with advertising consent DENIED; no click id is stored', async (page, google) => {
  await page.goto(`${base}/?gclid=${GCLID}`); await banner(page).waitFor({ state: 'visible' });
  await settings(page); await page.locator('[data-cc-analytics]').check(); await page.locator('[data-cookie-save]').click();
  await page.waitForTimeout(300);
  assert.equal(await ls(page, 'sg-ad-consent'), 'denied'); assert.equal(await ls(page, 'sg-ad-click'), null);
  const def = (await dl(page)).find((e) => e[0] === 'consent' && e[1] === 'default');
  assert.deepEqual(def[2], { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
  assert.ok(google.some((u) => /googletagmanager/.test(u)), 'the tag is requested after analytics consent');
  assert.equal(await page.evaluate(() => window.sgAdAttribution()), null);
});
await t('accept all: both granted in Consent Mode; changing the decision updates it; withdrawing advertising clears the id', async (page) => {
  await page.goto(`${base}/?gclid=${GCLID}`); await banner(page).waitFor({ state: 'visible' });
  await page.locator('[data-cookie-accept]').click(); await page.waitForTimeout(300);
  const def = (await dl(page)).find((e) => e[0] === 'consent' && e[1] === 'default');
  assert.deepEqual(def[2], { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
  assert.equal((await page.evaluate(() => window.sgAdAttribution())).gclid, GCLID);
  // change the decision from the footer button: advertising off, analytics stays on → Consent Mode update + id removed (no reload needed)
  await page.locator('[data-cookie-settings]').first().click(); await banner(page).waitFor({ state: 'visible' });
  assert.equal(await page.locator('[data-cc-analytics]').isChecked(), true); assert.equal(await page.locator('[data-cc-ads]').isChecked(), true);
  await page.locator('[data-cc-ads]').uncheck(); await page.locator('[data-cookie-save]').click();
  assert.equal(await ls(page, 'sg-ad-consent'), 'denied'); assert.equal(await ls(page, 'sg-ad-click'), null);
  assert.equal(await page.evaluate(() => window.sgAdAttribution()), null);
  const upd = (await dl(page)).filter((e) => e[0] === 'consent' && e[1] === 'update').pop();
  assert.deepEqual(upd[2], { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  assert.equal(await ls(page, 'sg-cookie-consent'), 'all');      // analytics is independent
});
await t('reject all: nothing stored, nothing sent', async (page, google) => {
  await page.goto(`${base}/?gclid=${GCLID}`); await banner(page).waitFor({ state: 'visible' });
  await page.locator('[data-cookie-reject]').click();
  assert.equal(await ls(page, 'sg-ad-consent'), 'denied'); assert.equal(await ls(page, 'sg-cookie-consent'), 'necessary');
  for (const k of ['sg-ad-click', 'sg-attr']) assert.equal(await ls(page, k), null);
  assert.equal(await page.evaluate(() => window.sgAdAttribution()), null);
  assert.equal(google.filter((u) => /googletagmanager|google-analytics/.test(u)).length, 0);
  assert.equal(await banner(page).isHidden(), true);
});
await t('returning visitor who decided on analytics before the advertising choice existed is asked again; the old choice is kept', async (page) => {
  await page.addInitScript(() => { try { localStorage.setItem('sg-cookie-consent', 'all'); } catch {} });
  await page.goto(`${base}/`); await banner(page).waitFor({ state: 'visible' }); await settings(page);
  assert.equal(await page.locator('[data-cc-analytics]').isChecked(), true); assert.equal(await page.locator('[data-cc-ads]').isChecked(), false);
  assert.equal(await ls(page, 'sg-ad-consent'), null);
});
await t('withdrawing advertising removes Google Ads cookies the site can see (_gcl_*)', async (page) => {
  await page.goto(`${base}/`); await banner(page).waitFor({ state: 'visible' });
  await page.locator('[data-cookie-accept]').click();
  await page.evaluate(() => { document.cookie = '_gcl_aw=GCL.1.test; path=/'; document.cookie = '_gcl_au=1.1.test; path=/'; });
  await page.locator('[data-cookie-settings]').first().click(); await banner(page).waitFor({ state: 'visible' });
  await page.locator('[data-cc-ads]').uncheck(); await page.locator('[data-cookie-save]').click();
  assert.equal(await page.evaluate(() => document.cookie.includes('_gcl_')), false);
});
await t('Ukrainian and Russian banners: texts, separate «Рекламні / Рекламные cookies», compact view + settings', async (page) => {
  await page.goto(`${base}/`); await banner(page).waitFor({ state: 'visible' });
  const uk = await banner(page).innerText();
  await settings(page); const uk2 = await banner(page).innerText();
  for (const s of ['Лише необхідні', 'Прийняти', 'Налаштувати']) assert.ok(uk.includes(s), 'UA compact: ' + s);
  for (const s of ['Аналітичні cookies', 'Рекламні cookies', 'Зберегти вибір']) assert.ok(uk2.includes(s), 'UA settings: ' + s);
  await page.goto(`${base}/ru/`); await banner(page).waitFor({ state: 'visible' });
  const ru = await banner(page).innerText();
  await settings(page); const ru2 = await banner(page).innerText();
  for (const s of ['Только необходимые', 'Принять', 'Настроить']) assert.ok(ru.includes(s), 'RU compact: ' + s);
  for (const s of ['Аналитические cookies', 'Рекламные cookies', 'Сохранить выбор']) assert.ok(ru2.includes(s), 'RU settings: ' + s);
});
await t('mobile: the banner fits the screen (no horizontal scroll) and all buttons are reachable', async (page) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto(`${base}/`); await banner(page).waitFor({ state: 'visible' });
  const m = await page.evaluate(() => { const b = document.querySelector('[data-cookie-consent]').getBoundingClientRect(); return { right: b.right, bottom: b.bottom, sw: document.documentElement.scrollWidth, w: innerWidth, h: innerHeight }; });
  assert.ok(m.right <= m.w && m.bottom <= m.h && m.sw <= m.w, JSON.stringify(m));
  await page.locator('[data-cookie-accept]').scrollIntoViewIfNeeded(); assert.equal(await page.locator('[data-cookie-accept]').isVisible(), true);
});

await browser.close(); server.close();
if (failed) process.exit(1);
console.log('all cookie consent tests passed');

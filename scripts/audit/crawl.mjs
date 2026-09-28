// Headless crawl of every sitemap URL in a real Chrome: console errors, JS exceptions,
// failed / 4xx-5xx requests, horizontal overflow per viewport width and layout shift (CLS).
//
//   npm i --no-save puppeteer-core           # once (uses the locally installed Chrome)
//   node scripts/audit/serve-dist.mjs &      # production build on http://localhost:4499
//   node scripts/audit/crawl.mjs                                  # all sitemap URLs @ 375px
//   node scripts/audit/crawl.mjs --widths 375,390,430,768,1024,1440,1920 / /ru/ /contacts/
//
// CHROME_PATH overrides the Chrome binary. Exit code 1 when any page has an issue.
import fs from 'node:fs';
import path from 'node:path';

let puppeteer;
try { puppeteer = (await import('puppeteer-core')).default; }
catch { console.error('puppeteer-core is not installed: npm i --no-save puppeteer-core'); process.exit(2); }

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args.splice(i, 2)[1] : def; };
const base = opt('base', 'http://localhost:4499').replace(/\/$/, '');
const widths = opt('widths', '375').split(',').map(Number);
const concurrency = Number(opt('concurrency', '6'));
const chromePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let paths = args;
if (!paths.length) {
  const xml = fs.readFileSync(path.join('dist', 'sitemap.xml'), 'utf8');
  paths = [...xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1]);
}

const browser = await puppeteer.launch({ executablePath: chromePath, headless: true, args: ['--no-sandbox'] });
const problems = [];

async function check(p, width) {
  const page = await browser.newPage();
  const issues = [];
  await page.setViewport({ width, height: width < 768 ? 812 : 900, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768 });
  await page.evaluateOnNewDocument(() => {
    window.__cls = 0;
    new PerformanceObserver((list) => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; })
      .observe({ type: 'layout-shift', buffered: true });
  });
  page.on('console', (m) => { if (m.type() === 'error') issues.push(`console: ${m.text().slice(0, 160)}`); });
  page.on('pageerror', (e) => issues.push(`exception: ${String(e.message).slice(0, 160)}`));
  page.on('requestfailed', (r) => { if (!/google|facebook|doubleclick/.test(r.url())) issues.push(`failed: ${r.url()} ${r.failure()?.errorText}`); });
  page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(base)) issues.push(`HTTP ${r.status()}: ${r.url().replace(base, '')}`); });
  try {
    const res = await page.goto(base + p, { waitUntil: 'load', timeout: 30000 });
    if (!res || res.status() !== 200) issues.push(`page status ${res?.status()}`);
    // scroll through the page so lazy images / below-the-fold components load
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 300));
    const info = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;
      let culprit = '';
      if (overflow > 1) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.right > doc.clientWidth + 1 && r.width > 0 && getComputedStyle(el).position !== 'fixed') {
            culprit = `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`; break;
          }
        }
      }
      const brokenImgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.src && !i.src.startsWith('data:')).map((i) => i.currentSrc || i.src);
      return { overflow, culprit, cls: window.__cls, brokenImgs };
    });
    if (info.overflow > 1) issues.push(`horizontal overflow ${info.overflow}px (${info.culprit})`);
    if (info.cls > 0.1) issues.push(`CLS ${info.cls.toFixed(3)}`);
    for (const src of info.brokenImgs) issues.push(`broken image ${src.replace(base, '')}`);
  } catch (e) {
    issues.push(`navigation error: ${e.message.slice(0, 120)}`);
  }
  await page.close();
  if (issues.length) problems.push({ path: p, width, issues: [...new Set(issues)] });
}

const queue = paths.flatMap((p) => widths.map((w) => [p, w]));
let done = 0;
await Promise.all(Array.from({ length: concurrency }, async () => {
  while (queue.length) {
    const [p, w] = queue.shift();
    await check(p, w);
    if (++done % 50 === 0) console.error(`… ${done} checks`);
  }
}));
await browser.close();

console.log(`Crawled ${paths.length} URLs × ${widths.length} widths (${widths.join(', ')}px)`);
const grouped = new Map();
for (const pr of problems) for (const is of pr.issues) {
  const key = is.replace(/\d+(\.\d+)?px|\d\.\d{3}/g, 'N');
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push(`${pr.path} @${pr.width} — ${is}`);
}
for (const [key, list] of [...grouped].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n${list.length}× ${key}`);
  for (const l of list.slice(0, 12)) console.log(`   ${l}`);
}
if (!problems.length) console.log('No console errors, failed requests, overflow or CLS issues.');
process.exit(problems.length ? 1 : 0);

// Pre-deploy test: runs every CSV row through the Worker code (no network for the Worker itself).
import fs from 'node:fs';
const src = fs.readFileSync(new URL('./src/index.js', import.meta.url), 'utf8')
  .replace("import mapping from './mapping.json';", `const mapping = ${fs.readFileSync(new URL('./src/mapping.json', import.meta.url), 'utf8')};`);
fs.writeFileSync('/tmp/legacy-worker-test.mjs', src);
const worker = (await import('/tmp/legacy-worker-test.mjs')).default;
const csv = fs.readFileSync(process.argv[2], 'utf8').trim().split('\n').slice(1).map((l) => l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"')));
let fail = 0, n = 0;
const call = async (u) => worker.fetch(new Request(u, { redirect: 'manual' }));
for (const [legacy, , , , , target, cls] of csv) {
  const u = new URL(legacy);
  const decoded = decodeURIComponent(u.pathname);
  const variants = new Set([u.pathname, u.pathname.endsWith('/') ? u.pathname.slice(0, -1) || '/' : u.pathname + '/', encodeURI(decoded), decoded]);
  const hostsToTest = ['dyshovi.space-glass.com.ua', 'ua.space-glass.com.ua', 'bezramne.space-glass.com.ua'].includes(u.hostname) ? [u.hostname, 'www.' + u.hostname] : [u.hostname];
  for (const hostName of hostsToTest) for (const v of variants) {
    for (const q of ['', '?utm_source=x&a=1']) {
      n++;
      const r = await call(`https://${hostName}${v}${q}`);
      const ok = cls === 'A' ? r.status === 301 && r.headers.get('location') === target : r.status === 410;
      if (!ok) { fail++; console.log('FAIL', cls, hostName + v + q, r.status, r.headers.get('location'), 'want', target || 410); }
    }
  }
}
for (const [u, want] of [['https://dyshovi.space-glass.com.ua/kiev', 410], ['https://dyshovi.space-glass.com.ua/random-page', 404], ['https://ua.space-glass.com.ua/kabinka99', 404], ['https://vikna.space-glass.com.ua/wp-admin/', 404],
  ['https://dyshovi.space-glass.com.ua/robots.txt', 200], ['https://vikna.space-glass.com.ua/sitemap_index.xml', 410], ['https://vikna.space-glass.com.ua/page-sitemap.xml', 410], ['https://ua.space-glass.com.ua/sitemap.xml', 410], ['https://dyshovi.space-glass.com.ua/dushevie-kabinu%', 404],
  ['https://bezramne.space-glass.com.ua/random-page', 404], ['https://bezramne.space-glass.com.ua/sitemap.xml', 410], ['https://bezramne.space-glass.com.ua/robots.txt', 200], ['https://www.bezramne.space-glass.com.ua/error', 410],
  // NEEDS APPROVAL (mapping-bezramne-pending.csv): not active yet, so they answer 404 until approved and moved into mapping.csv
  ['https://bezramne.space-glass.com.ua/skladnue', 404], ['https://bezramne.space-glass.com.ua/butterfly', 404], ['https://bezramne.space-glass.com.ua/floppyspin', 404], ['https://bezramne.space-glass.com.ua/floppyparking', 404], ['https://bezramne.space-glass.com.ua/o-nas', 404], ['https://bezramne.space-glass.com.ua/ourwork', 404]]) {
  n++; const r = await call(u); if (r.status !== want) { fail++; console.log('FAIL', u, r.status, 'want', want); }
  if (r.status === 301) { fail++; console.log('FAIL redirect on special', u); }
}
const robots = await (await call('https://ua.space-glass.com.ua/robots.txt')).text();
if (/sitemap/i.test(robots)) { fail++; console.log('FAIL robots lists sitemap'); }
console.log(`${n} checks, ${fail} failures`);
process.exit(fail ? 1 : 0);

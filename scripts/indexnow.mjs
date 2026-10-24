// Submits sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver; Google ignores IndexNow).
// Run AFTER the deploy is live, because the engines fetch the key file from the site first.
//   npm run indexnow            → all URLs of dist/sitemap.xml
//   npm run indexnow -- --dry   → print what would be sent
//   npm run indexnow -- /a/ /b/ → only these paths
import fs from 'node:fs';
import { HOST, KEY, ORIGIN } from './lib/indexnow-core.mjs';

// Manual submit. The automatic post-deploy run is scripts/indexnow-auto.mjs (changed URLs only).
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const paths = args.filter((a) => a.startsWith('/'));

let urls;
if (paths.length) urls = paths.map((p) => ORIGIN + p);
else urls = [...fs.readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const keyLocation = `${ORIGIN}/${KEY}.txt`;
const keyCheck = await fetch(keyLocation).then((r) => r.text()).catch(() => '');
if (keyCheck.trim() !== KEY) {
  console.error(`Key file is not live yet at ${keyLocation} — deploy first.`);
  if (!dry) process.exit(1);
}
console.log(`IndexNow: ${urls.length} URL(s) → ${HOST}`);
if (dry) process.exit(0);

for (let i = 0; i < urls.length; i += 10000) {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList: urls.slice(i, i + 10000) })
  });
  console.log(`batch ${i / 10000 + 1}: HTTP ${res.status} ${res.statusText}`);
  if (res.status !== 200 && res.status !== 202) { console.error(await res.text()); process.exit(1); }
}

// Live audit of public/_redirects against a running `wrangler dev` (default http://localhost:8788):
// every static rule must answer with its status and Location, and the target must be 200 (no chain, no loop, no 404).
import fs from 'node:fs';
const base = process.argv[2] ?? 'http://localhost:8788';
const rules = fs.readFileSync('public/_redirects', 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map((l) => l.split(/\s+/));
let stat = 0, dyn = 0, bad = [], chain = [], checked = 0;
for (const [from, to, code = '301'] of rules) {
  if (/[*:]/.test(from)) { dyn++; continue; }
  stat++;
  const r = await fetch(base + from, { redirect: 'manual' });
  const loc = r.headers.get('location') ?? '';
  const want = to.replace(/^https?:\/\/[^/]+/, '');
  checked++;
  if (String(r.status) !== code || loc.replace(/^https?:\/\/[^/]+/, '') !== want) { bad.push(`${from} -> ${r.status} ${loc} (want ${code} ${to})`); continue; }
  if (/^https?:/.test(to) && !to.startsWith(base)) continue;
  const t = await fetch(base + want, { redirect: 'manual' });
  if (t.status !== 200) chain.push(`${from} -> ${want} answers ${t.status}`);
}
console.log(`rules: ${rules.length} (static ${stat}, wildcard/placeholder ${dyn}); static checked live: ${checked}`);
console.log(`wrong status/location: ${bad.length}`); bad.slice(0, 15).forEach((x) => console.log('  ' + x));
console.log(`targets not 200 (chain/404/loop): ${chain.length}`); chain.slice(0, 15).forEach((x) => console.log('  ' + x));

// Runs Lighthouse (mobile + desktop) against a list of paths and prints a score table plus
// every failing audit, so systemic problems in shared layouts/components show up at once.
//
//   node scripts/audit/serve-dist.mjs 4499 &              # production build, prod-like server
//   node scripts/audit/lighthouse.mjs --base http://localhost:4499 --runs 3 / /ru/ /dushovi-kabiny/
//   node scripts/audit/lighthouse.mjs --file paths.txt --form mobile
//
// Uses the Lighthouse CLI (LIGHTHOUSE_BIN, else `npx --yes lighthouse@13`) and the local Chrome.
// Results: seo-audit/lighthouse/<timestamp>/{summary.json,summary.md,*.json}
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args.splice(i, 2)[1] : def; };
const base = opt('base', 'http://localhost:4499').replace(/\/$/, '');
const runs = Number(opt('runs', '1'));
const forms = opt('form', 'mobile,desktop').split(',');
const file = opt('file', '');
const outDir = opt('out', path.join('seo-audit', 'lighthouse', new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)));
const paths = [...args, ...(file ? fs.readFileSync(file, 'utf8').split('\n').map((s) => s.trim()).filter((s) => s && !s.startsWith('#')) : [])];
if (!paths.length) { console.error('No paths given'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

const bin = process.env.LIGHTHOUSE_BIN ? [process.env.LIGHTHOUSE_BIN] : ['npx', '--yes', 'lighthouse@13'];
const categories = ['performance', 'accessibility', 'best-practices', 'seo'];

function runOnce(url, form, n) {
  const slug = (url.replace(base, '').replace(/[^a-z0-9]+/gi, '_') || 'home').replace(/^_|_$/g, '') || 'home';
  const out = path.join(outDir, `${slug}.${form}.${n}.json`);
  const flags = [url, '--output=json', `--output-path=${out}`, '--quiet',
    '--chrome-flags=--headless=new --no-sandbox', `--only-categories=${categories.join(',')}`];
  if (form === 'desktop') flags.push('--preset=desktop');
  try { execFileSync(bin[0], [...bin.slice(1), ...flags], { stdio: 'ignore', timeout: 180000 }); }
  catch { /* Lighthouse exits non-zero on runtime errors; the JSON still carries them */ }
  return JSON.parse(fs.readFileSync(out, 'utf8'));
}

function summarize(lhr) {
  const scores = Object.fromEntries(categories.map((c) => [c, Math.round((lhr.categories[c]?.score ?? 0) * 100)]));
  const a = lhr.audits;
  const metrics = {
    FCP: a['first-contentful-paint']?.numericValue, LCP: a['largest-contentful-paint']?.numericValue,
    TBT: a['total-blocking-time']?.numericValue, CLS: a['cumulative-layout-shift']?.numericValue, SI: a['speed-index']?.numericValue
  };
  const failing = [];
  for (const c of categories) for (const ref of lhr.categories[c]?.auditRefs ?? []) {
    const au = a[ref.id];
    if (!au || au.score === null || au.score >= 0.9 || ['notApplicable', 'manual', 'informative'].includes(au.scoreDisplayMode)) continue;
    if (c === 'performance' && ref.weight === 0 && au.scoreDisplayMode !== 'metricSavings') continue;
    failing.push({ category: c, id: ref.id, score: au.score, weight: ref.weight, title: au.title, display: au.displayValue ?? '' });
  }
  const lcpEl = a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet
    ?? a['lcp-breakdown-insight']?.details?.items?.find?.((i) => i.type === 'node')?.snippet ?? '';
  return { scores, metrics, failing, lcpEl, runtimeError: lhr.runtimeError?.code };
}

const results = [];
for (const p of paths) {
  const url = p.startsWith('http') ? p : base + p;
  for (const form of forms) {
    const all = [];
    for (let n = 0; n < runs; n++) all.push(summarize(runOnce(url, form, n)));
    all.sort((x, y) => x.scores.performance - y.scores.performance);
    const median = all[Math.floor(all.length / 2)];
    results.push({ path: p, form, ...median, perfRuns: all.map((r) => r.scores.performance) });
    const s = median.scores;
    console.log(`${form.padEnd(7)} P${String(s.performance).padStart(4)} A${String(s.accessibility).padStart(4)} BP${String(s['best-practices']).padStart(4)} SEO${String(s.seo).padStart(4)}  LCP ${Math.round(median.metrics.LCP)}ms CLS ${median.metrics.CLS?.toFixed(3)} TBT ${Math.round(median.metrics.TBT)}ms  ${p}`);
    for (const f of median.failing) console.log(`         - [${f.category}] ${f.id} (${f.score}) ${f.display}`);
  }
}

fs.writeFileSync(path.join(outDir, 'summary.json'), JSON.stringify(results, null, 2));
const md = ['| Page | Form | Perf | A11y | BP | SEO | LCP ms | CLS | TBT ms | Failing audits |', '|---|---|---|---|---|---|---|---|---|---|',
  ...results.map((r) => `| ${r.path} | ${r.form} | ${r.scores.performance} | ${r.scores.accessibility} | ${r.scores['best-practices']} | ${r.scores.seo} | ${Math.round(r.metrics.LCP)} | ${r.metrics.CLS?.toFixed(3)} | ${Math.round(r.metrics.TBT)} | ${r.failing.map((f) => f.id).join(', ')} |`)];
fs.writeFileSync(path.join(outDir, 'summary.md'), md.join('\n') + '\n');
console.log(`\nSaved to ${outDir}`);

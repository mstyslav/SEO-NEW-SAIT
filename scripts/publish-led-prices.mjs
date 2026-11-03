// Sends worker/private/led-mirrors.secret.txt to the Cloudflare Worker secret LED_MIRRORS_PRICES.
//   npm run led:publish            (needs `wrangler login`; run from the repository root)
// The value goes to wrangler through stdin and is never printed or logged. It also writes .dev.vars for local `wrangler dev`.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const file = new URL('../worker/private/led-mirrors.secret.txt', import.meta.url);
if (!fs.existsSync(file)) { console.error('missing worker/private/led-mirrors.secret.txt: run scripts/build-led-mirrors-catalog.mjs first'); process.exit(1); }
const value = fs.readFileSync(file, 'utf8').trim();
const r = spawnSync('npx', ['wrangler', 'secret', 'put', 'LED_MIRRORS_PRICES'], { input: value, encoding: 'utf8' });
const ok = r.status === 0 && /Success/.test(r.stdout);
console.log(ok ? 'LED_MIRRORS_PRICES uploaded (' + value.length + ' characters, value not shown)' : 'upload failed: ' + (r.stderr || r.stdout).split('\n').filter((l) => !l.includes(value)).slice(0, 5).join(' | '));
process.exit(ok ? 0 : 1);

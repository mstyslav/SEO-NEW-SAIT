// Read-only audit of the 48 models from public data: lighting, frame, backlight option, duplicates, description uniqueness.
import fs from 'node:fs';
import { modelContent } from '../src/lib/shop-content.mjs';
const pub = JSON.parse(fs.readFileSync('src/data/led-mirrors/public.json', 'utf8'));
const ms = pub.models, cnt = {};
for (const m of ms) { const k = m.main_light; cnt[k] = (cnt[k] || 0) + 1; }
const noMain = ms.filter((m) => m.main_light === 'Без основної підсвітки');
const noAny = noMain.filter((m) => !m.option_groups.some((g) => g.key === 'backlight'));
console.log('models', ms.length, '\nmain light:', cnt, '\nwithout main light:', noMain.length, '\nwithout main light AND backlight option:', noAny.length, noAny.map((m) => m.name_short).join(', '));
console.log('metal frame:', ms.filter((m) => m.frame === 'Металева').length);
for (const loc of ['uk', 'ru']) {
  const set = new Set(ms.map((m) => { const c = modelContent(loc, m, pub.groups); return c.intro + c.config; }));
  console.log(loc, 'unique descriptions:', set.size, '/', ms.length);
}

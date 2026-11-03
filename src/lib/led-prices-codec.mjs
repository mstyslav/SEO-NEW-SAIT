// Compact transport format of the LED mirror purchase-price table (Worker secret LED_MIRRORS_PRICES).
//   secret = base64( gzip( JSON ) ),  JSON = { v:1, k: markup, m: [ [id, base, mat, [[w,h,price]...], rows] ... ] }
//   rows = one entry per option group the model offers (catalog group order), each a list of [c0,ca,cp,cw] per option in the
//   order of src/data/led-mirrors/public.json (names, groups and size limits live there — they are public).
// Only numbers travel in the secret. decodePrices() rebuilds the catalog object that mirrorPrice() expects and refuses anything
// that does not match the public model list exactly. No purchase value is ever logged or put in an error message.

const b64ToBytes = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function gunzip(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).text();
}

const isNum = (x) => typeof x === 'number' && Number.isFinite(x) && x >= 0;

/** @returns catalog for mirrorPrice(), or throws Error('prices_invalid') */
export async function decodePrices(secret, pub) {
  const bad = () => new Error('prices_invalid');
  let data;
  try { data = JSON.parse(await gunzip(b64ToBytes(String(secret).trim()))); } catch { throw bad(); }
  if (!data || data.v !== 1 || !(data.k >= 1 && data.k < 3) || !Array.isArray(data.m) || data.m.length !== pub.models.length) throw bad();
  const byId = new Map(data.m.map((r) => [r?.[0], r]));
  const models = pub.models.map((pm) => {
    const r = byId.get(pm.id);
    if (!r || byId.size !== pub.models.length) throw bad();
    const [, base, mat, sizes, rows] = r;
    if (!isNum(base) || !isNum(mat) || !Array.isArray(sizes) || sizes.length !== pm.standard_sizes.length || !Array.isArray(rows) || rows.length !== pm.option_groups.length) throw bad();
    const standard = pm.standard_sizes.map((s, i) => {
      const [w, h, price] = sizes[i] ?? [];
      if (w !== s.w || h !== s.h || !isNum(price)) throw bad();
      return { w, h, price_uah: price };
    });
    const own = [];
    pm.option_groups.forEach((g, gi) => {
      const list = rows[gi];
      if (!Array.isArray(list) || list.length !== g.options.length) throw bad();
      g.options.forEach((name, oi) => {
        const c = list[oi];
        if (!Array.isArray(c) || c.length !== 4 || !c.every(isNum)) throw bad();
        own.push({ grp: g.key, name, c0: c[0], ca: c[1], cp: c[2], cw: c[3] });
      });
    });
    return { id: pm.id, name_short: pm.name_short, size_limits_mm: pm.size_limits_mm, base_uah: base, mat_uah_per_m2: mat, standard_sizes: standard, options: 'own', own_options: own };
  });
  return { collected: pub.collected, currency: pub.currency, markup: data.k, groups: pub.groups, common_options: [], models };
}

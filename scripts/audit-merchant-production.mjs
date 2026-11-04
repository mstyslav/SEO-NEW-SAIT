// Run: node scripts/audit-merchant-production.mjs
// Live, READ-ONLY audit of all 185 variants; does not create CRM orders or reveal supplier prices.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const pub = JSON.parse(fs.readFileSync(new URL('../src/data/led-mirrors/public.json', import.meta.url), 'utf8'));
const photos = JSON.parse(fs.readFileSync(new URL('../src/data/led-mirrors/photos.json', import.meta.url), 'utf8'));
const base = 'https://space-glass.com.ua';
const variants = pub.models.flatMap(m => m.standard_sizes.map(s => ({model:m, w:s.w, h:s.h, id:`sg-led-${m.slug}-${s.w}x${s.h}`})));
const failures = [];
const fail = (msg) => failures.push(msg);
assert.equal(pub.models.length,48);
assert.equal(variants.length,185);
assert.equal(new Set(variants.map(v=>v.id)).size,185);
const expected = new Map();
for (let i=0;i<variants.length;i+=30) {
  const group=variants.slice(i,i+30);
  try {
    const res=await fetch(base+'/api/led-mirror-price',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({items:group.map(v=>({modelId:v.model.id,w:v.w,h:v.h,options:{}}))}),signal:AbortSignal.timeout(15000)});
    if(!res.ok){fail('price API batch '+i+': HTTP '+res.status);continue;}
    const body=await res.json();
    if(!body.ok || !Array.isArray(body.items) || body.items.length!==group.length){fail('price API batch '+i+': invalid response');continue;}
    group.forEach((v,j)=>{const p=body.items[j];if(!p.ok||!Number.isInteger(p.total_uah)||p.total_uah<=0)fail('invalid retail price '+v.id);else expected.set(v.id,p.total_uah)});
  }catch(e){fail('price API batch '+i+': '+String(e));}
}
for (const m of pub.models) {
  if(!photos[m.slug]){fail('missing photo mapping '+m.slug);continue;}
  for(const u of [`${base}/images/led-mirrors/${m.slug}-1-900.webp`,`${base}/shop/mirrors/led/${m.slug}/?size=${m.standard_sizes[0].w}x${m.standard_sizes[0].h}`]){
    try{const r=await fetch(u,{method:'GET',signal:AbortSignal.timeout(12000)});if(!r.ok)fail('HTTP '+r.status+' '+u);else if(u.endsWith('.webp')&&!String(r.headers.get('content-type')).includes('image/'))fail('not image '+u);await r.body?.cancel();}
    catch(e){fail('asset/page '+u+': '+String(e));}
  }
}
let feedRows=0, feedStatus='unavailable';
try {
 const res=await fetch(base+'/api/merchant-feed.tsv',{signal:AbortSignal.timeout(20000)});
 feedStatus=String(res.status);
 if(res.ok){
  const lines=(await res.text()).trim().split(/\r?\n/);
  const cols=lines.shift().split('\t');
  const idx=Object.fromEntries(cols.map((k,i)=>[k,i]));
  for(const k of ['id','price','link','image_link','availability','max_handling_time'])if(!(k in idx))fail('missing feed column '+k);
  const seen=new Set();
  for(const line of lines){
   const row=line.split('\t');const id=row[idx.id];feedRows++;if(seen.has(id))fail('duplicate feed id '+id);seen.add(id);
   const v=variants.find(x=>x.id===id);if(!v){fail('unknown feed id '+id);continue;}
   if(row[idx.price]!==`${expected.get(id)}.00 UAH`)fail('price mismatch '+id);
   if(row[idx.link]!==`${base}/shop/mirrors/led/${v.model.slug}/?size=${v.w}x${v.h}`)fail('landing mismatch '+id);
   if(row[idx.max_handling_time]!==String(v.model.frame==='Металева'?35:15))fail('handling mismatch '+id);
  }
  if(feedRows!==185)fail('feed rows '+feedRows+' not 185');
 }else fail('public feed unavailable HTTP '+res.status+' (may be intentionally gated)');
}catch(e){fail('feed request '+String(e));}
console.log(JSON.stringify({status:failures.length?'FAIL':'PASS',models:pub.models.length,variants:variants.length,pricesVerified:expected.size,feedStatus,feedRows,failures},null,2));
if(failures.length)process.exitCode=1;

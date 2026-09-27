const endpoint=document.documentElement.dataset.leadEndpoint||'/api/kommo-lead';
// Anti-spam signals checked by the Worker (worker/index.ts): hidden honeypot field,
// time spent on the form, real user interaction and a JS-only marker.
let humanSignal=false;
['pointerdown','keydown','touchstart','scroll'].forEach(type=>window.addEventListener(type,()=>{humanSignal=true},{once:true,passive:true}));
// Success pop-up (instead of leaving the page): check mark, thanks by name, next step, call button.
const isRu=(document.documentElement.lang||'').startsWith('ru');
const T=isRu?{title:'Спасибо',title2:'Заявка отправлена',text:'Менеджер свяжется с вами в ближайшее рабочее время, уточнит детали и подготовит расчёт.',product:'Запрос',ok:'Хорошо',call:'Позвонить нам',close:'Закрыть'}
  :{title:'Дякуємо',title2:'Заявку надіслано',text:'Менеджер зв’яжеться з вами найближчим робочим часом, уточнить деталі та підготує розрахунок.',product:'Запит',ok:'Добре',call:'Зателефонувати нам',close:'Закрити'};
const escHtml=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
function showSuccess(payload){
  if(!document.getElementById('sg-success-css')){
    const css=document.createElement('style'); css.id='sg-success-css';
    css.textContent=`.sg-success{position:fixed;inset:0;z-index:5000;display:grid;place-items:center;padding:20px;background:rgba(5,9,7,.62);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:0;transition:opacity .25s ease}
.sg-success.is-open{opacity:1}
.sg-success__card{position:relative;width:min(440px,100%);padding:34px 28px 26px;border-radius:28px;background:#fff;color:#16201b;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.35);transform:translateY(18px) scale(.97);transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.sg-success.is-open .sg-success__card{transform:none}
.sg-success__icon{display:grid;place-items:center;width:76px;height:76px;margin:0 auto 18px;border-radius:50%;background:#e8f6f0;box-shadow:0 0 0 10px #f3faf7}
.sg-success__icon svg{width:40px;height:40px;stroke:var(--green-dark,#07583a);stroke-width:3;fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:40;stroke-dashoffset:40;animation:sgCheck .5s .2s ease forwards}
@keyframes sgCheck{to{stroke-dashoffset:0}}
.sg-success__eyebrow{margin:0 0 8px;color:var(--mint-dark,#3c9c7c);font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.sg-success h2{margin:0 0 12px;font-size:28px;line-height:1.1;letter-spacing:-.02em}
.sg-success p{margin:0 0 16px;color:#56625c;font-size:15.5px;line-height:1.5}
.sg-success__product{display:inline-block;margin:0 0 20px;padding:8px 14px;border-radius:999px;background:#f3f6f4;color:#2c3a33;font-size:13.5px}
.sg-success__actions{display:grid;gap:10px}
.sg-success__actions .button{width:100%}
.sg-success__close{position:absolute;top:14px;right:14px;display:grid;place-items:center;width:38px;height:38px;border:0;border-radius:50%;background:#f3f6f4;color:#16201b;font-size:22px;line-height:1;cursor:pointer}
@media (prefers-reduced-motion:reduce){.sg-success,.sg-success__card{transition:none}.sg-success__icon svg{animation:none;stroke-dashoffset:0}}`;
    document.head.appendChild(css);
  }
  const first=String(payload.name||'').trim().split(/\s+/)[0];
  const wrap=document.createElement('div');
  wrap.className='sg-success'; wrap.setAttribute('role','dialog'); wrap.setAttribute('aria-modal','true'); wrap.setAttribute('aria-labelledby','sg-success-title');
  wrap.innerHTML=`<div class="sg-success__card"><button type="button" class="sg-success__close" aria-label="${T.close}" data-close>×</button>
<div class="sg-success__icon"><svg viewBox="0 0 40 40"><path d="M10 21l7 7 14-15"/></svg></div>
<p class="sg-success__eyebrow">${T.title2}</p><h2 id="sg-success-title">${T.title}${first?', '+escHtml(first):''}!</h2>
<p>${T.text}</p>${payload.product?`<span class="sg-success__product">${T.product}: ${escHtml(payload.product)}</span>`:''}
<div class="sg-success__actions"><button type="button" class="button button--mint" data-close>${T.ok}</button><a class="button button--outline" href="tel:+380734251400">${T.call}</a></div></div>`;
  const prevFocus=document.activeElement;
  const close=()=>{wrap.classList.remove('is-open');document.removeEventListener('keydown',onKey);setTimeout(()=>wrap.remove(),250);prevFocus&&prevFocus.focus&&prevFocus.focus();};
  const onKey=e=>{if(e.key==='Escape')close();};
  wrap.addEventListener('click',e=>{if(e.target===wrap||e.target.closest('[data-close]'))close();});
  document.addEventListener('keydown',onKey);
  document.body.appendChild(wrap);
  requestAnimationFrame(()=>{wrap.classList.add('is-open');wrap.querySelector('.button--mint').focus();});
}
document.querySelectorAll('[data-lead-form]').forEach(form=>{
  const status=form.querySelector('[data-form-status]');
  const openedAt=Date.now();
  if(!form.querySelector('input[name="website"]')){
    const trap=document.createElement('input');
    trap.type='text'; trap.name='website'; trap.tabIndex=-1; trap.autocomplete='off';
    trap.setAttribute('aria-hidden','true');
    trap.style.cssText='position:absolute!important;left:-10000px!important;width:1px;height:1px;opacity:0;pointer-events:none';
    form.appendChild(trap);
  }
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!form.reportValidity()) return;
    const button=form.querySelector('[type="submit"]');
    const original=button.textContent;
    button.disabled=true; button.setAttribute('aria-busy','true'); button.textContent='Надсилаємо…';
    status.hidden=false; status.textContent='Безпечно передаємо ваш запит…';
    status.classList.remove('is-error');
    const data=new FormData(form);
    const payload=Object.fromEntries([...data.entries()].filter(([,v])=>typeof v==='string'));
    payload.source=location.pathname; payload.createdAt=new Date().toISOString();
    payload._elapsed=String(Date.now()-openedAt); payload._h=humanSignal?'1':'0'; payload._js='sg-'+(openedAt%9973);
    try{
      const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json','x-sg-form':'1'},body:JSON.stringify(payload)});
      const result=await response.json().catch(()=>({}));
      if(!response.ok){
        if(result.error==='invalid_phone'){ status.textContent='Перевірте номер телефону — вкажіть український номер, наприклад +380 67 123 45 67.'; status.classList.add('is-error'); button.disabled=false; button.removeAttribute('aria-busy'); button.textContent=original; return; }
        throw new Error('request_failed');
      }
      try{localStorage.setItem('spaceGlassLastQuote',JSON.stringify({name:payload.name,phone:payload.phone,email:payload.email,city:payload.city,product:payload.product,configuration:payload.configuration,estimatedPrice:payload.estimatedPrice}));}catch{}
      form.reset(); status.hidden=true; status.textContent='';
      button.disabled=false; button.removeAttribute('aria-busy'); button.textContent=original;
      showSuccess(payload);
    }catch{
      status.textContent='Не вдалося надіслати онлайн. Зателефонуйте +38 (073) 425 14 00 або спробуйте ще раз.';
      status.classList.add('is-error'); button.disabled=false; button.removeAttribute('aria-busy'); button.textContent=original;
    }
  });
});

const endpoint=document.documentElement.dataset.leadEndpoint||'/api/kommo-lead';
// Anti-spam signals checked by the Worker (worker/index.ts): hidden honeypot field,
// time spent on the form, real user interaction and a JS-only marker.
let humanSignal=false;
['pointerdown','keydown','touchstart','scroll'].forEach(type=>window.addEventListener(type,()=>{humanSignal=true},{once:true,passive:true}));
// Success pop-up (instead of leaving the page): check mark, thanks by name, next step, call button.
// Language comes from the URL: /ru/… = RU, everything else = UA.
const isRu=location.pathname==='/ru/'||location.pathname.startsWith('/ru/');
const T=isRu?{title:'Спасибо',title2:'Заявка отправлена',text:'Менеджер свяжется с вами в ближайшее рабочее время, уточнит детали и подготовит расчёт.',product:'Запрос',ok:'Хорошо',call:'Позвонить нам',close:'Закрыть',
    jobText:'Мы получили вашу заявку и свяжемся с вами, чтобы обсудить детали.',
    sending:'Отправляем…',status:'Безопасно передаём ваш запрос…',phone:'Проверьте номер телефона — укажите украинский номер, например +380 67 123 45 67.',
    error:'Не удалось отправить онлайн. Позвоните +38 (073) 425 14 00 или попробуйте ещё раз.',tooMany:'Слишком много заявок подряд. Подождите минуту и попробуйте снова.',
    fileSize:'Файл слишком большой — максимум 10 МБ.',fileType:'Этот тип файла не поддерживается. Прикрепите JPG, PNG, WEBP, PDF или DWG.',
    fileNotSent:'Заявка отправлена, но файл не удалось передать — менеджер попросит его при звонке.'}
  :{title:'Дякуємо',title2:'Заявку надіслано',text:'Менеджер зв’яжеться з вами найближчим робочим часом, уточнить деталі та підготує розрахунок.',product:'Запит',ok:'Добре',call:'Зателефонувати нам',close:'Закрити',
    jobText:'Ми отримали вашу заявку та зв’яжемося з вами, щоб обговорити деталі.',
    sending:'Надсилаємо…',status:'Безпечно передаємо ваш запит…',phone:'Перевірте номер телефону — вкажіть український номер, наприклад +380 67 123 45 67.',
    error:'Не вдалося надіслати онлайн. Зателефонуйте +38 (073) 425 14 00 або спробуйте ще раз.',tooMany:'Забагато заявок поспіль. Зачекайте хвилину та спробуйте знову.',
    fileSize:'Файл завеликий — максимум 10 МБ.',fileType:'Цей тип файлу не підтримується. Додайте JPG, PNG, WEBP, PDF або DWG.',
    fileNotSent:'Заявку надіслано, але файл не вдалося передати — менеджер попросить його під час дзвінка.'};
// Attachment limits — mirror ATTACH_* in worker/index.ts.
const ATTACH_MAX_BYTES=10*1024*1024;
const ATTACH_EXT=/\.(jpe?g|png|webp|pdf|dwg)$/i;

// GA4 (gtag + Consent Mode are set up in BaseLayout). Only non-personal parameters are sent:
// never name, phone, e-mail, city, message, file or configuration.
const pageLanguage=isRu?'ru':'ua';
const track=(name,params)=>{try{if(typeof window.gtag!=='function') return; const p={page_path:location.pathname,page_language:pageLanguage}; Object.entries(params||{}).forEach(([k,v])=>{if(v!==undefined&&v!=='')p[k]=v;}); window.gtag('event',name,p);}catch{}};
const leadType=()=>location.pathname.replace(/^\/ru\//,'/').split('/')[1]||'home';
const FORM_TYPES=[['contacts-form','contacts','contacts_page'],['profile-request__form','profile_request','page_bottom'],['project-request-form__form','project_request','project_page'],['quote-form--home-final','home_quote','home_final'],['tray-order__form','tray_order','tray_configurator'],['rc__request','configurator_request','configurator'],['career__form','job_application','about_career']];
const formInfo=form=>{const hit=FORM_TYPES.find(([cls])=>form.classList.contains(cls));return{form_id:form.dataset.formId||(hit?hit[1]:'lead_form'),form_location:form.dataset.formLocation||(hit?hit[2]:'content')};};
const productCategory=form=>{const field=form.querySelector('input[type="hidden"][name="product"], select[name="product"]');const v=field&&String(field.value||'').trim();return v?v.slice(0,100):undefined;};

// One Ukrainian phone mask for every lead form: +380 XX XXX XX XX.
// The Worker validates the number again, so this improves input quality without
// replacing the server-side check.
const PHONE_ERROR=isRu?'Введите полный номер: +380 XX XXX XX XX.':'Введіть повний номер: +380 XX XXX XX XX.';
const phoneLocalDigits=value=>{
  let digits=String(value||'').replace(/\D/g,'');
  if(digits.startsWith('380')) digits=digits.slice(3);
  else if(digits.startsWith('80')) digits=digits.slice(2);
  else if(digits.startsWith('0')) digits=digits.slice(1);
  return digits.slice(0,9);
};
const formatPhone=value=>{
  const digits=phoneLocalDigits(value);
  if(!digits) return '+380';
  const parts=[digits.slice(0,2),digits.slice(2,5),digits.slice(5,7),digits.slice(7,9)].filter(Boolean);
  return `+380 ${parts.join(' ')}`;
};
const validatePhone=input=>{
  const count=phoneLocalDigits(input.value).length;
  input.setCustomValidity(count===9?'':PHONE_ERROR);
};
document.querySelectorAll('[data-lead-form] input[type="tel"][name="phone"]').forEach(input=>{
  input.inputMode='numeric';
  input.autocomplete='tel';
  input.maxLength=17;
  input.placeholder='+380 XX XXX XX XX';
  input.addEventListener('focus',()=>{
    if(!phoneLocalDigits(input.value).length){
      input.value='+380';
      input.setSelectionRange(input.value.length,input.value.length);
    }
  });
  input.addEventListener('beforeinput',event=>{
    if(event.inputType==='insertText'&&event.data&&/\D/.test(event.data)) event.preventDefault();
  });
  input.addEventListener('input',()=>{
    input.value=formatPhone(input.value);
    validatePhone(input);
    input.setSelectionRange(input.value.length,input.value.length);
  });
  input.addEventListener('blur',()=>{
    if(!phoneLocalDigits(input.value).length) input.value='';
    validatePhone(input);
  });
  validatePhone(input);
});

// Contact clicks (no phone number / address is sent, only where the link was).
const linkLocation=a=>a.closest('.sg-success')?'success_popup':a.closest('footer')?'footer':a.closest('header, .language-switcher, [data-mobile-menu], .simple-catalog')?'header':a.closest('[class*="hero"]')?'hero':'content';
document.addEventListener('click',event=>{
  const a=event.target.closest&&event.target.closest('a[href]');
  if(!a) return;
  const href=a.getAttribute('href')||'';
  const name=/^tel:/i.test(href)?'click_phone':/^mailto:/i.test(href)?'click_email':/^https?:\/\/(t\.me|telegram\.me)\//i.test(href)?'click_telegram':null;
  if(name) track(name,{link_location:linkLocation(a)});
},{capture:true});
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
<p>${payload.kind==='job'?T.jobText:T.text}</p>${payload.product?`<span class="sg-success__product">${T.product}: ${escHtml(payload.product)}</span>`:''}
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
  const showError=text=>{if(!status) return; status.hidden=false; status.textContent=text; status.classList.add('is-error');};
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!form.reportValidity()) return;
    const fileInput=form.querySelector('input[type="file"]');
    const file=fileInput&&fileInput.files&&fileInput.files[0];
    if(file&&file.size>ATTACH_MAX_BYTES){ showError(T.fileSize); return; }
    if(file&&!ATTACH_EXT.test(file.name)){ showError(T.fileType); return; }
    const button=form.querySelector('[type="submit"]');
    const original=button.textContent;
    const restore=()=>{button.disabled=false; button.removeAttribute('aria-busy'); button.textContent=original;};
    button.disabled=true; button.setAttribute('aria-busy','true'); button.textContent=T.sending;
    if(status){ status.hidden=false; status.textContent=T.status; status.classList.remove('is-error'); }
    const data=new FormData(form);
    const payload=Object.fromEntries([...data.entries()].filter(([,v])=>typeof v==='string'));
    payload.source=location.pathname; payload.createdAt=new Date().toISOString();
    payload._elapsed=String(Date.now()-openedAt); payload._h=humanSignal?'1':'0'; payload._js='sg-'+(openedAt%9973);
    // Analytics context is read before form.reset() — it never includes what the visitor typed.
    const info=formInfo(form); const category=productCategory(form);
    try{
      let request;
      if(file){
        // Only forms with a chosen file go multipart; every other form keeps the JSON body.
        const body=new FormData();
        Object.entries(payload).forEach(([k,v])=>body.append(k,v));
        body.append('attachment',file,file.name);
        request={method:'POST',headers:{'x-sg-form':'1'},body};
      }else{
        request={method:'POST',headers:{'content-type':'application/json','x-sg-form':'1'},body:JSON.stringify(payload)};
      }
      const response=await fetch(endpoint,request);
      const result=await response.json().catch(()=>({}));
      if(!response.ok){
        const known={invalid_phone:T.phone,too_many_requests:T.tooMany,file_too_large:T.fileSize,file_type:T.fileType}[result.error];
        if(known){ showError(known); restore(); return; }
        throw new Error('request_failed');
      }
      // A lead counts only when the server confirms it was really delivered (spam never gets lead_sent).
      if(result.ok===true&&result.lead_sent===true){
        if(payload.kind==='job') track('job_application',{form_id:info.form_id,form_location:info.form_location});
        else track('generate_lead',{form_id:info.form_id,form_location:info.form_location,lead_type:leadType(),product_category:category});
      }
      try{localStorage.setItem('spaceGlassLastQuote',JSON.stringify({name:payload.name,phone:payload.phone,email:payload.email,city:payload.city,product:payload.product,configuration:payload.configuration,estimatedPrice:payload.estimatedPrice}));}catch{}
      form.reset();
      if(status){ status.hidden=true; status.textContent=''; }
      restore();
      showSuccess(payload);
      if(file&&result.file_sent===false){ showError(T.fileNotSent); }
    }catch{
      showError(T.error); restore();
    }
  });
});

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
    sending:'Отправляем…',status:'Безопасно передаём ваш запрос…',phone:'Проверьте номер телефона и код страны.',
    error:'Не удалось отправить онлайн. Позвоните +38 (073) 425 14 00 или попробуйте ещё раз.',tooMany:'Слишком много заявок подряд. Подождите минуту и попробуйте снова.',
    fileSize:'Файл слишком большой — максимум 10 МБ.',fileType:'Этот тип файла не поддерживается. Прикрепите JPG, PNG, WEBP, PDF или DWG.',
    fileNotSent:'Заявка отправлена, но файл не удалось передать — менеджер попросит его при звонке.'}
  :{title:'Дякуємо',title2:'Заявку надіслано',text:'Менеджер зв’яжеться з вами найближчим робочим часом, уточнить деталі та підготує розрахунок.',product:'Запит',ok:'Добре',call:'Зателефонувати нам',close:'Закрити',
    jobText:'Ми отримали вашу заявку та зв’яжемося з вами, щоб обговорити деталі.',
    sending:'Надсилаємо…',status:'Безпечно передаємо ваш запит…',phone:'Перевірте номер телефону та код країни.',
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

// International phone field for every lead form: country selector (flag + dial code) with
// per-country formatting and validation. intl-tel-input + Google libphonenumber are served
// from /vendor/ (no CDN); the core loads only on pages with a phone field, the validation
// utils (~60 KB gz) on the first interaction with it. The number is sent in E.164
// (+380671234567); the Worker validates it again (worker/index.ts → normalisePhone).
const PHONE_ERROR=isRu?'Проверьте номер телефона и код страны.':'Перевірте номер телефону та код країни.';
const ITI_BASE='/vendor/intl-tel-input-29.5.3/';
const PHONE_COUNTRIES=['ua','at','it','de','pl','es','cz','sk','fr','ch','md','ro'];
const phoneInputs=[...document.querySelectorAll('[data-lead-form] input[type="tel"][name="phone"]')];
const phoneWidgets=new Map();
let phoneUtils=null;
const loadAsset=(tag,attrs)=>new Promise((resolve,reject)=>{const el=Object.assign(document.createElement(tag),attrs);el.onload=resolve;el.onerror=reject;document.head.appendChild(el);});
const loadPhoneUtils=()=>{
  if(!window.intlTelInput) return Promise.resolve(false);
  if(!phoneUtils) phoneUtils=window.intlTelInput.utils?Promise.resolve(true):window.intlTelInput.attachUtils(()=>import(ITI_BASE+'js/utils.js')).then(()=>!!window.intlTelInput.utils,()=>false);
  return phoneUtils;
};
const phoneCss=`.iti{display:block;width:100%}
.iti,.iti--detached-country-selector{--iti-border-color:#dfe9e5;--iti-hover-color:#eef7f3;--iti-icon-color:#56625c}
.iti button.iti__selected-country.iti__selected-country{all:unset!important;box-sizing:border-box!important;position:relative!important;z-index:1!important;display:flex!important;align-items:center!important;height:100%!important;border-radius:8px 0 0 8px!important;color:#16201b!important;font:inherit!important;cursor:pointer!important}
.iti button.iti__selected-country.iti__selected-country:focus-visible{outline:2px solid var(--mint-dark,#3c9c7c)!important;outline-offset:-3px!important}
.iti__selected-dial-code{color:#16201b}
.iti--detached-country-selector{z-index:4500}
.iti__country-selector{border-radius:12px;overflow:hidden}
.iti--inline-country-selector .iti__country-selector{border-color:var(--mint-dark,#3c9c7c);box-shadow:0 18px 40px rgba(5,9,7,.16)}
.iti .iti__search-input{min-height:44px;margin:0;border:0;border-radius:0;background:#fff;box-shadow:none;font-size:16px}
.iti .iti__search-input:focus{outline:none;box-shadow:none}
.iti__search-input-wrapper:focus-within{border-bottom-color:var(--mint-dark,#3c9c7c)}
.iti__country{color:#16201b}
.iti__country.iti__highlight{background:#e8f6f0}
.iti__dial-code{color:#56625c}`;
// Basic check used only if the validation library could not be loaded (the Worker still checks precisely).
const fallbackPhone=(widget,input)=>{
  const country=widget.getSelectedCountry();
  let digits=input.value.replace(/\D/g,'');
  if(!country||!digits) return '';
  if(input.value.trim().startsWith('+')) return '+'+digits;
  digits=digits.replace(/^0+/,'');
  return '+'+country.dialCode+digits;
};
const phoneValue=input=>{
  const widget=phoneWidgets.get(input);
  if(!widget) return input.value.trim();
  if(window.intlTelInput.utils) return widget.isValidNumberPrecise()?widget.getNumber(window.intlTelInput.NUMBER_FORMAT.E164):'';
  const number=fallbackPhone(widget,input);
  return /^\+\d{8,15}$/.test(number)&&!(number.startsWith('+380')&&number.length!==13)?number:'';
};
const validatePhone=(input,mark)=>{
  const filled=input.value.replace(/\D/g,'').length>0;
  const ok=!filled||!!phoneValue(input);
  input.setCustomValidity(ok?'':PHONE_ERROR);
  if(ok) input.removeAttribute('aria-invalid');
  else if(mark) input.setAttribute('aria-invalid','true');
  return ok;
};
// Called by the submit handler: makes sure the precise validation is ready, then checks every phone field.
const preparePhones=async form=>{
  const inputs=phoneInputs.filter(input=>form.contains(input)&&phoneWidgets.has(input));
  if(!inputs.length) return;
  await Promise.race([loadPhoneUtils(),new Promise(resolve=>setTimeout(resolve,5000))]);
  inputs.forEach(input=>validatePhone(input,true));
};
if(phoneInputs.length){
  const lang=isRu?'ru':'uk';
  Promise.all([
    loadAsset('link',{rel:'stylesheet',href:ITI_BASE+'css/intlTelInput.min.css'}),
    window.intlTelInput?Promise.resolve():loadAsset('script',{src:ITI_BASE+'js/intlTelInput.min.js'}),
    import(ITI_BASE+'js/locale/'+lang+'.js')
  ]).then(([,,locale])=>{
    if(!document.getElementById('sg-phone-css')){const css=document.createElement('style');css.id='sg-phone-css';css.textContent=phoneCss;document.head.appendChild(css);}
    phoneInputs.forEach((input,index)=>{
      // The country button lands inside the <label>; keep the label's text bound to the input.
      if(!input.id) input.id='sg-phone-'+(index+1);
      const label=input.closest('label');
      if(label) label.htmlFor=input.id;
      input.inputMode='tel';
      input.autocomplete='tel';
      input.removeAttribute('maxlength');
      input.placeholder='50 123 4567';
      const widget=window.intlTelInput(input,{
        initialCountry:'ua',
        countryOrder:PHONE_COUNTRIES,
        countryNameLocale:lang,
        uiTranslations:locale.default,
        countrySearch:true,
        countrySelectorMode:'AUTO',
        dropdownParent:document.body,
        separateDialCode:true,
        strictMode:true,
        formatAsYouType:true,
        placeholderNumberPolicy:'AGGRESSIVE',
        placeholderNumberType:'MOBILE'
      });
      phoneWidgets.set(input,widget);
      // Some form styles set the input padding with !important; keep the library's inline
      // padding (room for the flag and dial code) in force.
      const keepPadding=()=>{const value=input.style.paddingLeft;if(value&&input.style.getPropertyPriority('padding-left')!=='important') input.style.setProperty('padding-left',value,'important');};
      keepPadding();
      new MutationObserver(keepPadding).observe(input,{attributes:true,attributeFilter:['style']});
      const wrapper=input.closest('.iti')||input.parentElement;
      ['pointerdown','touchstart','focusin'].forEach(type=>wrapper.addEventListener(type,loadPhoneUtils,{once:true,passive:true}));
      input.addEventListener('input',()=>{loadPhoneUtils();validatePhone(input,false);});
      input.addEventListener('countrychange',()=>validatePhone(input,input.hasAttribute('aria-invalid')));
      input.addEventListener('blur',()=>validatePhone(input,true));
      if(input.value) loadPhoneUtils().then(()=>validatePhone(input,false));
    });
  }).catch(()=>{
    // Library unavailable: plain field, the Worker still validates and normalises the number.
    phoneInputs.forEach(input=>{input.placeholder='+380 50 123 4567';});
  });
}

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
    await preparePhones(form);
    if(!form.reportValidity()){ if(form.querySelector('input[name="phone"][aria-invalid="true"]')) showError(T.phone); return; }
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
    form.querySelectorAll('input[type="tel"][name="phone"]').forEach(input=>{const number=phoneValue(input); if(number) payload.phone=number;});
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

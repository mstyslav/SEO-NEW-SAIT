const endpoint=document.documentElement.dataset.leadEndpoint||'/api/kommo-lead';
// Anti-spam signals checked by the Worker (worker/index.ts): hidden honeypot field,
// time spent on the form, real user interaction and a JS-only marker.
let humanSignal=false;
['pointerdown','keydown','touchstart','scroll'].forEach(type=>window.addEventListener(type,()=>{humanSignal=true},{once:true,passive:true}));
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
      localStorage.setItem('spaceGlassLastQuote',JSON.stringify({name:payload.name,phone:payload.phone,email:payload.email,city:payload.city,product:payload.product,configuration:payload.configuration,estimatedPrice:payload.estimatedPrice}));
      window.location.assign(form.dataset.successUrl||'/thank-you/');
    }catch{
      status.textContent='Не вдалося надіслати онлайн. Зателефонуйте +38 (073) 425 14 00 або спробуйте ще раз.';
      status.classList.add('is-error'); button.disabled=false; button.removeAttribute('aria-busy'); button.textContent=original;
    }
  });
});

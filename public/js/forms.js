const endpoint=document.documentElement.dataset.leadEndpoint||'/api/kommo-lead';
document.querySelectorAll('[data-lead-form]').forEach(form=>{
  const status=form.querySelector('[data-form-status]');
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!form.reportValidity()) return;
    const button=form.querySelector('[type="submit"]');
    const original=button.textContent;
    button.disabled=true; button.setAttribute('aria-busy','true'); button.textContent='Надсилаємо…';
    status.hidden=false; status.textContent='Безпечно передаємо ваш запит…';
    const data=new FormData(form);
    const payload=Object.fromEntries([...data.entries()].filter(([,v])=>typeof v==='string'));
    payload.source=location.pathname; payload.createdAt=new Date().toISOString();
    try{
      const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
      if(!response.ok) throw new Error('request_failed');
      localStorage.setItem('spaceGlassLastQuote',JSON.stringify(payload));
      window.location.assign(form.dataset.successUrl||'/thank-you/');
    }catch{
      status.textContent='Не вдалося надіслати онлайн. Зателефонуйте +38 (073) 425 14 00 або спробуйте ще раз.';
      status.classList.add('is-error'); button.disabled=false; button.removeAttribute('aria-busy'); button.textContent=original;
    }
  });
});

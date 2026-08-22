(() => {
  const params = new URLSearchParams(location.search);
  const pathLocale = location.pathname.match(/^\/(uk|ru)(?=\/|$)/)?.[1];
  const isUaRishennya = /^\/rishennya\/?$/.test(location.pathname);
  const requestedLocale = pathLocale || (isUaRishennya ? 'uk' : params.get('lang') || localStorage.getItem('spaceGlassLocale') || 'uk');
  const locale = requestedLocale === 'ru' ? 'ru' : 'uk';
  localStorage.setItem('spaceGlassLocale', locale);

  document.querySelectorAll('[data-language-button] span').forEach((el) => {
    el.textContent = locale === 'uk' ? 'UA' : locale.toUpperCase();
  });

  document.querySelectorAll('[data-language-switcher] [data-locale]').forEach((el) => {
    el.classList.toggle('is-active', el.dataset.locale === locale);
  });


  const dictionaries = {
    ru: {
      "Оберіть відповідне рішення":"Выберите подходящее решение",
      "Після вибору типу уточнимо розміри, матеріали, колір, комплектацію та формат монтажу.":"После выбора типа уточним размеры, материалы, цвет, комплектацию и формат монтажа.",
      "Детальніше":"Подробнее",
      "Індивідуальна конфігурація під ваш простір.":"Индивидуальная конфигурация под ваше пространство.",
      "Попередній розрахунок":"Предварительный расчёт",
      "Площа":"Площадь",
      "Виріб":"Изделие",
      "Додаткові опції":"Дополнительные опции",
      "Монтаж":"Монтаж",
      "Робочий курс":"Рабочий курс",
      "Разом":"Итого",
      "Не обрано":"Не выбрано",
      'Каталог':'Каталог','Послуги':'Услуги','Готові рішення':'Готовые решения',
      'Проєкти':'Проекты','База знань':'База знаний','Про нас':'О нас',
      'Контакти':'Контакты','Отримати розрахунок':'Получить расчёт',
      'Отримати КП':'Получить КП','Додати до проєкту':'Добавить в проект',
      'Порівняти':'Сравнить','Мій проєкт':'Мой проект','Що потрібно':'Что нужно',
      'Місто':'Город','Ім’я':'Имя','Телефон':'Телефон',
      'Отримати попередній розрахунок':'Получить предварительный расчёт',
      'Сумісні товари':'Совместимые товары','Часті запитання':'Частые вопросы'
    }
  };

  if (locale === 'uk') {
    document.documentElement.lang = 'uk';
    return;
  }
  if (!dictionaries[locale]) return;
  const dict = dictionaries[locale];
  document.documentElement.lang = locale;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach(node => {
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed || !dict[trimmed]) return;
    node.nodeValue = raw.replace(trimmed, dict[trimmed]);
  });

  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
    const value = el.getAttribute('placeholder');
    if (dict[value]) el.setAttribute('placeholder', dict[value]);
  });

  document.querySelectorAll('[data-language-switcher] [data-locale]').forEach((link) => {
    link.addEventListener('click', () => {
      localStorage.setItem('spaceGlassLocale', link.dataset.locale || 'uk');
    });
  });
})();

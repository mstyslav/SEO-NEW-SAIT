(() => {
  const params = new URLSearchParams(location.search);
  const pathLocale = location.pathname.match(/^\/(uk|ru|en|de)(?=\/|$)/)?.[1];
  const locale = pathLocale || params.get('lang') || localStorage.getItem('spaceGlassLocale') || 'uk';
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
    },
    en: {
      "Оберіть відповідне рішення":"Choose the right solution",
      "Після вибору типу уточнимо розміри, матеріали, колір, комплектацію та формат монтажу.":"After selecting a type, we will confirm dimensions, materials, colour, equipment and installation format.",
      "Детальніше":"Learn more",
      "Індивідуальна конфігурація під ваш простір.":"Custom configuration for your space.",
      "Попередній розрахунок":"Preliminary estimate",
      "Площа":"Area",
      "Виріб":"Product",
      "Додаткові опції":"Additional options",
      "Монтаж":"Installation",
      "Робочий курс":"Exchange rate",
      "Разом":"Total",
      "Не обрано":"Not selected",
      'Каталог':'Catalog','Послуги':'Services','Готові рішення':'Solutions',
      'Проєкти':'Projects','База знань':'Knowledge Hub','Про нас':'About',
      'Контакти':'Contacts','Отримати розрахунок':'Get a quote',
      'Отримати КП':'Get proposal','Додати до проєкту':'Add to project',
      'Порівняти':'Compare','Мій проєкт':'My project','Що потрібно':'What do you need',
      'Місто':'City','Ім’я':'Name','Телефон':'Phone',
      'Отримати попередній розрахунок':'Get preliminary estimate',
      'Сумісні товари':'Compatible products','Часті запитання':'Frequently asked questions'
    },
    de: {
      "Оберіть відповідне рішення":"Wählen Sie die passende Lösung",
      "Після вибору типу уточнимо розміри, матеріали, колір, комплектацію та формат монтажу.":"Nach der Auswahl klären wir Maße, Materialien, Farbe, Ausstattung und Montageart.",
      "Детальніше":"Mehr erfahren",
      "Індивідуальна конфігурація під ваш простір.":"Individuelle Konfiguration für Ihren Raum.",
      "Попередній розрахунок":"Vorläufige Berechnung",
      "Площа":"Fläche",
      "Виріб":"Produkt",
      "Додаткові опції":"Zusatzoptionen",
      "Монтаж":"Montage",
      "Робочий курс":"Umrechnungskurs",
      "Разом":"Gesamt",
      "Не обрано":"Nicht gewählt",
      'Каталог':'Katalog','Послуги':'Leistungen','Готові рішення':'Lösungen',
      'Проєкти':'Projekte','База знань':'Wissenszentrum','Про нас':'Über uns',
      'Контакти':'Kontakt','Отримати розрахунок':'Angebot erhalten',
      'Отримати КП':'Angebot erhalten','Додати до проєкту':'Zum Projekt hinzufügen',
      'Порівняти':'Vergleichen','Мій проєкт':'Mein Projekt','Що потрібно':'Was benötigen Sie',
      'Місто':'Stadt','Ім’я':'Name','Телефон':'Telefon',
      'Отримати попередній розрахунок':'Vorläufiges Angebot erhalten',
      'Сумісні товари':'Passende Produkte','Часті запитання':'Häufige Fragen'
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

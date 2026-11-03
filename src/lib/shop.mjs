// Space Glass shop (UA + RU only): routes, product types, category registry and texts.
// URLs:  /shop/  /shop/mirrors/  /shop/mirrors/led/  /shop/mirrors/led/{model}/  /shop/showers/  /shop/partitions/   (+ /ru/ twins)
// Everything under /shop/ is noindex and out of the sitemap until the owner approves indexing.

/** READY_PRODUCT: a finished product with a fixed price. MADE_TO_ORDER: made after the order, standard parameters, defined price. */
export const PRODUCT_TYPES = { READY: 'READY_PRODUCT', MADE_TO_ORDER: 'MADE_TO_ORDER' };
/** LED mirrors: standard models and sizes with a defined price, made after the order. */
export const LED_PRODUCT_TYPE = PRODUCT_TYPES.MADE_TO_ORDER;

export const base = (locale) => (locale === 'ru' ? '/ru' : '');
export const shopPath = (locale, ...parts) => `${base(locale)}/shop/${parts.filter(Boolean).map((p) => `${p}/`).join('')}`;
export const LED_PATH = (locale) => shopPath(locale, 'mirrors', 'led');
export const ledModelPath = (locale, slug) => shopPath(locale, 'mirrors', 'led', slug);

/** Category registry. `active` = has real products today. Inactive categories are an honest information page, never a product list. */
export const CATEGORIES = [
  { key: 'mirrors', path: 'mirrors', active: true, image: '/images/led-mirrors/agnes-1-900.webp', imageAlt: { uk: 'LED-дзеркало Space Glass', ru: 'LED-зеркало Space Glass' } },
  { key: 'showers', path: 'showers', active: false, image: '/images/catalog/dushovi-kabiny/dushovi-kabiny-1200.webp', imageAlt: { uk: 'Душова конструкція зі скла', ru: 'Душевая конструкция из стекла' }, legacy: '/dushovi-kabiny/' },
  { key: 'partitions', path: 'partitions', active: false, image: '/images/catalog/sklyani-perehorodky/gp-caja-2-900.webp', imageAlt: { uk: 'Скляна перегородка', ru: 'Стеклянная перегородка' }, legacy: '/sklyani-perehorodky/' }
];

export const SHOP_STR = {
  uk: {
    shop: 'Магазин', home: 'Головна',
    priceHint: 'Мінімальна ціна доступної комплектації. Остаточна вартість залежить від розміру та обраних функцій.', sizeHint: 'Показуємо моделі, доступні для виготовлення у вибраному розмірі.',
    subtitle: 'Готові скляні вироби та конструкції на замовлення з доставкою по Україні.',
    tabAll: 'Усі товари', catalogNav: 'Категорії товарів', searchLabel: 'Пошук за назвою', searchPh: 'Наприклад, AGNES', filtersBtn: 'Фільтри', filtersTitle: 'Фільтри',
    apply: (n) => `Показати ${n}`, reset: 'Скинути фільтри', close: 'Закрити', sortLabel: 'Сортування', sortDefault: 'За замовчуванням', sortAsc: 'Ціна за зростанням', sortDesc: 'Ціна за спаданням', sortName: 'Назва А–Я',
    found: (n) => `Знайдено товарів: ${n}`, emptyTitle: 'Нічого не знайдено', emptyText: 'Змініть пошук або зніміть частину фільтрів.', priceFrom: 'Від', priceTo: 'До', anySize: (lo, hi) => `${lo}–${hi}`,
    choose: 'Обрати модель', from: 'від', active: (n) => `Фільтри: ${n}`, soonTab: 'Незабаром', mirrors: 'Дзеркала', led: 'LED-дзеркала', showers: 'Душові конструкції', partitions: 'Скляні перегородки',
    h1: 'Магазин Space Glass', lead: 'Готові вироби за визначеною ціною: оберіть модель, розмір і опції, додайте в кошик або замовте одразу. Монтаж не обов’язковий.',
    viewModels: 'Переглянути моделі', inPrep: 'Незабаром', models48: (n) => `${n} моделей`,
    mirrorsLead: 'Дзеркала з LED-підсвіткою та в металевій рамі.', mirrorsTitle: 'Дзеркала — магазин', mirrorsDesc: 'Дзеркала Space Glass у магазині: LED-дзеркала з ціною за розміром і опціями.',
    ledCardNote: 'Безрамні та в металевій рамі, фронтальна й фонова підсвітка.',
    soonTitle: (n) => `${n}: у магазині поки немає готових товарів`, soonText: 'Тут з’являться товари з визначеною ціною. Поки що такі конструкції виготовляємо за індивідуальним розрахунком.',
    soonLink: 'Перейти до розділу каталогу', shopTitle: 'Магазин Space Glass', shopDesc: 'Магазин Space Glass: LED-дзеркала з визначеною ціною, вибором розміру та опцій.',
    ledTitle: 'LED-дзеркала — каталог із цінами', ledDesc: 'Каталог LED-дзеркал: фільтри за формою, підсвічуванням, розміром і ціною. Ціна за розміром і опціями.',
    related: 'Схожі моделі', char: 'Характеристики', desc: 'Опис', warrantyH: 'Гарантія', warrantyText: 'Гарантія — 12 місяців.',
    madeToOrder: 'Виготовляється після замовлення за визначеною ціною', readyProduct: 'Готовий товар',
    homeBlockTitle: 'Готові вироби Space Glass', homeBlockLead: 'Товари з визначеною ціною: оберіть модель і замовте без зайвих узгоджень.', toShop: 'Перейти до магазину'
  },
  ru: {
    shop: 'Магазин', home: 'Главная',
    priceHint: 'Минимальная цена доступной комплектации. Итоговая стоимость зависит от размера и выбранных функций.', sizeHint: 'Показываем модели, доступные для изготовления в выбранном размере.',
    subtitle: 'Готовые стеклянные изделия и конструкции на заказ с доставкой по Украине.',
    tabAll: 'Все товары', catalogNav: 'Категории товаров', searchLabel: 'Поиск по названию', searchPh: 'Например, AGNES', filtersBtn: 'Фильтры', filtersTitle: 'Фильтры',
    apply: (n) => `Показать ${n}`, reset: 'Сбросить фильтры', close: 'Закрыть', sortLabel: 'Сортировка', sortDefault: 'По умолчанию', sortAsc: 'Цена по возрастанию', sortDesc: 'Цена по убыванию', sortName: 'Название А–Я',
    found: (n) => `Найдено товаров: ${n}`, emptyTitle: 'Ничего не найдено', emptyText: 'Измените поиск или снимите часть фильтров.', priceFrom: 'От', priceTo: 'До', anySize: (lo, hi) => `${lo}–${hi}`,
    choose: 'Выбрать модель', from: 'от', active: (n) => `Фильтры: ${n}`, soonTab: 'Скоро', mirrors: 'Зеркала', led: 'LED-зеркала', showers: 'Душевые конструкции', partitions: 'Стеклянные перегородки',
    h1: 'Магазин Space Glass', lead: 'Готовые изделия по определённой цене: выберите модель, размер и опции, добавьте в корзину или закажите сразу. Монтаж не обязателен.',
    viewModels: 'Смотреть модели', inPrep: 'Скоро', models48: (n) => `${n} моделей`,
    mirrorsLead: 'Зеркала с LED-подсветкой и в металлической раме.', mirrorsTitle: 'Зеркала — магазин', mirrorsDesc: 'Зеркала Space Glass в магазине: LED-зеркала с ценой по размеру и опциям.',
    ledCardNote: 'Безрамные и в металлической раме, фронтальная и фоновая подсветка.',
    soonTitle: (n) => `${n}: в магазине пока нет готовых товаров`, soonText: 'Здесь появятся товары с определённой ценой. Пока такие конструкции изготавливаем по индивидуальному расчёту.',
    soonLink: 'Перейти в раздел каталога', shopTitle: 'Магазин Space Glass', shopDesc: 'Магазин Space Glass: LED-зеркала с определённой ценой, выбором размера и опций.',
    ledTitle: 'LED-зеркала — каталог с ценами', ledDesc: 'Каталог LED-зеркал: фильтры по форме, подсветке, размеру и цене. Цена по размеру и опциям.',
    related: 'Похожие модели', char: 'Характеристики', desc: 'Описание', warrantyH: 'Гарантия', warrantyText: 'Гарантия — 12 месяцев.',
    madeToOrder: 'Изготавливается после заказа по определённой цене', readyProduct: 'Готовый товар',
    homeBlockTitle: 'Готовые изделия Space Glass', homeBlockLead: 'Товары с определённой ценой: выберите модель и закажите без лишних согласований.', toShop: 'Перейти в магазин'
  }
};

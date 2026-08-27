// City commercial hub pages (/city/{slug}/).
//
// Kyiv is the approved MASTER template. Odesa and Lviv are intentionally NOT
// added here yet — once the Kyiv layout is signed off, adding a city is a
// single new entry in `cityHubs` plus a one-line route wrapper under
// src/pages/city/. Nothing city-specific lives in the template component.
//
// Rules baked in here:
//  * only real, existing global URLs — no invented /city/{slug}/{category}/ routes;
//  * category cards come from the shared homepage category data, not a hand copy;
//  * project proof is pulled live from the `projects` content collection by the
//    real `city` field — never a hardcoded card list;
//  * stats/facts reuse the numbers already published on /rishennya/ and /about/;
//  * no invented office address, no invented service districts.

import type { Locale } from '../i18n/helpers';

export interface CityHubScenario {
  title: string;
  text: string;
  href: string;
}

export interface CityHubLink {
  label: string;
  href: string;
}

export interface CityHub {
  /** Route slug under /city/. */
  slug: string;
  /** City name, nominative — used in eyebrows and chips. */
  cityNominative: string;
  /** City name, locative ("у Києві") — used mid-sentence. */
  cityLocative: string;
  /**
   * Value of the `city` field in src/content/projects/*.json used to pull the
   * local project proof block. Must be one of the enum values in the projects
   * collection schema.
   */
  projectCity: 'Київ' | 'Львів' | 'Одеса';

  meta: { title: string; description: string };

  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    ctaPrimary: string;
    ctaPrimaryHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    image: {
      src: string;
      srcset: string;
      sizes: string;
      width: number;
      height: number;
      alt: string;
      href: string;
      mobileSrc: string;
      mobileSrcset: string;
    };
  };

  makeSection: {
    eyebrow: string;
    title: string;
    intro: string;
    allLinkLabel: string;
    allLinkHref: string;
    /** Optional per-card description override, keyed by the card's href.
     *  Only used to enrich a shared category label with locally relevant,
     *  repo-confirmed detail — never to invent a new card or URL. */
    categoryOverrides?: Record<string, string>;
  };

  localIntro: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    /** Commercial-proof checklist (NOT a numbered process — that lives in its
     *  own section). Confirmed facts only. */
    asideTitle: string;
    asideItems: string[];
  };

  scenarios: { eyebrow: string; title: string; intro: string; cards: CityHubScenario[] };

  projectsSection: {
    eyebrow: string;
    title: string;
    intro: string;
    viewAllLabel: string;
    viewAllHref: string;
    emptyText: string;
    gridAriaLabel: string;
  };

  processSection: { eyebrow: string; title: string; steps: [string, string][] };

  geography: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    asideTitle: string;
    /** Confirmed served areas only. Empty array → render the safe text-only version. */
    areas: string[];
  };

  cost: {
    eyebrow: string;
    title: string;
    intro: string;
    factors: [string, string][];
    ctaLabel: string;
    ctaHref: string;
  };

  why: {
    eyebrow: string;
    title: string;
    intro: string;
    aboutLabel: string;
    aboutHref: string;
    stats: [string, string][];
  };

  b2b: {
    eyebrow: string;
    title: string;
    intro: string;
    points: string[];
    ctaLabel: string;
    ctaHref: string;
  };

  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    /** Action label for the phone button ("Зателефонувати"). */
    phoneLabel: string;
    /** The number itself, kept visible as small plain text. */
    phone: string;
    phoneHref: string;
    hours: string;
    telegramLabel: string;
    telegramHref: string;
    ctaLabel: string;
    ctaHref: string;
    officesLabel: string;
    officesHref: string;
  };

  faq: { title: string; intro: string; items: [string, string][] };

  knowledge: { eyebrow: string; title: string; intro: string; links: CityHubLink[] };

  finalCta: {
    eyebrow: string;
    title: string;
    intro: string;
    ctaPrimary: string;
    ctaPrimaryHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
  };
}

const CONTACT_FORM = '/contacts/#contact-form';
const PHONE_DISPLAY = '+38 (073) 425 14 00';
const PHONE_HREF = 'tel:+380734251400';

const kyiv: CityHub = {
  slug: 'kyiv',
  cityNominative: 'Київ',
  cityLocative: 'у Києві',
  projectCity: 'Київ',

  meta: {
    title: 'Скляні конструкції на замовлення в Києві — Space Glass',
    description:
      'Виготовлення та монтаж скляних конструкцій у Києві та області — душові, перегородки, огорожі, фасади й алюмінієві рішення. Від заміру до монтажу на об’єкті.'
  },

  hero: {
    eyebrow: 'SPACE GLASS · КИЇВ',
    h1: 'Скляні конструкції на замовлення в Києві',
    lead:
      'Проєктуємо, виготовляємо та монтуємо скляні конструкції в Києві та Київській області — душові, перегородки, двері, огорожі, дзеркала, безрамне скління та фасади, а також алюмінієві системи, перголи та ZIP-системи сонцезахисту. Від заміру й технічного рішення до готового монтажу на об’єкті.',
    ctaPrimary: 'Отримати розрахунок',
    ctaPrimaryHref: CONTACT_FORM,
    ctaSecondary: 'Переглянути проєкти в Києві',
    ctaSecondaryHref: '/projects/',
    image: {
      src: '/images/city/kyiv/kyiv-hero-osocor-1440.webp',
      srcset:
        '/images/city/kyiv/kyiv-hero-osocor-768.webp 768w, /images/city/kyiv/kyiv-hero-osocor-1440.webp 1440w',
      sizes: '(max-width: 900px) 100vw, 48vw',
      width: 1440,
      height: 958,
      alt: 'Скляне фасадне та безрамне скління тераси OSOCOR RESIDENCE у Києві',
      href: '/projects/osocor-residence-glazing-kyiv/',
      mobileSrc: '/images/city/kyiv/kyiv-hero-osocor-768.webp',
      mobileSrcset:
        '/images/city/kyiv/kyiv-hero-osocor-768.webp 768w'
    }
  },

  makeSection: {
    eyebrow: 'Напрямки',
    title: 'Що ми виготовляємо та монтуємо в Києві',
    intro:
      'Повний цикл роботи зі склом та алюмінієм: від душових і перегородок для квартири до фасадного скління й алюмінієвих систем для комерційних об’єктів. Оберіть напрям, щоб побачити конкретні рішення, приклади та умови.',
    allLinkLabel: 'Переглянути всі напрямки та послуги →',
    allLinkHref: '/poslugy/',
    // "Алюмінієві конструкції" is a shared homepage card; перголи та ZIP-системи
    // are confirmed part of this direction (src/content/i18n/pages/catalog.ts,
    // src/pages/alyuminiievi-konstruktsii/index.astro) but have no dedicated URL,
    // so we only enrich the existing card's description — no new card, no new URL.
    categoryOverrides: {
      '/alyuminiievi-konstruktsii/':
        'Вікна, двері, фасадні та розсувні системи, зимові сади, перголи та ZIP-системи сонцезахисту.'
    }
  },

  localIntro: {
    eyebrow: 'Локальний сервіс',
    title: 'Скляні конструкції з монтажем у Києві',
    paragraphs: [
      'Працюємо з об’єктами будь-якого формату: квартира, приватний будинок, офіс, ресторан, магазин чи шоурум, інший комерційний простір — і на нових об’єктах, і на реконструкції.',
      'Окрім скляних конструкцій, для приватних будинків, терас, ресторанів і комерційних об’єктів виготовляємо перголи, ZIP-системи сонцезахисту та алюмінієві архітектурні системи. Скло, профіль і фурнітуру підбираємо під конкретне приміщення та спосіб експлуатації.',
      'Весь маршрут проходимо разом із клієнтом: замір на об’єкті → технічне рішення → виготовлення на власному виробництві → доставка → монтаж готової конструкції.'
    ],
    asideTitle: 'Повний цикл',
    asideItems: [
      'Замір на об’єкті',
      'Власне виробництво',
      'Доставка по Києву та області',
      'Професійний монтаж',
      'Гарантія 2 роки'
    ]
  },

  scenarios: {
    eyebrow: 'За типом об’єкта',
    title: 'Рішення для різних об’єктів',
    intro: 'Типові набори конструкцій для житлових і комерційних просторів — з прикладами реалізацій та рекомендаціями щодо вибору.',
    cards: [
      {
        title: 'Для квартири',
        text: 'Душові кабіни та шторки, дзеркала з підсвіткою, міжкімнатні й Loft-перегородки, скляні двері.',
        href: '/rishennya/dlya-kvartyry/'
      },
      {
        title: 'Для приватного будинку',
        text: 'Огорожі для сходів і терас, безрамне скління, душові конструкції, перголи та системи сонцезахисту.',
        href: '/rishennya/dlya-budynku/'
      },
      {
        title: 'Для офісу',
        text: 'Офісні перегородки, скляні двері, переговорні кабінети та зонування робочого простору.',
        href: '/rishennya/dlya-ofisu/'
      },
      {
        title: 'Для бізнесу',
        text: 'Вітрини, вхідні групи, фасадне скління та перегородки для магазинів і кафе, а також перголи та ZIP-системи для терас ресторанів.',
        href: '/rishennya/dlya-magazynu/'
      }
    ]
  },

  projectsSection: {
    eyebrow: 'Локальний досвід',
    title: 'Реалізовані проєкти в Києві',
    intro: 'Реальні об’єкти Space Glass у квартирах, приватних будинках і комерційних просторах Києва: задача клієнта, технічне рішення, матеріали та готовий результат на конкретному об’єкті.',
    viewAllLabel: 'Переглянути всі проєкти →',
    viewAllHref: '/projects/',
    emptyText: 'Проєкти для цього міста готуються до публікації.',
    gridAriaLabel: 'Реалізовані проєкти в Києві'
  },

  processSection: {
    eyebrow: 'Як це працює',
    title: 'Як проходить замір і монтаж у Києві',
    steps: [
      ['Запит', 'Отримуємо фото, розміри або проєкт.'],
      ['Попередній розрахунок', 'Уточнюємо тип конструкції та бюджет.'],
      ['Виїзд на замір', 'Фахівець виїжджає на об’єкт у Києві або області.'],
      ['Технічний проєкт', 'Фіксуємо розміри, кріплення, скло та фурнітуру.'],
      ['Виготовлення', 'Конструкція виготовляється за погодженими даними.'],
      ['Доставка та монтаж', 'Доставляємо й монтуємо на об’єкті.']
    ]
  },

  geography: {
    eyebrow: 'Географія',
    title: 'Працюємо по Києву та Київській області',
    paragraphs: [
      'Основна команда Space Glass працює в Києві та в містах Київської області в радіусі приблизно 50 км. Тут замір, доставку та монтаж організовуємо в межах звичайного графіка.',
      'Для віддаленіших адрес Київської області формат виїзду на замір, логістику й монтаж узгоджуємо окремо — залежно від типу конструкції, обсягу робіт і доступу на об’єкт. Принцип роботи при цьому не змінюється: конструкцію проєктують за фактичними параметрами приміщення.'
    ],
    asideTitle: 'Зона роботи',
    // Confirmed by Space Glass: Kyiv + oblast towns within ~50 km.
    areas: ['Київ', 'Ірпінь', 'Буча', 'Бровари', 'Вишневе', 'Вишгород', 'Бориспіль']
  },

  cost: {
    eyebrow: 'Вартість',
    title: 'Від чого залежить вартість скляної конструкції в Києві',
    intro:
      'Єдиної ціни «за конструкцію» не існує: вартість формують кілька параметрів, які визначають після заміру та узгодження комплектації.',
    factors: [
      ['Розміри', 'Габарити полотна та загальна площа скління безпосередньо впливають на витрату матеріалу.'],
      ['Тип конструкції', 'Душова, перегородка, огорожа, безрамна система чи фасад мають різну складність і комплектацію.'],
      ['Вид і товщина скла', 'Тип, обробку та товщину скла підбираємо відповідно до конструкції, розмірів і вимог безпеки — прозоре, матове чи тоноване, загартоване або ламіноване.'],
      ['Фурнітура', 'Петлі, профілі, конектори та системи відкривання — від базових до преміальних серій.'],
      ['Складність кріплення', 'Спосіб монтажу, стан стін і стелі, потреба у прихованих або посилених кріпленнях.'],
      ['Доставка та монтаж', 'Адреса в Києві чи області, поверх, доступ на об’єкт та обсяг монтажних робіт.']
    ],
    ctaLabel: 'Отримати розрахунок',
    ctaHref: CONTACT_FORM
  },

  why: {
    eyebrow: 'Досвід Space Glass',
    title: 'Чому Space Glass',
    intro:
      'Space Glass працює зі скляними та алюмінієвими конструкціями з 2014 року. Супроводжуємо житлові, комерційні й архітектурні проєкти від консультації та креслень до виготовлення, логістики й монтажу.',
    aboutLabel: 'Про Space Glass →',
    aboutHref: '/about/',
    stats: [
      ['10+', 'років реального досвіду'],
      ['5 000+', 'реалізованих проєктів'],
      ['50 000+', 'м² виконаного засклення'],
      ['3 міста', 'Київ · Одеса · Львів']
    ]
  },

  b2b: {
    eyebrow: 'Для бізнесу',
    title: 'Для дизайнерів, архітекторів і бізнесу в Києві',
    intro:
      'Працюємо з фахівцями та компаніями над приватними й комерційними об’єктами — від окремої конструкції до комплектації всього об’єкта.',
    points: [
      'Робота за кресленнями та дизайн-проєктом',
      'Технічні консультації щодо скла, вузлів і кріплень',
      'Підбір скляних, алюмінієвих, пергольних і ZIP-систем під проєкт',
      'Розрахунок за проєктом і специфікацією',
      'Комплектація об’єктів різного масштабу',
      'Приватні та комерційні замовлення'
    ],
    ctaLabel: 'Обговорити проєкт',
    ctaHref: CONTACT_FORM
  },

  contact: {
    eyebrow: 'Заявка',
    title: 'Замовити замір у Києві',
    intro:
      'Надішліть фото, приблизні розміри або креслення — підготуємо попередній розрахунок і запропонуємо технічне рішення. За потреби організуємо виїзд фахівця на замір у Києві чи області.',
    phoneLabel: 'Зателефонувати',
    phone: PHONE_DISPLAY,
    phoneHref: PHONE_HREF,
    hours: 'Пн–Пт: 09:00–19:00',
    telegramLabel: 'Telegram',
    telegramHref: 'https://t.me/spaceglass',
    ctaLabel: 'Отримати розрахунок',
    ctaHref: CONTACT_FORM,
    officesLabel: 'Контакти та офіс у Києві →',
    officesHref: '/contacts/'
  },

  faq: {
    title: 'Поширені запитання про скляні конструкції в Києві',
    intro: 'Відповіді про розрахунок, замір, роботу по області, типи конструкцій, скло, строки та монтаж.',
    items: [
      ['Скільки коштують скляні конструкції в Києві?', 'Вартість залежить від типу конструкції, розмірів, виду й товщини скла, фурнітури, складності кріплення та монтажу. Точну ціну називаємо після заміру й узгодження комплектації, попередню — за фото та орієнтовними розмірами.'],
      ['Як отримати попередній розрахунок?', 'Надішліть через форму або в Telegram фото місця монтажу, приблизні розміри та короткий опис задачі. Цього достатньо, щоб підготувати попередню оцінку й підказати оптимальне рішення.'],
      ['Чи виїжджаєте ви на замір по Києву?', 'Так. Після первинного узгодження задачі фахівець виїжджає на об’єкт у Києві, знімає точні розміри, перевіряє геометрію отвору й умови кріплення.'],
      ['Чи працюєте по Київській області?', 'Так. У найближчих містах області (Ірпінь, Буча, Бровари, Вишневе, Вишгород, Бориспіль та інші в радіусі приблизно 50 км) працюємо так само, як у Києві. Для віддаленіших адрес формат виїзду, доставки й монтажу узгоджуємо окремо.'],
      ['Які скляні конструкції виготовляєте?', 'Душові конструкції, перегородки, скляні двері, огорожі, дзеркала, безрамне скління, фасадні рішення, а також алюмінієві та металопластикові системи.'],
      ['Чи робите душові кабіни на замовлення?', 'Так. Душові Walk-in, кабіни в нішу, кутові, розсувні конструкції та шторки для ванни виготовляємо за фактичними розмірами санвузла.'],
      ['Чи встановлюєте скляні перегородки?', 'Так. Виготовляємо й монтуємо стаціонарні, розсувні, міжкімнатні, офісні та Loft-перегородки з підбором скла й профілю під приміщення.'],
      ['Чи робите скляні огорожі?', 'Так. Огорожі для сходів, балконів, терас і майданчиків — безрамні, на стійках або з поручнем; тип і товщину скла визначають за геометрією та навантаженнями.'],
      ['Чи виготовляєте скляні двері?', 'Так. Розпашні, розсувні, маятникові двері та двері в алюмінієвому профілі — для житлових і комерційних приміщень.'],
      ['Чи працюєте з безрамним склінням?', 'Так. Безрамні системи застосовуємо для терас, балконів, альтанок і панорамних розсувних конструкцій, коли важливі максимум світла й мінімум видимих профілів.'],
      ['Чи можна отримати розрахунок за кресленням?', 'Так. Працюємо з кресленнями, дизайн-проєктами, PDF та DWG; технічні вузли й фінальні розміри уточнюємо після перевірки фактичної геометрії об’єкта.'],
      ['Чи працюєте з дизайнерами та архітекторами?', 'Так. Ведемо об’єкти за проєктною документацією, консультуємо щодо скла та вузлів, готуємо специфікацію й комплектуємо об’єкт.'],
      ['Чи працюєте з юридичними особами?', 'Так. Працюємо з компаніями та підприємцями за договором, готуємо комерційну пропозицію під потрібний обсяг робіт.'],
      ['Які строки виготовлення?', 'Термін залежить від типу конструкції, скла, обробки та фурнітури. Орієнтовний строк називаємо після узгодження креслень і комплектації.'],
      ['Скільки триває монтаж?', 'Простий монтаж (наприклад, невелика душова) зазвичай виконують за один виїзд; складні перегородки, огорожі та фасадні роботи потребують більше часу. Точний графік фіксуємо в пропозиції.'],
      ['Чи є гарантія?', 'Так. На конструкції Space Glass діє гарантія 2 роки; умови й обсяг фіксуємо в документах на замовлення.'],
      ['Яке скло використовуєте?', 'Використовуємо безпечне скло — загартоване або триплекс, прозоре, матове чи тоноване. Тип і товщину підбирають під конструкцію, навантаження та умови експлуатації.'],
      ['Коли потрібно робити замір?', 'Точний замір виконують після готовності поверхонь, прорізів і комунікацій, які впливають на конструкцію. Це дозволяє коректно підготувати креслення та вузли примикання.'],
      ['Чи можна замовити тільки виготовлення без монтажу?', 'Для частини конструкцій можливі окреме виготовлення та доставка без монтажу. Можливість залежить від типу системи й способу кріплення — уточнюємо під конкретний запит.'],
      ['Як замовити конструкцію в Києві?', 'Залиште заявку через форму або зв’яжіться в Telegram чи телефоном. Ми узгодимо задачу, підготуємо попередній розрахунок, організуємо замір і далі — технічне рішення, виготовлення, доставку та монтаж.']
    ]
  },

  knowledge: {
    eyebrow: 'База знань',
    title: 'Корисно перед замовленням',
    intro: 'Короткі матеріали, які допоможуть підготуватися до заміру та свідомо обрати конструкцію.',
    links: [
      { label: 'Як підготувати простір до заміру', href: '/knowledge/yak-pidhotuvaty-prostir-do-zamiru/' },
      { label: 'Скло 8, 10 чи 12 мм: як обирають товщину', href: '/knowledge/tovshchyna-skla-8-10-12-mm/' },
      { label: 'Від чого залежить ціна скляної конструкції', href: '/knowledge/vid-choho-zalezhyt-tsina-sklyanoyi-konstruktsiyi/' },
      { label: 'Як доглядати за скляними конструкціями', href: '/knowledge/doglyad-za-sklyanymy-konstruktsiyamy/' },
      { label: 'Як обрати душову кабіну зі скла', href: '/knowledge/yak-obraty-dushovu-kabinu/' },
      { label: 'Як обрати скляну перегородку', href: '/knowledge/yak-obraty-sklyanu-perehorodku/' },
      { label: 'Скляні огорожі: безпека, скло та кріплення', href: '/knowledge/sklyani-ohorozhi-vymohy-bezpeka/' },
      { label: 'Системи безрамного скління: як обрати механіку', href: '/knowledge/bezramne-sklinnya-systemy-yak-obraty/' }
    ]
  },

  finalCta: {
    eyebrow: 'Ваш проєкт',
    title: 'Обговоримо вашу конструкцію в Києві',
    intro: 'Надішліть фото, приблизні розміри або креслення — уточнимо задачу, запропонуємо рішення та підготуємо попередній розрахунок.',
    ctaPrimary: 'Отримати розрахунок',
    ctaPrimaryHref: CONTACT_FORM,
    ctaSecondary: 'Зателефонувати',
    ctaSecondaryHref: PHONE_HREF
  }
};

export const cityHubs: Record<string, CityHub> = { kyiv };

export function getCityHub(slug: string): CityHub {
  const hub = cityHubs[slug];
  if (!hub) throw new Error(`Unknown city hub: ${slug}`);
  return hub;
}

// Locale is accepted by the template for forward-compatibility, but city hub
// pages are uk-only for now (no /ru/city/ routes) — mirrors the projects
// collection, which is also uk-only.
export type CityHubLocale = Locale;

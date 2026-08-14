export const supportedSeoLocales = ['uk', 'ru'] as const;
export type SeoLocale = (typeof supportedSeoLocales)[number];

export interface LocalizedSeoCopy {
  name: string;
  shortName: string;
  intro: string;
  benefit: string;
}

export interface SeoService {
  locale: SeoLocale;
  categorySlug: string;
  categoryName: string;
  slug: string;
  path: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  benefit: string;
  relatedPaths: string[];
}

interface CategorySeed {
  slug: string;
  name: string;
  context: string;
  services: Array<[slug: string, name: string, shortName: string, benefit: string]>;
}

const categories: CategorySeed[] = [
  { slug: 'dushovi-konstruktsii', name: 'Душові конструкції', context: 'ванної кімнати', services: [
    ['dushova-kabina-walk-in', 'Душова кабіна Walk-in на замовлення', 'Душова Walk-in', 'відкрита конструкція візуально збільшує простір'],
    ['dushova-kabina-v-nishu', 'Душова кабіна в нішу на замовлення', 'Кабіна в нішу', 'точне прилягання допомагає використати кожен сантиметр'],
    ['kutova-dushova-kabina', 'Кутова душова кабіна зі скла', 'Кутова кабіна', 'кутове рішення економить корисну площу'],
    ['rozsuvna-dushova-kabina', 'Розсувна душова кабіна на замовлення', 'Розсувна кабіна', 'розсувний механізм не потребує місця для відкривання'],
    ['dushovi-dveri-zi-skla', 'Скляні двері для душової', 'Душові двері', 'герметичні двері доповнюють нішу без зайвих профілів'],
    ['perehorodka-dlia-dushu', 'Скляна перегородка для душу', 'Перегородка для душу', 'нерухоме скло захищає кімнату від бризок'],
    ['shtorka-na-vannu-zi-skla', 'Скляна шторка на ванну', 'Шторка на ванну', 'скляний екран поєднує ванну і комфорт душу'],
    ['pyatikutna-dushova-kabina', 'П’ятикутна душова кабіна', 'П’ятикутна кабіна', 'скошені кути полегшують прохід у компактній кімнаті']
  ]},
  { slug: 'sklyani-perehorodky', name: 'Скляні перегородки', context: 'зонування простору', services: [
    ['ofisni-sklyani-perehorodky', 'Офісні скляні перегородки', 'Офісні перегородки', 'прозоре зонування зберігає світло в офісі'],
    ['mizhkimnatni-sklyani-perehorodky', 'Міжкімнатні скляні перегородки', 'Міжкімнатні перегородки', 'легка межа не перевантажує інтер’єр'],
    ['rozsuvni-sklyani-perehorodky', 'Розсувні скляні перегородки', 'Розсувні перегородки', 'рухомі секції швидко змінюють планування'],
    ['sklyani-perehorodky-loft', 'Скляні перегородки Loft', 'Перегородки Loft', 'ритмічний металевий профіль створює виразний акцент'],
    ['bezramni-sklyani-perehorodky', 'Безрамні скляні перегородки', 'Безрамні перегородки', 'мінімум кріплень забезпечує чистий сучасний вигляд'],
    ['stacionarni-sklyani-perehorodky', 'Стаціонарні перегородки зі скла', 'Стаціонарні перегородки', 'нерухома система надійно розділяє функціональні зони'],
    ['mobilni-sklyani-perehorodky', 'Мобільні скляні перегородки', 'Мобільні перегородки', 'модулі дозволяють адаптувати приміщення до подій'],
    ['akustychni-sklyani-perehorodky', 'Акустичні скляні перегородки', 'Акустичні перегородки', 'посилене скління підвищує акустичний комфорт'],
    ['perehorodky-dlia-restoranu', 'Скляні перегородки для ресторану', 'Перегородки для ресторану', 'прозорі екрани формують затишні гостьові зони']
  ]},
  { slug: 'sklyani-dveri', name: 'Скляні двері', context: 'приватного й комерційного інтер’єру', services: [
    ['rozpashni-sklyani-dveri', 'Розпашні скляні двері', 'Розпашні двері', 'класичне відкривання зручне для щоденного користування'],
    ['rozsuvni-sklyani-dveri', 'Розсувні скляні двері', 'Розсувні двері', 'полотно вздовж стіни звільняє площу'],
    ['mayatnykovi-sklyani-dveri', 'Маятникові скляні двері', 'Маятникові двері', 'відкривання в обидва боки прискорює рух людей'],
    ['dveri-v-aliuminiievomu-profili', 'Скляні двері в алюмінієвому профілі', 'Двері в профілі', 'алюмінієва рама додає жорсткості та виразності'],
    ['matovi-sklyani-dveri', 'Матові скляні двері', 'Матові двері', 'сатиноване скло забезпечує більше приватності'],
    ['sklyani-dveri-dlia-ofisu', 'Скляні двері для офісу', 'Офісні двері', 'лаконічне полотно підтримує відкриту офісну архітектуру']
  ]},
  { slug: 'sklyani-ohorozhi', name: 'Скляні огорожі', context: 'сходів, терас і балконів', services: [
    ['sklyani-peryla-dlia-skhodiv', 'Скляні перила для сходів', 'Перила для сходів', 'безпечне скління залишає сходи візуально легкими'],
    ['bezramni-sklyani-ohorozhi', 'Безрамні скляні огорожі', 'Безрамні огорожі', 'прихований профіль відкриває максимальний огляд'],
    ['sklyani-ohorozhi-balkoniv', 'Скляні огорожі балконів', 'Огорожі балконів', 'триплекс захищає край і не закриває краєвид'],
    ['sklyani-ohorozhi-teras', 'Скляні огорожі терас', 'Огорожі терас', 'прозорий бар’єр захищає терасу від вітру'],
    ['sklyani-ohorozhi-na-stiykakh', 'Скляні огорожі на стійках', 'Огорожі на стійках', 'стійки забезпечують надійне модульне кріплення'],
    ['sklyani-poruchni', 'Скляні огорожі з поручнем', 'Огорожі з поручнем', 'поручень додає зручну опору вздовж маршруту']
  ]},
  { slug: 'dzerkala', name: 'Дзеркала', context: 'дому та бізнесу', services: [
    ['dzerkalo-za-rozmirom', 'Дзеркало за індивідуальним розміром', 'Дзеркало за розміром', 'точний формат гармонійно заповнює вибрану площину'],
    ['dzerkalo-z-pidsvitkoyu', 'Дзеркало з LED-підсвіткою', 'Дзеркало з підсвіткою', 'рівномірне LED-світло покращує щоденний комфорт'],
    ['dzerkalo-u-vannu', 'Дзеркало у ванну кімнату', 'Дзеркало у ванну', 'вологостійке виконання розраховане на умови ванної'],
    ['dzerkalna-stina', 'Дзеркальна стіна на замовлення', 'Дзеркальна стіна', 'велика дзеркальна площина візуально розширює приміщення'],
    ['dzerkalo-v-rami', 'Дзеркало в металевій рамі', 'Дзеркало в рамі', 'тонка рама завершує форму та захищає край'],
    ['dzerkalo-dlia-sportzalu', 'Дзеркала для спортивного залу', 'Дзеркала для спортзалу', 'великі модулі дають повний огляд тренувальної зони']
  ]},
  { slug: 'sklyani-fasady', name: 'Скляні фасади', context: 'комерційної та приватної архітектури', services: [
    ['sklyani-fasady-budynkiv', 'Скляні фасади будинків', 'Фасади будинків', 'енергоефективне скління наповнює будівлю денним світлом'],
    ['stiykovo-ryhelne-sklinnya', 'Стійково-ригельне скління фасадів', 'Стійково-ригельне скління', 'системний каркас перекриває фасади складної геометрії'],
    ['strukturne-sklinnya-fasadu', 'Структурне скління фасаду', 'Структурне скління', 'приховані кріплення створюють суцільну скляну поверхню'],
    ['vitrinne-sklinnya', 'Вітринне скління магазинів', 'Вітринне скління', 'прозорий фасад відкриває товари та простір перехожим'],
    ['sklyani-vkhidni-hrupy', 'Скляні вхідні групи', 'Вхідні групи', 'єдина система формує світлий і помітний вхід']
  ]},
  { slug: 'bezramne-sklinnya', name: 'Безрамне скління', context: 'відкритих і житлових просторів', services: [
    ['bezramne-sklinnya-terasy', 'Безрамне скління тераси', 'Скління тераси', 'рухомі панелі продовжують сезон користування терасою'],
    ['bezramne-sklinnya-balkona', 'Безрамне скління балкона', 'Скління балкона', 'панорамна система захищає балкон без важких рам'],
    ['bezramne-sklinnya-altanky', 'Безрамне скління альтанки', 'Скління альтанки', 'скляний контур захищає від опадів і зберігає огляд'],
    ['panoramne-sklinnya', 'Панорамне скління на замовлення', 'Панорамне скління', 'великоформатне скло поєднує інтер’єр із краєвидом'],
    ['sklyani-rozsuvni-systemy', 'Розсувні безрамні системи', 'Розсувні системи', 'секції легко паркуються та повністю відкривають отвір']
  ]},
  { slug: 'sklo-dlia-biznesu', name: 'Скло для бізнесу', context: 'магазинів, офісів і закладів', services: [
    ['sklyani-vitriny-dlia-mahazynu', 'Скляні вітрини для магазину', 'Вітрини для магазину', 'прозора конструкція вигідно презентує асортимент'],
    ['sklyani-kozyrky', 'Скляні козирки над входом', 'Скляні козирки', 'ламіноване скло захищає вхід від опадів'],
    ['sklyani-stilnytsi', 'Скляні стільниці на замовлення', 'Скляні стільниці', 'загартована поверхня легко очищується та не боїться вологи'],
    ['sklyani-politsi', 'Скляні полиці на замовлення', 'Скляні полиці', 'точно оброблені полиці витримують щоденне навантаження'],
    ['sklyani-doshky-dlia-ofisu', 'Скляні маркерні дошки для офісу', 'Скляні маркерні дошки', 'гладка поверхня не вбирає сліди маркера']
  ]}
];

const flatSeeds = categories.flatMap((category) =>
  category.services.map(([slug, name, shortName, benefit]) => ({ category, slug, name, shortName, benefit }))
);

export const ukSeoServices: SeoService[] = flatSeeds.map(({ category, slug, name, shortName, benefit }, index) => {
  const peers = category.services.filter(([peerSlug]) => peerSlug !== slug).slice(0, 3);
  const crossCategory = flatSeeds[(index + 13) % flatSeeds.length];
  return {
    locale: 'uk',
    categorySlug: category.slug,
    categoryName: category.name,
    slug,
    path: `/poslugy/${category.slug}/${slug}/`,
    name,
    shortName,
    title: `${name} у Києві та Україні — ціна, монтаж | Space Glass`,
    description: `${name}: проєктування, точний замір, безпечне скло та професійний монтаж. ${benefit}. Розрахуйте вартість у Space Glass.`,
    h1: `${name} від Space Glass`,
    intro: `Проєктуємо й виготовляємо ${name.toLocaleLowerCase('uk-UA')} для ${category.context}. Підбираємо тип скла, фурнітуру та спосіб кріплення під розміри й умови вашого об’єкта.`,
    benefit,
    relatedPaths: [
      ...peers.map(([peerSlug]) => `/poslugy/${category.slug}/${peerSlug}/`),
      `/poslugy/${crossCategory.category.slug}/${crossCategory.slug}/`
    ]
  };
});

export const seoServiceByPath = new Map(ukSeoServices.map((service) => [service.path, service]));
export const seoCategories = categories.map(({ slug, name }) => ({
  slug,
  name,
  services: ukSeoServices.filter((service) => service.categorySlug === slug)
}));

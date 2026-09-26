/**
 * Extra content for the 6 solution pages /rishennya/dlya-{...}/ rendered by
 * src/components/solutions/SolutionDetailPage.astro. The page files keep their
 * own texts (hero, scenarios, materials, FAQ…); this file adds the parts that
 * make the pages consistent with the rest of the site: photo tiles that point to
 * the exact subpages, a per-object project selection, SEO copy and the
 * location keyword used in the geography block.
 */

export interface SolutionTile {
  label: string;
  href: string;
  image: string;
  note: string;
}

export interface SolutionExtra {
  /** Short noun used in headings: "для квартири", "для офісу"… */
  forWhom: string;
  tiles: SolutionTile[];
  projectSlugs: string[];
  seoHeading: string;
  seo: string[];
  /** Label of this solution in the "other solutions" strip. */
  navLabel: string;
  image: string;
}

const P = (slug: string, file = `${slug}-hero-480.webp`) => `/images/projects/${slug}/${file}`;
const PS = '/images/catalog/profile-systems';
const DZ = '/images/catalog/dzerkala';
const SH = '/images/catalog/dushovi-kabiny/models';

export const solutionExtras: Record<string, SolutionExtra> = {
  '/rishennya/dlya-kvartyry/': {
    forWhom: 'для квартири',
    navLabel: 'Для квартири',
    image: '/images/solutions-new/solution-apartment-640.webp',
    tiles: [
      { label: 'Душові кабіни', href: '/dushovi-kabiny/', image: '/images/catalog/dushovi-kabiny/dushovi-kabiny-768.webp', note: 'Кутові, у нішу, розсувні та Walk-In' },
      { label: 'Перегородки для душу', href: '/dushovi-kabiny/peregorodka-dlya-dusha/', image: `${SH}/cat-peregorodka-dlya-dusha-480.webp`, note: 'Walk-In без дверей від 10 526 грн' },
      { label: 'Loft-перегородки', href: '/sklyani-perehorodky/loft/', image: P('loft-kyiv', 'loft-partition-atlant-kyiv-hero-480.webp'), note: 'Кухня, вітальня, спальня' },
      { label: 'Міжкімнатні перегородки', href: '/sklyani-perehorodky/mizhkimnatni/', image: P('kitchen-partition-fjord-kyiv'), note: 'Зонування без втрати світла' },
      { label: 'Скляні двері', href: '/sklyani-dveri/', image: P('wardrobe-partition-crystal-springs-kyiv'), note: 'Розпашні, розсувні, приховані' },
      { label: 'Дзеркала з підсвіткою', href: '/dzerkala/led-dzerkala/', image: `${DZ}/cat-led-480.webp`, note: 'Для ванної та передпокою' },
      { label: 'Шторки на ванну', href: '/dushovi-kabiny/shtorky-dlya-vannoyi/', image: `${SH}/cat-shtorky-dlya-vannoyi-480.webp`, note: 'Замість текстильної шторки' },
      { label: 'Металопластикові вікна', href: '/metaloplastykovi-konstruktsii/vikna/', image: `${PS}/cat-pvc-vikna-480.webp`, note: 'Aluplast, WDS, Ultra' }
    ],
    projectSlugs: ['loft-kyiv', 'kitchen-partition-fjord-kyiv', 'bath-screen-akvarel-odesa', 'mirrored-wardrobe-doors-milos-odesa', 'wardrobe-partition-crystal-springs-kyiv', 'folding-shower-doors-varshavskyi-kyiv'],
    seoHeading: 'Скляні конструкції для квартири на замовлення',
    seo: [
      'Скло в квартирі вирішує дві задачі: додає світла там, де його бракує, і розділяє простір без глухих стін. Найчастіше замовляють скляну душову кабіну чи перегородку для душу, Loft-перегородку між кухнею та вітальнею, скляні двері в гардеробну та дзеркало з підсвіткою для ванної.',
      'Space Glass проєктує конструкції під фактичні розміри квартири: заміряємо отвори після оздоблення, підбираємо загартоване скло, профіль і фурнітуру в одному стилі, виготовляємо та монтуємо без пошкодження ремонту.',
      'Працюємо з квартирами в новобудовах і вторинному житлі Києва, Одеси та Львова — від однієї душової до комплексного скління всієї квартири за дизайн-проєктом.'
    ]
  },
  '/rishennya/dlya-budynku/': {
    forWhom: 'для будинку',
    navLabel: 'Для будинку',
    image: '/images/solutions-new/solution-house-640.webp',
    tiles: [
      { label: 'Перила для сходів', href: '/poslugy/sklyani-ohorozhi/sklyani-peryla-dlia-skhodiv/', image: P('glass-stair-railing-private-house-odesa'), note: 'Безрамні та на стійках' },
      { label: 'Безрамне скління тераси', href: '/poslugy/bezramne-sklinnya/bezramne-sklinnya-terasy/', image: P('osocor-residence-glazing-kyiv'), note: 'Стулки повністю відкриваються' },
      { label: 'Розсувні двері на терасу', href: '/alyuminiievi-konstruktsii/rozsuvni-dveri/', image: `${PS}/cat-alu-rozsuvni-480.webp`, note: 'Aluprof до 4 м заввишки' },
      { label: 'Алюмінієві вікна', href: '/alyuminiievi-konstruktsii/vikna/', image: `${PS}/cat-alu-vikna-480.webp`, note: 'Теплі, з терморозривом' },
      { label: 'Зимові сади', href: '/alyuminiievi-konstruktsii/zymovi-sady/', image: `${PS}/cat-alu-zymovi-sady-480.webp`, note: 'Теплий або сезонний сад' },
      { label: 'Перголи', href: '/alyuminiievi-konstruktsii/perholy/', image: `${PS}/cat-alu-perholy-480.webp`, note: 'Ламелі, тент або скло' },
      { label: 'Огорожі балконів і терас', href: '/poslugy/sklyani-ohorozhi/sklyani-ohorozhi-teras/', image: P('glass-railing-primorski-sady-odesa'), note: 'Триплекс, безпечне скло' },
      { label: 'Дзеркала', href: '/dzerkala/', image: `${DZ}/cat-stina-480.webp`, note: 'LED, у рамі, на всю стіну' }
    ],
    projectSlugs: ['glass-stair-railing-private-house-odesa', 'osocor-residence-glazing-kyiv', 'led-mirror-private-house-kyiv', 'led-mirror-private-house-odesa', 'glass-railing-primorski-sady-odesa', 'shower-glass-to-ceiling-kyiv'],
    seoHeading: 'Скло та алюміній для приватного будинку',
    seo: [
      'Приватний будинок потребує рішень іншого масштабу, ніж квартира: панорамні вікна й розсувні двері на терасу, скляні огорожі сходів і балконів, безрамне скління тераси, зимовий сад чи пергола над зоною відпочинку.',
      'Space Glass поєднує скляні та алюмінієві системи в одному проєкті: алюмінієві вікна й двері Aluprof, безпечний триплекс для огорож, загартоване скло для душових і дзеркал. Колір профілю й фурнітури узгоджуємо для всього будинку.',
      'Проєктуємо конструкції разом із будівництвом — до стяжки та оздоблення, щоб правильно закласти пороги, закладні й водовідведення. Виконуємо замір і монтаж у Києві, Одесі, Львові та областях.'
    ]
  },
  '/rishennya/dlya-ofisu/': {
    forWhom: 'для офісу',
    navLabel: 'Для офісу',
    image: '/images/solutions-new/solution-office-meeting-room-640.webp',
    tiles: [
      { label: 'Офісні скляні перегородки', href: '/sklyani-perehorodky/ofisni/', image: P('office-partitions-morskyi-odesa'), note: 'Кабінети й переговорні' },
      { label: 'Алюмінієве офісне скління', href: '/alyuminiievi-konstruktsii/ofisne-sklinnya/', image: `${PS}/mb-45-office-2-480.webp`, note: 'Звукоізоляція до 50 дБ' },
      { label: 'Loft-перегородки', href: '/sklyani-perehorodky/loft/', image: P('loft-partitions-kselena-odesa'), note: 'Стильне зонування open space' },
      { label: 'Скляні двері для офісу', href: '/poslugy/sklyani-dveri/sklyani-dveri-dlia-ofisu/', image: P('world-of-comics-entrance-odesa'), note: 'Розпашні, маятникові, розсувні' },
      { label: 'Скляні вхідні групи', href: '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/', image: P('coffee-ocean-facade-odesa'), note: 'Представницький вхід' },
      { label: 'Маркерні дошки зі скла', href: '/poslugy/sklo-dlia-biznesu/sklyani-doshky-dlia-ofisu/', image: '/images/solutions-new/solution-office-meeting-room-640.webp', note: 'Для переговорних' },
      { label: 'Перегородки з ПВХ', href: '/metaloplastykovi-konstruktsii/ofisni-perehorodky/', image: `${PS}/cat-pvc-perehorodky-480.webp`, note: 'Економічне зонування' },
      { label: 'Фасадне скління', href: '/alyuminiievi-konstruktsii/fasadne-sklinnya/', image: `${PS}/cat-alu-fasady-480.webp`, note: 'Aluprof MB-MT50N' }
    ],
    projectSlugs: ['office-partitions-morskyi-odesa', 'dental-clinic-partitions-odesa', 'loft-partitions-kselena-odesa', 'world-of-comics-entrance-odesa', 'coffee-ocean-facade-odesa', 'restaurant-glazing-artshat-odesa'],
    seoHeading: 'Скляні перегородки та скління для офісу',
    seo: [
      'Скляні перегородки — стандарт сучасного офісу: вони ділять простір на кабінети й переговорні, зберігаючи денне світло на кожному робочому місці та відчуття відкритої команди.',
      'Space Glass пропонує рамні та безрамні офісні перегородки, алюмінієві системи Aluprof зі звукоізоляцією до 50 дБ, скляні двері, вхідні групи й маркерні дошки зі скла. Для економічних проєктів — перегородки з ПВХ-профілю.',
      'Монтуємо у вихідні або вечірній час, щоб не зупиняти роботу офісу. Працюємо з бізнес-центрами, клініками й коворкінгами в Києві, Одесі та Львові.'
    ]
  },
  '/rishennya/dlya-hotelyu/': {
    forWhom: 'для готелю',
    navLabel: 'Для готелю',
    image: '/images/solutions-new/solution-hotel-640.webp',
    tiles: [
      { label: 'Душові кабіни для номерів', href: '/dushovi-kabiny/', image: P('hotel-dvoryanskyi-showers-odesa'), note: 'Однаковий стандарт для всіх номерів' },
      { label: 'Перегородки для душу', href: '/dushovi-kabiny/peregorodka-dlya-dusha/', image: `${SH}/cat-peregorodka-dlya-dusha-480.webp`, note: 'Walk-In без дверей' },
      { label: 'Шторки на ванну', href: '/dushovi-kabiny/shtorky-dlya-vannoyi/', image: `${SH}/cat-shtorky-dlya-vannoyi-480.webp`, note: 'Для номерів із ванною' },
      { label: 'Дзеркала з підсвіткою', href: '/dzerkala/led-dzerkala/', image: `${DZ}/cat-led-480.webp`, note: 'IP44 для санвузлів' },
      { label: 'Скляні огорожі', href: '/sklyani-ohorozhi/', image: P('glass-railing-primorski-sady-odesa'), note: 'Балкони, сходи, тераси' },
      { label: 'Скляні вхідні групи', href: '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/', image: P('restaurant-glazing-artshat-odesa'), note: 'Вхід і лобі' },
      { label: 'Скляні двері', href: '/sklyani-dveri/', image: P('world-of-comics-entrance-odesa'), note: 'Лобі, ресторан, SPA' },
      { label: 'Безрамне скління тераси', href: '/poslugy/bezramne-sklinnya/bezramne-sklinnya-terasy/', image: P('osocor-residence-glazing-kyiv'), note: 'Ресторан і лаунж-зона' }
    ],
    projectSlugs: ['hotel-dvoryanskyi-showers-odesa', 'shower-glass-to-ceiling-kyiv', 'shower-wall-to-wall-brass-kyiv', 'glass-railing-primorski-sady-odesa', 'restaurant-glazing-artshat-odesa', 'osocor-residence-glazing-kyiv'],
    seoHeading: 'Скляні конструкції для готелю',
    seo: [
      'У готелі скло працює щодня з великим навантаженням: душові кабіни в номерах, дзеркала в санвузлах, огорожі балконів, скляні двері лобі й ресторану. Тому важливі не лише вигляд, а й надійна фурнітура, безпечне скло та однаковий стандарт для всіх номерів.',
      'Space Glass виготовляє серії душових кабін і перегородок за типовими розмірами номерів, дзеркала з підсвіткою IP44, скляні огорожі з триплексу та вхідні групи. Для ресторану й тераси готелю — безрамне та алюмінієве скління.',
      'Реалізували душові для готелю «Дворянський» в Одесі. Працюємо поетапно, поверх за поверхом, щоб готель продовжував приймати гостей, у Києві, Одесі, Львові та по Україні.'
    ]
  },
  '/rishennya/dlya-restoranu/': {
    forWhom: 'для ресторану',
    navLabel: 'Для ресторану',
    image: '/images/solutions-new/solution-restaurant-640.webp',
    tiles: [
      { label: 'Тепле скління ресторану', href: '/alyuminiievi-konstruktsii/fasadne-sklinnya/', image: P('restaurant-glazing-artshat-odesa'), note: 'Алюмінієві системи Aluprof' },
      { label: 'Безрамне скління тераси', href: '/poslugy/bezramne-sklinnya/bezramne-sklinnya-terasy/', image: P('osocor-residence-glazing-kyiv'), note: 'Літній майданчик цілий рік' },
      { label: 'Розсувні двері', href: '/alyuminiievi-konstruktsii/rozsuvni-dveri/', image: `${PS}/cat-alu-rozsuvni-480.webp`, note: 'Відкриття залу на терасу' },
      { label: 'Перголи', href: '/alyuminiievi-konstruktsii/perholy/', image: `${PS}/cat-alu-perholy-480.webp`, note: 'Тінь і захист від дощу' },
      { label: 'Вітринне скління', href: '/poslugy/sklyani-fasady/vitrinne-sklinnya/', image: P('coffee-ocean-facade-odesa'), note: 'Кав’ярні та бари' },
      { label: 'Скляні перегородки', href: '/sklyani-perehorodky/', image: P('loft-partitions-kselena-odesa'), note: 'VIP-зали та кухня' },
      { label: 'Скляні вхідні групи', href: '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/', image: P('world-of-comics-entrance-odesa'), note: 'Помітний вхід' },
      { label: 'Дзеркальні панно', href: '/dzerkala/dzerkalne-panno/', image: `${DZ}/cat-panno-480.webp`, note: 'Декор залу' }
    ],
    projectSlugs: ['restaurant-glazing-artshat-odesa', 'coffee-ocean-facade-odesa', 'osocor-residence-glazing-kyiv', 'loft-partitions-kselena-odesa', 'world-of-comics-entrance-odesa', 'office-partitions-morskyi-odesa'],
    seoHeading: 'Скління ресторанів, кафе та терас',
    seo: [
      'Для ресторану скло — частина концепції: панорамне скління залу, тераса, що працює в будь-яку погоду, помітна вхідна група та перегородки між залами. Правильне скління збільшує кількість посадкових місць і продовжує сезон літнього майданчика.',
      'Space Glass виконує тепле алюмінієве скління, безрамне скління терас, розсувні двері, перголи, вітрини кав’ярень і скляні перегородки для VIP-залів. Реалізували тепле скління ресторану «Артшат» і фасад кав’ярні Coffee Ocean в Одесі.',
      'Монтаж плануємо так, щоб заклад не закривався надовго. Працюємо з ресторанами, кафе й барами в Києві, Одесі, Львові та по Україні.'
    ]
  },
  '/rishennya/dlya-magazynu/': {
    forWhom: 'для магазину',
    navLabel: 'Для магазину',
    image: '/images/solutions-new/solution-shop-640.webp',
    tiles: [
      { label: 'Вітрини для магазину', href: '/poslugy/sklo-dlia-biznesu/sklyani-vitriny-dlia-mahazynu/', image: P('world-of-comics-entrance-odesa'), note: 'Презентація товару' },
      { label: 'Вітринне скління', href: '/poslugy/sklyani-fasady/vitrinne-sklinnya/', image: P('coffee-ocean-facade-odesa'), note: 'Фасад, що продає' },
      { label: 'Скляні вхідні групи', href: '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/', image: P('restaurant-glazing-artshat-odesa'), note: 'Помітний вхід із вулиці' },
      { label: 'Алюмінієві двері', href: '/alyuminiievi-konstruktsii/dveri/', image: `${PS}/cat-alu-dveri-480.webp`, note: 'MB-100GFT на 1 000 000 циклів' },
      { label: 'Скляні перегородки', href: '/sklyani-perehorodky/', image: P('loft-partitions-kselena-odesa'), note: 'Службові зони й примірочні' },
      { label: 'Скляні полиці', href: '/poslugy/sklo-dlia-biznesu/sklyani-politsi/', image: P('dental-clinic-partitions-odesa'), note: 'Торгове обладнання' },
      { label: 'Скляні козирки', href: '/poslugy/sklo-dlia-biznesu/sklyani-kozyrky/', image: `${PS}/cat-alu-fasady-480.webp`, note: 'Захист входу від опадів' },
      { label: 'Дзеркала для примірки', href: '/dzerkala/dzerkala-na-stinu/', image: `${DZ}/cat-stina-480.webp`, note: 'Ростові й на всю стіну' }
    ],
    projectSlugs: ['world-of-comics-entrance-odesa', 'coffee-ocean-facade-odesa', 'loft-partitions-kselena-odesa', 'dental-clinic-partitions-odesa', 'restaurant-glazing-artshat-odesa', 'office-partitions-morskyi-odesa'],
    seoHeading: 'Вітрини, вхідні групи та скло для магазину',
    seo: [
      'Для магазину скло — головний інструмент продажу з вулиці: вітрина показує товар, вхідна група запрошує зайти, а скляні двері й перегородки роблять торговий зал світлим і відкритим.',
      'Space Glass виготовляє вітринне скління, скляні вхідні групи, алюмінієві двері з ресурсом на мільйон відкривань, перегородки для службових зон і примірочних, скляні полиці, козирки й ростові дзеркала.',
      'Реалізували вхідну групу магазину World of Comics в Одесі. Працюємо з магазинами, бутиками й шоурумами в Києві, Одесі, Львові та по Україні — з урахуванням графіка роботи торгової точки.'
    ]
  }
};

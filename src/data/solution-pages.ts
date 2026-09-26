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
      { label: 'Перегородки для душу', href: '/dushovi-kabiny/peregorodka-dlya-dusha/', image: `${SH}/hero-peregorodka-dlya-dusha-480.webp`, note: 'Walk-In без дверей від 10 526 грн' },
      { label: 'Loft-перегородки', href: '/sklyani-perehorodky/loft/', image: P('loft-kyiv', 'loft-partition-atlant-kyiv-hero-480.webp'), note: 'Кухня, вітальня, спальня' },
      { label: 'Міжкімнатні перегородки', href: '/sklyani-perehorodky/mizhkimnatni/', image: P('kitchen-partition-fjord-kyiv'), note: 'Зонування без втрати світла' },
      { label: 'Скляні двері', href: '/sklyani-dveri/', image: P('wardrobe-partition-crystal-springs-kyiv'), note: 'Розпашні, розсувні, приховані' },
      { label: 'Дзеркала з підсвіткою', href: '/dzerkala/led-dzerkala/', image: `${DZ}/cat-led-480.webp`, note: 'Для ванної та передпокою' },
      { label: 'Шторки на ванну', href: '/dushovi-kabiny/shtorky-dlya-vannoyi/', image: `${SH}/hero-shtorky-dlya-vannoyi-480.webp`, note: 'Замість текстильної шторки' },
      { label: 'Металопластикові вікна', href: '/metaloplastykovi-konstrukcziyi/metaloplastykovi-vikna/', image: `${PS}/cat-pvc-vikna-480.webp`, note: 'Теплі багатокамерні профілі' }
    ],
    projectSlugs: ['loft-kyiv', 'kitchen-partition-fjord-kyiv', 'bath-screen-akvarel-odesa', 'mirrored-wardrobe-doors-milos-odesa', 'wardrobe-partition-crystal-springs-kyiv', 'folding-shower-doors-varshavskyi-kyiv'],
    seoHeading: 'Скляні конструкції для квартири на замовлення',
    seo: [
      'Скляні конструкції для квартири на замовлення — це спосіб додати світла й простору без капітального ремонту. Найчастіше замовляють скляну душову кабіну або перегородку для душу Walk-In, Loft-перегородку між кухнею та вітальнею, міжкімнатні скляні двері, скляні двері в гардеробну та дзеркало з LED-підсвіткою для ванної кімнати.',
      'Кожну конструкцію проєктуємо під фактичні розміри квартири: заміряємо отвори після оздоблення, враховуємо нерівні стіни, ухил підлоги й положення сантехніки. Використовуємо загартоване скло, триплекс для огорож, алюмінієвий профіль і фурнітуру в одному кольорі — чорному, білому, хромі чи золоті.',
      'Вартість скляної перегородки чи душової для квартири залежить від розмірів, типу скла, профілю й фурнітури. Попередній розрахунок робимо за фото та приблизними розмірами, точну ціну фіксуємо після заміру — без прихованих доплат.',
      'Працюємо з квартирами в новобудовах і вторинному житлі Києва, Одеси та Львова: від однієї душової кабіни до комплексного скління всієї квартири за дизайн-проєктом, з монтажем без пошкодження ремонту.'
    ]
  },
  '/rishennya/dlya-budynku/': {
    forWhom: 'для будинку',
    navLabel: 'Для будинку',
    image: '/images/solutions-new/solution-house-640.webp',
    tiles: [
      { label: 'Перила для сходів', href: '/poslugy/sklyani-ohorozhi/sklyani-peryla-dlia-skhodiv/', image: P('glass-stair-railing-private-house-odesa'), note: 'Безрамні та на стійках' },
      { label: 'Безрамне скління тераси', href: '/poslugy/bezramne-sklinnya/bezramne-sklinnya-terasy/', image: P('osocor-residence-glazing-kyiv'), note: 'Стулки повністю відкриваються' },
      { label: 'Розсувні двері на терасу', href: '/alyuminiyevi-konstrukcziyi/rozsuvni-dveri/', image: `${PS}/cat-alu-rozsuvni-480.webp`, note: 'Панорамні, до 4 м заввишки' },
      { label: 'Алюмінієві вікна', href: '/alyuminiyevi-konstrukcziyi/alyuminiyevi-vikna/', image: `${PS}/cat-alu-vikna-480.webp`, note: 'Теплі, з терморозривом' },
      { label: 'Зимові сади', href: '/alyuminiyevi-konstrukcziyi/zymovi-sady/', image: `${PS}/cat-alu-zymovi-sady-480.webp`, note: 'Теплий або сезонний сад' },
      { label: 'Перголи', href: '/alyuminiyevi-konstrukcziyi/pergoly/', image: `${PS}/cat-alu-perholy-480.webp`, note: 'Ламелі, тент або скло' },
      { label: 'Огорожі балконів і терас', href: '/poslugy/sklyani-ohorozhi/sklyani-ohorozhi-teras/', image: P('glass-railing-primorski-sady-odesa'), note: 'Триплекс, безпечне скло' },
      { label: 'Дзеркала', href: '/dzerkala/', image: `${DZ}/cat-stina-480.webp`, note: 'LED, у рамі, на всю стіну' }
    ],
    projectSlugs: ['glass-stair-railing-private-house-odesa', 'osocor-residence-glazing-kyiv', 'led-mirror-private-house-kyiv', 'led-mirror-private-house-odesa', 'glass-railing-primorski-sady-odesa', 'shower-glass-to-ceiling-kyiv'],
    seoHeading: 'Скло та алюміній для приватного будинку',
    seo: [
      'Скляні та алюмінієві конструкції для приватного будинку на замовлення: панорамні вікна й розсувні двері на терасу, скляні огорожі сходів і балконів, безрамне скління тераси, зимовий сад, пергола над зоною відпочинку, душові кабіни та дзеркала для ванних кімнат.',
      'Для будинку важливо, щоб усі конструкції працювали як одна система: однаковий колір профілю, теплі алюмінієві вікна й двері з терморозривом, безпечний триплекс для огорож і загартоване скло для душових. Підбираємо рішення під архітектуру будинку та клімат.',
      'Найкращий момент для проєктування — до стяжки й оздоблення: так ми правильно закладаємо пороги розсувних дверей, закладні для огорож і водовідведення терас. Ціну скління будинку розраховуємо за планом, кресленнями або фото з розмірами.',
      'Виконуємо замір, виготовлення та монтаж скла й алюмінію для приватних будинків і котеджів у Києві, Одесі, Львові та областях — від окремої огорожі сходів до повного скління будинку.'
    ]
  },
  '/rishennya/dlya-ofisu/': {
    forWhom: 'для офісу',
    navLabel: 'Для офісу',
    image: '/images/solutions-new/solution-office-meeting-room-640.webp',
    tiles: [
      { label: 'Офісні скляні перегородки', href: '/sklyani-perehorodky/ofisni/', image: P('office-partitions-morskyi-odesa'), note: 'Кабінети й переговорні' },
      { label: 'Алюмінієве офісне скління', href: '/alyuminiyevi-konstrukcziyi/ofisne-sklinnya/', image: `${PS}/mb-45-office-2-480.webp`, note: 'Звукоізоляція до 50 дБ' },
      { label: 'Loft-перегородки', href: '/sklyani-perehorodky/loft/', image: P('loft-partitions-kselena-odesa'), note: 'Стильне зонування open space' },
      { label: 'Скляні двері для офісу', href: '/sklyani-dveri/sklyani-dveri-dlia-ofisu/', image: P('world-of-comics-entrance-odesa'), note: 'Розпашні, маятникові, розсувні' },
      { label: 'Скляні вхідні групи', href: '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/', image: P('coffee-ocean-facade-odesa'), note: 'Представницький вхід' },
      { label: 'Маркерні дошки зі скла', href: '/poslugy/sklo-dlia-biznesu/sklyani-doshky-dlia-ofisu/', image: '/images/solutions-new/solution-office-meeting-room-640.webp', note: 'Для переговорних' },
      { label: 'Перегородки з ПВХ', href: '/metaloplastykovi-konstrukcziyi/ofisni-sklyani-peregorodky/', image: `${PS}/cat-pvc-perehorodky-480.webp`, note: 'Економічне зонування' },
      { label: 'Фасадне скління', href: '/alyuminiyevi-konstrukcziyi/fasadne-sklinnya/', image: `${PS}/cat-alu-fasady-480.webp`, note: 'Стійково-ригельні системи' }
    ],
    projectSlugs: ['office-partitions-morskyi-odesa', 'dental-clinic-partitions-odesa', 'loft-partitions-kselena-odesa', 'world-of-comics-entrance-odesa', 'coffee-ocean-facade-odesa', 'restaurant-glazing-artshat-odesa'],
    seoHeading: 'Скляні перегородки та скління для офісу',
    seo: [
      'Скляні перегородки для офісу на замовлення — стандарт сучасного робочого простору. Вони ділять офіс на кабінети й переговорні, зберігаючи денне світло на кожному робочому місці та відчуття відкритої команди.',
      'Виготовляємо рамні та безрамні офісні перегородки, Loft-перегородки, алюмінієві системи з подвійним склінням і звукоізоляцією до 50 дБ, скляні двері для офісу, вхідні групи, маркерні дошки зі скла та економічні перегородки з ПВХ-профілю.',
      'Ціна офісної перегородки залежить від площі, типу скла, кількості дверей, звукоізоляції та жалюзі. Для розрахунку достатньо плану офісу з розмірами й висотою стелі; фінальну вартість фіксуємо після заміру.',
      'Монтуємо у вихідні або вечірній час, щоб не зупиняти роботу офісу. Працюємо з бізнес-центрами, коворкінгами, клініками та студіями в Києві, Одесі та Львові.'
    ]
  },
  '/rishennya/dlya-hotelyu/': {
    forWhom: 'для готелю',
    navLabel: 'Для готелю',
    image: '/images/solutions-new/solution-hotel-640.webp',
    tiles: [
      { label: 'Душові кабіни для номерів', href: '/dushovi-kabiny/', image: P('hotel-dvoryanskyi-showers-odesa'), note: 'Однаковий стандарт для всіх номерів' },
      { label: 'Перегородки для душу', href: '/dushovi-kabiny/peregorodka-dlya-dusha/', image: `${SH}/hero-peregorodka-dlya-dusha-480.webp`, note: 'Walk-In без дверей' },
      { label: 'Шторки на ванну', href: '/dushovi-kabiny/shtorky-dlya-vannoyi/', image: `${SH}/hero-shtorky-dlya-vannoyi-480.webp`, note: 'Для номерів із ванною' },
      { label: 'Дзеркала з підсвіткою', href: '/dzerkala/led-dzerkala/', image: `${DZ}/cat-led-480.webp`, note: 'IP44 для санвузлів' },
      { label: 'Скляні огорожі', href: '/sklyani-ohorozhi/', image: P('glass-railing-primorski-sady-odesa'), note: 'Балкони, сходи, тераси' },
      { label: 'Скляні вхідні групи', href: '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/', image: P('restaurant-glazing-artshat-odesa'), note: 'Вхід і лобі' },
      { label: 'Скляні двері', href: '/sklyani-dveri/', image: P('world-of-comics-entrance-odesa'), note: 'Лобі, ресторан, SPA' },
      { label: 'Безрамне скління тераси', href: '/poslugy/bezramne-sklinnya/bezramne-sklinnya-terasy/', image: P('osocor-residence-glazing-kyiv'), note: 'Ресторан і лаунж-зона' }
    ],
    projectSlugs: ['hotel-dvoryanskyi-showers-odesa', 'shower-glass-to-ceiling-kyiv', 'shower-wall-to-wall-brass-kyiv', 'glass-railing-primorski-sady-odesa', 'restaurant-glazing-artshat-odesa', 'osocor-residence-glazing-kyiv'],
    seoHeading: 'Скляні конструкції для готелю',
    seo: [
      'Скляні конструкції для готелю на замовлення: душові кабіни й перегородки для душу в номерах, скляні шторки на ванну, дзеркала з LED-підсвіткою, огорожі балконів і сходів, скляні двері лобі, ресторану й SPA, вхідні групи та скління терас.',
      'Готельні конструкції працюють щодня з великим навантаженням, тому ми підбираємо надійну фурнітуру, загартоване скло й триплекс і виготовляємо серії однакових душових і дзеркал за типовими розмірами номерів — з єдиним стандартом для всього готелю.',
      'Вартість скління готелю розраховуємо за специфікацією номерів і громадських зон; для серій однакових конструкцій ціна за одиницю нижча. Попередній розрахунок — за планами поверхів або фото з розмірами.',
      'Реалізували душові для готелю «Дворянський» в Одесі. Працюємо поетапно, поверх за поверхом, щоб готель продовжував приймати гостей, — у Києві, Одесі, Львові та по Україні.'
    ]
  },
  '/rishennya/dlya-restoranu/': {
    forWhom: 'для ресторану',
    navLabel: 'Для ресторану',
    image: '/images/solutions-new/solution-restaurant-640.webp',
    tiles: [
      { label: 'Тепле скління ресторану', href: '/alyuminiyevi-konstrukcziyi/fasadne-sklinnya/', image: P('restaurant-glazing-artshat-odesa'), note: 'Теплі алюмінієві системи' },
      { label: 'Безрамне скління тераси', href: '/poslugy/bezramne-sklinnya/bezramne-sklinnya-terasy/', image: P('osocor-residence-glazing-kyiv'), note: 'Літній майданчик цілий рік' },
      { label: 'Розсувні двері', href: '/alyuminiyevi-konstrukcziyi/rozsuvni-dveri/', image: `${PS}/cat-alu-rozsuvni-480.webp`, note: 'Відкриття залу на терасу' },
      { label: 'Перголи', href: '/alyuminiyevi-konstrukcziyi/pergoly/', image: `${PS}/cat-alu-perholy-480.webp`, note: 'Тінь і захист від дощу' },
      { label: 'Вітринне скління', href: '/poslugy/sklyani-fasady/vitrinne-sklinnya/', image: P('coffee-ocean-facade-odesa'), note: 'Кав’ярні та бари' },
      { label: 'Скляні перегородки', href: '/sklyani-perehorodky/', image: P('loft-partitions-kselena-odesa'), note: 'VIP-зали та кухня' },
      { label: 'Скляні вхідні групи', href: '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/', image: P('world-of-comics-entrance-odesa'), note: 'Помітний вхід' },
      { label: 'Дзеркальні панно', href: '/dzerkala/dzerkalne-panno/', image: `${DZ}/cat-panno-480.webp`, note: 'Декор залу' }
    ],
    projectSlugs: ['restaurant-glazing-artshat-odesa', 'coffee-ocean-facade-odesa', 'osocor-residence-glazing-kyiv', 'loft-partitions-kselena-odesa', 'world-of-comics-entrance-odesa', 'office-partitions-morskyi-odesa'],
    seoHeading: 'Скління ресторанів, кафе та терас',
    seo: [
      'Скління ресторанів, кафе та терас на замовлення: тепле алюмінієве скління залу, безрамне скління літнього майданчика, розсувні двері на терасу, перголи, вітринне скління кав’ярень, скляні вхідні групи та перегородки між залами.',
      'Правильне скління збільшує кількість посадкових місць і продовжує сезон тераси: влітку стулки відкриваються повністю, взимку зал залишається теплим і світлим. Для VIP-залів і кухні — скляні перегородки, для декору — дзеркальні панно.',
      'Ціна скління ресторану залежить від площі, типу системи (тепла чи холодна), кількості рухомих стулок і монтажу. Розраховуємо за планом закладу або фото з розмірами, фінальну вартість — після заміру.',
      'Реалізували тепле скління ресторану «Артшат» і фасад кав’ярні Coffee Ocean в Одесі. Монтаж плануємо так, щоб заклад не закривався надовго, — у Києві, Одесі, Львові та по Україні.'
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
      { label: 'Алюмінієві двері', href: '/alyuminiyevi-konstrukcziyi/alyuminiyevi-dveri/', image: `${PS}/cat-alu-dveri-480.webp`, note: 'Ресурс до 1 000 000 відкривань' },
      { label: 'Скляні перегородки', href: '/sklyani-perehorodky/', image: P('loft-partitions-kselena-odesa'), note: 'Службові зони й примірочні' },
      { label: 'Скляні полиці', href: '/poslugy/sklo-dlia-biznesu/sklyani-politsi/', image: P('dental-clinic-partitions-odesa'), note: 'Торгове обладнання' },
      { label: 'Скляні козирки', href: '/poslugy/sklo-dlia-biznesu/sklyani-kozyrky/', image: `${PS}/cat-alu-fasady-480.webp`, note: 'Захист входу від опадів' },
      { label: 'Дзеркала для примірки', href: '/dzerkala/dzerkala-na-stinu/', image: `${DZ}/cat-stina-480.webp`, note: 'Ростові й на всю стіну' }
    ],
    projectSlugs: ['world-of-comics-entrance-odesa', 'coffee-ocean-facade-odesa', 'loft-partitions-kselena-odesa', 'dental-clinic-partitions-odesa', 'restaurant-glazing-artshat-odesa', 'office-partitions-morskyi-odesa'],
    seoHeading: 'Вітрини, вхідні групи та скло для магазину',
    seo: [
      'Скляні вітрини, вхідні групи та скло для магазину на замовлення: вітринне скління фасаду, скляні двері й алюмінієві вхідні двері з високим ресурсом відкривань, перегородки для службових зон і примірочних, скляні полиці, козирки над входом і ростові дзеркала.',
      'Для магазину скло — головний інструмент продажу з вулиці: велика вітрина показує товар, помітна вхідна група запрошує зайти, а скляні двері й перегородки роблять торговий зал світлим і відкритим.',
      'Вартість вітрини чи вхідної групи залежить від розмірів, типу скла, профілю, дверей і фурнітури. Розраховуємо за фото фасаду та розмірами прорізів, фінальну ціну — після заміру.',
      'Реалізували вхідну групу магазину World of Comics в Одесі. Працюємо з магазинами, бутиками й шоурумами в Києві, Одесі, Львові та по Україні з урахуванням графіка роботи торгової точки.'
    ]
  }
};

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
      { label: 'Loft-перегородки', href: '/sklyani-perehorodky/loft-sklyani-peregorodku/', image: P('loft-kyiv', 'loft-partition-atlant-kyiv-hero-480.webp'), note: 'Кухня, вітальня, спальня' },
      { label: 'Міжкімнатні перегородки', href: '/sklyani-perehorodky/mizhkimnatni/', image: P('kitchen-partition-fjord-kyiv'), note: 'Зонування без втрати світла' },
      { label: 'Скляні двері', href: '/sklyani-dveri/', image: P('wardrobe-partition-crystal-springs-kyiv'), note: 'Розпашні, розсувні, приховані' },
      { label: 'Дзеркала з підсвіткою', href: '/dzerkala/led-dzerkala/', image: `${DZ}/cat-led-480.webp`, note: 'Для ванної та передпокою' },
      { label: 'Шторки на ванну', href: '/dushovi-kabiny/shtorky-dlya-vannoyi/', image: `${SH}/hero-shtorky-dlya-vannoyi-480.webp`, note: 'Замість текстильної шторки' },
      { label: 'Металопластикові вікна', href: '/metaloplastykovi-konstrukcziyi/metaloplastykovi-vikna/', image: `${PS}/cat-pvc-vikna-480.webp`, note: 'Теплі багатокамерні профілі' }
    ],
    projectSlugs: ['mizhkimnatni-peregorodky-v-styli-loft-zhk-atlant-m-kyyiv', 'dzerkalni-dveri-v-garderob', 'shtorka-dlya-vannoyi-zhk-akvarel-v-m-odesa', 'mirrored-wardrobe-doors-milos-odesa', 'sklyani-peregorodky-u-garderobnu-v-m-odesa', 'dushovi-garmoshka-zhk'],
    seoHeading: 'Скляні конструкції для квартири на замовлення',
    seo: [
      'Скляні конструкції для квартири на замовлення — це спосіб додати світла й простору без капітального ремонту. Найчастіше замовляють скляну душову кабіну або перегородку для душу Walk-In, Loft-перегородку між кухнею та вітальнею, міжкімнатні скляні двері, скляні двері в гардеробну та дзеркало з LED-підсвіткою для ванної кімнати.',
      'Кожну конструкцію проєктуємо під фактичні розміри квартири: заміряємо отвори після оздоблення, враховуємо нерівні стіни, ухил підлоги й положення сантехніки. Використовуємо загартоване скло, триплекс для огорож, алюмінієвий профіль і фурнітуру в одному кольорі — чорному, білому, хромі чи золоті.',
      'Вартість скляної перегородки чи душової для квартири залежить від розмірів, типу скла, профілю й фурнітури. Попередній розрахунок робимо за фото та приблизними розмірами, точну ціну фіксуємо після заміру — без прихованих доплат.',
      'Працюємо з квартирами в новобудовах і вторинному житлі Києва, Одеси та Львова: від однієї душової кабіни до комплексного скління всієї квартири за дизайн-проєктом, з монтажем без пошкодження ремонту.'
    ]
  }
};

/**
 * /pryvatnyj-sektor/ — the private-house landing (old production URL with search history).
 * Rendered by the same SolutionDetailPage template, but it is not one of the /rishennya/
 * solutions, so it lives outside solutionExtras.
 */
export const privateSectorExtra: SolutionExtra = {
  forWhom: 'для приватного будинку',
  navLabel: 'Приватний сектор',
  image: '/images/solutions-new/solution-house-640.webp',
  tiles: [
    { label: 'Скляні огорожі сходів', href: '/sklyani-ohorozhi/sklyani-peryla-dlia-skhodiv/', image: P('glass-stair-railing-private-house-odesa'), note: 'Сходи та другий поверх' },
    { label: 'Огорожі терас і балконів', href: '/sklyani-ohorozhi/sklyani-ohorozhi-teras/', image: '/images/catalog/sklyani-ohorozhi/gp-baldosa-budynok-480.webp', note: 'Триплекс, без стійок або на стійках' },
    { label: 'Скління будинків і котеджів', href: '/bezramne-sklinnya/sklinnya-budynkiv/', image: '/images/catalog/bezramne/cat-teple-bezramne-sklinnya-480.webp', note: 'Панорамне безрамне скління' },
    { label: 'Скління терас і альтанок', href: '/bezramne-sklinnya/sklinnya-teras-ta-altanok/', image: '/images/catalog/bezramne/cat-bezramne-sklinnya-terasy-480.webp', note: 'Стулки повністю відкриваються' },
    { label: 'Вхідні групи', href: '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/', image: `${PS}/cat-fas2-sklyani-vkhidni-hrupy-480.webp`, note: 'Алюміній і скло для входу в будинок' },
    { label: 'Скляні козирки й навіси', href: '/sklyani-kozyrky/', image: '/images/catalog/sklyani-kozyrky/gp-athena-480.webp', note: 'Над входом, терасою чи балконом' },
    { label: 'Душові кабіни', href: '/dushovi-kabiny/', image: '/images/catalog/dushovi-kabiny/dushovi-kabiny-480.webp', note: 'Кутові, у нішу, Walk-In' },
    { label: 'Скляні перегородки', href: '/sklyani-perehorodky/', image: P('loft-kyiv', 'loft-partition-atlant-kyiv-hero-480.webp'), note: 'Лофт, розсувні, міжкімнатні' },
    { label: 'Скляні двері', href: '/sklyani-dveri/', image: '/images/catalog/sklyani-dveri/hero4-rozpashni-sklyani-dveri-480.webp', note: 'Розпашні, розсувні, маятникові' },
    { label: 'Дзеркала', href: '/dzerkala/', image: `${DZ}/cat-stina-480.webp`, note: 'З підсвіткою, у рамі, на всю стіну' },
    { label: 'Розсувні двері на терасу', href: '/alyuminiyevi-konstrukcziyi/rozsuvni-dveri/', image: `${PS}/cat-alu-rozsuvni-480.webp`, note: 'Панорамні, теплий профіль' },
    { label: 'Зимові сади й перголи', href: '/alyuminiyevi-konstrukcziyi/zymovi-sady/', image: `${PS}/cat-alu-zymovi-sady-480.webp`, note: 'Продовження будинку в сад' }
  ],
  projectSlugs: [
    'ogorozha-shodiv-ta-drugogo-poverhu',
    'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-osocor-residence-m-kyyiv',
    'dzerkalo-z-pidsvidkoyu-v-m-odesa-2',
    'dzerkalo-z-pidsvidkoyu-v-m-odesa',
    'dzerkalo-na-stinu-v-zhk-kontynent-m-odesa',
    'mizhkimnatni-peregorodku-v-stuli-loft'
  ],
  seoHeading: 'Скло для приватного будинку, котеджу й таунхауса',
  seo: [
    'Space Glass проєктує, виготовляє та монтує скляні конструкції для приватних будинків, котеджів і таунхаусів: огорожі сходів, терас і балконів, безрамне та панорамне скління, вхідні групи, козирки, душові кабіни, перегородки, двері й дзеркала.',
    'Для будинку всі конструкції мають працювати як одна система: однаковий колір профілю та фурнітури, безпечний триплекс для огорож і козирків, загартоване скло для душових і дверей, теплий алюмінієвий контур там, де простір використовують цілий рік.',
    'Найкраще закладати скло на етапі проєкту — до стяжки й оздоблення: так правильно передбачаються закладні для огорож, пороги розсувних дверей, водовідведення тераси й кріплення козирка над входом.',
    'Працюємо з приватним сектором у Києві, Одесі, Львові та по всій Україні: від однієї огорожі сходів чи душової до комплексного скління котеджу під ключ — із заміром, кресленням, виробництвом і монтажем.'
  ]
};

// «Для будинку» in the solutions strip now points to the private-sector landing
// (/rishennya/dlya-budynku/ → 301 → /pryvatnyj-sektor/).
solutionExtras['/pryvatnyj-sektor/'] = privateSectorExtra;

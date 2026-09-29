/**
 * RU texts of the solution pages rendered by SolutionDetailPage with locale="ru": /ru/pryvatnyj-sektor/
 * and /ru/rishennya/dlya-…/ — mirrors src/data/solution-pages.ts (same tiles, images and projects; only
 * the visible texts are overridden here). solutionExtrasRu also feeds the "other solutions" strip.
 */
import { privateSectorExtra, solutionExtras, type SolutionExtra } from '../solution-pages';

const TILES_RU: Record<string, [string, string]> = {
  '/sklyani-ohorozhi/sklyani-peryla-dlia-skhodiv/': ['Стеклянные ограждения лестниц', 'Лестница и второй этаж'],
  '/sklyani-ohorozhi/sklyani-ohorozhi-teras/': ['Ограждения террас и балконов', 'Триплекс, без стоек или на стойках'],
  '/bezramne-sklinnya/sklinnya-budynkiv/': ['Остекление домов и коттеджей', 'Панорамное безрамное остекление'],
  '/bezramne-sklinnya/sklinnya-teras-ta-altanok/': ['Остекление террас и беседок', 'Створки полностью открываются'],
  '/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/': ['Входные группы', 'Алюминий и стекло для входа в дом'],
  '/sklyani-kozyrky/': ['Стеклянные козырьки и навесы', 'Над входом, террасой или балконом'],
  '/dushovi-kabiny/': ['Душевые кабины', 'Угловые, в нишу, Walk-In'],
  '/sklyani-perehorodky/': ['Стеклянные перегородки', 'Лофт, раздвижные, межкомнатные'],
  '/sklyani-dveri/': ['Стеклянные двери', 'Распашные, раздвижные, маятниковые'],
  '/dzerkala/': ['Зеркала', 'С подсветкой, в раме, на всю стену'],
  '/alyuminiyevi-konstrukcziyi/rozsuvni-dveri/': ['Раздвижные двери на террасу', 'Панорамные, тёплый профиль'],
  '/alyuminiyevi-konstrukcziyi/zymovi-sady/': ['Зимние сады и перголы', 'Продолжение дома в сад']
};

export const privateSectorExtraRu: SolutionExtra = {
  ...privateSectorExtra,
  forWhom: 'для частного дома',
  navLabel: 'Частный сектор',
  tiles: privateSectorExtra.tiles.map((tile) => {
    const ru = TILES_RU[tile.href];
    if (!ru) throw new Error(`No RU tile text for ${tile.href}`);
    return { ...tile, label: ru[0], note: ru[1] };
  }),
  seoHeading: 'Стекло для частного дома, коттеджа и таунхауса',
  seo: [
    'Space Glass проектирует, изготавливает и монтирует стеклянные конструкции для частных домов, коттеджей и таунхаусов: ограждения лестниц, террас и балконов, безрамное и панорамное остекление, входные группы, козырьки, душевые кабины, перегородки, двери и зеркала.',
    'Для дома все конструкции должны работать как одна система: одинаковый цвет профиля и фурнитуры, безопасный триплекс для ограждений и козырьков, закалённое стекло для душевых и дверей, тёплый алюминиевый контур там, где пространство используют круглый год.',
    'Лучше всего закладывать стекло на этапе проекта — до стяжки и отделки: так правильно предусматриваются закладные для ограждений, пороги раздвижных дверей, водоотвод террасы и крепление козырька над входом.',
    'Работаем с частным сектором в Киеве, Одессе, Львове и по всей Украине: от одного ограждения лестницы или душевой до комплексного остекления коттеджа под ключ — с замером, чертежом, производством и монтажом.'
  ]
};

type SolutionTextsRu = Pick<SolutionExtra, 'forWhom' | 'navLabel' | 'seoHeading' | 'seo'> & { tiles: [string, string][] };

/** Texts of the /rishennya/dlya-kvartyry/ page; tiles are [label, note] in the order of the UA tiles. */
const SOLUTION_TEXTS_RU: Record<string, SolutionTextsRu> = {
  "/rishennya/dlya-kvartyry/": {
    "forWhom": "для квартиры",
    "navLabel": "Для квартиры",
    "seoHeading": "Стеклянные конструкции для квартиры на заказ",
    "seo": [
      "Стеклянные конструкции для квартиры на заказ — это способ добавить света и пространства без капитального ремонта. Чаще всего заказывают стеклянную душевую кабину или перегородку для душа Walk-In, Loft-перегородку между кухней и гостиной, межкомнатные стеклянные двери, стеклянные двери в гардеробную и зеркало с LED-подсветкой для ванной комнаты.",
      "Каждую конструкцию проектируем под фактические размеры квартиры: замеряем проёмы после отделки, учитываем неровные стены, уклон пола и положение сантехники. Используем закалённое стекло, триплекс для ограждений, алюминиевый профиль и фурнитуру в одном цвете — чёрном, белом, хроме или золоте.",
      "Стоимость стеклянной перегородки или душевой для квартиры зависит от размеров, типа стекла, профиля и фурнитуры. Предварительный расчёт делаем по фото и примерным размерам, точную цену фиксируем после замера — без скрытых доплат.",
      "Работаем с квартирами в новостройках и на вторичном рынке Киева, Одессы и Львова: от одной душевой кабины до комплексного остекления всей квартиры по дизайн-проекту, с монтажом без повреждения ремонта."
    ],
    "tiles": [
      [
        "Душевые кабины",
        "Угловые, в нишу, раздвижные и Walk-In"
      ],
      [
        "Перегородки для душа",
        "Walk-In без дверей от 10 526 грн"
      ],
      [
        "Loft-перегородки",
        "Кухня, гостиная, спальня"
      ],
      [
        "Межкомнатные перегородки",
        "Зонирование без потери света"
      ],
      [
        "Стеклянные двери",
        "Распашные, раздвижные, скрытые"
      ],
      [
        "Зеркала с подсветкой",
        "Для ванной и прихожей"
      ],
      [
        "Шторки на ванну",
        "Вместо текстильной шторки"
      ],
      [
        "Металлопластиковые окна",
        "Тёплые многокамерные профили"
      ]
    ]
  }
};

export const solutionExtrasRu: Record<string, SolutionExtra> = Object.fromEntries(
  Object.entries(solutionExtras).map(([path, extra]) => {
    if (path === '/pryvatnyj-sektor/') return [path, privateSectorExtraRu];
    const ru = SOLUTION_TEXTS_RU[path];
    if (!ru || ru.tiles.length !== extra.tiles.length) throw new Error(`No RU solution texts for ${path}`);
    const { tiles, ...texts } = ru;
    return [path, { ...extra, ...texts, tiles: extra.tiles.map((tile, i) => ({ ...tile, label: tiles[i][0], note: tiles[i][1] })) }];
  })
);

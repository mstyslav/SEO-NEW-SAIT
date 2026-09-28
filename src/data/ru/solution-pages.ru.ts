/**
 * RU texts for the private-sector landing /ru/pryvatnyj-sektor/ (rendered by SolutionDetailPage with
 * locale="ru") — mirrors privateSectorExtra in src/data/solution-pages.ts (same tiles, images, projects).
 * solutionCardsRu: RU labels of the "other solutions" strip (the /rishennya/dlya-… pages have no RU
 * version yet, so those cards link to the UA pages).
 */
import { privateSectorExtra, type SolutionExtra } from '../solution-pages';

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

/** RU labels of the /rishennya/ solution cards shown in the "other solutions" strip. */
export const solutionCardsRu: Record<string, { navLabel: string; note: string }> = {
  '/rishennya/dlya-kvartyry/': { navLabel: 'Для квартиры', note: 'Душевые кабины · Перегородки для душа · Loft-перегородки' },
  '/rishennya/dlya-ofisu/': { navLabel: 'Для офиса', note: 'Офисные стеклянные перегородки · Алюминиевое офисное остекление · Loft-перегородки' },
  '/rishennya/dlya-hotelyu/': { navLabel: 'Для гостиницы', note: 'Душевые кабины для номеров · Перегородки для душа · Шторки на ванну' },
  '/rishennya/dlya-restoranu/': { navLabel: 'Для ресторана', note: 'Тёплое остекление ресторана · Безрамное остекление террасы · Раздвижные двери' },
  '/rishennya/dlya-magazynu/': { navLabel: 'Для магазина', note: 'Стеклянные двери · Витринное остекление · Стеклянные входные группы' }
};

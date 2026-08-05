import type { Locale } from '../i18n/helpers';

export const catalogSeo = {
  uk: {
    title: 'Каталог скляних конструкцій | Space Glass',
    description: 'Каталог душових кабін, скляних перегородок, дверей, огорож, дзеркал, безрамного скління, пергол, алюмінієвих вікон і фасадних систем Space Glass.',
    eyebrow: 'Каталог',
    h1: 'Каталог скляних та алюмінієвих конструкцій',
    lead: 'Оберіть напрям Space Glass: від душових кабін і дзеркал до фасадних систем, безрамного скління та пергол.',
    cta: 'Переглянути рішення',
    home: 'Головна',
    catalog: 'Каталог',
  },
  ru: {
    title: 'Каталог стеклянных конструкций | Space Glass',
    description: 'Каталог душевых кабин, стеклянных перегородок, дверей, ограждений, зеркал, безрамного остекления, пергол, алюминиевых окон и фасадных систем Space Glass.',
    eyebrow: 'Каталог',
    h1: 'Каталог стеклянных и алюминиевых конструкций',
    lead: 'Выберите направление Space Glass: от душевых кабин и зеркал до фасадных систем, безрамного остекления и пергол.',
    cta: 'Смотреть решения',
    home: 'Главная',
    catalog: 'Каталог',
  },
  en: {
    title: 'Glass structures catalog | Space Glass',
    description: 'Browse Space Glass shower cabins, glass partitions, doors, railings, mirrors, frameless glazing, pergolas, aluminium windows and facade systems.',
    eyebrow: 'Catalog',
    h1: 'Glass and aluminium structures catalog',
    lead: 'Choose a Space Glass category: from showers and mirrors to facade systems, frameless glazing and pergolas.',
    cta: 'View solutions',
    home: 'Home',
    catalog: 'Catalog',
  },
  de: {
    title: 'Katalog für Glaskonstruktionen | Space Glass',
    description: 'Entdecken Sie Duschkabinen, Glastrennwände, Glastüren, Geländer, Spiegel, rahmenlose Verglasung, Pergolen, Aluminiumfenster und Fassadensysteme von Space Glass.',
    eyebrow: 'Katalog',
    h1: 'Katalog für Glas- und Aluminiumkonstruktionen',
    lead: 'Wählen Sie eine Space Glass Kategorie: von Duschen und Spiegeln bis zu Fassaden, rahmenloser Verglasung und Pergolen.',
    cta: 'Lösungen ansehen',
    home: 'Startseite',
    catalog: 'Katalog',
  }
} satisfies Record<Locale, Record<string, string>>;

export const catalogItems = [
  { key:'showers', slug:'dushovi-kabiny', image:'/images/s24-menu/showers.webp', titles:{uk:'Душові кабіни',ru:'Душевые кабины',en:'Shower cabins',de:'Duschkabinen'}, descriptions:{uk:'Walk-in, кутові, розсувні та нішеві душові зі скла за розмірами приміщення.',ru:'Walk-in, угловые, раздвижные и нишевые душевые из стекла под размер помещения.',en:'Walk-in, corner, sliding and niche glass showers tailored to your bathroom.',de:'Walk-in-, Eck-, Schiebe- und Nischenduschen aus Glas nach Maß.'}, alts:{uk:'Сучасна скляна душова кабіна walk-in',ru:'Современная стеклянная душевая кабина walk-in',en:'Modern walk-in glass shower cabin',de:'Moderne Walk-in-Duschkabine aus Glas'}},
  { key:'partitions', slug:'sklyani-perehorodky', image:'/images/s24-menu/partitions.webp', titles:{uk:'Скляні перегородки',ru:'Стеклянные перегородки',en:'Glass partitions',de:'Glastrennwände'}, descriptions:{uk:'Стаціонарні, розсувні та офісні перегородки для світлого зонування.',ru:'Стационарные, раздвижные и офисные перегородки для светлого зонирования.',en:'Fixed, sliding and office partitions for bright zoning.',de:'Feste, verschiebbare und Büro-Trennwände für helle Raumzonen.'}, alts:{uk:'Скляні перегородки в офісі',ru:'Стеклянные перегородки в офисе',en:'Glass partitions in an office interior',de:'Glastrennwände in einem Büro'}},
  { key:'doors', slug:'sklyani-dveri', image:'/images/s24-menu/doors.webp', titles:{uk:'Скляні двері',ru:'Стеклянные двери',en:'Glass doors',de:'Glastüren'}, descriptions:{uk:'Розпашні, розсувні, маятникові та pivot-двері для інтер’єрів і бізнесу.',ru:'Распашные, раздвижные, маятниковые и pivot-двери для интерьеров и бизнеса.',en:'Hinged, sliding, swing and pivot doors for homes and commercial spaces.',de:'Dreh-, Schiebe-, Pendel- und Pivot-Türen für Wohn- und Gewerberäume.'}, alts:{uk:'Прозорі скляні двері в інтер’єрі',ru:'Прозрачные стеклянные двери в интерьере',en:'Clear glass doors in an interior',de:'Transparente Glastüren im Innenraum'}},
  { key:'railings', slug:'sklyani-ohorozhi', image:'/images/s24-menu/railings.webp', titles:{uk:'Скляні огорожі',ru:'Стеклянные ограждения',en:'Glass railings',de:'Glasgeländer'}, descriptions:{uk:'Безпечні огорожі для сходів, балконів, терас і басейнів.',ru:'Безопасные ограждения для лестниц, балконов, террас и бассейнов.',en:'Safe railings for stairs, balconies, terraces and pools.',de:'Sichere Geländer für Treppen, Balkone, Terrassen und Pools.'}, alts:{uk:'Скляна огорожа на сходах',ru:'Стеклянное ограждение на лестнице',en:'Glass railing on stairs',de:'Glasgeländer an einer Treppe'}},
  { key:'mirrors', slug:'dzerkala', image:'/images/s24-menu/mirrors.webp', titles:{uk:'Дзеркала',ru:'Зеркала',en:'Mirrors',de:'Spiegel'}, descriptions:{uk:'LED-дзеркала, панно та індивідуальні форми для ванних і інтер’єрів.',ru:'LED-зеркала, панно и индивидуальные формы для ванных и интерьеров.',en:'LED mirrors, mirror panels and custom shapes for bathrooms and interiors.',de:'LED-Spiegel, Spiegelpaneele und Sonderformen für Bäder und Innenräume.'}, alts:{uk:'Дзеркало з LED-підсвічуванням у ванній',ru:'Зеркало с LED-подсветкой в ванной',en:'LED mirror in a bathroom',de:'LED-Spiegel in einem Badezimmer'}},
  { key:'floors', slug:'sklyani-pidlogy-pokrivli', image:'/images/v5/project-1.webp', titles:{uk:'Скляні підлоги та покрівлі',ru:'Стеклянные полы и кровли',en:'Glass floors and roofs',de:'Glasböden und Glasdächer'}, descriptions:{uk:'Триплексні підлоги, світлові вставки та скляні покрівлі для архітектурних акцентів.',ru:'Триплексные полы, световые вставки и стеклянные кровли для архитектурных акцентов.',en:'Laminated glass floors, light wells and glass roofs for architectural accents.',de:'Verbundglasböden, Lichteinsätze und Glasdächer als architektonische Akzente.'}, alts:{uk:'Архітектурна скляна покрівля та підлога',ru:'Архитектурная стеклянная кровля и пол',en:'Architectural glass roof and floor detail',de:'Architektonisches Glasdach und Glasboden-Detail'}},
  { key:'aluminium', slug:'alyuminiievi-konstruktsii', image:'/images/s24-menu/aluminium.webp', titles:{uk:'Алюмінієві вікна та двері',ru:'Алюминиевые окна и двери',en:'Aluminium windows and doors',de:'Aluminiumfenster und -türen'}, descriptions:{uk:'Теплі профільні системи, панорамні двері та вікна для приватних і комерційних об’єктів.',ru:'Тёплые профильные системы, панорамные двери и окна для частных и коммерческих объектов.',en:'Thermal profile systems, panoramic doors and windows for residential and commercial projects.',de:'Gedämmte Profilsysteme, Panoramatüren und Fenster für Wohn- und Gewerbeprojekte.'}, alts:{uk:'Алюмінієві панорамні вікна та двері',ru:'Алюминиевые панорамные окна и двери',en:'Aluminium panoramic windows and doors',de:'Aluminium-Panoramafenster und Türen'}},
  { key:'facades', slug:'fasadni-systemy', image:'/images/s24-menu/facades.webp', titles:{uk:'Фасадні системи',ru:'Фасадные системы',en:'Facade systems',de:'Fassadensysteme'}, descriptions:{uk:'Стійко-ригельні, структурні та напівструктурні фасади для сучасної архітектури.',ru:'Стоечно-ригельные, структурные и полуструктурные фасады для современной архитектуры.',en:'Stick, structural and semi-structural facades for contemporary architecture.',de:'Pfosten-Riegel-, Structural- und Semi-Structural-Fassaden für moderne Architektur.'}, alts:{uk:'Скляний фасад сучасної будівлі',ru:'Стеклянный фасад современного здания',en:'Glass facade of a modern building',de:'Glasfassade eines modernen Gebäudes'}},
  { key:'loft', slug:'loft-konstruktsii', image:'/images/s19/menu-loft.webp', titles:{uk:'Loft-конструкції',ru:'Loft-конструкции',en:'Loft structures',de:'Loft-Konstruktionen'}, descriptions:{uk:'Чорний металевий профіль, скло та чітка геометрія для акцентного зонування.',ru:'Чёрный металлический профиль, стекло и четкая геометрия для акцентного зонирования.',en:'Black metal profiles, glass and crisp geometry for statement zoning.',de:'Schwarze Metallprofile, Glas und klare Geometrie für markante Raumteilung.'}, alts:{uk:'Loft-перегородка з чорним профілем',ru:'Loft-перегородка с чёрным профилем',en:'Loft partition with black profile',de:'Loft-Trennwand mit schwarzem Profil'}},
  { key:'frameless', slug:'bezramne-sklinnya', image:'/images/s24-menu/frameless.webp', titles:{uk:'Безрамне скління',ru:'Безрамное остекление',en:'Frameless glazing',de:'Rahmenlose Verglasung'}, descriptions:{uk:'Окремі панорамні системи для терас, балконів, альтанок і відкритих просторів.',ru:'Отдельные панорамные системы для террас, балконов, беседок и открытых пространств.',en:'Independent panoramic systems for terraces, balconies, gazebos and open spaces.',de:'Eigenständige Panoramasysteme für Terrassen, Balkone, Pavillons und offene Bereiche.'}, alts:{uk:'Безрамне панорамне скління тераси',ru:'Безрамное панорамное остекление террасы',en:'Frameless panoramic glazing on a terrace',de:'Rahmenlose Panoramaverglasung einer Terrasse'}},
  { key:'pergolas', slug:'pergoly', image:'/images/v5/project-4.webp', titles:{uk:'Перголи',ru:'Перголы',en:'Pergolas',de:'Pergolen'}, descriptions:{uk:'Окремі алюмінієві перголи зі скляним або ламельним накриттям для терас.',ru:'Отдельные алюминиевые перголы со стеклянным или ламельным покрытием для террас.',en:'Standalone aluminium pergolas with glass or louvered roofing for terraces.',de:'Eigenständige Aluminium-Pergolen mit Glas- oder Lamellendach für Terrassen.'}, alts:{uk:'Алюмінієва пергола над терасою',ru:'Алюминиевая пергола над террасой',en:'Aluminium pergola over a terrace',de:'Aluminium-Pergola über einer Terrasse'}}
] as const;

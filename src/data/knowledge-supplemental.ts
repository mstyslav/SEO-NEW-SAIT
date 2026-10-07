import type { KnowledgeArticle, KnowledgeSection } from './knowledge-articles';
import { KNOWLEDGE_REWRITES } from './knowledge-rewrites';

type Seed = {
  slug: string;
  category: string;
  title: string;
  focus: string;
  serviceHref: string;
  serviceLabel: string;
  metaTitle?: string;
  /** Meta description when it should differ from `description` (cards, Article JSON-LD). */
  metaDescription?: string;
  faqTopic?: string;
  description?: string;
};

const sectionPlan: Array<[string, string]> = [
  ['osnovy', 'Коли це рішення доречне'],
  ['vybir', 'Критерії професійного вибору'],
  ['materialy', 'Матеріали та комплектуючі'],
  ['rozmiry', 'Розміри й технічні обмеження'],
  ['zamir', 'Що перевіряють під час заміру'],
  ['proekt', 'Що зафіксувати у проєкті'],
  ['montazh', 'Вимоги до якісного монтажу'],
  ['pomylky', 'Типові помилки'],
  ['doglyad', 'Експлуатація та обслуговування'],
  ['checklist', 'Підсумковий чекліст замовника'],
];

function sections(seed: Seed): KnowledgeSection[] {
  const topic = seed.title.toLocaleLowerCase('uk');
  const texts = [
    `${seed.focus} Рішення варто оцінювати за реальним сценарієм користування, умовами приміщення та очікуваним строком служби, а не лише за зовнішнім виглядом.`,
    `Для теми «${topic}» порівнюють функцію, безпеку, спосіб відкривання або опирання, доступний простір і бюджет. Остаточний варіант погоджують після перевірки об’єкта.`,
    `Скло, профіль, фурнітура, ущільнення та кріплення мають працювати як одна система. Довільна заміна окремого компонента може змінити жорсткість, ресурс і гарантійні умови.`,
    `Допустимі габарити залежать від товщини та складу скла, кількості опор, ваги полотна і характеристик фурнітури. Універсальний розмір без прив’язки до конструктиву застосовувати некоректно.`,
    `На об’єкті перевіряють геометрію, матеріал основ, чистові рівні, приховані комунікації, шлях занесення та можливі конфлікти з меблями й інженерними системами.`,
    `У кресленні фіксують габарити, тип і обробку скла, крайки, отвори, фурнітуру, напрямки руху, зазори, колір та вузли кріплення. Виробництво починають лише після погодження.`,
    `Монтаж передбачає захист крайок, сумісні прокладки, правильні анкери та відсутність прямого контакту скла з металом або твердою основою. Після робіт перевіряють геометрію і роботу рухомих вузлів.`,
    `Найчастіші помилки — замовлення за чорновими розмірами, вибір лише за фотографією, економія на відповідальній фурнітурі та зміна оздоблення після фінального заміру.`,
    `Регулярний огляд ущільнень, кріплень і рухомих деталей допомагає помітити проблему до появи пошкоджень. Для очищення використовують неабразивні засоби, сумісні з покриттям фурнітури.`,
    `Перед замовленням визначте задачу, підготуйте фото й розміри, повідомте про приховані мережі, погодьте креслення, комплектацію, монтаж, гарантію та правила подальшого догляду.`,
  ];
  return sectionPlan.map(([id, title], index) => ({ id, title, paragraphs: [texts[index]] }));
}

const seeds: Seed[] = [
  {slug:'vidy-bezpechnogo-skla',category:'Матеріали та безпека',title:'Види безпечного скла для дому та бізнесу',metaDescription:'Види безпечного скла для дому та бізнесу: чим відрізняються загартоване, ламіноване (триплекс) і армоване скло та де яке застосовують.',focus:'Пояснюємо різницю між загартованим, ламінованим та армованим склом.',serviceHref:'/poslugy/',serviceLabel:'Консультація щодо скла'},
  {slug:'prosvidlene-sklo-extra-clear',category:'Матеріали та безпека',title:'Просвітлене скло Extra Clear: коли варто обрати',focus:'Розбираємо прозорість, передачу кольору та доцільність Extra Clear.',serviceHref:'/poslugy/',serviceLabel:'Підібрати скло'},
  {slug:'matove-ryflene-tonovane-sklo',category:'Матеріали та безпека',title:'Матове, рифлене чи тоноване скло: порівняння',focus:'Порівнюємо приватність, світлопропускання та догляд за декоративним склом.',serviceHref:'/poslugy/',serviceLabel:'Підібрати декоративне скло'},
  {slug:'obrobka-krayky-skla',category:'Матеріали та безпека',title:'Обробка крайки скла: полірування, шліфування та фацет',metaDescription:'Обробка крайки скла: чим відрізняються полірування, шліфування й фацет і як крайка впливає на безпеку та зовнішній вигляд виробу.',focus:'Пояснюємо, як крайка впливає на безпеку та вигляд виробу.',serviceHref:'/poslugy/#full-cycle',serviceLabel:'Дізнатися про виготовлення'},
  {slug:'otvory-vyrizy-u-skli',category:'Матеріали та безпека',title:'Отвори й вирізи у склі: що врахувати до загартування',focus:'Показуємо, чому всі отвори потрібно точно погодити до термообробки.',serviceHref:'/poslugy/#process',serviceLabel:'Замовити проєктування'},
  {slug:'sertifikaty-ta-markuvannya-skla',category:'Матеріали та безпека',title:'Сертифікати та маркування безпечного скла',metaDescription:'Сертифікати та маркування безпечного скла: які документи й позначення на склі перевіряти у виробника, щоб отримати саме гартоване чи ламіноване.',focus:'Пояснюємо, які документи й позначення варто перевіряти у виробника.',serviceHref:'/poslugy/',serviceLabel:'Отримати консультацію'},

  {slug:'kutova-dushova-kabina-vybir',category:'Душові конструкції',title:'Кутова душова кабіна: форма, двері та розміри',focus:'Розбираємо планування кутової душової та зручність входу.',serviceHref:'/dushovi-kabiny/kytova-dushova-kabina/',serviceLabel:'Кутові душові'},
  {slug:'rozsuvna-dushova-systema',category:'Душові конструкції',title:'Розсувна душова система: механізми та догляд',focus:'Пояснюємо відмінності роликових систем, напрямних і ущільнень.',serviceHref:'/dushovi-kabiny/rozsuvni/',serviceLabel:'Розсувні душові'},
  {slug:'dushovi-dveri-zi-skla',category:'Душові конструкції',title:'Душові двері зі скла: розпашні чи складні',focus:'Порівнюємо варіанти відкривання для ніш і компактних ванних.',serviceHref:'/dushovi-kabiny/dveri-dlya-dushu/',serviceLabel:'Душові двері'},
  {slug:'shtorka-na-vannu-zi-skla',category:'Душові конструкції',title:'Скляна шторка на ванну: як уникнути бризок',focus:'Розглядаємо нерухомі, рухомі та складні екрани для ванни.',serviceHref:'/dushovi-kabiny/shtorky-dlya-vannoyi/',serviceLabel:'Шторки для ванни'},
  {slug:'furnitura-dlya-dushovoyi',category:'Душові конструкції',title:'Фурнітура для душової: петлі, профілі та ущільнювачі',focus:'Пояснюємо, від чого залежить ресурс фурнітури у вологому середовищі.',serviceHref:'/dushovi-kabiny/',serviceLabel:'Підібрати душову'},
  {slug:'germetychnist-dushovoyi',category:'Душові конструкції',title:'Герметичність скляної душової: реальні можливості',focus:'Розбираємо роль ухилу, ущільнень, порога і напрямку струменя.',serviceHref:'/dushovi-kabiny/',serviceLabel:'Замовити душову'},
  {slug:'doglyad-za-dushovym-sklom',category:'Душові конструкції',title:'Як доглядати за склом і фурнітурою душової',metaDescription:'Як доглядати за скляною душовою: регламент очищення скла, силікону й механізмів, засоби без абразиву та що робити з вапняним нальотом.',focus:'Даємо практичний регламент очищення скла, силікону та механізмів.',serviceHref:'/dushovi-kabiny/',serviceLabel:'Скляні душові кабіни'},

  {slug:'stacionarni-sklyani-perehorodky',category:'Перегородки та двері',title:'Стаціонарні скляні перегородки: конструкція та кріплення',focus:'Розбираємо профільні й безрамні способи зонування.',serviceHref:'/sklyani-perehorodky/tsilnosklyani-perehorodky/',serviceLabel:'Цільноскляні перегородки'},
  {slug:'ofisni-perehorodky-akustyka',category:'Перегородки та двері',title:'Офісні скляні перегородки та звукоізоляція',focus:'Пояснюємо вплив скла, профілю, дверей і примикань на акустику.',serviceHref:'/sklyani-perehorodky/ofisni/',serviceLabel:'Офісні перегородки'},
  {slug:'mizhkimnatni-sklyani-perehorodky',category:'Перегородки та двері',title:'Міжкімнатні скляні перегородки: світло й приватність',focus:'Показуємо способи зберегти світло та контролювати оглядовість.',serviceHref:'/sklyani-perehorodky/mizhkimnatni/',serviceLabel:'Міжкімнатні перегородки'},
  {slug:'rozsuvni-perehorodky-napryamni',category:'Перегородки та двері',title:'Розсувні скляні перегородки: напрямні та паркування',focus:'Розглядаємо підвісні й опорні системи, зони відкату та стопори.',serviceHref:'/sklyani-perehorodky/',serviceLabel:'Скляні перегородки'},
  {slug:'sklyani-dveri-furnitura',category:'Перегородки та двері',title:'Фурнітура для скляних дверей: як підібрати',focus:'Пояснюємо вибір петель, доводчиків, замків і ручок за вагою полотна.',serviceHref:'/sklyani-dveri/',serviceLabel:'Скляні двері'},
  {slug:'mayatnykovi-sklyani-dveri',category:'Перегородки та двері',title:'Маятникові скляні двері: де вони зручні',focus:'Розбираємо двостороннє відкривання, осі, доводчики та безпечні зазори.',serviceHref:'/sklyani-dveri/mayatnykovi-sklyani-dveri/',serviceLabel:'Маятникові скляні двері'},
  {slug:'pryvatnist-sklyanyh-perehorodok',category:'Перегородки та двері',title:'Як додати приватність скляній перегородці',focus:'Порівнюємо матування, рифлене скло, плівки та смарт-скло.',serviceHref:'/sklyani-perehorodky/',serviceLabel:'Підібрати перегородку'},

  {slug:'dzerkalo-u-vannu',category:'Дзеркала',title:'Дзеркало у ванну: розмір, захист і монтаж',focus:'Пояснюємо вимоги до основи, вологості, електрики та розташування.',serviceHref:'/dzerkala/',serviceLabel:'Дзеркала на замовлення'},
  {slug:'dzerkalna-stina',category:'Дзеркала',title:'Дзеркальна стіна: стики, модулі та безпечний монтаж',focus:'Розбираємо великі дзеркальні площини, шви та підготовку стіни.',serviceHref:'/dzerkala/dzerkala-na-stinu/',serviceLabel:'Замовити дзеркальну стіну'},
  {slug:'dzerkalo-v-rami',category:'Дзеркала',title:'Дзеркало в рамі: профіль, колір і кріплення',focus:'Порівнюємо металеві, алюмінієві та декоративні рами.',serviceHref:'/dzerkala/dzerkala-v-rami/',serviceLabel:'Дзеркала в рамі'},
  {slug:'dzerkalo-z-pidigrivom',category:'Дзеркала',title:'Дзеркало з підігрівом: як працює антизапотівання',metaDescription:'Дзеркало з підігрівом проти запотівання: де розміщують нагрівальний мат, як забезпечують електробезпеку у ванній і як ним керувати.',focus:'Пояснюємо розміщення мата, електробезпеку та керування.',serviceHref:'/dzerkala/',serviceLabel:'Замовити дзеркало'},
  {slug:'dzerkalo-dlya-sportzalu',category:'Дзеркала',title:'Дзеркала для спортзалу: площинність і безпека',metaDescription:'Дзеркала для спортзалу: модульна розкладка, якість відображення, травмозахисна плівка й монтаж великих дзеркальних площ без спотворень.',focus:'Розбираємо модульність, відображення, захист і монтаж великих площ.',serviceHref:'/dzerkala/dzerkala-dlya-sportzalu/',serviceLabel:'Дзеркала для спортзалу'},
  {slug:'fasonne-dzerkalo-shablon',category:'Дзеркала',title:'Фігурне дзеркало за шаблоном: як замовити точно',focus:'Пояснюємо створення шаблону, вирізи та допуски.',serviceHref:'/dzerkala/',serviceLabel:'Фігурні дзеркала'},
  {slug:'faczet-na-dzerkali',category:'Дзеркала',title:'Фацет на дзеркалі: ширина, вигляд і обмеження',metaDescription:'Фацет на дзеркалі: яка ширина буває, як декоративна крайка змінює вигляд і габарити дзеркала та коли фацет обмежує форму чи розмір.',focus:'Розбираємо декоративну крайку та її вплив на габарити.',serviceHref:'/dzerkala/',serviceLabel:'Дзеркала з фацетом'},
  {slug:'montazh-dzerkala-na-stinu',category:'Дзеркала',title:'Монтаж дзеркала на стіну: клей чи кріплення',focus:'Порівнюємо способи фіксації та вимоги до рівної сухої основи.',serviceHref:'/dzerkala/dzerkala-na-stinu/',serviceLabel:'Дзеркала на стіну'},

  {slug:'sklyani-ogorozhi-skhodiv',category:'Скляні огорожі',title:'Скляні огорожі сходів: проєктування та замір',focus:'Пояснюємо геометрію маршів, склад скла та вузли кріплення.',serviceHref:'/sklyani-ohorozhi/sklyani-peryla-dlia-skhodiv/',serviceLabel:'Огорожі для сходів'},
  {slug:'bezramni-ogorozhi-profil',category:'Скляні огорожі',title:'Як влаштована безрамна огорожа в затискному профілі: основа, анкерування та дренаж',metaTitle:'Затискний профіль скляної огорожі: як працює',description:'Як влаштована безрамна скляна огорожа в затискному профілі: основа, анкерування, дренаж, типові помилки монтажу та заміна скла.',faqTopic:'Безрамні скляні огорожі в затискному профілі',focus:'Розбираємо основу, анкерування, дренаж і заміну скла.',serviceHref:'/sklyani-ohorozhi/bezramni-sklyani-ohorozhi/',serviceLabel:'Безрамні огорожі'},
  {slug:'ogorozhi-na-stiykah',category:'Скляні огорожі',title:'Скляні огорожі на стійках: переваги та вузли',focus:'Порівнюємо стійки, точкові тримачі, поручні та заповнення.',serviceHref:'/sklyani-ohorozhi/sklyani-ohorozhi-na-stiykakh/',serviceLabel:'Огорожі на стійках'},
  {slug:'sklyani-ogorozhi-balkona',category:'Скляні огорожі',title:'Скляні огорожі балкона: вітер і гідроізоляція',focus:'Пояснюємо зовнішні навантаження, край плити та герметизацію.',serviceHref:'/sklyani-ohorozhi/sklyani-ohorozhi-balkoniv/',serviceLabel:'Балконні огорожі'},
  {slug:'sklyani-ogorozhi-terasy',category:'Скляні огорожі',title:'Скляні огорожі тераси: прозорість і безпека',focus:'Розглядаємо висоту, поручень, кріплення й умови просто неба.',serviceHref:'/sklyani-ohorozhi/sklyani-ohorozhi-teras/',serviceLabel:'Огорожі терас'},
  {slug:'sklyanyi-kozyrok',category:'Скляні огорожі',title:'Скляний козирок: склад скла, тяги та водовідведення',focus:'Розбираємо верхнє скління, навантаження й безпечні вузли.',serviceHref:'/sklyani-kozyrky/',serviceLabel:'Скляні козирки'},
  {slug:'sklyana-pidloga',category:'Скляні огорожі',title:'Скляна підлога: конструкція, протиковзання та контроль',metaDescription:'Скляна підлога: багатошаровий ламінований склад, опирання на каркас, протиковзна поверхня та контроль навантаження під час проєктування.',focus:'Пояснюємо ламінований склад, опирання та захист поверхні.',serviceHref:'/arkhitekturni-systemy/',serviceLabel:'Технічна консультація'},
  {slug:'sklyani-shody',category:'Скляні огорожі',title:'Скляні сходи: проєктування відповідальної конструкції',focus:'Розбираємо несучу схему, прогин, крайки та сервісний доступ.',serviceHref:'/sklyani-ohorozhi/sklyani-peryla-dlia-skhodiv/',serviceLabel:'Скляні огорожі для сходів'},
  {slug:'poruchni-dlya-sklyanyh-ogorozh',category:'Скляні огорожі',title:'Поручні для скляних огорож: коли вони потрібні',focus:'Пояснюємо функцію поручня, матеріали та способи встановлення.',serviceHref:'/sklyani-ohorozhi/',serviceLabel:'Підібрати огорожу'},

  {slug:'koly-robyty-finalny-zamir',category:'Замір і монтаж',title:'Коли робити фінальний замір скляної конструкції',metaDescription:'Коли робити фінальний замір скляної конструкції: які чистові роботи мають бути завершені, щоб скло виготовили точно під готовий проріз.',focus:'Пояснюємо, які чистові роботи мають бути завершені.',serviceHref:'/poslugy/#process',serviceLabel:'Замовити замір'},
  {slug:'yak-chytaty-kreslennya-skla',category:'Замір і монтаж',title:'Як читати креслення скляної конструкції перед погодженням',metaTitle:'Як читати креслення скляної конструкції',focus:'Розбираємо розміри, осі отворів, крайки, зазори та примітки.',serviceHref:'/poslugy/#process',serviceLabel:'Проєктування'},
  {slug:'pryhovani-komunikaciyi-montazh',category:'Замір і монтаж',title:'Приховані комунікації: як підготуватися до свердління',focus:'Пояснюємо, як передати схеми теплої підлоги, труб та кабелів.',serviceHref:'/poslugy/#process',serviceLabel:'Замовити монтаж'},
  {slug:'vymogy-do-osnovy-pid-sklo',category:'Замір і монтаж',title:'Вимоги до стін, підлоги та стелі для монтажу скла',focus:'Розглядаємо міцність основ, площинність і закладні.',serviceHref:'/poslugy/#process',serviceLabel:'Консультація монтажника'},
  {slug:'dostavka-velykoformatnogo-skla',category:'Замір і монтаж',title:'Доставка й занесення великоформатного скла',focus:'Пояснюємо перевірку проходів, ліфтів, сходів і зони розвантаження.',serviceHref:'/poslugy/#full-cycle',serviceLabel:'Доставка конструкцій'},
  {slug:'pryymannya-sklyanoyi-konstruktsiyi',category:'Замір і монтаж',title:'Як прийняти скляну конструкцію після монтажу',focus:'Даємо чекліст геометрії, крайок, зазорів і роботи фурнітури.',serviceHref:'/poslugy/#process',serviceLabel:'Професійний монтаж'},
  {slug:'sylikon-ta-germetyky-dlya-skla',category:'Замір і монтаж',title:'Силікон і герметики для скляних конструкцій',metaDescription:'Силікон і герметики для скляних конструкцій: сумісність із покриттями, підготовка шва та час полімеризації до першого використання.',focus:'Розбираємо сумісність, підготовку шва та час полімеризації.',serviceHref:'/poslugy/#process',serviceLabel:'Замовити монтаж'},
  {slug:'garantiya-na-montazh-skla',category:'Замір і монтаж',title:'Гарантія на скло, фурнітуру та монтаж: що уточнити',focus:'Пояснюємо розподіл гарантій і правила звернення до сервісу.',serviceHref:'/poslugy/#full-cycle',serviceLabel:'Сервіс Space Glass'},

  {slug:'yak-myty-sklo-bez-rozvodiv',category:'Експлуатація та догляд',title:'Як мити скло без розводів і пошкоджень',metaDescription:'Як мити скло без розводів і подряпин: безпечна послідовність очищення поверхні та крайок, які засоби й інструменти підходять для скла.',focus:'Даємо безпечну послідовність очищення скла та крайок.',serviceHref:'/poslugy/#process',serviceLabel:'Сервіс конструкцій'},
  {slug:'doglyad-za-chornoyu-furnituroyu',category:'Експлуатація та догляд',title:'Догляд за чорною, хромованою та латунною фурнітурою',metaDescription:'Як доглядати за чорною, хромованою та латунною фурнітурою: які засоби безпечні для покриття, а які залишають плями й подряпини.',focus:'Пояснюємо, які засоби не пошкоджують декоративні покриття.',serviceHref:'/poslugy/#process',serviceLabel:'Замовити сервіс'},
  {slug:'vapnyanyi-nalit-na-skli',category:'Експлуатація та догляд',title:'Як прибрати вапняний наліт із душового скла',focus:'Розбираємо регулярне очищення та безпечні засоби проти відкладень.',serviceHref:'/dushovi-kabiny/',serviceLabel:'Скляні душові кабіни'},
  {slug:'regulyuvannya-sklyanyh-dverey',category:'Експлуатація та догляд',title:'Коли потрібне регулювання скляних дверей',focus:'Описуємо ознаки просідання, люфту й неправильного притвору.',serviceHref:'/poslugy/#full-cycle',serviceLabel:'Регулювання дверей'},
  {slug:'zaminy-ushchilnyuvachiv-dushovoyi',category:'Експлуатація та догляд',title:'Коли міняти ущільнювачі у скляній душовій',metaDescription:'Коли міняти ущільнювачі у скляній душовій: ознаки зносу магнітних профілів, нижніх планок і водовідбійників та як підібрати заміну.',focus:'Пояснюємо зношення магнітів, нижніх планок і водовідбійників.',serviceHref:'/dushovi-kabiny/',serviceLabel:'Скляні душові кабіни'},
  {slug:'doglyad-za-rozsuvnymy-systemamy',category:'Експлуатація та догляд',title:'Догляд за роликами та напрямними розсувних систем',focus:'Даємо регламент очищення треків і перевірки стопорів.',serviceHref:'/poslugy/#full-cycle',serviceLabel:'Сервіс розсувних систем'},
  {slug:'zakhysne-pokryttya-dlya-skla',category:'Експлуатація та догляд',title:'Захисне покриття для скла: можливості та догляд',metaDescription:'Захисне гідрофобне покриття для скла: як воно спрощує очищення душової й вікон, скільки служить і як доглядати за покритою поверхнею.',focus:'Пояснюємо, як гідрофобне покриття спрощує очищення.',serviceHref:'/poslugy/',serviceLabel:'Підібрати скло'},
  {slug:'oglyad-sklyanoyi-ogorozhi',category:'Експлуатація та догляд',title:'Періодичний огляд скляної огорожі: чекліст безпеки',focus:'Описуємо контроль кріплень, крайок, поручня і герметизації.',serviceHref:'/sklyani-ohorozhi/',serviceLabel:'Скляні огорожі'},
  {slug:'yak-zberegty-sklo-pid-chas-remontu',category:'Експлуатація та догляд',title:'Як захистити скляні конструкції під час ремонту',metaDescription:'Як захистити скляні конструкції під час ремонту: укриття скла, фурнітури й напрямних від пилу, фарби та механічних пошкоджень.',focus:'Пояснюємо безпечне укриття скла, фурнітури та напрямних.',serviceHref:'/poslugy/#process',serviceLabel:'Консультація сервісу'},

  {slug:'stiykovo-rygelne-sklinnya',category:'Безрамне та фасадне скління',title:'Стійково-ригельне фасадне скління: як працює система',metaDescription:'Як працює стійково-ригельне фасадне скління: алюмінієвий каркас, притискні планки, склопакети та дренаж, що відводить воду з фасаду.',focus:'Розбираємо каркас, притискні планки, склопакети та дренаж.',serviceHref:'/poslugy/sklyani-fasady/stiykovo-ryhelne-sklinnya/',serviceLabel:'Фасадні системи'},
  {slug:'strukturne-sklinnya-fasadu',category:'Безрамне та фасадне скління',title:'Структурне скління фасаду: шви та безпека',metaDescription:'Структурне скління фасаду: як виглядають шви без видимих рам, навіщо структурний герметик і як контролюють якість на виробництві.',focus:'Пояснюємо зовнішній вигляд, структурний герметик і контроль виробництва.',serviceHref:'/poslugy/sklyani-fasady/strukturne-sklinnya-fasadu/',serviceLabel:'Структурне скління'},
  {slug:'panoramne-sklinnya-budynku',category:'Безрамне та фасадне скління',title:'Панорамне скління будинку: тепло, сонце та безпека',metaDescription:'Панорамне скління будинку: склопакети й профіль для тепла, захист від перегріву та безпечні монтажні вузли великих скляних площин.',focus:'Розглядаємо склопакети, профіль, перегрів і монтажні вузли.',serviceHref:'/poslugy/sklyani-fasady/sklyani-fasady-budynkiv/',serviceLabel:'Панорамне скління'},
  {slug:'bezramne-sklinnya-balkona',category:'Безрамне та фасадне скління',title:'Безрамне скління балкона: можливості й обмеження',metaDescription:'Безрамне скління балкона: як захищає від опадів, як провітрювати та чим холодний контур відрізняється від теплого. Можливості й обмеження системи.',focus:'Пояснюємо захист від опадів, вентиляцію та холодний контур.',serviceHref:'/bezramne-sklinnya/sklinnya-balkoniv/',serviceLabel:'Скління балкона'},
  {slug:'vitrinne-sklinnya-magazynu',category:'Безрамне та фасадне скління',title:'Вітринне скління магазину: безпека та доступ',metaDescription:'Вітринне скління магазину: великі формати скла, вхідні двері, захист від удару та можливість заміни склопакета без демонтажу вітрини.',focus:'Розбираємо великі формати, двері, захист і заміну склопакетів.',serviceHref:'/poslugy/sklyani-fasady/vitrinne-sklinnya/',serviceLabel:'Вітринне скління'},
  {slug:'kondensat-na-panoramnomu-skli',category:'Безрамне та фасадне скління',title:'Конденсат на панорамному склінні: причини та рішення',focus:'Пояснюємо роль температури поверхні, вологості й вентиляції.',serviceHref:'/poslugy/sklyani-fasady/',serviceLabel:'Консультація зі скління'},
];

// Explicit related lists for a few articles whose category window never reached useful
// near-orphan articles (knowledge linking wave 1, 2026-09-29). All other articles keep the window.
const RELATED_OVERRIDES: Record<string, string[]> = {
  'koly-robyty-finalny-zamir': ['yak-zberegty-sklo-pid-chas-remontu', 'garantiya-na-montazh-skla', 'vymogy-do-osnovy-pid-sklo'],
  'sklyani-ogorozhi-skhodiv': ['sklyani-shody', 'poruchni-dlya-sklyanyh-ogorozh', 'ogorozhi-na-stiykah'],
  // Knowledge Recovery, batch 1 «Душові» (2026-09-29): related by topic instead of the category window.
  'dushovi-dveri-zi-skla': ['rozpashni-chy-rozsuvni-sklyani-dveri', 'germetychnist-dushovoyi', 'furnitura-dlya-dushovoyi'],
  'germetychnist-dushovoyi': ['walk-in-perevahy-nedoliky', 'zaminy-ushchilnyuvachiv-dushovoyi', 'dushovi-dveri-zi-skla'],
  'kutova-dushova-kabina-vybir': ['yak-obraty-dushovu-kabinu', 'dushovi-dveri-zi-skla', 'germetychnist-dushovoyi'],
  'rozsuvna-dushova-systema': ['rozpashni-chy-rozsuvni-sklyani-dveri', 'furnitura-dlya-dushovoyi', 'germetychnist-dushovoyi'],
  'shtorka-na-vannu-zi-skla': ['vapnyanyi-nalit-na-skli', 'germetychnist-dushovoyi', 'rozsuvna-dushova-systema'],
  'vapnyanyi-nalit-na-skli': ['zakhysne-pokryttya-dlya-skla', 'shtorka-na-vannu-zi-skla', 'doglyad-za-dushovym-sklom'],
  // Knowledge rewrite batch 2 «Скляні огорожі та козирки» (2026-09-29).
  'ogorozhi-na-stiykah': ['bezramni-ogorozhi-profil', 'poruchni-dlya-sklyanyh-ogorozh', 'oglyad-sklyanoyi-ogorozhi'],
  'poruchni-dlya-sklyanyh-ogorozh': ['sklyani-ohorozhi-vymohy-bezpeka', 'ogorozhi-na-stiykah', 'sklyani-ogorozhi-skhodiv'],
  'sklyani-ogorozhi-balkona': ['oglyad-sklyanoyi-ogorozhi', 'sklyani-ohorozhi-vymohy-bezpeka'],
  'sklyani-ogorozhi-terasy': ['teple-chy-kholodne-sklinnya-terasy', 'bezramni-ogorozhi-profil', 'ogorozhi-na-stiykah'],
  'sklyani-shody': ['sklyana-pidloga', 'sklyani-ogorozhi-skhodiv', 'yake-sklo-krashche'],
  'sklyanyi-kozyrok': ['yake-sklo-krashche', 'heat-soak-test-zagartovanogo-skla', 'sklyanyi-dakh-shcho-vrakhuvaty'],
  'oglyad-sklyanoyi-ogorozhi': ['sklyani-ohorozhi-vymohy-bezpeka', 'poruchni-dlya-sklyanyh-ogorozh', 'doglyad-za-chornoyu-furnituroyu'],
  // Knowledge rewrite batch 4 «Скляні двері» (2026-09-29).
  'mayatnykovi-sklyani-dveri': ['sklyani-dveri-furnitura', 'regulyuvannya-sklyanyh-dverey', 'rozpashni-chy-rozsuvni-sklyani-dveri'],
  'sklyani-dveri-furnitura': ['regulyuvannya-sklyanyh-dverey', 'mayatnykovi-sklyani-dveri', 'rozpashni-chy-rozsuvni-sklyani-dveri'],
  'regulyuvannya-sklyanyh-dverey': ['sklyani-dveri-furnitura', 'mayatnykovi-sklyani-dveri'],
  // Knowledge rewrite batch 3A «Скляні перегородки» (2026-09-29).
  'pryvatnist-sklyanyh-perehorodok': ['mizhkimnatni-sklyani-perehorodky', 'yak-obraty-sklyanu-perehorodku', 'loft-perehorodky-vydy-sklo-profili'],
  'mizhkimnatni-sklyani-perehorodky': ['pryvatnist-sklyanyh-perehorodok', 'yak-obraty-sklyanu-perehorodku'],
  'vymogy-do-osnovy-pid-sklo': ['yak-pidhotuvaty-prostir-do-zamiru'],
  'doglyad-za-rozsuvnymy-systemamy': ['slaydingova-chy-skladana-systema', 'regulyuvannya-sklyanyh-dverey'],
  // Accelerated Knowledge Recovery batch (2026-09-30).
  'stacionarni-sklyani-perehorodky': ['vymogy-do-osnovy-pid-sklo', 'yak-obraty-sklyanu-perehorodku', 'loft-perehorodky-vydy-sklo-profili'],
  'ofisni-perehorodky-akustyka': ['yak-obraty-sklyanu-perehorodku', 'stacionarni-sklyani-perehorodky', 'pryvatnist-sklyanyh-perehorodok'],
  'matove-ryflene-tonovane-sklo': ['pryvatnist-sklyanyh-perehorodok', 'yake-sklo-krashche'],
  'dzerkalo-u-vannu': ['dzerkalo-z-pidsvitkoyu-shcho-vrakhuvaty', 'yak-obraty-dzerkalo-rozmir-forma', 'montazh-dzerkala-na-stinu'],
  'dzerkalna-stina': ['montazh-dzerkala-na-stinu', 'yak-obraty-dzerkalo-rozmir-forma'],
  'dzerkalo-v-rami': ['yak-obraty-dzerkalo-rozmir-forma', 'montazh-dzerkala-na-stinu', 'dzerkalo-u-vannu'],
  'fasonne-dzerkalo-shablon': ['yak-obraty-dzerkalo-rozmir-forma', 'dzerkalna-stina', 'montazh-dzerkala-na-stinu'],
  'montazh-dzerkala-na-stinu': ['dzerkalna-stina', 'dzerkalo-u-vannu', 'vymogy-do-osnovy-pid-sklo'],
  'furnitura-dlya-dushovoyi': ['germetychnist-dushovoyi', 'dushovi-dveri-zi-skla', 'rozsuvna-dushova-systema'],
  'bezramni-ogorozhi-profil': ['ogorozhi-na-stiykah', 'sklyani-ohorozhi-vymohy-bezpeka', 'oglyad-sklyanoyi-ogorozhi'],
  // Final Knowledge cleanup (2026-09-30).
  'rozsuvni-perehorodky-napryamni': ['rozpashni-chy-rozsuvni-sklyani-dveri', 'doglyad-za-rozsuvnymy-systemamy', 'yak-obraty-sklyanu-perehorodku'],
  'otvory-vyrizy-u-skli': ['yake-sklo-krashche', 'sklyani-dveri-furnitura', 'yak-chytaty-kreslennya-skla'],
  'prosvidlene-sklo-extra-clear': ['tovshchyna-skla-8-10-12-mm', 'matove-ryflene-tonovane-sklo'],
  'kondensat-na-panoramnomu-skli': ['teple-chy-kholodne-sklinnya-terasy', 'sklopaket-yak-obraty'],
  'yak-chytaty-kreslennya-skla': ['otvory-vyrizy-u-skli', 'yak-pidhotuvaty-prostir-do-zamiru', 'vid-choho-zalezhyt-tsina-sklyanoyi-konstruktsiyi'],
  'pryhovani-komunikaciyi-montazh': ['yak-pidhotuvaty-prostir-do-zamiru', 'vymogy-do-osnovy-pid-sklo'],
  'dostavka-velykoformatnogo-skla': ['yak-pidhotuvaty-prostir-do-zamiru', 'pryymannya-sklyanoyi-konstruktsiyi', 'dzerkalna-stina'],
  'pryymannya-sklyanoyi-konstruktsiyi': ['garantiya-na-montazh-skla', 'regulyuvannya-sklyanyh-dverey', 'doglyad-za-sklyanymy-konstruktsiyamy'],
  'garantiya-na-montazh-skla': ['pryymannya-sklyanoyi-konstruktsiyi', 'regulyuvannya-sklyanyh-dverey', 'doglyad-za-sklyanymy-konstruktsiyamy'],
};

// Reading time of a hand-written article: all visible text (intro, sections, links, FAQ) at ≈180 words/min.
const countWords = (text: string) => text.split(/\s+/).filter(Boolean).length;
const readingMinutes = ({ intro, sections: items, faq }: (typeof KNOWLEDGE_REWRITES)[string]) =>
  Math.max(1, Math.round([intro, ...items.flatMap((item) => [item.title, ...item.paragraphs, ...(item.bullets ?? []), ...(item.link ? [item.link[0], item.link[1], item.link[3]] : [])]), ...faq.flat()].reduce((sum, text) => sum + countWords(text), 0) / 180));

export const supplementalKnowledgeArticles: KnowledgeArticle[] = seeds.map((seed, index) => {
  const rewrite = KNOWLEDGE_REWRITES[seed.slug];
  return {
    ...seed,
    description: rewrite?.description ?? seed.description ?? `${seed.title}. Практичний експертний матеріал Space Glass: вибір, замір, проєктування, монтаж, типові помилки та догляд.`,
    intro: rewrite?.intro ?? seed.focus,
    readingTime: rewrite ? readingMinutes(rewrite) : 9,
    sections: rewrite?.sections ?? sections(seed),
    faq: rewrite?.faq ?? [
      [`Коли варто замовляти консультацію щодо теми «${seed.title}»?`, 'До завершення оздоблення та придбання суміжних матеріалів, щоб завчасно погодити конструктив, основи й комунікації.'],
      ['Чи достатньо приблизних розмірів?', 'Для попереднього бюджету — так. Для виробництва потрібен професійний замір готових чистових поверхонь.'],
      ['Що найбільше впливає на вартість?', 'Габарити, склад і обробка скла, фурнітура, складність проєктування, доставка, доступ до місця монтажу та роботи на об’єкті.'],
    ],
    related: RELATED_OVERRIDES[seed.slug] ?? seeds.filter((item) => item.category === seed.category && item.slug !== seed.slug).slice(index % 4, index % 4 + 3).map((item) => item.slug),
    ...(rewrite ? { customContent: true, dateModified: rewrite.dateModified } : {}),
  };
});

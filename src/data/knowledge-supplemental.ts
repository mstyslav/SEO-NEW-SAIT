import type { KnowledgeArticle, KnowledgeSection } from './knowledge-articles';

type Seed = {
  slug: string;
  category: string;
  title: string;
  focus: string;
  serviceHref: string;
  serviceLabel: string;
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
  {slug:'vidy-bezpechnogo-skla',category:'Матеріали та безпека',title:'Види безпечного скла для дому та бізнесу',focus:'Пояснюємо різницю між загартованим, ламінованим та армованим склом.',serviceHref:'/services/',serviceLabel:'Консультація щодо скла'},
  {slug:'prosvidlene-sklo-extra-clear',category:'Матеріали та безпека',title:'Просвітлене скло Extra Clear: коли варто обрати',focus:'Розбираємо прозорість, передачу кольору та доцільність Extra Clear.',serviceHref:'/services/',serviceLabel:'Підібрати скло'},
  {slug:'matove-ryflene-tonovane-sklo',category:'Матеріали та безпека',title:'Матове, рифлене чи тоноване скло: порівняння',focus:'Порівнюємо приватність, світлопропускання та догляд за декоративним склом.',serviceHref:'/services/',serviceLabel:'Підібрати декоративне скло'},
  {slug:'obrobka-krayky-skla',category:'Матеріали та безпека',title:'Обробка крайки скла: полірування, шліфування та фацет',focus:'Пояснюємо, як крайка впливає на безпеку та вигляд виробу.',serviceHref:'/services/vyhotovlennya/',serviceLabel:'Дізнатися про виготовлення'},
  {slug:'otvory-vyrizy-u-skli',category:'Матеріали та безпека',title:'Отвори й вирізи у склі: що врахувати до загартування',focus:'Показуємо, чому всі отвори потрібно точно погодити до термообробки.',serviceHref:'/services/proektuvannya/',serviceLabel:'Замовити проєктування'},
  {slug:'sertifikaty-ta-markuvannya-skla',category:'Матеріали та безпека',title:'Сертифікати та маркування безпечного скла',focus:'Пояснюємо, які документи й позначення варто перевіряти у виробника.',serviceHref:'/services/',serviceLabel:'Отримати консультацію'},

  {slug:'kutova-dushova-kabina-vybir',category:'Душові конструкції',title:'Кутова душова кабіна: форма, двері та розміри',focus:'Розбираємо планування кутової душової та зручність входу.',serviceHref:'/dushovi-kabiny/kutovi/',serviceLabel:'Кутові душові'},
  {slug:'rozsuvna-dushova-systema',category:'Душові конструкції',title:'Розсувна душова система: механізми та догляд',focus:'Пояснюємо відмінності роликових систем, напрямних і ущільнень.',serviceHref:'/dushovi-kabiny/rozsuvni/',serviceLabel:'Розсувні душові'},
  {slug:'dushovi-dveri-zi-skla',category:'Душові конструкції',title:'Душові двері зі скла: розпашні чи складні',focus:'Порівнюємо варіанти відкривання для ніш і компактних ванних.',serviceHref:'/dushovi-kabiny/dushovi-dveri/',serviceLabel:'Душові двері'},
  {slug:'shtorka-na-vannu-zi-skla',category:'Душові конструкції',title:'Скляна шторка на ванну: як уникнути бризок',focus:'Розглядаємо нерухомі, рухомі та складні екрани для ванни.',serviceHref:'/dushovi-kabiny/shtorky-dlia-vanny/',serviceLabel:'Шторки для ванни'},
  {slug:'furnitura-dlya-dushovoyi',category:'Душові конструкції',title:'Фурнітура для душової: петлі, профілі та ущільнювачі',focus:'Пояснюємо, від чого залежить ресурс фурнітури у вологому середовищі.',serviceHref:'/dushovi-kabiny/',serviceLabel:'Підібрати душову'},
  {slug:'germetychnist-dushovoyi',category:'Душові конструкції',title:'Герметичність скляної душової: реальні можливості',focus:'Розбираємо роль ухилу, ущільнень, порога і напрямку струменя.',serviceHref:'/dushovi-kabiny/',serviceLabel:'Замовити душову'},
  {slug:'doglyad-za-dushovym-sklom',category:'Душові конструкції',title:'Як доглядати за склом і фурнітурою душової',focus:'Даємо практичний регламент очищення скла, силікону та механізмів.',serviceHref:'/services/servis/',serviceLabel:'Замовити сервіс'},

  {slug:'stacionarni-sklyani-perehorodky',category:'Перегородки та двері',title:'Стаціонарні скляні перегородки: конструкція та кріплення',focus:'Розбираємо профільні й безрамні способи зонування.',serviceHref:'/sklyani-perehorodky/',serviceLabel:'Скляні перегородки'},
  {slug:'ofisni-perehorodky-akustyka',category:'Перегородки та двері',title:'Офісні скляні перегородки та звукоізоляція',focus:'Пояснюємо вплив скла, профілю, дверей і примикань на акустику.',serviceHref:'/sklyani-perehorodky/ofisni/',serviceLabel:'Офісні перегородки'},
  {slug:'mizhkimnatni-sklyani-perehorodky',category:'Перегородки та двері',title:'Міжкімнатні скляні перегородки: світло й приватність',focus:'Показуємо способи зберегти світло та контролювати оглядовість.',serviceHref:'/sklyani-perehorodky/mizhkimnatni/',serviceLabel:'Міжкімнатні перегородки'},
  {slug:'rozsuvni-perehorodky-napryamni',category:'Перегородки та двері',title:'Розсувні скляні перегородки: напрямні та паркування',focus:'Розглядаємо підвісні й опорні системи, зони відкату та стопори.',serviceHref:'/sklyani-perehorodky/rozsuvni/',serviceLabel:'Розсувні перегородки'},
  {slug:'sklyani-dveri-furnitura',category:'Перегородки та двері',title:'Фурнітура для скляних дверей: як підібрати',focus:'Пояснюємо вибір петель, доводчиків, замків і ручок за вагою полотна.',serviceHref:'/sklyani-dveri/',serviceLabel:'Скляні двері'},
  {slug:'mayatnykovi-sklyani-dveri',category:'Перегородки та двері',title:'Маятникові скляні двері: де вони зручні',focus:'Розбираємо двостороннє відкривання, осі, доводчики та безпечні зазори.',serviceHref:'/sklyani-dveri/',serviceLabel:'Замовити двері'},
  {slug:'pryvatnist-sklyanyh-perehorodok',category:'Перегородки та двері',title:'Як додати приватність скляній перегородці',focus:'Порівнюємо матування, рифлене скло, плівки та смарт-скло.',serviceHref:'/sklyani-perehorodky/',serviceLabel:'Підібрати перегородку'},

  {slug:'dzerkalo-u-vannu',category:'Дзеркала',title:'Дзеркало у ванну: розмір, захист і монтаж',focus:'Пояснюємо вимоги до основи, вологості, електрики та розташування.',serviceHref:'/dzerkala/',serviceLabel:'Дзеркала на замовлення'},
  {slug:'dzerkalna-stina',category:'Дзеркала',title:'Дзеркальна стіна: стики, модулі та безпечний монтаж',focus:'Розбираємо великі дзеркальні площини, шви та підготовку стіни.',serviceHref:'/dzerkala/',serviceLabel:'Замовити дзеркальну стіну'},
  {slug:'dzerkalo-v-rami',category:'Дзеркала',title:'Дзеркало в рамі: профіль, колір і кріплення',focus:'Порівнюємо металеві, алюмінієві та декоративні рами.',serviceHref:'/dzerkala/',serviceLabel:'Дзеркала в рамі'},
  {slug:'dzerkalo-z-pidigrivom',category:'Дзеркала',title:'Дзеркало з підігрівом: як працює антизапотівання',focus:'Пояснюємо розміщення мата, електробезпеку та керування.',serviceHref:'/dzerkala/',serviceLabel:'Замовити дзеркало'},
  {slug:'dzerkalo-dlya-sportzalu',category:'Дзеркала',title:'Дзеркала для спортзалу: площинність і безпека',focus:'Розбираємо модульність, відображення, захист і монтаж великих площ.',serviceHref:'/dzerkala/',serviceLabel:'Дзеркала для бізнесу'},
  {slug:'fasonne-dzerkalo-shablon',category:'Дзеркала',title:'Фігурне дзеркало за шаблоном: як замовити точно',focus:'Пояснюємо створення шаблону, вирізи та допуски.',serviceHref:'/dzerkala/',serviceLabel:'Фігурні дзеркала'},
  {slug:'faczet-na-dzerkali',category:'Дзеркала',title:'Фацет на дзеркалі: ширина, вигляд і обмеження',focus:'Розбираємо декоративну крайку та її вплив на габарити.',serviceHref:'/dzerkala/',serviceLabel:'Дзеркала з фацетом'},
  {slug:'montazh-dzerkala-na-stinu',category:'Дзеркала',title:'Монтаж дзеркала на стіну: клей чи кріплення',focus:'Порівнюємо способи фіксації та вимоги до рівної сухої основи.',serviceHref:'/services/montazh/',serviceLabel:'Професійний монтаж'},

  {slug:'sklyani-ogorozhi-skhodiv',category:'Скляні огорожі',title:'Скляні огорожі сходів: проєктування та замір',focus:'Пояснюємо геометрію маршів, склад скла та вузли кріплення.',serviceHref:'/sklyani-ohorozhi/',serviceLabel:'Скляні огорожі'},
  {slug:'bezramni-ogorozhi-profil',category:'Скляні огорожі',title:'Безрамні скляні огорожі в затискному профілі',focus:'Розбираємо основу, анкерування, дренаж і заміну скла.',serviceHref:'/sklyani-ohorozhi/',serviceLabel:'Безрамні огорожі'},
  {slug:'ogorozhi-na-stiykah',category:'Скляні огорожі',title:'Скляні огорожі на стійках: переваги та вузли',focus:'Порівнюємо стійки, точкові тримачі, поручні та заповнення.',serviceHref:'/sklyani-ohorozhi/',serviceLabel:'Огорожі на стійках'},
  {slug:'sklyani-ogorozhi-balkona',category:'Скляні огорожі',title:'Скляні огорожі балкона: вітер і гідроізоляція',focus:'Пояснюємо зовнішні навантаження, край плити та герметизацію.',serviceHref:'/sklyani-ohorozhi/',serviceLabel:'Балконні огорожі'},
  {slug:'sklyani-ogorozhi-terasy',category:'Скляні огорожі',title:'Скляні огорожі тераси: прозорість і безпека',focus:'Розглядаємо висоту, поручень, кріплення й умови просто неба.',serviceHref:'/sklyani-ohorozhi/',serviceLabel:'Огорожі терас'},
  {slug:'sklyanyi-kozyrok',category:'Скляні огорожі',title:'Скляний козирок: склад скла, тяги та водовідведення',focus:'Розбираємо верхнє скління, навантаження й безпечні вузли.',serviceHref:'/arkhitekturni-systemy/',serviceLabel:'Архітектурне скло'},
  {slug:'sklyana-pidloga',category:'Скляні огорожі',title:'Скляна підлога: конструкція, протиковзання та контроль',focus:'Пояснюємо ламінований склад, опирання та захист поверхні.',serviceHref:'/arkhitekturni-systemy/',serviceLabel:'Технічна консультація'},
  {slug:'sklyani-shody',category:'Скляні огорожі',title:'Скляні сходи: проєктування відповідальної конструкції',focus:'Розбираємо несучу схему, прогин, крайки та сервісний доступ.',serviceHref:'/arkhitekturni-systemy/',serviceLabel:'Проєктування конструкцій'},
  {slug:'poruchni-dlya-sklyanyh-ogorozh',category:'Скляні огорожі',title:'Поручні для скляних огорож: коли вони потрібні',focus:'Пояснюємо функцію поручня, матеріали та способи встановлення.',serviceHref:'/sklyani-ohorozhi/',serviceLabel:'Підібрати огорожу'},

  {slug:'koly-robyty-finalny-zamir',category:'Замір і монтаж',title:'Коли робити фінальний замір скляної конструкції',focus:'Пояснюємо, які чистові роботи мають бути завершені.',serviceHref:'/services/zamer/',serviceLabel:'Замовити замір'},
  {slug:'yak-chytaty-kreslennya-skla',category:'Замір і монтаж',title:'Як читати креслення скляної конструкції перед погодженням',focus:'Розбираємо розміри, осі отворів, крайки, зазори та примітки.',serviceHref:'/services/proektuvannya/',serviceLabel:'Проєктування'},
  {slug:'pryhovani-komunikaciyi-montazh',category:'Замір і монтаж',title:'Приховані комунікації: як підготуватися до свердління',focus:'Пояснюємо, як передати схеми теплої підлоги, труб та кабелів.',serviceHref:'/services/montazh/',serviceLabel:'Замовити монтаж'},
  {slug:'vymogy-do-osnovy-pid-sklo',category:'Замір і монтаж',title:'Вимоги до стін, підлоги та стелі для монтажу скла',focus:'Розглядаємо міцність основ, площинність і закладні.',serviceHref:'/services/montazh/',serviceLabel:'Консультація монтажника'},
  {slug:'dostavka-velykoformatnogo-skla',category:'Замір і монтаж',title:'Доставка й занесення великоформатного скла',focus:'Пояснюємо перевірку проходів, ліфтів, сходів і зони розвантаження.',serviceHref:'/services/dostavka/',serviceLabel:'Доставка конструкцій'},
  {slug:'pryymannya-sklyanoyi-konstruktsiyi',category:'Замір і монтаж',title:'Як прийняти скляну конструкцію після монтажу',focus:'Даємо чекліст геометрії, крайок, зазорів і роботи фурнітури.',serviceHref:'/services/montazh/',serviceLabel:'Професійний монтаж'},
  {slug:'sylikon-ta-germetyky-dlya-skla',category:'Замір і монтаж',title:'Силікон і герметики для скляних конструкцій',focus:'Розбираємо сумісність, підготовку шва та час полімеризації.',serviceHref:'/services/montazh/',serviceLabel:'Замовити монтаж'},
  {slug:'garantiya-na-montazh-skla',category:'Замір і монтаж',title:'Гарантія на скло, фурнітуру та монтаж: що уточнити',focus:'Пояснюємо розподіл гарантій і правила звернення до сервісу.',serviceHref:'/services/servis/',serviceLabel:'Сервіс Space Glass'},

  {slug:'yak-myty-sklo-bez-rozvodiv',category:'Експлуатація та догляд',title:'Як мити скло без розводів і пошкоджень',focus:'Даємо безпечну послідовність очищення скла та крайок.',serviceHref:'/services/servis/',serviceLabel:'Сервіс конструкцій'},
  {slug:'doglyad-za-chornoyu-furnituroyu',category:'Експлуатація та догляд',title:'Догляд за чорною, хромованою та латунною фурнітурою',focus:'Пояснюємо, які засоби не пошкоджують декоративні покриття.',serviceHref:'/services/servis/',serviceLabel:'Замовити сервіс'},
  {slug:'vapnyanyi-nalit-na-skli',category:'Експлуатація та догляд',title:'Як прибрати вапняний наліт із душового скла',focus:'Розбираємо регулярне очищення та безпечні засоби проти відкладень.',serviceHref:'/services/servis/',serviceLabel:'Догляд за душовою'},
  {slug:'regulyuvannya-sklyanyh-dverey',category:'Експлуатація та догляд',title:'Коли потрібне регулювання скляних дверей',focus:'Описуємо ознаки просідання, люфту й неправильного притвору.',serviceHref:'/services/servis/',serviceLabel:'Регулювання дверей'},
  {slug:'zaminy-ushchilnyuvachiv-dushovoyi',category:'Експлуатація та догляд',title:'Коли міняти ущільнювачі у скляній душовій',focus:'Пояснюємо зношення магнітів, нижніх планок і водовідбійників.',serviceHref:'/services/servis/',serviceLabel:'Сервіс душової'},
  {slug:'doglyad-za-rozsuvnymy-systemamy',category:'Експлуатація та догляд',title:'Догляд за роликами та напрямними розсувних систем',focus:'Даємо регламент очищення треків і перевірки стопорів.',serviceHref:'/services/servis/',serviceLabel:'Сервіс розсувних систем'},
  {slug:'zakhysne-pokryttya-dlya-skla',category:'Експлуатація та догляд',title:'Захисне покриття для скла: можливості та догляд',focus:'Пояснюємо, як гідрофобне покриття спрощує очищення.',serviceHref:'/services/',serviceLabel:'Підібрати скло'},
  {slug:'oglyad-sklyanoyi-ogorozhi',category:'Експлуатація та догляд',title:'Періодичний огляд скляної огорожі: чекліст безпеки',focus:'Описуємо контроль кріплень, крайок, поручня і герметизації.',serviceHref:'/services/servis/',serviceLabel:'Огляд огорожі'},
  {slug:'yak-zberegty-sklo-pid-chas-remontu',category:'Експлуатація та догляд',title:'Як захистити скляні конструкції під час ремонту',focus:'Пояснюємо безпечне укриття скла, фурнітури та напрямних.',serviceHref:'/services/servis/',serviceLabel:'Консультація сервісу'},

  {slug:'stiykovo-rygelne-sklinnya',category:'Безрамне та фасадне скління',title:'Стійково-ригельне фасадне скління: як працює система',focus:'Розбираємо каркас, притискні планки, склопакети та дренаж.',serviceHref:'/arkhitekturni-systemy/',serviceLabel:'Фасадні системи'},
  {slug:'strukturne-sklinnya-fasadu',category:'Безрамне та фасадне скління',title:'Структурне скління фасаду: шви та безпека',focus:'Пояснюємо зовнішній вигляд, структурний герметик і контроль виробництва.',serviceHref:'/arkhitekturni-systemy/',serviceLabel:'Структурне скління'},
  {slug:'panoramne-sklinnya-budynku',category:'Безрамне та фасадне скління',title:'Панорамне скління будинку: тепло, сонце та безпека',focus:'Розглядаємо склопакети, профіль, перегрів і монтажні вузли.',serviceHref:'/arkhitekturni-systemy/',serviceLabel:'Панорамне скління'},
  {slug:'bezramne-sklinnya-balkona',category:'Безрамне та фасадне скління',title:'Безрамне скління балкона: можливості й обмеження',focus:'Пояснюємо захист від опадів, вентиляцію та холодний контур.',serviceHref:'/arkhitekturni-systemy/',serviceLabel:'Скління балкона'},
  {slug:'vitrinne-sklinnya-magazynu',category:'Безрамне та фасадне скління',title:'Вітринне скління магазину: безпека та доступ',focus:'Розбираємо великі формати, двері, захист і заміну склопакетів.',serviceHref:'/arkhitekturni-systemy/',serviceLabel:'Вітринне скління'},
  {slug:'kondensat-na-panoramnomu-skli',category:'Безрамне та фасадне скління',title:'Конденсат на панорамному склінні: причини та рішення',focus:'Пояснюємо роль температури поверхні, вологості й вентиляції.',serviceHref:'/arkhitekturni-systemy/',serviceLabel:'Консультація зі скління'},
];

export const supplementalKnowledgeArticles: KnowledgeArticle[] = seeds.map((seed, index) => ({
  ...seed,
  description: `${seed.title}. Практичний експертний матеріал Space Glass: вибір, замір, проєктування, монтаж, типові помилки та догляд.`,
  intro: seed.focus,
  readingTime: 9,
  sections: sections(seed),
  faq: [
    [`Коли варто замовляти консультацію щодо теми «${seed.title}»?`, 'До завершення оздоблення та придбання суміжних матеріалів, щоб завчасно погодити конструктив, основи й комунікації.'],
    ['Чи достатньо приблизних розмірів?', 'Для попереднього бюджету — так. Для виробництва потрібен професійний замір готових чистових поверхонь.'],
    ['Що найбільше впливає на вартість?', 'Габарити, склад і обробка скла, фурнітура, складність проєктування, доставка, доступ до місця монтажу та роботи на об’єкті.'],
  ],
  related: seeds.filter((item) => item.category === seed.category && item.slug !== seed.slug).slice(index % 4, index % 4 + 3).map((item) => item.slug),
}));

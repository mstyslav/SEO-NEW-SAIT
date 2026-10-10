/**
 * Content merged into four /dlya-biznesu/{slug}/ pages from the retired solution pages
 * /rishennya/dlya-ofisu|dlya-hotelyu|dlya-restoranu|dlya-magazynu/ (now 301 → here).
 * Only what the business page did not already cover: "how to choose" with knowledge-base
 * links, glass & safety, price factors, missing product links, missing scenarios and
 * unique FAQs. The optional blocks render only on pages that define them.
 * RU mirror: src/data/ru/business-extras.ru.ts.
 */
import type { BusinessPage, BusinessPoint } from './business-pages';

export interface BusinessExtras {
  choose?: BusinessPoint[];
  safety?: BusinessPoint[];
  priceFactors?: string[];
  alsoLinks?: { label: string; href: string }[];
  /** Missing scenario, inserted before the last intro paragraph. */
  introAdd?: string;
  /** Own-FAQ index → replacement (the replaced question duplicated a shared block). */
  faqReplace?: Record<number, [string, string]>;
  /** Unique FAQs from the retired solution page, placed after the page's own FAQs. */
  faqAdd: [string, string][];
  /** Indexes of the shared business FAQs that duplicate a page question or a new block. */
  commonSkip: number[];
}

const OWN_FAQ = 12;
const COMMON_FAQ = 8;
export const MAX_BUSINESS_FAQ = 18;

export const mergeBusinessExtras = (p: BusinessPage, x?: BusinessExtras): BusinessPage => {
  if (!x) return p;
  if (p.faq.length !== OWN_FAQ + COMMON_FAQ) throw new Error(`business page ${p.slug}: expected ${OWN_FAQ + COMMON_FAQ} FAQs before merge`);
  const own = p.faq.slice(0, OWN_FAQ).map((item, index) => x.faqReplace?.[index] ?? item);
  const common = p.faq.slice(OWN_FAQ).filter((_, index) => !x.commonSkip.includes(index));
  const faq = [...own, ...x.faqAdd, ...common];
  if (faq.length > MAX_BUSINESS_FAQ) throw new Error(`business page ${p.slug}: ${faq.length} FAQs, max ${MAX_BUSINESS_FAQ}`);
  const questions = new Set(faq.map(([question]) => question));
  if (questions.size !== faq.length) throw new Error(`business page ${p.slug}: duplicate FAQ question`);
  const { introAdd, faqReplace, faqAdd, commonSkip, ...blocks } = x;
  const intro = introAdd ? [...p.intro.slice(0, -1), introAdd, ...p.intro.slice(-1)] : p.intro;
  return { ...p, ...blocks, intro, faq };
};

// Shared FAQ indexes (COMMON in business-pages.ts): 0 legal entities, 1 several products,
// 2 site visit, 3 work without closing, 4 warranty, 5 which glass, 6 logo, 7 how to price.
export const businessExtras: Record<string, BusinessExtras> = {
  'dlya-ofisu': {
    choose: [
      { title: 'Загальні принципи вибору перегородки', text: 'Формат залежить від планування, кількості дверних груп і того, наскільки часто офіс змінює конфігурацію.', link: { label: 'Як обрати скляну перегородку для офісу', href: '/knowledge/yak-obraty-sklyanu-perehorodku/' } },
      { title: 'Loft чи суцільноскляна перегородка', text: 'Loft-перегородка з видимим профілем-сіткою формує впізнаваний індустріальний стиль. Суцільноскляна — мінімальний каркас і максимум світла.', link: { label: 'LOFT-перегородки: профіль, скло та конструкція', href: '/knowledge/loft-perehorodky-vydy-sklo-profili/' } },
      { title: 'Розпашні чи розсувні двері', text: 'Розсувні двері економлять простір проходу в коридорах з інтенсивним рухом. Розпашні звичніші для окремих кабінетів.', link: { label: 'Розпашні чи розсувні скляні двері: порівняння', href: '/knowledge/rozpashni-chy-rozsuvni-sklyani-dveri/' } }
    ],
    safety: [
      { title: 'Безпечне скло щодня', text: 'Загартоване скло витримує інтенсивне щоденне використання в прохідних зонах і при пошкодженні не утворює гострих уламків.' },
      { title: 'Звукоізоляційні склопакети', text: 'Застосовуються в переговорних кімнатах, де потрібен знижений рівень шуму між приміщеннями.' },
      { title: 'Профіль під фірмовий стиль', text: 'Алюмінієвий профіль формує каркас перегородок і дверей — у чорному, білому чи натуральному кольорі під стиль офісу.' },
      { title: 'Механізми під навантаження', text: 'Доводчики й напрямні дверей підбираються під кількість відкривань на день — критично для прохідних кабінетів і переговорних.' }
    ],
    priceFactors: [
      'метраж і кількість перегородок',
      'кількість дверних груп',
      'тип скла — прозоре, матове чи звукоізоляційне',
      'система профілю та колір',
      'фурнітура й тип відкривання',
      'монтаж і графік робіт в офісі'
    ],
    alsoLinks: [
      { label: 'Скляні перегородки з дверима', href: '/sklyani-perehorodky/z-dveryma/' },
      { label: 'Металопластикові офісні перегородки', href: '/metaloplastykovi-konstrukcziyi/ofisni-sklyani-peregorodky/' },
      { label: 'Алюмінієві фасадні системи', href: '/alyuminiyevi-konstrukcziyi/fasadne-sklinnya/' },
      { label: 'Усі види скляних перегородок', href: '/sklyani-perehorodky/' }
    ],
    faqAdd: [
      ['Який клас вогнестійкості мають скляні перегородки?', 'Клас вогнестійкості залежить від обраної системи скла й профілю та уточнюється на етапі проєктування під вимоги конкретного приміщення.'],
      ['Що робити, якщо стіни чи стеля офісу нерівні?', 'Відхилення фіксуються під час заміру та враховуються профілями кріплення або індивідуальною геометрією скла.']
    ],
    // 3 ≈ own «Чи монтуєте у вихідні?», 5 → «Скло та безпека», 6 ≈ own logo question, 7 ≈ own price question.
    commonSkip: [3, 5, 6, 7]
  },
  goteli: {
    choose: [
      { title: 'Формат душової під номер', text: 'Walk-in залишає відкритий прохід і добре працює у просторих санвузлах. Ніша чи кутова конструкція економлять місце в компактних номерах.', link: { label: 'Як обрати душову кабіну зі скла', href: '/knowledge/yak-obraty-dushovu-kabinu/' } },
      { title: 'Walk-in чи закрита кабіна', text: 'Walk-in простіша в щоденному прибиранні між заїздами гостей. Закрита кабіна краще утримує тепло й бризки.', link: { label: 'Душова Walk-in: переваги, обмеження та розміри', href: '/knowledge/walk-in-perevahy-nedoliky/' } },
      { title: 'Дзеркало для номера', text: 'Розмір, форма і тип підсвітки узгоджуються під єдиний дизайн-код готелю та тиражуються на весь номерний фонд.', link: { label: 'Як обрати розмір і форму дзеркала', href: '/knowledge/yak-obraty-dzerkalo-rozmir-forma/' } }
    ],
    safety: [
      { title: 'Триплекс для огорож', text: 'Застосовується для огорож терас і басейнів, а також фасадних ділянок з підвищеними вимогами до безпеки.' },
      { title: 'Алюмінієві фасадні системи', text: 'Стійково-ригельні конструкції для панорамного скління лобі та громадських зон.' },
      { title: 'Фурнітура для інтенсивної експлуатації', text: 'Посилені петлі, напрямні, доводчики й замки, розраховані на щоденне навантаження гостями в громадських зонах.' },
      { title: 'Уніфіковане технічне рішення', text: 'Єдина специфікація скла, профілю та фурнітури для всього номерного фонду спрощує подальший сервіс і заміну окремих елементів.' }
    ],
    priceFactors: [
      'кількість номерів і типорозмірів',
      'тип душової чи перегородки',
      'скло та фурнітура',
      'фасадні системи громадських зон',
      'графік поетапного монтажу',
      'доставка на об’єкт'
    ],
    alsoLinks: [
      { label: 'Скляні перегородки для душу Walk-In', href: '/dushovi-kabiny/peregorodka-dlya-dusha/' },
      { label: 'Скляні шторки на ванну', href: '/dushovi-kabiny/shtorky-dlya-vannoyi/' },
      { label: 'Скляні двері на замовлення', href: '/sklyani-dveri/' }
    ],
    // Own 11 «Чи обслуговуєте конструкції після монтажу?» repeats the «Сервіс після монтажу» guarantee and shared FAQ 4.
    faqReplace: {
      11: ['Чи можна замовити огорожу для басейну готелю?', 'Так, огорожі басейнів виконують із триплексу з урахуванням вимог безпеки для зон з підвищеною вологістю.']
    },
    faqAdd: [],
    // 3 ≈ own «Чи монтуєте без зупинки роботи готелю?», 5 ≈ own lobby glass question + «Скло та безпека».
    commonSkip: [3, 5]
  },
  restoranam: {
    choose: [
      { title: 'Слайдингова чи складана система', text: 'Слайдингові панелі розсуваються вздовж напрямної, складані — збираються гармошкою збоку. Вибір залежить від ширини прорізу й бажаного кута відкриття.', link: { label: 'Слайдингова чи складна система скління: що краще', href: '/knowledge/slaydingova-chy-skladana-systema/' } },
      { title: 'Тепле чи холодне скління тераси', text: 'Холодний контур підходить для сезонної літньої тераси. Теплий контур зі склопакетом дозволяє використовувати простір і в прохолодну пору.', link: { label: 'Тепле чи холодне скління тераси: різниця', href: '/knowledge/teple-chy-kholodne-sklinnya-terasy/' } },
      { title: 'Безрамне скління для максимального огляду', text: 'Відсутність вертикальних стійок зберігає панораму вулиці чи двору — важливо для терас із видом, який є частиною атмосфери закладу.', link: { label: 'Системи безрамного скління: як обрати механіку', href: '/knowledge/bezramne-sklinnya-systemy-yak-obraty/' } }
    ],
    safety: [
      { title: 'Безпечне скло на рівні вулиці', text: 'Триплекс для вітрин і фасадних ділянок першого поверху не розсипається при пошкодженні — важливо для конструкцій, доступних з тротуару.' },
      { title: 'Стійкість до сезонних навантажень', text: 'Розсувні й безрамні системи терас розраховують на вітрове навантаження та цикли відкривання протягом сезону.' },
      { title: 'Гігієнічні поверхні в залі', text: 'Скляні перегородки й двері в зоні обслуговування гостей легко очищуються та не накопичують запахів, на відміну від текстильних розділювачів.' },
      { title: 'Фурнітура розсувних систем', text: 'Ролики й напрямні для розсувних фасадів підбираються під частоту відкривання протягом дня.' }
    ],
    priceFactors: [
      'площа тераси чи фасаду',
      'тип системи скління — слайдингова, складана чи безрамна',
      'тепла чи холодна конструкція',
      'скло та фурнітура',
      'кількість дверних і фасадних груп',
      'монтаж і сезонність робіт'
    ],
    alsoLinks: [
      { label: 'Алюмінієві фасадні системи', href: '/alyuminiyevi-konstrukcziyi/fasadne-sklinnya/' },
      { label: 'Алюмінієві розсувні системи', href: '/alyuminiyevi-konstrukcziyi/rozsuvni-dveri/' },
      { label: 'Вітринне скління магазинів і закладів', href: '/poslugy/sklyani-fasady/vitrinne-sklinnya/' },
      { label: 'Безрамні розсувні системи для терас', href: '/bezramne-sklinnya/sklyani-rozsuvni-systemy/' }
    ],
    faqAdd: [
      ['Чи запотіває скло вітрини взимку?', 'Це залежить від перепаду температур і вентиляції залу — енергоефективний склопакет знижує ризик конденсату.']
    ],
    // 3 ≈ own «Скільки триває монтаж скління тераси?» (монтаж у неробочий час), 5 → «Скло та безпека», 6 ≈ own logo question.
    commonSkip: [3, 5, 6]
  },
  magazynam: {
    choose: [
      { title: 'Триплекс для вітрини першого поверху', text: 'Скло, доступне з вулиці, вимагає підвищеної безпеки — при пошкодженні воно має лишатися в рамі, а не розсипатися на тротуар.', link: { label: 'Heat Soak Test загартованого скла: коли він потрібен', href: '/knowledge/heat-soak-test-zagartovanogo-skla/' } },
      { title: 'Підготовка приміщення до заміру', text: 'Точний розрахунок вітрини чи вхідної групи можливий лише після фінального заміру фактичного прорізу фасаду.', link: { label: 'Як підготувати простір до заміру', href: '/knowledge/yak-pidhotuvaty-prostir-do-zamiru/' } }
    ],
    safety: [
      { title: 'Стійкість до щоденного трафіку', text: 'Вхідні групи з інтенсивним використанням комплектують фурнітурою, розрахованою на сотні відкривань щодня без втрати плавності ходу.' },
      { title: 'Перевірене загартоване скло', text: 'Для відповідальних конструкцій застосовується скло з підтвердженою термічною обробкою, що знижує ризик спонтанного руйнування.' },
      { title: 'Алюмінієві профільні системи', text: 'Формують мінімалістичний каркас вітрини та вхідної групи.' }
    ],
    priceFactors: [
      'площа вітрини чи фасаду',
      'тип і товщина скла',
      'система профілю',
      'фурнітура під трафік',
      'нанесення логотипа чи плівки',
      'монтаж і графік робіт у приміщенні'
    ],
    alsoLinks: [
      { label: 'Скляні двері на замовлення', href: '/sklyani-dveri/' },
      { label: 'Алюмінієві вхідні двері на замовлення', href: '/alyuminiyevi-konstrukcziyi/alyuminiyevi-dveri/' }
    ],
    introAdd: 'У торговому залі скляні перегородки з матованим чи сатинованим склом відокремлюють примірочні й касову зону, не закриваючи огляд товару.',
    faqAdd: [
      ['Чи можна інтегрувати підсвітку у вітрину?', 'Так, підсвітку узгоджуємо на етапі проєктування — вона підкреслює товар і фасад магазину в темний час доби.'],
      ['Чи можна працювати за кресленнями архітектора чи дизайнера?', 'Так, можемо реалізувати проєкт за наданими кресленнями, узгодивши технічні деталі скла й профілю.']
    ],
    // 3 ≈ own «Чи можна замінити вітрину без закриття магазину?», 5 ≈ own shop-window glass question, 6 ≈ own logo question, 7 ≈ own price question.
    commonSkip: [3, 5, 6, 7]
  }
};

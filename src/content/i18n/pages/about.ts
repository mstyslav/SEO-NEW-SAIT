// Locale-keyed content for /about/ (uk, unprefixed) and /ru/about/.
// Both URLs are rendered by the single template at
// src/components/pages/AboutPage.astro — this file is the only place page
// copy differs between the two locales.
//
// The `uk` block is the exact copy that was previously hardcoded directly in
// src/pages/about.astro (extracted verbatim, not reworded), so switching the
// template over to these keys does not change the uk output at all.
import type { Locale } from '../../../i18n/helpers';

export interface AboutContent {
  meta: { title: string; description: string };
  hero: { eyebrow: string; h1: [string, string, string]; subtitle: string; imageAlt: string };
  statsAriaLabel: string;
  stats: [string, string][];
  directions: {
    eyebrow: string;
    title: string;
    intro: string;
    navAriaLabel: string;
    items: { label: string; href: string }[];
  };
  story: { eyebrow: string; title: string; paragraphs: [string, string]; timelineAriaLabel: string };
  timeline: { year: string; text: string; image: string }[];
  values: { eyebrow: string; title: string; items: [string, string][] };
  team: {
    eyebrow: string;
    title: string;
    intro: string;
    careerLinkLabel: string;
    members: { name: string; role: string; img: string }[];
  };
  trust: { eyebrow: string; titleHtml: string; linkLabel: string };
  systems: { eyebrow: string; title: string; linkLabel: string };
  finalCta: { eyebrow: string; title: string; text: string; buttonLabel: string };
  career: {
    eyebrow: string;
    title: string;
    text: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    jobAriaLabel: string;
    jobPlaceholder: string;
    jobOptions: string[];
    submitLabel: string;
  };
}

export const aboutContent: Record<Locale, AboutContent> = {
  uk: {
    meta: {
      title: 'Про Space Glass — скляні та алюмінієві конструкції в Україні',
      description:
        'Space Glass — проєктування, виготовлення та монтаж скляних перегородок, Loft-перегородок, дверей, душових, огорож, фасадного й безрамного скління, алюмінієвих конструкцій, пергол і сонцезахисних систем в Україні та Європі.'
    },
    hero: {
      eyebrow: 'SPACE GLASS · ПРО КОМПАНІЮ',
      h1: ['Скляні конструкції', 'та алюмінієві системи', 'Space Glass'],
      subtitle:
        'Проєктуємо, виготовляємо та монтуємо скляні перегородки, Loft-перегородки, скляні огорожі, душові кабіни, скляні двері, фасадне й безрамне скління, алюмінієві вікна та двері, перголи й сонцезахисні системи. Працюємо по всій Україні та реалізуємо проєкти в Європі.',
      imageAlt: 'Команда Space Glass на реалізованому об’єкті зі скляним огородженням'
    },
    statsAriaLabel: 'Показники Space Glass',
    stats: [
      ['5 000+', 'реалізованих проєктів для дому та бізнесу в Україні та Європі'],
      ['50 000+', 'м² виконаного засклення житлових та комерційних об’єктів різної складності'],
      ['10+', 'років реального досвіду в реалізації скляних та алюмінієвих конструкцій'],
      ['3+', 'Київ · Одеса · Львів реалізація проєктів різної складності по всім Україні']
    ],
    directions: {
      eyebrow: 'НАШІ НАПРЯМКИ',
      title: 'Що ми проєктуємо, виготовляємо та монтуємо',
      intro:
        'Space Glass проєктує, виготовляє та монтує скляні перегородки, лофт-перегородки, скляні двері, душові кабіни, скляні огорожі та навіси, системи безрамного й фасадного скління, алюмінієві вікна та двері, перголи, біокліматичні перголи й сонцезахисні системи для житлових, комерційних та архітектурних об’єктів.',
      navAriaLabel: 'Основні напрямки Space Glass',
      items: [
        { label: 'Скляні перегородки', href: '/sklyani-perehorodky/' },
        { label: 'Скляні двері', href: '/sklyani-dveri/' },
        { label: 'Душові кабіни', href: '/dushovi-kabiny/' },
        { label: 'Скляні огорожі', href: '/sklyani-ohorozhi/' },
        { label: 'Скляні навіси', href: '/arkhitekturni-systemy/' },
        { label: 'Безрамне скління', href: '/arkhitekturni-systemy/' },
        { label: 'Фасадне скління', href: '/fasadne-configurator/' },
        { label: 'Алюмінієві вікна та двері', href: '/alyuminiievi-konstruktsii/' }
      ]
    },
    story: {
      eyebrow: 'Наша історія',
      title: 'Досвід, що створює майбутнє',
      paragraphs: [
        'Space Glass виросла з практичного досвіду у сфері скла та фурнітури. Із 2014 року ми розвивали технічну експертизу, формували команду, запускали власні процеси та поступово переходили від окремих виробів до комплексних скляних і алюмінієвих рішень.',
        'Сьогодні Space Glass працює з приватними, комерційними та архітектурними об’єктами в Україні та Європі. Ми виконуємо проєктування, виготовлення й монтаж скляних та алюмінієвих конструкцій — від перегородок, дверей, душових і огорож до фасадного скління, алюмінієвих вікон, пергол та комплексних архітектурних систем — і супроводжуємо проєкт від першої консультації до реалізації.'
      ],
      timelineAriaLabel: 'Історія розвитку Space Glass'
    },
    timeline: [
      { year: '2014', text: 'Початок професійного шляху у сфері скла', image: '/images/about/history/2014-400.webp' },
      { year: '2016', text: 'Розширення напрямів та формування команди', image: '/images/about/history/2016-400.webp' },
      { year: '2018', text: 'Перші великі приватні й комерційні об’єкти', image: '/images/about/history/2018-400.webp' },
      { year: '2020', text: 'Посилення виробничих і монтажних процесів', image: '/images/about/history/2020-400.webp' },
      { year: '2022', text: 'Новий етап розвитку та масштабні проєкти', image: '/images/about/history/2022-400.webp' },
      { year: '2024', text: 'Розширення географії та комплексних рішень', image: '/images/about/history/2024-400.webp' },
      { year: '2026', text: 'Європейський розвиток Space Glass', image: '/images/about/history/2026-400.webp' }
    ],
    values: {
      eyebrow: 'Наші цінності',
      title: 'Будуємо довіру так само точно, як конструкції',
      items: [
        ['Якість', 'Перевірені матеріали, сертифіковане скло та надійна фурнітура.'],
        ['Професіоналізм', 'Досвід, технічна точність і контроль деталей на кожному етапі.'],
        ['Надійність', 'Плануємо строки, фіксуємо рішення та відповідаємо за результат.'],
        ['Індивідуальний підхід', 'Кожен проєкт адаптуємо під архітектуру, розміри й задачу.']
      ]
    },
    team: {
      eyebrow: 'Наша команда',
      title: 'Люди, які створюють простір',
      intro: 'Від першої консультації до логістики й монтажу — за кожним етапом стоїть конкретна людина.',
      careerLinkLabel: 'Приєднуйся до команди →',
      members: [
        { name: 'Олександр', role: 'Співвласник, співзасновник', img: '/images/team/Олександр-450.webp' },
        { name: 'Мстислав', role: 'Співвласник, співзасновник', img: '/images/team/Мстислав-450.webp' },
        { name: 'Микола', role: 'Керівник відділу продажів', img: '/images/team/Микола-450.webp' },
        { name: 'Юлія', role: 'Контент-мейкер', img: '/images/team/yuliia-content-450.webp' },
        { name: 'Анастасія', role: 'SMM-спеціаліст', img: '/images/team/Анастасія-450.webp' },
        { name: 'Євген', role: 'Майстер з монтажу', img: '/images/team/Євген-450.webp' },
        { name: 'Марія', role: 'Акаунт-менеджер', img: '/images/team/Марія Акаунт-менеджер-450.webp' },
        { name: 'Юлія', role: 'Організатор', img: '/images/team/Юлія - організатор-450.webp' },
        { name: 'Мілана', role: 'Менеджер проєкту', img: '/images/team/Мілана-450.webp' },
        { name: 'Артур', role: 'Майстер з монтажу', img: '/images/team/Артур-450.webp' },
        { name: 'Петро', role: 'Помічник майстра з монтажу', img: '/images/team/Петя-450.webp' },
        { name: 'Максим', role: 'Комірник, логіст', img: '/images/team/Максим-450.webp' }
      ]
    },
    trust: {
      eyebrow: 'Нам довіряють',
      titleHtml: 'Компанії та проєкти,<br />з якими ми працювали',
      linkLabel: 'Дивитися всі проєкти'
    },
    systems: {
      eyebrow: 'Системи та бренди',
      title: 'Працюємо з перевіреними рішеннями',
      linkLabel: 'Детальніше про системи →'
    },
    finalCta: {
      eyebrow: 'Ваш проєкт',
      title: 'Готові реалізувати складне рішення зі скла?',
      text: 'Надішліть фото, розміри або креслення — підберемо оптимальну конструкцію та підготуємо попередній розрахунок.',
      buttonLabel: 'Обговорити проєкт →'
    },
    career: {
      eyebrow: 'КАР’ЄРА В SPACE GLASS',
      title: 'Робота та кар’єра в Space Glass',
      text:
        'Розвиваємо команду Space Glass та відкриті до спеціалістів у сфері монтажу скляних і алюмінієвих конструкцій, продажів, проєктування та маркетингу. Залиште контакт і напрям роботи — ми зв’яжемося з вами для обговорення всіх деталей.',
      nameLabel: 'Ім’я',
      namePlaceholder: 'Ваше ім’я',
      phoneLabel: 'Телефон',
      phonePlaceholder: 'Телефон',
      jobAriaLabel: 'Напрям роботи',
      jobPlaceholder: 'Напрям роботи',
      jobOptions: ['Монтаж', 'Продажі', 'Проєктування', 'Маркетинг', 'Інше'],
      submitLabel: 'Надіслати заявку →'
    }
  },
  ru: {
    meta: {
      title: 'О Space Glass — стеклянные и алюминиевые конструкции в Украине',
      description:
        'Space Glass — проектирование, изготовление и монтаж стеклянных перегородок, Loft-перегородок, дверей, душевых, ограждений, фасадного и безрамного остекления, алюминиевых конструкций, пергол и солнцезащитных систем в Украине и Европе.'
    },
    hero: {
      eyebrow: 'SPACE GLASS · О КОМПАНИИ',
      h1: ['Стеклянные конструкции', 'и алюминиевые системы', 'Space Glass'],
      subtitle:
        'Проектируем, изготавливаем и монтируем стеклянные перегородки, Loft-перегородки, стеклянные ограждения, душевые кабины, стеклянные двери, фасадное и безрамное остекление, алюминиевые окна и двери, перголы и солнцезащитные системы. Работаем по всей Украине и реализуем проекты в Европе.',
      imageAlt: 'Команда Space Glass на реализованном объекте со стеклянным ограждением'
    },
    statsAriaLabel: 'Показатели Space Glass',
    stats: [
      ['5 000+', 'реализованных проектов для дома и бизнеса в Украине и Европе'],
      ['50 000+', 'м² выполненного остекления жилых и коммерческих объектов разной сложности'],
      ['10+', 'лет реального опыта в реализации стеклянных и алюминиевых конструкций'],
      ['3+', 'Киев · Одесса · Львов реализация проектов разной сложности по всей Украине']
    ],
    directions: {
      eyebrow: 'НАШИ НАПРАВЛЕНИЯ',
      title: 'Что мы проектируем, изготавливаем и монтируем',
      intro:
        'Space Glass проектирует, изготавливает и монтирует стеклянные перегородки, лофт-перегородки, стеклянные двери, душевые кабины, стеклянные ограждения и навесы, системы безрамного и фасадного остекления, алюминиевые окна и двери, перголы, биоклиматические перголы и солнцезащитные системы для жилых, коммерческих и архитектурных объектов.',
      navAriaLabel: 'Основные направления Space Glass',
      items: [
        { label: 'Стеклянные перегородки', href: '/sklyani-perehorodky/' },
        { label: 'Стеклянные двери', href: '/sklyani-dveri/' },
        { label: 'Душевые кабины', href: '/dushovi-kabiny/' },
        { label: 'Стеклянные ограждения', href: '/sklyani-ohorozhi/' },
        { label: 'Стеклянные навесы', href: '/arkhitekturni-systemy/' },
        { label: 'Безрамное остекление', href: '/arkhitekturni-systemy/' },
        { label: 'Фасадное остекление', href: '/fasadne-configurator/' },
        { label: 'Алюминиевые окна и двери', href: '/alyuminiievi-konstruktsii/' }
      ]
    },
    story: {
      eyebrow: 'Наша история',
      title: 'Опыт, который создаёт будущее',
      paragraphs: [
        'Space Glass выросла из практического опыта в сфере стекла и фурнитуры. С 2014 года мы развивали техническую экспертизу, формировали команду, запускали собственные процессы и постепенно переходили от отдельных изделий к комплексным стеклянным и алюминиевым решениям.',
        'Сегодня Space Glass работает с частными, коммерческими и архитектурными объектами в Украине и Европе. Мы выполняем проектирование, изготовление и монтаж стеклянных и алюминиевых конструкций — от перегородок, дверей, душевых и ограждений до фасадного остекления, алюминиевых окон, пергол и комплексных архитектурных систем — и сопровождаем проект от первой консультации до реализации.'
      ],
      timelineAriaLabel: 'История развития Space Glass'
    },
    timeline: [
      { year: '2014', text: 'Начало профессионального пути в сфере стекла', image: '/images/about/history/2014-400.webp' },
      { year: '2016', text: 'Расширение направлений и формирование команды', image: '/images/about/history/2016-400.webp' },
      { year: '2018', text: 'Первые крупные частные и коммерческие объекты', image: '/images/about/history/2018-400.webp' },
      { year: '2020', text: 'Усиление производственных и монтажных процессов', image: '/images/about/history/2020-400.webp' },
      { year: '2022', text: 'Новый этап развития и масштабные проекты', image: '/images/about/history/2022-400.webp' },
      { year: '2024', text: 'Расширение географии и комплексных решений', image: '/images/about/history/2024-400.webp' },
      { year: '2026', text: 'Европейское развитие Space Glass', image: '/images/about/history/2026-400.webp' }
    ],
    values: {
      eyebrow: 'Наши ценности',
      title: 'Строим доверие так же точно, как конструкции',
      items: [
        ['Качество', 'Проверенные материалы, сертифицированное стекло и надёжная фурнитура.'],
        ['Профессионализм', 'Опыт, техническая точность и контроль деталей на каждом этапе.'],
        ['Надёжность', 'Планируем сроки, фиксируем решения и отвечаем за результат.'],
        ['Индивидуальный подход', 'Каждый проект адаптируем под архитектуру, размеры и задачу.']
      ]
    },
    team: {
      eyebrow: 'Наша команда',
      title: 'Люди, которые создают пространство',
      intro: 'От первой консультации до логистики и монтажа — за каждым этапом стоит конкретный человек.',
      careerLinkLabel: 'Присоединяйся к команде →',
      members: [
        { name: 'Александр', role: 'Совладелец, сооснователь', img: '/images/team/Олександр-450.webp' },
        { name: 'Мстислав', role: 'Совладелец, сооснователь', img: '/images/team/Мстислав-450.webp' },
        { name: 'Николай', role: 'Руководитель отдела продаж', img: '/images/team/Микола-450.webp' },
        { name: 'Юлия', role: 'Контент-мейкер', img: '/images/team/yuliia-content-450.webp' },
        { name: 'Анастасия', role: 'SMM-специалист', img: '/images/team/Анастасія-450.webp' },
        { name: 'Евгений', role: 'Мастер по монтажу', img: '/images/team/Євген-450.webp' },
        { name: 'Мария', role: 'Аккаунт-менеджер', img: '/images/team/Марія Акаунт-менеджер-450.webp' },
        { name: 'Юлия', role: 'Организатор', img: '/images/team/Юлія - організатор-450.webp' },
        { name: 'Милана', role: 'Менеджер проекта', img: '/images/team/Мілана-450.webp' },
        { name: 'Артур', role: 'Мастер по монтажу', img: '/images/team/Артур-450.webp' },
        { name: 'Пётр', role: 'Помощник мастера по монтажу', img: '/images/team/Петя-450.webp' },
        { name: 'Максим', role: 'Кладовщик, логист', img: '/images/team/Максим-450.webp' }
      ]
    },
    trust: {
      eyebrow: 'Нам доверяют',
      titleHtml: 'Компании и проекты,<br />с которыми мы работали',
      linkLabel: 'Смотреть все проекты'
    },
    systems: {
      eyebrow: 'Системы и бренды',
      title: 'Работаем с проверенными решениями',
      linkLabel: 'Подробнее о системах →'
    },
    finalCta: {
      eyebrow: 'Ваш проект',
      title: 'Готовы реализовать сложное решение из стекла?',
      text: 'Отправьте фото, размеры или чертёж — подберём оптимальную конструкцию и подготовим предварительный расчёт.',
      buttonLabel: 'Обсудить проект →'
    },
    career: {
      eyebrow: 'КАРЬЕРА В SPACE GLASS',
      title: 'Работа и карьера в Space Glass',
      text:
        'Развиваем команду Space Glass и открыты к специалистам в сфере монтажа стеклянных и алюминиевых конструкций, продаж, проектирования и маркетинга. Оставьте контакт и направление работы — мы свяжемся с вами для обсуждения всех деталей.',
      nameLabel: 'Имя',
      namePlaceholder: 'Ваше имя',
      phoneLabel: 'Телефон',
      phonePlaceholder: 'Телефон',
      jobAriaLabel: 'Направление работы',
      jobPlaceholder: 'Направление работы',
      jobOptions: ['Монтаж', 'Продажи', 'Проектирование', 'Маркетинг', 'Другое'],
      submitLabel: 'Отправить заявку →'
    }
  }
};

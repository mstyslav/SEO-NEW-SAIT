import type { Locale } from '../i18n/helpers';

type Pair = [string, string];

const topicLabel = (title: string, locale: Locale) => title
  .replace(/^(FAQ|Часті питання|Частые вопросы|Frequently asked questions|Häufige Fragen)\s*(про|об|about|zu)?\s*/i, '')
  .replace(/[:?].*$/, '')
  .trim() || ({ uk:'скляної конструкції', ru:'стеклянной конструкции', en:'the glass solution', de:'der Glaslösung' }[locale]);

const templates: Record<Locale, Array<(topic: string) => Pair>> = {
  uk: [
    t=>[`Від чого залежить вартість ${t}?`,'Від габаритів, типу й обробки скла, фурнітури, складності проєктування, доставки та умов монтажу.'],
    t=>[`Чи можна попередньо розрахувати ${t} за фото?`,'Так. Додайте приблизні розміри, фото, місто й короткий опис задачі. Точну комплектацію підтвердимо після заміру.'],
    t=>[`Коли потрібен професійний замір для ${t}?`,'Фінальний замір виконують після завершення поверхонь, які формують чистий отвір або місце встановлення.'],
    t=>[`Яке скло застосовують для ${t}?`,'Тип, товщину та склад безпечного скла визначають за габаритами, способом кріплення і навантаженнями.'],
    t=>[`Чи можна виготовити ${t} за індивідуальними розмірами?`,'Так. Більшість конструкцій Space Glass проєктуються під фактичну геометрію конкретного об’єкта.'],
    t=>[`Скільки триває виготовлення ${t}?`,'Строк залежить від складності, обробки скла, фурнітури та завантаження виробництва і фіксується після погодження креслення.'],
    t=>[`Що потрібно підготувати перед замовленням ${t}?`,'Корисні фото місця, орієнтовні розміри, місто, побажання до скла, кольору фурнітури й способу відкривання.'],
    t=>[`Чи входить монтаж ${t} у вартість?`,'Монтаж і доставка зазначаються в пропозиції окремо або у складі погодженої комплектації.'],
    t=>[`Чи надається гарантія на ${t}?`,'Гарантійні умови залежать від скла, системи та фурнітури й фіксуються в документах до замовлення.'],
    t=>[`Чи можна змінити колір фурнітури для ${t}?`,'Так, якщо потрібне покриття доступне для обраної системи та відповідає умовам експлуатації.'],
    t=>[`Як погоджується конструкція ${t} перед виробництвом?`,'Замовник отримує креслення або специфікацію з розмірами, склом, фурнітурою, зазорами та напрямками відкривання.'],
    t=>[`Чи можна встановити ${t} після завершеного ремонту?`,'Так, якщо основи придатні для кріплення, відомі приховані комунікації та забезпечено безпечний доступ.'],
    t=>[`Як доглядати за ${t}?`,'Використовуйте неабразивні засоби, регулярно очищайте ущільнення й напрямні та звертайтеся в сервіс при люфті або зміні зазорів.'],
    t=>[`Чи доставляє Space Glass ${t} в інші міста?`,'Так. Умови доставки й монтажу погоджуються за містом, габаритами та доступом до об’єкта.'],
    t=>[`Що робити, якщо стіни або підлога нерівні для ${t}?`,'Відхилення фіксують на замірі та враховують профілями, зазорами або індивідуальною геометрією скла.'],
    t=>[`Чи можна змінювати погоджені розміри ${t}?`,'До запуску у виробництво — після повторного погодження. Загартоване скло після виготовлення не можна підрізати чи свердлити.'],
    t=>[`Як замовити консультацію щодо ${t}?`,'Перейдіть до форми розрахунку, додайте контакти, місто, фото та приблизні розміри — менеджер уточнить технічні деталі.'],
  ],
  ru: [], en: [], de: []
};

const fallback: Record<'ru'|'en'|'de', Pair[]> = {
  ru: [['От чего зависит стоимость?','От размеров, стекла, фурнитуры и условий монтажа.'],['Можно рассчитать по фото?','Да, для предварительной оценки добавьте размеры, город и описание.'],['Когда нужен замер?','После завершения поверхностей, формирующих чистовой проём.'],['Используется безопасное стекло?','Состав и толщину подбирают по конструкции и нагрузкам.'],['Возможны индивидуальные размеры?','Да, конструкция проектируется под объект.'],['Какой срок изготовления?','Срок подтверждается после согласования чертежа.'],['Что подготовить?','Фото, размеры, город и пожелания.'],['Монтаж входит в цену?','Комплектация указывается в предложении.'],['Есть гарантия?','Условия фиксируются до заказа.'],['Можно выбрать цвет фурнитуры?','Да, в рамках выбранной системы.'],['Как согласуется проект?','По чертежу и спецификации.'],['Можно установить после ремонта?','Да, если основания готовы.'],['Как ухаживать?','Без абразивов, с регулярным осмотром механизмов.'],['Есть доставка?','Да, условия зависят от города и габаритов.'],['Что делать с неровными стенами?','Отклонения учитываются после замера.'],['Можно изменить размеры?','Только до запуска в производство.'],['Как получить консультацию?','Отправьте фото и размеры через форму расчёта.']],
  en: [['What affects the price?','Dimensions, glass, hardware and installation conditions.'],['Can you estimate from photos?','Yes, include dimensions, city and a short brief.'],['When is a site survey needed?','After all opening-defining finishes are complete.'],['Is safety glass used?','The make-up and thickness are selected for the loads.'],['Are custom sizes available?','Yes, each solution can be designed for the site.'],['What is the lead time?','It is confirmed after drawing approval.'],['What should I prepare?','Photos, dimensions, location and preferences.'],['Is installation included?','The quotation clearly states the scope.'],['Is there a warranty?','Terms are documented before ordering.'],['Can hardware colour be selected?','Yes, within the chosen system.'],['How is the design approved?','With drawings and a specification.'],['Can it be installed after renovation?','Yes, if substrates and access are suitable.'],['How is it maintained?','Use non-abrasive cleaners and inspect moving parts.'],['Do you deliver?','Yes, terms depend on location and size.'],['What about uneven walls?','Site deviations are recorded and allowed for.'],['Can approved dimensions change?','Only before production starts.'],['How do I request advice?','Send photos and dimensions through the quote form.']],
  de: [['Wovon hängt der Preis ab?','Von Maßen, Glas, Beschlägen und Montagebedingungen.'],['Ist eine Schätzung per Foto möglich?','Ja, mit Maßen, Ort und kurzer Beschreibung.'],['Wann ist ein Aufmaß nötig?','Nach Fertigstellung aller relevanten Oberflächen.'],['Wird Sicherheitsglas verwendet?','Aufbau und Stärke richten sich nach Konstruktion und Lasten.'],['Sind Sondermaße möglich?','Ja, die Lösung wird objektbezogen geplant.'],['Wie lang ist die Lieferzeit?','Sie wird nach Freigabe der Zeichnung bestätigt.'],['Was wird zur Anfrage benötigt?','Fotos, Maße, Ort und Wünsche.'],['Ist die Montage enthalten?','Der Leistungsumfang steht im Angebot.'],['Gibt es Garantie?','Die Bedingungen werden vor Bestellung dokumentiert.'],['Ist die Beschlagfarbe wählbar?','Ja, innerhalb des gewählten Systems.'],['Wie erfolgt die Freigabe?','Anhand von Zeichnung und Spezifikation.'],['Montage nach Renovierung möglich?','Ja, bei geeigneten Untergründen und Zugang.'],['Wie erfolgt die Pflege?','Nicht scheuernd reinigen und Mechanik prüfen.'],['Gibt es Lieferung?','Ja, abhängig von Ort und Abmessungen.'],['Was bei unebenen Wänden?','Abweichungen werden beim Aufmaß berücksichtigt.'],['Können Maße geändert werden?','Nur vor Produktionsbeginn.'],['Wie erhalte ich Beratung?','Fotos und Maße über das Anfrageformular senden.']]
};

export function expandFaq(items: Pair[], title: string, locale: Locale = 'uk', limit = 20): Pair[] {
  const topic = topicLabel(title, locale);
  const generated = locale === 'uk' ? templates.uk.map((make) => make(topic)) : fallback[locale].map(([q,a]) => [`${q} — ${topic}`, a] as Pair);
  const seen = new Set(items.map(([q]) => q.toLocaleLowerCase(locale)));
  const result = [...items];
  for (const pair of generated) {
    if (result.length >= limit) break;
    const key = pair[0].toLocaleLowerCase(locale);
    if (!seen.has(key)) { result.push(pair); seen.add(key); }
  }
  return result.slice(0, limit);
}

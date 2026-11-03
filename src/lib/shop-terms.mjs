// Sale terms agreed with the owner (the single source for the shop pages, FAQ and the draft feed).
// NOT agreed yet, therefore never stated: pickup city, delivery cost, return rules, online payment.
export const LEAD_DAYS = { min: 3, max: 35 }; // working days, after the order is approved AND paid
export const WARRANTY_MONTHS = 12;

const T = {
  uk: {
    geo: 'Доставка по всій Україні.',
    delivery: 'Доставка — «Новою поштою» або самовивіз. Вартість доставки та місце самовивозу менеджер узгоджує із замовником.',
    payment: 'Оплата — 100% передоплата після погодження замовлення менеджером. Онлайн-оплати на сайті немає.',
    lead: `Строк виготовлення — від ${LEAD_DAYS.min} до ${LEAD_DAYS.max} робочих днів залежно від моделі та комплектації. Відлік починається після погодження замовлення та надходження оплати.`,
    warranty: `Гарантія — ${WARRANTY_MONTHS} місяців.`,
    flow: 'Кошик → заявка → менеджер → погодження → оплата → виготовлення.',
    leadShort: `${LEAD_DAYS.min}–${LEAD_DAYS.max} робочих днів після погодження та оплати`, warrantyShort: `${WARRANTY_MONTHS} місяців`
  },
  ru: {
    geo: 'Доставка по всей Украине.',
    delivery: 'Доставка — «Новой почтой» или самовывоз. Стоимость доставки и место самовывоза менеджер согласует с заказчиком.',
    payment: 'Оплата — 100% предоплата после согласования заказа менеджером. Онлайн-оплаты на сайте нет.',
    lead: `Срок изготовления — от ${LEAD_DAYS.min} до ${LEAD_DAYS.max} рабочих дней в зависимости от модели и комплектации. Отсчёт начинается после согласования заказа и поступления оплаты.`,
    warranty: `Гарантия — ${WARRANTY_MONTHS} месяцев.`,
    flow: 'Корзина → заявка → менеджер → согласование → оплата → изготовление.',
    leadShort: `${LEAD_DAYS.min}–${LEAD_DAYS.max} рабочих дней после согласования и оплаты`, warrantyShort: `${WARRANTY_MONTHS} месяцев`
  }
};
export const terms = (locale) => T[locale === 'ru' ? 'ru' : 'uk'];

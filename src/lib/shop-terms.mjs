// Sale terms agreed with the owner (the single source for the shop pages, FAQ and the draft feed).
// Confirmed: free Nova Poshta delivery, 100% prepayment after manager approval, 12-month warranty.\n// Pickup city remains unspecified; online payment is not supported. Returns are governed by the shop policy pages.
export const LEAD_DAYS = { min: 0, max: 35, standardMax: 15, metalFrameMax: 35 }; // working days after order approval and payment
export const WARRANTY_MONTHS = 12;

const T = {
  uk: {
    geo: 'Доставка по всій Україні.',
    delivery: 'Доставка — «Новою поштою» або самовивіз. Доставка Новою поштою безкоштовна для покупця. Місце самовивозу уточнюйте у менеджера.',
    payment: 'Оплата — 100% передоплата банківським переказом після оформлення замовлення та отримання реквізитів від менеджера. Онлайн-оплати на сайті немає.',
    lead: `Строк виготовлення — до ${LEAD_DAYS.standardMax} робочих днів для стандартних дзеркал або до ${LEAD_DAYS.metalFrameMax} робочих днів для дзеркал із металевою рамою. Відлік починається після підтвердження комплектації та надходження оплати.`,
    warranty: `Гарантія — ${WARRANTY_MONTHS} місяців.`,
    flow: 'Кошик → оформлення замовлення → перевірка ціни на сервері → реквізити від менеджера → 100% передоплата → виготовлення.',
    leadShort: `до ${LEAD_DAYS.standardMax} робочих днів; з металевою рамою — до ${LEAD_DAYS.metalFrameMax} робочих днів після погодження та оплати`, warrantyShort: `${WARRANTY_MONTHS} місяців`
  },
  ru: {
    geo: 'Доставка по всей Украине.',
    delivery: 'Доставка — «Новой почтой» или самовывоз. Доставка Новой почтой бесплатна для покупателя. Место самовывоза уточняйте у менеджера.',
    payment: 'Оплата — 100% предоплата банковским переводом после оформления заказа и получения реквизитов от менеджера. Онлайн-оплаты на сайте нет.',
    lead: `Срок изготовления — до ${LEAD_DAYS.standardMax} рабочих дней для стандартных зеркал или до ${LEAD_DAYS.metalFrameMax} рабочих дней для зеркал с металлической рамой. Отсчёт начинается после подтверждения комплектации и поступления оплаты.`,
    warranty: `Гарантия — ${WARRANTY_MONTHS} месяцев.`,
    flow: 'Корзина → оформление заказа → проверка цены на сервере → реквизиты от менеджера → 100% предоплата → изготовление.',
    leadShort: `до ${LEAD_DAYS.standardMax} рабочих дней; с металлической рамой — до ${LEAD_DAYS.metalFrameMax} рабочих дней после согласования и оплаты`, warrantyShort: `${WARRANTY_MONTHS} месяцев`
  }
};
export const terms = (locale) => T[locale === 'ru' ? 'ru' : 'uk'];

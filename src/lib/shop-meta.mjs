// SEO title / description of the three catalog pages (UA/RU). Counts come from the data, so they never drift from the page.
// Based on CATEGORY_SEO_METADATA.csv, corrected against the real data: /shop/ and /shop/mirrors/ list all models (also those
// without light), the LED listing only the models with LED light in an available configuration. No delivery/price claims.
import { hasLedLight } from './shop-catalog.mjs';

const plural = (n, one, few, many) => { const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? one : a >= 2 && a <= 4 && (b < 12 || b > 14) ? few : many; };

export function shopMeta(locale, pub) {
  const all = pub.models.length, led = pub.models.filter(hasLedLight).length;
  // Search intents are kept apart from the main pages: /dzerkala/led-dzerkala/ = «дзеркало з LED-підсвіткою на замовлення» (head term, made to your size),
  // /dzerkala/ = types of mirrors on request; the shop pages = «каталог моделей» (ready models, compare shape/size/price, order). Title, H1 and intro say so.
  if (locale === 'ru') return {
    '': { title: 'Магазин Space Glass: каталог зеркал онлайн', description: 'Интернет-магазин Space Glass: каталог зеркал разных форм — в металлической раме и без рамы, с LED-подсветкой и без неё. Размер и опции на выбор.' },
    mirrors: {
      title: 'Каталог зеркал Space Glass: модели в раме и без, цены',
      description: `Каталог зеркал Space Glass: ${all} ${plural(all, 'модель', 'модели', 'моделей')} в металлической раме и без рамы. Сравните форму, подсветку, размер и цену и оформите заказ.`,
      h1: 'Каталог зеркал',
      intro: { text: 'Здесь — готовые модели со стандартными размерами и ценой по выбранной комплектации. О типах зеркал на заказ и подборе под интерьер —', label: 'раздел «Зеркала»', href: '/ru/dzerkala/' }
    },
    'mirrors/led': {
      title: 'Каталог моделей LED-зеркал: форма, размер, цена',
      description: `${led} ${plural(led, 'модель', 'модели', 'моделей')} LED-зеркал Space Glass: сравните форму, раму, подсветку и размер, увидьте цену и оформите заказ онлайн.`,
      h1: 'Каталог моделей LED-зеркал',
      intro: { text: 'Это каталог готовых моделей: у каждой — стандартные размеры и расчёт цены по выбранным функциям. Если нужно LED-зеркало на заказ по собственным размерам или вы выбираете тип подсветки —', label: 'смотрите страницу LED-зеркал на заказ', href: '/ru/dzerkala/led-dzerkala/' }
    }
  };
  return {
    '': { title: 'Магазин Space Glass: каталог дзеркал онлайн', description: 'Інтернет-магазин Space Glass: каталог дзеркал різних форм — у металевій рамі та без рами, з LED-підсвіткою й без неї. Розмір і опції на вибір.' },
    mirrors: {
      title: 'Каталог дзеркал Space Glass: моделі в рамі й без, ціни',
      description: `Каталог дзеркал Space Glass: ${all} ${plural(all, 'модель', 'моделі', 'моделей')} у металевій рамі та без рами. Порівняйте форму, підсвітку, розмір і ціну та оформіть замовлення.`,
      h1: 'Каталог дзеркал',
      intro: { text: 'Тут — готові моделі зі стандартними розмірами та ціною за вибраною комплектацією. Про типи дзеркал на замовлення й добір під інтер’єр —', label: 'розділ «Дзеркала»', href: '/dzerkala/' }
    },
    'mirrors/led': {
      title: 'Каталог моделей LED-дзеркал: форма, розмір, ціна',
      description: `${led} ${plural(led, 'модель', 'моделі', 'моделей')} LED-дзеркал Space Glass: порівняйте форму, раму, підсвітку та розмір, побачте ціну й оформіть замовлення онлайн.`,
      h1: 'Каталог моделей LED-дзеркал',
      intro: { text: 'Це каталог готових моделей: у кожної — стандартні розміри та розрахунок ціни за вибраними функціями. Якщо вам потрібне LED-дзеркало на замовлення за власними розмірами або ви вибираєте тип підсвітки —', label: 'дивіться сторінку LED-дзеркал на замовлення', href: '/dzerkala/led-dzerkala/' }
    }
  };
}

// SEO title / description of the three catalog pages (UA/RU). Counts come from the data, so they never drift from the page.
// Based on CATEGORY_SEO_METADATA.csv, corrected against the real data: /shop/ and /shop/mirrors/ list all models (also those
// without light), the LED listing only the models with LED light in an available configuration. No delivery/price claims.
import { hasLedLight } from './shop-catalog.mjs';

const plural = (n, one, few, many) => { const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? one : a >= 2 && a <= 4 && (b < 12 || b > 14) ? few : many; };

export function shopMeta(locale, pub) {
  const all = pub.models.length, led = pub.models.filter(hasLedLight).length;
  if (locale === 'ru') return {
    '': { title: 'Магазин Space Glass: зеркала онлайн', description: 'Интернет-магазин Space Glass: зеркала разных форм — в металлической раме и без рамы, с LED-подсветкой и без неё. Размер и опции на выбор.' },
    mirrors: { title: 'Зеркала Space Glass: каталог моделей и цен', description: `Каталог зеркал Space Glass: ${all} ${plural(all, 'модель', 'модели', 'моделей')} в металлической раме и без рамы. Фильтры по форме, подсветке, размеру и цене.` },
    'mirrors/led': { title: `LED-зеркала: ${led} ${plural(led, 'модель', 'модели', 'моделей')}, размер на выбор`, description: 'Каталог LED-зеркал Space Glass: круглые, прямоугольные, арочные, в раме и без. Фронтальная и фоновая подсветка, фильтры по размеру и цене.' }
  };
  return {
    '': { title: 'Магазин Space Glass: дзеркала онлайн', description: 'Інтернет-магазин Space Glass: дзеркала різних форм — у металевій рамі та без рами, з LED-підсвіткою й без неї. Розмір і опції на вибір.' },
    mirrors: { title: 'Дзеркала Space Glass: каталог моделей і цін', description: `Каталог дзеркал Space Glass: ${all} ${plural(all, 'модель', 'моделі', 'моделей')} у металевій рамі та без рами. Фільтри за формою, підсвіткою, розміром і ціною.` },
    'mirrors/led': { title: `LED-дзеркала: ${led} ${plural(led, 'модель', 'моделі', 'моделей')}, розмір на вибір`, description: 'Каталог LED-дзеркал Space Glass: круглі, прямокутні, арочні, в рамі та без. Фронтальна й фонова підсвітка, фільтри за розміром і ціною.' }
  };
}

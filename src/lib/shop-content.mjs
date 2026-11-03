// Model descriptions built ONLY from the model's real data (shape, frame, lighting, mounting, size limits, standard sizes, available functions).
// Sentence structure varies with the facts (and a stable per-model variant), so pages are not one template with a swapped name.
// Not hand-written editorial copy: an editor should review the text before the shop is opened for indexing.
// Never claims: warranty, production time, certificates, own production, advantages that are not in the data.
import { attr, optionLabel, groupLabel } from './led-mirror-i18n.mjs';

const EXTRA = ['backlight', 'heating', 'lens', 'shelf', 'switch', 'clock', 'audio'];
const L = (ru, uk, rus) => (ru ? rus : uk);

export function modelContent(locale, m, groups) {
  const ru = locale === 'ru';
  const v = m.id % 3;
  const shape = attr(locale, m.shape).toLowerCase(), light = attr(locale, m.main_light).toLowerCase();
  const framed = m.frame === 'Металева', noLight = m.main_light === 'Без основної підсвітки';
  const keys = m.option_groups.map((g) => g.key);
  const hasBack = keys.includes('backlight');
  const extras = keys.filter((k) => EXTRA.includes(k)).map((k) => groupLabel(locale, k, groups.find((g) => g.key === k).label).toLowerCase());
  const W = m.size_limits_mm.width, H = m.size_limits_mm.height, std = m.standard_sizes.map((s) => `${s.w}×${s.h}`);
  const floor = m.mounting !== 'На стіні';
  const colors = m.option_groups.find((g) => g.key === 'color')?.options.map((o) => optionLabel(locale, o)).map((c) => (/[A-ZА-ЯІЇЄ].*[A-ZА-ЯІЇЄ]/.test(c) ? c : c.toLowerCase())) ?? [];
  const mounting = attr(locale, m.mounting).toLowerCase();

  const open = [
    L(ru, `${m.name_short} — дзеркало ${framed ? 'у металевій рамі' : 'без рами'}. Форма: ${shape}.`, `${m.name_short} — зеркало ${framed ? 'в металлической раме' : 'без рамы'}. Форма: ${shape}.`),
    L(ru, `Модель ${m.name_short}: ${framed ? 'металева рама' : 'без рами'}, форма — ${shape}.`, `Модель ${m.name_short}: ${framed ? 'металлическая рама' : 'без рамы'}, форма — ${shape}.`),
    L(ru, `У моделі ${m.name_short} ${framed ? 'полотно обрамлене металевою рамою' : 'рами немає, край полотна відкритий'}; форма — ${shape}.`, `В модели ${m.name_short} ${framed ? 'полотно обрамлено металлической рамой' : 'рамы нет, край полотна открыт'}; форма — ${shape}.`)
  ][v];
  const lightS = noLight
    ? L(ru, `Основної підсвітки в моделі немає${hasBack ? ', але фонову підсвітку можна додати як функцію' : ''}.`, `Основной подсветки в модели нет${hasBack ? ', но фоновую подсветку можно добавить как функцию' : ''}.`)
    : L(ru, `Основна підсвітка — ${light}${hasBack ? '; додатково доступна фонова' : ''}.`, `Основная подсветка — ${light}${hasBack ? '; дополнительно доступна фоновая' : ''}.`);
  const mountS = floor
    ? L(ru, `Розміщення: ${mounting} — це відрізняє модель від настінних.`, `Размещение: ${mounting} — это отличает модель от настенных.`)
    : L(ru, `Розміщення: ${mounting}.`, `Размещение: ${mounting}.`);
  const sizeS = L(ru,
    `Стандартні розміри: ${std.join(', ')} мм (${std.length}). Свій розмір можна вказати в межах ${W[0]}–${W[1]} мм по ширині та ${H[0]}–${H[1]} мм по висоті.`,
    `Стандартные размеры: ${std.join(', ')} мм (${std.length}). Свой размер можно указать в пределах ${W[0]}–${W[1]} мм по ширине и ${H[0]}–${H[1]} мм по высоте.`);
  const funcS = extras.length
    ? L(ru, `У комплектацію можна додати: ${extras.join(', ')}.${colors.length ? ` Колір рами: ${colors.join(', ')}.` : ''}`, `В комплектацию можно добавить: ${extras.join(', ')}.${colors.length ? ` Цвет рамы: ${colors.join(', ')}.` : ''}`)
    : L(ru, 'Додаткових функцій для цієї моделі не передбачено — комплектація обмежується розміром і скляним полотном.', 'Дополнительных функций для этой модели не предусмотрено — комплектация ограничивается размером и стеклянным полотном.');

  const features = [
    L(ru, `Форма: ${shape}`, `Форма: ${shape}`),
    L(ru, framed ? 'Металева рама' : 'Без рами', framed ? 'Металлическая рама' : 'Без рамы'),
    noLight ? L(ru, 'Без основної підсвітки', 'Без основной подсветки') : L(ru, `Підсвітка: ${light}`, `Подсветка: ${light}`),
    L(ru, `Стандартних розмірів: ${std.length}`, `Стандартных размеров: ${std.length}`),
    extras.length ? L(ru, `Додаткових функцій: ${extras.length}`, `Дополнительных функций: ${extras.length}`) : L(ru, 'Без додаткових функцій', 'Без дополнительных функций')
  ];
  return { intro: `${open} ${lightS} ${mountS}`, config: `${sizeS} ${funcS}`, features };
}

// Model descriptions built ONLY from the model's real data (shape, frame, lighting, mounting, size limits, standard sizes, available functions).
// Sentence structure varies with the facts (and a stable per-model variant), so pages are not one template with a swapped name.
// Not hand-written editorial copy: an editor should review the text before the shop is opened for indexing.
// Never claims: certificates, own production, technical advantages that are not in the data. Sale terms (warranty, lead time, delivery) live in shop-terms.mjs.
// `queries` = { primary } from the SEO research: the phrase is used once, in a natural sentence (no keyword lists).
import { attr, optionLabel, groupLabel } from './led-mirror-i18n.mjs';

const EXTRA = ['backlight', 'heating', 'lens', 'shelf', 'switch', 'clock', 'audio'];
const L = (ru, uk, rus) => (ru ? rus : uk);

export function modelContent(locale, m, groups, queries) {
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


  // ---- purpose / use (derived from shape, mounting, size and the lighting facts; usage suggestions, not technical claims)
  const tallStd = m.standard_sizes.some((x) => x.h >= 1200), small = Math.max(...m.standard_sizes.map((x) => Math.max(x.w, x.h))) <= 1000, huge = Math.max(W[1], H[1]) >= 2000;
  const pk = queries?.primary?.trim();
  const kw = pk ? [
    L(ru, `Шукаєте ${pk}? Це саме те, що пропонує модель ${m.name_short}.`, `Ищете ${pk}? Именно это предлагает модель ${m.name_short}.`),
    L(ru, `Модель ${m.name_short} — це ${pk}.`, `Модель ${m.name_short} — это ${pk}.`),
    L(ru, `Модель ${m.name_short} підійде, якщо вам потрібне ${pk}.`, `Модель ${m.name_short} подойдёт, если вам нужно ${pk}.`)
  ][v] : '';
  const where = floor
    ? L(ru, 'Це вільностояче дзеркало: його ставлять на підлогу біля стіни, тож воно підходить для спальні, гардеробної чи передпокою.', 'Это свободностоящее зеркало: его ставят на пол у стены, поэтому оно подходит для спальни, гардеробной или прихожей.')
    : tallStd ? L(ru, 'Висота стандартних розмірів дозволяє використати його як дзеркало в повний зріст — у передпокої, спальні чи гардеробній.', 'Высота стандартных размеров позволяет использовать его как зеркало в полный рост — в прихожей, спальне или гардеробной.')
    : small ? L(ru, 'Компактні стандартні розміри добре підходять для ванної кімнати, туалетного столика чи коридору.', 'Компактные стандартные размеры хорошо подходят для ванной комнаты, туалетного столика или коридора.')
    : huge ? L(ru, 'Великі розміри дозволяють використати його на значній площині стіни — у вітальні, холі чи салоні.', 'Большие размеры позволяют использовать его на значительной площади стены — в гостиной, холле или салоне.')
    : L(ru, 'Настінна модель середніх розмірів: підійде для ванної, передпокою чи спальні.', 'Настенная модель средних размеров: подойдёт для ванной, прихожей или спальни.');
  const glow = noLight
    ? L(ru, 'Це дзеркало без основної підсвітки: його вибирають, коли достатньо загального освітлення кімнати.', 'Это зеркало без основной подсветки: его выбирают, когда достаточно общего освещения комнаты.')
    : m.main_light === 'Фронтальна'
      ? (small && !floor && !tallStd
        ? L(ru, 'Фронтальна підсвітка дає додаткове світло перед дзеркалом — зручно біля раковини чи туалетного столика.', 'Фронтальная подсветка даёт дополнительный свет перед зеркалом — удобно у раковины или туалетного столика.')
        : L(ru, 'Фронтальна підсвітка дає додаткове світло перед дзеркалом.', 'Фронтальная подсветка даёт дополнительный свет перед зеркалом.'))
      : L(ru, 'Фонова підсвітка створює світіння навколо полотна й підкреслює форму дзеркала.', 'Фоновая подсветка создаёт свечение вокруг полотна и подчёркивает форму зеркала.');
  const heat = keys.includes('heating') && !floor && !huge ? L(ru, 'Для ванної кімнати можна додати підігрів — він не дає дзеркалу запотівати.', 'Для ванной комнаты можно добавить подогрев — он не даёт зеркалу запотевать.') : '';
  const order = v === 0 ? [kw, where, glow, heat] : v === 1 ? [kw, glow, where, heat] : [where, kw, glow, heat];
  const purpose = order.filter(Boolean).join(' ');

  const features = [
    L(ru, `Форма: ${shape}`, `Форма: ${shape}`),
    L(ru, framed ? 'Металева рама' : 'Без рами', framed ? 'Металлическая рама' : 'Без рамы'),
    noLight ? L(ru, 'Без основної підсвітки', 'Без основной подсветки') : L(ru, `Підсвітка: ${light}`, `Подсветка: ${light}`),
    L(ru, `Стандартних розмірів: ${std.length}`, `Стандартных размеров: ${std.length}`),
    extras.length ? L(ru, `Додаткових функцій: ${extras.length}`, `Дополнительных функций: ${extras.length}`) : L(ru, 'Без додаткових функцій', 'Без дополнительных функций')
  ];
  return { intro: `${open} ${lightS} ${mountS}`, purpose, config: `${sizeS} ${funcS}`, features };
}

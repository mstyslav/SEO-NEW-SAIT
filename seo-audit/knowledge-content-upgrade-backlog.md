# KNOWLEDGE CONTENT UPGRADE — backlog

Створено в межах SEO Meta Package 1. Статус: **не розпочато**.

## Контекст

У 20 статтях бази знань (UA + RU, 40 URL) тіло тонке: короткий текст плюс спільний шаблонний абзац, однаковий для всіх статей.
Їхні meta description були шаблонними («… — практичний матеріал Space Glass …»).

У Package 1 змінено **лише meta**: поля `metaDescription` / `metaTitle` статті (UA — `src/data/knowledge-supplemental.ts`, RU — `src/content/i18n/knowledge/articles-ru.ts`).
Body, H1, картки статей, Article JSON-LD і `article.description` у даних **не змінювались**.

Після оновлення контенту статті варто переписати її `description` (картки, Article JSON-LD) і, якщо meta вже не відрізняється, прибрати `metaDescription`.

## Що аналізувати по кожній статті

1. **Search intent** — який реальний запит / задачу користувача закриває стаття (інформаційний, навігаційний, перед покупкою).
2. **Корисність** — чи дає відповідь, яку не дає перший екран видачі: цифри, допуски, порівняння, помилки, чек-листи.
3. **Структура** — H2/H3 під підпитання, списки й таблиці, FAQ; прибрати спільний шаблонний абзац.
4. **Експертність** — досвід виробництва й монтажу Space Glass, фото власних об’єктів, стандарти (ДСТУ/EN), автор/рецензент.
5. **Внутрішні посилання** — на релевантні hub/товарні сторінки та сусідні статті; без переспаму анкорів.
6. **Можлива канібалізація** — чи не конкурує з комерційною сторінкою або іншою статтею за той самий запит (наприклад «дзеркало для спортзалу» ↔ `/dzerkala/dzerkala-dlya-sportzalu/`, «вітринне скління» ↔ фасадні / бізнес-сторінки, «стійково-ригельне скління» ↔ `/alyuminiyevi-konstrukcziyi/fasadne-sklinnya/`).

## Список статей

| # | UA | RU | H1 (UA) | Intent | Корисність | Структура | Експертність | Посилання | Канібалізація |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `/knowledge/bezramne-sklinnya-balkona/` | `/ru/knowledge/bezramne-sklinnya-balkona/` | Безрамне скління балкона: можливості й обмеження | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2 | `/knowledge/doglyad-za-chornoyu-furnituroyu/` | `/ru/knowledge/doglyad-za-chornoyu-furnituroyu/` | Догляд за чорною, хромованою та латунною фурнітурою | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3 | `/knowledge/doglyad-za-dushovym-sklom/` | `/ru/knowledge/doglyad-za-dushovym-sklom/` | Як доглядати за склом і фурнітурою душової | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4 | `/knowledge/dzerkalo-dlya-sportzalu/` | `/ru/knowledge/dzerkalo-dlya-sportzalu/` | Дзеркала для спортзалу: площинність і безпека | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5 | `/knowledge/dzerkalo-z-pidigrivom/` | `/ru/knowledge/dzerkalo-z-pidigrivom/` | Дзеркало з підігрівом: як працює антизапотівання | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6 | `/knowledge/faczet-na-dzerkali/` | `/ru/knowledge/faczet-na-dzerkali/` | Фацет на дзеркалі: ширина, вигляд і обмеження | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 7 | `/knowledge/koly-robyty-finalny-zamir/` | `/ru/knowledge/koly-robyty-finalny-zamir/` | Коли робити фінальний замір скляної конструкції | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 8 | `/knowledge/obrobka-krayky-skla/` | `/ru/knowledge/obrobka-krayky-skla/` | Обробка крайки скла: полірування, шліфування та фацет | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 9 | `/knowledge/panoramne-sklinnya-budynku/` | `/ru/knowledge/panoramne-sklinnya-budynku/` | Панорамне скління будинку: тепло, сонце та безпека | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 10 | `/knowledge/sertifikaty-ta-markuvannya-skla/` | `/ru/knowledge/sertifikaty-ta-markuvannya-skla/` | Сертифікати та маркування безпечного скла | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 11 | `/knowledge/sklyana-pidloga/` | `/ru/knowledge/sklyana-pidloga/` | Скляна підлога: конструкція, протиковзання та контроль | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 12 | `/knowledge/stiykovo-rygelne-sklinnya/` | `/ru/knowledge/stiykovo-rygelne-sklinnya/` | Стійково-ригельне фасадне скління: як працює система | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 13 | `/knowledge/strukturne-sklinnya-fasadu/` | `/ru/knowledge/strukturne-sklinnya-fasadu/` | Структурне скління фасаду: шви та безпека | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 14 | `/knowledge/sylikon-ta-germetyky-dlya-skla/` | `/ru/knowledge/sylikon-ta-germetyky-dlya-skla/` | Силікон і герметики для скляних конструкцій | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 15 | `/knowledge/vidy-bezpechnogo-skla/` | `/ru/knowledge/vidy-bezpechnogo-skla/` | Види безпечного скла для дому та бізнесу | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 16 | `/knowledge/vitrinne-sklinnya-magazynu/` | `/ru/knowledge/vitrinne-sklinnya-magazynu/` | Вітринне скління магазину: безпека та доступ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 17 | `/knowledge/yak-myty-sklo-bez-rozvodiv/` | `/ru/knowledge/yak-myty-sklo-bez-rozvodiv/` | Як мити скло без розводів і пошкоджень | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 18 | `/knowledge/yak-zberegty-sklo-pid-chas-remontu/` | `/ru/knowledge/yak-zberegty-sklo-pid-chas-remontu/` | Як захистити скляні конструкції під час ремонту | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 19 | `/knowledge/zakhysne-pokryttya-dlya-skla/` | `/ru/knowledge/zakhysne-pokryttya-dlya-skla/` | Захисне покриття для скла: можливості та догляд | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 20 | `/knowledge/zaminy-ushchilnyuvachiv-dushovoyi/` | `/ru/knowledge/zaminy-ushchilnyuvachiv-dushovoyi/` | Коли міняти ущільнювачі у скляній душовій | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

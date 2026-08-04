# Production Fix 3

Виправлено помилку Vite/Astro:

`Cannot import non-asset file /js/pricing/exchange-rate.js which is inside /public`

Причина: модулі з `public/` не можна імпортувати через `import` у скриптах, які обробляє Vite.

Зміни:
- `exchange-rate.js` перенесено до `src/pricing/client/`;
- `engine.js` перенесено до `src/pricing/client/`;
- виправлено імпорти в `DynamicConfigurator.astro`;
- виправлено імпорти в `src/pages/catalog/piddon.astro`.

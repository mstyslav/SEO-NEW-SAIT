#!/bin/zsh
cd "$(dirname "$0")"
clear

echo "Space Glass — Production Fix 2"
echo "Папка: $(pwd)"
echo ""

echo "Зупиняю старий сервер на порту 4321..."
lsof -ti tcp:4321 | xargs kill -9 2>/dev/null || true

echo "Очищаю кеш попередньої версії..."
rm -rf .astro dist

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js не встановлено. Встановіть Node.js LTS."
  read -k 1 "?Натисніть будь-яку клавішу..."
  exit 1
fi

if [ ! -d node_modules/astro ]; then
  echo "Встановлюю залежності..."
  npm install || {
    echo "npm install завершився помилкою."
    read -k 1 "?Натисніть будь-яку клавішу..."
    exit 1
  }
fi

echo "Перевіряю маршрути та внутрішні посилання..."
npm run check:production || {
  echo "Знайдено проблему у маршрутах або посиланнях."
  read -k 1 "?Натисніть будь-яку клавішу..."
  exit 1
}

echo ""
echo "Запускаю Production Fix 2..."
npm run dev -- --host 0.0.0.0

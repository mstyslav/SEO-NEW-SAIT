const requestExamples: Record<string, string> = {
  'bath-screen-akvarel-odesa': 'Скляна шторка на ванну з нерухомою секцією та зручними дверцятами',
  'bath-screen-teremky-kyiv': 'Прозора скляна шторка на ванну з чорною фурнітурою',
  'coffee-ocean-facade-odesa': 'Тепле фасадне скління кав’ярні з вікном для видачі замовлень',
  'dental-clinic-partitions-odesa': 'Скляні перегородки для кабінетів клініки з непрозорими декоративними вставками',
  'folding-shower-doors-varshavskyi-kyiv': 'Складні скляні двері для компактної душової ніші',
  'glass-railing-primorski-sady-odesa': 'Прозора скляна огорожа для сходів і другого поверху',
  'glass-stair-railing-private-house-odesa': 'Безрамна скляна огорожа сходів із надійним кріпленням',
  'hotel-dvoryanskyi-showers-odesa': 'Серія душових перегородок і скляних шторок на ванну для номерів готелю',
  'kitchen-partition-fjord-kyiv': 'Прозора скляна перегородка між кухнею та житловою кімнатою',
  'led-mirror-private-house-kyiv': 'Дзеркало у ванну за індивідуальним розміром із рівномірною LED-підсвіткою',
  'led-mirror-private-house-odesa': 'Велике настінне дзеркало з теплою LED-підсвіткою та прихованим кріпленням',
  'loft-kyiv': 'Розсувна Loft-перегородка між кухнею та кімнатою з матовим склом',
  'loft-partition-teremky-kyiv': 'Розсувна Loft-перегородка для зонування кімнати з чорним профілем',
  'loft-partitions-kselena-odesa': 'Loft-перегородки для зонування салону краси зі скляними дверима',
  'mirrored-wardrobe-doors-milos-odesa': 'Розсувні дзеркальні двері для гардеробної від підлоги до стелі',
  'office-partitions-morskyi-odesa': 'Скляні офісні перегородки з дверима для окремих робочих кабінетів',
  'osocor-residence-glazing-kyiv': 'Безрамне скління тераси зі скляними дверима та прозорою огорожею',
  'restaurant-glazing-artshat-odesa': 'Тепле алюмінієве скління ресторану з великими панорамними вікнами',
  'wardrobe-partition-crystal-springs-kyiv': 'Скляна перегородка гардеробної з розсувними дверима та тонованим склом',
  'world-of-comics-entrance-odesa': 'Скляна вхідна група для магазину з двостулковими маятниковими дверима'
};

export function projectRequestExample(project: { slug: string; city: string; constructionType: string; objectType: string }) {
  const cityPhrase = project.city === 'Київ' ? 'у Києві' : project.city === 'Одеса' ? 'в Одесі' : 'у Львові';
  const example = requestExamples[project.slug] ?? `${project.constructionType} за індивідуальними розмірами для об’єкта ${project.objectType.toLowerCase()}`;
  return `${example} ${cityPhrase}`;
}

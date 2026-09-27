const requestExamples: Record<string, string> = {
  'shtorka-dlya-vannoyi-zhk-akvarel-v-m-odesa': 'Скляна шторка на ванну з нерухомою секцією та зручними дверцятами',
  'bath-screen-teremky-kyiv': 'Прозора скляна шторка на ванну з чорною фурнітурою',
  'zasklinnya-fasadiv-ta-okno-vydachi-v-coffee-ocean-m-odesa-arkadijska-aleya': 'Тепле фасадне скління кав’ярні з вікном для видачі замовлень',
  'rozdilennya-peregorodkomu-prostoru-ta-obklejka-lakobelem-dvernyh-portaliv-dlya-stomatalogii-m-odesa': 'Скляні перегородки для кабінетів клініки з непрозорими декоративними вставками',
  'dushovi-garmoshka-zhk': 'Складні скляні двері для компактної душової ніші',
  'dzerkalni-dveri-v-garderob-2': 'Прозора скляна огорожа для сходів і другого поверху',
  'ogorozha-shodiv-ta-drugogo-poverhu': 'Безрамна скляна огорожа сходів із надійним кріпленням',
  'gotel-dvoryanskyj-odesa-dushovi-ta-shtorky-na-vanu': 'Серія душових перегородок і скляних шторок на ванну для номерів готелю',
  'dzerkalni-dveri-v-garderob': 'Прозора скляна перегородка між кухнею та житловою кімнатою',
  'dzerkalo-z-pidsvidkoyu-v-m-odesa': 'Дзеркало у ванну за індивідуальним розміром із рівномірною LED-підсвіткою',
  'dzerkalo-z-pidsvidkoyu-v-m-odesa-2': 'Велике настінне дзеркало з теплою LED-підсвіткою та прихованим кріпленням',
  'mizhkimnatni-peregorodky-v-styli-loft-zhk-atlant-m-kyyiv': 'Розсувна Loft-перегородка між кухнею та кімнатою з матовим склом',
  'mizhkimnatni-peregorodky-v-dytyachu': 'Розсувна Loft-перегородка для зонування кімнати з чорним профілем',
  'sklinni-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-2': 'Loft-перегородки для зонування салону краси зі скляними дверима',
  'mirrored-wardrobe-doors-milos-odesa': 'Розсувні дзеркальні двері для гардеробної від підлоги до стелі',
  'sklyani-peregorodky-dlya-ofisu-v-m-odesa': 'Скляні офісні перегородки з дверима для окремих робочих кабінетів',
  'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-osocor-residence-m-kyyiv': 'Безрамне скління тераси зі скляними дверима та прозорою огорожею',
  'teple-osklinnya-vhidnoyi-grupy-restoranu-art-shat': 'Тепле алюмінієве скління ресторану з великими панорамними вікнами',
  'sklyani-peregorodky-u-garderobnu-v-m-odesa': 'Скляна перегородка гардеробної з розсувними дверима та тонованим склом',
  'chastne-zamovlennya-odesa-dushova-ta-peregorodka': 'Скляна вхідна група для магазину з двостулковими маятниковими дверима'
};

export function projectRequestExample(project: { slug: string; city: string; constructionType: string; objectType: string }) {
  const cityPhrase = project.city === 'Київ' ? 'у Києві' : project.city === 'Одеса' ? 'в Одесі' : 'у Львові';
  const example = requestExamples[project.slug] ?? `${project.constructionType} за індивідуальними розмірами для об’єкта ${project.objectType.toLowerCase()}`;
  return `${example} ${cityPhrase}`;
}

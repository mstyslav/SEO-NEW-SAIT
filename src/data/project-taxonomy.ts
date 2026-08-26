export const projectCategories = [
  { id: 'showers', label: 'Душові конструкції', labelRu: 'Душевые конструкции', serviceHref: '/dushovi-kabiny/' },
  { id: 'mirrors', label: 'Дзеркала', labelRu: 'Зеркала', serviceHref: '/dzerkala/' },
  { id: 'glass-partitions', label: 'Скляні перегородки', labelRu: 'Стеклянные перегородки', serviceHref: '/sklyani-perehorodky/' },
  { id: 'glass-doors', label: 'Скляні двері', labelRu: 'Стеклянные двери', serviceHref: '/sklyani-dveri/' },
  { id: 'railings', label: 'Скляні огорожі', labelRu: 'Стеклянные ограждения', serviceHref: '/sklyani-ohorozhi/' },
  { id: 'frameless-glazing', label: 'Безрамне скління', labelRu: 'Безрамное остекление', serviceHref: '/bezramne-configurator/' },
  { id: 'aluminium', label: 'Алюмінієві конструкції', labelRu: 'Алюминиевые конструкции', serviceHref: '/alyuminiievi-konstruktsii/' },
  { id: 'glass-facades', label: 'Скляні фасади', labelRu: 'Стеклянные фасады', serviceHref: '/arkhitekturni-systemy/' },
  { id: 'pvc', label: 'Металопластикові конструкції', labelRu: 'Металлопластиковые конструкции', serviceHref: '/metaloplastykovi-konstruktsii/' },
  { id: 'business-glass', label: 'Скло для бізнесу', labelRu: 'Стекло для бизнеса', serviceHref: '/rishennya/dlya-ofisu/' }
] as const;

export const projectCategoryIds = projectCategories.map(({ id }) => id) as [
  'showers', 'mirrors', 'glass-partitions', 'glass-doors', 'railings',
  'frameless-glazing', 'aluminium', 'glass-facades', 'pvc', 'business-glass'
];

export type ProjectCategoryId = typeof projectCategoryIds[number];

export const projectCategoryMap = Object.fromEntries(
  projectCategories.map((category) => [category.id, category])
) as Record<ProjectCategoryId, typeof projectCategories[number]>;

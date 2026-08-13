export const projectCategories = [
  { id: 'showers', label: 'Душові конструкції', serviceHref: '/dushovi-kabiny/' },
  { id: 'mirrors', label: 'Дзеркала', serviceHref: '/dzerkala/' },
  { id: 'glass-partitions', label: 'Скляні перегородки', serviceHref: '/sklyani-perehorodky/' },
  { id: 'glass-doors', label: 'Скляні двері', serviceHref: '/sklyani-dveri/' },
  { id: 'railings', label: 'Скляні огорожі', serviceHref: '/sklyani-ohorozhi/' },
  { id: 'frameless-glazing', label: 'Безрамне скління', serviceHref: '/bezramne-configurator/' },
  { id: 'aluminium', label: 'Алюмінієві конструкції', serviceHref: '/alyuminiievi-konstruktsii/' },
  { id: 'glass-facades', label: 'Скляні фасади', serviceHref: '/arkhitekturni-systemy/' },
  { id: 'pvc', label: 'Металопластикові конструкції', serviceHref: '/metaloplastykovi-konstruktsii/' },
  { id: 'business-glass', label: 'Скло для бізнесу', serviceHref: '/rishennya/dlya-ofisu/' }
] as const;

export const projectCategoryIds = projectCategories.map(({ id }) => id) as [
  'showers', 'mirrors', 'glass-partitions', 'glass-doors', 'railings',
  'frameless-glazing', 'aluminium', 'glass-facades', 'pvc', 'business-glass'
];

export type ProjectCategoryId = typeof projectCategoryIds[number];

export const projectCategoryMap = Object.fromEntries(
  projectCategories.map((category) => [category.id, category])
) as Record<ProjectCategoryId, typeof projectCategories[number]>;

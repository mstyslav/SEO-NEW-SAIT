const words = (value: string) => new Set(
  value.toLowerCase().split(/[^a-zа-яіїєґ0-9]+/u).filter((word) => word.length > 4)
);

const categoryAffinity: Record<string, string[]> = {
  showers: ['glass-doors', 'glass-partitions'],
  mirrors: ['glass-doors', 'business-glass'],
  'glass-partitions': ['business-glass', 'glass-doors', 'aluminium'],
  'glass-doors': ['glass-partitions', 'business-glass', 'aluminium'],
  railings: ['frameless-glazing', 'business-glass'],
  'frameless-glazing': ['glass-facades', 'aluminium', 'railings'],
  aluminium: ['glass-facades', 'frameless-glazing', 'glass-doors'],
  'glass-facades': ['aluminium', 'frameless-glazing', 'business-glass'],
  pvc: ['aluminium', 'glass-doors'],
  'business-glass': ['glass-partitions', 'glass-doors', 'glass-facades']
};

export function selectRelatedProjects(project: any, allEntries: any[], limit = 5) {
  const candidates = allEntries
    .map(({ data }) => data)
    .filter((item) => item.slug !== project.slug);
  const explicitOrder = new Map(
    project.relatedProjectSlugs.map((slug: string, index: number) => [slug, index])
  );
  const currentWords = words(`${project.constructionType} ${project.objectType} ${project.shortDescription}`);

  return candidates
    .map((item) => {
      const itemWords = words(`${item.constructionType} ${item.objectType} ${item.shortDescription}`);
      const sharedWords = [...currentWords].filter((word) => itemWords.has(word)).length;
      const explicit = explicitOrder.has(item.slug);
      const affinityIndex = (categoryAffinity[project.category] ?? []).indexOf(item.category);
      const score =
        (item.category === project.category ? 1000 : 0) +
        (affinityIndex >= 0 ? 260 - affinityIndex * 30 : 0) +
        (explicit ? 80 - Number(explicitOrder.get(item.slug)) : 0) +
        sharedWords * 40 +
        (item.city === project.city ? 10 : 0) +
        (item.featured ? 2 : 0);

      return { item, score };
    })
    .sort((a, b) => b.score - a.score || a.item.sortOrder - b.item.sortOrder)
    .slice(0, limit)
    .map(({ item }) => item);
}

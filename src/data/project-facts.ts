type ProjectFactsSource = {
  objectType: string;
  city: string;
  residentialComplex?: string;
  district?: string;
  constructionType: string;
  glassType?: string;
  glassThickness?: string;
  profile?: string;
  profileColor?: string;
  openingType?: string;
  panelsCount?: number;
  dimensions?: string;
  area?: string;
  hardware?: string;
  productionTime?: string;
  installationTime?: string;
  year?: number;
};

export type ProjectFact = { label: string; value: string };

// Only real, present values are shown — never "не вказано" / "N/A" placeholders.
// The block only renders at all once at least one genuinely NEW optional fact
// is present, so it doesn't just duplicate the existing `characteristics` strip
// with the same objectType/city/constructionType for every project.
export function buildProjectFacts(project: ProjectFactsSource): ProjectFact[] {
  const optional: ProjectFact[] = [];

  if (project.residentialComplex) optional.push({ label: 'Локація', value: `${project.residentialComplex}, ${project.city}` });
  if (project.district) optional.push({ label: 'Район', value: project.district });
  if (project.glassType) optional.push({ label: 'Скло', value: project.glassType });
  if (project.glassThickness) optional.push({ label: 'Товщина скла', value: project.glassThickness });
  if (project.profile) {
    optional.push({ label: 'Профіль', value: project.profileColor ? `${project.profile} (${project.profileColor})` : project.profile });
  } else if (project.profileColor) {
    optional.push({ label: 'Колір профілю', value: project.profileColor });
  }
  if (project.openingType) optional.push({ label: 'Тип відкривання', value: project.openingType });
  if (project.panelsCount) optional.push({ label: 'Кількість полотен', value: String(project.panelsCount) });
  if (project.dimensions) optional.push({ label: 'Розмір', value: project.dimensions });
  if (project.area) optional.push({ label: 'Площа', value: project.area });
  if (project.hardware) optional.push({ label: 'Фурнітура', value: project.hardware });
  if (project.productionTime) optional.push({ label: 'Термін виготовлення', value: project.productionTime });
  if (project.installationTime) optional.push({ label: 'Термін монтажу', value: project.installationTime });
  if (project.year) optional.push({ label: 'Рік реалізації', value: String(project.year) });

  return optional;
}

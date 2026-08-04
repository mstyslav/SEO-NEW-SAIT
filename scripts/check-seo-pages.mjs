import { seoCategories, seoServiceByPath, ukSeoServices } from '../src/data/seo-services.ts';

const errors = [];
const unique = (field) => new Set(ukSeoServices.map((service) => service[field])).size;

if (ukSeoServices.length !== 50) errors.push(`Expected 50 services, found ${ukSeoServices.length}`);
for (const field of ['path', 'title', 'description', 'h1']) {
  if (unique(field) !== ukSeoServices.length) errors.push(`${field} values are not unique`);
}
for (const service of ukSeoServices) {
  if (!service.path.match(/^\/poslugy\/[a-z0-9-]+\/[a-z0-9-]+\/$/)) errors.push(`Invalid URL: ${service.path}`);
  if (service.relatedPaths.length < 4) errors.push(`Too few related links: ${service.path}`);
  for (const relatedPath of service.relatedPaths) {
    if (!seoServiceByPath.has(relatedPath)) errors.push(`Broken related link: ${service.path} -> ${relatedPath}`);
  }
}
if (seoCategories.some((category) => category.services.length === 0)) errors.push('Empty SEO category found');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${ukSeoServices.length} unique Ukrainian SEO pages across ${seoCategories.length} categories.`);

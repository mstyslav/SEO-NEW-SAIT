import { seoCategories, seoServiceByPath, ukSeoServices } from '../src/data/seo-services.ts';

const errors = [];
const unique = (field) => new Set(ukSeoServices.map((service) => service[field])).size;

// The list shrinks as product pages move to their own sections (see the notes in
// src/data/seo-services.ts), so there is no fixed count — only that it is not empty.
if (ukSeoServices.length === 0) errors.push('No SEO services found');
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
// A category left without services was migrated on purpose; report it, do not fail on it.
const emptyCategories = seoCategories.filter((category) => category.services.length === 0).map((category) => category.slug);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validated ${ukSeoServices.length} unique Ukrainian SEO pages across ${seoCategories.length} categories.`);
if (emptyCategories.length) console.log(`Note: categories without services (migrated elsewhere): ${emptyCategories.join(', ')}`);

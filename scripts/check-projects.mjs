import fs from 'node:fs';
import path from 'node:path';

const contentDir = path.resolve('src/content/projects');
const publicDir = path.resolve('public');
const allowedCategories = new Set([
  'showers', 'mirrors', 'glass-partitions', 'glass-doors', 'railings',
  'frameless-glazing', 'aluminium', 'glass-facades', 'pvc', 'business-glass'
]);
const serviceRoutePrefixes = [
  '/dushovi-kabiny/', '/dzerkala/', '/sklyani-perehorodky/', '/sklyani-dveri/',
  '/sklyani-ohorozhi/', '/alyuminiievi-konstruktsii/', '/metaloplastykovi-konstruktsii/',
  '/arkhitekturni-systemy/', '/poslugy/'
];
const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.json'));
const projects = files.map((file) => ({ file, data: JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8')) }));
const errors = [];
const slugs = new Set();

for (const { file, data } of projects) {
  if (slugs.has(data.slug)) errors.push(`${file}: duplicate slug "${data.slug}"`);
  slugs.add(data.slug);
  if (!allowedCategories.has(data.category)) errors.push(`${file}: unknown category "${data.category}"`);
  if (path.basename(file, '.json') !== data.slug) errors.push(`${file}: filename and slug must match`);
  if (!data.serviceLink?.label?.trim()) errors.push(`${file}: service link needs a visible label`);
  if (!serviceRoutePrefixes.some((prefix) => data.serviceLink?.href?.startsWith(prefix))) {
    errors.push(`${file}: serviceLink.href must point to a service page, got "${data.serviceLink?.href ?? ''}"`);
  }

  const images = [data.cover, ...(data.gallery ?? [])];
  for (const image of images) {
    if (!image?.src?.endsWith('.webp')) errors.push(`${file}: project images must use WebP`);
    if (!image?.alt || image.alt.length < 20) errors.push(`${file}: every image needs a descriptive alt`);
    if (!Number.isInteger(image?.width) || !Number.isInteger(image?.height)) errors.push(`${file}: every image needs integer width/height`);
    const asset = path.join(publicDir, String(image?.src ?? '').replace(/^\//, ''));
    if (!fs.existsSync(asset)) errors.push(`${file}: missing image ${image?.src}`);
  }
}

for (const { file, data } of projects) {
  for (const slug of data.relatedProjectSlugs ?? []) {
    if (!slugs.has(slug)) errors.push(`${file}: related project "${slug}" does not exist`);
    if (slug === data.slug) errors.push(`${file}: project cannot relate to itself`);
  }
}

if (errors.length) {
  console.error('Project validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`OK: ${projects.length} project data file(s) and their images are valid.`);

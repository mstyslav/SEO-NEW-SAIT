import fs from 'node:fs';

const product = fs.readFileSync('src/pages/catalog/piddon.astro', 'utf8');
const dynamic = fs.readFileSync(
  'src/components/configurator/DynamicConfigurator.astro',
  'utf8'
);

const safeDeclaration = product.indexOf('const safeNumber');
const firstSafeUsage = product.indexOf('safeNumber(pricingCard');

if (safeDeclaration < 0 || firstSafeUsage < 0 || safeDeclaration > firstSafeUsage) {
  console.error('safeNumber is used before declaration.');
  process.exit(1);
}

if (!product.includes("configurator?.addEventListener('click'")) {
  console.error('Product configurator delegated click handler is missing.');
  process.exit(1);
}

if (!dynamic.includes("root.addEventListener('click'")) {
  console.error('Dynamic configurator delegated click handler is missing.');
  process.exit(1);
}

console.log('OK: configurator interaction regression checks passed.');

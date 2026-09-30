import fs from 'node:fs';

// The inline product configurator (/catalog/piddon/) was removed on 2026-09-30 (301 to
// /dushovi-kabiny/dushovi-piddony/); only the shared DynamicConfigurator remains to guard.
const dynamic = fs.readFileSync(
  'src/components/configurator/DynamicConfigurator.astro',
  'utf8'
);

if (!dynamic.includes("root.addEventListener('click'")) {
  console.error('Dynamic configurator delegated click handler is missing.');
  process.exit(1);
}

console.log('OK: configurator interaction regression checks passed.');

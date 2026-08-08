import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve('src');
const sourceExtensions = new Set(['.astro', '.js', '.mjs', '.ts']);
const resolutionExtensions = ['', '.astro', '.js', '.mjs', '.ts', '.json', '.css'];
const broken = [];
let checked = 0;

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

for (const file of walk(sourceRoot)) {
  if (!sourceExtensions.has(path.extname(file))) continue;
  const source = fs.readFileSync(file, 'utf8');
  const imports = source.matchAll(/(?:import\s+(?:[^'\"]+?\s+from\s+)?|export\s+[^'\"]*?from\s+)["']([^"']+)["']/g);
  for (const match of imports) {
    const specifier = match[1];
    if (!specifier.startsWith('.')) continue;
    checked += 1;
    const candidate = path.resolve(path.dirname(file), specifier);
    const resolutions = [
      ...resolutionExtensions.map((extension) => `${candidate}${extension}`),
      ...['index.astro', 'index.js', 'index.mjs', 'index.ts'].map((name) => path.join(candidate, name)),
    ];
    if (!resolutions.some((resolution) => fs.existsSync(resolution))) {
      broken.push(`${path.relative(sourceRoot, file)} → ${specifier}`);
    }
  }
}

if (broken.length) {
  console.error('Broken relative imports:');
  broken.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log(`OK: ${checked} relative imports resolve.`);

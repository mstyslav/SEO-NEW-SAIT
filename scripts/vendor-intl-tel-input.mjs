// Copies the intl-tel-input files the site serves itself (no CDN) into public/vendor/intl-tel-input-<version>/ (versioned path, cached as immutable).
// Re-run after upgrading the package: node scripts/vendor-intl-tel-input.mjs
// Loaded by public/js/forms.js: core + CSS on pages with a phone field; utils.js (libphonenumber)
// lazily on first interaction with the field; UI translations for UA/RU.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const src = path.resolve('node_modules/intl-tel-input');
const out = path.resolve(`public/vendor/intl-tel-input-${JSON.parse(fs.readFileSync('node_modules/intl-tel-input/package.json', 'utf8')).version}`);
const files = [
  ['dist/js/intlTelInput.min.js', 'js/intlTelInput.min.js'],
  ['dist/js/utils.js', 'js/utils.js'],
  ['dist/js/locale/uk.js', 'js/locale/uk.js'],
  ['dist/js/locale/ru.js', 'js/locale/ru.js'],
  ['dist/css/intlTelInput.min.css', 'css/intlTelInput.min.css'],
  ['dist/img/flags.webp', 'img/flags.webp'],
  ['dist/img/flags@2x.webp', 'img/flags@2x.webp'],
  ['LICENSE', 'LICENSE']
];
const version = JSON.parse(fs.readFileSync(path.join(src, 'package.json'), 'utf8')).version;
fs.rmSync(out, { recursive: true, force: true });
for (const [from, to] of files) {
  fs.mkdirSync(path.dirname(path.join(out, to)), { recursive: true });
  fs.copyFileSync(path.join(src, from), path.join(out, to));
}
// AVIF copies of the flag sprites (~45 % smaller, visually equal at q65); forms.js offers them
// first through image-set(type()) and keeps the WebP originals as the fallback.
for (const name of ['flags', 'flags@2x']) {
  await sharp(path.join(out, 'img', `${name}.webp`)).avif({ quality: 65, effort: 6 }).toFile(path.join(out, 'img', `${name}.avif`));
}
fs.writeFileSync(path.join(out, 'VERSION'), `intl-tel-input ${version}\n`);
console.log(`intl-tel-input ${version} → ${path.relative(process.cwd(), out)} (${files.length} files)`);

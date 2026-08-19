import { mkdirSync, readdirSync, readFileSync, writeFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');
const CONTENT_DIR = join(SRC, 'content');
const PAGES_DIR = join(CONTENT_DIR, 'pages');
const PARTIALS_DIR = join(SRC, 'partials');

// TODO: implémentation complète en T06 (templates + injection du contenu centralisé).
// Ce script est un squelette fonctionnel minimal.

function loadJson(file) {
  return JSON.parse(readFileSync(join(CONTENT_DIR, file), 'utf8'));
}

function loadPartials() {
  const partials = {};
  for (const file of readdirSync(PARTIALS_DIR)) {
    if (extname(file) !== '.html') continue;
    partials[basename(file, '.html')] = readFileSync(join(PARTIALS_DIR, file), 'utf8');
  }
  return partials;
}

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const site = loadJson('site.json');
const partials = loadPartials();

// TODO (T06) : assembler chaque page via src/pages/*.html + partials + contenu.
// Pour l'instant, génération d'une page d'attente.
const placeholderPage = `<!doctype html>
<html lang="${site.lang}">
<head>
  <meta charset="utf-8">
  <title>${site.name}</title>
</head>
<body>
  <p>Build squelettique — assembler les pages en T06.</p>
  <p>Contenu centralisé : ${CONTENT_DIR}</p>
</body>
</html>
`;
writeFileSync(join(DIST, 'index.html'), placeholderPage);

// TODO (T06) : copier src/assets vers dist/assets (css, js, images, fonts).
if (existsSync(join(SRC, 'assets'))) {
  cpSync(join(SRC, 'assets'), join(DIST, 'assets'), { recursive: true });
}

// TODO (T06) : parser src/content/pages/*.md et générer les pages correspondantes.
console.log('Build squelettique terminé (T06 requis pour le build complet).');